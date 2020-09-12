import { Token } from './tokenizer';

interface Node {
  depth: number;
  token?: Token;
  children: Node[];
  N: number;
}

export class NodeFactory implements Node {
  public depth: number;
  public token?: Token;
  public children: Node[];
  public N: number;

  constructor(depth: number, token?: Token) {
    this.depth = depth;
    this.token = token;
    this.children = [];
    this.N = 0;
  }
}

class Tree {
  private _root: Node;

  constructor() {
    this._root = new NodeFactory(-1);
  }

  public size(): number {
    return this._size(this._root);
  }

  private _size(node: Node): number {
    return node.N;
  }

  public get(depth: number, index: number): Node {
    return this._get(this._root, depth, index);
  }

  private _get(node: Node, depth: number, index: number): Node {
    const isCorrectDepth = node.depth === depth - 1;

    if (!isCorrectDepth) {
      node.children.forEach((child: Node) => {
        this._get(child, depth, index);
      });
    }

    return node.children[index];
  }

  public put(node: Node, depth: number, index: number): void {
    this._put(node, this._root, depth, index);
  }

  private _add(node: Node, parent: Node, index: number): void {
    parent.children[index] = node;
    parent.N += 1;
  }

  private _put(node: Node, parent: Node, depth: number, index: number): void {
    const isCorrectDepth = parent.depth === depth - 1;

    if (!isCorrectDepth) {
      parent.children.forEach((child: Node) => {
        this._put(node, child, depth, index);
      });
    }

    this._add(node, parent, index);
  }
}

export default Tree;
