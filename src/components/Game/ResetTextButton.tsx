"use client";

import styles from "./ResetTextButton.module.css";

interface ResetTextButtonProps {
  onClick: () => void;
}

export const ResetTextButton = ({ onClick }: ResetTextButtonProps) => {
  return (
    <button
      type="button"
      className="text-2xl"
      onClick={onClick}
      aria-label="Reset typing"
    >
      Reset
    </button>
  );
};
