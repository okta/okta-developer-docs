---
title: Use macros
---
The following macros contain the configuration parameters for certain page elements. These macros inject specific content or functionality automatically.

#### <span v-pre>`{{orgName}}`</span> 
Inserts the org name title.

Example:
```html
<title>{{orgName}} - {{errorSummary}}</title>
```

#### <span v-pre>`{{errorSummary}}`</span>
Inserts the error title text.

Example:
```html
<h2 class="o-form-title">{{errorSummary}}</h2>
```

#### <span v-pre>`{{bgImageUrl}}`</span>
Inserts a URL to the background image configured in your Okta organization. You can change this image by selecting **Customization**, and then **Appearance** from the Developer Console, but this changes the background image in all instances where the macro is used, for example, your custom sign-in page. If you want to just change the background image for your custom error pages, put the URL to the image in place of the macro:

Example:
```html
<div class="login-bg-image" style="background-image: url('https://example.com//YourBackgroundImage.png')"></div>
```

#### <span v-pre>`{{orgLogo}}`</span>
Inserts the org logo image that appears. You can change this logo using the **Organization Logo** option accessed by selecting **Customization**, and then **Appearance** from the Developer Console, but this changes the org logo in all instances where the macro is used, for example, your custom sign-in page. If you want to just change the logo for your custom error pages, put the URL to the image in place of the macro:

Example:
```html
<img alt="{{orgName}}" src="https://example.com//SomeOtherImage.png" class="org-logo">
```

#### <span v-pre>`{{{errorDescription}}}`</span>
Inserts a description of the error.

Example:
```html
<p class="o-form-explain">What happened? {{{errorDescription}}}</p>
```

#### <span v-pre>`{{back}}`</span>
Inserts the text `Go to Homepage`. The button takes the user back to the sign-in page when clicked. 

Example:
```html
 <a href="/" class="button">{{back}}</a>
```

#### <span v-pre>`{{technicalDetails}}`</span>
Inserts additional error codes, if there are any. See [Okta Error Codes](/docs/reference/error-codes/#okta-error-codes-listed-by-error-code) for more information.

Example:
```html
<p class="technical-details">Additional Error Details: {{technicalDetails}}</p>
```

<NextSectionLink/>
