import Tree, { NodeFactory } from '../src/tree';
import Normalizer from '../src/normalizer';
import Tokenizer, { Token } from '../src/tokenizer';
import rules from '../src/rules';

describe('Test Tree', () => {
  let tree: Tree;
  let tokens: Token[];

  beforeEach(() => {
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
    tokens = lines.map((line: string) => tokenizer.tokenize(line));

    tree = new Tree();
    tokens.forEach((line: Token, index: number) => {
      const node = new NodeFactory(0, line);
      tree.put(node, 0, index);
    });
  });

  test('It should put item', () => {
    expect(tree.size()).toBe(tokens.length);
  });

  test('It should get Item', () => {
    expect(tree.get(0, 3).token?.value).toBe('1. 동해물과 백두산이');
  });
});