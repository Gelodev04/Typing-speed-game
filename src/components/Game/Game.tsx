"use client";

import { ChangeEvent, KeyboardEvent } from "react";
import { useGameLogic } from "@/hooks/useGameLogic";
import { SentenceDisplay } from "./SentenceDisplay";
import { GameStats } from "./GameStats";
import { ResetButton } from "./ResetButton";
import { ResetTextButton } from "./ResetTextButton";
import { MobileMessage } from "./MobileMessage";
import styles from "./Game.module.css";

export const Game = () => {
  const { state, handleChange, handleReset, handleFocus } = useGameLogic();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    handleChange(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Backspace") {
      e.preventDefault();
    }
  };

  return (
    <>
      <MobileMessage />
      <div className={styles.gameContainer}>
        <h1 className={styles.title}>Type FASTER!</h1>
        <p className={styles.instruction}>
          <strong>Type the sentence below:</strong>
        </p>
        <p className={styles.wpmDisplay}>{state.wpm}</p>

        <SentenceDisplay
          sentence={state.sentence}
          input={state.input}
          showIndicator={state.showIndicator}
          onFocus={handleFocus}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          disabled={!!state.endTime}
        />
        {(state.endTime || state.lastScore.wpm > 0) && (
          <GameStats
            wpm={state.endTime ? state.wpm : state.lastScore.wpm}
            accuracy={state.endTime ? state.accuracy : state.lastScore.accuracy}
          />
        )}
        {(state.endTime || state.lastScore.wpm > 0) && (
          <ResetButton
            onClick={handleReset}
            label={state.endTime ? "Try again" : "Reset"}
          />
        )}
        {state.input.length > 0 && !state.endTime && (
          <div className="mt-5">
            <ResetTextButton onClick={handleReset} />
          </div>
        )}
      </div>
    </>
  );
};
