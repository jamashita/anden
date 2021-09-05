import { RuntimeError } from '@jamashita/anden-error';

export class ULIDError extends RuntimeError<'ULIDError'> {
  public readonly noun: 'ULIDError' = 'ULIDError';

  public constructor(message: string, cause?: Error) {
    super(message, cause);
  }
}
