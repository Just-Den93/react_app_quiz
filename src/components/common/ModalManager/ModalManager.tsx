// src/components/common/ModalManager/ModalManager.tsx
import React, { useState, useMemo } from 'react';
import { useModal } from './useModal';
import { useQuizContext } from '../../../context/QuizContext';
import Modal from '../Modal/Modal';
import WarningMessage from '../../features/Game/Messages/WarningMessage/WarningMessage';
import { gameModeFactory } from './factories/gameModeFactory';
import { QuizBlock, Category } from '../../../types/quiz.types';

interface ModalManagerProps {
  selectedBlock: QuizBlock | null;
  selectedCategory: Category | null;
  isBlockUsed: boolean;
  onModalClose: () => void;
  onBlockRetry: () => void;
  onSelectCategory: (categoryId: string, blockId: number) => void;
  onNewGame: () => void;
  onMainMenu: () => void; // Добавлено
}


export const ModalManager: React.FC<ModalManagerProps> = ({
  selectedBlock,
  selectedCategory,
  isBlockUsed,
  onModalClose,
  onBlockRetry,
  onSelectCategory,
  onNewGame,
}) => {
  const { modalState, hideModal } = useModal();
  const { selectedMode } = useQuizContext();

  const [timerStarted, setTimerStarted] = useState(false);
  const [timerEnded, setTimerEnded] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const timerHandlers = {
    startTimer: () => setTimerStarted(true),
    endTimer: () => setTimerEnded(true),
    resetTimer: () => {
      setTimerStarted(false);
      setTimerEnded(false);
    },
  };

  const answerHandlers = {
    showAnswer: () => setShowAnswer(true),
    hideAnswer: () => setShowAnswer(false),
  };

  const ModeComponent = useMemo(() => {
    const mode = gameModeFactory.getMode(selectedMode);
    if (!mode) {
      console.warn(`Game mode ${selectedMode} not found`);
      return null;
    }
    return mode;
  }, [selectedMode]);

  if (!ModeComponent || !modalState.modal) {
    return null;
  }

  const WarningMessageElement = isBlockUsed ? (
    <WarningMessage
      onTryAgain={onBlockRetry}
      onContinue={onModalClose}
      message="Этот блок уже использован. Хотите попробовать ещё раз?"
    />
  ) : null;

  return (
    <Modal
      block={selectedBlock}
      categoryName={selectedCategory?.name ?? 'Без категории'}
      onClose={() => hideModal('modal')}
      modeComponent={ModeComponent}
      timerState={{ timerStarted, timerEnded }}
      timerHandlers={timerHandlers}
      answerState={{ showAnswer }}
      answerHandlers={answerHandlers}
      onSelectCategory={onSelectCategory}
      isBlockUsed={isBlockUsed}
      warningMessage={WarningMessageElement}
    />
  );
};

export default ModalManager;
