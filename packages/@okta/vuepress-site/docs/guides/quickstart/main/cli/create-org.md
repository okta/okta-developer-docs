Creating an org is easy using the [Okta CLI](https://cli.okta.com/):

1. After installing the Okta CLI, run the command `okta register`.

2. You are prompted to supply the following information:

    - First name
    - Last name
    - Email address
    - Company

3. Okta creates the org. The CLI returns your Okta domain and lets you know that a verification code is being sent to your email.

> **Note:** Make a note of your Okta domain: It’s the base of the URL you use to access your org. Authorization requests for users are directed to an endpoint that has this as its base, and any Okta API endpoints that you call also have this URL as their base.

4. Check your email for the verification code. Enter it at the CLI's prompt.

5. The CLI provides a link to set your password. Open the URL in your web browser.
