const { shuffle } = require('../script');

describe('shuffle', () => {
  test('returns all elements and maintains length', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = shuffle([...arr]);
    expect(result).toHaveLength(arr.length);
    arr.forEach(el => {
      expect(result).toContain(el);
    });
  });
});
