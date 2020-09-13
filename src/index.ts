import Normalizer from './normalizer';
import Tokenizer, { Token } from './tokenizer';
import { rulesBlock, rulesInline } from './rules';
import Tree from './tree';

export default function parse(text: string): string {
  const lines = new Normalizer(text).get();
  const tokenizer = new Tokenizer(rulesBlock, rulesInline);
  const tokens = tokenizer.tokenize(lines);

  const tree = new Tree();
  tokens.forEach((token: Token, index: number) => {
    tree.put(token, index);
  });

  return tree.show();
}
