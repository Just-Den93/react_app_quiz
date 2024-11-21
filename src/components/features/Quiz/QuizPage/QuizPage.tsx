import React from 'react';
import ContentContainer from '../../../layout/ContentContainer/ContentContainer';
import ConfettiAnimation from '../../Game/Animation/ConfettiAnimation';
import { QuizModals } from './QuizModals';
import styles from './QuizPage.module.css';
import { useQuizGameLogic } from '../../../../hooks/useQuizGameLogic';
import { useQuizModals } from '../../../../hooks/useQuizModals';
import PCImage from '../../../../assets/images/PC_horizontal_1line_black.svg';

const QuizPage: React.FC = () => {
  const {
    quizData,
    currentBlock,
    isGameEnded,
    handleBlockSelect,
    handleCategorySelect,
    handleNewGame,
    handleMainMenu,
  } = useQuizGameLogic();

  const {
    isSettingsVisible,
    isMenuVisible,
    showEndMessage,
    confettiRunning,
    modalHandlers,
  } = useQuizModals();

  if (!quizData) {
    return <div className={styles.noData}>No data available.</div>;
  }

  return (
    <div className={styles.quiz_page}>
      <ConfettiAnimation isRunning={confettiRunning} />
      <img src={PCImage} alt="PC horizontal line" className={styles.image} />

      <ContentContainer
        data={quizData}
        onBlockSelect={handleBlockSelect}
        usedBlocks={currentBlock?.usedBlocks || {}}
      />

      <QuizModals
        isSettingsVisible={isSettingsVisible}
        isMenuVisible={isMenuVisible}
        showEndMessage={showEndMessage}
        confettiRunning={confettiRunning}
        modalHandlers={modalHandlers}
        onNewGame={handleNewGame}
        onMainMenu={handleMainMenu}
      />
    </div>
  );
};

export default QuizPage;
