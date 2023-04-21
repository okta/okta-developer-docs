### 1: Initiate the sign-in and choose Okta Verify as the authenticator

First, the user initiates the user sign-in with username and password flow and chooses Okta Verify as the authenticator to enroll in. These steps are common between enrollment flows and are described in [Initiate sign-in flow for Okta Verify enrollment](#initiate-sign-in-flow-for-okta-verify-enrollment).

### 2: Display QR Code

Display the QR Code using the `IdxTransaction` response from `OktaAuth.idx.proceed()`.  In future steps, the user scans this QR Code on their mobile device using Okta Verify.

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

The following table describes the most important `IdxTransaction` properties for this step:

| Property       | Example value | Description                                       |
|----------------|---------------------------------------------------|---------------------------------------------------|
| `IdxTransaction.status` | `PENDING`  | Status of transaction. A value of `PENDING` indicates that Okta is waiting for the user to complete the Okta Verify setup.|
| `IdxTransaction.nextStep.name` | `enroll-poll` | Name of the next step in the sign-in flow. A value of `enroll-poll` indicates that the app should show the QR Code and poll Okta to determine when the user completes the Okta Verify setup.  |
| `IdxTransaction.nextStep.authenticator.contextualData.qrcode.href` | "data:image/png;base64,..." | The QR code Base64-encoded PNG image.

A `IdxTransaction.status` value of `PENDING` and `IdxTransaction.nextStep.name` value of `enroll-poll` signifies that Okta is waiting for the user to add their account to Okta Verify. At this time, your app should start polling to determine when the user completes the Okta Verify account setup.

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

Display a page showing the QR code to the user.

<div class="common-image-format bordered-image">

![Okta Verify option shown in UI](/img/authenticators/authenticators-oktaverify-enroll-qr-code.png)

</div>

### 3: Poll SDK while enrollment is ongoing

`IdxTransaction.status` of `PENDING` and `nextStep.name` equal to `enroll-poll`, indicates that the user needs to complete the challenge in Okta Verify, and your application should begin polling. The polling logic is common across the different flows, and the steps are described in detail in [Polling Okta](#polling-okta).

### 4: Open Okta Verify

Next, the user installs Okta Verify (if not already installed on their device) and opens the app. To learn how to install and use the Okta Verify app, go to the [Okta Help Center](https://help.okta.com/okta_help.htm?id=ext_okta_verify).

### 5: Scan QR Code

After the user opens Okta Verify, they add their account in the app by scanning the QR code on the screen using the device's camera.

### 6: Exit polling

After the user scans the QR code and completes adding their account, the next call to `OktaAuth.idx.poll()` returns `IdxTransaction` with `nextStep.name` no longer set to `enroll-poll`. Depending on how the policies are configured, `status` equals `PENDING` or `SUCCESS` with tokens. Exit the polling when `nextStep.name` is no longer set to `enroll-poll` and continue handling the sign-in steps. Exiting the polling is described in detail in [Polling Okta](#polling-okta).

### 7: Complete successful sign in

Eventually, `IdxTransaction` returns a status of `SUCCESS` along with access and ID tokens. The page exits the polling and redirects the user to the default home page for the signed-in user.
