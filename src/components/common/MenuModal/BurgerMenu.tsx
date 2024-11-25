import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Button, BUTTON_VARIANTS } from '../Button/Button';
import styles from './BurgerMenu.module.css';

interface BurgerMenuProps {
    isOpen: boolean;
    onStateChange: (state: { isOpen: boolean }) => void;
}

const BurgerMenu: React.FC<BurgerMenuProps> = ({ isOpen, onStateChange }) => {
    const menuStyles = {
        bmBurgerButton: {
            position: 'fixed' as const,
            width: '36px',
            height: '30px',
            left: '36px',
            top: '36px',
            zIndex: '1100',
            filter: 'saturate(2)'
        },
        bmBurgerBars: {
            background: '#03564a'
        },
        bmBurgerBarsHover: {
            background: '#03564a'
        },
        bmCrossButton: {
            height: '24px',
            width: '24px',
            right: '24px',
            top: '24px',
            filter: 'saturate(2)'
        },
        bmCross: {
            background: '#03564a'
        },
        bmMenuWrap: {
            position: 'fixed' as const,
            height: '100%',
            width: '300px',
            top: '0',
            left: '0',
            zIndex: '1200'
        },
        bmMenu: {
            background: '#03564a',
            padding: '2.5em 1.5em 0',
            fontSize: '1.15em'
        },
        bmMorphShape: {
            fill: '#03564a'
        },
        bmItemList: {
            color: '#b8b7ad',
            padding: '0.8em',
            display: 'flex',
            flexDirection: 'column' as const,
            gap: '1rem'
        },
        bmItem: {
            display: 'block',
            width: '100%',
            outline: 'none'
        },
        bmOverlay: {
            background: 'rgba(0, 0, 0, 0.7)',
            position: 'fixed' as const,
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            zIndex: '1100'
        }
    };

    const handleNewGame = () => {
        // Добавить обработчик для новой игры
    };

    const handleContinue = () => {
        // Добавить обработчик для продолжения
    };

    const handleMainMenu = () => {
        // Добавить обработчик для главного меню
    };

    const handleSettings = () => {
        // Добавить обработчик для настроек
    };

    return (
        <Menu
            isOpen={isOpen}
            onStateChange={onStateChange}
            styles={menuStyles}
            pageWrapId="page-wrap"
            outerContainerId="outer-container"
            width="300"
            crossButtonClassName={styles.crossBtn}
        >
            <Button
                variant={BUTTON_VARIANTS.NEW_GAME}
                onClick={handleNewGame}
            />
            <Button
                variant={BUTTON_VARIANTS.CONTINUE}
                onClick={handleContinue}
            />
            <Button
                variant={BUTTON_VARIANTS.MAIN_MENU}
                onClick={handleMainMenu}
            />
            <Button
                variant={BUTTON_VARIANTS.SETTINGS}
                onClick={handleSettings}
            />
        </Menu>
    );
};

export default BurgerMenu;