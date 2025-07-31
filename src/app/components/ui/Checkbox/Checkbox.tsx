import styles from "./Checkbox.module.scss";
import { LuCheck } from "react-icons/lu";

type CheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
};

const Checkbox = ({ checked, onChange }: CheckboxProps) => {    
    return (
        <div className={styles.checkbox}>
            <div className={styles.checkbox__box} onClick={() => {
                onChange(!checked);
            }}>
                {
                    checked && (
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