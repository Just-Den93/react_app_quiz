import React from 'react';
import styles from './Item.module.scss';
import { useModal } from '../../../common/ModalManager/useModal';
import { QuizBlock } from '../../../../types/quiz.types';
import { useQuizContext } from '../../../../context/QuizContext';
import { checkIfUsed, handleBlockClick } from './itemUtils';

interface ItemProps {
  block: QuizBlock;
  categoryId: string;
  onBlockSelect: (block: QuizBlock & { categoryId: string }) => void;
  isUsed: boolean;  // Объявляем проп isUsed
}

const Item: React.FC<ItemProps> = ({ block, categoryId, onBlockSelect, isUsed }) => {
  const { showModal } = useModal();
  const { quizStates, currentQuizId } = useQuizContext();
  const isBlockUsed = checkIfUsed(quizStates, currentQuizId, categoryId, block.id); // Используем вынесенную функцию

  const handleClick = () => {
    console.log('Item clicked, showing modal');  // Добавим для отладки
    onBlockSelect({ ...block, categoryId });
    showModal('modal');
  };

  return (
    <button
      className={`${styles.box} ${isUsed ? styles.used : ''}`}
      onClick={handleClick}
    >
      {block.id + 1}
    </button>
  );
};

export default Item;
