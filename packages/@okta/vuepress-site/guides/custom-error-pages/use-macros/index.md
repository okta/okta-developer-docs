---
title: Use Macros
---
The following macros contain the configuration parameters for certain page elements. These macros inject specific content or functionality automatically.

The graphic highlights and numbers the macros in the html editor, and then displays the corresponding number on the error page for each macro and what text or image is affected.

![Macros on Error Page](/img/custErrorPage.png "Macros on Error Page")

#### 1 <span v-pre>`{{orgName}}`</span> 
This macro inserts the org name title on the error page's browser tab.

Example:
```html
`<title>{{orgName}} - {{errorSummary}}</title>`
```

#### 2 <span v-pre>`{{errorSummary}}`</span>
This macro inserts the error title text on the error page's browser tab.

Example:
```html
`<title>{{orgName}} - {{errorSummary}}</title>`
```
#### 3 <span v-pre>`{{bgImageUrl}}`</span>
This macro inserts a URL to the background image configured in your Okta organization. You can change this image by selecting **Customization**, and then **Appearance** from the Developer Console, but this changes the background image in all instances where the macro is used, for example, your custom sign-in page. If you want to just change the background image for your custom error pages, put the URL to the image in place of the macro:

Example:
```html
`<div class="login-bg-image" style="background-image: url('https://example.com//YourBackgroundImage.png')"></div>`
```

#### 4 <span v-pre>`{{orgLogo}}`</span>
This macro inserts the org logo image that appears. You can change this logo using the **Organization Logo** option accessed by selecting **Customization**, and then **Appearance** from the Developer Console, but this changes the org logo in all instances where the macro is used, for example, your custom sign-in page. If you want to just change the logo for your custom error pages, put the URL to the image in place of the macro:

Example:
```html
`<img alt="{{orgName}}" src="https://example.com//SomeOtherImage.png" class="org-logo">`
```

#### 5 <span v-pre>`{{httpStatusCode}}`</span>
This macro inserts the display of the standard HTTP error code, if there is one. If there isn't one, a generic error triangle logo (alert.png) is used instead. You can change this default image.

Example:
```html
`<img alt="{{errorSummary}}" src="https://example.com//yourimage.png" />`
```

#### 6 <span v-pre>`{{errorSummary}}`</span>
This macro inserts the error title text on the error page.

Example:
```html
`<h2 class="o-form-title">Error: {{errorSummary}}</h2>`
```
#### 7 <span v-pre>`{{{errorDescription}}}`</span>
This macro inserts the display of the error description.

Example:
```html
`<p class="o-form-explain">Error Description: {{{errorDescription}}}</p>`
```

#### 8 <span v-pre>`{{back}}`</span>
This macro inserts text on the back button. The button takes the user back to the sign-in page when clicked. 

Example:
```html
 `<a href="/" class="button">Take Me Back!</a>`
 ```
 
#### 9 <span v-pre>`{{technicalDetails}}`</span>
This macro inserts additional error codes, if there are any. See [Okta Error Codes](reference/error_codes/) for more information.

Example:
```html
`<p class="technical-details">Additional Error Details: {{technicalDetails}}</p>`
```

<NextSectionLink/>