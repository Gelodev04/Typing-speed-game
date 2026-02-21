import { useState, useEffect, useCallback } from "react";
import { GameState, GameStats } from "@/types/game";
import { saveGameScore } from "@/lib/game/saveScore";
import {
  getRandomSentence,
  calculateAccuracy,
  calculateWPM,
} from "@/lib/utils";
import { GAME_CONFIG } from "@/lib/constants";

const INITIAL_STATE: GameState = {
  sentence: "",
  input: "",
  startTime: null,
  endTime: null,
  accuracy: 0,
  wpm: 0,
  correctChars: 0,
  showIndicator: true,
  lastScore: { wpm: 0, accuracy: 0 },
};

export const useGameLogic = () => {
  const [state, setState] = useState<GameState>(INITIAL_STATE);

  useEffect(() => {
    setState((prev) => ({ ...prev, sentence: getRandomSentence() }));
  }, []);

  useEffect(() => {
    if (state.startTime && !state.endTime) {
      const interval = setInterval(() => {
        const currentTime = new Date();
        const durationInMinutes = Math.max(
          (currentTime.getTime() - (state.startTime?.getTime() || 0)) / 60000,
          GAME_CONFIG.MIN_DURATION_MINUTES
        );

        const totalCharsTyped = state.input.length;
        const incorrectChars = totalCharsTyped - state.correctChars;
        const wordsTyped =
          (totalCharsTyped - incorrectChars) / GAME_CONFIG.CHARS_PER_WORD;

        const accuracy = calculateAccuracy(
          state.sentence,
          state.input,
          totalCharsTyped
        );
        const wpm = calculateWPM(
          totalCharsTyped,
          incorrectChars,
          durationInMinutes
        );

        setState((prev) => ({
          ...prev,
          accuracy,
          wpm,
        }));
      }, GAME_CONFIG.UPDATE_INTERVAL_MS);

      return () => clearInterval(interval);
    }
  }, [
    state.input,
    state.startTime,
    state.endTime,
    state.sentence,
    state.correctChars,
  ]);

  const handleChange = useCallback(
    (value: string) => {
      if (!state.startTime) {
        setState((prev) => ({ ...prev, startTime: new Date() }));
      }

      if (value.length > state.input.length) {
        const newChar = value[value.length - 1];
        const charIndex = state.input.length;
        // Only count as correct if it matches the expected character at that position
        if (
          charIndex < state.sentence.length &&
          newChar === state.sentence[charIndex]
        ) {
          setState((prev) => ({
            ...prev,
            correctChars: prev.correctChars + 1,
          }));
        }
        // Characters typed beyond sentence length or wrong characters don't increment correctChars
        // correctChars represents the actual count of correct characters typed
      }

      setState((prev) => ({
        ...prev,
        input: value,
        showIndicator: false,
      }));

      if (value.length >= state.sentence.length) {
        setState((prev) => ({
          ...prev,
          endTime: new Date(),
          lastScore: { wpm: prev.wpm, accuracy: prev.accuracy },
        }));

        saveGameScore(state.wpm, state.accuracy).catch((err) => {
          console.error("Failed to save score:", err);
          // Don't show error to user, just log it
        });
      }
    },
    [state.startTime, state.input, state.sentence, state.wpm, state.accuracy]
  );

  const handleReset = useCallback(() => {
    setState((prev) => ({
      ...prev,
      lastScore: { wpm: prev.wpm, accuracy: prev.accuracy },
      input: "",
      startTime: null,
      endTime: null,
      accuracy: 0,
      wpm: 0,
      correctChars: 0,
      showIndicator: true,
      sentence: getRandomSentence(),
    }));
  }, []);

  const handleFocus = useCallback(() => {
    setState((prev) => ({ ...prev, showIndicator: false }));
  }, []);

  return {
    state,
    handleChange,
    handleReset,
    handleFocus,
  };
};
