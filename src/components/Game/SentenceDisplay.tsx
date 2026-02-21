"use client";

import { ChangeEvent, KeyboardEvent } from "react";
import styles from "./SentenceDisplay.module.css";

interface SentenceDisplayProps {
  sentence: string;
  input: string;
  showIndicator: boolean;
  onFocus: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  disabled: boolean;
}

export const SentenceDisplay = ({
  sentence,
  input,
  showIndicator,
  onFocus,
  onChange,
  onKeyDown,
  disabled,
}: SentenceDisplayProps) => {
  const renderInput = () => {
    const inputChars = input.split("");
    const sentenceChars = sentence.split("");

    return sentenceChars.map((char, idx) => {
      let bgColor = "";
      if (inputChars[idx] === char) {
        bgColor = "bg-green-500";
      } else if (inputChars[idx] !== undefined) {
        bgColor = "bg-red-400";
      }
      return (
        <span key={idx} className={`${bgColor} bg-opacity-[0.8]`}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className={styles.container}>
      {showIndicator && <div className={styles.indicator} />}
      <p className={styles.sentence}>{renderInput()}</p>
      <input
        type="text"
        className={styles.input}
        value={input}
        spellCheck="false"
        onChange={onChange}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        disabled={disabled}
        style={{ color: "transparent", height: "100%" }}
      />
    </div>
  );
};
