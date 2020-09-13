class Normalizer {
  private _normalized: string[];
  private _prev: string;
  private _next: string;

  constructor(text: string) {
    this._prev = text;
    this._next = '';
    this._normalized = [];
    this._normalize(this._prev);
  }

  private _normalize(text: string): void {
    const hasCarriage = /\r\n?/g;
    const tooManyNewLine = /\n+$/g;
    this._normalized = text
      .replace(hasCarriage, '\n')
      .replace(tooManyNewLine, '\n')
      .split('\n');
  }

  public shouldUpdate(next: string): boolean {
    this._next = next;
    return this._prev !== this._next;
  }

  public updateNext(): void {
    this._normalize(this._next);
    this._prev = this._next;
    this._next = '';
  }

  public get(): string[] {
    return this._normalized;
  }
}

export default Normalizer;
