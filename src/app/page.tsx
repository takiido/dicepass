'use client';

import '../styles/globals.scss';
import { useState, useEffect } from "react";
import { Header } from "./components/layout/Header";
import { Main } from "./components/layout/Main";
import { Footer } from "./components/layout/Footer";

export default function Home() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const handleThemeChange = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }

  useEffect(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(isDark ? 'dark' : 'light');
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div>
      <Header
        title="DICEPASS"
        description="made by takiido"
        theme={theme}
        onThemeChange={handleThemeChange}
      />
      <Main />
      <Footer />
    </div>
  );
}
