src/
├── assets/
├── components/
│   ├── App/
│   │   ├── hooks/
│   │   │   ├── useQuizData.ts
│   │   │   └── useQuizState.ts
│   │   ├── App.module.css
│   │   ├── App.tsx
│   │   └── appUtils.ts
│   ├── common/
│   │   ├── Button/
│   │   │   ├── Button.module.css
│   │   │   ├── Button.tsx
│   │   │   └── ButtonTypes.ts
│   │   ├── MenuModal/
│   │   │   ├── BurgerMenu.module.css
│   │   │   └── BurgerMenu.tsx
│   │   ├── Modal/
│   │   │   ├── Modal.module.css
│   │   │   ├── Modal.tsx
│   │   │   └── modalUtils.ts
│   │   ├── ModalManager/
│   │   │   ├── factories/
│   │   │   │   └── gameModeFactory.ts
│   │   │   ├── ModalManager.tsx
│   │   │   └── useModal.ts
│   │   └── Timer/
│   │       ├── Timer.module.css
│   │       ├── Timer.tsx
│   │       └── timerUtils.ts
│   ├── features/
│   │   ├── Game/
│   │   │   ├── Animation/
│   │   │   │   ├── canvas-confetti.d.ts
│   │   │   │   └── ConfettiAnimation.tsx
│   │   │   ├── GameModes/
│   │   │   │   ├── QAMode/
│   │   │   │   │   ├── QAMode.module.css
│   │   │   │   │   ├── QAMode.tsx
│   │   │   │   │   └── QAModeUtils.ts
│   │   │   │   └── SelectionMode/
│   │   │   │       ├── SelectionMode.module.css
│   │   │   │       ├── SelectionMode.tsx
│   │   │   │       └── SelectionModeUtils.tsx
│   │   │   ├── Messages/
│   │   │   │   ├── EndMessage/
│   │   │   │   │   ├── EndMessage.module.css
│   │   │   │   │   ├── EndMessage.tsx
│   │   │   │   │   └── EndMessageUtils.ts
│   │   │   │   └── WarningMessage/
│   │   │   │       ├── WarningMessage.module.css
│   │   │   │       ├── WarningMessage.tsx
│   │   │   │       └── warningMessageConstants.ts
│   │   │   └── Settings/
│   │   │       ├── Settings.jsx
│   │   │       └── Settings.module.css
│   │   └── Quiz/
│   │       ├── CategoryRow/
│   │       │   ├── CategoryRow.module.css
│   │       │   ├── CategoryRow.tsx
│   │       │   └── CategoryRowUtils.ts
│   │       ├── Item/
│   │       │   ├── Item.module.css
│   │       │   ├── Item.tsx
│   │       │   └── itemUtils.ts
│   │       ├── QuizCard/
│   │       │   ├── QuizCard.module.css
│   │       │   └── QuizCard.tsx
│   │       └── QuizPage/
│   │           ├── hooks/
│   │           │   ├── useDataValidation.ts
│   │           │   ├── useErrorHandling.ts
│   │           │   ├── useKeyboardEvents.ts
│   │           │   ├── useQuizGameLogic.ts
│   │           │   └── useQuizIdentifier.ts
│   │           ├── QuizPage.module.css
│   │           ├── QuizPage.tsx
│   │           └── quizPageUtils.ts
│   └── layout/
│       ├── ContentContainer/
│       │   ├── ContentContainer.module.css
│       │   ├── ContentContainer.tsx
│       │   └── contentContainerUtils.tsx
│       └── Sidebar/
│           ├── Sidebar.jsx
│           └── Sidebar.module.css
├── context/
│   ├── ModalContext.tsx
│   └── QuizContext.tsx
├── data/
│   ├── mode1.json
│   └── mode2.json
├── types/
│   ├── button.types.ts
│   ├── declarations.d.ts
│   ├── gameModes.types.ts
│   └── quiz.types.ts
├── utils/
│   ├── errorHandling.ts
│   ├── loadData.ts
│   └── loadJsonData.ts
├── index.css
├── index.tsx
├── react-app-env.d.ts
├── reportWebVitals.ts
└── setupTests.ts