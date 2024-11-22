// src/context/ModalContext.tsx
import React, { createContext, useContext, useReducer, ReactNode, useCallback } from 'react';

// Интерфейс состояния модального окна
interface ModalState {
 settings: boolean;
 menu: boolean;
 endMessage: boolean;
 confetti: boolean;
}

// Типы действий для reducer
type ModalAction =
 | { type: 'OPEN_SETTINGS' }
 | { type: 'CLOSE_SETTINGS' }
 | { type: 'OPEN_MENU' }
 | { type: 'CLOSE_MENU' }
 | { type: 'SHOW_END_MESSAGE' }
 | { type: 'HIDE_END_MESSAGE' }
 | { type: 'START_CONFETTI' }
 | { type: 'STOP_CONFETTI' };

// Интерфейс контекста
interface ModalContextValue {
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

// Создаем контекст с пустым объектом
const ModalContext = createContext<ModalContextValue | undefined>(undefined);

// Начальное состояние
const initialState: ModalState = {
 settings: false,
 menu: false,
 endMessage: false,
 confetti: false
};

// Reducer для управления состоянием
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

// Props для провайдера
interface ModalProviderProps {
 children: ReactNode;
}

// Hook для использования модального контекста
export function useModal() {
 const context = useContext(ModalContext);
 if (!context) {
   throw new Error('useModal must be used within a ModalProvider');
 }
 return context;
}

// Компонент провайдера
export function ModalProvider({ children }: ModalProviderProps) {
 const [state, dispatch] = useReducer(modalReducer, initialState);

 // Методы для управления модальными окнами
 const openSettings = useCallback(() => dispatch({ type: 'OPEN_SETTINGS' }), []);
 const closeSettings = useCallback(() => dispatch({ type: 'CLOSE_SETTINGS' }), []);
 const openMenu = useCallback(() => dispatch({ type: 'OPEN_MENU' }), []);
 const closeMenu = useCallback(() => dispatch({ type: 'CLOSE_MENU' }), []);
 const showEndMessage = useCallback(() => dispatch({ type: 'SHOW_END_MESSAGE' }), []);
 const hideEndMessage = useCallback(() => dispatch({ type: 'HIDE_END_MESSAGE' }), []);
 const startConfetti = useCallback(() => dispatch({ type: 'START_CONFETTI' }), []);
 const stopConfetti = useCallback(() => dispatch({ type: 'STOP_CONFETTI' }), []);

 const value = {
   state,
   openSettings,
   closeSettings,
   openMenu,
   closeMenu,
   showEndMessage,
   hideEndMessage,
   startConfetti,
   stopConfetti
 };

 return (
   <ModalContext.Provider value={value}>
     {children}
   </ModalContext.Provider>
 );
}

export { ModalContext };