1. Switch to Postman and from the **Factor Lifecycle Operations** folder, select the **Activate SMS Factor** request template.
6. Replace the `{userId}` and `{factorId}` variables with the User ID and Factor ID values that you've copied previously.
7. Select the **Body** tab and in the JSON body of the request, replace the `passCode` value with the passcode sent to you by SMS.
8. Click **Send**.  A successful request results in an HTTP status code of `200` and a JSON payload response.
