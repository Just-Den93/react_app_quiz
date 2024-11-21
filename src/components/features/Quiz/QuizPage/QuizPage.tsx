import React, { type ErrorInfo } from 'react';
import { useQuizContext } from '../../../../context/QuizContext';
import { useQuizGameLogic } from '../../../../hooks/useQuizGameLogic';
import { ModalManager } from '../../../common/ModalManager/ModalManager';
import ContentContainer from '../../../layout/ContentContainer/ContentContainer';
import styles from './QuizPage.module.css';
import PCImage from '../../../../assets/images/PC_horizontal_1line_black.svg';
import { Category, QuizBlock } from '../../../../types/quiz.types';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class QuizErrorBoundary extends React.Component<{ children: React.ReactNode }, ErrorBoundaryState> {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Quiz error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.errorContainer}>
          <h1>Что-то пошло не так</h1>
          <p>{this.state.error?.message}</p>
          <button 
            className={styles.reloadButton}
            onClick={() => window.location.reload()}
          >
            Перезагрузить страницу
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const QuizPage: React.FC = () => {
  const { quizStates, currentQuizId, data } = useQuizContext();
  const {
    gameState,
    handleBlockSelect,
    handleModalClose,
    handleSelectCategory,
    handleNewGame,
    handleMainMenu
  } = useQuizGameLogic();

  const currentQuizState = React.useMemo(() => 
    currentQuizId ? quizStates[currentQuizId] : null,
    [currentQuizId, quizStates]
  );

  if (!currentQuizState) {
    throw new Error('Quiz state not found');
  }

  const handleBlockSelectWrapper = React.useCallback((
    block: QuizBlock,
    category: Category
  ) => {
    try {
      handleBlockSelect(block, category);
    } catch (error) {
      console.error('Error selecting block:', error);
      throw error;
    }
  }, [handleBlockSelect]);

  return (
    <QuizErrorBoundary>
      <div className={styles.quiz_page}>
        <img 
          src={PCImage} 
          alt="PC horizontal line" 
          className={styles.image}
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            console.error('Failed to load logo image');
          }} 
        />
        
        {data ? (
          <ContentContainer
            data={data}
            onBlockSelect={handleBlockSelectWrapper}
            usedBlocks={currentQuizState.usedBlocks || {}}
          />
        ) : (
          <div className={styles.noData}>
            Данные викторины недоступны
          </div>
        )}

        <ModalManager
          selectedBlock={gameState.selectedBlock}
          selectedCategory={gameState.selectedCategory}
          isBlockUsed={gameState.isBlockUsed}
          onModalClose={handleModalClose}
          onBlockRetry={() => gameState.setIsBlockUsed(false)}
          onSelectCategory={handleSelectCategory}
          onNewGame={handleNewGame}
          onMainMenu={handleMainMenu}
        />
      </div>
    </QuizErrorBoundary>
  );
};

export default React.memo(QuizPage);