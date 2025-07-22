'use client';

import { useEffect, useState } from 'react';
import styles from './Dice.module.scss';
import {
  FaDiceOne,
  FaDiceTwo,
  FaDiceThree,
  FaDiceFour,
  FaDiceFive,
  FaDiceSix,
} from 'react-icons/fa';

export type DiceProps = {
  isRolling: boolean;
  number?: number; // 1 to 6
};

const diceIcons = [FaDiceOne, FaDiceTwo, FaDiceThree, FaDiceFour, FaDiceFive, FaDiceSix];

const Dice = ({ isRolling, number }: DiceProps) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!isRolling) {
      return;
    }
    const interval = setInterval(() => {
      setIndex(() => Math.floor(Math.random() * diceIcons.length));
    }, 500);

    return () => clearInterval(interval);
  }, [isRolling]);

  const IconComponent =
    !isRolling && number && number >= 1 && number <= 6
      ? diceIcons[number - 1]
      : diceIcons[index];

  return (
    <div className={`${styles.dice} ${isRolling ? styles.dice__rolling : ''}`}>
      <IconComponent size={48} />
    </div>
  );
};

export default Dice;
