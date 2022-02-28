### 1: Initiate the sign-in and choose Okta Verify push notification option

First, the user initiates the user sign-in with username and password. If the user is enrolled in Okta Verify, they are shown options to either verify by push notification or TOTP. In this flow, they choose push notification and a value of `push` is sent to
`IdxTransaction.idx.proceed()`. These first steps are common across the challenge flows (with the exception of the challenge option value) and are described in detail in [Initiate sign-in for Okta Verify challenge](#_1-initiate-use-case-requiring-authentication).

### 2: Display page informing user of push notification

Display a page informing the user a push notification has been sent to their Okta Verify app. The page also includes polling logic described in the next step.

<div class="common-image-format">

![Screen showing the Challenge Okta Verify page](/img/authenticators/authenticators-oktaverify-challenge-push-sent.png)

</div>

### 3: Poll until user completes challege

The `IdxTransaction` response from the last step in [Initiate sign-in for Okta Verify challenge](#_1-initiate-use-case-requiring-authentication) indicates that polling should start. Specifically, `IdxTransaction.status` of `PENDING` and `nextStep.name` equal to `challenge-poll`, identifies that the user needs to complete the challenge in Okta Verify and your application should begin polling the SDK to determine when the identity challenge is completed.  The polling logic is common across the different flows and the steps are described in detail in [Polling Okta](#polling-okta).

An example of the `IdxTransaction` response follows:

```json
{
  status: "PENDING",

  nextStep: {
    name: "challenge-poll",
    type: "app",
    authenticator: {
      key: "okta_verify",
      displayName: "Okta Verify",
      methods: [
        {
          type: "push",
        },
      ],
    },
    poll: {
      required: true,
      refresh: 4000,
    },
  },
}
```

### 4: Tap on prompt in Okta Verify

The user opens Okta Verify and taps on the "Yes, its me" prompt in Okta Verify.

### 5: Exit polling

After the user completes the Okta Verify challenge, the next call to `OktaAuth.idx.poll()` returns `IdxTransaction` with `nextStep.name` no longer set to `challenge-poll`. Depending on how the policy is configured, `status` equals `PENDING` or `SUCCESS` with tokens. Exit the polling when `nextStep.name` is no longer set to `challenge-poll` and continue handling the sign-in steps. Exiting the polling is described in detail in [Polling Okta](#polling-okta).

### 6: Complete successful sign in

After the user completes the Okta Verify challnege and any additional sign-in steps, `IdxTransaction` returns a status of `SUCCESS` along with access and ID tokens. The page exits the polling and redirects the user to the default home page for the signed in user.
