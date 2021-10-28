---
title: Updates to the Sign-In Widget I18n properties
---

<ApiLifecycle access="ie" /><br>
<ApiLifecycle access="Limited GA" /><br>

## Overview

After your org is upgraded to Okta Identity Engine, you can override any text strings in the interface with i18n translation strings. See [Configuration](https://github.com/okta/okta-signin-widget#configuration).

See [OIE strings in login.properties](https://github.com/okta/okta-signin-widget/blob/master/packages/%40okta/i18n/src/properties/login.properties#L764-L1216) for a full list of Identity Engine properties you can configure.

> **Note:** If you upgrade but don’t customize the Identity Engine strings, the Widget generates the default translations. See the [language properties files](https://github.com/okta/okta-signin-widget/tree/master/packages/%40okta/i18n/src/properties).

The following shows a sample Identity Engine I18n configuration:

```javascript
// The i18n object maps language codes to a hash of property keys ->
// property values.
i18n: {
  // Overriding English properties
  'en': {
    'oie.password.challenge.title': 'Verify with Acme password',
    'oie.email.authenticator.description': 'Verify with an Acme link or code'
  },
  // Overriding Japanese properties
  'ja': {
    'oie.password.challenge.title': 'Acmeパスワードで確認する',
    'oie.email.authenticator.description': 'Acmeリンクまたはコードで確認する'
  }
}
```