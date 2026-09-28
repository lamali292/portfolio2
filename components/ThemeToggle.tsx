"use client";

import { useEffect, useState } from "react";
import styles from "./ThemeToggle.module.css";

type Theme = "light" | "dark";

function systemPrefersDark(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-color-scheme: dark)").matches
  );
}

/**
 * Site-wide light/dark toggle. Defaults to system preference (no stored
 * choice), persists a manual choice to localStorage, and never causes a
 * flash of the wrong theme because ThemeScript already applied any stored
 * value before this component hydrates.
 */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem("theme");
    } catch {
      // localStorage unavailable (private mode, blocked storage) - fall
      // back to system preference below, per-viewer convenience only.
    }
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
    } else {
      setTheme(systemPrefersDark() ? "dark" : "light");
    }
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Best-effort only; theme still applies for this page view.
    }
  }

  // Avoid rendering a possibly-wrong icon before we know the real theme.
  if (theme === null) {
    return <button className={styles.toggle} aria-label="Theme umschalten" disabled />;
  }

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggle}
      aria-label={theme === "dark" ? "Zu hellem Design wechseln" : "Zu dunklem Design wechseln"}
      title={theme === "dark" ? "Helles Design" : "Dunkles Design"}
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}
