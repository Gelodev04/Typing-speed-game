export interface GameStats {
  wpm: number;
  accuracy: number;
}

export interface GameState {
  sentence: string;
  input: string;
  startTime: Date | null;
  endTime: Date | null;
  accuracy: number;
  wpm: number;
  correctChars: number;
  showIndicator: boolean;
  lastScore: GameStats;
}
