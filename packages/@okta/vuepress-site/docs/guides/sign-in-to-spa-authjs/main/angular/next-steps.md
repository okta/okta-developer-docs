After you create a basic sign-in flow for your Angular app, you can extend your app's sign-in experience. You can add features such as multifactor, self-registration, or social IdP authentication.

For each of those features, ensure you understand the [Interaction Code flow](/docs/guides/implement-grant-type/interactioncode/main/#interaction-code-flow) so that you can handle possible remediation steps of the interaction. In addition to implementing the remediation steps for those features in your app code, you need to configure authenticators and authentication policies for your app.

To use the SDK to implement these features, see the [Okta Auth JS SDK Interaction Code reference](https://github.com/okta/okta-auth-js/blob/master/docs/idx.md#usage).

To set up your Okta org for these use cases, see:

* [Set up your Okta org for a multifactor use case](/docs/guides/oie-embedded-common-org-setup/nodejs/main/#set-up-your-okta-org-for-a-multifactor-use-case)
* [Set up your Okta org for a social IdP use case](/docs/guides/oie-embedded-common-org-setup/nodejs/main/#set-up-your-okta-org-for-a-social-idp-use-case)

> **Note:** The Admin Console and the Okta API support the Identity Engine org configuration.
