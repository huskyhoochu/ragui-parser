import { paragraph } from './rules';
import { Token } from './tokenizer';

class Tree {
  private readonly _root: Token;

  constructor() {
    this._root = new Token(paragraph, '');
  }

  public size() {
    return this._root.size();
  }

  public get(index: number): Token {
    return Tree._get(this._root, index);
  }

  private static _get(token: Token, index: number): Token {
    return token.getChild(index);
  }

  private static _put(token: Token, parent: Token, index: number): void {
    parent.putChild(token, index);
  }

  public putBlock(token: Token, index: number): void {
    Tree._put(token, this._root, index);
  }

  public putInline(token: Token, parent: Token, index: number): void {
    Tree._put(token, parent, index);
  }
}

export default Tree;
