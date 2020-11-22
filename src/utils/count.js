export function countWords(paragraphs) {
  let count = 0;
  for (const paragraph of paragraphs) {
    count += paragraph.text.split(' ').length;
  }
  return count;
}
  
export function countPuncMarks(bodyText) {
  return bodyText.match(/[,."!?'”“]/g).length;
}