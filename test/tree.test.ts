import Tree from '../src/tree';
import Normalizer from '../src/normalizer';
import Tokenizer, { Token } from '../src/tokenizer';
import { rulesBlock, rulesInline } from '../src/rules';

describe('Test Tree', () => {
  let tree: Tree;
  let tokens: Token[];

  beforeEach(() => {
    const text = `## 애국가
~~취소선~~
[naver](https://www.naver.com)
![example](hello.png)
---

1. 동해물과 백두산이
2. 마르고 닳도록
- 하느님이 보우하사
* 우리 나라 만세
> 무궁화 삼천리 화려강산
대한사람 대한으로 길이 보전하세

2. 남산 위의 *저 소나무* 철갑을 두른 듯
`;
    const lines = new Normalizer(text).get();
    const tokenizer = new Tokenizer(rulesBlock, rulesInline);
    tokens = tokenizer.tokenize(lines);

    tree = new Tree();
    tokens.forEach((token: Token, index: number) => {
      tree.put(token, index);
    });
  });

  test('It should put item', () => {
    expect(tree.size()).toBe(15);
  });

  test('It should get item', () => {
    expect(tree.get(0).getValue()).toBe('## 애국가');
    expect(tree.get(0).getHtml()).toBe('<h2>애국가</h2>');

    expect(tree.get(5).getHtml()).toBe('<p></p>');
  });

  test('It should nested item parse', () => {
    expect(tree.get(13).getHtml()).toBe(
      '<ol><li>남산 위의 <em>저 소나무</em> 철갑을 두른 듯</li></ol>',
    );
  });

  test('It should show tree', () => {
    const html =
      '<h2>애국가</h2><p><strike>취소선</strike></p><p><a href="https://www.naver.com">naver</a></p><p><img src="hello.png" alt="example" /></p><hr/><p></p><ol><li>동해물과 백두산이</li><li>마르고 닳도록</li></ol><ul><li>하느님이 보우하사</li><li>우리 나라 만세</li></ul><blockquote>무궁화 삼천리 화려강산</blockquote><p>대한사람 대한으로 길이 보전하세</p><p></p><ol><li>남산 위의 <em>저 소나무</em> 철갑을 두른 듯</li></ol><p></p>';
    expect(tree.show()).toBe(html);
  });
});
