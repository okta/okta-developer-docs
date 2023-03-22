### 1: Initiate use case requiring authentication

The first step is to initiate a use case that requires authentication. This guide uses a sign-in with username and password flow that is initiated with a call to `OktaAuth.idx.authenticate()`.

```javascript
  const transaction = await authClient.idx.authenticate({
    username,
    password,
  });
```

### 2: Display Google Authenticator option

If you configure your Okta org as detailed in [Configuration updates](#update-configurations), `authenticate()` returns a response with Google Authenticator in the list of available authenticators. Specifically, `IdxTransaction` is returned with a `status` of `PENDING`, `nextStep.name` set to `select-authenticator-enroll`, and Google Authenticator is included as an option in the `nextStep.options` array. See the following `IdxTransaction` example.

```json
{
  status: "PENDING",
  nextStep: {
    name: "select-authenticator-enroll",
    inputs: [
      {
        name: "authenticator",
        key: "string",
      },
    ],
    options: [
      {
        label: "Google Authenticator",
        value: "google_otp",
      }
    ],
  },
}
```

Use the `value` and `label` properties to show the available list of authenticators to the user. The sample app constructs a dropdown list using a [Mustache](https://mustache.github.io/) template.

```xml
  <select id="authenticator-options" class="ui selection dropdown" name="authenticator">
    {{#options}}
      <option value="{{value}}">{{label}}</option>
    {{/options}}
  </select>
```

UI showing the Google Authenticator option:

<div class="three-quarter">

![Google Authenticator option shown in UI](/img/authenticators/authenticators-google-dropdown-selection.png)

</div>

### 3: Submit Google Authenticator option

When the user selects and submits Google Authenticator, call `OktaAuth.idx.proceed()` and passes in the `google_otp` value from `IdxOption.value`.

```javascript
    const transaction = await authClient.idx.proceed({ authenticator });
    handleTransaction({ req, res, next, authClient, transaction });
```

### 4: Display shared secret and QR Code

Next, display the shared secret to the user so they can copy the value to the Google Authenticator app. The response from `OktaAuth.idx.proceed()` allows you to display a string and QR code that contains the shared secret. `IdxTransaction` is returned with `authenticator.contextualData.sharedsecret` set to a string of the secret and `authenticator.contextualData.qrcode.href` stores the secret in a Base64-encoded PNG image. See the following `IdxTransaction` example.

``` json
{
  status: "PENDING",
  nextStep: {
    name: "enroll-authenticator",
    inputs: [
      {
        name: "verificationCode",
        ...
      },
    ],
    type: "app",
    authenticator: {
      contextualData: {
        qrcode: {
          method: "embedded",
          href: "data:image/png;base64,iVBORw0KGgoAAAANSUh ... ",
          type: "image/png",
        },
        sharedSecret: "6BCSPLSQTAYWOCDX",
      },
      ...
    },
  },
}
```

The following [Mustache](https://mustache.github.io/) template snippet shows how the sample app displays the QR code and shared secret string.

```xml
    <div class="ui segment">
      {{#contextualData.qrcode}}
        <div class="ui fluid image">
          <img id="authenticator-qr-code" src="{{contextualData.qrcode.href}}" />
        </div>
      {{/contextualData.qrcode}}
    </div>
    <div class="ui segment">
      {{#contextualData.sharedSecret}}
        <div class="ui label">SharedSecret: </div>
        <p id="authenticator-shared-secret">{{contextualData.sharedSecret}}</p>
      {{/contextualData.sharedSecret}}
    </div>
```

Example UI showing the Google Authenticator in the dropdown list:

<div class="three-quarter">

![Shared secret shown in UI](/img/authenticators/authenticators-google-shared-secret.png)

</div>

### 5: Copy shared secret to Google Authenticator

After the shared secret appears, the user installs the Google Authenticator app on their mobile device if it's not already installed. Next, they add the secret code to the Google Authenticator app by either taking a photo of the QR code or manually entering in the secret string. After it's added, Google Authenticator displays the time-based one-time passcode for the newly added account.

<div class="half">

![Shared secret shown in UI](/img/authenticators/authenticators-google-one-time-password.png)

</div>

### 6: Submit one-time passcode in your app

The user then copies the one-time passcode from Google Authenticator to your app. After the user submits the password, call `OktaAuth.idx.proceed()` and pass in the password.

```javascript
  const { verificationCode } = req.body;
  const authClient = getAuthClient(req);
  const transaction = await authClient.idx.proceed({ verificationCode });
  handleTransaction({ req, res, next, authClient, transaction });
```

Depending on how the org is configured, the returned `IdxTransaction` object can either return a status of `PENDING` or `SUCCESS` with access and ID tokens.
