import MarkdownIt from "markdown-it";
import Prism from "prismjs";

const md: MarkdownIt = new MarkdownIt({
  breaks: true,
  highlight: (text, lang) => {
    let highlightedText;

    try {
      highlightedText = Prism.highlight(text, Prism.languages[lang], lang);
    } catch (error) {
      highlightedText = md.utils.escapeHtml(text);
    }

    return `<pre class="language-${lang} line-numbers"><code class="language-${lang}">${highlightedText}</code></pre>`;
  }
});

export const parser = (text: string) => {
  return md.render(text);
};
