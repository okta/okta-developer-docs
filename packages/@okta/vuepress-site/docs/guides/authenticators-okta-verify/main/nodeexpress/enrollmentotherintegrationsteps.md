
### 1: Initiate the sign-in choose Okta Verify as the authenticator

First, the user initiates the user sign-in with username and password and chooses Okta Verify as the authetnicator to enroll in. These steps are described in [Initiate sign in for Okta Verify enrollment](#initiate-sign-in-for-okta-verify-enrollment).

### 2: Display QR Code and option to select other channels

Next, using the `IdxTransaction` response from `OktaAuth.idx.proceed()`, display the QR code and an option to choose alternative enrollment channels other than the QR code.

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

Using this response build a page to display the QR code and link to alternative methods to enroll.

<div class="common-image-format">

![Page showing QR code](/img/authenticators/authenticators-oktaverify-enroll-another-method.png)

</div>

### 3: Select enroll with another method

The user selects the enroll with another method option. Using the  `select-enrollment-channel` value from `IdxTransaction.availableSteps[n].name` in the previous step, pass it to `IdxTransaction.idx.proceed()`.

```javascript
  const authClient = getAuthClient(req);
  const transaction = await authClient.idx.proceed({ step });
  handleTransaction({ req, res, next, authClient, transaction });
```

See the sample app for more details on how to use `IdxTransaction.availableSteps[n].name`.

### 4: Display other available methods

`OktaAuth.idx.proceed()` returns an `IdxTransaction` object containing a list of alternative methods to enroll Okta Verify. A list of these methods are located at `IdxTransaction.availableSteps[n].options`. In subsequent steps, Okta will send a link to the selected method such as through email or SMS.

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

Using this response build a page to display the available alternative methods. Use `label` for the display and `value` for the underlying value for each option.

<div class="common-image-format">

![Page showing alternative methods](/img/authenticators/authenticators-oktaverify-enroll-another-method-select.png)

</div>

### 5: Select email as method

The user selects and submits an alternative method (in this case email). Call `IdxTransaction.idx.proceed()` passing in the method name. For email the value is `email`.

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



### 7: Submit email address

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

### 8: Send email with Okta Verify activation link

After the user submits their email, Okta sends an email with an activation link.

### 9: Display page and poll for completion of Okta Verify setup

Display a page informing the user an email has been sent to the provided email address. The page also polls Okta to determine when the user has click on the link in their email and completed the Okta Verify Setup. This polling logic has already been covered in Step 6: Poll until user completes Okta Verify account setup. See that step for more details.

<div class="common-image-format">

![Page showing notification email has been sent](/img/authenticators/authenticators-oktaverify-enrollment-channel-sent-poll.png)

</div>

### 10: Click on the link in the email

On their mobile device, the user opens the email and clicks the **Activate Okta Verify Push** email which sends them to Okta Verify to complete the account setup.

<div class="common-image-format">

![Page showing notification email has been sent](/img/authenticators/authenticators-oktaverify-enrollment-activate-email.png)

</div>

### 11: Complete successful sign in

After the user completes the Okta Verify account setup and any additional sign-in steps, `IdxTransaction` returns a status of `SUCCESS` along with access and ID tokens. The page exits the polling and redirects the user to the default home page.
