The following sections outline the requests required to implement the OOB flow using direct calls to the Okta OpenID Connect & OAuth 2.0 API.

### Request for out-of-band authentication

Before you can begin this flow, collect the username from the user in a manner of your choosing. Then, make an API call to the Okta [authorization server](/docs/concepts/auth-servers/) `/oob-authenticate` endpoint. Use this endpoint to initiate an authentication flow with an out-of-band (OOB) factor as the primary factor. Your request should look something like this:

> **Note:** The `/oob-authenticate` endpoint doesn't support multifactor authentication.

```bash
curl --request POST \
  --url https://${yourOktaDomain}/oauth2/v1/oob-authenticate \
  --header 'accept: application/json' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'client_id=${client_id}&login_hint=${testuser%40example.com}&channel_hint=push'
```

Note the parameters that are passed:

- `client_id` matches the client ID of the application that you created in the [Set up your app](#set-up-your-app) section. You can find it at the top of your app's **General** tab.
- `login_hint` is the username (email) of a user registered with Okta.
- `channel_hint` is the out-of-band channel that the client wants to use. For example, Okta Verify or SMS.

  > **Note:** Okta currently supports only Okta Verify Push.<!-- need to update this when phase 2 is complete -->

For more information on these parameters, see the `/oob-authenticate` [endpoint](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/OrgAS/#tag/OrgAS/operation/oob-authenticate).

**Response**

In an HTTP 200 response, Okta returns the following parameters:

> **Note:** Okta also sends a push notification to the user.

```json
  {
      "oob_code": "ftpvP1LB26vCARL7EWM55cUhPA2vdQmHFp",
      "expires_in": 300,
      "interval": 5,
      "channel": "push",
      "binding_method": "none"
  }
```

Note the parameters included:

- `oob_code` is an identifier of a single out-of-band factor transaction. To respond to or check on the status of an out-of-band factor, this code is used to identify the factor transaction.
- `expires_in` is the time, in seconds, until the `oob_code` expires.
- `interval` is the frequency, in seconds, at which the client needs to poll Okta to check if the out-of-band factor is completed. This is only relevant to polling factors such as Okta Verify Push.
- `channel` is the type of out-of-band channel used. Okta currently only supports Okta Verify Push.<!-- need to update this when phase 2 is complete -->
- `binding_method` is the method used to bind the out-of-band channel with the primary channel. Since Okta Verify Push doesn't require any binding, the only supported value for EA is `none`.<!-- need to update this when phase 2 is complete -->

### Poll the Okta authorization server

Your app polls the authorization server `/token` endpoint at the set `interval`.

```bash
curl --request POST \
  --url https://${yourOktaDomain}/oauth2/v1/token \
  --header 'accept: application/json' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'client_id=${client_id}&scope=openid%20profile&grant_type=urn:okta:params:oauth:grant-type:oob&oob_code=&{oob_code}'
```

Note the parameters that are passed:

- `client_id` matches the client ID of the native application that you created in the [Set up your app](#set-up-your-app) section. You can find it at the top of your app's **General** tab.
- `scope` must be at least `openid`. See the **Create Scopes** section of the [Create an authorization server guide](/docs/guides/customize-authz-server/main/#create-scopes).
- `grant_type` is `urn:okta:params:oauth:grant-type:oob`, indicating that you are using the direct authentication OOB grant type. Use this grant type for OOB factors that you want to use as a primary factor.
- `oob_code` is an identifier of a single out-of-band factor transaction. To respond to or check on the status of an out-of-band factor, this code is used to identify the factor transaction.

For more information on these parameters, see the `/token` [endpoint](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/OrgAS/#tag/OrgAS/operation/token).

**Response**

Okta responds to the poll request with an HTTP 400 `authorization_pending` error.

```json
  {
    "error": "authorization_pending",
    "error_description": "No user response received on the out-of-band authenticator yet. Continue polling to wait for a response."
  }
```

### Request for tokens

After the user responds to the push notification, the app polls the `/token` endpoint again. See the request in [Poll the Okta authorization server](#poll-the-okta-authorization-server) for a request example.

**Response**

Okta responds with the required tokens.

```json
{
    "token_type": "Bearer",
    "expires_in": 3600,
    "access_token": "eyJraWQiO[.....]Zpx4fch2n-cdQ",
    "scope": "openid profile",
    "id_token": "eyJraWQiOiJFVkRZ[.....]GKwhgZa3TdIfCXA"
}
```
