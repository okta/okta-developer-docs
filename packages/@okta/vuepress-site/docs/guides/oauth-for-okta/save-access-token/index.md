---
title: Save the access token in Postman
---
Save the access token and use it to make a request to an endpoint that supports a scope that you have in your request. Since you requested `okta.users.manage` <GuideLink link="../request-access-token">previously</GuideLink> in the access token request, you can obtain a list of users associated with the current app from the `/users` endpoint.

1. In Postman, select the request that you want to make, such as a `GET` request to the `/api/v1/users` endpoint to get back a list of all users.
2. On the **Header** tab, remove the existing SSWS Authorization API Key.
3. Click the **Authorization** tab and from the **Type** drop-down list, select **Bearer Token**.
4. Paste the access token into the **Token** box on the right.
5. Click **Send**. The response should contain an array of all the users associated with your app. This is dependent on the user's permissions.

<NextSectionLink/>
