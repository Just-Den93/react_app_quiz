import { handleError } from './errorHandling';
import { Category } from '../types/quiz.types';

interface QuizData {
  uuid: string;
  mode: number;
  name: string;
  categories: Category[];
  "quiz name"?: string;
}

// Простая функция для загрузки JSON файлов
const requireJsonFiles = () => {
  try {
    const context = require.context('../data', false, /\.json$/);
    return context.keys().map(key => ({
      data: context(key),
      filename: key
    }));
  } catch {
    return [];
  }
};

export function loadJsonDataFiles(): QuizData[] {
  try {
    const files = requireJsonFiles();
    return files.map(({ data }) => {
      // Приведение типа data к интерфейсу QuizData
      const typedData = data as QuizData;
      return {
        ...typedData,
        name: typedData["quiz name"] || 'Unnamed Quiz'
      };
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error loading JSON files:', error);
      handleError(error, 'Не удалось загрузить файлы викторины.');
    } else {
      handleError(new Error('Неизвестная ошибка'), 'Не удалось загрузить файлы викторины.');
    }
    return [];
  }
}
