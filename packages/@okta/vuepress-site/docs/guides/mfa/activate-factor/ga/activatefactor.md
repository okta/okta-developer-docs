1. Open Google Authenticator on your phone.
2. Tap the plus sign **+** in the app.
3. Select the **Scan barcode** option.
4. Scan the QR Code on the browser tab that you opened previously.
5. Switch to Postman and from the **Factor Lifecycle Operations** collection, select the **POST Activate TOTP Factor** request template.
6. Replace the `{userId}` and `{factorId}` variables with the User ID and Factor ID values that you copied previously.
7. Select the **Body** tab and, in the JSON body of the request, replace the `passCode` value with the passcode shown in the Google Authenticator app.
8. Click **Send**.  A successful request results in an HTTP status code of `200` and a JSON payload response.
