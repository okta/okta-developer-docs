---
title: Get an access token
---

To request an access token using the Client Credentials grant flow, your app makes a request to your Okta [Org Authorization Server's](/docs/concepts/auth-servers) `/token` endpoint.

Include the following parameters:

* `scope` &mdash; include the scopes that allow you to perform the actions on the endpoint that you want to access. The scopes requested for the access token must already be in the <GuideLink link="../create-serviceapp-grantscopes/#grant-allowed-scopes">application's grants collection</GuideLink>. See [Scopes and supported endpoints](/docs/guides/implement-oauth-for-okta/scopes/).

    In this example, we only request access for one scope. When you request an access token for multiple scopes, the format for the scope value looks like this: `scope=okta.users.read okta.apps.read`

* `client_assertion_type` &mdash; specifies the type of assertion, in this case a JWT token:  `urn:ietf:params:oauth:client-assertion-type:jwt-bearer`

* `client_assertion` &mdash; the signed JWT. Paste the JWT that you signed in the <GuideLink link="../create-sign-jwt">Create and sign the JWT</GuideLink> section.

The following is an example request for an access token (the JWT is truncated for brevity).

```bash
    curl --location --request POST 'https://{yourOktaDomain}/oauth2/v1/token' \
    --header 'Accept: application/json' \
    --header 'Content-Type: application/x-www-form-urlencoded' \
    --data-urlencode 'grant_type=client_credentials' \
    --data-urlencode 'scope=okta.users.read' \
    --data-urlencode 'client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer' \
    --data-urlencode 'client_assertion=eyJhbGciOiJSU....tHQ6ggOnrG-ZFRSkZc8Pw'
```

The response should look something like this (the token is truncated for brevity):

```json
{
    "token_type": "Bearer",
    "expires_in": 3600,
    "access_token": "eyJraWQiOiJ.....UfThlJ7w",
    "scope": "okta.users.read"
}
```

> **Note:** The lifetime for this token is fixed at one hour.

### Make a request

Make a request to the `/users` endpoint using the access token.

1. If you are using Postman to test, select the **List Users** `GET` request to the `/api/v1/users` endpoint to get back a list of all users.
2. On the **Header** tab, remove the existing Okta API token (SSWS Authorization API Key).
3. Click the **Authorization** tab and from the **Type** drop-down box, select **OAuth 2.0**.
4. On the right, paste the access token into the **Access Token** box and click **Send**. The response should contain an array of all the users associated with your app. This is dependent on the user's permissions.

**Example Request**

```bash
curl -X GET "https://{yourOktaDomain}/api/v1/users"
    -H "Accept: application/json"
    -H "Content-Type: application/json"
    -H "Authorization: Bearer eyJraWQiOiJEa1lUbmhTdkd5OEJkbk9yMVdYTENhbVFRTUZiNTlYbHdBWVR2bVg5ekxNIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULmRNcmJJc1paTWtMR0FyN1gwRVNKdmdsX19JOFF4N0pwQlhrVjV6ZGt5bk0iLCJpc3MiOiJodHRwczovL2xvZ2luLndyaXRlc2hhcnBlci5jb20iLCJhdWQiOiJodHRwczovL2dlbmVyaWNvaWRjLm9rdGFwcmV2aWV3LmNvbSIsInN1YiI6IjBvYXI5NXp0OXpJcFl1ejZBMGg3IiwiaWF0IjoxNTg4MTg1NDU3LCJleHAiOjE1ODgxODkwNTcsImNpZCI6IjBvYXI5NXp0OXpJcFl1ejZBMGg3Iiwic2NwIjpbIm9rdGEudXNlcnMubWFuYWdlIl19.TrrStbXUFtuH5TemMISgozR1xjT3rVaLHF8hqnwbe9gmFffVrLovY-JLl63G8vZVnyudvZ_fWkOBUxip1hcGm80KvrSgpdOp9Nazz-mjkP6T6JwslRFHDe8SC_4h2LG9zi5PV9y3hAayBK51q1HIwgAxl_2F7q4l0jLKDFsWjQS8epNaB05NLI12BDvO-C-7ZGGJ4EQfGS9EjN9lS-vWnt_V3ojTL0BJCKgL5Y0c9D2VkSqVN4j-7BSRZt0Un3MAEgznXmk2ecg3y7s9linGR0mC3QqKeyDfFNdsUJG6ac0h2CFFZQizpQu1DFmI_ADKmzxVQGPICuslgJFFoIF4ZA"
```
