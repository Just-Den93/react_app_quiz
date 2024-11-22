// appUtils.ts
export const startQuizHandler = (
	mode: number,
	uuid: string,
	setSelectedMode: React.Dispatch<React.SetStateAction<number | null>>,
	setCurrentQuizId: React.Dispatch<React.SetStateAction<string | null>>,
	setShowQuizPage: React.Dispatch<React.SetStateAction<boolean>>
 ): void => {
	setSelectedMode(mode);
	setCurrentQuizId(uuid);
	setShowQuizPage(true);
 
	localStorage.setItem('selectedMode', mode.toString());
	localStorage.setItem('currentQuizId', uuid);
	localStorage.setItem('showQuizPage', 'true');
	localStorage.removeItem('menuVisible'); // Очищаем состояние меню
 };