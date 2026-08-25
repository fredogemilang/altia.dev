export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export interface ParsedMarkdown {
  html: string;
  toc: TocItem[];
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Parses markdown text to HTML with extracted Table of Contents (TOC) headings.
 */
export function parseMarkdown(content: string): ParsedMarkdown {
  if (!content) return { html: '', toc: [] };

  const toc: TocItem[] = [];
  const lines = content.trim().split('\n');
  const result: string[] = [];

  let inCodeBlock = false;
  let codeLanguage = '';
  let codeBuffer: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Handle code block toggle ```lang
    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        // End of code block
        const rawCode = codeBuffer.join('\n');

        if (codeLanguage === 'mermaid') {
          // Render Mermaid diagram — Mermaid.js picks up <pre class="mermaid"> tags
          result.push(`
            <pre class="mermaid my-8 flex justify-center">${rawCode}</pre>
          `);
        } else {
          result.push(`
            <div class="relative my-6 rounded-2xl overflow-hidden bg-charcoal text-ivory border border-charcoal-600/50 shadow-xl font-mono text-xs sm:text-sm">
              <div class="flex items-center justify-between px-4 py-2.5 bg-charcoal-700/60 border-b border-ivory/10 text-ivory/60 text-xs">
                <span class="font-mono uppercase tracking-wider text-[11px] text-vermilion font-bold">${codeLanguage || 'CODE'}</span>
                <div class="flex items-center gap-1.5">
                  <div class="w-2.5 h-2.5 rounded-full bg-vermilion/70"></div>
                  <div class="w-2.5 h-2.5 rounded-full bg-amber-400/70"></div>
                  <div class="w-2.5 h-2.5 rounded-full bg-emerald-400/70"></div>
                </div>
              </div>
              <pre class="p-4 sm:p-6 overflow-x-auto text-ivory/90 leading-relaxed font-mono"><code>${escapeHtml(rawCode)}</code></pre>
            </div>
          `);
        }

        codeBuffer = [];
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
        codeLanguage = line.trim().replace(/^```/, '').trim();
      }
      continue;
    }

    if (inCodeBlock) {
      codeBuffer.push(line);
      continue;
    }

    // Skip top H1 if it matches article title
    if (line.startsWith('# ')) {
      continue;
    }

    // Handle H2 (## )
    if (line.startsWith('## ')) {
      const headingText = line.replace('## ', '').trim();
      const id = slugify(headingText);
      toc.push({ id, text: headingText, level: 2 });
      result.push(
        `<h2 id="${id}" class="scroll-mt-32 font-display text-2xl sm:text-3xl font-black text-charcoal tracking-tight mt-10 sm:mt-14 mb-4 pt-6 border-t border-warm-border/60 first:border-t-0 first:pt-0 group flex items-center justify-between">
          <span>${escapeHtml(headingText)}</span>
          <a href="#${id}" class="opacity-0 group-hover:opacity-100 text-vermilion text-sm font-mono transition-opacity ml-2" aria-label="Permalink to ${escapeHtml(headingText)}">#</a>
        </h2>`
      );
      continue;
    }

    // Handle H3 (### )
    if (line.startsWith('### ')) {
      const headingText = line.replace('### ', '').trim();
      const id = slugify(headingText);
      toc.push({ id, text: headingText, level: 3 });
      result.push(
        `<h3 id="${id}" class="scroll-mt-32 font-display text-xl sm:text-2xl font-bold text-charcoal tracking-tight mt-8 mb-3 group flex items-center justify-between">
          <span>${escapeHtml(headingText)}</span>
          <a href="#${id}" class="opacity-0 group-hover:opacity-100 text-vermilion text-xs font-mono transition-opacity ml-2" aria-label="Permalink to ${escapeHtml(headingText)}">#</a>
        </h3>`
      );
      continue;
    }

    // Handle blockquote (> )
    if (line.startsWith('> ')) {
      const quoteText = line.replace('> ', '').trim();
      result.push(
        `<blockquote class="my-6 pl-5 border-l-4 border-vermilion italic text-charcoal-muted bg-cream/50 py-3 pr-4 rounded-r-xl font-serif text-lg sm:text-xl">
          ${parseInlineFormatting(quoteText)}
        </blockquote>`
      );
      continue;
    }

    // Handle unordered list (- or *)
    if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
      const itemText = line.trim().replace(/^[-*]\s+/, '');
      result.push(
        `<li class="flex items-start gap-3 my-2 text-charcoal leading-relaxed">
          <span class="w-1.5 h-1.5 rounded-full bg-vermilion mt-2.5 flex-shrink-0"></span>
          <span>${parseInlineFormatting(itemText)}</span>
        </li>`
      );
      continue;
    }

    // Handle ordered list (1. 2. etc)
    const orderedMatch = line.trim().match(/^(\d+)\.\s+(.*)/);
    if (orderedMatch) {
      const num = orderedMatch[1];
      const itemText = orderedMatch[2];
      result.push(
        `<li class="flex items-start gap-3 my-2.5 text-charcoal leading-relaxed">
          <span class="w-5 h-5 rounded-full bg-cream border border-warm-border text-vermilion font-mono text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">${num}</span>
          <span>${parseInlineFormatting(itemText)}</span>
        </li>`
      );
      continue;
    }

    // Handle regular paragraphs
    if (line.trim().length > 0) {
      result.push(
        `<p class="my-4 text-charcoal-muted leading-relaxed text-base sm:text-lg">
          ${parseInlineFormatting(line.trim())}
        </p>`
      );
    }
  }

  return {
    html: result.join('\n'),
    toc,
  };
}

/**
 * Parses inline formatting like bold, italic, and inline code.
 */
function parseInlineFormatting(text: string): string {
  let output = escapeHtml(text);

  // Bold (**text** or __text__)
  output = output.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-charcoal">$1</strong>');
  output = output.replace(/__(.*?)__/g, '<strong class="font-bold text-charcoal">$1</strong>');

  // Italic (*text* or _text_)
  output = output.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
  output = output.replace(/_(.*?)_/g, '<em class="italic">$1</em>');

  // Inline code (`code`)
  output = output.replace(/`(.*?)`/g, '<code class="px-1.5 py-0.5 rounded bg-cream border border-warm-border font-mono text-xs text-charcoal font-semibold">$1</code>');

  return output;
}
