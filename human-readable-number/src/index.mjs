const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];

const toReadable = (number) => {
  if (number === 0) {
    return 'zero';
  }

  return convertNumber(number);
}

const convertNumber = (number) => {
  if (number >= 100) {
    return `${ones[Math.floor(number / 100)]} hundred ${convertNumber(number % 100)}`.trim();
  }

  if (number <= 9) {
    return ones[number];
  }

  if (number <= 19) {
    return teens[number - 10];
  }

  const tensValue = Math.floor(number / 10);
  const units = number % 10;

  return `${tens[tensValue]} ${ones[units]}`.trim();
};

export { toReadable };
