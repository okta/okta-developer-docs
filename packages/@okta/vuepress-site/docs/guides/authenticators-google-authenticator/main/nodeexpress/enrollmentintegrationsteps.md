### 1: Initiate use case requiring authentication

Initiate a use case requiring authentication. This guide uses [basic user sign-in](/docs/guides/oie-embedded-sdk-use-case-basic-sign-in/nodejs/main/), which is initiated with a call to `OktaAuth.idx.authenticate()`.

```javascript
  const transaction = await authClient.idx.authenticate({
    username,
    password,
  });
```

### 2: Display Google Authenticator option

If you've configured your Okta org as detailed in [Configuration updates](#update-configurations), `authenticate()` returns a response with Google Authenticator in the list of available authenticators. Specifically, `IdxTransaction` is returned with a `status` of `PENDING`, `nextStep.name` set to `select-authenticator-enroll`, and Google Authenticator included as an option in the `nextStep.options` array. See the following `IdxTransaction` example for more details.

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

#### Construct UI

Using the `value` and `label` properties, show the available list of authenticators to the user. The sample app constructs a dropdown using a [Mustache](https://mustache.github.io/) template.

```xml
  <select id="authenticator-options" class="ui selection dropdown" name="authenticator">
    {{#options}}
      <option value="{{value}}">{{label}}</option>
    {{/options}}
  </select>
```

UI showing the Google Authenticator option:

<div class="common-image-format">

![Google Authenticator option shown in UI](/img/authenticators/authenticators-google-dropdown-selection.png)

</div>

### 3: Submit Google Authenticator option

When the user selects and submits Google Authenticator, call `OktaAuth.idx.proceed()` passing in the `google_otp` value from `IdxOption.value`.

```javascript
    const transaction = await authClient.idx.proceed({ authenticator });
    handleTransaction({ req, res, next, authClient, transaction });
```

### 4: Display shared secret and QR Code

Next, display the shared secret to the user so they can copy the value to the Google Authenticator app. The response from `OktaAuth.idx.proceed()` allows you to display a string and QR code containing the shared secret. `IdxTransaction` is returned with `authenticator.contextualData.sharedsecret` set to a string of the secret and `authenticator.contextualData.qrcode.href` storing the secret in a base64-encoded PNG image. See the following `IdxTransaction` example for more details.

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

#### Construct UI

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

<div class="common-image-format">

![Shared secret shown in UI](/img/authenticators/authenticators-google-shared-secret.png)

</div>

### 5: Copy shared secret to Google Authenticator

After the shared secret is displayed, the user installs the Google Authenticator app on their mobile device if it's not already installed.  Next, they add the secret code to the Google Authenticator app by either taking a photo of the QR code or manually entering in the secret string. Once added, Google Authenticator displays the time-based one-time password for the newly added account.

<div class="common-image-format">

![Shared secret shown in UI](/img/authenticators/authenticators-google-one-time-password.png)

</div>

### 6: Submit one-time password in your app

The user then copies the one-time password from Google Authenticator to your app. Once the user submits the password, call `OktaAuth.idx.proceed()` passing in the password.

```javascript
  const { verificationCode } = req.body;
  const authClient = getAuthClient(req);
  const transaction = await authClient.idx.proceed({ verificationCode });
  handleTransaction({ req, res, next, authClient, transaction });
```

Depending on how the org is configured, the returned `IdxTransaction` object can either return a status of `PENDING` or `SUCCESS` with access and Id tokens.
