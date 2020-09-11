class Normalizer {
  private readonly _rawText: string;
  private _normalized: string;

  constructor(text: string) {
    this._rawText = text;
    this._normalized = '';
  }

  private normalize(): void {
    const hasCarriage = /\r\n?/g;
    const hasNewLine = /\n$/g;
    const tooManyNewLine = /\n+$/g;

    let result = this._rawText.replace(hasCarriage, '\n');

    if (!hasNewLine.test(result)) {
      result += '\n';
    }

    if (tooManyNewLine.test(result)) {
      result = result.replace(tooManyNewLine, '\n');
    }

    this._normalized = result;
  }

  public getNormalized(): string {
    this.normalize();
    return this._normalized;
  }
}

export default Normalizer;
