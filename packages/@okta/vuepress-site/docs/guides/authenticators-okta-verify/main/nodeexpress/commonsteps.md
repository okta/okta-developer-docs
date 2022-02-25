### Initiate sign in for Okta Verify enrollment

Enrolling Okta Verify with QR Code or another channel (for example, email or sms), start with identical steps. These are as follows:

#### 1: Initiate use case requiring authentication

The first step is to initiate a use case requiring authentication. This guide uses sign-in with username and password, starting with a call to `OktaAuth.idx.authenticate()`.

```javascript
  const transaction = await authClient.idx.authenticate({
    username,
    password,
  });
```

#### 2: Display Okta Verify option

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

#### 3: Submit Okta Verify option

When the user selects and submits the Okta Verify option, call `OktaAuth.idx.proceed()` passing in the `okta_verify` value from `IdxOption.value`.

```javascript
    const transaction = await authClient.idx.proceed({ authenticator });
    handleTransaction({ req, res, next, authClient, transaction });
```

### Initiate sign in for Okta Verify challenge

Signing in and being challenged by Okta Verify with a push notification or TOTOP, start with idential steps. These are as follows:

#### 1: Initiate use case requiring authentication

The first step is to initiate a use case requiring authentication. This guide uses sign-in with username and password, starting with a call to `OktaAuth.idx.authenticate()`.

```javascript
  const transaction = await authClient.idx.authenticate({
    username,
    password,
  });
```

#### 2. Show different methods to verify using Okta Verify

Since the user is enrolled in Okta Verify, the next step is to choose a verify method using Okta Verify. Using the `IdxTransaction` response from `OktaAuth.idx.authenticate()`, display a page that displays the available methods. The available methods are listed under the `IdxTransaction.nextStep.options` array.

```json
{
  status: "PENDING",
  nextStep: {
    name: "authenticator-verification-data",
    type: "app",
    options: [
      {
        label: "Enter a code",
        value: "totp",
      },
      {
        label: "Get a push notification",
        value: "push",
      },
    ],
  },
}
```

Build a page that allows the user to choose betwen the available methods.

<div class="common-image-format">

![Page showing notification options](/img/authenticators/authenticators-oktaverify-challenge-options.png)

</div>


#### 3. Select a method type

When the user selects and submits a verify method, call `IdxTransaction.idx.proceed()` passing in the method value. For TOTP it's `totp` for push notifications it's `push`.

```javascript
  const authClient = getAuthClient(req);
  const transaction = await authClient.idx.proceed({ methodType });
```

### Polling Okta

During Okta Verify enrollment and challenge, the flow steps outside your app as the user performs actions within Okta Verify. While your app waits, it should poll the SDK to determine when the user finishes their tasks within Okta Verify.

#### Reasons to poll

Specifically your app should poll the SDK in the following scenarios:

* During enrollment to determine when the user has completed account setup in the Okta Verify app by scanning the QR code.
* During enrollment to determine when the user has completed account setup in the Okta Verify app using the email or SMS activation link.
* During challenge to determine when the user confirms they are trying to sign in using the Okta Verify app.

Your app is notified to start polling when the `IdxTransaction` response's properties have the following values:

* **For enrollment flow:** `IdxTransaction.status` equals `PENDING` and `IdxTransaction.nextStep.name` equals `enroll-poll`.
* **For challenge flow:**  `IdxTransaction.status` equals `PENDING` and `IdxTransaction.nextStep.name` equals `challenge-poll`.

**Enrollment flow example**

An example of the `IdxTransaction` indicating your app should poll follows:

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

**Challenge flow example**

An example of the `IdxTransaction` indicating your app should poll follows:

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

#### SDK method to poll

Use `OktaAuth.idx.poll()` to poll Okta to determine the when the user has completed the flows in Okta Verify.

```javascript
const authClient = getAuthClient(req);
const transaction = await authClient.idx.poll();
handleTransactionWithoutRedirect({ req, res, authClient, transaction });
```

#### Implement polling mechanism

There are many ways to implement polling in your application. The sample application implements it by repeatedly calling the server using client-side javascript. Your poll interval should be pulled from `IdxTransaction.nextStep.refresh` value.

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

#### Exit the poll

Continue polling while `IdxTransaction.status` equals `PENDING` and `IdxTransaction.nextStep.name` equals `enroll-poll` or `challenge-poll`. Once those values change the polling should stop and your application should continue handling the next steps in the sign in. Reasons why these values change include:

* During sign-in the user completes the Okta Verify verfication and there no more steps in the sign-in.  In this scenario, `IdxTransaction.status` equals `SUCCESS`

* During sign-in the user takes to long to complete the Okta Verify verfication and Okta times out.  In this scenario, `IdxTransaction.status` equals `TERMINAL`
