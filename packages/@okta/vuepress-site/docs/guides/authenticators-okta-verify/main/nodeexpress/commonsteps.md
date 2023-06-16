Since several steps in the enrollment and challenge flows are nearly identical, it's recommended to componentize the logic to reduce duplicate code and increase reusability. Specifically, the common areas include:

* [Initiate sign-in flow for Okta Verify enrollment](#initiate-sign-in-flow-for-okta-verify-enrollment)
* [Initiate sign-in flow for Okta Verify challenge](#initiate-sign-in-flow-for-okta-verify-challenge)
* [Polling Okta](#polling-okta)

A description and step-by-step integration for each of these common steps follow.

### Initiate sign-in flow for Okta Verify enrollment

The [enrollment with the QR Code](#integrate-enrollment-using-qr-code) and [enrollment with another channel](#integrate-enrollment-using-other-channels) flows both start with the same three steps that enable a user to sign in and start to enroll Okta Verify. The following diagram shows this common flow:

<div class="common-image-format">

![High level diagram showing the sign-in initiation for enrollment flows](/img/authenticators/authenticators-oktaverify-common-initiate-enrollment.png)

</div>

#### 1: Initiate use case requiring authentication

The first step is to initiate a use case that requires authentication. This guide uses the sign-in with username and password flow, starting with a call to `OktaAuth.idx.authenticate()`.

```javascript
  const transaction = await authClient.idx.authenticate({
    username,
    password,
  });
```

#### 2: Display Okta Verify option

If you've configured your Okta org as detailed in [Update Configurations](#update-configurations), `authenticate()` returns a response with Okta Verify in the list of available authenticators. Specifically, `IdxTransaction` is returned with a `status` of `PENDING`, `nextStep.name` set to `select-authenticator-enroll`, and Okta Verify is included as an option in the `nextStep.options` array. See the following `IdxTransaction` example.

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

Using the `value` and `label` properties, show the available list of authenticators to the user. The sample app constructs a dropdown list using a [Mustache](https://mustache.github.io/) template.

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

When the user selects and submits the Okta Verify option, call `OktaAuth.idx.proceed()` and pass in the `okta_verify` value from `IdxOption.value`.

```javascript
    const transaction = await authClient.idx.proceed({ authenticator });
    handleTransaction({ req, res, next, authClient, transaction });
```

At this point, the next steps differ between [enrolling with a QR code](#integrate-enrollment-using-qr-code) and with [other channels](#integrate-enrollment-using-other-channels). Go to the specific flows to understand how.

### Initiate sign-in flow for Okta Verify challenge

The [challenge with push notification](#integrate-challenge-using-push-notification-option) and [challenge with TOTP](#integrate-challenge-using-totp-option) flows both start with the same three steps that enable a user to enter their username and password and then authenticate themselves with Okta Verify. The following diagram shows this common flow:

<div class="common-image-format">

![High level diagram showing the sign-in initiation for challenge flows](/img/authenticators/authenticators-oktaverify-common-initiate-challenge.png)

</div>

#### 1: Initiate use case requiring authentication

The first step is to initiate a use case requiring authentication. This guide uses the sign-in with username and password flow, starting with a call to `OktaAuth.idx.authenticate()`.

```javascript
  const transaction = await authClient.idx.authenticate({
    username,
    password,
  });
```

#### 2. Show available options to challenge using Okta Verify

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

Build a page that allows the user to choose between the available methods.

<div class="common-image-format">

![Page showing notification options](/img/authenticators/authenticators-oktaverify-challenge-options.png)

</div>

#### 3. Select an option

When the user selects and submits a verify option, call `IdxTransaction.idx.proceed()` and pass in the option value. For TOTP, it's `totp,` and for push notifications, it's `push`.

```javascript
  const authClient = getAuthClient(req);
  const transaction = await authClient.idx.proceed({ methodType });
```

At this point, the next steps differ between challenging a user using [push notifications](#integrate-challenge-using-push-notification-option) and using a [TOTP](#integrate-challenge-using-totp-option) option. Go to the specific flows to understand how.

### Polling Okta

Polling is used during the [enrollment using QR code](#integrate-enrollment-using-qr-code), [enrollment using other channels](#integrate-enrollment-using-other-channels), and [challenge using push notification](#integrate-challenge-using-push-notification-option) flows to determine when the user completes the verification action in Okta Verify.

The user steps out of your app during these flows to complete actions within Okta Verify. While your app waits for the user, it should poll the SDK to determine when they finish with Okta Verify. Using the Okta Verify challenge as an example, the following steps detail integrating this polling logic. Note that the steps can also apply to the other flows with slight modifications.

#### Summary of steps

The following summarizes the polling logic for the Okta Verify challenge flow with a push notification.

<div class="common-image-format">

![Sequence diagram of polling logic](/img/authenticators/authenticators-oktaverify-common-challenge-poll-okta.png)

</div>

#### 1. Initiate the sign-in flow

First, the user initiates the user sign-in with username and password.

#### 2: Poll Okta to determine when the user completes the challenge

After the call to `OktaAuth.idx.authenticate`, the responding `IdxTransaction` object returns a `status` of `PENDING` and `nextStep.name` equal to `challenge-poll`. `challenge-poll` indicates that your app should begin polling the SDK to determine when the user completes the Okta Verify challenge.

##### Enrollment scenarios

For enrollment flows outside of this specific example, your application should start polling when `IdxTransaction` returns a `status` of `PENDING` and `nextStep.name` equal to `enroll-poll`.

##### IdxTransaction response

An `IdxTransaction` response for this example:

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

##### SDK method to poll

Use `OktaAuth.idx.poll()` to determine when the user completes the challenge in Okta Verify.

```javascript
const authClient = getAuthClient(req);
const transaction = await authClient.idx.poll();
handleTransactionWithoutRedirect({ req, res, authClient, transaction });
```

This method is the same for challenge and enrollment flows.

##### Polling mechanism

There are many ways to implement polling in your application. The sample application implements it by repeatedly calling the server using client-side javascript. Your poll interval should be pulled from the `IdxTransaction.nextStep.refresh` value. See the following example code:

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

#### 3: Complete challenge in Okta Verify

Next, the user completes the challenge in Okta Verify by tapping the **Yes, it's me** prompt.

#### 4: Exit polling

Your app should continue polling while `IdxTransaction.status` equals `PENDING` and `IdxTransaction.nextStep.name` equals `challenge-poll`. After the user completes the challenge, the `IdxTransaction` properties change, the polling should stop, and your application should continue handling the next steps in the sign-in flow.

Depending on your app policy, when you exit polling, `IdxTransaction.status` could be set to `PENDING`, `SUCCESS` or `TERMINAL`. `TERMINAL` occurs when the user takes too long to complete the Okta Verify verification and Okta times out.
