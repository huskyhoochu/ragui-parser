import { MDTypes, ruleFactory } from './rules';
import { Token } from './tokenizer';

class Tree {
  private readonly _root: Token;

  constructor() {
    this._root = new Token(ruleFactory.create(MDTypes.Paragraph), '');
  }

  public size(): number {
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

  public put(token: Token, index: number): void {
    Tree._put(token, this._root, index);
  }

  public show(): string {
    let result = '';

    if (this._root.children) {
      for (let i = 0; i < this._root.size(); i++) {
        const html = this._root.children[i].getHtml();
        result = result + html;
      }
    }

    return result;
  }
}

export default Tree;
