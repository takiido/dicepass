'use client';

import { Textbox } from "../../ui/Textbox";
import { Slider } from "../../ui/Slider";
import styles from './Main.module.scss';
import { Dropdown } from "../../ui/Dropdown";
import { useState } from "react";
import { LETTERS_TO_NUMBERS, SEPARATORS } from "@/app/utils/consts";
import { Button } from "../../ui/Button";
import { Dice } from "../../ui/Dice";

export type MainProps = {
}

export type RequestParams = {
    numberOfDices: number;
}

const Main = ({ }: MainProps) => {
    const [numberOfDices, setNumberOfDices] = useState<number>(4);
    const [separator, setSeparator] = useState<string>('None');
    const [replaceLetters, setReplaceLetters] = useState<boolean>(true);
    const [password, setPassword] = useState<string>('');
    const [isRolling, setIsRolling] = useState<boolean>(false);
    const [visible, setVisible] = useState<boolean>(false);

    const generatePassword = async () => {
        setVisible(true);
        setTimeout(() => {
            setIsRolling(true);

        }, 200)

        let words = await fetchWords();
        let password = '';
        for (let i = 0; i < numberOfDices; i++) {
            let word = Object.values(words.passphrase)[i] as string;
            if (replaceLetters) {
                word = leetReplace(word);
            }
            password += word;
            if (i < numberOfDices - 1) {
                password += SEPARATORS[separator as keyof typeof SEPARATORS];
            }
        }
        setTimeout(() => {
            setIsRolling(false);
            setTimeout(() => {
                setVisible(false);
            }, 200)
            setPassword(password);
        }, 500 * numberOfDices);
    }

    const leetReplace = (input: string): string => {
        return input
            .split('')
            .map(char => {
                const lowerChar = char.toLowerCase();
                if (lowerChar in LETTERS_TO_NUMBERS) {
                    // Tell TS this key is valid
                    return LETTERS_TO_NUMBERS[lowerChar as keyof typeof LETTERS_TO_NUMBERS];
                }
                return char;
            })
            .join('');
    }

    const fetchWords = async () => {
        const response = await fetch(`/api/generate?count=${numberOfDices}`);
        const data = await response.json();
        return data;
    }

    return (
        <main>
            <div className="container">
                <div className={styles.generator}>
                    <div className={styles.generator_output}>
                        {
                            visible && (
                                <div
                                    className={styles.casino}
                                    style={{
                                        opacity: isRolling ? 1 : 0,
                                    }}
                                >
                                    {
                                        Array.from({ length: 6 }, (_, index) => (
                                            <div className={styles.casino_dice} key={index}>
                                                <Dice isRolling={isRolling} />
                                            </div>
                                        ))
                                    }
                                </div>
                            )
                        }
                        <Textbox
                            onChange={() => { }}
                            readonly
                            initialValue={password}
                            placeholder="Enter your password"
                        />
                    </div>
                    <div className={styles.generator_parameters}>
                        <div className={styles.generator_parameter}>
                            <div className={styles.generator_parameter_label}>
                                <p>Your roll will include {numberOfDices} words:</p>
                            </div>
                            <Slider
                                min={1}
                                max={6}
                                disabled={isRolling}
                                initialValue={4}
                                onChange={(value) => {
                                    setNumberOfDices(value);
                                }} />
                        </div>
                        <div className={styles.generator_parameter}>
                            <div className={styles.generator_parameter_label}>
                                <p>Replace letters with numbers?</p>
                            </div>
                            <Dropdown
                                options={['Yes', 'No']}
                                disabled={isRolling}
                                onChange={(value) => {
                                    setReplaceLetters(value.target.value === 'Yes');
                                }}
                            />
                        </div>
                        <div className={styles.generator_parameter}>
                            <div className={styles.generator_parameter_label}>
                                <p>Choose preferred word separator:</p>
                            </div>
                            <Dropdown
                                options={Object.keys(SEPARATORS)}
                                disabled={isRolling}
                                onChange={(value) => {
                                    setSeparator(value.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <div className={styles.generator_button}>
                        <Button
                            disabled={isRolling}
                            onClick={() => {
                                generatePassword();
                            }}
                            text="Roll the dice"
                        />
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Main;