
### 1: Initiate the sign-in and choose Okta Verify as the authenticator

First, the user initiates the user sign-in with username and password and chooses Okta Verify as the authenticator to enroll in. These steps are shared between enrollment flows and described in [Initiate sign in for Okta Verify enrollment](#initiate-sign-in-for-okta-verify-enrollment).

### 2: Display QR Code and option to select other channels

Display the QR Code using the `IdxTransaction` response from `OktaAuth.idx.proceed()`. In addition, to the QR Code also display a link to choose an alternative enrollment channel (for example, email or SMS). The option to select a different enrollment channel is indicated by the `select-enrollment-channel` value under `Idxtransaction.availableSteps[n].name`.

#### IdxTransaction response

An example `IdxTransaction` response follows:

```json
{
  status: "PENDING",
  availableSteps: [
    {
      name: "select-enrollment-channel",
      inputs: [
      ],
      ...
    },
  ],
  nextStep: {
    name: "enroll-poll",
    inputs: [
    ],
    authenticator: {
      contextualData: {
        qrcode: {
          method: "embedded",
          href: "data:image/png;base64,iVBORw0KGgoAAA...",
          type: "image/png",
        },
        selectedChannel: "qrcode",
      },
    },
    ...
  },
}
```

Using this response build a page to display the QR code and link to alternative enrollment options.

<div class="common-image-format">

![Page showing QR code](/img/authenticators/authenticators-oktaverify-enroll-another-method.png)

</div>

Note that there is polling on this page to determine whether the user scans the QR Code; however, it will be terminated in the next step when the user selects a different enrollment channel.

### 3: Select enroll with another chennel

The user selects the enroll with another method option. Using the  `select-enrollment-channel` value from `IdxTransaction.availableSteps[n].name` in the previous step, pass it to `IdxTransaction.idx.proceed()`.

```javascript
  const authClient = getAuthClient(req);
  const transaction = await authClient.idx.proceed({ step });
  handleTransaction({ req, res, next, authClient, transaction });
```

See the sample app for more details on how to use `IdxTransaction.availableSteps[n].name`.

### 4: Display other available channels

`OktaAuth.idx.proceed()` returns an `IdxTransaction` object containing a list of alternative channels to enroll Okta Verify. A list of these channels are located at `IdxTransaction.availableSteps[n].options`.

```json
{
  status: "PENDING",
  availableSteps: [
    {
      name: "select-enrollment-channel",
      inputs: [
      ],
      options: [
        {
          label: "QRCODE",
          value: "qrcode",
        },
        {
          label: "EMAIL",
          value: "email",
        },
        {
          label: "SMS",
          value: "sms",
        },
      ],
    },
  ]
}

```

Using this response build a page to display the available alternative channels. Use `label` for the display and `value` for the underlying value for each option.

<div class="common-image-format">

![Page showing alternative methods](/img/authenticators/authenticators-oktaverify-enroll-another-method-select.png)

</div>

### 5: Select email

The user selects and submits the email channel. Call `IdxTransaction.idx.proceed()` passing in `email`.

```javascript
  const authClient = getAuthClient(req);
  const transaction = await authClient.idx.proceed({channel,});
```

### 6: Display field to enter email address

Display a field to capture the user's email address. Use `IdxTransaction.nextStep.inputs[n].name` and `IdxTransaction.nextStep.inputs[n].label` values to display the input field.

```json
{
  status: "PENDING",
  nextStep: {
    name: "enrollment-channel-data",
    inputs: [
      {
        name: "email",
        type: "string",
        required: true,
        label: "Email",
      },
    ],
}

```

Example page follows:

<div class="common-image-format">

![Page showing field for enrollment channel](/img/authenticators/authenticators-oktaverify-enrollment-channel-data.png)

</div>

### 7: Submit the email address

After the user enters and submits their email address, call `IdxTransaction.idx.proceed()`, passing in an object-key-value pair with `email` as the key and the email address as the value.

Example of the input parameter:

```javascript
{
  email: "johndoe@email.com",
}
```

Example of the `proceed` call:

```javascript
  const authClient = getAuthClient(req);
  const transaction = await authClient.idx.proceed({
    ...(email && { email }),
    ...(phoneNumber && { phoneNumber })
  });
```

### 8: Send an email with Okta Verify activation link

After the user submits their email, Okta sends an activation link.

### 9: Display page poll SDK while enrollment is ongoing

Display a page informing the user an email was sent to the provided email address. The page polls the SDK to determine when the user clicks on the email link and completes the Okta Verify setup. The polling logic is shared across the different flows and is described in [Polling Okta](#polling-okta).

<div class="common-image-format">

![Page showing notification email has been sent](/img/authenticators/authenticators-oktaverify-enrollment-channel-sent-poll.png)

</div>

### 10: Click on the link in the email and complete Okta Verify setup

The user opens the email and clicks **Activate Okta Verify Push**on their mobile device, which sends them to Okta Verify to complete the account setup.

<div class="common-image-format">

![Page showing notification email has been sent](/img/authenticators/authenticators-oktaverify-enrollment-activate-email.png)

</div>

### 11: Exit polling

After the user completes the setup in Okta Verify, the next call to `OktaAuth.idx.poll()` returns `IdxTransaction` with `nextStep.name` no longer set to `enroll-poll`. Depending on how the policies are configured, `status` equals `PENDING` or `SUCCESS` with tokens. Exit polling when `nextStep.name` is no longer set to `enroll-poll` and continue the sign-in steps. Exiting the polling is described in the [Polling Okta](#polling-okta).

### 12: Complete successful sign in

Eventually, `IdxTransaction` returns a status of `SUCCESS` along with access and ID tokens. The page exits the polling and redirects the user to the default home page for the signed-in user.
