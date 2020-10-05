Using the ID for the User that you created earlier, add an SMS factor for that User:

1. In Postman, open the **Factors (Okta API)** collection and then the **Factor Lifecycle Operations** collection.
2. Select the **Enroll Okta SMS Factor** request template. The request appears on the right.
3. In the request URL, replace the `{userId}` variable with the user ID that you saved in the <GuideLink link="../create-test-user">last step</GuideLink>.
4. Replace the `{phoneNumber}` variable with the [phone number](/docs/reference/api/factors/#sms-profile) you want to use for this test.
4. Click **Send** to add the SMS Factor for your user. A successful request results in an HTTP status code of `200` and a JSON payload response. The request also results in an SMS stating "Your verification code is" followed by a numerical code. Save this code.
5. Save the Factor ID value (`id`) from the response.

> **Note:** If you don't receive an SMS, wait 30 seconds and try again by sending the same body payload to the `/resend` URL found in the Factor's `_links` object.
