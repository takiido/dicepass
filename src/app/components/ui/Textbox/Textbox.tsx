'use client';

import styles from './Textbox.module.scss';
import { useState, useEffect } from 'react';

export type TextboxProps = {
    initialValue?: string;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    readonly?: boolean;
    onChange: (value: string) => void;
}

const Textbox = ({
    initialValue,
    placeholder,
    disabled,
    className,
    readonly,
    onChange
}: TextboxProps) => {
    const [value, setValue] = useState(initialValue || '');

    useEffect(() => {
        setValue(initialValue || '');
    }, [initialValue]);
    
    return (
        <div className={styles.textbox}>
            <input
                type="text"
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }}
                placeholder={placeholder}
                disabled={disabled}
                readOnly={readonly}
                className={`${styles.textbox__input} 
                    ${readonly ? styles.textbox__input_readonly : ''}
                    ${disabled ? styles.textbox__disabled : ''}
                ${className}`}
            />
        </div>
    )
}

export default Textbox;