export class QuizService {
	constructor(private storage: Storage = localStorage) {}
 
	getQuizData(quizId: string | null) {
	  if (!quizId) return null;
	  return this.storage.getItem(`quiz-${quizId}`);
	}
 
	isBlockUsed(quizId: string | null, categoryId: string, blockId: number) {
	  if (!quizId) return false;
	  const usedBlocks = this.getUsedBlocks(quizId);
	  return usedBlocks[categoryId]?.includes(blockId) || false;
	}
 
	markBlockAsUsed(quizId: string | null, categoryId: string, blockId: number) {
	  if (!quizId) return;
	  const usedBlocks = this.getUsedBlocks(quizId);
	  usedBlocks[categoryId] = [...(usedBlocks[categoryId] || []), blockId];
	  this.storage.setItem(`used-blocks-${quizId}`, JSON.stringify(usedBlocks));
	}
 
	isGameCompleted(quizId: string | null) {
	  if (!quizId) return false;
	  const usedBlocks = this.getUsedBlocks(quizId);
	  // Проверка завершения игры
	  return this.calculateCompletion(usedBlocks);
	}
 
	startNewGame(quizId: string | null) {
	  if (!quizId) return;
	  this.storage.removeItem(`used-blocks-${quizId}`);
	  this.incrementCompletedGames(quizId);
	}
 
	private getUsedBlocks(quizId: string) {
	  const stored = this.storage.getItem(`used-blocks-${quizId}`);
	  return stored ? JSON.parse(stored) : {};
	}
 
	private calculateCompletion(usedBlocks: Record<string, number[]>) {
	  // Логика проверки завершения
	  return false;
	}
 
	private incrementCompletedGames(quizId: string) {
	  const current = Number(this.storage.getItem(`completed-games-${quizId}`)) || 0;
	  this.storage.setItem(`completed-games-${quizId}`, String(current + 1));
	}
 }