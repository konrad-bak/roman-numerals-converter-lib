/**
 * Used in 3 parent functions:
 * - {@link processSmallNumber}
 * - {@link processLargeNumberVinculum}
 * - {@link processLargeNumberApostrophus}
 *
 * Takes ```currNumber``` and three params representing roman numerals for "single", "half" and "ten", then returns a roman representation of arabic numeral from ```currNumber```.
 * @param {number} currNumber - single arabic numeral to convert (ex. 5)
 * @param {string} currSingularChar - roman numeral representing "single" (ex. "I")
 * @param {string} currHalfChar - roman numeral representing "half" (ex. "V")
 * @param {string} currTenChar - roman numeral representing "ten" (ex. "X")
 * @returns {string} a roman representation of arabic numeral (ex. "V" for 5)
 */
const individualRomanCharConverter = (
  currNumber: number,
  currSingularChar: string,
  currHalfChar: string,
  currTenChar: string,
): string => {
  let resultString = '';

  const romanNumerals: { [key: number]: string } = {
    0: '',
    1: currSingularChar,
    2: currSingularChar.repeat(2),
    3: currSingularChar.repeat(3),
    4: currSingularChar + currHalfChar,
    5: currHalfChar,
    6: currHalfChar + currSingularChar,
    7: currHalfChar + currSingularChar.repeat(2),
    8: currHalfChar + currSingularChar.repeat(3),
    9: currSingularChar + currTenChar,
  };

  resultString = romanNumerals[currNumber] ?? '';

  if (resultString === '') {
    console.error('Error on first number');
  }

  return resultString;
};

export default individualRomanCharConverter;
