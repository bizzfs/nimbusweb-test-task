export function formatNoteTextTags(text: string, callback: (tag: string) => unknown = (tag: string) => void 0): string {
  return text.replace(/#[a-z0-9_]+/g, (match) => {
    callback(match);
    return `<span class="tag">${match}</span>`;
  });
}
