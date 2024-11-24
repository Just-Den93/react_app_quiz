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
      throw new ValidationError(`Game mode with id ${config.id} is already registered`);
    }
    this.configs.set(config.id, config);
  }

  getMode(id: number): GameModeComponent | undefined {
    const config = this.configs.get(id);
    if (!config) {
      console.warn(`Game mode with id ${id} not found`);
      return undefined;
    }
    return config.component;
  }

  private validateConfig(config: GameModeConfig): void {
    if (typeof config.id !== 'number' || config.id < 1) {
      throw new ValidationError('Invalid mode ID: must be a positive number');
    }

    if (!config.name || typeof config.name !== 'string') {
      throw new ValidationError('Invalid mode name: must be a non-empty string');
    }

    if (!this.validateComponent(config.component)) {
      throw new ValidationError('Invalid component: must be a valid React component');
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
        throw new ValidationError('Invalid timer duration: must be a positive number');
      }
    }

    if ('allowHints' in options) {
      if (typeof options.allowHints !== 'boolean') {
        throw new ValidationError('Invalid hint allowance value: must be a boolean');
      }
    }

    if ('maxAttempts' in options) {
      if (typeof options.maxAttempts !== 'number' || options.maxAttempts < 1) {
        throw new ValidationError('Invalid number of attempts: must be a positive number');
      }
    }
  }

  getAllModes(): GameModeConfig[] {
    return Array.from(this.configs.values());
  }
}

export const gameModeFactory = new GameModeFactory();