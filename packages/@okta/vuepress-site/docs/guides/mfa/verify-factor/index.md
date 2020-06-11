---
title: Verify the factor
---

Now that the factor has been enrolled and activated, you can verify that the factor works as intended.

1. Open the **Factors (Okta API)** collection, and then the **Factor Verification Operations** collection.
2. Select the **POST Verify TOTP Factor** request template.
3. Replace the `{userId}` and `{factorId}` variables with the User ID and Factor ID values that you copied previously.
4. Select the **Body** tab, and in the JSON body of the request, replace the `passCode` value with the passcode shown in the Google Authenticator app.
5. Click **Send**. A successful verification of a token results in an HTTP status code of `200` with a JSON payload that contains the key `factorResult` with the value of `SUCCESS`.

    Unsuccessful verification attempts result in an HTTP status code of `403` with a JSON payload that contains the key `errorCode`.

<NextSectionLink>Next steps</NextSectionLink>
