---
title: Create a test user
---

In this example, we want to create a new user account in Okta using a random user generator. Creating a user account allows you to add MFA to your application without needing to update your user schemas.

1. Generate a random user (you use the [Random User Generator](https://randomuser.me/))
3. Open the **Users (Okta API)** collection in Postman and then the **Create User** folder.
4. Select the **Create User without Credentials** request template. The request template appears on the right.
5. Select the **Body** tab and enter the first name, last name, and email address for your randomly generated user. Use the email for the `login` property.
6. Click **Send**. A successful request results in an HTTP status code of `200` and a JSON payload response.
7. Save the value of the User `id` that is returned in the response.

    > **Note:** In Okta, User IDs start with `00u`.

<NextSectionLink/>
