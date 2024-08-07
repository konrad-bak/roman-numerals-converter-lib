import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import toRomanNumerals from '../toRomanNumerals';

describe('Convert to roman numerals in Vinculum System', () => {
  describe(`Don't Use pureString setting`, () => {
    it('convert 1 to "I"', () => {
      expect(toRomanNumerals(1, 'Vinculum', false)).toBe('I');
    });

    it('convert 15 to "XV"', () => {
      expect(toRomanNumerals(15, 'Vinculum', false)).toBe('XV');
    });

    it('convert 3999 to "MMM CMXCIX"', () => {
      expect(toRomanNumerals(3999, 'Vinculum', false)).toBe('MMM CMXCIX');
    });

    it('convert 6234 to "V̅I̅ CCXXXIV"', () => {
      const result = toRomanNumerals(6234, 'Vinculum', false);

      const { container } = render(result);

      // Define expected order and classes
      const expectedElements = [
        { text: 'VI', class: 'romanNumerals-vinculum-top-line' },
        { text: 'CCXXXIV', class: null }, // Plain text without a span
      ];

      // Get all span elements in the container
      const spanElements = Array.from(container.querySelectorAll('span'));

      // Check each span and text node in order
      expectedElements.forEach((expected, index) => {
        if (expected.class) {
          // Check if the span has the correct text and class
          const span = spanElements[index];
          expect(span.textContent).toBe(expected.text);
          expect(span.className).toBe(expected.class);
        } else {
          // Check if plain text matches the expected text
          const textNodes = Array.from(container.childNodes).filter(
            (node) => node.nodeType === Node.TEXT_NODE,
          );
          const lastTextNode = textNodes[textNodes.length - 1];
          expect(lastTextNode.textContent?.trim()).toBe(expected.text);
        }
      });
    });

    it('convert 623429384 to "D̿C̿X̿X̿M̿M̿M̿ C̅D̅X̅X̅I̅X̅ CCCLXXXIV"', () => {
      const result = toRomanNumerals(623429384, 'Vinculum', false);

      const { container } = render(result);

      // Define expected order and classes
      const expectedElements = [
        { text: 'DC', class: 'romanNumerals-vinculum-top-line-double' },
        { text: 'XX', class: 'romanNumerals-vinculum-top-line-double' },
        { text: 'MMM', class: 'romanNumerals-vinculum-top-line-double' },
        { text: 'CD', class: 'romanNumerals-vinculum-top-line' },
        { text: 'XX', class: 'romanNumerals-vinculum-top-line' },
        { text: 'IX', class: 'romanNumerals-vinculum-top-line' },
        { text: 'CCCLXXXIV', class: null }, // Plain text without a span
      ];

      // Get all span elements in the container
      const spanElements = Array.from(container.querySelectorAll('span'));

      // Check each span and text node in order
      expectedElements.forEach((expected, index) => {
        if (expected.class) {
          // Check if the span has the correct text and class
          const span = spanElements[index];
          expect(span.textContent).toBe(expected.text);
          expect(span.className).toBe(expected.class);
        } else {
          // Check if plain text matches the expected text
          const textNodes = Array.from(container.childNodes).filter(
            (node) => node.nodeType === Node.TEXT_NODE,
          );
          const lastTextNode = textNodes[textNodes.length - 1];
          expect(lastTextNode.textContent?.trim()).toBe(expected.text);
        }
      });
    });
  });

  describe('Use pureString setting', () => {
    it('convert 1 to "I"', () => {
      expect(toRomanNumerals(1, 'Vinculum', true)).toBe('I');
    });

    it('convert 15 to "XV"', () => {
      expect(toRomanNumerals(15, 'Vinculum', true)).toBe('XV');
    });

    it('convert 3999 to "MMM CMXCIX"', () => {
      expect(toRomanNumerals(3999, 'Vinculum', true)).toBe('MMM CMXCIX');
    });

    it('convert 6234 to "V̅I̅ CCXXXIV"', () => {
      expect(toRomanNumerals(6234, 'Vinculum', true)).toBe('V̅I̅ CCXXXIV');
    });

    it('convert 623429384 to "D̿C̿X̿X̿M̿M̿M̿ C̅D̅X̅X̅I̅X̅ CCCLXXXIV"', () => {
      expect(toRomanNumerals(623429384, 'Vinculum', true)).toBe(
        'D̿C̿X̿X̿M̿M̿M̿ C̅D̅X̅X̅I̅X̅ CCCLXXXIV',
      );
    });
  });
});
describe('Convert to roman numerals in Apostrophus System', () => {
  it('convert 1 to "I"', () => {
    expect(toRomanNumerals(1, 'Apostrophus')).toBe('I');
  });

  it('convert 15 to "XV"', () => {
    expect(toRomanNumerals(15, 'Apostrophus')).toBe('XV');
  });

  it('convert 3999 to "XV"', () => {
    expect(toRomanNumerals(3999, 'Apostrophus')).toBe('MMM CMXCIX');
  });

  it('convert 6234 to "ↁↀ  CCXXXIV"', () => {
    expect(toRomanNumerals(6234, 'Apostrophus')).toBe('ↁↀ  CCXXXIV');
  });

  it('convert 623429384 to "IↃↃↃↃↃↃↃCCCCCCIↃↃↃↃↃↃ CCCCCIↃↃↃↃↃCCCCCIↃↃↃↃↃ CCCCIↃↃↃↃCCCCIↃↃↃↃCCCCIↃↃↃↃ CCCIↃↃↃIↃↃↃↃ ↂↂ ↀↂ  CCCLXXXIV"', () => {
    expect(toRomanNumerals(623429384, 'Apostrophus')).toBe(
      'IↃↃↃↃↃↃↃCCCCCCIↃↃↃↃↃↃ CCCCCIↃↃↃↃↃCCCCCIↃↃↃↃↃ CCCCIↃↃↃↃCCCCIↃↃↃↃCCCCIↃↃↃↃ CCCIↃↃↃIↃↃↃↃ ↂↂ ↀↂ  CCCLXXXIV',
    );
  });
});
