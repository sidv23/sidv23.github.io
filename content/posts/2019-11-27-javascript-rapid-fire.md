---
template: post
title: Javascript Rapid Fire
slug: javascript-rapid-fire
draft: true
date: '2019-11-27T12:00:00.000Z'
description: >
  Here is a collection of some core javascript question answers which can be used a rapid fire round in an interview...
category: CSS-Tricks
tags:
  - Javascript
---

false.toString(); // 'false'
2.toString(); // raises SyntaxError

typeof NaN; // “number”
NaN == “number”; // false
NaN == number; // false
NaN === NaN; // false

Number(); // returns 0
Number(undefined); // returns NaN

[1, 2, 3] + [4, 5, 6]; //  "1,2,34,5,6"

null < 0  // false
null == 0 // false
null <= 0 // true

To create a pure object with no prototype, we have to write:
let obj = Object.create(null);

void operator always returns undefined
void 0 // undefined
void ('abc') // undefined
void {} // undefined

We can change a new value to undefined
undefined = "not-defined"

+ Plus operator to quickly convert a string to a number.
+'-4' // returns -4
+'0xFF' // returns 255
+true // returns 1
+false //returns 0
+'1,234' //returns NaN

{name: "Ayush"} == {name: "Ayush"} // returns false

const obj = { a: "one", b: "two", a: "three" }; // obj = { a: "three", b: "two" }

```js
const foo = () => console.log("First");
const bar = () => setTimeout(() => console.log("Second"));
const baz = () => console.log("Third");

bar();
foo();
baz();

// First Third Second
```

call is like bind with immediate execution.
bind just returns a copy of the function along with bounded context.

new Number(0) // returns true
new Boolean(false) // returns true

typeof typeof 1 // string

```js
const numbers = [1, 2, 3];
numbers[10] = 11;
console.log(numbers);
// [1, 2, 3, 7 x empty, 11]
```

console.log(3 + 4 + "5"); // "75"
parseInt("7*6", 10); // 7

console.log(!!{}); //logs true
console.log(!![]); //logs true
console.log(!!NaN); //logs false
console.log(!!''); //logs false

```js
const one = (false || {} || null)
const two = (null || false || "")
const three = ([] || 0 || true)

console.log(one, two, three)
// {} "" []
```
With the || operator, we can return the first truthy operand. If all values are falsy, the last operand gets returned.

Primitive data types interact by value and non-primitive data types such as objects interact by reference.