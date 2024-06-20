import individualRomanCharConverter from './individualRomanCharConverter';

const MAX_SMALL_NUMBER = 3999;
const MAX_NUMBER = 3999999999;
const TOO_BIG_MESSAGE = 'Too big (over 3,999,999,999)';

export type SystemTypes = 'Vinculum' | 'Apostrophus';

/**
 * Used in two parent functions {@link processSmallNumber} and {@link processLargeNumberVinculum}
 *
 * Takes ```position``` (```currNumber``` position in the parent function) and returns an array of roman characters.
 * @param {number} position - a reverse position of the ```currNumber``` param in the original arabic number input (ex. 1)
 * @returns {[string, string, string]} array of characters in Apostrophus system (ex. ['X', 'L', 'C'])
 */
const getRomanCharacters = (position: number): [string, string, string] => {
  switch (position) {
    case 0:
      return ['I', 'V', 'X'];
    case 1:
      return ['X', 'L', 'C'];
    case 2:
      return ['C', 'D', 'M'];
    default:
      return ['', '', ''];
  }
};

/**
 * Used in Apostrofus function {@link processLargeNumberApostrophus}
 *
 * Takes ```multiplier``` (which is calculated from ```currNumber``` position in the parent function) and returns an array of characters.
 * @param {number} multiplier - a number indicating current multiplier (ex. 2)
 * @returns {[string, string, string]} array of characters in Apostrophus system (ex. ['ↂ', 'ↇ', 'ↈ'])
 */
const getApostrophusCharacters = (multiplier: number): [string, string, string] => {
  if (multiplier === 1) return ['ↀ', 'ↁ', 'ↂ'];
  if (multiplier === 2) return ['ↂ', 'ↇ', 'ↈ'];

  return [
    'C'.repeat(multiplier) + 'I' + 'Ↄ'.repeat(multiplier),
    'I' + 'Ↄ'.repeat(multiplier + 1),
    'C'.repeat(multiplier + 1) + 'I' + 'Ↄ'.repeat(multiplier + 1),
  ];
};

/**
 * Used in main function {@link toRomanNumerals}
 *
 * For numbers 999 and below, takes current single arabic numeral(```currNumber```), its ```position``` in the whole number
 * and the current state of result roman conversion(```resultString```),
 * then adds converted numeral to the roman result (in Vinculum system).
 * @param {number} currNumber - single arabic numeral to convert (ex. 5)
 * @param {number} position - reverse position of the ```currNumber``` param in the original arabic number input (ex. 1)
 * @param {string | React.ReactElement} resultString - current state of converted roman numeral (ex. "I")
 * @returns {string | React.ReactElement} updated state of converted roman numeral (ex. "LI" from 51)
 */
const processSmallNumber = (
  currNumber: number,
  position: number,
  resultString: string | React.ReactElement,
): string => {
  const [singular, half, ten] = getRomanCharacters(position);
  const currRomanChars = individualRomanCharConverter(currNumber, singular, half, ten);
  return currRomanChars + resultString;
};

/**
 * Used in main function {@link toRomanNumerals}
 *
 * For numbers above 3999, takes current single arabic numeral(```currNumber```), its position in the whole number
 * and the current state of result roman conversion(```resultString```),
 * then adds converted numeral to the roman result (in Vinculum system).
 * @param {number} currNumber - single arabic numeral to convert (ex. 5)
 * @param {number} position - reverse position of the ```currNumber``` param in the original arabic number input (ex. 3)
 * @param {string | React.ReactElement} resultString - current state of converted roman numeral (ex. "DLV")
 * @returns {string | React.ReactElement} updated state of converted roman numeral (ex. "\<span className='top-line'\>V\</span\>DLV" from 5555)
 */
const processLargeNumberVinculum = (
  currNumber: number,
  position: number,
  resultString: string | React.ReactElement,
): React.ReactElement => {
  let singular, half, ten;
  if ((position === 6 || position === 9) && currNumber < 4) {
    singular = 'M';
    [half, ten] = getRomanCharacters(position % 3);
  } else {
    [singular, half, ten] = getRomanCharacters(position % 3);
  }
  const lineClass = position >= 6 ? 'top-line-double' : 'top-line';
  const currRomanChars = individualRomanCharConverter(currNumber, singular, half, ten);

  return (
    <>
      <span className={lineClass}>{currRomanChars}</span>
      {resultString}
    </>
  );
};

/**
 * Used in main function {@link toRomanNumerals}
 *
 * For numbers above 3999, takes current single arabic numeral(```currNumber```), its position in the whole number
 * and the current state of result roman conversion(```resultString```),
 * then adds converted numeral to the roman result (in Apostrophus system).
 * @param {number} currNumber - single arabic numeral to convert (ex. 5)
 * @param {number} position - reverse position of the ```currNumber``` param in the original arabic number input (ex. 3)
 * @param {string | React.ReactElement} resultString - current state of converted roman numeral (ex. "DLV")
 * @returns {string | React.ReactElement} updated state of converted roman numeral (ex. "ↁ DLV" from 5555)
 */
const processLargeNumberApostrophus = (
  currNumber: number,
  position: number,
  resultString: string | React.ReactElement,
): string => {
  const multiplier = position - 2;
  const [singular, half, ten] = getApostrophusCharacters(multiplier);
  const currRomanChars = individualRomanCharConverter(currNumber, singular, half, ten);

  return currRomanChars + ' ' + resultString;
};

/**
 * Takes arabic numerals and converts them to roman numerals.
 * @param {number} input - arabic numeral number to convert (ex. 1234)
 * @param {SystemTypes} system - roman numerals system in which we desire a return (ex. "Vinculum")
 * @returns {string | React.ReactElement} roman numeral number (ex. "MCCXXXIV")
 *
 *
 * @example
 * // returns "ↁ DLV"
 * toRomanNumerals(5555, "Apostrophus");
 *
 * @author Konrad Bąk https://github.com/konrad-bak
 */
const toRomanNumerals = (
  input: number,
  system: SystemTypes,
): string | React.ReactElement => {
  if (input > MAX_NUMBER) return <span className="red">{TOO_BIG_MESSAGE}</span>;

  const numbersArr = input.toString().split('');
  const arrLength = numbersArr.length;
  const isLarge = input > MAX_SMALL_NUMBER;

  let resultString: string | React.ReactElement = '';

  for (let i = 0; i < arrLength; i++) {
    const currArrPos = arrLength - 1 - i;
    const currNumber = parseInt(numbersArr[currArrPos]);
    if (currNumber === 0) continue;

    if (i <= 2) {
      resultString = processSmallNumber(currNumber, i, resultString);
    } else if (!isLarge) {
      if (i === 3) resultString = 'M'.repeat(currNumber) + ' ' + resultString;
    } else {
      if (i === 3) resultString = ' ' + resultString;

      if (system === 'Vinculum') {
        resultString = processLargeNumberVinculum(currNumber, i, resultString);
      } else {
        resultString = processLargeNumberApostrophus(currNumber, i, resultString);
      }
    }
  }

  return resultString;
};

export default toRomanNumerals;
