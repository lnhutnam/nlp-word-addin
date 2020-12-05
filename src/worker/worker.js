import { preprocess, getSentences, countPuncMarks, getWords, wordAnalyze } from '../utils/lang-vn';

function analyze(data) {
  const { paragraphs, text } = data;
  const parTokens = preprocess(paragraphs);
  const sentTokens = getSentences(parTokens);
  let words = [];
  for (const token of sentTokens) {
    words.push(...getWords(token));
  }
  const { charsCount, syllablesCount } = wordAnalyze(words);
  const puncMarksCount = countPuncMarks(text);
  const wordsCount = words.length;
  const sentsCount = sentTokens.length;
  const parsCount = paragraphs.length;

  return {charsCount, syllablesCount, puncMarksCount, wordsCount, sentsCount, parsCount};
}

self.addEventListener('message', e => {
  const dataObj = JSON.parse(e.data);
  self.postMessage(analyze(dataObj)); // send back data
});