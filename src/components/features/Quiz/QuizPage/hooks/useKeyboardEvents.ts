// src/components/features/Quiz/QuizPage/hooks/useKeyboardEvents.ts
import { useEffect } from 'react';
import { useModal } from '../../../../common/ModalManager/useModal';

export const useKeyboardEvents = () => {
  const { showModal, hideModal, modalState } = useModal();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        modalState.menu ? hideModal('menu') : showModal('menu');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showModal, hideModal, modalState.menu]);
};