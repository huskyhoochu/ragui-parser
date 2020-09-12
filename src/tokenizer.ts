export enum MDTypes {
  Heading,
  Paragraph,
  OrderedList,
  UnorderedList,
  Hr,
  Blockquote,
}

export interface Rule {
  type: MDTypes;
  rule: RegExp;
}

export interface Token {
  type: MDTypes;
  value: string;
}

class Tokenizer {
  private readonly _rules: Rule[];

  constructor(rules: Rule[]) {
    this._rules = rules;
  }

  public tokenize(line: string): Token {
    const result: Token = {
      type: MDTypes.Paragraph,
      value: line,
    };

    this._rules.forEach((rule: Rule) => {
      if (rule.rule.test(line)) {
        result.type = rule.type;
      }
    });

    return result;
  }
}

export default Tokenizer;
