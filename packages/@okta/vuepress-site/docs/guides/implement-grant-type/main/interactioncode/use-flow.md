The Interaction Code flow is intended for developers who want to control the remediation user experience without redirecting the authentication experience to Okta. The Interaction Code flow is used in the [embedded authentication deployment model](/docs/concepts/redirect-vs-embedded/#embedded-authentication) where you can manage the user interaction by leveraging either an Identity Engine SDK or the Sign-In Widget with an Identity Engine SDK.

### Use an SDK

Okta recommends using an Identity Engine SDK with the Sign-In Widget to implement your embedded authentication Interaction Code flow. See [Languages and SDKs](/code/) for information on Identity Engine SDKs that you can download to start using with your app.

> **Note:** Even if you are not using the Sign-In Widget in your final embedded app, the Sign-In Widget can be used to validate and test your defined policies before investing a lot of time on coding the authentication flow.

For instructions on how to install and use Okta Identity Engine SDKs, refer to [Download and set up the SDK, Sign-In Widget, and sample app](/docs/guides/oie-embedded-common-download-setup-app/). You can download Okta sample apps to see how the SDKs are used in your app's framework. See [Examples](#examples) for a list of sample apps.

### Embedded authentication app using the Sign-In Widget and a native Identity Engine SDK

An app integration using the client-hosted [Sign-In Widget](/code/javascript/okta_sign-in_widget/) with an appropriate [Identity Engine SDK](/docs/guides/oie-embedded-common-download-setup-app/) is a simpler way of implementing embedded authentication where most of the remediation process is handled by the Widget. You still have control over the step-by-step remediation user experience by configuring Authenticators and sign-on policies in your Okta org. With the remedial process managed by the Widget, your app just needs to handle the Interaction Code returned from the completed user interaction. See how this flow is built by reviewing the [Build a use case with the embedded Widget](/docs/guides/oie-embedded-widget-use-case-basic-sign-in) guide.

> **Note:** In addition to configuring the Interaction Code grant type in your [authorization server](#set-up-your-authorization-server) and [your app](#enable-interaction-code-grant-on-an-application), ensure that you use the `useInteractionCodeFlow=true` setting when you [initialize the Sign-In Widget](/docs/guides/oie-embedded-common-download-setup-app/-/main/#set-up-the-sign-in-widget-and-sdk-for-your-own-app). Also see [setting up your Okta org](/docs/guides/oie-embedded-common-org-setup/) for typical use case configurations.

### Embedded authentication app using a native Identity Engine SDK

If you have a native or web app, use an appropriate [Identity Engine SDK](/docs/guides/oie-embedded-common-download-setup-app/) to start the Interaction Code flow by initializing the authentication client object and then calling the `authenticate()` method corresponding to the SDK that you are using. The remediation process is implemented by handling the authentication status responses of the authentication client object. See how this flow is built by reviewing the [Build a use case with the embedded SDK](/docs/guides/oie-embedded-sdk-use-case-basic-sign-in/) guide. When the remediation process completes successfully, your app is provided with an Interaction Code to then exchange for OpenID Connect tokens to use for authenticated access to your app’s resources.

> **Note:** The Interaction Code flow remediation experience is dictated by Authenticators and sign-on policies configured in your Okta org. See [set up your Okta org](/docs/guides/oie-embedded-common-org-setup/) for typical use case configurations.
