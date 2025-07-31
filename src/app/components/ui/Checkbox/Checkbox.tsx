"use client";

import { useState } from "react";
import styles from "./Checkbox.module.scss";
import { LuCheck } from "react-icons/lu";

type CheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
};

const Checkbox = ({ checked, onChange }: CheckboxProps) => {
    const [isChecked, setIsChecked] = useState(checked);
    
    return (
        <div className={styles.checkbox}>
            <div className={styles.checkbox__box} onClick={() => {
                setIsChecked(!isChecked);
                onChange(!isChecked);
            }}>
                {
                    isChecked && (
                        <div className={styles.checkbox__box__icon}>
                            <LuCheck />
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Checkbox;