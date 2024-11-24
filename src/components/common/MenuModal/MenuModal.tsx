import React, { useState } from 'react';
import { Button, BUTTON_VARIANTS } from '../Button/Button';
import styles from './MenuModal.module.css';

interface MenuModalProps {
  showSettings: () => void;
  showMainMenu: () => void;
  onNewGame: () => void;
  isVisible: boolean;
  closeMenuModal: () => void;
}

const MenuModal: React.FC<MenuModalProps> = ({
  showSettings,
  showMainMenu,
  onNewGame,
  isVisible,
  closeMenuModal,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (!isVisible) return null;

  return (
    <div className={styles.menuWrapper}>
      <button 
        className={`${styles.burger} ${isMenuOpen ? styles.open : ''}`}
        onClick={toggleMenu}
      >
        <span></span>
      </button>

      <div className={`${styles.sidemenu} ${isMenuOpen ? styles.open : ''}`}>
        <ul className={styles.main_menu}>
          <li>
            <Button 
              variant={BUTTON_VARIANTS.NEW_GAME} 
              onClick={() => { onNewGame(); toggleMenu(); }}
            >
              Нова гра
            </Button>
          </li>
          <li>
            <Button 
              variant={BUTTON_VARIANTS.CONTINUE} 
              onClick={() => { closeMenuModal(); toggleMenu(); }}
            >
              Продовжити
            </Button>
          </li>
          <li>
            <Button 
              variant={BUTTON_VARIANTS.SETTINGS} 
              onClick={() => { showSettings(); toggleMenu(); }}
            >
              Налаштування
            </Button>
          </li>
          <li>
            <Button 
              variant={BUTTON_VARIANTS.MAIN_MENU} 
              onClick={() => { showMainMenu(); toggleMenu(); }}
            >
              Головне меню
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MenuModal;