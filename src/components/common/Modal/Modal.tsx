import React from 'react';
import styles from './Modal.module.css';
import QAMode from '../../features/Game/GameModes/QAMode/QAMode';
import SelectionMode from '../../features/Game/GameModes/SelectionMode/SelectionMode';
import WarningMessage from '../../features/Game/Messages/WarningMessage/WarningMessage';
import { useModalTimer } from './hooks/useModalTimer';
import { useModalAnswer } from './hooks/useModalAnswer';
import type { QuizBlock } from '../../../types/quiz.types';
import type { GameBlock, GameModeComponent, GameModeProps } from '../../../types/gameModes.types';
import { gameModeFactory } from './factories/gameModeFactory';

// Приводим компоненты к правильному типу
const QAModeWithTypes: GameModeComponent = QAMode as unknown as GameModeComponent;
const SelectionModeWithTypes: GameModeComponent = SelectionMode as unknown as GameModeComponent;

// Регистрируем доступные режимы
gameModeFactory.registerMode({
  id: 1,
  name: 'QA Mode',
  component: QAModeWithTypes,
  options: {
    timerDuration: 30,
    allowHints: true,
    maxAttempts: 3
  }
});

gameModeFactory.registerMode({
  id: 2,
  name: 'Selection Mode',
  component: SelectionModeWithTypes,
  options: {
    timerDuration: 45,
    allowHints: false,
    maxAttempts: 1
  }
});

interface ModalProps {
  block: QuizBlock | null;
  categoryName: string;
  onClose: () => void;
  selectedMode: number;
  onSelectCategory: (categoryId: string, blockId: number) => void;
  isBlockUsed: boolean;
  onTryAgain: () => void;
  onContinue: () => void;
}

export const Modal: React.FC<ModalProps> = ({
  block,
  categoryName,
  onClose,
  selectedMode,
  onSelectCategory,
  isBlockUsed,
  onTryAgain,
  onContinue,
}) => {
  const { timerState, timerHandlers } = useModalTimer();
  const { answerState, answerHandlers } = useModalAnswer();

  const ModeComponent = React.useMemo(() => 
    gameModeFactory.getMode(selectedMode), 
    [selectedMode]
  );

  if (!block || !block.options || !block.categoryId) {
    return null;
  }

  if (!ModeComponent) {
    console.warn(`Game mode ${selectedMode} is not registered`);
    return null;
  }

  const gameBlock: GameBlock = {
    ...block,
    options: block.options,
    categoryId: block.categoryId
  };

  return (
    <div className={`${styles.modal} ${styles.show}`} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <span className={styles.closeButton} onClick={onClose}>&times;</span>

        {isBlockUsed ? (
          <WarningMessage onTryAgain={onTryAgain} onContinue={onContinue} />
        ) : (
          <ModeComponent
            block={gameBlock}
            categoryName={categoryName}
            showAnswer={answerState.showAnswer}
            setTimerStarted={timerHandlers.startTimer}
            timerStarted={timerState.timerStarted}
            timerEnded={timerState.timerEnded}
            handleTimerEnd={timerHandlers.endTimer}
            handleShowAnswer={answerHandlers.showAnswer}
            handleSelectCategory={(categoryId, blockId) => onSelectCategory(categoryId, blockId)}
            handleForceStop={() => timerHandlers.resetTimer()}
          />
        )}
      </div>
    </div>
  );
};

export default React.memo(Modal);