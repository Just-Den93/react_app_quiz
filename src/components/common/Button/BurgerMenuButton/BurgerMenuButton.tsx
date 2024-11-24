import React, { useState } from 'react';
import styles from './BurgerMenuButton.Module.css';

const BurgerMenuButton: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen((prevState) => !prevState);
    };

    return (
        <div style={{width: '100%', height: '100vh'}}>
            <nav>
                <div className={styles.burger_menu}>
                    <div className={styles.burger_class} ></div>
                    <div className={styles.burger_class} ></div>
                    <div className={styles.burger_class} ></div>
                </div>
            </nav>

            <div className={styles.menu_class}></div>
        </div>
    );
};

export default BurgerMenuButton;
