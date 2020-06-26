1. Open the **Factors (Okta API)** collection and then the **Factor Verification Operations** collection.
1. Select the **POST Send SMS Challenge** request template.
1. Replace the `{userId}` and `{factorId}` variables with the User ID and Factor ID values that you copied previously.
1. Click **Send**. A successful verification of a token results in an HTTP status code of `200`. The JSON payload contains the key `factorResult` with the value of `CHALLENGE` and an SMS stating "Your verification code is" followed by a numerical code. Save this code.
1. Select the **POST Verify SMS Factor** request template.
1. Replace the `{userId}` and `{factorId}` variables with the User ID and Factor ID values that you copied previously.
1. Click **Send**. A successful verification of a token results in an HTTP status code of `200` with a JSON payload that contains the key `factorResult` with the value of `SUCCESS`.

> **Note:** If you don't receive a challenge SMS, wait 30 seconds and try again by sending the same payload.
