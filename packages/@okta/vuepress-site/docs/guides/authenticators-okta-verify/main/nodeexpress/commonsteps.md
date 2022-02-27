The Okta Verify enrollment and challenge flows share steps that are identical to one another. These steps are:

* [Initiate sign-in for Okta Verify enrollment](#initiate-sign-in-for-okta-verify-enrollment)
* [Initiate sign-in for Okta Verify challenge](#initiate-sign-in-for-okta-verify-challenge)
* [Polling Okta](#polling-okta)

A description and step-by-step integration for each of these common steps follows.

### Initiate sign-in for Okta Verify enrollment

The Okta Verify enrollment with [QR Code](#integrate-enrollment-using-qr-code) or [another channel](#integrate-enrollment-using-other-channels) start with identical steps. These steps are as follows:

#### Summary of steps

The following summarizes the sign-in initiation for the Okta Verify enrollment flow:

<div class="common-image-format">

![High level diagram showing the sign-in initiation for enrollment flows](/img/authenticators/authenticators-oktaverify-common-initiate-enrollment.png)

</div>

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

### Initiate sign-in for Okta Verify challenge

The Okta Verify challenge with a [push notification](#integrate-challenge-using-push-notification-option) or [TOTP](#integrate-challenge-using-totp-option) start with identical steps. These steps are as follows:

#### Summary of steps

The following summarizes the sign-in initiation for the Okta Verify challenge flow:

<div class="common-image-format">

![High level diagram showing the sign-in initiation for challenge flows](/img/authenticators/authenticators-oktaverify-common-initiate-challenge.png)

</div>

#### 1: Initiate use case requiring authentication

The first step is to initiate a use case requiring authentication. This guide uses sign-in with username and password, starting with a call to `OktaAuth.idx.authenticate()`.

```javascript
  const transaction = await authClient.idx.authenticate({
    username,
    password,
  });
```

#### 2. Show different options to verify using Okta Verify

Since the user is enrolled in Okta Verify, the next step is to choose a verify option using Okta Verify. Using the `IdxTransaction` response from `OktaAuth.idx.authenticate()`, display a page that displays the available options. The available options are listed under the `IdxTransaction.nextStep.options` array.

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


#### 3. Select an option

When the user selects and submits a verify option, call `IdxTransaction.idx.proceed()` passing in the option value. For TOTP it's `totp` for push notifications it's `push`.

```javascript
  const authClient = getAuthClient(req);
  const transaction = await authClient.idx.proceed({ methodType });
```

### Polling Okta

During Okta Verify enrollment and challenge, the flow steps outside your app as the user performs actions within Okta Verify. While your app waits, it should poll the SDK to determine when the user finishes their tasks within Okta Verify.

#### Polling for Okta Verify Challenge

The following summarizes the polling logic for the Okta Verify challenge flow with a push notification.

##### Summary of steps

The following summarizes the challenge flow polling for a sign-in:

<div class="common-image-format">

![Sequence diagram of polling logic](/img/authenticators/authenticators-oktaverify-common-challenge-poll-okta.png)

</div>

##### 1. Initiate sign-in

First, the user initiates the user sign-in with username and password.

##### 2: Poll Okta to determine when user has completed challenge

After the call to `OktaAuth.idx.authenticate`, the responding `IdxTransaction` object returns a `status` of `PENDING` and `nextStep.name` equal to `enroll-poll`. `enroll-poll` indicates that your app should begin polling the SDK to determine when the user has completed the Okta Verify challenge. Although this example is showing the polling for the Okta Verify challenge with push notification, there are other scenarios where your app is directed to poll. These included the following:  your app should poll. The

###### Other scenarios where your app polls

* During enrollment to determine when the user has completed account setup in the Okta Verify app by scanning the QR code.
* During enrollment to determine when the user has completed account setup in the Okta Verify app using the email or SMS activation link.
* During challenge to determine when the user confirms they are trying to sign in using the Okta Verify app.

Specifically, your app is notified to start polling when the `IdxTransaction` response's properties have the following values:

* **For enrollment flow:** `IdxTransaction.status` equals `PENDING` and `IdxTransaction.nextStep.name` equals `enroll-poll`.
* **For challenge flow:**  `IdxTransaction.status` equals `PENDING` and `IdxTransaction.nextStep.name` equals `challenge-poll`.

###### IdxTransaction response

For this example, `IdxTransaction` response for indicating a poll for an Okta Verify challenge follows:

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

And enrollment flow example follows:

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

###### SDK method to poll

Use `OktaAuth.idx.poll()` to poll Okta to determine the when the user has completed the flows in Okta Verify.

```javascript
const authClient = getAuthClient(req);
const transaction = await authClient.idx.poll();
handleTransactionWithoutRedirect({ req, res, authClient, transaction });
```

#### Polling mechanism

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


##### 3: Complete challenge in Okta Verify

Next, the user completes the challenge in Okta Verify. For the push notification that tap on the "Yes, its me" prompt. For the enrollment flow, the user needs to add their account to Okta Verify using a QR code or other channel such as email or SMS.

#### 4: Exit the poll

Your app should continue polling while `IdxTransaction.status` equals `PENDING` and `IdxTransaction.nextStep.name` equals `enroll-poll` or `challenge-poll`. Once the user completes their Okta Verify actions, those values change and the polling should stop.  Your application should continue handling the next steps in the sign in.

Depending on your app policy, when you exit polling, `IdxTransaction.status` could be set to `PENDING`, `SUCCESS` or `TERMINAL`. `TERMINAL` occurs when the user takes to long to complete the Okta Verify verfication and Okta times out.
