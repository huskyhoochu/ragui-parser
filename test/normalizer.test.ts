import Normalizer from '../src/normalizer';

describe('Test Normalize', () => {
  test('It should add newline', () => {
    const string = '안녕하세요\n반갑습니다';
    const normalizer = new Normalizer(string);

    expect(normalizer.getNormalized()).toBe(string + '\n');
  });

  test('It should remove carriage return', () => {
    const string = '안녕하세요\r\n';
    const normalizer = new Normalizer(string);

    expect(normalizer.getNormalized()).toBe('안녕하세요\n');
  });

  test('It should remove too many newline', () => {
    const string = '안녕하세요\n\n';
    const normalizer = new Normalizer(string);

    expect(normalizer.getNormalized()).toBe('안녕하세요\n');
  });
});
