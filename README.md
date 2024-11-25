src/
├── assets/
├── components/
│   ├── App/
│   │   ├── App.module.css
│   │   ├── App.tsx
│   │   └── appUtils.ts
│   ├── common/
│   │   ├── Button/
│   │   │   ├── Button.module.css
│   │   │   ├── Button.tsx
│   │   │   └── ButtonTypes.ts
│   │   ├── MenuModal/
│   │   │   ├── MenuModal.module.css
│   │   │   ├── MenuModal.test.js
│   │   │   ├── MenuModal.tsx
│   │   │   └── menuModalUtils.ts
│   │   ├── Modal/
│   │   │   ├── Modal.module.css
│   │   │   ├── Modal.tsx
│   │   │   └── modalUtils.ts
│   │   ├── ModalManager/
│   │   │   ├── ModalManager.tsx
│   │   │   └── useModal.ts
│   │   └── Timer/
│   │       ├── Timer.module.css
│   │       ├── Timer.test.tsx
│   │       ├── Timer.tsx
│   │       └── timerUtils.ts
│   ├── features/
│   │   ├── Game/
│   │   │   ├── Animation/
│   │   │   │   ├── canvas-confetti.d.ts
│   │   │   │   └── ConfettiAnimation.tsx
│   │   │   ├── GameModes/
│   │   │   │   ├── QAMode/
│   │   │   │   │   ├── QAMode.jsx
│   │   │   │   │   ├── QAMode.module.css
│   │   │   │   │   └── QAModeUtils.js
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
