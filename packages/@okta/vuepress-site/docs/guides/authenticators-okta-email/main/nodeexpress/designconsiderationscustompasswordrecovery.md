## Design considerations when customizing magic link for password recovery

### Design overview

If you customize your self-service password recovery solution as described in the <StackSnippet snippet="custompwdguide" inline /> and also initiate password recoveries using the [/forgot_password API](/docs/reference/api/users/#forgot-password), you need to consider how your users interact with your magic links. Specifically, your design has the following attributes:

* The magic link `href` attribute in the **Forgot Password** template has been updated to replace the `${resetPasswordLink}` variable with a URL string that contains the `otp` and `state` parameters using the `${oneTimePassword}` and `${request.relayState}` variables, for example, `http://localhost:8080/login/callback?otp=${oneTimePassword}&state=${request.relayState}`.

* Your system supports password recoveries using methods other than self-service password recovery. These methods include calling the [/forgot_password API](/docs/reference/api/users/#forgot-password) with the `sendEmail` parameter sent to `true` or enabling password recoveries using the Embedded Sign-In Widget. These methods send an email to the user with a magic link meant to continue the password recovery.

### Considerations

In this design, you customize the **Forgot Password** email template to include the `${oneTimePassword}` variable per the <StackSnippet snippet="custompwdguide" inline />. When the [/forgot_password API](/docs/reference/api/users/#forgot-password) and Sign-In Widget are used to initiate the password recovery, an email is sent to the user. When the user clicks the magic link and the request is redirected back to your app, the `otp` value is missing. This is because the password recovery wasn't initiated by the Embedded SDK and doesn't have context. Since the `otp` value is missing, your app can't complete the password reset using the Embedded SDK. Two options are available, however, to complete the password reset with this design. They are:

#### Option 1: Use `resetPasswordLink` variable

In this option, you set the magic link in the **Forgot Password** template to use the `${resetPasswordLink}` variable or include logic that sets it to `${resetPasswordLink}` if `${oneTimePassword}` is empty.

```velocity
#if(${oneTimePassword})
    <a id="reset-password-link" href="http://localhost:8080/login/callback?otp=${oneTimePassword}&state=${request.relayState}">
    ...
#else
    <a id="reset-password-link" href="${resetPasswordLink}" style="text-decoration: none;">
    ...
```

> **Note:** Using `${resetPasswordLink}` sends the user to an Okta-hosted page to sign in. If you're looking for a fully branded experience where you control the page experience, then the next option is a better alternative.

#### Option 2 (Recommended): Use your own infrastructure to send the password recovery email

In this option, make a call to [/forgot_password API](/docs/reference/api/users/#forgot-password) and use your infrastructure to notify the user to reset their password. Specifically, do the following:

1. Call [/forgot_password API](/docs/reference/api/users/#forgot-password) with `sendEmail` equal to `false`. Instead of sending a recovery email to the user, `sendEmail=false` returns a URL with a recovery token.

```json
{
  "resetPasswordUrl": "https://${yourOktaDomain}/signin/reset-password/XE6wE17zmphl3KqAPFxO"
}
```

In the above example, the recovery token is `XE6wE17zmphl3KqAPFxO`.

2. Parse the recovery token from the URL and send it using your infrastructure (through an out-of-band channel) to the end user's verified email address or SMS phone number. See [Authentication API - Recovery Token](/docs/reference/api/authn/#recovery-token).
