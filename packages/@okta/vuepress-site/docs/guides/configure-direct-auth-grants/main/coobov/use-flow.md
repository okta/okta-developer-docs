The following sections outline the requests required to implement the out-of-band (OOB) flow (with Okta Verify Push) using direct calls to the Okta OpenID Connect & OAuth 2.0 API.

### Request for out-of-band authentication

Before you can begin this flow, collect the username from the user in a manner of your choosing. Then, make an API call to the Okta [authorization server](/docs/concepts/auth-servers/) `/oob-authenticate` endpoint. Use this endpoint to initiate an authentication flow with an out-of-band factor as the primary factor. Your request should look something like this:

> **Note:** The `/oob-authenticate` endpoint doesn't support multifactor authentication.

```bash
curl --request POST \
  --url https://{yourOktaDomain}/oauth2/v1/oob-authenticate \
  --header 'accept: application/json' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'client_id={client_id}&login_hint={testuser%40example.com}&channel_hint=push'
```

Note the parameters that are passed:

- `client_id`: Matches the client ID of the application that you created in the [Set up your app](#set-up-your-app) section. You can find it at the top of your app's **General** tab.
- `login_hint`: The email username of a registerd Okta user
- `channel_hint`: The out-of-band channel used by the client. For Okta Verify, use `push`.

For more information on these parameters, see the `/oob-authenticate` [endpoint](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/OrgAS/#tag/OrgAS/operation/oob-authenticate).

### OOB response example for Okta Verify Push

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

#### Number challenge for Okta Verify Push example

```json
  {
      "oob_code": "ftpvP1LB26vCARL7EWM55cUhPA2vdQmHFp",
      "expires_in": 300,
      "interval": 5,
      "channel": "push",
      "binding_method": "transfer",
      "binding_code": "95"
  }
```

Note the parameters included:

- `oob_code`: An identifier of a single out-of-band factor transaction. To respond to or check on the status of an out-of-band factor, use this code to identify the factor transaction.
- `expires_in`: The time, in seconds, until the `oob_code` expires
- `interval`: The frequency, in seconds, at which the client needs to poll Okta to check if the out-of-band factor is completed. This is only relevant to polling factors such as Okta Verify Push.
- `channel`: The type of out-of-band channel used.
- `binding_method`: The method used to bind the out-of-band channel with the primary channel. Supported values: `none`, `transfer`.
- `binding_code`: The end user verification code used to bind the authorization operation on the secondary channel with the primary channel. This parameter appears only if `binding_method=transfer`.

### Poll the Okta authorization server

Your app polls the authorization server `/token` endpoint at the set `interval`.

```bash
curl --request POST \
  --url https://{yourOktaDomain}/oauth2/v1/token \
  --header 'accept: application/json' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'client_id={client_id}&scope=openid%20profile&grant_type=urn:okta:params:oauth:grant-type:oob&oob_code={oob_code}'
```

Note the parameters that are passed:

- `client_id`: Matches the client ID of the app that you created in the [Set up your app](#set-up-your-app) section. You can find it at the top of your app's **General** tab.
- `scope`: Must be at least `openid`. See the **Create Scopes** section of the [Create an authorization server guide](/docs/guides/customize-authz-server/main/#create-scopes).
- `grant_type`: `urn:okta:params:oauth:grant-type:oob`, which indicates that you're using the direct authentication OOB grant type. Use this grant type for OOB factors that you want to use as a primary factor.
- `oob_code`: An identifier of a single out-of-band factor transaction. To respond to or check on the status of an out-of-band factor, use this code to identify the factor transaction.

For more information on these parameters, see the `/token` [endpoint](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/OrgAS/#tag/OrgAS/operation/token).

### Okta poll response

Okta responds to the poll request with an HTTP 400 `authorization_pending` error.

```json
  {
    "error": "authorization_pending",
    "error_description": "No user response received on the out-of-band authenticator yet. Continue polling to wait for a response."
  }
```

### Request for tokens

After the user responds to the push notification, the app polls the `/token` endpoint again. See the request in [Poll the Okta authorization server](#poll-the-okta-authorization-server) for a request example.

### Okta token response

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
