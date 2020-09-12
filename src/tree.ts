import { paragraph } from './rules';
import { Node } from './tokenizer';

class Tree {
  private readonly _root: Node;

  constructor() {
    this._root = new Node(paragraph, '');
  }

  public size() {
    return this._root.size();
  }

  public get(index: number): Node {
    return Tree._get(this._root, index);
  }

  private static _get(node: Node, index: number): Node {
    return node.getChild(index);
  }

  private static _put(node: Node, parent: Node, index: number): void {
    parent.putChild(node, index);
  }

  public putBlock(node: Node, index: number): void {
    Tree._put(node, this._root, index);
  }

  public putInline(node: Node, parent: Node, index: number): void {
    Tree._put(node, parent, index);
  }
}

export default Tree;
