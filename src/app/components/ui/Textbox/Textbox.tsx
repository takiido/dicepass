'use client';

import { FaCheck, FaCopy } from 'react-icons/fa';
import { Button } from '../Button';
import styles from './Textbox.module.scss';
import { useState, useEffect } from 'react';

export type TextboxProps = {
    initialValue?: string;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    readonly?: boolean;
    copy?: boolean;
    customButton?: boolean;
    customButtonIcon?: React.ReactNode;
    customButtonOnClick?: () => void;
    onChange: (value: string) => void;
}

const Textbox = ({
    initialValue,
    placeholder,
    disabled,
    className,
    readonly,
    copy,
    onChange,
    customButton,
    customButtonIcon,
    customButtonOnClick
}: TextboxProps) => {
    const [value, setValue] = useState(initialValue || '');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        setValue(initialValue || '');
    }, [initialValue]);

    const handleCopy = () => {
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 1000);
    }
    
    return (
        <div className={styles.textbox}>
            {
                customButton && (
                    <Button 
                        onClick={customButtonOnClick || (() => {})} 
                        icon={customButtonIcon} 
                        className={styles.textbox__custom_button}
                        disabled={disabled}
                    />
                )
            }
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
            {
                copy && (
                    <Button 
                        onClick={handleCopy} 
                        icon={copied ? <FaCheck/> : <FaCopy/>} 
                        className={styles.textbox__copy}
                        disabled={copied || disabled}
                    />
                )
            }
        </div>
    )
}

export default Textbox;