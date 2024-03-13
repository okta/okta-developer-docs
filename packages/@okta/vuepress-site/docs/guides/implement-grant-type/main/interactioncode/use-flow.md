The Interaction Code flow is intended for developers who want to embed the authentication process in their apps rather than redirect it to Okta. Implement it in the [embedded authentication deployment model](/docs/concepts/redirect-vs-embedded/#embedded-authentication) using an Identity Engine SDK either alone or with the Sign-In Widget.

### Use an SDK

Okta recommends using an Identity Engine SDK with the Sign-In Widget to implement your embedded authentication Interaction Code flow. See [Languages and SDKs](/code/) for information on Identity Engine SDKs that you can download to start using with your app.

> **Note:** Consider using the Sign-In Widget to test your authentication policies even if you don’t plan to use it in production. It’s quicker to embed it in a test app than code the whole flow from scratch.

For instructions on how to install and use Identity Engine SDKs, see [Download and set up the SDK, Sign-In Widget, and sample app](/docs/guides/oie-embedded-common-download-setup-app/). Each Identity Engine SDK contains its own example applications with embedded authentication. See [Examples](#examples).

### Apps using an embedded Sign-In Widget and Identity Engine SDK

An app integration using the client-hosted [Sign-In Widget](/code/javascript/okta_sign-in_widget/) with an appropriate [Identity Engine SDK](/docs/guides/oie-embedded-common-download-setup-app/) is a simpler way of implementing embedded authentication where the widget handles most of the remediation process. You still have control over the step-by-step remediation user experience by configuring authenticators and sign-on policies in your Okta org. With the remedial process managed by the widget, your app just needs to handle the Interaction Code returned from the completed user interaction. See how this flow is built by reviewing the [Build a use case with the embedded Widget](/docs/guides/oie-embedded-widget-use-case-basic-sign-in) guide.

In addition to configuring the Interaction Code grant type in your [authorization server](#set-up-your-authorization-server) and [your app](#enable-interaction-code-grant-on-an-application), make sure you’re using the interaction code flow when you [initialize the Sign-In Widget](/docs/guides/oie-embedded-common-download-setup-app/-/main/#set-up-the-sign-in-widget-and-sdk-for-your-own-app):

* In Okta Sign-In Widget version 7+, Identity Engine is enabled by default, so there are no additional steps to take.
* If you’re using an earlier version than 7, you must explicitly enable Identity Engine features by setting `useInteractionCodeFlow: true` in the config.

> **Note**: For typical use case configurations, see [setting up your Okta org](/docs/guides/oie-embedded-common-org-setup/).

### Apps using an embedded Identity Engine SDK only

If you have a platform-specific app, use an appropriate [Identity Engine SDK](/docs/guides/oie-embedded-common-download-setup-app/) to start the Interaction Code flow by initializing the authentication client object and then calling the `authenticate()` method corresponding to the SDK that you are using. The remediation process is implemented by handling the authentication status responses of the authentication client object. See how this flow is built by reviewing the [Build a use case with the embedded SDK](/docs/guides/oie-embedded-sdk-use-case-basic-sign-in/) guide. When the remediation process succeeds, Identity Engine sends your app an Interaction Code to exchange for OIDC tokens. Your app uses these tokens to access to your app’s resources.

> **Note:** The authentication policies defined in your org configure the Interaction Code flow remediation experience in your app. See [set up your Okta org](/docs/guides/oie-embedded-common-org-setup/).
