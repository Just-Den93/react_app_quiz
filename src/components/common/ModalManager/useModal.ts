// src/components/common/ModalManager/useModal.ts
import { useCallback, useState } from 'react';
import { useModal as useModalContext } from '../../../context/ModalContext';

interface ModalState {
  modal: boolean;
  settings: boolean;
  menu: boolean;
  endMessage: boolean;
  confetti: boolean;
}

type ModalType = 'modal' | 'settings' | 'menu' | 'endMessage';

interface ModalAPI {
  modalState: ModalState;
  showModal: (modalType: ModalType) => void;
  hideModal: (modalType: ModalType) => void;
  closeSettings: () => void;
  closeMenu: () => void;
}

export function useModal(): ModalAPI {
  const [modalState, setModalState] = useState<ModalState>({
    modal: false,
    settings: false,
    menu: false,
    endMessage: false,
    confetti: false,
  });

  const {
    openSettings,
    closeSettings,
    openMenu,
    closeMenu,
    showEndMessage,
    hideEndMessage,
    startConfetti,
    stopConfetti,
  } = useModalContext();

  const showModal = useCallback(
    (modalType: ModalType) => {
      switch (modalType) {
        case 'modal':
          setModalState((prev) => ({ ...prev, modal: true }));
          break;
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
    },
    [openSettings, openMenu, showEndMessage, startConfetti]
  );

  const hideModal = useCallback(
    (modalType: ModalType) => {
      switch (modalType) {
        case 'modal':
          setModalState((prev) => ({ ...prev, modal: false }));
          break;
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
    },
    [closeSettings, closeMenu, hideEndMessage, stopConfetti]
  );

  return {
    showModal,
    hideModal,
    modalState,
    closeSettings,
    closeMenu,
  };
}
