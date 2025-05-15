> **Note:** This document is only for Identity Engine. If you’re using Classic Engine, see [Sign in to SPA with Auth JS]( /docs/guides/archive-sign-in-to-spa-authjs/vue/main). See [Identify your Okta solution](https://help.okta.com/okta_help.htm?type=oie&id=ext-oie-version) to determine your Okta version.

This guide walks you through building a password sign-in Vue.js app that uses the Auth JS and Vue.js libraries for Okta [embedded authentication](/docs/concepts/redirect-vs-embedded/#embedded-authentication).

---

#### Learning outcomes

Understand the sequence of steps required to implement Okta [embedded authentication](/docs/concepts/redirect-vs-embedded/#embedded-authentication) with the Auth JS and Vue.js libraries for your Vue.js app.

#### What you need

* [Okta Integrator Free Plan org](/signup)
* [Okta Auth SDK](https://github.com/okta/okta-auth-js) (`@okta/okta-auth-js`)
* [Okta Vue.js SDK](https://github.com/okta/okta-vue) (`@okta/okta-vue`)
* [Vue CLI](https://cli.vuejs.org/guide/installation.html)

    > **Note**: Use the latest version of the Okta libraries for your Vue.js app. <!--This guide was written for `@okta/okta-vue@5.1.1` and `@okta/okta-auth-js@6`. -->

---
