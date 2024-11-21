import { useCallback } from 'react';
import { useModal as useModalContext } from '../../context/ModalContext';

export function useModal() {
  const context = useModalContext();

  const showModal = useCallback((modalType: 'settings' | 'menu' | 'endMessage') => {
    switch (modalType) {
      case 'settings':
        context.openSettings();
        break;
      case 'menu':
        context.openMenu();
        break;
      case 'endMessage':
        context.showEndMessage();
        context.startConfetti();
        break;
    }
  }, [context]);

  const hideModal = useCallback((modalType: 'settings' | 'menu' | 'endMessage') => {
    switch (modalType) {
      case 'settings':
        context.closeSettings();
        break;
      case 'menu':
        context.closeMenu();
        break;
      case 'endMessage':
        context.hideEndMessage();
        context.stopConfetti();
        break;
    }
  }, [context]);

  return {
    showModal,
    hideModal,
    modalState: context.state
  };
}