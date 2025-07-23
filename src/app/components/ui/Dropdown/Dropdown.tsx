import { useEffect, useRef, useState } from 'react';
import styles from './Dropdown.module.scss';
import { LuGripHorizontal } from 'react-icons/lu';

export type DropdownProps = {
    options: string[];
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    disabled?: boolean;
};

const Dropdown = ({ 
    options, 
    onChange, 
    disabled = false 
}: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(options[0]);
    const [scrollTop, setScrollTop] = useState(0);

    const dropdownRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const startY = useRef(0);
    const startScrollTop = useRef(0);

    const SCROLLBAR_HEIGHT = 70;

    const handleScroll = () => {
        if (listRef.current) {
            setScrollTop(listRef.current.scrollTop);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleMouseDown = (e: React.MouseEvent) => {
        isDragging.current = true;
        startY.current = e.clientY;
        startScrollTop.current = listRef.current?.scrollTop || 0;
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging.current || !listRef.current) return;

        const deltaY = e.clientY - startY.current;
        const list = listRef.current;
        const maxScroll = list.scrollHeight - list.clientHeight;
        const scrollDelta = (deltaY / SCROLLBAR_HEIGHT) * maxScroll;

        let newScrollTop = startScrollTop.current + scrollDelta;
        newScrollTop = Math.max(0, Math.min(maxScroll, newScrollTop));
        list.scrollTop = newScrollTop;
    };

    const handleMouseUp = () => {
        isDragging.current = false;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };

    useEffect(() => {
        const ref = listRef.current;
        if (ref) {
            ref.addEventListener('scroll', handleScroll);
            return () => ref.removeEventListener('scroll', handleScroll);
        }
    }, []);

    const getThumbTop = () => {
        if (!listRef.current) return 0;
        const list = listRef.current;
        const maxScroll = list.scrollHeight - list.clientHeight;
        if (maxScroll === 0) return 0;
        return (scrollTop / maxScroll) * SCROLLBAR_HEIGHT;
    };

    return (
        <div
            className={`${styles.dropdown} 
                ${isOpen ? styles.dropdown__open : ''}
                ${disabled ? styles.dropdown__disabled : ''}`
            }
            ref={dropdownRef}
        >
            <div
                className={styles.dropdown__selected}
                onClick={() => {
                    if (disabled) return;
                    setIsOpen(!isOpen);
                }}
            >
                {selectedOption}
            </div>
            <div
                ref={listRef}
                className={`${styles.dropdown__list} 
                    ${isOpen ? styles.dropdown__list__open : ''} 
                    ${options.length <= 2 ? styles.dropdown__list__noscroll : ''}`}
                onScroll={handleScroll}
            >
                {options.map((option) => (
                    <div
                        key={option}
                        className={styles.dropdown__list__item}
                        onClick={() => {
                            setSelectedOption(option);
                            setIsOpen(false);
                            onChange({ target: { value: option } } as React.ChangeEvent<HTMLSelectElement>);
                        }}
                    >
                        {option}
                    </div>
                ))}
            </div>
            {
                isOpen && options.length > 2 && (
                    <div className={styles.dropdown__list__scrollbar}>
                        <div className={styles.dropdown__list__scrollbar__rails}>
                            <LuGripHorizontal
                                style={{ top: `${getThumbTop()}px`, position: 'absolute', cursor: 'grab' }}
                                onMouseDown={handleMouseDown}
                            />
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default Dropdown;
