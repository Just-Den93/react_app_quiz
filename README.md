react_app_quiz/
├── .gitignore
├── README.md
├── package.json
├── package-lock.json
├── tsconfig.json
├── index.css
├── src/
│ ├── assets/
│ ├── components/
│ │ ├── App/
│ │ │ ├── App.tsx
│ │ │ ├── App.module.css
│ │ │ └── appUtils.ts
│ │ ├── common/
│ │ │ ├── Button/
│ │ │ │ ├── Button.tsx
│ │ │ │ ├── Button.module.css
│ │ │ │ └── ButtonTypes.ts
│ │ │ ├── MenuModal/
│ │ │ │ ├── MenuModal.tsx
│ │ │ │ ├── MenuModal.module.css
│ │ │ │ ├── MenuModal.test.js
│ │ │ │ └── menuModalUtils.ts
│ │ │ ├── Modal/
│ │ │ │ ├── Modal.tsx
│ │ │ │ ├── Modal.module.css
│ │ │ │ └── modalUtils.ts
│ │ │ └── Timer/
│ │ │ ├── Timer.tsx
│ │ │ ├── Timer.module.css
│ │ │ ├── Timer.test.tsx
│ │ │ └── timerUtils.ts
│ │ ├── features/
│ │ │ ├── Game/
│ │ │ │ ├── Animation/
│ │ │ │ │ ├── ConfettiAnimation.tsx
│ │ │ │ │ ├── ConfettiAnimation.test.tsx
│ │ │ │ │ └── canvas-confetti.d.ts
│ │ │ │ ├── GameModes/
│ │ │ │ │ ├── QAMode/
│ │ │ │ │ │ ├── QAMode.jsx
│ │ │ │ │ │ ├── QAMode.module.css
│ │ │ │ │ │ └── QAModeUtils.js
│ │ │ │ │ └── SelectionMode/
│ │ │ │ │ ├── SelectionMode.tsx
│ │ │ │ │ ├── SelectionMode.module.css
│ │ │ │ │ └── SelectionModeUtils.tsx
│ │ │ │ ├── Messages/
│ │ │ │ │ ├── EndMessage/
│ │ │ │ │ │ ├── EndMessage.tsx
│ │ │ │ │ │ ├── EndMessage.module.css
│ │ │ │ │ │ └── EndMessageUtils.ts
│ │ │ │ │ ├── WarningMessage/
│ │ │ │ │ │ ├── WarningMessage.tsx
│ │ │ │ │ │ ├── WarningMessage.module.css
│ │ │ │ │ │ └── warningMessageConstants.ts
│ │ │ │ └── Settings/
│ │ │ │ ├── Settings.jsx
│ │ │ │ └── Settings.module.css
│ │ │ └── Quiz/
│ │ │ ├── CategoryRow/
│ │ │ │ ├── CategoryRow.tsx
│ │ │ │ ├── CategoryRow.module.css
│ │ │ │ └── CategoryRowUtils.ts
│ │ │ ├── Item/
│ │ │ │ ├── Item.tsx
│ │ │ │ ├── Item.module.css
│ │ │ │ └── itemUtils.ts
│ │ │ ├── QuizCard/
│ │ │ │ ├── QuizCard.tsx
│ │ │ │ ├── QuizCard.module.css
│ │ │ └── QuizPage/
│ │ │ ├── hooks/
│ │ │ │ ├── useQuizGameLogic.ts
│ │ │ │ └── useQuizModals.ts
│ │ │ ├── QuizPage.tsx
│ │ │ ├── QuizPage.module.css
│ │ │ └── quizPageUtils.ts
│ │ └── layout/
│ │ ├── ContentContainer/
│ │ │ ├── ContentContainer.tsx
│ │ │ ├── ContentContainer.module.css
│ │ │ └── contentContainerUtils.tsx
│ │ └── Sidebar/
│ │ ├── Sidebar.jsx
│ │ └── Sidebar.module.css
│ ├── context/
│ │ └── QuizContext.tsx
│ ├── data/
│ │ ├── mode1.json
│ │ └── mode2.json
│ ├── services/
│ │ └── quiz/
│ │ └── QuizService.ts
│ ├── types/
│ │ ├── button.types.ts
│ │ ├── quiz.types.ts
│ │ └── declarations.d.ts
│ ├── utils/
│ │ ├── errorHandling.ts
│ │ ├── loadData.ts
│ │ └── loadJsonData.ts
│ ├── index.css
│ ├── index.tsx
│ ├── react-app-env.d.ts
│ ├── reportWebVitals.ts
│ └── setupTests.ts
