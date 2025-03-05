---
title: Implement OAuth for Okta with a service app
excerpt: Learn how to interact with Okta APIs by using scoped OAuth 2.0 access tokens for a service app.
layout: Guides
---

This guide explains how to interact with Okta APIs by using scoped OAuth 2.0 access tokens for a service app.

---

#### Learning outcomes

* Create a public/private key pair.
* Assign admin roles to your service app.
* Create and sign the JSON Web Token (JWT).
* Define allowed scopes for your service app.
* Get an access token to make an API request.
* Know what the available scopes and supported endpoints are.

#### What you need

* [Okta Developer Edition organization](https://developer.okta.com/signup)
* [Postman client](https://www.getpostman.com/downloads/) to test requests with the access token. See [Get Started with the Okta APIs](https://developer.okta.com/docs/reference/rest/) for information on setting up Postman.

---

## About scoped OAuth 2.0 access tokens

Most Okta API endpoints require that you include an API token with your request. Currently, this API token takes the form of an SSWS token that you generate in the Admin Console. With OAuth for Okta, you’re able to interact with Okta APIs using scoped OAuth 2.0 access tokens. Each access token enables the bearer to perform specific actions on specific Okta endpoints, controlled by the scopes in the access token.

Scoped access tokens have several advantages:

* More access granularity
* Shorter token lifespans
* Ability to be generated and retrieved using an API

## Use the Client Credentials grant flow

The Client Credentials grant flow is intended for server-side (confidential) client apps with no end user, which normally describes machine-to-machine communication. Machine-to-machine use cases have a backend service or a daemon that makes calls to the Okta APIs. To mint access tokens that contain Okta scopes, the Client Credentials flow is the only flow supported with an OAuth 2.0 service app.

The following are the high-level steps required to perform the Client Credentials grant flow with an OAuth 2.0 service app:

1. Create the service app integration in Okta.
1. Generate a public/private JSON Web Key Set (JWKS) key pair and store the private key.
1. Grant the required OAuth 2.0 scopes to the service app.
1. Create a JSON Web Token (JWT) and sign it using the private key. Use this as the client assertion when making the `/token` endpoint API call.

> **Notes:**
> * OAuth for Okta works only with allowed [OAuth 2.0 scopes](https://developer.okta.com/docs/api/oauth2/#okta-admin-management).
> * For each service app you create, you need to assign admin roles to constrain the permissions and resources of that app for least privilege access. See [Assign admin roles to the OAuth 2.0 service app](#assign-admin-roles-to-the-oauth-2-0-service-app). If you want to bypass assigning admin roles to service apps, you can enable the **Public client app admins** org setting. This automatically assigns the [super admin role](https://developer.okta.com/docs/api/openapi/okta-management/guides/roles/#standard-roles) (`SUPER_ADMIN`) after scopes are granted to service apps. Go to **Settings** > **Account** > **Public client app admins** in the Admin Console to edit this setting. See [Assign admin roles to apps](https://help.okta.com/okta_help.htm?type=oie&id=csh-work-with-admin-assign-admin-role-to-apps). Disable this setting after you incorporate admin role assignments in your workflow.

## Create a service app integration

Create an OAuth 2.0 service app integration using the Admin Console.

  > **Note:** You can also use the `/oauth2/v1/clients` endpoint to [create your service app using the API](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/Client/#tag/Client/operation/createClient). If you use the API, follow the [Generate the JWK using the API](#generate-the-jwk-using-the-api) section first, because you need the `JWKS` parameter value when you create the client using the API.
  >
  >You can also add more JWKS to the app later using the [Add a new JSON Web Key](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/ApplicationSSOCredentialOAuth2ClientAuth/#tag/ApplicationSSOCredentialOAuth2ClientAuth/operation/addJwk) API.

1. Sign in to your Okta organization as a user with administrative privileges.

1. In the Admin Console, go to **Applications** > **Applications**, and then click **Create App Integration**. The **Create a new app integration** page appears.

1. Select **API Services** as the **Sign-in method**, and then click **Next**.

1. Enter a name for your app integration and click **Save**. The app main page appears.

  > **Note:** The Client Credentials grant type is automatically selected and is unavailable to make changes.

1. Optional. Click the **Application rate limits** tab to adjust the rate-limit capacity percentage for this service app. By default, each new app sets this percentage at 50%.

### Assign admin roles to the OAuth 2.0 service app

Assign admin roles for every OAuth 2.0 service app that you create. Service apps with assigned admin roles are constrained to the permissions and resources that are included in the role. This improves security for an org since it ensures that service apps only have access to the resources that are needed to perform their tasks. You can assign the [standard admin roles](https://help.okta.com/okta_help.htm?type=oie&id=ext-administrators-admin-comparison) or a [custom admin role](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-creating-custom-admin-roles) with permissions to specific resource sets.

1. In the service app that you created in the previous section, select **Admin Roles**.
1. Click **Edit assignments**.
1. Select a role from the **Role** dropdown list, and then define the additional information for the admin role, if required.
1. Click **Save Changes** when you finish. You’re prompted to authenticate.

<!-- As an [Okta super administrator](https://help.okta.com/okta_help.htm?type=oie&id=ext_superadmin), make a `POST /oauth2/v1/clients/{yourServiceAppId}/roles` request to your org with the following parameters to assign an admin role:

| Parameter |  Description/Value   |
| --------- |  ------------- |
| `yourServiceAppId`  |  Specify the client ID value from the response when the [service app was created](#create-a-service-app-integration).|
| `type`  |  Specify the admin role to assign to the service app. See [Role types](https://developer.okta.com/docs/api/openapi/okta-management/guides/roles/#standard-roles). |
| `resource-set`  |  Custom role only. Specify the resource set ID. See [Resource set object](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/RoleCResourceSet/#tag/RoleCResourceSet/operation/listResourceSets!c=200&path=resource-sets&t=response). |
| `role`  |  Custom role only. Specify the custom role ID. See [Custom role object](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/RoleECustom/#tag/RoleECustom/operation/listRoles!c=200&path=roles&t=response). |

> **Note:** Admin roles determine which resources the admin can perform the actions on, such as a specific group of users or a specific set of apps. Scopes determine the action that the admin can perform, such as manage users or read apps. Therefore, the admin roles need to have enough permissions for the scopes provided.

See [Assign a Role to a client app](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/RoleAssignmentClient/#tag/RoleAssignmentClient/operation/assignRoleToClient) in the Role Assignment API reference.

#### Request example - standard role

```bash
curl -i -X POST \
  'https://subdomain.okta.com/oauth2/v1/clients/{yourServiceAppId}/roles' \
  -H 'Authorization: YOUR_API_KEY_HERE' \
  -H 'Content-Type: application/json' \
  -d '{
    "type": "{type}"
  }'
```

#### Request example - custom role

```bash
curl -i -X POST \
  'https://subdomain.okta.com/oauth2/v1/clients/{yourServiceAppId}/roles' \
  -H 'Authorization: YOUR_API_KEY_HERE' \
  -H 'Content-Type: application/json' \
  -d '{
    "type": "CUSTOM",
    "role": "{role}",
    "resource-set": "{resource-set}"
  }'
```
-->
## Generate the JWK using the API

The `private_key_jwt` client authentication method is the only supported method for OAuth service apps that want to get access tokens with Okta scopes.

The private key that you use to sign the JWT must have the corresponding public key registered in the [JWKSet](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/Client/#tag/Client/operation/createClient) of the OAuth service app. Okta recommends generating the public/private key pair first before creating the OAuth service app.

1. Use a tool such as this [JSON Web Key Generator](https://mkjwk.org/) to generate a JWKS public/private key pair for testing. Okta supports both RSA and elliptic curve (EC) keys. In this example, select **RSA** as the encryption algorithm. Select the following values:

    * Key size: 2048
    * Key use: signature
    * Algorithm: RSA256
    * Key ID: any random value

> **Note:** Use the JSON Web Key Generator link to generate a JWKS public/private key pair for testing purposes only. For a production use case, use your own internal instance of the key pair generator. See this [key pair generator](https://github.com/mitreid-connect/mkjwk.org) for an example.

2. The JSON Web Key Generator tool extracts the public key from the key pair automatically. For testing purposes, copy the Public Key that is provided.

> **Note:** Some Okta SDKs require that keys be in Privacy Enhanced Mail (PEM) format. If the Okta SDK requires PEM, after you generate the key pair, copy it into a [JWK to PEM Convertor tool](https://8gwifi.org/jwkconvertfunctions.jsp). Then, copy the private key to use when signing the JWT.

The JWKS should look something like this:

```JSON
"keys": [
      {
    "kty": "RSA",
    "e": "AQAB",
    "use": "sig",
    "kid": "my_key_id",
    "alg": "RS256",
    "n": "u0VYW2-76A_lYg5NQihhcPJYYU9-NHbNaO6LFERWnOUbU7l3MJdmCailwSzjO76O-2GdLE-Hn2kx04jWCCPofnQ8xNmFScNo8UQ1dKVq0UkFK-sl-Z0Uu19GiZa2fxSWwg_1g2t-ZpNtKCI279xGBi_hTnupqciUonWe6CIvTv0FfX0LiMqQqjARxPS-6fdBZq8WN9qLGDwpjHK81CoYuzASOezVFYDDyXYzV0X3X_kFVt2sqL5DVN684bEbTsWl91vV-bGmswrlQ0UVUq6t78VdgMrj0RZBD-lFNJcY7CwyugpgLbnm4HEJmCOWJOdjVLj3hFxVVblNJQQ1Z15UXw"
      }
    ]
```

## Generate the JWK using the Admin Console

Generate a public/private key pair using the Admin Console.

> **Note:** Use the Admin Console to generate a JWK public/private key pair for testing purposes only. For a production use case, use your own internal instance of the key pair generator. See this [key pair generator](https://github.com/mitreid-connect/mkjwk.org) for an example.

1. In the **Client Credentials** section of the **General** tab, click **Edit** to change the client authentication method.

2. Select **Public key/Private key** as the **Client authentication** method.

  > **Note:** When you switch the client authentication method to **Public key/Private key**, any existing client secrets are deleted.

3. Choose how you want to store the JWK and then use the next sections to complete the steps.
    * **Save keys in Okta**: Copy your public keys into Okta.
    * **Use a URL to fetch keys dynamically**: Define the URI where you host your public keys.

### Save keys in Okta

This option allows you to bring your own keys or use the Okta key generator. There’s no limit to the number of JWKs that you can add for an app.

1. Leave the default of **Save keys in Okta**, and then click **Add key**.
1. Click **Add** and in the **Add a public key** dialog, do one of the following:

    * Paste your own public key into the box. Be sure to include a `kid` as all keys in the JWKS must have a unique ID.<br><br>
    **OR**<br>
    * Click **Generate new key** and the 2048-bit RSA public and private keys appear in JWK format.

        Some Okta SDKs require that keys be in Privacy Enhanced Mail (PEM) format. If the Okta SDK requires this format, click **PEM**. The private key appears in PEM format.

        This is your only opportunity to save the private key. Click **Copy to clipboard** to copy the private key and store it somewhere safe.

1. Click **Done**. The new public key is now registered with the app and appears in a table in the **PUBLIC KEYS** section of the **General** tab.

1. Click **Save**. A message states that the client authentication method is now **Public key/Private key**. Any existing client secrets for the app are deleted. Click **Save** to continue.

### Use a URL to fetch keys dynamically

This option allows you to host your public key in a URI and paste the link to the public key in the Admin Console. This URL contains public keys that clients can use to verify the signature of client-based access tokens and OpenID Connect ID tokens. By hosting the keys in a URL, you can conveniently rotate the keys without having to update the app configuration every time.

> **Note:** If you switch from saving keys in Okta to using a URL to fetch keys dynamically, any saved public keys are deleted.

1. After you select **Use a URL to fetch keys dynamically**, enter the URL in the **URL** box, for example: `https://{yourOktaDomian}/oauth2/v1/keys`.

1. Click **Save**.

1. Make note of the client ID. You need this in the [Get an access token](#get-an-access-token) section.

    The JWKS should look something like this:

    ```json
    {
        "keys": [
        {
            "kty": "RSA",
            "e": "AQAB",
            "use": "sig",
            "kid": "my_key_id",
            "alg": "RS256",
            "n": "u0VYW2-76A_lYg5NQihhcPJYYU9-NHbNaO6LFERWnOUbU7l3MJdmCailwSzjO76O-2GdLE-Hn2kx04jWCCPofnQ8xNmFScNo8UQ1dKVq0UkFK-sl-Z0Uu19GiZa2fxSWwg_1g2t-ZpNtKCI279xGBi_hTnupqciUonWe6CIvTv0FfX0LiMqQqjARxPS-6fdBZq8WN9qLGDwpjHK81CoYuzASOezVFYDDyXYzV0X3X_kFVt2sqL5DVN684bEbTsWl91vV-bGmswrlQ0UVUq6t78VdgMrj0RZBD-lFNJcY7CwyugpgLbnm4HEJmCOWJOdjVLj3hFxVVblNJQQ1Z15UXw"
        }
      ]
    }
    ```

## Grant allowed scopes

Now that you've created the service app and registered the public key with that service app, you need to [define the allowed scopes](/docs/guides/implement-oauth-for-okta/main/#scopes-and-supported-endpoints). When a request is sent to the org authorization server's `/token` endpoint, it validates all requested scopes in the request against the service app's grants collection. If the scope exists in the grants collection, the scope is granted.

> **Note:** Only the Super Admin role has the permissions to grant scopes to an app.

1. From the service app page, select the **Okta API Scopes** tab.
2. Click **Grant** for each of the scopes that you want to add to the app's grant collection.

    > **Note:** You can also use the `/grants` API to add a grant for an allowed scope to your service app. The following POST example creates a grant for the `okta.users.read` scope.

    Provide values for these parameters in your request:

    * `scopeID`: `okta.users.read`
    * `issuer`: `https://{yourOktaDomain}`

    ```bash
    curl --location --request POST 'https://{yourOktaDomain}/api/v1/apps/{serviceappclient_id}/grants' \
    --header 'Accept: application/json' \
    --header 'Content-Type: application/json' \
    --header 'Authorization: SSWS 00...Y' \
    --header 'Cache-Control: no-cache' \
    --data-raw '{
        "scopeId": "okta.users.read",
        "issuer": "https://{yourOktaDomain}"
    }'
    ```

## Create and sign the JWT

> **Note:** Okta SDKs support creating and signing the JWT and requesting an access token. If you’re using an Okta SDK, you can skip this section and the [Get an access token](#get-an-access-token) section.

Create and sign the JWT with your private key for use as a JWT assertion in the request for a scoped access token. You can create this `client_credentials` JWT in several ways.

For testing purposes, use [this tool](https://www.jsonwebtoken.dev/) to generate and sign a JWT. This tool supports both JWT and PEM formats. For a production use case, see [Build a JWT with a private key](/docs/guides/build-self-signed-jwt/java/main/#build-a-jwt-with-a-private-key) for both a Java and a JavaScript example of signing the JWT.

> **Note:** After the service app has Okta-scoped grants, only an admin with Super Admin role permissions can rotate the keys.

Use the following [JWT claims](https://developer.okta.com/docs/api/openapi/okta-oauth/guides/client-auth/#token-claims-for-client-authentication-with-client-secret-or-private-key-jwt) in the request for a scoped access token:

* `alg`: One of the supported algorithm values (RS256, RS384, RS512, ES256, ES384, or ES512). This is required for Okta to successfully verify the token by using the signing keys provided in the [previous step](#generate-the-jwk-using-the-admin-console). The `alg` parameter goes in the JWT header rather than a claim in the payload of the body.
* `aud`: The full URL of the resource that you're using the JWT to authenticate to
* `exp`: The expiration time of the token is in seconds since January 1, 1970 UTC (the current UNIX timestamp). This value must be a maximum of only one hour in the future.
* `jti`: (Optional) The token's unique identifier. Use this value to prevent the JWT from being replayed. The claim is a case-sensitive string.
* `iat`: (Optional) The issuing time of the token in seconds since January 1, 1970 UTC (current UNIX timestamp)
* `iss`: The issuer of the token. This value must be the same as the `client_id`.
* `sub`: The subject of the token. This value must be the same as the `client_id`.

1. For this example, include the following parameters in the payload of the JWT:

    * `aud`: `https://{yourOktaDomain}/oauth2/v1/token`
    * `iss`: `client_id`
    * `sub`: `client_id`
    * `exp`: `1614664267`

    **Payload example**

    ```json
    {
        "aud": "https://{yourOktaDomain}/oauth2/v1/token",
        "iss": "0oar95zt9zIpYuz6A0h7",
        "sub": "0oar95zt9zIpYuz6A0h7",
        "exp": "1614664267"
    }
    ```

2. In the **Signing Key** box, paste the public and private key that you generated in the [Generate the JWK using the Admin Console](#generate-the-jwk-using-the-admin-console) step.

3. For the key format, use either the default of **JWT** or switch to **PEM**, and then click **Generate JWT**.

4. The signed JWT appears. Copy the JWT for use in the [Get an access token](#get-an-access-token) step.

## Get an access token

To request an access token using the Client Credentials grant flow, your app makes a request to your Okta [org authorization server's](/docs/concepts/auth-servers) `/token` endpoint.

Include the following parameters:

* `scope`: Include the scopes that allow you to perform the actions on the endpoint that you want to access. The scopes requested for the access token must already be in the [app's grants collection](#grant-allowed-scopes). See [Scopes and supported endpoints](/docs/guides/implement-oauth-for-okta/main/#scopes-and-supported-endpoints).

    In this example, request access for only one scope. When you request an access token for multiple scopes, the format for the scope value looks like this: `scope=okta.users.read okta.apps.read`.

* `client_assertion_type`: Specifies the type of assertion, in this case a JWT token:  `urn:ietf:params:oauth:client-assertion-type:jwt-bearer`.

* `client_assertion`: The signed JWT. Paste the JWT that you signed in the [Create and sign the JWT](#create-and-sign-the-jwt) section.

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

1. If you’re using Postman to test, select the **List Users** `GET` request to the `/api/v1/users` endpoint to get back a list of all users.
2. On the **Header** tab, remove the existing Okta API token (SSWS Authorization API Key).
3. Click the **Authorization** tab and from the **Type** dropdown box, select **OAuth 2.0**.
4. On the right, paste the access token into the **Access Token** box and click **Send**. The response should contain an array of all the users who are associated with your app. This depends on the user's permissions.

**Example Request**

```bash
curl -X GET "https://{yourOktaDomain}/api/v1/users"
    -H "Accept: application/json"
    -H "Content-Type: application/json"
    -H "Authorization: Bearer eyJraWQiOiJEa1lUbmhTdkd5OEJkbk9yMVdYTENhbVFRTUZiNTlYbHdBWVR2bVg5ekxNIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULmRNcmJJc1paTWtMR0FyN1gwRVNKdmdsX19JOFF4N0pwQlhrVjV6ZGt5bk0iLCJpc3MiOiJodHRwczovL2xvZ2luLndyaXRlc2hhcnBlci5jb20iLCJhdWQiOiJodHRwczovL2dlbmVyaWNvaWRjLm9rdGFwcmV2aWV3LmNvbSIsInN1YiI6IjBvYXI5NXp0OXpJcFl1ejZBMGg3IiwiaWF0IjoxNTg4MTg1NDU3LCJleHAiOjE1ODgxODkwNTcsImNpZCI6IjBvYXI5NXp0OXpJcFl1ejZBMGg3Iiwic2NwIjpbIm9rdGEudXNlcnMubWFuYWdlIl19.TrrStbXUFtuH5TemMISgozR1xjT3rVaLHF8hqnwbe9gmFffVrLovY-JLl63G8vZVnyudvZ_fWkOBUxip1hcGm80KvrSgpdOp9Nazz-mjkP6T6JwslRFHDe8SC_4h2LG9zi5PV9y3hAayBK51q1HIwgAxl_2F7q4l0jLKDFsWjQS8epNaB05NLI12BDvO-C-7ZGGJ4EQfGS9EjN9lS-vWnt_V3ojTL0BJCKgL5Y0c9D2VkSqVN4j-7BSRZt0Un3MAEgznXmk2ecg3y7s9linGR0mC3QqKeyDfFNdsUJG6ac0h2CFFZQizpQu1DFmI_ADKmzxVQGPICuslgJFFoIF4ZA"
```
