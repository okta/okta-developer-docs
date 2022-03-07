### 1. Initiate sign in

```javascript
  const authClient = getAuthClient(req);
  const transaction = await authClient.idx.authenticate({ username,password});
```

### 2. Send email


### 3. Show Email OTP page

```json
{
  status: "PENDING",
  nextStep: {
    name: "challenge-authenticator",
    inputs: [
      {
        name: "verificationCode",
        label: "Enter code",
        type: "string",
      },
    ],
    type: "email",
    authenticatorEnrollments: [
      {
        profile: {
          email: "johndoe@gmail.com",
        },
        type: "email",
        key: "okta_email",
        displayName: "Email",
      },
    ],
  },
}
```

<div class="common-image-format">

![Screenshot of different device or browser error](/img/authenticators/authenticators-email-challenge-auth.png)

</div>


### 3. Verify email using OTP or magic link

See those sectinos for more details

### 4. Successful sign-in
