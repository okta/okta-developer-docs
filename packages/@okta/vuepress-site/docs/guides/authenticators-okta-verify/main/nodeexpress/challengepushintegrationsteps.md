### 1: Initiate the sign-in and choose Okta Verify method type

First, the user initiates the user sign-in with username and password and chooses Okta Verify method type. The user chooses a method type (for example push notification or TOTP) which is passed to `IdxTransaction.idx.proceed()`. These first several steps are common across the challange flows and described in [Initiate sign in for Okta Verify challenge](#_1-initiate-use-case-requiring-authentication).

For this flow, the use chooses the push notification method type and the value of `push` is sent to `IdxTransaction.idx.proceed()`.

<div class="common-image-format">

![Screen showing the Challenge Okta Verify page](/img/authenticators/authenticators-oktaverify-challenge-push-sent.png)

</div>

### 2: Start polling for Okta Verify challenge completion

`IdxTransaction.idx.proceed()` returns a `status` of `PENDING` and `nextStep.name` equal to `challenge-poll`, which indicates that the user needs to complete the challenge in Okta Verify and your application should begin to poll the SDK to determine when the challenge is completed.  An example `IdxTransaction` response follows:

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

The polling logic is common across the different flows and the steps involving polling are described in detail in the [Poll the SDK](#poll-the-sdk) section.

### 3. Exit polling when user completes Okta Verify challenge

Once the user completes the Okta Verify challenge, your application should exit the polling. Detail on how to exit the poll is decribed in [Poll the SDK](#poll-the-sdk).

### 4: Complete successful sign in

After the user completes the Okta Verify challnege and any additional sign-in steps, `IdxTransaction` returns a status of `SUCCESS` along with access and ID tokens. The page exits the polling and redirects the user to the default home page for the signed in user.
