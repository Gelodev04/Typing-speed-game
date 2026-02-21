"use client";

import { GAME_CONFIG } from "@/lib/constants";
import styles from "./GameStats.module.css";

interface GameStatsProps {
  wpm: number;
  accuracy: number;
}

export const GameStats = ({ wpm, accuracy }: GameStatsProps) => {
  const wpmClassName =
    wpm > GAME_CONFIG.WPM_THRESHOLD ? styles.good : styles.bad;
  const accuracyClassName =
    accuracy > GAME_CONFIG.ACCURACY_THRESHOLD ? styles.good : styles.bad;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Results</h2>
      <p className={styles.stat}>
        <span>WPM:</span> <span className={wpmClassName}>{wpm}</span>
      </p>
      <p className={styles.stat}>
        <span>Accuracy:</span>{" "}
        <span className={accuracyClassName}>{accuracy}</span>%
      </p>
    </div>
  );
};
