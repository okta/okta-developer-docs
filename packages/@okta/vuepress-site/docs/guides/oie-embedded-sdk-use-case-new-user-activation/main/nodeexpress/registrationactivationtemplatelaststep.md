#### 2. Notify user to complete registration using their email

After the user has completed all the required registration steps, `OktaAuth.idx.proceed()` returns a response indicating the next step is to complete the registration using their email. Specifically, `IdxTransaction` returns a status of `TERMINAL`, `message[n].i18n.key` value of `idx.email.verification.required` and `message[n].message` set to "To finish signing in, check your email."

```json
{
  status: "TERMINAL",
  messages: [
    {
      message: "To finish signing in, check your email.",
      i18n: {
        key: "idx.email.verification.required",
      },
      class: "INFO",
    },
  ],
}
```
