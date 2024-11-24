import type { GameModeComponent, GameModeConfig, GameModeProps } from '../../../../types/gameModes.types';

export class ValidationError extends Error {
 constructor(message: string) {
   super(message);
   this.name = 'ValidationError';
 }
}

export class GameModeFactory {
 private configs: Map<number, GameModeConfig> = new Map();

 registerMode(config: GameModeConfig): void {
   this.validateConfig(config);
   
   if (this.configs.has(config.id)) {
     throw new ValidationError(`Ігровий режим з id ${config.id} вже зареєстрований`);
   }
   this.configs.set(config.id, config);
 }

 getMode(id: number): GameModeComponent | undefined {
   const config = this.configs.get(id);
   if (!config) {
     console.warn(`Ігровий режим з id ${id} не знайдено`);
     return undefined;
   }
   return config.component;
 }

 private validateConfig(config: GameModeConfig): void {
   if (typeof config.id !== 'number' || config.id < 1) {
     throw new ValidationError('Недійсний ID режиму: має бути додатнім числом');
   }

   if (!config.name || typeof config.name !== 'string') {
     throw new ValidationError('Недійсна назва режиму: має бути непорожнім рядком');
   }

   if (!this.validateComponent(config.component)) {
     throw new ValidationError('Недійсний компонент: має бути дійсним React компонентом');
   }

   if (config.options) {
     this.validateOptions(config.options);
   }
 }

 private validateComponent(component: GameModeComponent): boolean {
   if (!component) return false;
   if (typeof component !== 'function') return false;
   return true;
 }

 private validateOptions(options: NonNullable<GameModeConfig['options']>): void {
   if ('timerDuration' in options) {
     if (typeof options.timerDuration !== 'number' || options.timerDuration <= 0) {
       throw new ValidationError('Недійсна тривалість таймера: має бути додатнім числом');
     }
   }

   if ('allowHints' in options) {
     if (typeof options.allowHints !== 'boolean') {
       throw new ValidationError('Недійсне значення дозволу підказок: має бути логічним значенням');
     }
   }

   if ('maxAttempts' in options) {
     if (typeof options.maxAttempts !== 'number' || options.maxAttempts < 1) {
       throw new ValidationError('Недійсна кількість спроб: має бути додатнім числом');
     }
   }
 }

 getAllModes(): GameModeConfig[] {
   return Array.from(this.configs.values());
 }
}

export const gameModeFactory = new GameModeFactory();