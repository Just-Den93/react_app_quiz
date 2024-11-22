// QuizCard.tsx
import React from 'react';
import { useQuizContext } from '../../../../context/QuizContext';
import styles from './QuizCard.module.css';
import { Category } from '../../../../types/quiz.types';

interface QuizCardProps {
  startQuiz: () => void;
  mode: number;
  name: string;
  categories: Category[];
  uuid: string;
}

const QuizCard: React.FC<QuizCardProps> = React.memo(({
  startQuiz,
  mode,
  name,
  categories = [],
  uuid
}) => {
  // Все состояния в начале
  const { quizStates, setQuizStates } = useQuizContext();
  const [isError, setIsError] = React.useState(false);
  const [totalQuestionsCount, setTotalQuestionsCount] = React.useState(0);

  // Первый эффект для проверки данных
  React.useEffect(() => {
    if (!uuid || !quizStates) {
      setIsError(true);
      return;
    }

    setIsError(false);
    if (!quizStates[uuid]) {
      setQuizStates(prev => ({
        ...prev,
        [uuid]: {
          usedBlocks: {},
          completedGames: 0,
          data: null
        }
      }));
    }
  }, [uuid, quizStates, setQuizStates]);

  // Второй эффект для подсчета вопросов
  React.useEffect(() => {
    const count = categories.reduce((acc, category) => {
      if (!category?.blocks?.length) return acc;
      return acc + category.blocks.length;
    }, 0);
    setTotalQuestionsCount(count);
  }, [categories]);

  return (
    <div className={isError ? styles.error : styles.card}>
      {isError ? (
        <div>Ошибка загрузки данных викторины</div>
      ) : (
        <div className={styles.image}>
          <div className={styles.questionCount}>
            {totalQuestionsCount} {totalQuestionsCount === 1 ? 'вопрос' : 'вопросов'}
          </div>
          <h2>{name || 'Без названия'}</h2>
          <div className={styles.bottomRow}>
            <button
              className={styles.startButton}
              onClick={startQuiz}
              disabled={!categories || categories.length === 0}
            >
              Провести наживо
            </button>
          </div>
        </div>
      )}
    </div>
  );
});

// Добавляем displayName для улучшенной отладки
QuizCard.displayName = 'QuizCard';

export default QuizCard;