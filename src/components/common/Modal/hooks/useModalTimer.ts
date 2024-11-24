import { useState } from 'react';

export const useModalTimer = () => {
  const [timerStarted, setTimerStarted] = useState(false);
  const [timerEnded, setTimerEnded] = useState(false);

  return {
    timerState: { 
      timerStarted, 
      timerEnded 
    },
    timerHandlers: {
      startTimer: () => setTimerStarted(true),
      endTimer: () => setTimerEnded(true),
      resetTimer: () => {
        setTimerStarted(false);
        setTimerEnded(false);
      }
    }
  };
};