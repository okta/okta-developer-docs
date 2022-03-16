## Design considerations when customizing magic link for password recovery

### Overview

If you have a customized self-service password recovery experience as described in the [Custom password recovery guide](docs/guides/oie-embedded-sdk-use-case-custom-pwd-recovery-mfa/nodeexpress/main/), you need to consider your design if you've also initiate password recoveries using the [/forgot_password API](). Specifically, your design has the following attributes:

* The magic link `href` attribute in the **Forgot Password** template has been updated to replace the `${resetPasswordLink}` variable with a URL string containing the `otp` and `state` parameters using the `${oneTimePassword}` and `${request.relayState}` variables. An example of the URL string: `http://localhost:8080/login/callback?otp=${oneTimePassword}&state=${request.relayState}`.

* Besides the self-service password recovery where the user initiates the [password recovery using the Embedded SDK](docs/guides/oie-embedded-sdk-use-case-pwd-recovery-mfa/nodeexpress/main/), your system also supports password recoveries using other methods. These methods include calling the [/forgot_password API](/docs/reference/api/users/#forgot-password) with the `sendEmail` parameter sent to `true` or also using the Embedded Sign-in Widget to initiate password recoveries. These methods send an email to the user with a magic link meant to continue the password recovery.

### Considerations
In this design, the other password recovery methods (for example, /forgot_password API
In these other password recovery methods,  the `${oneTimePassword}` variable in the recovery email resolves to an empty string because the user did not initiate the recovery through the Embedded SDK. When the user clicks on the link and redirects to your app, the `otp` value is missing, and your app cannot complete the password reset using the Embedded SDK. As a result, you have two available options:

#### Option 1: Use `resetPasswordLink` variable

In this option you set the magic link in the **Forgot Password** template to use the `${resetPasswordLink}` variable or include logic to only set it to `${resetPasswordLink}` when `${oneTimePassword}` is empty.

```velocity
#if(${oneTimePassword})
    <a id="reset-password-link" href="http://localhost:8080/login/callback?otp=${oneTimePassword}&state=${request.relayState}">
    ...
#else
    <a id="reset-password-link" href="${resetPasswordLink}" style="text-decoration: none;">
    ...
```

> **Note:** Using `${resetPasswordLink}` sends the user to an Okta hosted page to complete the sign-in. If your looking for a fully branded experience where you control the page experience, then [Option 2]() is a better alternative.

#### Option 2 (Recommended): Use your own infrastructure to send the password recovery email

In this option, make a call to [/forgot_password API](/docs/reference/api/users/#forgot-password) and use your own infrastructure to notify the user to reset their password. Specifically, do the following:

1. Call [/forgot_password API](/docs/reference/api/users/#forgot-password) with `sendEmail` equal to `false`. Instead of sending a recovery email to the user, `sendEmail=false` returns a URL with a recovery token.

```json
{
  "resetPasswordUrl": "https://${yourOktaDomain}/signin/reset-password/XE6wE17zmphl3KqAPFxO"
}
```

In the above example, the recovery token is `XE6wE17zmphl3KqAPFxO`. Parse out this token and send it using your infrastructure via an out-of-band channel to the end user's verified email address or SMS phone number. See [Authentication API - Recovery Token](docs/reference/api/authn/#recovery-token) for more information on recovery tokens.
