Before implementing the flow, you must first [create custom scopes](#create-custom-scopes) for the [custom authorization server](/docs/guides/customize-authz-server/) used to authenticate your app from the Admin Console.

If you aren’t using existing libraries, you can make a direct request to the Okta [OIDC & OAuth 2.0 API](/docs/reference/api/oidc/) through the `/token` endpoint. See [Request for token](#request-for-token) in the next section.

### Request for token

The Client Credentials flow is intended for server-side (confidential) client applications with no end user, which normally describes machine-to-machine communication. Your client application needs to have its client ID and secret stored in a secure manner. You can find the client ID and secret on the **General** tab for your app integration.

Base64-encode the client ID and secret (as shown later) and then pass through [Basic Authentication](https://tools.ietf.org/html/rfc7617) in the request to your [custom authorization server's](/docs/concepts/auth-servers/#custom-authorization-server) `/token` endpoint:

```bash
curl --request POST \
  --url https://{yourOktaDomain}/oauth2/default/v1/token \
  --header 'accept: application/json' \
  --header 'authorization: Basic MG9hY...' \
  --header 'cache-control: no-cache' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'grant_type=client_credentials&scope=customScope'
```

> **Note:** The client ID and secret aren't included in the POST body. Instead, they are in the HTTP Authorization header following the [rules of HTTP Basic Auth](https://tools.ietf.org/html/rfc7617).

Note the parameters that are being passed:

* `grant_type` is `client_credentials`, indicating that you're using the Client Credentials grant type.
* `scope` must be at least one custom scope that you create. See the **Create Scopes** section of the [Create an authorization server guide](/docs/guides/customize-authz-server/main/#create-scopes).

If the credentials are valid, the application receives an access token:

```json
{
    "access_token": "eyJhbG[...]1LQ",
    "token_type": "Bearer",
    "expires_in": 3600,
    "scope": "customScope"
}
```

### Base64-encode the client ID and client secret

Use this section to Base64-encode the client ID and secret. When you finish encoding, you can then use the encoded client ID and secret in the HTTP Authorization header in the following format: `'authorization: Basic <Base64-encoded client ID and secret>'`

**If you're using macOS or Linux**:

1. Open the **Admin Console** for your org.
1. Choose **Applications** > **Applications** to view the available app integrations.
1. Select the application that you want to use, and then on the **General** tab, copy the **Client ID** and **Client secret**.
1. Launch your preferred text editor and then paste the client ID and secret into a new file.
1. Place the client ID and secret on the same line and insert a colon between them: `clientid:clientsecret`
1. Copy the `clientid:clientsecret` line to the clipboard.
1. Launch a terminal and enter the following command, replacing `clientid:clientsecret` with the value that you copied.

    `echo -n clientid:clientsecret | base64`

1. Copy the value that is returned.

> **Note:** Make sure that the entire results are on a single line with no text wrapping.

**If you're using Windows**:

1. Open the **Admin Console** for your org.
1. Choose **Applications** > **Applications** to view the available app integrations.
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
