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

function isTableRow(line: string): boolean {
  const trimmed = line.trim();
  return trimmed.startsWith('|') && trimmed.endsWith('|') && trimmed.length > 2;
}

function isTableDelimiter(line: string): boolean {
  const trimmed = line.trim();
  if (!isTableRow(trimmed)) return false;
  const cells = splitTableRow(trimmed);
  return cells.length > 0 && cells.every((c) => /^:?-+:?$/.test(c.trim()));
}

function splitTableRow(line: string): string[] {
  const trimmed = line.trim();
  const inner = trimmed.replace(/^\|/, '').replace(/\|$/, '');
  return inner.split('|').map((cell) => cell.trim());
}

function getColumnAlignments(delimiterCells: string[]): ('left' | 'center' | 'right')[] {
  return delimiterCells.map((cell) => {
    const trimmed = cell.trim();
    const startColon = trimmed.startsWith(':');
    const endColon = trimmed.endsWith(':');
    if (startColon && endColon) return 'center';
    if (endColon) return 'right';
    return 'left';
  });
}

const alignClass = (align: 'left' | 'center' | 'right') => {
  if (align === 'center') return 'text-center';
  if (align === 'right') return 'text-right';
  return 'text-left';
};

/**
 * Parses markdown text to HTML with extracted Table of Contents (TOC) headings and full GFM table support.
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
          // Render Mermaid diagram - Mermaid.js picks up <pre class="mermaid"> tags
          result.push(`
            <div class="my-8 overflow-x-auto">
              <pre class="mermaid flex justify-center min-w-0">${rawCode}</pre>
            </div>
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

    // Handle Markdown Tables
    if (isTableRow(line) && i + 1 < lines.length && isTableDelimiter(lines[i + 1])) {
      const headerCells = splitTableRow(line);
      const delimiterCells = splitTableRow(lines[i + 1]);
      const alignments = getColumnAlignments(delimiterCells);
      i += 1; // Advance past delimiter

      const bodyRows: string[][] = [];
      while (i + 1 < lines.length && isTableRow(lines[i + 1]) && !isTableDelimiter(lines[i + 1])) {
        i += 1;
        bodyRows.push(splitTableRow(lines[i]));
      }

      result.push(`
        <div class="my-8 overflow-x-auto rounded-2xl border border-warm-border bg-warm-card shadow-sm">
          <table class="w-full text-left border-collapse text-xs sm:text-sm">
            <thead class="bg-cream/90 border-b border-warm-border text-charcoal font-display font-bold uppercase tracking-wider text-[11px] sm:text-xs">
              <tr>
                ${headerCells
                  .map(
                    (h, idx) =>
                      `<th class="py-3.5 px-4 sm:px-6 font-bold ${alignClass(alignments[idx] || 'left')} text-charcoal">${parseInlineFormatting(h)}</th>`
                  )
                  .join('')}
              </tr>
            </thead>
            <tbody class="divide-y divide-warm-border/60 font-sans">
              ${bodyRows
                .map(
                  (row) => `
                <tr class="hover:bg-cream/40 transition-colors">
                  ${row
                    .map(
                      (cell, idx) =>
                        `<td class="py-3.5 px-4 sm:px-6 text-charcoal/90 leading-relaxed ${alignClass(alignments[idx] || 'left')}">${parseInlineFormatting(cell)}</td>`
                    )
                    .join('')}
                </tr>
              `
                )
                .join('')}
            </tbody>
          </table>
        </div>
      `);
      continue;
    }

    // Handle Horizontal Rules (--- or ***)
    if (line.trim() === '---' || line.trim() === '***') {
      result.push('<hr class="my-10 border-t border-warm-border/80" />');
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
 * Parses inline formatting like bold, italic, links, and inline code.
 */
function parseInlineFormatting(text: string): string {
  // Clean up any stray citation tokens
  let output = text.replace(/[\uE200-\uE2FF\?]?cite[^\s\uE200-\uE2FF\?]+[\uE200-\uE2FF\?]?/g, '');

  output = escapeHtml(output);

  // Markdown links: [text](url)
  output = output.replace(
    /\[(.*?)\]\((.*?)\)/g,
    '<a href="$2" class="text-vermilion hover:underline underline-offset-4 font-medium transition-colors" target="_blank" rel="noopener noreferrer">$1</a>'
  );

  // Bold (**text** or __text__)
  output = output.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-charcoal">$1</strong>');
  output = output.replace(/__(.*?)__/g, '<strong class="font-bold text-charcoal">$1</strong>');

  // Italic (*text* or _text_)
  output = output.replace(/(?<!\w)\*([^*]+)\*(?!\w)/g, '<em class="italic">$1</em>');
  output = output.replace(/(?<!\w)_([^_]+)_(?!\w)/g, '<em class="italic">$1</em>');

  // Inline code (`code`)
  output = output.replace(
    /`(.*?)`/g,
    '<code class="px-1.5 py-0.5 rounded bg-cream border border-warm-border font-mono text-xs text-charcoal font-semibold">$1</code>'
  );

  return output;
}
