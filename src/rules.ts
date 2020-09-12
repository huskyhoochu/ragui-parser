export const enum MDTypes {
  Heading,
  Paragraph,
  OrderedList,
  UnorderedList,
  Hr,
  Blockquote,
}

export interface Rule {
  name: MDTypes;
  type: 'inline' | 'block';
  rule: RegExp;
}

export const paragraph: Rule = {
  name: MDTypes.Paragraph,
  type: 'block',
  rule: /.+/,
};

export const heading: Rule = {
  name: MDTypes.Heading,
  type: 'block',
  rule: /^#{1,6}\s/,
};

export const hr: Rule = {
  name: MDTypes.Hr,
  type: 'block',
  rule: /^-{3}/,
};

export const blockquote: Rule = {
  name: MDTypes.Blockquote,
  type: 'block',
  rule: /^>\s/,
};

export const ol: Rule = {
  name: MDTypes.OrderedList,
  type: 'block',
  rule: /^\d\.\s/,
};

export const ul: Rule = {
  name: MDTypes.UnorderedList,
  type: 'block',
  rule: /^[*-]\s/,
};

const rules = [heading, hr, blockquote, ol, ul];
export default rules;
