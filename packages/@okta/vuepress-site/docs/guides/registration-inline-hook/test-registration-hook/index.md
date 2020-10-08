---
title: Test the registration inline hook
---
The external service example is now ready with code to receive and respond to an Okta call. The Okta org is now set up to call the external service using a Registration Inline hook.

At a high-level, the following workflow occurs:

- An external user attempts to self-register for your Okta org.
- A Registration Inline hook fires and sends a call to the exernal service with the user's data.
- The external service evaluates the Okta call.
- The external service responds to Okta with information to allow or deny the registration.

To test your registration inline hook, go to the Okta log in page for your Okta org, and attempt to self-register.

- If you use an allowable email domain, the user registration goes through.
- If you use an incorrect email domain, the user registration is denied; review the error message, which displays the error summary from the external service code and is passed back to Okta.

<NextSectionLink/>

