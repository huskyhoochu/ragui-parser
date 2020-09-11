class Ruler {
  private readonly _rule: RegExp;
  private readonly element: string;

  constructor(rule: RegExp, element: string) {
    this._rule = rule;
    this.element = element;
  }

  is(line: string): boolean {
    return this._rule.test(line);
  }

  format(): string {
    return this.element;
  }
}

export default Ruler;
