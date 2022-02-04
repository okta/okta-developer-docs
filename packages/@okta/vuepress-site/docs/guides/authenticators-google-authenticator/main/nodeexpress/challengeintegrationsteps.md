### 1: Initiate use case requiring authentication

The first step is to initiate a use case requiring authentication. This guide uses sign-in with username and password, which is initiated with a call to `OktaAuth.idx.authenticate()`.

```javascript
  const transaction = await authClient.idx.authenticate({
    username,
    password,
  });
```

### 2: Display Google Authenticator challenge

If you've configured your Okta org as detailed in [Configuration updates](#update-configurations) and the Google Authenticator has already been [enrolled](#integrate-sdk-for-authenticator-enrollment) for the user, `authenticate()` returns a response indicating Google Authenticator is required for verification. Specifically, `IdxTransaction` is returned with a `status` of `PENDING`, `nextStep.name` set to `challenge-authenticator`, and `nextStep.authenticator` filled with Google Authenticator details. See the following `IdxTransaction` example for more details.

```json
{
  status: "PENDING",
  nextStep: {
    name: "challenge-authenticator",
    inputs: [
      {
        name: "verificationCode",
        label: "Enter code",
        required: true,
        type: "string",
      },
    ],
    type: "app",
    authenticator: {
      type: "app",
      key: "google_otp",
      id: "uftcz6l3mXfBZrngY696",
      displayName: "Google Authenticator",
      methods: [
        {
          type: "otp",
        },
      ],
    },
  },
}
```

Using the `IdxTransaction` properties, show a challenge page displaying a one-time password input field. The sample app constructs this page using [Mustache](https://mustache.github.io/) template.

```xml
<div class="field">
  <div class="ui labeled input">
    <div class="ui label">
      Enter Code
    </div>
    {{#input}}
      <input id="authenticator-code-input" type="{{type}}" name="{{name}}" autoComplete="off" required />
    {{/input}}
  </div>
</div>
<button id="submit-button" class="ui fluid large primary submit button" type="submit">
  Verify
</button>
```

UI showing the one-time password input field.

<div class="common-image-format">

![Google Authenticator input field in UI](/img/authenticators/authenticators-google-challenge-password.png)

</div>

### 3: Get one-time password from Google authenticator

Next, the user opens Google authenticator on their mobile device and finds their one-time password for their account.

<div class="common-image-format">

![Challenge google authenticator UI](/img/authenticators/authenticators-google-one-time-password-fetch.png)

</div>

### 4: Submit one-time password in your app

When the user enters and submits this one-time password, call `OktaAuth.idx.proceed()` passing in the password.

```javascript
  const { verificationCode } = req.body;
  const authClient = getAuthClient(req);
  const transaction = await authClient.idx.proceed({ verificationCode });
  handleTransaction({ req, res, next, authClient, transaction });
```

Depending on how the org is configured, the returned `IdxTransaction` object can either return a status of `PENDING` or `SUCCESS` with access and ID tokens.
