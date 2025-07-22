import styles from './Button.module.scss';

export type ButtonProps = {
    text?: string;
    onClick: () => void;
    className?: string;
    disabled?: boolean;
    icon?: React.ReactNode;
}

const Button = ({
    text,
    onClick,
    className,
    disabled,
    icon,
}: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={
                `${styles.button} 
                ${icon && !text ? styles['button--icon'] : ''} 
                ${className}`
            }
            disabled={disabled}
        >
            {icon}
            {text}
        </button>
    );
};

export default Button;