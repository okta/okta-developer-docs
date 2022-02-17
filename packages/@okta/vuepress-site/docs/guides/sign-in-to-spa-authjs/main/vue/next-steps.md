After you complete a basic-sign flow for the Vue.js app, you can extend your app's sign-in experience by adding features such as multifactor, self-registration, or social IdP authentication. For each of these uses cases, you need to thoroughly understand the [Interaction Code flow](/docs/guides/implement-grant-type/interactioncode/main/#interaction-code-flow) to handle all the possible remediation steps of the interaction. In addition to implementing the remediation steps for these use cases in your app code, you need to configure your Okta org and the sign-on policies for your app.

* See [Set up your Okta org for a multifactor use case](/docs/guides/oie-embedded-common-org-setup/nodejs/main/#set-up-your-okta-org-for-a-multifactor-use-case).
* See [Set up your Okta org for a social IdP use case](/docs/guides/oie-embedded-common-org-setup/nodejs/main/#set-up-your-okta-org-for-a-social-idp-use-case).

> **Note**: Okta org configuration is supported by the Admin Console and by the Okta API.

Review the following embedded deployment model use cases for insight on how the Interaction Code flow is used for a web application:

* See [Build a use case with the embedded SDK > Sign in with Facebook](/docs/guides/oie-embedded-sdk-use-case-sign-in-soc-idp/) for an implementation of a social IdP authentication use case.
* See [Build a use case with the embedded SDK > User password recovery](/docs/guides/oie-embedded-sdk-use-case-pwd-recovery-mfa/) for an implementation of a password recovery use case.
* See [Build a use case with the embedded SDK > Self-service registration](/docs/guides/oie-embedded-sdk-use-case-self-reg/) for an implementation of a self-registration use case.
* See [Build a use case with the embedded SDK > Sign in with password and email factors](/docs/guides/oie-embedded-sdk-use-case-sign-in-pwd-email/) for an implementation of a multifactor use case.

> **Note**: For uses cases that require a callback route for email magic link or for social IdP redirect, the [Okta Vue SDK](https://github.com/okta/okta-vue) provides the [LoginCallback](https://github.com/okta/okta-vue#use-the-logincallback-component) component. This component handles token parsing, token storage, and redirecting to a protected page after a user is authenticated.
