import MarkdownIt from "markdown-it";

const md = new MarkdownIt({
  breaks: true
});

export const parser = (text: string) => {
  return md.render(text);
};
