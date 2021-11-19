Before you can begin this flow, you must collect the SAML assertion from the Identity Provider and make sure that it is Base64-encoded (as shown below). You can then use the assertion in the API call to the [Authorization Server's](/docs/concepts/auth-servers/#custom-authorization-server) `/token` endpoint.

> **Note:** The example request in the next section shows you the direct [OIDC & OAuth 2.0 API](/docs/reference/api/oidc/) call. Typically, you don't need to make direct calls to the API if you're using one of Okta's Authentication SDKs that support SAML 2.0 Assertion.

### Request example

If you are using the default Custom Authorization Server, then your request would look something like this:

```bash
curl --location --request POST 'https://${yourOktaDomain}/oauth2/default/v1/token' \
--header 'Accept: application/json' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--header 'Authorization: Basic MG9hb....' \
--data-urlencode 'grant_type=urn:ietf:params:oauth:grant-type:saml2-bearer' \
--data-urlencode 'scope=openid offline_access' \
--data-urlencode 'assertion=<Base64-encoded assertion>'
```

> **Note:** The call to your authorization server's `/token` endpoint requires authentication. In this case, it is a Basic Auth digest of the Client ID and secret. You made note of these during [set up your app](#set-up-your-app). See [Client Authentication Methods](/docs/reference/api/oidc/#client-authentication-methods).

Note the parameters that are being passed:

- `grant_type`: `urn:ietf:params:oauth:grant-type:saml2-bearer`
- `assertion`: A single SAML 2.0 assertion that is Base64-encoded
- `scope`: `openid` and `offline_access`. The `openid` scope is required. Include `offline_access` if you want a refresh token included. You can also request additional scopes. See the **Create Scopes** section of the [Create an Authorization Server guide](/docs/guides/customize-authz-server/create-scopes/).

### Response example

> **Note:** The tokens are truncated for brevity.

```JSON
{
    "token_type": "Bearer",
    "expires_in": 3600,
    "access_token": "eyJraWQiOiJ3UHdvd.....gkJktHWp4YeLBGRxInAP2n4OpK6g1LmtNsEZw",
    "scope": "offline_access openid",
    "refresh_token": "rHXv2mvdmkfp3MwqYjNzrhyuvlVGZF2WgKsYXfTq3Mk",
    "id_token": "eyJraWQ.....h7BYbgCzQ"
}
```

### Base64-encode the client ID and client secret

Use this section to Base64 encode the client ID and secret. When you finish encoding, you can then use the encoded client ID and secret in the HTTP Authorization header in the following format: `'authorization: Basic <Base64 encoded client ID and secret>'`

**If you are using macOS or Linux**:

1. Sign in to your Okta organization with your administrator account.
1. In the Admin Console, go to **Applications** > **Applications**.
1. Select the application that you want to use, and then on the **General** tab, copy the **Client ID** and **Client secret**.
1. Launch your preferred text editor and then paste the client ID and secret into a new file.
1. Place the client ID and secret on the same line and insert a colon between them: `clientid:clientsecret`
1. Copy the `clientid:clientsecret` line to the clipboard.
1. Launch a terminal and enter the following command, replacing `clientid:clientsecret` with the value that you just copied.

    `echo -n clientid:clientsecret | base64`

1. Copy the value that is returned.

> **Note:** If the value that is returned is broken into more than one line, return to your text editor and make sure that the entire results are on a single line with no text wrapping.

**If you are using Windows**:

1. Sign in to your Okta organization with your administrator account.
1. In the Admin Console, go to **Applications** > **Applications**.
1. Select the application that you want to use, and then on the **General** tab, copy the **Client ID** and **Client secret**.
1. Launch your preferred text editor and then paste the client ID and secret into a new file.
1. Save the file to `C:\temp` and name the file `appCreds.txt`.
1. In Windows Explorer, right-click `C:\temp`, and then select **CMD Prompt Here** from the context menu.
1. Enter the following command to encode the client ID and client secret:

    `copycertutil -encode appCreds.txt appbase64Creds.txt`

1. Locate and open `appbase64Creds.txt` in `C:\temp`, copy its contents, and then close the file.

> **Note:** Delete the `appCreds.txt` and the `appbase64Creds.txt` files after you finish.

### Validate access token

When your application passes a request with an access token, the resource server needs to validate it. See [Validate access tokens](/docs/guides/validate-access-tokens/).
