Using the ID for the User that you created earlier, add a Google Authenticator factor for that User:

1. In Postman, open the **Factors (Okta API)** collection, and then the **Factor Lifecycle Operations** collection.
2. Select the **Enroll Google Authenticator Factor** request template. The request appears on the right.
3. In the request URL, replace the `{userId}` variable with the user ID that you saved in the <GuideLink link="../create-test-user">last step</GuideLink>.
4. Click **Send** to add the Google Authenticator Factor for your user. A successful request results in an HTTP status code of `200` and a JSON payload response.
5. Save the Factor ID value (`id`) from the response.
6. In the `\_embedded` object located at the bottom of the response, locate the `_links` object and then the `href` value of the `qrcode` property.
7. Copy this URL and open it in a new tab of your browser. A QR code appears. We use this QR code in the <GuideLink link="../enroll-factor">next step</GuideLink>.
