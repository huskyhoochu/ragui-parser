import { paragraph, Rule } from './rules';

export class Token {
  private _rule: Rule;
  private _value?: string;
  private _children?: Token[];

  constructor(rule: Rule, value: string) {
    this._rule = rule;
    this._value = value;
  }

  public put(value: string): void {
    this._value = value;
  }

  public get(): string {
    return this._value || '';
  }

  public size(): number {
    return this._children?.length || 0;
  }

  public putChild(node: Token, index: number): void {
    if (!this._children) {
      this._children = [];
    }

    this._children.splice(index, 0, node);
  }

  public getChild(index: number): Token {
    if (!this._children) {
      return this;
    }

    return this._children[index];
  }
}

class Tokenizer {
  private readonly _rules: Rule[];

  constructor(rules: Rule[]) {
    this._rules = rules;
  }

  public tokenize(line: string): Token {
    this._rules.forEach((rule: Rule) => {
      if (rule.rule.test(line)) {
        return new Token(rule, line);
      }
    });

    return new Token(paragraph, line);
  }
}

export default Tokenizer;
