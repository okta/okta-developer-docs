Creating an org is easy using the [Okta CLI](https://github.com/oktadeveloper/okta-cli).

1. After installing the Okta CLI, enter `okta register`.

2. You are prompted to supply the information required:

 - First name
 - Last name
 - Email address
 - Company

3. After creating your org, the CLI returns your Org URL, also known as your Okta domain, and lets you know that a verification code is being sent to you by email.

	Your Org URL is important: It’s the base URL you use to access your org.  Authorization requests for users will be directed to an endpoint that has this as its base, and any Okta API endpoints you call will also have this as their base.

4. Check your email for the verification code and enter it at the CLI's prompt.

5. The CLI provides a link to use to set your password. Open the URL in your web browser.


