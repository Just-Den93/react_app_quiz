import { useState, useCallback, useMemo } from 'react';
import { useQuizContext } from '../context/QuizContext';
import { useModal } from '../context/ModalContext';
import { QuizBlock, Category } from '../types/quiz.types';
import { QuizService } from '../services/QuizService';

export interface GameState {
  selectedBlock: QuizBlock | null;
  selectedCategory: Category | null;
  isBlockUsed: boolean;
}

export function useQuizGameLogic() {
  const {
    quizStates,
    currentQuizId,
    data,
    markBlockAsUsed,
    setQuizStates,
    setShowQuizPage
  } = useQuizContext();

  const { showEndMessage, startConfetti, stopConfetti } = useModal();
  const [gameState, setGameState] = useState<GameState>({
    selectedBlock: null,
    selectedCategory: null,
    isBlockUsed: false
  });

  const quizService = useMemo(() => new QuizService(), []);
  
  const currentQuizState = useMemo(() => 
    currentQuizId ? quizStates[currentQuizId] || {} : {},
    [quizStates, currentQuizId]
  );

  const totalBlocks = useMemo(() => {
    if (!data) return 0;
    return data.reduce((total, category) => total + category.blocks.length, 0);
  }, [data]);

  const usedBlocksCount = useMemo(() => {
    if (!currentQuizState.usedBlocks) return 0;
    return Object.values(currentQuizState.usedBlocks)
      .reduce((total, blocks) => total + blocks.length, 0);
  }, [currentQuizState.usedBlocks]);

  const handleBlockSelect = useCallback((block: QuizBlock, category: Category) => {
    const isUsed = currentQuizId ? 
      quizService.isBlockUsed(currentQuizId, category.id, block.id) : 
      false;

    setGameState({
      selectedBlock: block,
      selectedCategory: category,
      isBlockUsed: isUsed
    });
  }, [currentQuizId, quizService]);

  const handleModalClose = useCallback(() => {
    setGameState({
      selectedBlock: null,
      selectedCategory: null,
      isBlockUsed: false
    });
  }, []);

  const handleSelectCategory = useCallback((categoryId: string, blockId: number) => {
    if (!currentQuizId) return;

    markBlockAsUsed(currentQuizId, categoryId, blockId);
    handleModalClose();

    if (usedBlocksCount + 1 === totalBlocks) {
      startConfetti();
      showEndMessage();
    }
  }, [currentQuizId, markBlockAsUsed, handleModalClose, usedBlocksCount, totalBlocks, startConfetti, showEndMessage]);

  const handleNewGame = useCallback(() => {
    if (!currentQuizId) return;

    quizService.startNewGame(currentQuizId);
    stopConfetti();
    setGameState({
      selectedBlock: null,
      selectedCategory: null,
      isBlockUsed: false
    });
  }, [currentQuizId, quizService, stopConfetti]);

  const handleMainMenu = useCallback(() => {
    setShowQuizPage(false);
  }, [setShowQuizPage]);

  return {
    gameState,
    totalBlocks,
    usedBlocksCount,
    handleBlockSelect,
    handleModalClose,
    handleSelectCategory,
    handleNewGame,
    handleMainMenu
  };
}