> **Note:** This document is only for Okta Identity Engine. If you’re using Okta Classic Engine, see [Sign in to SPA with embedded Widget](/docs/guides/archive-sign-into-spa-embedded-widget/vue/main). See [Identify your Okta solution](https://help.okta.com/oie/en-us/Content/Topics/identity-engine/oie-verify-version.html) to determine your Okta version.

This guide walks you through how to build a password-only sign-in flow Vue.js app that uses the Okta Sign-In Widget for Okta embedded authentication.

---

**Learning outcomes**

* Understand the sequence of steps required to add the Okta Sign-In Widget to a Vue.js app for embedded authentication.
* Understand how to run the Vue.js embedded authentication sample app.

**What you need**

* [Okta Developer Edition organization](https://developer.okta.com/signup/oie-preview.html)
* [Okta Auth JS SDK](https://github.com/okta/okta-auth-js) (`@okta/okta-auth-js`)
* [Okta Vue.js SDK](https://github.com/okta/okta-vue) (`@okta/okta-vue`)
* [Okta Sign-In Widget](https://github.com/okta/okta-signin-widget) (`@okta/okta-signin-widget`) &mdash; See the [Okta Sign-In Widget guide](/code/javascript/okta_sign-in_widget/).
* [Vue CLI](https://cli.vuejs.org/guide/installation.html)

    > **Note**: Use the latest version of the Okta libraries for your Vue.js app. <!--This guide was written for `@okta/okta-signin-widget@6`, `@okta/okta-vue@5.1.1`, and `@okta/okta-auth-js@6`. -->

**Sample code**

[Embedded Vue.js sample app with the Okta Sign-In Widget](https://github.com/okta/samples-js-vue/tree/master/custom-login) &mdash; See [Run the sample application](#run-the-sample-application).

---
