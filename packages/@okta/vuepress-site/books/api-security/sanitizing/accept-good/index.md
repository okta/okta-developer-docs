---
title: Accept Known Good - Sanitizing Data
---

<div style="font-size: 0.9em; margin-bottom: -20px;"><a href="/books/api-security/sanitizing/">&larr; Sanitizing Data</a></div>

## Accept Known Good {#sanitizing-accept-good}

The known good strategy is often the easiest and most foolproof of the given options. With this approach each input is validated against an expected type and format:

* Data type, (Integers are Integers, booleans are booleans, etc)
* Numeric values fall within an expected range (for example: a person's age is always greater than 0 and less than 150)
* Field length is checked
* Specially formatted string fields such as zipcode, phone number, and social security number are valid

Most web frameworks have some type of declarative support to validate input fields built in. For example,  in the Node.js world you can use the popular `validator` package to validate different types of input:

```js
import validator from 'validator';
validator.isEmail('foobar@example.com');
```
