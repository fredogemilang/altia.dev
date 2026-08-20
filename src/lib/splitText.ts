export interface SplitTextResult {
  chars: HTMLElement[];
  words: HTMLElement[];
  lines: HTMLElement[];
  revert: () => void;
}

export interface SplitTextOptions {
  type?: "chars" | "words" | "lines" | "chars,words" | "words,lines" | "chars,words,lines";
  mask?: boolean;
}

export function splitText(
  element: HTMLElement | null,
  options: SplitTextOptions = { type: "chars,words", mask: true }
): SplitTextResult {
  if (!element) {
    return { chars: [], words: [], lines: [], revert: () => {} };
  }

  const originalHTML = element.innerHTML;
  const originalText = element.textContent || "";
  const types = options.type ? options.type.split(",").map((s) => s.trim()) : ["words", "chars"];
  const shouldSplitChars = types.includes("chars");
  const shouldSplitWords = types.includes("words") || shouldSplitChars;
  const shouldMask = options.mask !== false;

  // Split words by whitespace
  const rawWords = originalText.trim().split(/\s+/);
  element.innerHTML = "";

  const words: HTMLElement[] = [];
  const chars: HTMLElement[] = [];

  rawWords.forEach((wordText, wordIndex) => {
    const wordWrapper = document.createElement("span");
    wordWrapper.className = "split-word-wrapper inline-block whitespace-nowrap";
    if (shouldMask) {
      wordWrapper.style.overflow = "hidden";
      wordWrapper.style.verticalAlign = "bottom";
    }

    const wordEl = document.createElement("span");
    wordEl.className = "split-word inline-block";

    if (shouldSplitChars) {
      const letters = wordText.split("");
      letters.forEach((letter) => {
        const charWrapper = document.createElement("span");
        charWrapper.className = "split-char-wrapper inline-block";
        if (shouldMask) {
          charWrapper.style.overflow = "hidden";
          charWrapper.style.verticalAlign = "bottom";
        }

        const charEl = document.createElement("span");
        charEl.className = "split-char inline-block will-change-transform";
        charEl.textContent = letter;

        charWrapper.appendChild(charEl);
        wordEl.appendChild(charWrapper);
        chars.push(charEl);
      });
    } else {
      wordEl.textContent = wordText;
      wordEl.className += " will-change-transform";
    }

    wordWrapper.appendChild(wordEl);
    element.appendChild(wordWrapper);
    words.push(wordEl);

    // Add space between words
    if (wordIndex < rawWords.length - 1) {
      const space = document.createTextNode(" ");
      element.appendChild(space);
    }
  });

  const revert = () => {
    element.innerHTML = originalHTML;
  };

  return {
    chars,
    words,
    lines: [],
    revert,
  };
}
