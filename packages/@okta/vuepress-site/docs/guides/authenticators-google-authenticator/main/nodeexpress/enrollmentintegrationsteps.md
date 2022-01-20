
#### Select Google authenticator

```javascript
  const transaction = await authClient.idx.authenticate({
    username,
    password,
  });
```

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

#### Install Google authenticator on mobile device



#### Add account and capture QR code



#### Submit six-digit code
