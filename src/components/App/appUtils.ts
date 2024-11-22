export const startQuizHandler = (
	mode: number,
	uuid: string,
	setSelectedMode: React.Dispatch<React.SetStateAction<number | null>>,
	setCurrentQuizId: React.Dispatch<React.SetStateAction<string | null>>,
	setShowQuizPage: React.Dispatch<React.SetStateAction<boolean>>
 ): void => {
	// Сначала устанавливаем все необходимые значения
	setSelectedMode(mode); 
	setCurrentQuizId(uuid);
	setShowQuizPage(true);
 
	// Затем сохраняем их в localStorage
	localStorage.setItem('selectedMode', mode.toString());
	localStorage.setItem('currentQuizId', uuid);
	localStorage.setItem('showQuizPage', 'true');
 };