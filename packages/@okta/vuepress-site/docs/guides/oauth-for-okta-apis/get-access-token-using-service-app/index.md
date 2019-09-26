---
title: Get an access token using a Service app
---
To get an access token using the Client Credentials grant flow, do the following in Postman:

> **Note:** Move on to the <GuideLink link="../save-access-token">next section</GuideLink> if you aren't using the Client Credentials grant flow.

1. Open the **Get Access Token with Client Credentials and Client Secret JWT** request in the **API Access Management (Okta API)** collection.
2. This guide assumes that you are using your Org authorization server, so remove the `{{authorizationServerId}}` parameter from the URL. The URL should look something like this:
	
	`{yourOktadomain}/oauth2/v1/token`

3. On the **Body** tab, replace the variables for the following key values:

	* `scope`: Include the scopes that allow you to perform the actions on the endpoint that you want to access. The scopes requested for the access token must already be in the application's grants collection and the user must have the permission to perform those actions. See <GuideLink link="../scopes">Scopes</GuideLink> for more information.
	* `client_assertion`: Paste the `jwt` that you signed in the <GuideLink link="../use-client-credentials-grant-flow/#sign-the-jwt">Sign the JWT</GuideLink> section.

 4. Click **Send**. The response should look something like this:

    ```json
    {
        "token_type": "Bearer",
        "expires_in": 3600,
        "access_token": "eyJraWQiOiJ…….UfThlJ7w", //token truncated for brevity
        "scope": "okta.users.manage"
    }
    ```
<NextSectionLink/>