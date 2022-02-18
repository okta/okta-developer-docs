1. Create an Okta org and configure it as described in [An Okta org already configured for a password-only use case](/docs/guides/oie-embedded-common-org-setup/aspnet/main/#set-up-your-okta-org-for-a-password-factor-only-use-case).
1. [Set up the SDK and Sign-in Widget](/docs/guides/oie-embedded-common-download-setup-app/aspnet/main/)
1. Build an app with the Embedded Sign-in Widget or SDK.
    * For Sign-in Widget based apps, implement [Basic sign-in flow](docs/guides/oie-embedded-widget-use-case-basic-sign-in/aspnet/main/).
    * For SDK based apps, implement [User Password Recovery](docs/guides/oie-embedded-sdk-use-case-pwd-recovery-mfa/aspnet/main/).
1. If you want to test the flows without building an app, use the provided sample apps, which have prebuilt support for password recovery email customizations.