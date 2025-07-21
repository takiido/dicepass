import Image from "next/image";
import { FaGithub, FaMoon, FaSun } from "react-icons/fa";
import { Button } from "../../ui/Button";
import styles from './Header.module.scss';

export type HeaderProps = {
  title: string;
  description: string;
  theme: 'light' | 'dark';
  onThemeChange: () => void;
}

const Header = ({ 
    title,
    description,
    theme,
    onThemeChange,
}: HeaderProps) => {

  return (
    <header>
      <div className={`${styles.header}`}>
        <div className={styles.header__logo}>
        <Image 
            onClick={() => {
                window.location.href = 'https://takiido.dev';
            }}
            src="/m_logo.png" 
            alt="logo" 
            width={32} 
            height={32} 
            className={styles.header__logo_image}
        />
        </div>
        <div className={styles.header__title}>
            <a href="/">{title}</a>
        </div>
        <div className={styles.header__actions}>
            <Button
                icon={<FaGithub />}
                onClick={() => {
                    window.open('https://github.com/takiido/dicepass', '_blank');
                }}
            />
            <Button
                icon={theme === 'light' ? <FaSun /> : <FaMoon />}
                onClick={onThemeChange}
            />
        </div>
      </div>
    </header>
  )
}

export default Header;