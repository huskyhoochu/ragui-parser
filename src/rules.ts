import { MDTypes, Rule } from './tokenizer';

const heading: Rule = {
  type: MDTypes.Heading,
  rule: /^#{1,6}\s/,
};
const hr: Rule = {
  type: MDTypes.Hr,
  rule: /^-{3}/,
};
const blockquote: Rule = {
  type: MDTypes.Blockquote,
  rule: /^>\s/,
};
const ol: Rule = {
  type: MDTypes.OrderedList,
  rule: /^\d\.\s/,
};
const ul: Rule = {
  type: MDTypes.UnorderedList,
  rule: /^[*-]\s/,
};

const rules = [heading, hr, blockquote, ol, ul];
export default rules;
