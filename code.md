# Code Guide for Okta

## Table of contents

- [Golden rule](#golden-rule)
- [Common settings](#common-settings)
- [HTML](#html)
- [Vue](#vue)
- [CSS](#css)
- [Sass / SCSS](#sass--scss)

## Golden rule

> Every line of code should appear to be written by a single person, no matter the number of contributors.

The main rule that guided us in creating the guide was readability and uniformity. First of all, the code must be readable.

We do not reduce the color values. We do not omit the first zero in fractional values.

We argued about abbreviations for a long time inside the team, and the arguments of the defenders of abbreviations boiled down to one thing — it's faster to write this way. But I think that if you want to speed up code typing, then you need to use special tools: ``Emmet`` for quick code typing or autocompletion in editors. And the reduction should be handled by robots. Don't take their jobs away from them, they weren't created for this.

## Common settings

### EditorConfig

```
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
end_of_line = lf
trim_trailing_whitespace = true
insert_final_newline = true
```

### Case styles in Programming

#### We have 4 case styles:

1. **Camel case** (e.g. camel_case)
2. **Snake case** & **Capitalized Snake Case** (e.g. snake_case & SNAKE_CASE)
3. **Kebab case** (e.g. kebab-case)
4. **Pascal case** (e.g. PascalCase)

#### Rules

1. **Pascal case** is used for component names and file names in **Vue**
2. For other **files** (SCSS, native JS etc), **directories** we use **snake case**
3. For javascript we use: **camel case** for variables and methods. **pascal case** for types and classes in JavaScript. **Upper case snake** case for constants.

### Protocol

Use HTTPS for embedded resources where possible.

Always use HTTPS (``https:``) for images and other media files, style sheets, and scripts, unless the respective files are not available over HTTPS.

#### Example

```html
<!-- Good -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>

<!-- Bad -->
<script src="//ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
```

```css
/* Good */
@import "https://fonts.googleapis.com/css?family=Open+Sans";

/* Bad */
@import "//fonts.googleapis.com/css?family=Open+Sans";
@import "http://fonts.googleapis.com/css?family=Open+Sans";
```

### Comments

Explain code as needed, where possible.

Use comments to explain code: What does it cover, what purpose does it serve, why is respective solution used or preferred?

(This item is optional as it is not deemed a realistic expectation to always demand fully documented code. Mileage may vary heavily for HTML and CSS code and depends on the project’s complexity.)

***

## HTML

### Basic parts of the markup

The minimum required structure of an HTML document consists of:
1. Modern document type ``<!DOCTYPE html>``
2. Root element ``<html>`` with the document language lang
3. Meta information ``<head>``
4. Document title ``<title>``
5. Document encoding ``<meta charset="utf-8">``. The character encoding on the page is explicitly specified to ensure that the text is displayed correctly. UTF-8 encoding is preferred.
6. Document body ``<body>``

#### Example

```html
<!-- Good -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Title</title>
  </head>
  <body>Page</body>
</html>

<!-- Bad -->
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
  <title>Title</title>
  Page
</html>
```

### Case of tags and attributes

Tag names, attributes and their values are written in lowercase.

Exception: attributes for SVG elements, for example: viewBox, preserve Aspect Ratio and others.

#### Example

```html
<!-- Good -->
<ul>
  <li>First</li>
  <li>Second</li>
  <li>Third</li>
</ul>

<img
  class="image"
  src="images/picture.png"
  width="400"
  height="400"
  alt="A big white cat."
>

<svg
  width="27"
  height="16"
  viewBox="0 0 128 76"
>
  <path d="M125,5.15c.89-3,0-5.15-4.23-5.15h-14a6,6,0,0,0-6.09Z"/>
</svg>

<!-- Bad -->
<UL>
  <LI>First</LI>
  <LI>Second</LI>
  <LI>Third</LI>
</UL>

<IMG
  class="IMAGE"
  SRC="images/picture.png"
  WIDTH="400"
  HEIGHT="400"
  ALT="A big white cat."
>
```

### Formatting tags

1. The nesting of tags is indicated by hyphens and indents.
2. Each new nested tag is moved to a separate indented line, except for text elements.
3. The text inside the tags stays on the same line with the tags.

#### Example

```html
<!-- Good -->
<div class="menu">
  <ul>
    <li>
      <a href="">First</a>
    </li>
    <li>
      <a href="">Second</a>
    </li>
    <li>
      <a href="">Third</a>
    </li>
  </ul>
</div>

<p><a href="#">it's a simple text</a></p>
<p>it's a <i>simple</i> and <b>strong</b> text.</p>

<!-- Bad -->
<div class="menu"><ul>
  <li><a href="">
    First
  </a></li>
  <li><a href=""> Second
  </a></li>
</ul></div>
```

### Double and single tags

1. Double tags have an opening and closing tag.
2. Single tags do not have a closing tag or a slash.

#### Example

```html
<!-- Good -->
<ul>
  <li>First</li>
  <li>Second</li>
  <li>Third</li>
</ul>

<img
  src="images/picture.png"
  width="400"
  height="400"
  alt="A big white cat."
>

<input
  type="text"
  name="name"
>

<!-- Bad -->
<ul>
  <li>First
  <li>Second
  <li>Third
</ul>

<img
  src="images/picture.png"
  width="400"
  height="400"
  alt="A big white cat."
/>

<input type="text"></input>
```

### Order of attributes

1. The class attribute comes right after the tag name.
2. The attributes go in the same order to make them easier to read.

#### Example

```html
<!-- Good -->
<label
  class="field-group-label"
  for="appointment-phone"
>
  <input
    class="field-group-input field"
    type="text"
    id="appointment-phone"
    placeholder="+7 000-00-00"
  >
</label>

<label
  class="field-group-label"
  for="appointment-date"
>
  <input
    class="field-group-input field"
    type="text"
    id="appointment-date"
    placeholder="01.01.2020"
  >
</label>

<!-- Bad -->
<label
  for="appointment-phone"
  class="field-group-label"
>
  <input
    class="field-group-input field"
    type="text"
    placeholder="+7 000-00-00"
    id="appointment-phone"
  >
</label>

<label
  for="appointment-date"
  class="field-group-label"
>
  <input
    id="appointment-date"
    class="field-group-input field"
    type="text"
    placeholder="01.01.2020"
  >
</label>
```

### Logical attributes

Logical attributes are written without meaning and in a uniform sequence throughout the document.

#### Example

```html
<!-- Good -->
<input
  type="text"
  disabled
  required
>

<!-- Bad -->
<input
  type="text"
  disabled="disabled"
  required="required"
>
```

### Formatting attributes

There are no spaces around the "equals" = sign in the attribute entry.

#### Example

```html
<!-- Good -->
<input
  class="field-group-input field"
  type="text"
  id="appointment-date"
  placeholder="01.01.2020"
>

<!-- Bad -->
<input
  class = "field-group-input field"
  type = "text"
  id = "appointment-date"
  placeholder = "01.01.2020"
>
```

### Quotes in attributes and values

1. Attribute values are written in double quotes.
2. Nested quotes in values are single.

#### Example

```html
<!-- Good -->
<input
  class="field-group-input field"
  type="text"
  id="appointment-date"
  placeholder="01.01.2020"
>

<button
  class="button"
  type="button"
  onclick="show('menu')"
>
  Menu
</button>

<!-- Bad -->
<input
  class='field-group-input field'
  type='text'
  id='appointment-date'
  placeholder='01.01.2020'
>

<input
  class=field-group-input
  type=text
  id=appointment-date
  placeholder=01.01.2020
>

<button
  class="button"
  type="button"
  onclick="show("menu")"
>
  Menu
</button>
```

### Dimensions of the replaced elements

1. Images, videos, and iframes have sizes specified.
2. If possible, the actual dimensions are specified for the images, as this improves the page rendering performance: the browser will not redraw the page during the loading and display of the image.
3. There are no units of measurement in the attributes.

#### Example

```html
<!-- Good -->
<img
  src="logo.png"
  alt=""
  width="300"
  height="150"
>
<svg
  width="16"
  height="16"
  xmlns="http://www.w3.org/2000/svg"
></svg>
<video
  src="source/video.mp4"
  width="400"
  height="400"
></video>
<iframe
  src="https://maps.google.com"
  width="400"
  height="400"
></iframe>

<!-- Bad -->
<img
  src="logo.png"
  alt=""
>
<img
  src="logo.png"
  alt=""
  width="300px"
  height="150px"
>
<svg xmlns="http://www.w3.org/2000/svg"></svg>
<video src="source/video.mp4"></video>
<iframe src="https://maps.google.com"></iframe>
```

### BEM

As a CSS methodology, it is better to use BEM

#### Naming convention

- The name of the block is written through kebab case. (e.g. ``block-name``)
- An element is separated from a block with a double underscore. (e.g. ``block-name__element-name``)
- The modifier is written through ``_mod-name_mod-value`` (e.g. ``block-name__element-name_mod-name_mod-value``)

The most important thing is that the block does not need to write external geometry so that it can be reused in different places on the site.

#### Example

```html
<header class="header">
  <a
    class="header__logotype logotype logotype_size_large"
    href="/"
  >
    <img
      class="logotype__image"
      width="200"
      height="50"
      alt="Logotype name"
    >
  </a>
  <button
    class="header__button button"
    type="button"
  >
    Menu
  </button>
</header>
```

Read more [here](https://en.bem.info/methodology)


### The method attribute in the form

The method attribute specifies the type of data sending.

#### Example

```html
<!-- Good -->
<form method="post"></form>
<form method="get"></form>

<!-- Bad -->
<form method=""></form>
<form></form>
```

### Connecting styles

Style files are connected using ``<link>`` inside ``<head>``. However, the type attribute for the ``<link>`` tag is not specified, since its text/css value is set by default.

#### Example

```html
<!-- Good -->
<!DOCTYPE html>
<html lang="ru">
  <head>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>…</body>
</html>

<!-- Bad -->
<!DOCTYPE html>
<html lang="ru">
  <head>…</head>
  <body>
    <link rel="stylesheet" href="style.css">
  </body>
</html>
```

### Connecting scripts

Scripts are connected at the very bottom of the page so that when it loads, the content is not blocked.

When connecting scripts, the type attribute is not specified in the ``<script>`` tag, since its text/javascript value is set by default.

#### Example

```html
<!-- Good -->
<!DOCTYPE html>
<html lang="ru">
  <head>…</head>
  <body>
    <!-- Page content -->
    <script src="app.js"></script>
  </body>
</html>

<!-- Bad -->
<!DOCTYPE html>
<html lang="ru">
  <head>
    <script src="app.js"></script>
  </head>
  <body>…</body>
</html>
```

### Attribute indentation

If the tag has more than 1 attribute, then the remaining attributes need to be moved down

#### Example

```html
<!-- Good -->
<a
  class="link"
  href="/link"
  target="_blank"
>
  Link
</a>

<!-- Bad -->
<a class="link" href="/link" target="_blank">Link</a>
```

### Validity

The document is being checked for validity. A [modern validator](https://validator.w3.org/nu) is used for verification.

***

## Vue

Many rules from HTML can be used when we write component [markup](#html) in template

In the future we will add rules for JavaScript and Vue

***

## CSS

### The @import rule

The @import rule is slower than the <link> tag. @import is not used in styles.

#### Example

```html
<!-- Good -->
<link rel="stylesheet" href="module.css">

<!-- Bad -->
<style>
  @import url("module.css");
</style>
```

### Register of selectors and properties

Selectors and properties are written in lowercase letters.

#### Example

```css
/* Good */
.element {
  color: #ff0000;
}

/* Bad */
.Element {
  Color: #ff0000;
}

.ELEMENT {
  COLOR: #ff0000;
}
```

### Ad Structure

1. There is a space in front of the opening curly brace. After the parenthesis, the entry starts on a new line.
2. The properties are on separate lines.
3. The properties inside the block have one internal indentation.
4. There is a space after the colon. No space is needed before the colon.
5. There is a semicolon at the end of the ad.
6. The closing parenthesis is on a new line and without indentation.
7. There is one empty line between the rule blocks.

#### Example

```css
/* Good */
.block {
  margin-bottom: 0;
  margin-top: 0;

  font-size: 14px;
  line-height: 20;
  color: #ff0000;
}

.element {
  background-color: #000000;
}

/* Bad */
.block{margin-bottom: 0;
    margin-top: 0;
  font-size: 14px;line-height: 20;
  color :#ff0000}
.element {
  background-color: #000000;
}
```

### Class names

1. Class names are written in lowercase letters.
2. The class names are such that they can be used to quickly understand which element of the page is assigned a class. Avoid abbreviations, but don't make them too long (more than three words).

#### Example

```css
/* Good */
.alert-danger { … }
.tweet .user-picture { … }
.button { … }
.layout-center { … }

/* Bad */
.testElement { … }
.t { … }
.big_red_button { … }
```

### Transferring selectors

Comma-separated selectors are written on new lines.

#### Example

```css
/* Good */
h1,
h2,
h3 {
  margin-top: 0;
}

/* Bad */
h1, h2, h3 {
  margin-top: 0;
}
```

### Spaces between combinators

There is one space between the selectors before and after the combinator.

#### Example

```css
/* Good */
h2 + h3 {}
ul > li {}

/* Bad */
h2+h2 p{}
ul >li {}
```

### Color format

1. The colors are written in lowercase in 6-digit HEX format.
2. The hexadecimal value of the color is not abbreviated, but is written in full from all six characters. Lowercase letters are used for writing.
3. Colors can be recorded by rgba or hsla functions if transparency is needed.

#### Example

```css
/* Good */
.block {
  color: rgb(0 0 0 / 0.5);

  background-color: #ff0000;
  border-left-color: #00ff00;
}

/* Bad */
.block {
  color: black;

  background-color: #F00;
  border-left-color: rgb(0 255 0);
}
```

### Quotation marks

1. In all cases, double quotes are used in styles.
2. In optional cases, the quotation marks are not omitted.

#### Example

```css
/* Good */
.field[type="text"] {
  background-image: url("images/cat.jpg");
}

/* Bad */
.field[type=text] {
  background-image: url(images/cat.jpg);
}
```

### Leading zero and spaces after commas

1. The initial zero for the values is not shortened.
2. There is a space after the commas in the enumerations.

#### Example

```css
/* Good */
.block {
  opacity: 0.5;
  background-color: rgb(0 0 0 / 0.5);
}

/* Bad */
.block {
  opacity: .5;
  background-color: rgb(0 0 0 / 0.5);
}

.element {
  color: rgb(0 0 0 / 0.5);
}
```

### Recurring properties

1. Properties are not repeated within a single declaration.
2. The property can be repeated if a reset or a general case was described earlier.

#### Example

```css
/* Good */
.block {
  margin: 0;
  margin-left: 20px;

  border: 10px solid #000000;
  border-bottom-color: #ff0000;
}

/* Bad */
.block {
  margin-left: 10px;
  border-left: 10px solid #000000;
  margin-left: 20px;
  border-left: 10px solid #ff0000;
}
```

### Units of measurement

1. Units of measurement are not specified where they are not necessary.
2. In custom properties, you need to specify the unit of measurement.

#### Example

```css
/* Good */
:root {
  --size: 0px;
}

.element {
  margin-top: 0;
  width: calc(100% - var(--size));

  border: 0;
  box-shadow: 0 1px 2px #cccccc, inset 0 1px 0 #ffffff;
}

/* Bad */
:root {
  --size: 0;
}

.element {
  margin-top: 0px;
  width: calc(100% - var(--size));

  border: 0px;
  box-shadow: 0px 1px 2px #cccccc, inset 0px 1px 0 #ffffff;
}

```

### Fractional values

In fractional values, there are no more than two digits after the dot.

#### Example

```css
/* Good */
.block {
  width: 2.33%;
}

/* Bad */
.block {
  width: 2.33333%;
}
```

### !important

1. The !important keyword is not used to combat specificity.
2. Universal helper classes can use !important.

#### Example

```css
/* Good */
.visually-hidden {
  position: absolute !important;

  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;

  border: 0 !important;
  clip: rect(0 0 0 0) !important;
  overflow: hidden !important;
}

/* Bad */
.element {
  font-size: 17px !important;
}
```

### Accessible hiding

The content is hidden by the visuallyhidden utility class so that it is accessible to screen readers and search engines.

#### Example

```css
/* Good */
.visually-hidden {
  position: absolute;

  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;

  white-space: nowrap;

  border: 0;
  clip-path: inset(100%);
  clip: rect(0 0 0 0);
  overflow: hidden;
}
<h2 class="visually-hidden">Заголовок</h2>

/* Bad */
h1 {
  font-size: 0;
}

.title {
  display: none;
}
```

### Order of properties

Declarations of logically related properties are grouped in the following order:

- ``Positioning``
- ``Block model``
- ``Typography``
- ``Decoration``
- ``Animation``
- ``Various``

Positioning follows first because it affects the position of blocks in the document flow. The block model goes next, as it determines the size and location of the blocks.

All other ads that change the appearance of the internal parts of the blocks and do not affect other blocks are the last to go.

Grouped ads in the rule are separated from each other by an empty line.

The order of declaring detailed rules, such as font-size, font-family, line-height, corresponds to the order in the abbreviated version of the rule. In the case of sharing detailed and abbreviated rules, the abbreviated version comes first.

#### Example

```css
.declaration-order {
  /* Positioning */
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;

  /* Box model */
  display: block;
  float: right;
  width: 100px;
  height: 100px;
  margin: 10px;
  padding: 10px;

  /* Typography */
  font-family: "Arial", sans-serif;
  font-style: normal;
  font-size: 13px;
  line-height: 20px;
  font-weight: 700;
  text-align: center;
  color: #333333;

  /* Visual */
  background-color: #f5f5f5;
  border: 1px solid #e5e5e5;
  border-radius: 3px;
  opacity: 1;

  /* Animation */
  transition: color 1s;

  /* Various */
  will-change: auto;
}
```

### CSS Variables

CSS variables need to be sorted in the same way as CSS properties

#### Example

```css
/* Good */
.block {
  --block-size: 100px;
  --block-padding: 20px;

  --block-text-size: 18px;

  --block-background: var(--color-secondary);

  width: var(--block-size);
  height: var(--block-size);

  font-size: var(--block-text-size);

  background-color: var(--block-background);
}

/* Bad */
.block {
  --block-text-size: 18px;
  --block-background: var(--color-secondary);
  --block-size: 100px;
  --block-padding: 20px;

  width: var(--block-size);
  height: var(--block-size);

  font-size: var(--block-text-size);

  background-color: var(--block-background);
}

```

### Media query placement

Place media queries as close to their relevant rule sets whenever possible. Don’t bundle them all in a separate stylesheet or at the end of the document. Doing so only makes it easier for folks to miss them in the future. Here’s a typical setup.

#### Example

```css
.element {
  --element-text-color: red;

  color: var(--element-text-color);
}

@media (min-width: 768px) { /* tablet */
  .element {
    --element-text-color: blue;
  }
}
```

### Shorthand notation

Limit shorthand declaration usage to instances where you must explicitly set all available values. Frequently overused shorthand properties include:

- ``padding``
- ``margin``
- ``font``
- ``background``
- ``border``
- ``border-radius``

Usually we don’t need to set all the values a shorthand property represents. For example, HTML headings only set top and bottom margin, so when necessary, only override those two values. A 0 value implies an override of either a browser default or previously specified value.

Excessive use of shorthand properties leads to sloppier code with unnecessary overrides and unintended side effects.

The Mozilla Developer Network has a great article on shorthand properties for those unfamiliar with notation and behavior.

#### Example

```css
/* Good */
.element {
  margin-bottom: 10px;

  background-color: red;
  background-image: url("image.jpg");
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}

/* Bad */
.element {
  margin: 0 0 10px;

  background: red;
  background: url("image.jpg");
  border-radius: 3px 3px 0 0;
}
```

### Colors

With the support of CSS Color Levels 4 in all major browsers, rgba() and hsla() are now aliases for rgb() and hsl(), meaning you can modify alpha values in rgb() and hsl(). Along with this comes support for new space-separated syntax for color values. For compability with future CSS color functions, use this new syntax.

#### Example

```css
.element {
  color: rgb(255 255 255 / 0.65);
  background-color: rgb(0 0 0 / 0.95);
}
```

### CSS Validity

Use valid CSS where possible.

Unless dealing with CSS validator bugs or requiring proprietary syntax, use valid CSS code.

Use tools such as the [W3C CSS validator](https://jigsaw.w3.org/css-validator) to test.

Using valid CSS is a measurable baseline quality attribute that allows to spot CSS code that may not have any effect and can be removed, and that ensures proper CSS usage.

***

## Sass / SCSS

### Nesting

In Sass there is a great opportunity to add nesting in styles. But this often complicates the reading of the code when there are a lot of nesting. Therefore, I recommend using nesting exclusively for class modifiers, pseudo-classes and pseudo-elements.

#### Example

```scss
// Good
.block {
  --block-background: var(--color-secondary);

  max-width: 600px;
  padding: 30px;

  background-color: var(--block-background);

  &_state_active {
    --block-background: var(--color-base);
  }

  &:hover {
    --block-background: var(--color-green);
  }

  &::before,
  &::after {
    content: "";
  }
}

.block__title {
  --block-title-space-y: 0;

  margin-top: var(--block-title-space-y);
  margin-bottom: var(--block-title-space-y);

  font-weight: 400;
}

.block__text {
  font-size: 1.5m;
  text-decoration: underline;
}

// Bad
.block {
  --block-background: var(--color-secondary);

  max-width: 600px;
  padding: 30px;

  background-color: var(--block-background);

  div {
    border: 1px solid currentColor;

    h3 {
      outline: 1px solid blue;

      span {
        text-decoration: underline;
      }
    }
  }
}
```

### Variables

Don't use sass variables when you can use custom css variables

#### Example

```scss
// Good
.block {
  --block-size: 100px;

  width: var(--size);
  height: var(--size);
}

// Bad
.block {
  $block-size: 100px;

  width: $block-size;
  height: $block-size;
}
```

### Advice

Sass has a huge number of possibilities. @mixin, @extend, @function, @error and so on, but this does not mean that using all these features makes the code understandable. Often all these constructions complicate the understanding of the code, so please simplify your styles as much as possible and try to use the Sass/SCSS capabilities to a minimum.

Ideally, you need to use from Sass/SCSS: nesting (as shown in the first block), @import, @mixin (if they are really necessary for calculating something complex) and that's it.
