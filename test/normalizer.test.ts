import Normalizer from '../src/normalizer';

describe('Test Normalize', () => {
  test('It should add newline', () => {
    const string = '안녕하세요\n반갑습니다';
    const normalizer = new Normalizer(string);
    expect(normalizer.get()).toStrictEqual(['안녕하세요', '반갑습니다']);
  });

  test('It should remove carriage return', () => {
    const string = '안녕하세요\r\n';
    const normalizer = new Normalizer(string);
    expect(normalizer.get()).toStrictEqual(['안녕하세요', '']);
  });

  test('It should remove too many newline', () => {
    const string = '안녕하세요\n\n';
    const normalizer = new Normalizer(string);
    expect(normalizer.get()).toStrictEqual(['안녕하세요', '']);
  });

  test('It should save inter newline', () => {
    const string = '안녕하세요\n\n반갑습니다\n';
    const normalizer = new Normalizer(string);
    expect(normalizer.get()).toStrictEqual([
      '안녕하세요',
      '',
      '반갑습니다',
      '',
    ]);
  });

  test('It should check shouldUpdate', () => {
    const prev = '안녕하세요\n';
    const next = '안녕히가세요\n';

    const normalizer = new Normalizer(prev);
    expect(normalizer.shouldUpdate(next)).toBeTruthy();
    expect(normalizer.shouldUpdate(prev)).toBeFalsy();
  });

  test('It should make updateNext', () => {
    const prev = '안녕하세요\n';
    const next = '안녕히가세요\n';

    const normalizer = new Normalizer(prev);
    if (normalizer.shouldUpdate(next)) {
      normalizer.updateNext();
    }

    expect(normalizer.get()).toStrictEqual(['안녕히가세요', '']);
  });
});
