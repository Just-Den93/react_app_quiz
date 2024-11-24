import React, { useMemo } from 'react';
import { useModal } from './useModal';
import WarningMessage from '../../features/Game/Messages/WarningMessage/WarningMessage';
import Modal from '../Modal/Modal';
import { QuizBlock, Category } from '../../../types/quiz.types';

interface ModalManagerProps {
  selectedBlock: QuizBlock | null;
  selectedCategory: Category | null;
  isBlockUsed: boolean;
  onModalClose: () => void;
  onBlockRetry: () => void;
  onSelectCategory?: (categoryId: string, blockId: number) => void;
  onNewGame: () => void; 
  onMainMenu: () => void; 
}

export const ModalManager: React.FC<ModalManagerProps> = ({
  selectedBlock,
  selectedCategory,
  isBlockUsed,
  onModalClose,
  onBlockRetry,
  onSelectCategory = () => {},
}) => {
  const { modalState, hideModal } = useModal();

  // Состояния таймера по умолчанию
  const defaultTimerState = {
    timerStarted: false,
    timerEnded: false
  };

  // Обработчики таймера по умолчанию
  const defaultTimerHandlers = {
    startTimer: () => {},
    endTimer: () => {},
    resetTimer: () => {}
  };

  // Состояние ответа по умолчанию
  const defaultAnswerState = {
    showAnswer: false
  };

  // Обработчики ответа по умолчанию
  const defaultAnswerHandlers = {
    showAnswer: () => {},
    hideAnswer: () => {}
  };

  const ModalContent = useMemo(() => {
    if (isBlockUsed) {
      return (
        <WarningMessage
          onTryAgain={onBlockRetry}
          onContinue={onModalClose}
          message="Этот блок уже использован. Хотите попробовать ещё раз?"
        />
      );
    }
    return <div>Модальное окно активно, но контент не определён.</div>;
  }, [isBlockUsed, onBlockRetry, onModalClose]);

  if (!modalState.modal) {
    return null;
  }

  return (
    <Modal
      block={selectedBlock}
      categoryName={selectedCategory?.name ?? 'Без категории'}
      onClose={() => hideModal('modal')}
      modeComponent={() => <div />} // Пустой компонент по умолчанию
      timerState={defaultTimerState}
      timerHandlers={defaultTimerHandlers}
      answerState={defaultAnswerState}
      answerHandlers={defaultAnswerHandlers}
      onSelectCategory={onSelectCategory}
      isBlockUsed={isBlockUsed}
      warningMessage={
        <WarningMessage
          onTryAgain={onBlockRetry}
          onContinue={onModalClose}
          message="Этот блок уже использован. Хотите попробовать ещё раз?"
        />
      }
    >
      {ModalContent}
    </Modal>
  );
};

export default ModalManager;