'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Slider.module.scss';

export type SliderProps = {
  min: number;
  max: number;
  initialValue: number;
  step?: number;
  onChange?: (value: number) => void;
  className?: string;
  disabled?: boolean;
}

const Slider = ({ 
  min,
  max,
  initialValue,
  step,
  onChange,
  className,
  disabled,
}: SliderProps) => {
  const [percent, setPercent] = useState(0);
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setPercent(((initialValue - min) / (max - min)) * 100);
  }, [initialValue, max, min]);

  return (
    <div className={styles.slider}>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          className={`${styles.slider__input} ${className}`}
          disabled={disabled}
          onChange={(e) => {
            const value = Number(e.target.value);
            setPercent(((value - min) / (max - min)) * 100);
            setValue(value);
            onChange?.(value);
          }}
        />
        <div className={styles.slider__progress}
          style={{ width: `${percent}%` }}
        />
    </div>
  );
};

export default Slider;