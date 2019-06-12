---
title: Verify the factor
---

Now that you've verified the factor, you are ready to start
verifying MFA tokens! Here is how to do that using Postman:

1.  Open the **Factors (Okta API)** collection in Postman.
2.  Select the **POST Verify TOTP Factor** request template.
3.  Replace the `{userId}` and `{factorId}` templates with the
    User ID and Factor ID values that you've copied previously.
4.  In the JSON body, replace the `passCode` value with the
    passcode shown on Google Authenticator.
5.  Click the blue **Send** button.
6.  A successful verification of a token will result in an HTTP
    status code of `200`, with a JSON payload containing the key
    `factorResult` with the value of `SUCCESS`.
    (Unsuccessful verification attempts will result in an HTTP
    status code of `403`, with a JSON payload containing the key `errorCode`).

## Learn more

At this point, you should understand how to use the Okta API to add
MFA to an existing application. You can learn more about using the
Okta MFA API with the following resources.

-   The [design principles for the Okta API](/docs/reference/api-overview/).
-   The API documentation for the [Okta Factors API](/docs/reference/api/factors/).
-   The API documentation for the [Okta Authentication API](/docs/reference/api/authn/).

<NextSectionLink/>
