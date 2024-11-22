import { useState, useCallback, useMemo } from 'react';
import { useQuizContext } from '../../../../context/QuizContext';
import { useModal } from '../../../../context/ModalContext';
import { QuizBlock, Category } from '../../../../types/quiz.types';

interface GameState {
  selectedBlock: QuizBlock | null;
  selectedCategory: Category | null;
  isBlockUsed: boolean;
  setIsBlockUsed: (value: boolean) => void;
}

export function useQuizGameLogic() {
  const { quizStates, currentQuizId, data, markBlockAsUsed, setShowQuizPage } = useQuizContext();
  const { showEndMessage, startConfetti, stopConfetti } = useModal();

  const [selectedBlock, setSelectedBlock] = useState<QuizBlock | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isBlockUsed, setIsBlockUsed] = useState(false);

  const gameState: GameState = {
    selectedBlock,
    selectedCategory,
    isBlockUsed,
    setIsBlockUsed
  };

  const handleBlockSelect = useCallback((block: QuizBlock, category: Category) => {
    setSelectedBlock(block);
    setSelectedCategory(category);
    setIsBlockUsed(false);
  }, []);

  const handleModalClose = useCallback(() => {
    setSelectedBlock(null);
    setSelectedCategory(null);
    setIsBlockUsed(false);
  }, []);

  const handleSelectCategory = useCallback((categoryId: string, blockId: number) => {
    if (!currentQuizId) return;
    markBlockAsUsed(currentQuizId, categoryId, blockId);
    handleModalClose();
  }, [currentQuizId, markBlockAsUsed, handleModalClose]);

  const handleNewGame = useCallback(() => {
    handleModalClose();
    stopConfetti();
  }, [handleModalClose, stopConfetti]);

  const handleMainMenu = useCallback(() => {
    setShowQuizPage(false);
  }, [setShowQuizPage]);

  return {
    gameState,
    handleBlockSelect,
    handleModalClose,
    handleSelectCategory,
    handleNewGame,
    handleMainMenu
  };
}