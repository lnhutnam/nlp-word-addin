import { preprocess, getSentences, countPuncMarks, getWords, wordAnalyze } from '../utils/lang-vn';

function analyze(paragraphs) {
  const parTokens = preprocess(paragraphs);
  const sentTokens = getSentences(parTokens);
  let words = [];
  for (const token of sentTokens) {
    words.push(...getWords(token));
  }
  const { lettersCount, syllablesCount } = wordAnalyze(words);
  const wordsCount = words.length;
  const sentsCount = sentTokens.length;
  let charsCount = 0;
  for (let paragraph of paragraphs) {
    charsCount += paragraph.text.length;
  }

  return {lettersCount, charsCount, syllablesCount, wordsCount, sentsCount};
}

self.addEventListener('message', e => {
  const { paragraphs, text } = JSON.parse(e.data);
  let resLettersCount = 0;
  let resCharsCount = 0;
  let resSyllablesCount = 0;
  let resWordsCount = 0;
  let resSentsCount = 0;
  let resPuncMarksCount = countPuncMarks(text);
  let resParsCount = paragraphs.length;
  for (let i = 0; i < resParsCount; i += 10) {
    const {lettersCount, charsCount, syllablesCount, wordsCount, sentsCount} = analyze(paragraphs.slice(i, i + 10));
    resLettersCount += lettersCount;
    resCharsCount += charsCount;
    resSyllablesCount += syllablesCount;
    resWordsCount += wordsCount;
    resSentsCount += sentsCount;
    self.postMessage({ resLettersCount, resCharsCount, resSyllablesCount, resPuncMarksCount, resWordsCount, resSentsCount, resParsCount }); // send back data
  }
});