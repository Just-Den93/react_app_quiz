// src/components/common/MenuModal/MenuModal.tsx
import React from 'react';
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
  return (
    <div
      id="menu-modal"
      className={styles.menuModal}
      style={{ display: isVisible ? 'flex' : 'none', opacity: isVisible ? 1 : 0 }}
    >
      <div className={styles.menuModalContent}>
        <Button
          variant={BUTTON_VARIANTS.NEW_GAME}
          onClick={onNewGame}
        >
          Нова гра
        </Button>
        <Button
          variant={BUTTON_VARIANTS.CONTINUE}
          onClick={closeMenuModal}
        >
          Продовжити
        </Button>
        <Button
          variant={BUTTON_VARIANTS.SETTINGS}
          onClick={showSettings}
        >
          Налаштування
        </Button>
        <Button
          variant={BUTTON_VARIANTS.MAIN_MENU}
          onClick={showMainMenu}
        >
          Головне меню
        </Button>
      </div>
    </div>
  );
};

export default MenuModal;
