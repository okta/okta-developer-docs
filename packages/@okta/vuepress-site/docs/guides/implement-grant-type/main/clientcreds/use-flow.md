### Create custom scopes

The Client Credentials flow never has a user context, so you can't request OpenID scopes. Instead, you must create a custom scope. See the **Scopes** section of the [Create a Custom Authorization Server](/docs/guides/customize-authz-server/create-scopes/) guide for more information on creating custom scopes.

### Use the Client Credentials flow

The Client Credentials flow is intended for server-side (confidential) client applications with no end user, which normally describes machine-to-machine communication. Your client application needs to have its client ID and secret stored in a secure manner. You can find the client ID and secret on the **General** tab for your app integration.

[Base64 encode](#base64-encode-the-client-ID-and-client-secret) the client ID and secret and then pass through [Basic Authentication](https://tools.ietf.org/html/rfc7617) in the request to your [Custom Authorization Server's](/docs/concepts/auth-servers/#custom-authorization-server) `/token` endpoint:

```
curl --request POST \
  --url https://${yourOktaDomain}/oauth2/default/v1/token \
  --header 'accept: application/json' \
  --header 'authorization: Basic MG9hY...' \
  --header 'cache-control: no-cache' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'grant_type=client_credentials&scope=customScope'
```

> **Note:** The client ID and secret aren't included in the POST body, but rather are placed in the HTTP Authorization header following the [rules of HTTP Basic Auth](https://tools.ietf.org/html/rfc7617).

Note the parameters that are being passed:

- `grant_type` is `client_credentials`, indicating that we are using the Client Credentials grant type.
- `scope` must be at least one custom scope that you create. See the **Create Scopes** section of the [Create an Authorization Server guide](/docs/guides/customize-authz-server/create-scopes/).

If the credentials are valid, the application receives an access token:

```json
{
    "access_token": "eyJhbG[...]1LQ",
    "token_type": "Bearer",
    "expires_in": 3600,
    "scope": "customScope"
}
```

### Base64 encode the client ID and client secret

Use this section to Base64 encode the client ID and secret. When you finish encoding, you can then use the encoded client ID and secret in the HTTP Authorization header in the following format: `'authorization: Basic <Base64 encoded client ID and secret>'`

1. Sign in to your Okta organization with your administrator account.
1. In the Admin Console, go to **Applications** > **Applications**.
1. Select the application that you want to use, and then on the **General** tab, copy the client ID and secret.
1. Launch your preferred text editor and then paste the client ID and secret into a new file.
1. Place the client ID and secret on the same line and insert a colon between them: `clientid:clientsecret`
1. Copy the `clientid:clientsecret` line.
1. Access the [base64encode.org](https://www.base64encode.org/) web site and paste the `clientid:clientsecret` line in the **Encode to Base64 format** box.
1. Leave **UTF-8** as the **Destination character set** and click **Encode**.
1. Copy the encoded line that appears.

To use the command line for Mac and Linux:

1. Follow steps 1 through 4 above.
1. Launch a terminal and enter the following command, replacing `clientid:clientsecret` with the value that you just copied to the clipboard.

    `echo -n clientID:clientsecret | base64`

1. Copy the value that is returned.

> **Note:** If the value that is returned is broken into more than one line, return to your text editor and make sure that the entire results are on a single line with no text wrapping.

To use the command line for Windows:

1. Follow steps 1 through 3 above.
1. Save the file to `C:\temp` and name the file appCreds.txt.
1. In Windows Explorer, right-click `C:\temp`, and then select **CMD Prompt Here** from the context menu.
1. Enter the following command to encode the client ID and client secret:

    `copycertutil -encode appCreds.txt appbase64Creds.txt`

1. Locate and open appbase64Creds.txt in `C:\temp`, copy its contents, and then close the file.

> **Note:** Delete the appCreds.txt and the appbase64Creds.txt files after you finish.

### Validate access tokens

When your application passes a request with an access token, the resource server needs to validate it. See [Validate access tokens](/docs/guides/validate-access-tokens/).
