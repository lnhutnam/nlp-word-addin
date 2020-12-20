import { loadDict } from '../lib/dictionary/loadDict';

export const VNDICT = loadDict();

import Tokenizer from '../lib/tokenizer/tokenizer';
const tokenizer = new Tokenizer();

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

// puncs num
export function countPuncMarks(bodyText) {
  const match = bodyText.match(/[,."!?'”“]/g);
  return match ? match.length : 0;
}

// avg sents / para
// avg words / sent
// avg chars / word

function flagTokens(flags, start, end) {
  for (let i = start; i < end; i++) {
    flags[i] = 1;
  }
}

function tokenUsed(flags, start, end) {
  for (let i = start; i < end; i++) {
    return flags[i] === 1;
  }
  return false;
}

const rgx_specials = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
const rgx_space = /\s+/g;
const rgx_spacedash = /[-\s+]/g
// words per sentence
const MAX_WORD_LEN = 5;
export function getWords(sentToken) {
  let words = [];
  let len = sentToken.length;
  let tokens = [...sentToken];
  let flags = Array(len).fill(0);
  let wLen = len < MAX_WORD_LEN ? len : MAX_WORD_LEN;
  while (wLen !== 0) {
    let i = 0;
    while (i + wLen <= len) {
      if (!tokenUsed(flags, i, i + wLen)) {
        const curTokens = tokens.slice(i, i + wLen);
        const curW = curTokens.join(' ').toLowerCase().trim();

        if (VNDICT.indexOf(curW) !== -1 || (wLen === 1 && !rgx_specials.test(curW))) {
          words.push(curW);
          flagTokens(flags, i, i + wLen);
        }
      } 
      i++;
    }
    wLen--;
  }
  return words;
}

export function wordAnalyze(words) {
  let charsCount = 0;
  let syllablesCount = 0;
  for (const w of words) {
    const matches = w.match(rgx_spacedash);
    syllablesCount += matches ? matches.length + 1 : 1;
    const t_w = w.replace(rgx_space, '');
    charsCount += t_w.length;
  }
  return { charsCount, syllablesCount };
}