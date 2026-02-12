import React, { FC } from "react";
import * as styles from "./Header.module.scss";

export type HeaderVariant = "form" | "menu";

interface HeaderProps {
  variant: HeaderVariant;
  title: string;
  onIconClick: () => void;
}

export const Header: FC<HeaderProps> = ({ variant, title, onIconClick }) => {
  const Icon = variant === "form" ? BurgerIcon : BackIcon;

  return (
    <header className={styles.header}>
      <button
        type="button"
        className={styles.iconButton}
        onClick={onIconClick}
        aria-label={variant === "form" ? "Open menu" : "Go back"}
      >
        <Icon />
      </button>
      <h1 className={styles.title}>{title}</h1>
    </header>
  );
};

const BurgerIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path
      d="M3 6h18M3 12h18M3 18h18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const BackIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path
      d="M19 12H5M12 19l-7-7 7-7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
