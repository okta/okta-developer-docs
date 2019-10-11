---
title: Get an access token using a Service app
---
To request an access token using the Client Credentials grant flow, you make a request to your Okta [Org Authorization Server's](/docs/concepts/auth-servers/) `/token` endpoint. The following is an example request for an access token (the JWT is truncated for brevity):

> **Note:** Move on to the <GuideLink link="../save-access-token">next section</GuideLink> if you aren't using the Client Credentials grant flow.

```json
curl -X POST "https://{yourOktaDomain}/oauth2/v1/token"
    -H "Accept: application/json"
    -H "Content-Type: application/x-www-form-urlencoded"
    -d "grant_type=client_credentials&scope=okta.users.read&client_assertion_type=urn%3Aietf%3Aparams%3Aoauth%3Aclient-assertion-type%3Ajwt-bearer&client_assertion=eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIwb2Fua3JrMHJqYXJBOXhpSzBoNyIsImlzcyI6IjBvYW5rcmswcmphckE5eGlLMGg3IiwiYXVkIjoiaHR0cHM6Ly9nZW5lcmljb2lkYy5va3RhcHJldmlldy5jb20vb2F1dGgyL3YxL3Rva2VuIiwiaWF0IjoxNTY5NDI2NDY1LCJleHAiOjE1Njk0MjcwNjUsImp0aSI6IjUxMzNiY2M4LTBkNTctNDlhZi04YTZjLTMyNThkMjlmODIzYiJ9.MdYZ6haG3zK2fEXSHmqqM9RFcM0hDGarl_9yy-8ZHtVCuiKBokbUoP2Bq4rCCq8DGaw-x2xT4cOWPGJV1P6nOS9OD2oGAfpbTg6IfwLvwumaQN3h34oPQS3jCntCbYY8b1lNaWGcBugB1rCPrUA5Xp3RQmF-ABMSk3ZT3De54aH4jtxQtopaUHIeWDD9iqvPZPJYkphstQXrv4SS3YkUbX9hS-2FkcwBS8bkpBC32Q4fTkXXK4bMDwRQGA8TdLHYFZymQIQR6ouvvEmz56hPqREq911l_vBUOw8-MLeL8l8QmmDmFlu-m1cZW-a2-AaKyj8LafbiKzeWeNsI6W7VAA"
```

* `scope`: Include the scopes that allow you to perform the actions on the endpoint that you want to access. The scopes requested for the access token must already be in the <GuideLink link="../define-allowed-scopes">application's grants collection</GuideLink>. See <GuideLink link="../scopes">Scopes & supported endpoints</GuideLink> for more information on scopes.
* `client_assertion`: Paste the `jwt` that you signed in the <GuideLink link="../use-client-credentials-grant-flow/#sign-the-jwt">Sign the JWT</GuideLink> section.

The response should look something like this (the token is truncated for brevity):

```json
{
    "token_type": "Bearer",
    "expires_in": 3600,
    "access_token": "eyJraWQiOiJ.....UfThlJ7w",
    "scope": "okta.users.read"
}
```

<NextSectionLink/>
