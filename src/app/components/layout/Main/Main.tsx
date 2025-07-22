'use client';

import { Textbox } from "../../ui/Textbox";
import { Slider } from "../../ui/Slider";
import styles from './Main.module.scss';
import { Dropdown } from "../../ui/Dropdown";
import { useEffect, useState } from "react";
import { LETTERS_TO_NUMBERS, SEPARATORS } from "@/app/utils/consts";
import { Button } from "../../ui/Button";
import { FaDiceOne } from "react-icons/fa";

export type MainProps = {
}

export type RequestParams = {
    numberOfDices: number;
}

const Main = ({ }: MainProps) => {
    const [numberOfDices, setNumberOfDices] = useState<number>(4);
    const [separator, setSeparator] = useState<string>('None');
    const [replaceLetters, setReplaceLetters] = useState<boolean>(true);
    const [words, setWords] = useState<string[]>([]);
    const [password, setPassword] = useState<string>('');

    const generatePassword = async () => {
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
        setPassword(password);
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
                <h1>DICEPASS</h1>
                <div className={styles.generator}>
                    <Textbox
                        onChange={() => { }}
                        readonly
                        initialValue={password}
                        placeholder="Enter your password"
                    />
                    <div className={styles.generator_parameters}>
                        <div className={styles.generator_parameter}>
                            <div className={styles.generator_parameter_label}>
                                <p>Your roll will include {numberOfDices} words:</p>
                            </div>
                            <Slider
                                min={1}
                                max={6}
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
                                onChange={(value) => {
                                    setSeparator(value.target.value);
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.casino}>
                    <Button
                        onClick={() => {
                            generatePassword();
                        }}
                        text="Roll the dice"
                    />
                    <div className={styles.casino_dices}>
                        {
                            Array.from({ length: 6 }, (_, index) => (
                                <div className={styles.casino_dice} key={index}>
                                    <FaDiceOne/>
                                    <p>number</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Main;