// src/components/features/Quiz/QuizPage/QuizPage.tsx
import React from 'react';
import { useQuizContext } from '../../../../context/QuizContext';
import { useQuizGameLogic } from './hooks/useQuizGameLogic';
import { useQuizIdentifier } from './hooks/useQuizIdentifier';
import { useKeyboardEvents } from './hooks/useKeyboardEvents';
import { ModalManager } from '../../../common/ModalManager/ModalManager';
import ContentContainer from '../../../layout/ContentContainer/ContentContainer';
import styles from './QuizPage.module.css';
import PCImage from '../../../../assets/images/PC_horizontal_1line_black.svg';
import { Category, QuizBlock } from '../../../../types/quiz.types';

const QuizPage: React.FC = () => {
  const { quizStates, currentQuizId, data } = useQuizContext();
  
  useQuizIdentifier();
  useKeyboardEvents(); // Добавляем обработчик клавиатуры

  const {
    gameState,
    handleBlockSelect,
    handleModalClose,
    handleSelectCategory,
    handleNewGame,
    handleMainMenu
  } = useQuizGameLogic();

  if (!currentQuizId) {
    return (
      <div className={styles.quiz_page}>
        <div className={styles.errorMessage}>
          Ошибка: ID викторины не найден
        </div>
      </div>
    );
  }

  const currentQuizState = quizStates[currentQuizId] || {
    usedBlocks: {},
    data: null,
    completedGames: 0
  };

  const handleBlockSelectWrapper = (block: QuizBlock, category: Category) => {
    if (!block.id || !category.id) {
      console.error('Invalid block or category data');
      return;
    }
    handleBlockSelect(block, category);
  };

  const handleBlockRetry = () => {
    if (gameState.setIsBlockUsed) {
      gameState.setIsBlockUsed(false);
    }
  };

  if (!data) {
    return (
      <div className={styles.quiz_page}>
        <div className={styles.errorMessage}>
          Данные викторины недоступны
        </div>
      </div>
    );
  }

  return (
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
     
      <ContentContainer
        data={data}
        onBlockSelect={handleBlockSelectWrapper}
        usedBlocks={currentQuizState.usedBlocks}
      />

      <ModalManager
        selectedBlock={gameState.selectedBlock}
        selectedCategory={gameState.selectedCategory}
        isBlockUsed={gameState.isBlockUsed}
        onModalClose={handleModalClose}
        onBlockRetry={handleBlockRetry}
        onSelectCategory={handleSelectCategory}
        onNewGame={handleNewGame}
        onMainMenu={handleMainMenu}
      />
    </div>
  );
};

export default React.memo(QuizPage);