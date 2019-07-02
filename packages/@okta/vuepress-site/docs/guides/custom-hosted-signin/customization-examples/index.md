---
title: Customization examples
---
Use the following examples to help you customize your sign-in page with your own CSS, scripts, and per-application branding.

## Add your own stylesheet
You can add your own stylesheet to extend the look of your sign-in page. In the embedded HTML editor, add a link to your stylesheet in the `<head>` section, below the <span v-pre>`{{{SignInWidgetResources}}}`</span> line.

Example:
```html
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="none" />
    <title>{{pageTitle}}</title>
    {{{SignInWidgetResources}}}

    <!-- Custom styles for your sign-in page -->
    <link rel="stylesheet" type="text/css" href="http://example.com/yourCustomStyleSheet.css">
</head>
...
```

## Add your own scripts
You can add custom JavaScript code to your sign-in page. In the embedded HTML editor, add a script in the `<head>` section, below the <span v-pre>`{{{SignInWidgetResources}}}`</span> line.

Example:
```html
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="none" />
    <title>{{pageTitle}}</title>
    {{{SignInWidgetResources}}}

    <!-- Add your scripts here -->
    <script src="https://example.com/yourCustomScript.js"></script>
    
    <!-- Or, inline scripts -->
    <script>
      // Do something
    </script>
</head>
...
```

## Per-application customization
The Okta-hosted sign-in page is application-aware. This means that your client-side customizations can understand which application caused the sign-in page to load. This is useful when you have multiple applications or brands that you want to support.

When the page renders, an object called `OktaUtil` exists on the page. By calling the `OktaUtil.getRequestContext()` method, scripts on the page can get details about the current request.

To access the application's client ID (which uniquely identifies the application), write a function to safely get `target.clientId` from the request context:

```html
<script>
  function getClientId() {
    if (!OktaUtil) return undefined;
    
    var requestContext = OktaUtil.getRequestContext();
    if (requestContext && requestContext.target && requestContext.target.clientId) {
      return requestContext.target.clientId;
    }
  }
</script>
```

Elsewhere in your page, using the method above, you can inspect the client ID and take action. For example, if you had a CSS file on your server that was for a particular client's CSS:

```html
<script>
  var clientId = getClientId();

  if (clientId === '00exampleclientid'){
    // add application-specific CSS
    var head = document.head;
    var link = document.createElement('link');

    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = 'https://example.com/styles/' + client_id + '.css';
    head.appendChild(link);
  }
</script>
```

<NextSectionLink>Next Steps</NextSectionLink>