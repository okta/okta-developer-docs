---
title: Customization examples
---
Use the following customization examples to help you personalize your error page by extending the look and feel of the page with your own stylesheet (CSS).

## Add a stylesheet

You can add your own stylesheet to extend the look of your error page.

In the embedded HTML editor, add a link to your stylesheet in the `<head>` section, below the  `<link rel="stylesheet" type="text/css" href="/assets/css/sections/errors-v2.css">` line.

Example:

```html
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="none" />

    <title>{{orgName}} - {{errorSummary}}</title>

    <link rel="stylesheet" type="text/css" href="/assets/css/sections/errors-v2.css">
    <link rel="stylesheet" type="text/css" href="/assets/css/sections/yourstylesheet.css">
</head>
```

## Add styles inline

Alternatively, you can add styles inline for elements of your error page.

Example:

```html
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="robots" content="none" />

<title>{{orgName}} - {{errorSummary}}</title>

<link rel="stylesheet" type="text/css" href="/assets/css/sections/errors-v2.css">
<style>
    .content {
    background: yellow;
    font: normal bold 20pt Tahoma;
    }
</style>
</head>
```

<NextSectionLink>Next Steps</NextSectionLink>