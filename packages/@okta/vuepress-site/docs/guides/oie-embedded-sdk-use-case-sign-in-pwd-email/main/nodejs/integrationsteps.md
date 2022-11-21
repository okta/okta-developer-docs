### 1: Your app displays the sign-in page

Create a sign-in page that captures the user's username and password:

<div class="half border">

![A sign-in page with username and password fields and a Sign in button](/img/oie-embedded-sdk/wireframes/pwd-optional-sign-up-link-sign-in-page-g1r7.png)

</div>

> **Note**: The account's username is also its primary email address.

### 2: The user submits their username and password

When the user submits their `username` and `password`, pass them as parameters to `OktaAuth.idx.authenticate()`.

```javascript
const authClient = getAuthClient(req);
const transaction = await authClient.idx.authenticate({ username, password });
```

### 3: Your app displays a list of authenticators

`OktaAuth.idx.authenticate()` returns an `IdxTransaction` object with a status of `PENDING` and `nextStep.name` of `select-authenticator-authenticate`. This indicates that the user has supplied the correct password and must select a secondary authentication factor to verify their identity.

```javascript
{
   status: "PENDING",
   nextStep: {
      name: "select-authenticator-authenticate",
      inputs: [
         {
         name: "authenticator",
         type: "string",
         },
      ],
      options: [
         {
            label: "Email",
            value: "okta_email",
         },
         {
            label: "Phone",
            value: "okta_phone",
         }
      ],
   },
}
```

Display all the authenticators the user has enrolled and are ready for use. You can find the names and IDs of the available authenticators in the `options` array.

<div class="half border">

![A Choose Your Authenticator page with the choices of email and phone, and a Next button](/img/oie-embedded-sdk/wireframes/choose-authenticator-email-phone-form-g2r28.png)

</div>

### 4: The user submits the email authenticator

When the user submits the email authenticator, pass the authenticator's ID as a parameter to `OktaAuth.idx.authenticate()`.

```javascript
const transaction = await authClient.idx.authenticate({ authenticatorId });
handleTransaction({ req, res, next, authClient, transaction });
```

### 5: The user verifies their identity with the email authenticator

Identity Engine sends a verification email to the user if the call is successful. The returned `IdxTransaction` object has a status of `PENDING` and `nextStep.name` of `challenge-authenticator`. This status indicates that Identity Engine is waiting for the user to check their email and either click the magic link or enter the OTP.

To learn how to support verification with magic links or OTP, see the [Okta email integration guide](/docs/guides/authenticators-okta-email/nodeexpress/main/#_3-display-otp-input-page).

### 6: Your app handles an authentication success response

When the user correctly verifies their identity using the email authenticator, the returned `IdxTransaction` object has a status of `SUCCESS`, along with ID and access tokens. The user has now signed in.

```javascript
{
  status: "SUCCESS",
  tokens: {
    accessToken: {
      accessToken: "eyJraWQiOiJLSWdvVHlt...",
      expiresAt: 1656106249,
      tokenType: "Bearer",
    },
    idToken: {
      idToken: "eyJraWQiOiJLSWdvVHltSGlL...",
      expiresAt: 1656106249,
    },
  },
}
```

Store these tokens for future requests and redirect the user to the default page after a successful sign-in attempt.

> **Note**: You can request basic user information from Okta's OpenID Connect authorization server after a user has signed in successfully. See [Get the user profile information](/docs/guides/oie-embedded-sdk-use-case-basic-sign-in/nodejs/main/#integration-steps).
