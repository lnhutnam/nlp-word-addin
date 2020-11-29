import Tokenizer from '../lib/tokenizer/tokenizer'
const tokenizer = new Tokenizer();

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

export function preprocess(paragraphs) {
  let parTokens = [];
  for (const paragraph of paragraphs) {
    parTokens.push(tokenizer.tokenize(paragraph.text));
  }
  return parTokens;
}

export function getSentences(parTokens) {
  let sentences = [];
  for (let tokens of parTokens) {
    const len = tokens.length;
    let start = 0;
    for (let i = 0; i < len; i++) {
      if (tokens[i] === '.' || tokens[i] === '?' || tokens[i] === '!') {
        sentences.push(tokens.slice(start, i + 1));
        start = i + 1;
      } else if (i === len - 1) {
        sentences.push(tokens.slice(start, len));
      }
    }
  }
  return sentences;
}