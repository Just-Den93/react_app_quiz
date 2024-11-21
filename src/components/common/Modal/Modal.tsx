import React, { useState, useEffect } from 'react';
import QAMode from '../../../features/Game/GameModes/QAMode/QAMode';
import SelectionMode from '../../../features/Game/GameModes/SelectionMode/SelectionMode.tsx';
import WarningMessage from '../../../features/Game/Messages/WarningMessage/WarningMessage';
import styles from './Modal.module.css';

interface Block {
  id: number;
  question: string;
  text: string;
  categoryId?: string;
  'correct answer'?: string;
  options?: string[];
}

interface ModalProps {
  block: Block | null;
  categoryName: string;
  onClose: () => void;
  selectedMode: number;
  onSelectCategory: (categoryId: string, blockId: number) => void;
  isBlockUsed: boolean;
  onTryAgain: () => void;
  onContinue: () => void;
}

interface ModeComponentsType {
  [key: number]: React.ComponentType<any>;
}

const modeComponents: ModeComponentsType = {
  1: QAMode,
  2: SelectionMode,
};

const Modal: React.FC<ModalProps> = ({
  block,
  categoryName,
  onClose,
  selectedMode,
  onSelectCategory,
  isBlockUsed,
  onTryAgain,
  onContinue,
}) => {
  const ModeComponent = modeComponents[selectedMode];

  const [timerStarted, setTimerStarted] = useState<boolean>(false);
  const [timerEnded, setTimerEnded] = useState<boolean>(false);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  useEffect(() => {
    resetModalState(setTimerStarted, setShowAnswer, setTimerEnded);
  }, [block]);

  const resetModalState = (
    setTimerStarted: React.Dispatch<React.SetStateAction<boolean>>,
    setShowAnswer: React.Dispatch<React.SetStateAction<boolean>>,
    setTimerEnded: React.Dispatch<React.SetStateAction<boolean>>
  ): void => {
    setTimerStarted(false);
    setShowAnswer(false);
    setTimerEnded(false);
  };

  const handleModalActions = {
    setTimerEnded: (setTimerEnded: React.Dispatch<React.SetStateAction<boolean>>): void => {
      setTimerEnded(true);
    },
    setShowAnswer: (setShowAnswer: React.Dispatch<React.SetStateAction<boolean>>): void => {
      setShowAnswer(true);
    },
    forceStop: (setTimerEnded: React.Dispatch<React.SetStateAction<boolean>>): void => {
      setTimerEnded(true);
    },
  };

  if (!block) {
    return null;
  }

  return (
    <div className={`${styles.modal} ${styles.show}`} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <span className={styles.closeButton} onClick={onClose}>
          &times;
        </span>

        {isBlockUsed ? (
          <WarningMessage onTryAgain={onTryAgain} onContinue={onContinue} />
        ) : (
          ModeComponent && (
            <ModeComponent
              block={block}
              categoryName={categoryName}
              showAnswer={showAnswer}
              setTimerStarted={setTimerStarted}
              timerStarted={timerStarted}
              timerEnded={timerEnded}
              handleTimerEnd={() => handleModalActions.setTimerEnded(setTimerEnded)}
              handleShowAnswer={() => handleModalActions.setShowAnswer(setShowAnswer)}
              handleSelectCategory={() => onSelectCategory(block.categoryId!, block.id)}
              handleForceStop={() => handleModalActions.forceStop(setTimerEnded)}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Modal;