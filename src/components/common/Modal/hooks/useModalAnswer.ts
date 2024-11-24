import { useState } from 'react';

export const useModalAnswer = () => {
  const [showAnswer, setShowAnswer] = useState(false);

  return {
    answerState: { 
      showAnswer 
    },
    answerHandlers: {
      showAnswer: () => setShowAnswer(true),
      hideAnswer: () => setShowAnswer(false)
    }
  };
};