import { ActionListener, DigmaMessageError } from './types';

class ActionDispatcher {
  private actions: {
    [key: string]: ActionListener[];
  };

  constructor() {
    this.actions = {};
  }

  public addActionListener(type: string, listener: ActionListener) {
    if (!this.actions[type]) {
      this.actions[type] = [listener];
    } else {
      this.actions[type].push(listener);
    }
  }

  public removeActionListener(type: string, listener: ActionListener) {
    if (this.actions[type]) {
      this.actions[type] = this.actions[type].filter(x => x !== listener);
    }

    if (this.actions[type].length === 0) {
      delete this.actions[type];
    }
  }

  public dispatch(
    timeStamp: number,
    type: string,
    data: unknown,
    error: DigmaMessageError | undefined
  ): void {
    if (this.actions[type]) {
      this.actions[type].forEach(fn => fn(data, timeStamp, error));
    }
  }
}

export default ActionDispatcher;
