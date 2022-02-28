
### 1: Initiate the sign-in and choose Okta Verify as the authenticator

First, the user initiates the user sign-in with username and password and chooses Okta Verify as the authenticator to enroll in. Follow the steps in [Initiate sign in for Okta Verify enrollment](#initiate-sign-in-for-okta-verify-enrollment), to learn more about how to integrate these steps.

### 2: Display QR Code and option to select other channels

After the user chooses Okta Verify (which is the last step in [Initiate sign in for Okta Verify enrollment](#initiate-sign-in-for-okta-verify-enrollment), display the QR Code on your page using the `IdxTransaction` response from `OktaAuth.idx.proceed()`. In addition, to the QR Code also display a link for the user to display an alternative enrollment channel (for example, email or SMS). The option to select a different enrollment channel is indicated by the `select-enrollment-channel` value under `Idxtransaction.availableSteps[n].name`.

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

There is polling on this page to determine whether the user scans the QR Code, however, it will be terminated in subsequent steps when the user selects a different enrollment channel.

### 3: Select enroll with another chennel

The user selects the enroll with another method option. Using the  `select-enrollment-channel` value from `IdxTransaction.availableSteps[n].name` in the previous step, pass it to `IdxTransaction.idx.proceed()`.

```javascript
  const authClient = getAuthClient(req);
  const transaction = await authClient.idx.proceed({ step });
  handleTransaction({ req, res, next, authClient, transaction });
```

See the sample app for more details on how to use `IdxTransaction.availableSteps[n].name`.

### 4: Display other available channels

`OktaAuth.idx.proceed()` returns an `IdxTransaction` object containing a list of alternative methods to enroll Okta Verify. A list of these methods are located at `IdxTransaction.availableSteps[n].options`. In subsequent steps, the user will chose an alternative option and Okta will send a link to the selected method.

The response that shows the channel options is shown below:

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

The user selects and submits an alternative channel (in this case email). Call `IdxTransaction.idx.proceed()` passing in the channel name. For email the value is `email`.

```javascript
  const authClient = getAuthClient(req);
  const transaction = await authClient.idx.proceed({channel,});
```

### 6: Display field to enter email address

Display a field for the user to enter the information needed to send the Okta Verify link. In this example, an email input field is displayed. Use `IdxTransaction.nextStep.inputs[n].name` and `IdxTransaction.nextStep.inputs[n].label` values to display the input field.

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

### 6: Submit email address

After the user enters and submits their email address, call `IdxTransaction.idx.proceed()` passing in an object-key-value pair with `email` as the key and the email address as the value.

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

### 7: Send email with Okta Verify activation link

After the user submits their email, Okta sends an email with an activation link.

### 8: Display page and poll for Okta Verify setup completion

Display a page informing the user an email has been sent to the provided email address. The page also polls the SDK to determine when the user has click on the email link and completed the setup in Okta Verify. The polling logic is common across the different flows and the steps are described in detail in [Polling Okta](#polling-okta).

<div class="common-image-format">

![Page showing notification email has been sent](/img/authenticators/authenticators-oktaverify-enrollment-channel-sent-poll.png)

</div>

### 9: Click on the link in the email and complete Okta Verify setup

On their mobile device, the user opens the email and clicks the **Activate Okta Verify Push** email, which sends them to Okta Verify to complete the account setup.

<div class="common-image-format">

![Page showing notification email has been sent](/img/authenticators/authenticators-oktaverify-enrollment-activate-email.png)

</div>

### 10: Exit polling

After the user completes the setup in Okta Verify, the next call to `OktaAuth.idx.poll()` returns `IdxTransaction` with `nextStep.name` no longer set to `enroll-poll`. Depending on how the policy is configured, `status` equals `PENDING` or `SUCCESS` with tokens. Exit the polling when `nextStep.name` is no longer set to `enroll-poll` and continue handling the sign-in steps. Exiting the polling is described in detail in the [Polling Okta](#polling-okta).

### 11: Complete successful sign in

After the user completes the Okta Verify account setup and any additional sign-in steps, `IdxTransaction` returns a status of `SUCCESS` along with access and ID tokens. The page exits the polling and redirects the user to the default home page.
