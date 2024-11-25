import React from 'react';
import styles from './MenuModal.module.css';

interface MenuModalProps {
    isOpen: boolean;
    toggleMenu: () => void;
}

const MenuModal: React.FC<MenuModalProps> = ({ isOpen, toggleMenu }) => {
    return (
        <div
            className={`${styles.menuWrapper} ${
                isOpen ? styles.visible : ''
            }`}
            onClick={toggleMenu}
        >
            <aside
                className={`${styles.sidemenu} ${
                    isOpen ? styles.open : ''
                }`}
                onClick={(e) => e.stopPropagation()}
            >
                <nav className={styles.main_menu}>
                    <ul>
                        <li>Home</li>
                        <li>About</li>
                        <li>Quiz</li>
                        <li>Contact</li>
                    </ul>
                </nav>
            </aside>
        </div>
    );
};

export default MenuModal;
