import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import toRomanNumerals from '../toRomanNumerals';

describe('Convert to roman numerals in Vinculum System', () => {
  it('convert 1 to "I"', () => {
    expect(toRomanNumerals(1, 'Vinculum')).toBe('I');
  });

  it('convert 15 to "XV"', () => {
    expect(toRomanNumerals(15, 'Vinculum')).toBe('XV');
  });

  it('convert 3999 to "XV"', () => {
    expect(toRomanNumerals(3999, 'Vinculum')).toBe('MMM CMXCIX');
  });

  it('convert 6234 to "VI CCXXXIV"', () => {
    const result = toRomanNumerals(6234, 'Vinculum');

    const { container } = render(result);

    // Define expected order and classes
    const expectedElements = [
      { text: 'VI', class: 'top-line' },
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

  it('convert 623429384 to "DCXXMMM CDXXIX CCCLXXXIV"', () => {
    const result = toRomanNumerals(623429384, 'Vinculum');

    const { container } = render(result);

    // Define expected order and classes
    const expectedElements = [
      { text: 'DC', class: 'top-line-double' },
      { text: 'XX', class: 'top-line-double' },
      { text: 'MMM', class: 'top-line-double' },
      { text: 'CD', class: 'top-line' },
      { text: 'XX', class: 'top-line' },
      { text: 'IX', class: 'top-line' },
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
