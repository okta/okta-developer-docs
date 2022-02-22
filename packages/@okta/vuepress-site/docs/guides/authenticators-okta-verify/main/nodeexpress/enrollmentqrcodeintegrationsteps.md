### 1: Initiate use case requiring authentication

The first step is to initiate a use case requiring authentication. This guide uses sign-in with username and password, starting with a call to `OktaAuth.idx.authenticate()`.

```javascript
  const transaction = await authClient.idx.authenticate({
    username,
    password,
  });
```

### 2: Display Okta Verify option

If you've configured your Okta org as detailed in [Configuration updates](#update-configurations), `authenticate()` returns a response with Okta Verify in the list of available authenticators. Specifically, `IdxTransaction` is returned with a `status` of `PENDING`, `nextStep.name` set to `select-authenticator-enroll`, and Okta Verify is included as an option in the `nextStep.options` array. See the following `IdxTransaction` example for more details.

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
        label: "Okta Verify",
        value: "okta_verify",
      }
    ],
  },
```

Using the `value` and `label` properties, show the available list of authenticators to the user. The sample app constructs a dropdown using a [Mustache](https://mustache.github.io/) template.

```xml
  <select id="authenticator-options" class="ui selection dropdown" name="authenticator">
    {{#options}}
      <option value="{{value}}">{{label}}</option>
    {{/options}}
  </select>
```

UI showing the Okta Verify authenticator option:

<div class="common-image-format">

![Okta Verify option shown in UI](/img/authenticators/authenticators-oktaverify-dropdown-selection.png)

</div>

### 3: Submit Okta Verify option

When the user selects and submits the Okta Verify option, call `OktaAuth.idx.proceed()` passing in the `okta_verify` value from `IdxOption.value`.

```javascript
    const transaction = await authClient.idx.proceed({ authenticator });
    handleTransaction({ req, res, next, authClient, transaction });
```

### 4: Display QR Code

Next, using the response from `OktaAuth.idx.proceed()`, display the QR Code so the user can scan it on their mobile device using Okta Verify.

#### IdxTransaction response

An example `IdxTransaction` response follows:

```json
{
  status: "PENDING",
  nextStep: {
    name: "enroll-poll",
    inputs: [
    ],
    authenticator: {
      contextualData: {
        qrcode: {
          method: "embedded",
          href: "data:image/png;base64,iVBORw0...",
          type: "image/png",
        },
        selectedChannel: "qrcode",
      },
      key: "okta_verify",
      displayName: "Okta Verify",
    },
    poll: {
      required: true,
      refresh: 4000,
    },
  },
}
```

The following table describes the most important `IdxTransaction` properities for this step:

| Property       | Example value | Description                                       |
|----------------|---------------------------------------------------|---------------------------------------------------|
| `IdxTransaction.status` | `PENDING`  | Status of transaction. A value of `PENDING` at this step indicates Okta is waiting for the user to complete the Okta Verify setup.|
| `IdxTransaction.nextStep.name` | `enroll-poll` | Name of the next step in the sign-in. A value of `enroll-poll` indicates the app should show the QR Code and poll Okta to determine when the user has completed the Okta Verify setup.  |
| `IdxTransaction.nextStep.authenticator.contextualData.qrcode.href` | "data:image/png;base64,..." | The QR code base64 encoded PNG image.

A `IdxTransaction.status` value of `PENDING` and `IdxTransaction.nextStep.name` value of `enroll-poll` signifies that Okta is waiting for the user to add the new account to Okta Verify.  At this time, your app should start polling to determine when the user has completed the Okta Verify account setup.

#### Render the QR Code

The following [Mustache](https://mustache.github.io/) template snippet shows how the sample app displays the QR code.

```html
<div class="ui segment">
    <div class="ui fluid image">
      <img id="authenticator-qr-code" src="{{contextualData.qrcode.href}}" />
    </div>
</div>
```

#### Display page with QR code

Display a page showing the QR code to the user. Example page from the sample app shown follows:

<div class="common-image-format">

![Okta Verify option shown in UI](/img/authenticators/authenticators-oktaverify-enroll-qr-code.png)

</div>

### 6: Poll until user completes Okta Verify account setup

While the QR code is displayed, repeatedly call `OktaAuth.idx.poll()` to determine when the user has completed the Okta Verify account setup. The call looks like the following:

```javascript
const authClient = getAuthClient(req);
const transaction = await authClient.idx.poll();
handleTransactionWithoutRedirect({ req, res, authClient, transaction });
```

Continue the poll while `IdxTransaction.status` equals `PENDING` and `IdxTransaction.nextStep.name` equals `enroll-poll`. Example `IdxTransaction` follows:

```json
{
  status: "PENDING",
  nextStep: {
    name: "enroll-poll",
    inputs: [
    ],
    authenticator: {
      contextualData: {
        qrcode: {
          method: "embedded",
          href: "data:image/png;base64,iVBORw0KGgoAA...",
          type: "image/png",
        },
        selectedChannel: "qrcode",
      }
      ...
    },
    poll: {
      required: true,
      refresh: 4000,
    },
  },
}
```

#### Example client-side polling logic

The sample application implements this polling by repeatedly calling the server using client-side javascript. The poll uses a call interval pulled from the `IdxTransaction.nextStep.refresh` value. The polling logic is as follows:

```javascript
poll('/poll-authenticator/okta_verify?state=86b19cae436da12fbc334060ac00bcac', 4000);

function poll(url, refresh) {
  setTimeout(function () {
    fetch(url, {
      method: 'POST'
    }).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        console.error('Poll request failed: ', response.statusText);
      }
    })
    .then(nextStep => {
      if (nextStep.poll) {
        poll(url, nextStep.poll.refresh);
      } else {
        window.location.href = nextStep.nextRoute;
      }
    });
  }, refresh);
}
```

### 7: Install and open Okta Verify

Next, the user installs Okta Verify (if not already installed on their device) and opens the app. To learn how to install and use the Okta Verify app, go to the [Okta Help Center](https://help.okta.com/en/prod/Content/Topics/Mobile/okta-verify-overview.htm).

### 8: Scan QR Code

Once Okta Verify is installed and opened, the user adds the account in the app by scanning the QR code on the screen using the device's camera. After the user scans the QR code and completes adding the account, the next call to `OktaAuth.idx.poll()` returns `IdxTransaction` with `nextStep.name` no longer set to "enroll-poll". Depending on how the policy is configured, `status` equals `PENDING` or `SUCCESS` with tokens. Exit the polling when `nextStep.name` is no longer set to `enroll-poll` and continue handling the sign-in steps.

#### Example scenarios and responses

Example scenarios which results in exiting the polling are as follows:

* The user completes the OKta Verify setup and additional optional authenticators return. An example `IdxTransaction` response object of this scenario follows:

```json
{
  status: "PENDING",
  nextStep: {
    name: "select-authenticator-enroll",
    options: [
      {
        label: "Email",
        value: "okta_email",
      },
      ...
    ],
    canSkip: true,
  },
}
```

* The user completes the Okta Verify setup, no additional authenticators return, and the sign-in is successful with returned tokens. An example `IdxTransaction` response object of this scenario follows:

```json
{
  status: "SUCCESS",
  tokens: {
    accessToken: {
      accessToken: "eyJraWQiOiJTaj...",
      claims: {
        ...
      },
      scopes: [
        ..
      ],
    },
    idToken: {
      idToken: "eyJraWQiOiJTajV3c...",
      claims: {
       ...
      },
    },
  },
  interactionCode: "9Ov5tpWNYHGaGvXALFpot...",
}
```

* The user doesn't set up their account on Okta verify fast enough, and the sign terminates. An example `IdxTransaction` response object of this scenario follows:

```json
{
  status: "TERMINAL",
  ...
}
```

### 8: Complete successful sign in

After the user completes the Okta Verify account setup and any additional sign-in steps, `IdxTransaction` returns a status of `SUCCESS` along with access and ID tokens.
