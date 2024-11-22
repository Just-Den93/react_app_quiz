// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import { QuizProvider } from './context/QuizContext';
import { ModalProvider } from './context/ModalContext';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

ReactDOM.render(
  <React.StrictMode>
    <ModalProvider>
      <QuizProvider>
        <App />
      </QuizProvider>
    </ModalProvider>
  </React.StrictMode>,
  rootElement
);