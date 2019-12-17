---
title: Add a factor for the user
---

You are now ready to set up MFA for the user that you created. A key part of enabling MFA for a user is verifying that they have an MFA token. In Okta, this process is known as Enrollment. After an MFA token is enrolled, we can verify that they actually have this token
by asking them to answer a challenge using their token.

The process of attaching a factor to a user is similar for every type of factor that Okta supports. In this example, we cover only how to attach a Google Authenticator factor. At a high level, the process of attaching a factor involves adding a factor to the user account and then enrolling that factor. Once the factor is enrolled, you can <GuideLink link="../verify-factor">verify it</GuideLink> using the Factors API.

Using the ID for the User that you created earlier, add a Google Authenticator factor for that User:

1. In Postman, open the **Factors (Okta API)** collection, and then the **Factor Lifecycle Operations** collection.
2. Select the **POST Enroll Google Authenticator Factor** request template. The request appears on the right.
3. In the request URL, replace the `{userId}` variable with the user ID that you saved in the <GuideLink link="../create-test-user">last step</GuideLink>.
4. Click **Send** to add the Google Authenticator Factor for your user. A successful request results in an HTTP status code of `200` and a JSON payload response.
5. Save the Factor ID value (`id`) from the response.
6. In the `\_embedded` object located at the bottom of the response, locate the `_links` object and then the `href` value of the `qrcode` property.
7. Copy this URL and open it in a new tab of your browser. A QR code appears. We use this QR code in the <GuideLink link="../enroll-factor">next step</GuideLink>.

<NextSectionLink/>
