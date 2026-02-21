import { RANDOM_SENTENCES } from "./constants";

export const getRandomSentence = (): string => {
  return RANDOM_SENTENCES[Math.floor(Math.random() * RANDOM_SENTENCES.length)];
};

export const calculateAccuracy = (
  sentence: string,
  input: string,
  totalCharsTyped: number
): number => {
  if (totalCharsTyped === 0) return 0;

  const minLength = Math.min(sentence.length, input.length);
  const charsCorrect = sentence
    .split("")
    .slice(0, minLength)
    .filter((char, idx) => char === input[idx]).length;

  // Extra characters typed beyond sentence length count as errors
  const extraChars = Math.max(0, input.length - sentence.length);
  const totalErrors = minLength - charsCorrect + extraChars;
  const accuracy = ((totalCharsTyped - totalErrors) / totalCharsTyped) * 100;

  return Math.round(Math.max(0, Math.min(100, accuracy)));
};

export const calculateWPM = (
  totalCharsTyped: number,
  incorrectChars: number,
  durationInMinutes: number
): number => {
  const wordsTyped = (totalCharsTyped - incorrectChars) / 5;
  return Math.round(wordsTyped / durationInMinutes);
};
