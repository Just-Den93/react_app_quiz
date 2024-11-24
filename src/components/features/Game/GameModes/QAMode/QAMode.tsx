import React, { useState, useEffect } from 'react';
import { resetQAState, handleQAActions } from './QAModeUtils';
import type { GameModeProps } from '../../../../../types/gameModes.types';
import styles from './QAMode.module.css';

const QAMode: React.FC<GameModeProps> = ({
  block,
  categoryName,
  showAnswer,
  setTimerStarted,
  timerStarted,
  timerEnded,
  handleTimerEnd,
  handleShowAnswer,
  handleSelectCategory,
  handleForceStop,
}) => {
  const [localTimerStarted, setLocalTimerStarted] = useState<boolean>(false);
  const [forceStopped, setForceStopped] = useState<boolean>(false);
  const [answerShown, setAnswerShown] = useState<boolean>(false);

  useEffect(() => {
    resetQAState(setForceStopped, setAnswerShown, setLocalTimerStarted);
  }, [block]);

  return (
    <div className="qa-mode-container">
      <button
        onClick={() =>
          handleQAActions.startTimer(setTimerStarted, setLocalTimerStarted)
        }
        disabled={timerStarted}
      >
        Start Timer
      </button>

      <button
        onClick={() =>
          handleQAActions.forceStop(handleForceStop, setForceStopped)
        }
        disabled={forceStopped}
      >
        Force Stop
      </button>

      <button
        onClick={() =>
          handleQAActions.showAnswer(handleShowAnswer, setAnswerShown)
        }
        disabled={answerShown}
      >
        Show Answer
      </button>
    </div>
  );
};

export default QAMode;