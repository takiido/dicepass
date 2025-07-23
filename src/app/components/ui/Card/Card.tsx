import styles from "./Card.module.scss";

export type CardProps = {
    title: string;
    description: React.ReactNode;
    icon: React.ReactNode;
}

const Card = ({
    title,
    description,
    icon,
}: CardProps) => {
    return (
        <div className={styles.card}>
            <div className={styles.card__title}>
                {icon}
                {title}
            </div>
            <div className={styles.card__description}>
                {description}
            </div>
        </div>
    )
}

export default Card;