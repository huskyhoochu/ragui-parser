import Tokenizer from '../src/tokenizer';
import Normalizer from '../src/normalizer';
import { rulesBlock, rulesInline } from '../src/rules';

describe('Test tokenizer', () => {
  test('It should make token', () => {
    const text = `## 애국가
---

1. 동해물과 백두산이
2. 마르고 닳도록
- 하느님이 보우하사
* 우리 나라 만세
> 무궁화 삼천리 화려강산
대한사람 대한으로 길이 보전하세

2. 남산 위의 *저 소나무* 철갑을 두른 듯`;
    const lines = new Normalizer(text).get();
    const tokenizer = new Tokenizer(rulesBlock, rulesInline);
    const tokens = tokenizer.tokenize(lines);

    expect(tokens.length).toBe(11);
  });
});
