'use client';

import Image from "next/image";
import { Button } from "./components/ui/Button";
import { Slider } from "./components/ui/Slider";
import { Textbox } from "./components/ui/Textbox";

import '../styles/globals.scss';
import { useState, useEffect } from "react";
import { 
  FaAirbnb,
  FaMoon,
  FaSun,
} from "react-icons/fa";

export default function Home() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const test = () => {  
    console.log("test");
  }

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
      <main>
        Theme toggle
        <Button 
          text="Toggle theme" 
          icon={theme === 'light' ? <FaSun /> : <FaMoon />} 
          onClick={handleThemeChange} 
        />
        Default button
        <Button text="Generate" onClick={test} />
        Disabled button
        <Button text="Generate" onClick={test} disabled />
        Icon button
        <Button onClick={test} icon={<FaAirbnb />} />
        Disabled icon button
        <Button onClick={test} icon={<FaAirbnb />} disabled />
        Disabled text and icon button
        <Button text="Generate" onClick={test} icon={<FaAirbnb />} disabled />
        Slider
        <Slider min={1} max={6} initialValue={4} />
        Textbox
        <Textbox placeholder="Hello" onChange={test} initialValue="Hello" />
        Disabled textbox
        <Textbox placeholder="Hello" onChange={test} initialValue="Hello" disabled />
        Readonly textbox
        <Textbox placeholder="Hello" onChange={test} initialValue="Hello" readonly />

      </main>
    </div>
  );
}
