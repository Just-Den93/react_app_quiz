// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import { QuizProvider } from './context/QuizContext';
import { ModalProvider } from './context/ModalContext';
import Sidebar from './components/layout/Sidebar/Sidebar';
import QuizCard from './components/features/Quiz/QuizCard/QuizCard';
import QuizPage from './components/features/Quiz/QuizPage/QuizPage';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

ReactDOM.render(
  <React.StrictMode>
    <ModalProvider>
      <QuizProvider>
        <App Sidebar={Sidebar} QuizCard={QuizCard} QuizPage={QuizPage} />
      </QuizProvider>
    </ModalProvider>
  </React.StrictMode>,
  rootElement
);