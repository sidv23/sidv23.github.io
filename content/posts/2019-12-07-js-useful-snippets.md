---
template: post
title: Javascript Useful Snippets
slug: js-useful-snippets
draft: true
date: '2019-12-07T12:00:00.000Z'
description: >
  Here is a collection of some useful JavaScript snippets.
category: Programming
tags:
  - Javascript
---

1. Get the n smallest elements from a list.
```js
const minN = (arr, n = 1) => [...arr].sort((a, b) => a - b).slice(0, n);

minN([1, 2, 3]); // [1]
minN([1, 2, 3], 2); // [1,2]
```

2. Get n largest elements from a list
It returns the list in descending order
```js
const maxN = (arr, n = 1) => [...arr].sort((a, b) => b - a).slice(0, n);

maxN([1, 2, 3]); // [3]
maxN([1, 2, 3], 2); // [3,2]
```

3. Radians To Degrees

```js
const radsToDegrees = rad => (rad * 180.0) / Math.PI;

radsToDegrees(Math.PI / 2); // 90
```

3. Degrees to Radian

```js
const degreesToRads = deg => (deg * Math.PI) / 180.0;

degreesToRads(90.0); // ~1.5708
```

4. Random Hexadecimal Color Code

```js
const randomHexColorCode = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
};

randomHexColorCode(); // "#e34155"
```
4. Random integer in a specific range

```js
const randomIntegerInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

randomIntegerInRange(0, 5); // 3
```
5. Read File Lines

Read a file by getting an array of lines from a file.
```js
const fs = require('fs');
const readFileLines = filename =>
  fs
    .readFileSync(filename)
    .toString('UTF8')
    .split('\n');

let arr = readFileLines('test.txt');
console.log(arr); // ['line1', 'line2', 'line3']
```
6. Reverse a string

```js
const reverseString = str => [...str].reverse().join('');

reverseString('foobar'); // 'raboof'
```

7. Round a number to specified digits
```js
const round = (n, decimals = 0) => Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`);

round(1.005, 2); // 1.01
```

8. Run an array of promises in series

```js
const runPromisesInSeries = ps => ps.reduce((p, next) => p.then(next), Promise.resolve());
const delay = d => new Promise(r => setTimeout(r, d));

runPromisesInSeries([() => delay(1000), () => delay(2000)]); 
// Executes each promise sequentially, taking a total of 3 seconds to complete
```

9. Smooth scroll to the top of current page

```js
const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
};

scrollToTop();
```

10. Smooth scroll an element into visible area

```js
const smoothScroll = element =>
  document.querySelector(element).scrollIntoView({
    behavior: 'smooth'
  });
  
smoothScroll('#fooBar'); // scrolls smoothly to the element with the id fooBar
smoothScroll('.fooBar'); // scrolls smoothly to the first element with a class of fooBar
```
11. Shuffle the elements of array randomly

```js
const shuffle = ([...arr]) => {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr;
};

const foo = [1, 2, 3];
shuffle(foo); // [2, 3, 1], foo = [1, 2, 3]
```

12. Similar elements from two arrays

```js
const similarity = (arr, values) => arr.filter(v => values.includes(v));

similarity([1, 2, 3], [1, 2, 4]); // [1, 2]
```

13. Sort characters of a string alphabetically

```js
const sortCharactersInString = str => [...str].sort((a, b) => a.localeCompare(b)).join('');

sortCharactersInString('cabbage'); // 'aabbceg'
```

14. Unique Elements

```js
const uniqueElements = arr => [...new Set(arr)];

uniqueElements([1, 2, 2, 3, 4, 4, 5]); // [1, 2, 3, 4, 5]
```

15. Union

```js
const union = (a, b) => Array.from(new Set([...a, ...b]));

union([1, 2, 3], [4, 3, 2]); // [1,2,3,4]
```
16. Validate Number

```js
const validateNumber = n => !isNaN(parseFloat(n)) && isFinite(n) && Number(n) == n;

validateNumber('10'); // true
```

17. Converting strings into array of words

```js
const words = (str, pattern = /[^a-zA-Z-]+/) => str.split(pattern).filter(Boolean);

words('I love javaScript!!'); // ["I", "love", "javaScript"]
words('python, javaScript & coffee'); // ["python", "javaScript", "coffee"]
```

18. Is the bottom of page visible

```js
const bottomVisible = () =>
  document.documentElement.clientHeight + window.scrollY >=
  (document.documentElement.scrollHeight || document.documentElement.clientHeight);

bottomVisible(); // true
```

19. Capitalize first letter

```js
const capitalize = ([first, ...rest]) =>
  first.toUpperCase() + rest.join('');
  
capitalize('fooBar'); // 'FooBar'
capitalize('fooBar', true); // 'FooBar'
```
20. Decapitalize first letter

```js
const decapitalize = ([first, ...rest]) =>
  first.toLowerCase() + rest.join('')

