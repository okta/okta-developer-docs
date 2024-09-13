After you create a basic sign-in flow for the Vue.js app, you can extend your app's sign-in experience. You can add features such as Multifactor Authentication, self-registration, or social IdP authentication.

For each of those features, ensure you understand the [Interaction Code flow](/docs/guides/implement-grant-type/interactioncode/main/#interaction-code-flow) so that you can handle possible remediation steps of the interaction. In addition to implementing the remediation steps for those features in your app code, you need to configure authenticators and authentication policies for your app. See these pages for more information:

* [Set up your Okta org for a multifactor use case](/docs/guides/oie-embedded-common-org-setup/nodejs/main/#set-up-your-okta-org-for-a-multifactor-use-case)
* [Set up your Okta org for a social IdP use case](/docs/guides/oie-embedded-common-org-setup/nodejs/main/#set-up-your-okta-org-for-a-social-idp-use-case)

> **Note:** The Admin Console and the Okta API support the Identity Engine org configuration.

> **Note:** For use cases that require a callback route for email magic link or for social IdP redirect, use the [Okta Vue SDK](https://github.com/okta/okta-vue). It provides the [LoginCallback](https://github.com/okta/okta-vue#use-the-logincallback-component) component. You can use the component to handle token parsing, token storage, and redirecting to a protected page after a user is authenticated.
