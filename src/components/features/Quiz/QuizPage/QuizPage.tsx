import React, { useState } from 'react';
import { useQuizContext } from '../../../../context/QuizContext';
import { useQuizGameLogic } from './hooks/useQuizGameLogic';
import { useQuizIdentifier } from './hooks/useQuizIdentifier';
import { useKeyboardEvents } from './hooks/useKeyboardEvents';
import  MenuModal  from '../../../common/MenuModal/MenuModal';
import { ModalManager } from '../../../common/ModalManager/ModalManager';
import ContentContainer from '../../../layout/ContentContainer/ContentContainer';
import BurgerMenu from '../../../common/MenuModal/BurgerMenu'
import styles from './QuizPage.module.css';
import PCImage from '../../../../assets/images/PC_horizontal_1line_black.svg';
import { Category, QuizBlock } from '../../../../types/quiz.types';

const QuizPage: React.FC = () => {
  const { quizStates, currentQuizId, data } = useQuizContext();
  const [menuOpen, setMenuOpen] = useState(false);
  
  useQuizIdentifier();
  useKeyboardEvents();

  const {
    gameState,
    handleBlockSelect,
    handleModalClose,
    handleSelectCategory,
    handleNewGame,
    handleMainMenu
  } = useQuizGameLogic();

  const handleMenuStateChange = (state: { isOpen: boolean }) => {
    setMenuOpen(state.isOpen);
  };

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
    <div className={styles.quiz_page} id="outer-container">
		
<BurgerMenu 
  isOpen={menuOpen}
  onStateChange={handleMenuStateChange}
  onNewGame={() => {
    handleNewGame();
    setMenuOpen(false);
  }}
  onContinue={() => setMenuOpen(false)}
  onMainMenu={() => {
    handleMainMenu();
    setMenuOpen(false);
  }}
  onSettings={() => setMenuOpen(false)}
  onTimer={() => {
	// Handle timer click
	setMenuOpen(false);
 }}
/>
      
      <main id="page-wrap">
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

<<<<<<< HEAD
<MenuModal/>

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
=======
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
      </main>
>>>>>>> 180a94790ce5de6b51aa3ec60f8d40eda98f2be8
    </div>
  );
};

export default React.memo(QuizPage);