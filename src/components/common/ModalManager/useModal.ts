// useModal.ts
import { useCallback } from 'react';
import { useModalContext } from '../../../context/ModalContext';

interface ModalState {
  settings: boolean;
  menu: boolean;
  endMessage: boolean;
  confetti: boolean;
}

interface ModalAPI {
  showModal: (modalType: 'settings' | 'menu' | 'endMessage') => void;
  hideModal: (modalType: 'settings' | 'menu' | 'endMessage') => void;
  modalState: ModalState;
  closeSettings: () => void;
  closeMenu: () => void;
}

export function useModal(): ModalAPI {
  const { state, openSettings, closeSettings, openMenu, closeMenu, showEndMessage, hideEndMessage, startConfetti, stopConfetti } = useModalContext();

  const showModal = useCallback((modalType: 'settings' | 'menu' | 'endMessage') => {
    switch (modalType) {
      case 'settings':
        openSettings();
        break;
      case 'menu':
        openMenu();
        break;
      case 'endMessage':
        showEndMessage();
        startConfetti();
        break;
    }
  }, [openSettings, openMenu, showEndMessage, startConfetti]);

  const hideModal = useCallback((modalType: 'settings' | 'menu' | 'endMessage') => {
    switch (modalType) {
      case 'settings':
        closeSettings();
        break;
      case 'menu':
        closeMenu();
        break;
      case 'endMessage':
        hideEndMessage();
        stopConfetti();
        break;
    }
  }, [closeSettings, closeMenu, hideEndMessage, stopConfetti]);

  return {
    showModal,
    hideModal,
    modalState: state,
    closeSettings,
    closeMenu
  };
}