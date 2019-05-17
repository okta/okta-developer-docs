---
title: Customization Examples
---
Use the following customization examples to help you personalize your sign-in page by adding an HTML banner, extending the look and feel of your page with your own stylesheet (CSS), adding an analytics script for website traffic monitoring, and defining per-application branding.

## Add an HTML Banner
You can add and style an HTML banner for your sign-in page.

In the embedded HTML editor, add a banner `<div>` above the login container line.

Example:

```html
<div class="banner">Notice: Hello World!</div> 
<div id="okta-login-container"></div>
```

Add styling to the banner by using inline CSS in the `<head>` section.

Example: 
```html
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="robots" content="none" />
<title>{{pageTitle}}</title>
<style>
	.banner {
	text-align: left;
	font: normal bold 28pt Tahoma,sans-serif;
	color: #025e7c;
    text-align: center;
    margin-top: 100px;
		}
	</style>
  {{{SignInWidgetResources}}}
</head>
<body>
    <div class="login-bg-image" style="background-image: {{bgImageUrl}}"></div>
 	<div class="banner">Notice: Hello World! </div>     
<div id="okta-login-container"></div>
...
```

## Add Your Own Stylesheet
You can add your own stylesheet to extend the look of your sign-in page. In the embedded HTML editor, add a link to your stylesheet in the `<head>` section, below the <span v-pre>`{{{SignInWidgetResources}}}`</span> line.

Example:
```html
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="none" />
    <title>{{pageTitle}}</title>
    {{{SignInWidgetResources}}}
   <!-- custom styles for your login page -->
  <link rel="stylesheet" type="text/css" href="http://YourCustomStyleSheet.css">
  </head>
  ...
```

## Add an Analytics Script
You can add an analytics script to monitor your website traffic. In the embedded HTML editor, add a script in the `<head>` section, below the <span v-pre>`{{{SignInWidgetResources}}}`</span> line.

Example:
```html
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="none" />
    <title>{{pageTitle}}</title>
    {{{SignInWidgetResources}}}
    <!--add your scripts here -->
<script type="text/javascript" src="YourCustomScript.js"></script>
</head>
...
```

## Per-Application Customization
The Okta-hosted sign-in page is application aware. This means that your client-side customizations can understand which application caused the sign-in page to load. This is useful when you have multiple brands that you want to support.

When you use the Okta-hosted sign-in page, there is an object called `OktaUtil` on the page. For an OpenID Connect application, the `client_id` is stored in the request context's target for that object:

```
OktaUtil.getRequestContext().target.clientId
```

There is also additional information loaded in the `target`, such as `label`.

The entire `requestContext` object is only populated when the Okta Hosted Sign-In page is redirected to or from an application (such as SP-initiated flows in SAML or the `/authorize` route for OpenID Connect/OAuth 2.0.). Otherwise, it is undefined.

A valid way to globally get the `client_id` is to put a script on the hosted sign-in page to expose the function that gets the `client_id` for you out of `OktaUtil`:

```javascript
<script>
  if(OktaUtil){
    var _getClientId = function(){
      var request_context = OktaUtil.getRequestContext();
      var client_id = "";
      if(request_context && request_context.target && request_context.target.clientId){
        client_id = OktaUtil.getRequestContext().target.clientId
      }
      return client_id;
    }
  }
</script>
```
 
In your JavaScript code, using the method above, you can get the `client_id` and take action. For example, if you had a CSS file on your server that was for a particular client's CSS:

```javascript
var client_id = _getClientId();

if (client_id === '0oabns6btmBqAXZQC0h7'){
  //add my application css
  var head = document.head;
  var link = document.createElement("link");

  link.type = 'text/css';
  link.rel = 'stylesheet';
  link.href = 'https://myapplication.com/styles/' +client_id + '.css';
    head.appendChild(link);
}
```
<NextSectionLink/>