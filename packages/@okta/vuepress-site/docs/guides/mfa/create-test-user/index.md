---
title: Create a test User
---

In this example, we want to create a new User in Okta.

1. Open the **Users (Okta API)** collection in Postman and then the **Create User** folder.
1. Select the **Create User without Credentials** request template. The request template appears on the right.
1. Select the **Body** tab and enter the first name, last name, and email address for your new user. Use the email for the `login` property.
1. Click **Send**. A successful request results in an HTTP status code of `200` and a JSON payload response.
1. Save the value of the User `id` that is returned in the response.

<NextSectionLink/>
