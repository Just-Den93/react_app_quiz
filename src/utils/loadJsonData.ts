import { handleError } from './errorHandling';
import { QuizData } from '../types/quiz.types';

/**
 * Загружает данные с уникальными UUID
 */
export function loadUniqueUuids(): QuizData[] {
  try {
    // Загружаем mode2.json напрямую
    const mode2Data = require('../data/mode2.json');
    console.log('Loaded mode2 data:', mode2Data); // Для отладки

    // Преобразуем данные в нужный формат
    const formattedData = {
      ...mode2Data,
      name: mode2Data["quiz name"] || 'Unnamed Quiz'
    };

    return [formattedData];
  } catch (error) {
    console.error('Error in loadUniqueUuids:', error);
    handleError(error instanceof Error ? error : new Error('Failed to load quiz data'));
    return [];
  }
}

/**
 * Загружает данные викторины по указанному режиму
 */
export function loadJsonDataByMode(mode: number): QuizData | null {
  try {
    // Для текущего случая у нас только mode2.json
    if (mode === 2) {
      const quizData = require('../data/mode2.json');
      return {
        ...quizData,
        name: quizData["quiz name"] || 'Unnamed Quiz'
      };
    }
    
    console.warn(`Quiz data for mode ${mode} not found`);
    return null;
  } catch (error) {
    console.error('Error in loadJsonDataByMode:', error);
    handleError(error instanceof Error ? error : new Error('Failed to load quiz data'));
    return null;
  }
}

/**
 * Загружает все файлы JSON с данными викторин
 */
export function loadJsonDataFiles(): QuizData[] {
  try {
    // В текущей реализации у нас только один файл
    const mode2Data = require('../data/mode2.json');
    return [{
      ...mode2Data,
      name: mode2Data["quiz name"] || 'Unnamed Quiz'
    }];
  } catch (error) {
    console.error('Error in loadJsonDataFiles:', error);
    handleError(error instanceof Error ? error : new Error('Failed to load quiz data'));
    return [];
  }
}

/**
 * Проверяет валидность данных викторины
 */
export function validateQuizData(data: QuizData): boolean {
  return !!(
    data.uuid &&
    data.mode &&
    Array.isArray(data.categories) &&
    data.categories.length > 0
  );
}