import Image from "next/image";
import {
  LuGithub,
  LuSun,
  LuMoon
} from "react-icons/lu";
import { Button } from "../../ui/Button";
import styles from './Header.module.scss';
import Link from "next/link";

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
          <Link href="/">
            {title}
          </Link>
        </div>
        <div className={styles.header__actions}>
            <Button
                icon={<LuGithub />}
                onClick={() => {
                    window.open('https://github.com/takiido/dicepass', '_blank');
                }}
            />
            <Button
                icon={theme === 'light' ? <LuSun /> : <LuMoon />}
                onClick={onThemeChange}
            />
        </div>
      </div>
    </header>
  )
}

export default Header;