export const DateToddmmyyyyFormat = (date: Date) => {
  const year = date.getFullYear();
  const month = (1 + date.getMonth()).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${day}/${month}/${year}`;
  // }
};

const addZero = (i: number) => {
  return i < 10 ? '0' + i : i;
};

export const DateToHHmmFormat = (date: Date) => {
  const h = addZero(date.getHours());
  const m = addZero(date.getMinutes());

  return `${h}:${m}`;
};

export const extractNumberBeforeAns = (inputString: string) => {
  const regex = /(\d+)\s+ans/;
  const match = inputString.match(regex);
  if (match != null && match[1]) {
    return parseInt(match[1]);
  } else {
    return null;
  }
};

export const thousandSeparator = (value: string, separator: string) => {
  value = '' + value;
  separator = separator || ' ';
  let result = '';
  let temp = 0;
  while (value.match(/^0[0-9]/) != null) {
    value = value.substr(1);
  }
  for (let i = value.length - 1; i >= 0; i--) {
    result =
      temp !== 0 && temp % 3 === 0
        ? value[i] + separator + result
        : value[i] + result;
    temp++;
  }
  return result;
};

export const removeProtocolFromString = (str: string) => {
  if (str.startsWith('https://')) {
    return str.slice(8);
  } else if (str.startsWith('http://')) {
    return str.slice(7);
  } else {
    return str;
  }
};

export const generateRandomFileName = () => {
  const now = new Date();
  const randomNumber = Math.floor(Math.random() * 1000);
  const fileName = `file_${now.getFullYear()}${now.getMonth()}${now.getDate()}${now.getHours()}${now.getMinutes()}${now.getSeconds()}${randomNumber}`;
  return fileName;
};

export const dateDdMmYyToMmDdYy = (value: string, separator: string) => {
  const dateArray = value.split(separator);
  let result = '';
  if (dateArray[1]) {
    result = dateArray[1] + separator + dateArray[0] + separator + dateArray[2];
  }
  return result;
};

export const stringToDate = (date: string) => {
  const dateParts = date.split('/');
  const result = new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0]);

  return result;
};
export const stringHourToDate = (date: string) => {
  const dateParts = date.split(':');
  const result = new Date();
  // result.setDate(result.getDate() -1);
  result.setHours(+dateParts[0], +dateParts[1], 0);
  return result;
};

export const getAcronym = (name: string) => {
  const words = name.split(' ');
  const acronym = words.map((word) => word.charAt(0).toUpperCase()).join('');
  return acronym;
};

export const uniqByKeepFirst = (a, key) => {
  const seen = new Set();
  return a.filter((item) => {
    const k = key(item);
    return seen.has(k) ? false : seen.add(k);
  });
};
