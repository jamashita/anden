import { URL } from '../URL.js';
import { URLError } from '../URLError.js';

describe('URL', () => {
  describe('of', () => {
    it('returns instance', () => {
      const str: string = 'https://www.example.com';

      expect(URL.of(str).get()).toBe(str);
    });

    it('throws URLError when the argument is not satisfied URL format', () => {
      expect(() => {
        URL.of('cinq');
      }).toThrow(URLError);
    });
  });

  describe('validate', () => {
    it('returns true if given string is not violated to uuid format', () => {
      const url: string = 'https://www.example.com';

      expect(URL.validate(url)).toBe(true);
    });

    it('returns false if given string is violated to uuid format', () => {
      const url: string = 'cinq';

      expect(URL.validate(url)).toBe(false);
    });
  });

  describe('toString', () => {
    it('returns the original string', () => {
      const str: string = 'https://www.example.com';
      const url: URL = URL.of(str);

      expect(url.toString()).toBe(str);
    });
  });
});
