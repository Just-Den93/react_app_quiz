// src/components/common/ModalManager/ModalManager.tsx
import React from 'react';
import { useModal } from './useModal';
import { useQuizContext } from '../../../context/QuizContext';
import MenuModal from '../MenuModal/MenuModal';
import Modal from '../Modal/Modal';
import Settings from '../../features/Game/Settings/Settings';
import EndMessage from '../../features/Game/Messages/EndMessage/EndMessage';
import ConfettiAnimation from '../../features/Game/Animation/ConfettiAnimation';
import { Category, QuizBlock } from '../../../types/quiz.types';

interface ModalManagerProps {
  selectedBlock: QuizBlock | null;
  selectedCategory: Category | null;
  isBlockUsed: boolean;
  onModalClose: () => void;
  onBlockRetry: () => void;
  onSelectCategory: (categoryId: string, blockId: number) => void;
  onNewGame: () => void;
  onMainMenu: () => void;
}

export const ModalManager: React.FC<ModalManagerProps> = ({
  selectedBlock,
  selectedCategory,
  isBlockUsed,
  onModalClose,
  onBlockRetry,
  onSelectCategory,
  onNewGame,
  onMainMenu
}) => {
  const { modalState, showModal, hideModal, closeSettings, closeMenu } = useModal();
  const { currentQuizId, selectedMode, setQuizStates } = useQuizContext();

  if (!currentQuizId && modalState.endMessage) {
    console.error('Quiz ID missing for end message');
    return null;
  }

  return (
    <>
      <ConfettiAnimation isRunning={modalState.confetti} />

      {selectedBlock && (
        <Modal
          block={selectedBlock}
          categoryName={selectedCategory?.name ?? 'Без категории'}
          onClose={onModalClose}
          selectedMode={selectedMode ?? 1}
          onSelectCategory={onSelectCategory}
          isBlockUsed={isBlockUsed}
          onTryAgain={onBlockRetry}
          onContinue={onModalClose}
        />
      )}

      {modalState.menu && (
        <MenuModal
          showSettings={() => showModal('settings')}
          showMainMenu={onMainMenu}
          onNewGame={onNewGame}
          isVisible={modalState.menu}
          closeMenuModal={() => hideModal('menu')}
        />
      )}

      {modalState.settings && <Settings onClose={() => hideModal('settings')} />}

      {modalState.endMessage && currentQuizId && (
        <EndMessage
          currentQuizId={currentQuizId}
          setQuizStates={setQuizStates}
          onNewGame={onNewGame}
          onMainMenu={onMainMenu}
        />
      )}
    </>
  );
};

export default ModalManager;