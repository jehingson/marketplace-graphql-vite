// passwordOptions contains all necessary string data needed to generate the password
const passwordOptions = {
  numbers: '1234567890',
  symbols: "!@#$%&'()*+,^-./:;<=>?[]_`{~}|",
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
};

const generatePassword = ({
  length,
  numbers = true,
  symbols = true,
  lowercase = true,
  uppercase = true,
}: {
  length: number;
  numbers?: boolean;
  symbols?: boolean;
  lowercase?: boolean;
  uppercase?: boolean;
}) => {
  let passInfo = '';
  const passChars = [];

  if (numbers) {
    passInfo += passwordOptions.numbers;
    passChars.push(getRandomChar(passwordOptions.numbers));
  }

  if (symbols) {
    passInfo += passwordOptions.symbols;
    passChars.push(getRandomChar(passwordOptions.symbols));
  }

  if (lowercase) {
    passInfo += passwordOptions.lowercase;
    passChars.push(getRandomChar(passwordOptions.lowercase));
  }

  if (uppercase) {
    passInfo += passwordOptions.uppercase;
    passChars.push(getRandomChar(passwordOptions.uppercase));
  }

  while (passChars.length < length) {
    passChars.push(getRandomChar(passInfo));
  }

  // shuffle the list of characters using Fisher-Yates algorithm
  for (let i = passChars.length - 1; i > 0; i--) {
    const swapIndex = randRange(i + 1);
    const temp: string = passChars[i];
    passChars[i] = passChars[swapIndex];
    passChars[swapIndex] = temp;
  }

  // return the password character list concatenated to a string
  return passChars.join('');
};

function getRandomChar(fromString: string) {
  return fromString[randRange(fromString.length)];
}

// Generate a random integer r with equal chance in  0 <= r < max.
function randRange(max: number) {
  const requestBytes = Math.ceil(Math.log2(max) / 8);
  if (!requestBytes) {
    return 0;
  }
  const maxNum = Math.pow(256, requestBytes);
  const ar = new Uint8Array(requestBytes);

  for (;;) {
    window.crypto.getRandomValues(ar);

    let val = 0;
    for (let i = 0; i < requestBytes; i++) {
      val = (val << 8) + ar[i];
    }

    if (val < maxNum - (maxNum % max)) {
      return val % max;
    }
  }
}

export default generatePassword;
