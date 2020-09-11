import Tokenizer, { MDTypes, Rule } from '../src/tokenizer';
import Normalizer from '../src/normalizer';

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

describe('Test tokenizer', () => {
  test('It should make token', () => {
    const rules = [heading, hr, blockquote, ol, ul];
    const text = `# 애국가
---

1. 동해물과 백두산이
2. 마르고 닳도록
- 하느님이 보우하사
* 우리 나라 만세
> 무궁화 삼천리 화려강산
대한사람 대한으로 길이 보전하세`;
    const lines = new Normalizer(text).getNormalized();
    const tokenizer = new Tokenizer(rules);
    const result = lines.map((line: string) => tokenizer.tokenize(line));

    expect(result.length).toBe(9);
    expect(result[0].type).toBe(MDTypes.Heading);
    expect(result[1].type).toBe(MDTypes.Hr);
    expect(result[2].type).toBe(MDTypes.Paragraph);
    expect(result[3].type).toBe(MDTypes.OrderedList);
  });
});
