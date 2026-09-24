Use the direct authentication OOB flow when you want to use an out-of-band factor as a primary factor. An out-of-band factor is a type of factor that requires a secondary verification method through a separate communication channel along with the initial user credentials.

The steps in this guide focus on using the OOB flow with the Email authenticator. Okta emails a one-time verification code to the user, and the user enters that code in your app to complete authentication.

> **Note:** The verification code sent by email defaults to 6 numeric digits. If your org has configured [Email OTP settings](https://help.okta.com/okta_help.htm?type=oie&id=ext-configure-authenticators-email), codes can be 6–10 characters and can include uppercase letters. Treat the code as an opaque, case-sensitive string — don't hard-code a 6-digit numeric input mask, and don't force a numeric-only keyboard in your app.
