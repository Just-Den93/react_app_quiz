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
    return files.map(({ data }) => ({
      ...data,
      name: data["quiz name"] || 'Unnamed Quiz'
    }));
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

export function loadUniqueUuids(): QuizData[] {
  try {
    const dataFiles = loadJsonDataFiles();
    console.log('All loaded data files:', dataFiles);
    
    if (dataFiles.length === 0) {
      console.warn('No quiz files found');
      return [];
    }

    const uniqueUuids = Array.from(new Set(dataFiles.map(file => file.uuid)));
    console.log('Found unique UUIDs:', uniqueUuids);

    return uniqueUuids
      .map(uuid => {
        const quizData = dataFiles.find(file => file.uuid === uuid);
        if (!quizData) return null;
        
        return {
          uuid: quizData.uuid,
          mode: quizData.mode,
          name: quizData.name,
          categories: quizData.categories || []
        };
      })
      .filter((quiz): quiz is QuizData => quiz !== null);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error processing unique UUIDs:', error);
      handleError(error, 'Ошибка при обработке данных викторины.');
    } else {
      handleError(new Error('Неизвестная ошибка'), 'Ошибка при обработке данных викторины.');
    }
    return [];
  }
}

export function loadJsonDataByMode(mode: number): QuizData | null {
  try {
    console.log('Loading quiz data for mode:', mode);
    
    const dataFiles = loadJsonDataFiles();
    if (dataFiles.length === 0) {
      console.warn('No quiz files found when searching by mode');
      return null;
    }

    const modeData = dataFiles.find(file => file.mode === mode);
    if (!modeData) {
      console.warn(`No quiz found for mode: ${mode}`);
      return null;
    }
    
    console.log('Found quiz data for mode:', modeData);
    return {
      uuid: modeData.uuid,
      mode: modeData.mode,
      name: modeData.name,
      categories: modeData.categories || []
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error loading quiz by mode:', error);
      handleError(error, 'Не удалось загрузить данные для выбранного режима игры.');
    } else {
      handleError(new Error('Неизвестная ошибка'), 'Не удалось загрузить данные для выбранного режима игры.');
    }
    return null;
  }
}

export function loadJsonFileCount(): number {
  try {
    const files = requireJsonFiles();
    const count = files.length;
    console.log('Total quiz files found:', count);
    return count;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error counting quiz files:', error);
      handleError(error, 'Не удалось подсчитать количество файлов викторины.');
    } else {
      handleError(new Error('Неизвестная ошибка'), 'Не удалось подсчитать количество файлов викторины.');
    }
    return 0;
  }
}