import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuizPage from '../features/Quiz/QuizPage/QuizPage';
import QuizCard from '../features/Quiz/QuizCard/QuizCard';
import Sidebar from '../layout/Sidebar/Sidebar';
import styles from './App.module.css';
import { useQuizContext } from '../../context/QuizContext';
import { loadUniqueUuids } from '../../utils/loadJsonData';
import { startQuizHandler } from './appUtils';
import type { QuizData } from '../../types/quiz.types';

const App: React.FC = () => {
  const { 
    showQuizPage, 
    setShowQuizPage, 
    setSelectedMode, 
    setCurrentQuizId,
    currentQuizId 
  } = useQuizContext();
  
  const [quizData, setQuizData] = useState<QuizData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Загрузка данных викторины
  useEffect(() => {
    try {
      const uniqueData = loadUniqueUuids();
      console.log('Loaded quiz data:', uniqueData);
      setQuizData(uniqueData);
    } catch (err) {
      console.error('Error loading quiz data:', err);
      setError('Ошибка загрузки данных');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Восстановление сохраненного состояния
  useEffect(() => {
    const savedQuizId = localStorage.getItem('currentQuizId');
    const savedMode = localStorage.getItem('selectedMode');
    const savedShowQuizPage = localStorage.getItem('showQuizPage');

    console.log('Saved state:', { savedQuizId, savedMode, savedShowQuizPage });

    // Очищаем некорректное состояние
    if (savedShowQuizPage === 'true' && !savedQuizId) {
      localStorage.removeItem('showQuizPage');
      setShowQuizPage(false);
      return;
    }

    // Восстанавливаем состояние только если есть все необходимые данные
    if (savedQuizId && savedMode) {
      setCurrentQuizId(savedQuizId);
      setSelectedMode(Number(savedMode));
      setShowQuizPage(savedShowQuizPage === 'true');
    }
  }, [setCurrentQuizId, setSelectedMode, setShowQuizPage]);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  // Если showQuizPage true, но нет currentQuizId, сбрасываем к начальному состоянию
  if (showQuizPage && !currentQuizId) {
    setShowQuizPage(false);
  }

  return (
    <Router>
      <div className={styles.container}>
        {!showQuizPage && <Sidebar />}
        <div className={styles.content_wraper}>
          <Routes>
            <Route
              path="/"
              element={
                !showQuizPage ? (
                  <div className={styles.quizCardsContainer}>
                    {quizData.map((data) => (
                      <QuizCard
                        key={data.uuid}
                        startQuiz={() =>
                          startQuizHandler(
                            data.mode,
                            data.uuid,
                            setSelectedMode,
                            setCurrentQuizId,
                            setShowQuizPage
                          )
                        }
                        mode={data.mode}
                        uuid={data.uuid}
                        name={data.name || 'Untitled Quiz'}
                        categories={data.categories}
                      />
                    ))}
                  </div>
                ) : null
              }
            />
          </Routes>
        </div>
        {showQuizPage && currentQuizId && (
          <div className={styles.fullscreen}>
            <QuizPage />
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;