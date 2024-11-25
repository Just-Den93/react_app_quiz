// src/components/features/Game/GameModes/QAMode/QAMode.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { Button, BUTTON_VARIANTS } from '../../../../common/Button/Button';
import Timer from '../../../../common/Timer/Timer';
import { resetQAState } from './QAModeUtils';
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

  const handleSelectCategoryClick = useCallback(() => {
    if (block && block.categoryId) {
      handleSelectCategory(block.categoryId, block.id); // Передаем правильные параметры
    }
  }, [block, handleSelectCategory]);

  return (
    <div className={styles.qaModeContainer}>
      {answerShown && (
        <Button
          variant={BUTTON_VARIANTS.SELECT_CATEGORY}
          onClick={handleSelectCategoryClick} // Исправлено
        />
      )}
    </div>
  );
};

export default React.memo(QAMode);
