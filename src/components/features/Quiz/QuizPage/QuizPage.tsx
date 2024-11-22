import React from 'react';
import { useQuizContext } from '../../../../context/QuizContext';
import { useQuizGameLogic } from './useQuizGameLogic';
import { ModalManager } from '../../../common/ModalManager/ModalManager';
import ContentContainer from '../../../layout/ContentContainer/ContentContainer';
import styles from './QuizPage.module.css';
import PCImage from '../../../../assets/images/PC_horizontal_1line_black.svg';
import { Category, QuizBlock } from '../../../../types/quiz.types';

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

  const currentQuizState = React.useMemo(() => {
    if (!currentQuizId) throw new Error('Quiz ID is not defined');
    const state = quizStates[currentQuizId];
    if (!state) throw new Error('Quiz state not found');
    return state;
  }, [currentQuizId, quizStates]);

  const handleBlockSelectWrapper = (block: QuizBlock, category: Category) => {
    if (!block.id || !category.id) {
      throw new Error('Invalid block or category data');
    }
    handleBlockSelect(block, category);
  };

  const handleBlockRetry = () => {
    (gameState as { setIsBlockUsed: (value: boolean) => void }).setIsBlockUsed(false);
  };

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
     
      {data ? (
        <ContentContainer
          data={data}
          onBlockSelect={handleBlockSelectWrapper}
          usedBlocks={currentQuizState.usedBlocks || {}}
        />
      ) : (
        <div className={styles.noData} role="alert">
          Данные викторины недоступны
        </div>
      )}

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