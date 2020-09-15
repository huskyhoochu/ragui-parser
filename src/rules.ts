export const enum MDTypes {
  Heading,
  Paragraph,
  OrderedList,
  UnorderedList,
  Hr,
  Blockquote,
  Strong,
  Em,
  Link,
  Img,
}

export interface Rule {
  name: MDTypes;
  rule: RegExp;
  parse: (line: string) => string;
}

class Paragraph implements Rule {
  name = MDTypes.Paragraph;
  public rule = /(.*)/;
  parse = (line: string) => line.replace(this.rule, '<p>$1</p>');
}

class Heading implements Rule {
  name = MDTypes.Heading;
  rule = /^(#{1,6})\s(.*)/;
  parse = (line: string) => {
    const [heading] = line.split(/\s/);
    return line.replace(
      this.rule,
      `<h${heading.length}>$2</h${heading.length}>`,
    );
  };
}

class Hr implements Rule {
  name = MDTypes.Hr;
  rule = /^---$/;
  parse = (line: string) => line.replace(this.rule, '<hr/>');
}

class Blockquote implements Rule {
  name = MDTypes.Blockquote;
  rule = /^>\s(.*)/;
  parse = (line: string) =>
    line.replace(this.rule, '<blockquote>$1</blockquote>');
}

class Ol implements Rule {
  name = MDTypes.OrderedList;
  rule = /^\d+\.\s(.*)/;
  parse = (line: string) => line.replace(this.rule, '<li>$1</li>');
}

class Ul implements Rule {
  name = MDTypes.UnorderedList;
  rule = /^[*-]\s(.*)/;
  parse = (line: string) => line.replace(this.rule, '<li>$1</li>');
}

class Strong implements Rule {
  name = MDTypes.Strong;
  rule = /(\*\*|__)(.+)\1/;
  parse = (line: string) => line.replace(this.rule, '<strong>$2</strong>');
}

class Em implements Rule {
  name = MDTypes.Em;
  rule = /([*_])(.+)\1/;
  parse = (line: string) => line.replace(this.rule, '<em>$2</em>');
}

class Link implements Rule {
  name = MDTypes.Link;
  rule = /\[(.*)\]\((.*)\)/;
  parse = (line: string) => line.replace(this.rule, '<a href="$2">$1</a>');
}

class Img implements Rule {
  name = MDTypes.Link;
  rule = /!\[(.*)\]\((.*)\)/;
  parse = (line: string) =>
    line.replace(this.rule, '<img src="$2" alt="$1" />');
}

export type rule =
  | Ul
  | Paragraph
  | Ol
  | Hr
  | Heading
  | Blockquote
  | Em
  | Strong
  | Link
  | Img;

class RuleFactory {
  public create(type: MDTypes): rule {
    switch (type) {
      case MDTypes.UnorderedList:
        return new Ul();
      case MDTypes.Paragraph:
        return new Paragraph();
      case MDTypes.OrderedList:
        return new Ol();
      case MDTypes.Hr:
        return new Hr();
      case MDTypes.Heading:
        return new Heading();
      case MDTypes.Blockquote:
        return new Blockquote();
      case MDTypes.Em:
        return new Em();
      case MDTypes.Strong:
        return new Strong();
      case MDTypes.Link:
        return new Link();
      case MDTypes.Img:
        return new Img();
      default:
        return new Paragraph();
    }
  }
}

export const ruleFactory = new RuleFactory();

export const rulesBlock = ((): rule[] => [
  ruleFactory.create(MDTypes.UnorderedList),
  ruleFactory.create(MDTypes.OrderedList),
  ruleFactory.create(MDTypes.Hr),
  ruleFactory.create(MDTypes.Heading),
  ruleFactory.create(MDTypes.Blockquote),
])();

export const rulesInline = ((): rule[] => [
  ruleFactory.create(MDTypes.Strong),
  ruleFactory.create(MDTypes.Em),
  ruleFactory.create(MDTypes.Img),
  ruleFactory.create(MDTypes.Link),
])();
