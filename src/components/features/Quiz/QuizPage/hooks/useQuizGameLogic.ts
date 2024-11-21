import { useQuizContext } from '../../../../../context/QuizContext';
import { useQuizService } from '../../../../../services/quiz/useQuizService';
import type { QuizBlock, Category } from '../../../../../types/quiz.types';

export const useQuizGameLogic = () => {
  const { quizStates, currentQuizId, setShowQuizPage } = useQuizContext();
  const quizService = useQuizService();
  const [currentBlock, setCurrentBlock] = useState<QuizBlock | null>(null);

  // Обработка выбора блока
  const handleBlockSelect = useCallback((block: QuizBlock, category: Category) => {
    const isUsed = quizService.isBlockUsed(currentQuizId, category.id, block.id);
    if (isUsed) {
      return;
    }
    setCurrentBlock(block);
  }, [currentQuizId, quizService]);

  // Обработка выбора категории
  const handleCategorySelect = useCallback((categoryId: string, blockId: number) => {
    quizService.markBlockAsUsed(currentQuizId, categoryId, blockId);
    setCurrentBlock(null);
    
    if (quizService.isGameCompleted(currentQuizId)) {
      quizService.completeGame(currentQuizId);
    }
  }, [currentQuizId, quizService]);

  // Обработка новой игры
  const handleNewGame = useCallback(() => {
    quizService.startNewGame(currentQuizId);
  }, [currentQuizId, quizService]);

  // Возврат в главное меню
  const handleMainMenu = useCallback(() => {
    setShowQuizPage(false);
  }, [setShowQuizPage]);

  return {
    quizData: quizService.getQuizData(currentQuizId),
    currentBlock,
    isGameEnded: quizService.isGameCompleted(currentQuizId),
    handleBlockSelect,
    handleCategorySelect,
    handleNewGame,
    handleMainMenu
  };
};