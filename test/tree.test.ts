import Tree from '../src/tree';
import Normalizer from '../src/normalizer';
import Tokenizer, { Node } from '../src/tokenizer';
import rules from '../src/rules';

describe('Test Tree', () => {
  let tree: Tree;
  let nodes: Node[];

  beforeEach(() => {
    const text = `# 애국가
---

1. 동해물과 백두산이
2. 마르고 닳도록
- 하느님이 보우하사
* 우리 나라 만세
> 무궁화 삼천리 화려강산
대한사람 대한으로 길이 보전하세`;
    const lines = new Normalizer(text).get();
    const tokenizer = new Tokenizer(rules);
    nodes = lines.map((line: string) => tokenizer.tokenize(line));

    tree = new Tree();
    nodes.forEach((node: Node, index: number) => {
      tree.putBlock(node, index);
    });
  });

  test('It should put item', () => {
    expect(tree.size()).toBe(9);
  });

  test('It should get Item', () => {
    expect(tree.get(8).get()).toBe('대한사람 대한으로 길이 보전하세');
  });
});
