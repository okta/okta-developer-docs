### 1: Initiate the sign-in and choose Okta Verify TOTP option

First, the user initiates the user sign-in with username and password. If the user is enrolled in Okta Verify, they are shown options to either verify by push notification or TOTP. In this flow, they choose TOTP and a value of `totp` is sent to
`IdxTransaction.idx.proceed()`. These first steps are common across the challenge flows (with the exception of the challenge option value) and are described in detail in [Initiate sign-in for Okta Verify challenge](#_1-initiate-use-case-requiring-authentication).

For this flow, the use chooses the push notification method type and the value of `totp` is sent to `IdxTransaction.idx.proceed()`.

### 2: Display page to input TOTP

The `IdxTransaction` response from the last step in [Initiate sign-in for Okta Verify challenge](#_1-initiate-use-case-requiring-authentication) indicates that the user needs to enter a TOTP code in your app. Specifically `IdxTransaction.idx.proceed()` returns a `status` of `PENDING` and `nextStep.name` equal to `challenge-authenticator`, which indicates that the user needs to lookup the TOTP in Okta Verify and enter the value in your app.  An example `IdxTransaction` response follows:

```json
{
{
  status: "PENDING",
  nextStep: {
    name: "challenge-authenticator",
    inputs: [
      {
        name: "verificationCode",
        label: "Enter code",
      },
    ],
  },
}
```

Using the `IdxTransaction` response display a page to input the TOTP.

<div class="common-image-format">

![Page displaying TOTP input field](/img/authenticators/authenticators-oktaverify-challenge-otp.png)

</div>


### 3. Submit the TOTP

After the user enters and submits the TOTP, call `IdxTransaction.idx.proceed()` passing in the verification code.

```javascript
  const { verificationCode } = req.body;
  const authClient = getAuthClient(req);
  const transaction = await authClient.idx.proceed({ verificationCode });
```

### 4: Complete successful sign-in

Once the verification code is validated, `IdxTransaction.idx.proceed()` returns a `IdxTransaction` object with a status of `SUCCESS` along with access and ID tokens. The user is redirected to the default home page.
