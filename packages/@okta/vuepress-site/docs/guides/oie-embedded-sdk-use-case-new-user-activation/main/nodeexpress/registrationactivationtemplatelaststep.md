After the user completes all the required registration steps, `OktaAuth.idx.proceed()` returns a response indicating that the next step is to complete the registration using their email. Specifically, `IdxTransaction` returns a status of `TERMINAL`, `message[n].i18n.key` value of `idx.email.verification.required`, and `message[n].message` set to "To finish signing in, check your email."

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
