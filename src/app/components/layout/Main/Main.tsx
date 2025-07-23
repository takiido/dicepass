'use client';

import { Textbox } from "../../ui/Textbox";
import { Slider } from "../../ui/Slider";
import styles from './Main.module.scss';
import { Dropdown } from "../../ui/Dropdown";
import { useState } from "react";
import { LETTERS_TO_NUMBERS, SEPARATORS } from "@/app/utils/consts";
import { Dice } from "../../ui/Dice";
import {
    LuRefreshCcw,
    LuBraces,
    LuDice5,
    LuBrain
} from "react-icons/lu";
import { Card } from "../../ui/Card";

export type RequestParams = {
    numberOfDices: number;
}

const Main = () => {
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

        const words = await fetchWords();
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
        <main className={styles.main}>
            <div className="container">
                <div className={styles.generator}>
                    <div className={styles.generator__output}>
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
                                            <div className={styles.casino__dice} key={index}>
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
                            placeholder="Your password will appear here"
                            copy
                            disabled={isRolling}
                            customButton
                            customButtonIcon={<LuRefreshCcw />}
                            customButtonOnClick={() => {
                                generatePassword();
                            }}
                        />
                    </div>
                    <div className={styles.generator__parameters}>
                        <div className={styles.generator__parameter}>
                            <div className={styles.generator__parameter__label}>
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
                        <div className={styles.generator__parameter}>
                            <div className={styles.generator__parameter__label}>
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
                        <div className={styles.generator__parameter}>
                            <div className={styles.generator__parameter__label}>
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
                </div>
                <div className={styles.cards}>
                    <Card
                        title="Diceware Method"
                        description={
                            <>
                                <p>
                                    Diceware is a technique for generating secure passphrases using physical dice and a predefined wordlist. Each word in the list is mapped to a unique five-digit number, which you create by rolling a six-sided die five times.                                </p>
                                <p>
                                    By repeating this process for multiple words, you build a passphrase made up of random, unrelated words. The randomness of the dice ensures that the result is both strong and difficult to predict.                                </p>
                            </>
                        }
                        icon={<LuDice5 />}
                    />
                    <Card
                        title="Why Diceware?"
                        description={
                            <ul>
                                <li>
                                    <strong>Secure:</strong> Random words mean high entropy. Hackers can’t guess what real dice gave you.
                                </li>
                                <li>
                                    <strong>Memorable:</strong>  Real words are easier to remember than weird symbols or numbers.
                                </li>
                                <li>
                                    <strong>Easy to Type:</strong> No more shifting for symbols — just type simple words and you’re in.
                                </li>
                            </ul>
                        }
                        icon={<LuBrain />}
                    />
                    <Card
                        title="Dicepass"
                        description={
                            <>
                                <p>
                                    DicePass is a project designed to make Diceware password generation simple and accessible. Built with Next.js, it offers a clean and responsive interface that lets you generate secure passphrases quickly and easily.
                                </p>
                                <p>
                                    The word lists used come from trusted sources to ensure strong randomness and high entropy, creating passwords that are both safe and user-friendly. You can customize how many words you want in your passphrase right on the page.
                                </p>
                                <p>
                                    The project is fully open source, and you can find a link to the code repository in the top navigation bar for easy access and contributions.
                                </p>
                            </>
                        }
                        icon={<LuBraces />}
                    />
                </div>
            </div>
        </main>
    )
}

export default Main;