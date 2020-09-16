// Задание номер 1

const range = (n) => {
  let arr = new Array(n);
  for (let i = 0; i < n; i++) {
    arr[i] = i;
  }
      return arr;
};

let array = range(6);

console.log(array);


// Задание номер 2

const evenlyDivide = (a, b, c) => {
  if (a % b == 0 && a % c == 0) return true;
  return false;
};

console.log(evenlyDivide(45, 1, -5));
console.log(evenlyDivide(45, 1, 6));

// Задание номер 3

const capitalize = (str) => {
  if (typeof(str) != 'string') return 'Invalid variable';
  if (str.length < 2 || str.length > 10) return 'The length of variable should be less than 10 but bigger than 2';
  let newStr = str[0].toUpperCase() + str.slice(1);
  return newStr;
};

console.log(capitalize('myname'))

