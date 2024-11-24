import type { FC } from 'react';
import type { QuizBlock } from './quiz.types';

// Расширяем GameBlock, делая categoryId обязательным
export interface GameBlock extends Omit<QuizBlock, 'categoryId'> {
  options: string[];
  categoryId: string; // Делаем обязательным
}

export interface GameModeProps {
  block: GameBlock;
  categoryName: string;
  showAnswer: boolean;
  setTimerStarted: React.Dispatch<React.SetStateAction<boolean>>;
  timerStarted: boolean;
  timerEnded: boolean;
  handleTimerEnd: () => void;
  handleShowAnswer: () => void;
  handleSelectCategory: (categoryId: string, blockId: number) => void;
  handleForceStop: () => void;
}

export type GameModeComponent = FC<GameModeProps>;

export interface GameModeConfig {
  id: number;
  name: string;
  component: GameModeComponent;
  options?: {
    timerDuration?: number;
    allowHints?: boolean;
    maxAttempts?: number;
  };
}