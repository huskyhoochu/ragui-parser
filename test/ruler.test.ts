import Ruler from '../src/ruler';

describe('Test Ruler', () => {
  test('It should check right format', () => {
    const h1 = /^#{1,6}\s/;
    const ruler = new Ruler(h1, 'heading');
    expect(ruler.is('# 안녕하세요')).toBeTruthy();
  });
});
