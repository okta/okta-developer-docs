---
title: Updates to widget i18n properties
---

<ApiLifecycle access="ie" />

This guide covers how to override existing text strings in the interface with i18n translation strings.

---

#### Learning outcomes

Understand how to override text strings with Okta Identity Engine i18n strings so that you can create localized Okta Sign-In Widgets.

#### What you need

[Widget that is updated to the latest available release](/docs/guides/oie-upgrade-sign-in-widget/main/)

**Sample code**

[Sample i18n code for Identity Engine](#sample-i18n-code-for-the-identity-engine)

---

## Specify i18n translation strings

After your org is upgraded to Identity Engine, you can override any text strings in the interface with i18n translation strings. See [Configuration](https://github.com/okta/okta-signin-widget#configuration).

See [OIE strings in login.properties](https://github.com/okta/okta-signin-widget/blob/ca430bdd1b6937350f65b558878fc9ed8b34d1f7/packages/%40okta/i18n/src/properties/login.properties#L863-L865) for a full list of Identity Engine properties that you can configure.

> **Note:** If you upgrade but don't customize Identity Engine strings, the widget generates the default translations. See the [language properties files](https://github.com/okta/okta-signin-widget/tree/master/packages/%40okta/i18n/src/properties).

## Sample i18n code for Identity Engine

The following shows a sample Identity Engine i18n configuration:

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