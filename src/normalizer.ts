class Normalizer {
  private readonly _rawText: string;
  private _normalized: string[];

  constructor(text: string) {
    this._rawText = text;
    this._normalized = [];
  }

  private normalize(): void {
    const hasCarriage = /\r\n?/g;
    const tooManyNewLine = /\n+$/g;
    const result = this._rawText
      .replace(hasCarriage, '\n')
      .replace(tooManyNewLine, '\n');

    this._normalized = result.split('\n');
  }

  public getNormalized(): string[] {
    this.normalize();
    return this._normalized;
  }
}

export default Normalizer;
