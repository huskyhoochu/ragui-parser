import { MDTypes, rule, ruleFactory } from './rules';

export class Token {
  private readonly _rule: rule;
  private _value: string;
  private _html: string;
  public children?: Token[];

  constructor(rule: rule, value: string) {
    this._rule = rule;
    this._value = value;
    this._html = '';
    this.setHtml(this._rule.parse(this.getValue()));
  }

  public getRule(): rule {
    return this._rule;
  }

  public getValue(): string {
    return this._value;
  }

  public setValue(value: string): void {
    this._value = value;
  }

  public getHtml(): string {
    return this._html;
  }

  public setHtml(html: string): void {
    this._html = html;
  }

  public size(): number {
    return this.children?.length || 0;
  }

  public putChild(node: Token, index: number): void {
    if (!this.children) {
      this.children = [];
    }

    this.children.splice(index, 0, node);
  }

  public getChild(index: number): Token {
    if (!this.children) {
      return this;
    }

    return this.children[index];
  }
}

class Tokenizer {
  private readonly _rulesBlock: rule[];
  private readonly _rulesInline: rule[];

  constructor(rulesBlock: rule[], rulesInline: rule[]) {
    this._rulesBlock = rulesBlock;
    this._rulesInline = rulesInline;
  }

  private _parseBlock(line: string): Token {
    for (let i = 0; i < this._rulesBlock.length; i++) {
      if (this._rulesBlock[i].rule.test(line)) {
        return new Token(this._rulesBlock[i], line);
      }
    }

    return new Token(ruleFactory.create(MDTypes.Paragraph), line);
  }

  private _parseInline(token: Token): void {
    for (let i = 0; i < this._rulesInline.length; i++) {
      if (this._rulesInline[i].rule.test(token.getHtml())) {
        const newHtml = this._rulesInline[i].parse(token.getHtml());
        token.setHtml(newHtml);
      }
    }
  }

  public tokenize(lines: string[]): Token[] {
    let tokens = lines.map((line: string) => this._parseBlock(line));
    tokens = tokens.map((token: Token, i: number, arr: Token[]) => {
      if (
        i - 1 >= 0 &&
        token.getRule().name === MDTypes.OrderedList &&
        arr[i - 1].getRule().name !== MDTypes.OrderedList
      ) {
        const olStart = '<ol>';
        token.setHtml(olStart + token.getHtml());
      }

      if (i === 0 && token.getRule().name === MDTypes.OrderedList) {
        const olStart = '<ol>';
        token.setHtml(olStart + token.getHtml());
      }

      if (
        i + 1 < lines.length &&
        token.getRule().name === MDTypes.OrderedList &&
        arr[i + 1].getRule().name !== MDTypes.OrderedList
      ) {
        const olEnd = '</ol>';
        token.setHtml(token.getHtml() + olEnd);
      }

      if (
        i - 1 >= 0 &&
        token.getRule().name === MDTypes.UnorderedList &&
        arr[i - 1].getRule().name !== MDTypes.UnorderedList
      ) {
        const ulStart = '<ul>';
        token.setHtml(ulStart + token.getHtml());
      }

      if (
        i + 1 < lines.length &&
        token.getRule().name === MDTypes.UnorderedList &&
        arr[i + 1].getRule().name !== MDTypes.UnorderedList
      ) {
        const ulEnd = '</ul>';
        token.setHtml(token.getHtml() + ulEnd);
      }

      if (i === 0 && token.getRule().name === MDTypes.UnorderedList) {
        const ulStart = '<ul>';
        token.setHtml(ulStart + token.getHtml());
      }

      return token;
    });

    tokens.forEach((token: Token) => this._parseInline(token));
    return tokens;
  }
}

export default Tokenizer;