decapitalize('FooBar'); // 'fooBar'
decapitalize('FooBar'); // 'fooBar'
```

22. Capitalize first letter of every word

```js
const capitalizeEveryWord = str => str.replace(/\b[a-z]/g, char => char.toUpperCase());

capitalizeEveryWord('hello world!'); // 'Hello World!'
```
23. Clean up falsy values

```js
const compact = arr => arr.filter(Boolean);

compact([0, 1, false, 2, '', 3, 'a', 'e' * 23, NaN, 's', 34]); 
// [ 1, 2, 3, 'a', 's', 34 ]
```

24. Count Occurences of a particular value in an array

```js
const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
countOccurrences([1, 1, 2, 1, 2, 3], 1); // 3
```
25. Day of the year

```js
const dayOfYear = date =>
  Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);

dayOfYear(new Date()); // 272
```
26. Deep Flatten an array

```js
const deepFlatten = arr => [].concat(...arr.map(v => (Array.isArray(v) ? deepFlatten(v) : v)));

deepFlatten([1, [2], [[3], 4], 5]); // [1,2,3,4,5]
```

27. Difference between two arrays

```js
const difference = (a, b) => {
  const s = new Set(b);
  return a.filter(x => !s.has(x));
};

difference([1, 2, 3], [1, 2, 4]); // [3]
```
28. Array of digits from a number

```js
const digitize = n => [...`${n}`].map(i => parseInt(i));

digitize(431); // [4, 3, 1]
```
29. Drop n Elements from left

```js
const drop = (arr, n = 1) => arr.slice(n);

drop([1, 2, 3]); // [2,3]
drop([1, 2, 3], 2); // [3]
drop([1, 2, 3], 42); // []
```
30. Drop n Elements from Right

```js
const dropRight = (arr, n = 1) => arr.slice(0, -n);

dropRight([1, 2, 3]); // [1,2]
dropRight([1, 2, 3], 2); // [1]
dropRight([1, 2, 3], 42); // []
```
31. Checks whether the parent element contains the child

```js
const elementContains = (parent, child) => parent !== child && parent.contains(child);

elementContains(document.querySelector('head'), document.querySelector('title')); // true
elementContains(document.querySelector('body'), document.querySelector('body')); // false
```

32. Filter Duplicate Elements

```js
const filterNonUnique = arr => [ …new Set(arr)];
filterNonUnique([1, 2, 2, 3, 4, 4, 5]); // [1, 2, 3, 4, 5]
```
33. Get time from Date object as a string

```js
const getColonTimeFromDate = date => date.toTimeString().slice(0, 8);

getColonTimeFromDate(new Date()); // "08:38:00"
```
34. Difference in days between two dates
```js
const getDaysDiffBetweenDates = (dateInitial, dateFinal) =>
  (dateFinal - dateInitial) / (1000 * 3600 * 24);
  
getDaysDiffBetweenDates(new Date('2019-01-13'), new Date('2019-01-15')); // 2
```

35. Get the type of value

```js
const getType = v =>
  v === undefined ? 'undefined' : v === null ? 'null' : v.constructor.name.toLowerCase();
  
getType(new Set([1, 2, 3])); // 'set'
```

36. Get all indexes of a value in an array

```js
const indexOfAll = (arr, val) => arr.reduce((acc, el, i) => (el === val ? [...acc, i] : acc), []);

indexOfAll([1, 2, 3, 1, 2, 3], 1); // [0,3]
indexOfAll([1, 2, 3], 4); // []
```

37. Intersection - Get elements that are present in both the arrays

```js
const intersection = (a, b) => {
  const s = new Set(b);
  return a.filter(x => s.has(x));
};

intersection([1, 2, 3], [4, 3, 2]); // [2, 3]
```

38. To check if a value is of particular type

```js
const is = (type, val) => ![, null].includes(val) && val.constructor === type;

is(Array, [1]); // true
is(ArrayBuffer, new ArrayBuffer()); // true
is(Map, new Map()); // true
is(RegExp, /./g); // true
is(Set, new Set()); // true
is(WeakMap, new WeakMap()); // true
is(WeakSet, new WeakSet()); // true
is(String, ''); // true
is(String, new String('')); // true
is(Number, 1); // true
is(Number, new Number(1)); // true
is(Boolean, true); // true
is(Boolean, new Boolean(true)); // true
```

39. Check if it is a browser

```js
const isBrowser = () => ![typeof window, typeof document].includes('undefined');

isBrowser(); // true (browser)
isBrowser(); // false (Node)
```

40. Check if browser tab is focussed

```js
const isBrowserTabFocused = () => !document.hidden;

isBrowserTabFocused(); // true
```

41. Check if the value is number

```js
function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

isNumber('1'); // false
isNumber(1); // true
```
