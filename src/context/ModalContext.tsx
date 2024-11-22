// ModalContext.tsx
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface ModalState {
  settings: boolean;
  menu: boolean;
  endMessage: boolean;
  confetti: boolean;
}

type ModalAction =
  | { type: 'OPEN_SETTINGS' }
  | { type: 'CLOSE_SETTINGS' }
  | { type: 'OPEN_MENU' }
  | { type: 'CLOSE_MENU' }
  | { type: 'SHOW_END_MESSAGE' }
  | { type: 'HIDE_END_MESSAGE' }
  | { type: 'START_CONFETTI' }
  | { type: 'STOP_CONFETTI' };

interface ModalContextType {
  state: ModalState;
  openSettings: () => void;
  closeSettings: () => void;
  openMenu: () => void;
  closeMenu: () => void;
  showEndMessage: () => void;
  hideEndMessage: () => void;
  startConfetti: () => void;
  stopConfetti: () => void;
}

const initialState: ModalState = {
  settings: false,
  menu: false,
  endMessage: false,
  confetti: false
};

function modalReducer(state: ModalState, action: ModalAction): ModalState {
  switch (action.type) {
    case 'OPEN_SETTINGS':
      return { ...state, settings: true };
    case 'CLOSE_SETTINGS':
      return { ...state, settings: false };
    case 'OPEN_MENU':
      return { ...state, menu: true };
    case 'CLOSE_MENU':
      return { ...state, menu: false };
    case 'SHOW_END_MESSAGE':
      return { ...state, endMessage: true };
    case 'HIDE_END_MESSAGE':
      return { ...state, endMessage: false };
    case 'START_CONFETTI':
      return { ...state, confetti: true };
    case 'STOP_CONFETTI':
      return { ...state, confetti: false };
    default:
      return state;
  }
}

export const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function useModalContext() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModalContext must be used within a ModalProvider');
  }
  return context;
}

export function ModalProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(modalReducer, initialState);

  const value: ModalContextType = {
    state,
    openSettings: () => dispatch({ type: 'OPEN_SETTINGS' }),
    closeSettings: () => dispatch({ type: 'CLOSE_SETTINGS' }),
    openMenu: () => dispatch({ type: 'OPEN_MENU' }),
    closeMenu: () => dispatch({ type: 'CLOSE_MENU' }),
    showEndMessage: () => dispatch({ type: 'SHOW_END_MESSAGE' }),
    hideEndMessage: () => dispatch({ type: 'HIDE_END_MESSAGE' }),
    startConfetti: () => dispatch({ type: 'START_CONFETTI' }),
    stopConfetti: () => dispatch({ type: 'STOP_CONFETTI' })
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  );
}