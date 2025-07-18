---
title: Manage keys
meta:
  - name: description
    content: You can create signing keys to authenticate your app with Okta and create encryption keys to encrypt the ID token and the access token.
layout: Guides
sections:
- main
---

Create and manage the keys that you use for authenticating your app and for encrypting the ID token. Create and manage keys that you use to encrypt an access token minted by a custom authorization server.

---

#### Learning outcomes

* Create more client secrets for a client app and manage existing client secrets.
* Generate public/private key pairs for a client app using the Admin Console and manage other key pairs.

#### What you need

* [Okta Integrator Free Plan org](https://developer.okta.com/signup)
* Access to the [Application Client Auth Credentials API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/ApplicationSSOCredentialOAuth2ClientAuth/).
* <ApiLifecycle access="ea" />Access to the [Resource Server Public Keys API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/OAuth2ResourceServerCredentialsKeys/).
* An existing OpenID Connect client app in Okta for testing in Okta
* An existing custom authorization server
* A JWK public/private key pair for testing.
* The [Postman client](https://www.getpostman.com/downloads/) to test requests. See [Get Started with the Okta APIs](https://developer.okta.com/docs/reference/rest/) for information on setting up Postman.
* The [Key management Postman Collection](https://www.postman.com/devdocsteam/workspace/developer-docs-postman-collections/collection/6141897-2cc824d1-a4d2-4a13-8460-988a8f834f5e) that allows you to test the API calls that are described in this guide. Click the ellipses next to the collection name in the left panel. Click **More** > **Export**, and then click **Export JSON** to export the collection locally. You can then import the collection into your Postman Workspace.

---

## About JSON Web Keys (JWKs)

A JSON Web Key (JWK) is a key pair expressed in JSON format that represents a cryptographic key. It consists of a public and private key. JWKs are commonly used in the context of JSON Web Tokens (JWT) and OAuth 2.0 for securely transmitting information between parties.

**Public key**: You can share this key with anyone. Use this key to verify signatures or encrypt data. In the context of JWKs, it typically includes parameters like `kty` (key type), `alg` (algorithm), and the actual key material (for example, `n` for RSA public keys).

**Private key**: Keep this key secret and use it to sign data or decrypt information that was encrypted with the corresponding public key.

JWKs are used to verify the signature of JWTs, ensuring that the token was issued by a trusted source and hasn't been tampered with. JWKs can be part of a JWK Set (JWKS), which is a collection of JWKs. This is useful for apps that need to support multiple keys for rotation or different algorithms.

A typical JWK might look like this:

```JSON
    {
        "kty": "RSA",
        "kid": "1234",
        "use": "sig",
        "alg": "RS256",
        "n": "modulus",
        "e": "exponent"
    }
```

### Keys that secure your app

In the context of securing your app with Okta, there are two types of keys that play crucial roles. Understanding and properly managing these keys is essential for maintaining the security and integrity of your app when interacting with Okta.

#### Signing keys (sig) for client authentication

These JSON web signature keys are used to authenticate your app with Okta. They ensure that the requests made to Okta are indeed coming from your app, providing a layer of trust and security in the communication process.

Depending on what type of credentials that a [client uses to authenticate](https://developer.okta.com/docs/api/openapi/okta-oauth/guides/client-auth/#client-authentication-methods), a signing key (JWK) may be required. Apps that use signing keys for client authentication have substantially higher security. This is because only the client can access the private key.

You can use the API to add your own signing keys or a JWK URI to authentication your app with Okta. To have Okta generate a signing public/private key pair for your app, use the [Admin Console](https://help.okta.com/okta_help.htm?type=oie&id=oauth-client-cred).

#### Encryption keys (enc) for ID tokens

<ApiLifecycle access="ea" />

Use an encryption key to provide an additional layer of security to ID tokens minted by an Okta authorization server for your app. When you encrypt an ID token, only the intended recipient with the corresponding decryption key (private key) can access the original information.

### Secure the access token

<ApiLifecycle access="ea" />

Use an encryption key to encrypt an access token to ensure its confidentiality and protect sensitive information, such as scopes or permissions. You can encrypt access tokens minted by an Okta custom authorization.

> **Notes**:
>
>This guide covers the API steps for managing your JSON Web Keys and JWK URIs. To use the Admin Console to perform these tasks, see [Manage secrets and keys for OIDC apps](https://help.okta.com/okta_help.htm?type=oie&id=oauth-client-cred). To have Okta generate a signing or encryption key for you, using the Admin Console is required.
>
>Use the Admin Console to generate a signing or encryption public/private key pair for testing purposes only. For a production use case, use your own internal instance of the key pair generator. For an example, see [key pair generator](https://github.com/mitreid-connect/mkjwk.org).
>
>Some Okta SDKs require that keys be in privacy enhanced mail (PEM) format. If you're using an SDK, verify the format required before you create your JWK.

## About the Postman Collection

It’s up to you how you make requests to the APIs to manage JWKs. In this guide, Okta provides examples of the required API calls using a Postman Collection to demonstrate them in a language/platform neutral way.

The collection contains three subcollections:

* **Client authentication**: Signing key management tasks
* **Encrypt the ID token**: Encryption key management tasks
* **Encrypt an access token**: Encrypting the access token sent from a custom authorization server

> **Note:** Make sure that you [configure your Okta org as the environment in Postman](https://developer.okta.com/docs/reference/rest/).

## Save keys in Okta

This option allows you to bring your own signing or encryption keys. You can add up to 50 keys per app. This section assumes that you've already [generated your JWK public and private key pair](#what-you-need).

> **Note:** To add a public key using the Admin Console, see [Manage secrets and keys for OIDC apps](https://help.okta.com/okta_help.htm?type=oie&id=oauth-client-cred).

The **Client authentication** and **Encrypt the ID token** folders of the Postman Collection are used in this section.

1. Use the **Add a signing key JWK** or the **Add an encryption key** <ApiLifecycle access="ea" /> request.
1. In the path parameters, replace the following variables:
    * `{url}`: Your Okta domain URL where the app is configured
    * `{appId}`: The application ID
1. On the **Body** tab, paste your public key. Be sure to include a value for the `kid` parameter. In addition, verify that the `use` parameter has a value of `sig` to indicate a signing key JWK. For an encryption key JWK, the `use` parameter should be `enc`.
1. Send the `POST {yourOktaDomain}/api/v1/apps/{appId}/credentials/jwks` request.

    > **Note**: You can also add a signing key when you create the app. See the [Apps API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Application/#tag/Application/operation/createApplication!path=4/settings/oauthClient/jwks&t=request).

    The response should look something like this:

    **Signing key**

    ```json
        {
            "kty": "RSA",
            "id": "{jwksId}",
            "created": "2022-01-10T23:53:49.000Z",
            "lastUpdated": "2022-01-10T23:53:49.000Z",
            "status": "ACTIVE",
            "alg": "RS256",
            "kid": "key1",
            "use": "sig",
            "_links": {
                "deactivate": {
                    "href": "https://{yourOktaDomain}/api/v1/apps/{appId}/credentials/jwks/{jwksId}/lifecycle/deactivate",
                    "hints": {
                        "allow": [
                            "POST"
                        ]
                    }
                }
            },
            "e": "AQAB",
            "n": "rKzoV-g0BFBvhJXLnYJCuV3Gq_yFiVXOxcKdwI99Vj9-zwul0u1_o4t7QNJl2NX_756eRgLL9TIvfyuktkpicxt6IVmdCeFOl1ij0LOmIvMRvfevDwQwbbIlPGkuVZSCHDymo2gMgC43cGSEpLaLlS8qToiHPTRI43SSEmfqrYgCC3cIWx3Ce7NgjIiosx_O95jL8pP3ZKrVNd6LgpNBcP9SmxScFAurpgQFcTR4m-KwrenGKR85WmB-p7IcQWYBdwHiSoQvD2dFLmLc48zgbu6m62OxyIP8NN5TkZEV0C1K61W07fA0qesBQ4h5p-ynGG0QezVNcNzx-HyuchlCbQ"
        }
    ```

    **Encryption key**
    <ApiLifecycle access="ea" />

    ```json
        {
            "kty": "RSA",
            "id": "pks8m1hju1OGb5Gi90g7",
            "created": "2025-07-15T22:46:10.000Z",
            "lastUpdated": "2025-07-15T22:46:10.000Z",
            "status": "ACTIVE",
            "kid": "zUjOKTJrPP-XFgg7B8nAJN9vAUONXuFPUBi1kD_HLAs",
            "use": "enc",
            "_links": {
                 "deactivate": {
                    "href": "https://{yourOktaDomain}/api/v1/apps/{appId}/credentials/jwks/{jwksId}/lifecycle/deactivate",
                    "hints": {
                        "allow": [
                            "POST"
                        ]
                    }
                 }
            },
            "e": "AQAB",
            "n": "hUo9QIgVHGG9zopM6u2Mj9NYu6IeuwI_seODhZ1qMb66Mhq1QWk7gYbRIfX7cj-IjetiNNwd5lOAB0jL4u8YXAtUfzVPOaQitnmC3rGBEu6JM_zh1yy6zxzgu85ekp2qfUTqdiLaAxmQq0VVQNPGXpN3axb17CtPFG7MjVAuuGSHQAKvGkSmz8av_bIHYbflksACoCohoH_5nFoN6wVamE1w43zwSy8W4SMwzfOQO10lCdBGexnunOKtHsmE0lKD0sb0UI6QGxDwePRy-gJC4s7FkM4gnHxhPbGsoOMlOYiczR5FANtCVA8WjqkJ2uxUvjEaegKjHE16GFKnvavtoQ"
        }
    ```

1. Test your app and ensure that all functionality works with the new JWK.

## Use a URL to fetch keys dynamically

This option allows you to host your public key in a URI. This URL contains public keys that clients can use to verify the signature of client-based access tokens and OpenID Connect ID tokens.

> **Note:** If you switch from saving keys in Okta to using a URL to fetch keys dynamically, any saved public keys are deleted.

By hosting the keys in a URL, you can conveniently rotate the keys without having to update the app configuration every time. Okta dynamically fetches the latest public key for the app. This eliminates the need to manually update the public key when you’re rotating the key pair.

> **Note:** To add a URL to fetch keys dynamically using the Admin Console, see [Manage secrets and keys for OIDC apps](https://help.okta.com/okta_help.htm?type=oie&id=oauth-client-cred).

The **Client authentication** and **Encrypt the ID token** folders of the Postman Collection are used in this section.

1. Use the **Add a signing key URI** or **Add an encryption key URI** <ApiLifecycle access="ea" />request.
1. In the path parameters, replace the following variables:
    * `{url}`: Your Okta domain URL where the app is configured
    * `{clientId}`: The application ID
1. On the **Body** tab, use the request body template to add the appropriate values for your app, and then enter your JWKS URI as the `jwks_uri` value.
1. Send the `POST {yourOktaDomain}/oauth2/v1/clients/{clientId}` request.

    **Note**: You can also add a JWKS URI when you create the app. See the [Apps API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Application/#tag/Application/operation/createApplication!path=4/settings/oauthClient/jwks_uri&t=request).

    The response should look something like this:

    **Signing key**

    ```JSON
        {
            "client_id": "{client_id}",
            "client_secret": "{client_secret}",
            "client_id_issued_at": 1642033231,
            "client_secret_expires_at": 0,
            "client_name": "Test App",
            "client_uri": null,
            "logo_uri": null,
            "redirect_uris": [
                "http://localhost:8080/authorization-code/callback"
            ],
            "post_logout_redirect_uris": [
                "http://localhost:8080"
            ],
            "response_types": [
                "code"
            ],
            "grant_types": [
                "authorization_code"
            ],
            "jwks_uri": "https://{URI_to_JWK}",
            "token_endpoint_auth_method": "client_secret_basic",
            "application_type": "web"
        }
    ```

    **Encryption key**
    <ApiLifecycle access="ea" />

    ```JSON
        {
            "client_id": "{client_id}",
            "client_secret": "{client_secret}",
            "client_id_issued_at": 1752619515,
            "client_secret_expires_at": 0,
            "client_name": "Test app",
            "client_uri": null,
            "logo_uri": null,
            "redirect_uris": [
                "http://localhost:8080/authorization-code/callback"
            ],
            "post_logout_redirect_uris": [
                "http://localhost:8080"
            ],
            "response_types": [
                "code"
            ],
            "grant_types": [
                "authorization_code"
            ],
            "jwks_uri": "https://{URI_to_JWK}",
            "token_endpoint_auth_method": "client_secret_basic",
            "application_type": "web"
        }
    ```

## Deactivate a key

When you’re ready to retire a public key, change the older JWK status from **Active** to **Inactive** using the API.

> **Note:** To retire a public key using the Admin Console, see [Manage secrets and keys for OIDC apps](https://help.okta.com/okta_help.htm?type=oie&id=oauth-client-cred).

1. Use the **List JWKS** and **Get a JWK** requests.
1. Use the **Deactive a JWK** request after you have the JWKS ID that you need.
1. In the path parameters, replace the following variables:
    * `{url}`: Your Okta domain URL where the app is configured
    * `{appId}`: The application ID
    * `{jwksId}`: The `id` of the public JWK
1. Send the `POST {yourOktaDomain}/api/v1/apps/{appId}/credentials/jwks/{jwksId}/lifecycle/deactivate` request. The response should look something like this:

    **Signing key**

    ```JSON
        {
            "kty": "RSA",
            "id": "{jwksId}",
            "created": "2022-01-10T23:53:49.000Z",
            "lastUpdated": "2022-01-11T00:25:16.000Z",
            "status": "INACTIVE",
            "alg": "RS256",
            "kid": "key1",
            "use": "sig",
            "_links": {
                "activate": {
                    "href": "https://{yourOktaDomain}/api/v1/apps/{appId}/credentials/jwks/{jwksId}/lifecycle/activate",
                    "hints": {
                        "allow": [
                            "POST"
                        ]
                    }
                },
                "delete": {
                    "href": "https://{yourOktaDomain}/api/v1/apps/{appId}/credentials/jwks/{jwksID}",
                        "hints": {
                            "allow": [
                                "DELETE"
                            ]
                        }
                    }
        },
        "e": "AQAB",
        "n": "rKzoV-g0BFBvhJXLnYJCuV3Gq_yFiVXOxcKdwI99Vj9-zwul0u1_o4t7QNJl2NX_756eRgLL9TIvfyuktkpicxt6IVmdCeFOl1ij0LOmIvMRvfevDwQwbbIlPGkuVZSCHDymo2gMgC43cGSEpLaLlS8qToiHPTRI43SSEmfqrYgCC3cIWx3Ce7NgjIiosx_O95jL8pP3ZKrVNd6LgpNBcP9SmxScFAurpgQFcTR4m-KwrenGKR85WmB-p7IcQWYBdwHiSoQvD2dFLmLc48zgbu6m62OxyIP8NN5TkZEV0C1K61W07fA0qesBQ4h5p-ynGG0QezVNcNzx-HyuchlCbQ"
        }
    ```

    **Encryption key**
    <ApiLifecycle access="ea" />

    ```JSON
        {
            "kty": "RSA",
            "id": "{jwksID}",
            "created": "2025-07-15T22:46:10.000Z",
            "lastUpdated": "2025-07-15T22:48:40.000Z",
            "status": "INACTIVE",
            "kid": "zUjOKTJrPP-XFgg7B8nAJN9vAUONXuFPUBi1kD_HLAs",
            "use": "enc",
            "_links": {
                "activate": {
                    "href": "https://{yourOktaDomain}/api/v1/apps/{appId}/credentials/jwks/{jwksId}/lifecycle/activate",
                    "hints": {
                        "allow": [
                            "POST"
                        ]
                }
            },
                "delete": {
                    "href": "https://{yourOktaDomain}/api/v1/apps/{appId}/credentials/jwks/{jwksId}",
                    "hints": {
                        "allow": [
                            "DELETE"
                        ]
                }
            }
        },
        "e": "AQAB",
        "n": "hUo9QIgVHGG9zopM6u2Mj9NYu6IeuwI_seODhZ1qMb66Mhq1QWk7gYbRIfX7cj-IjetiNNwd5lOAB0jL4u8YXAtUfzVPOaQitnmC3rGBEu6JM_zh1yy6zxzgu85ekp2qfUTqdiLaAxmQq0VVQNPGXpN3axb17CtPFG7MjVAuuGSHQAKvGkSmz8av_bIHYbflksACoCohoH_5nFoN6wVamE1w43zwSy8W4SMwzfOQO10lCdBGexnunOKtHsmE0lKD0sb0UI6QGxDwePRy-gJC4s7FkM4gnHxhPbGsoOMlOYiczR5FANtCVA8WjqkJ2uxUvjEaegKjHE16GFKnvavtoQ"
        }
    ```

## Delete a key

After you deactivate the old key, you can then delete it. This ensures that the older key isn’t used by mistake. The **Client authentication** and **Encrypt the ID token** folders of the Postman Collection are used in this section.

> **Note:** To delete a public key using the Admin Console, see [Manage secrets and keys for OIDC apps](https://help.okta.com/okta_help.htm?type=oie&id=oauth-client-cred).

1. Use the **Delete a signing key** or **Delete an encryption key** <ApiLifecycle access="ea" />request.
1. In the path parameters, replace the following variables:
    * `{url}`: Your Okta domain URL where the app is configured
    * `{appId}`: The application ID
    * `{jwksId}`: The `id` of the public JWK
1. Send the `DELETE {yourOktaDomain}/api/v1/apps/{appId}/credentials/jwks/{jwksId}` request.

## Add an encryption key algorithm

<ApiLifecycle access="ea" />

Optional. You can use the same encryption key with different algorithms. Okta supports the following algorithms:

* RSA-OAEP-256
* RSA-OAEP-384
* RSA-OAEP-512

The encryption key must have an **ACTIVE** status to add an encryption algorithm. The **Encrypt the ID token** folder of the Postman Collection is used in this section.

> **Note:** To add an encryption key algorithm using the Admin Console, see [Manage secrets and keys for OIDC apps](https://help.okta.com/okta_help.htm?type=oie&id=oauth-client-cred).

1. Use the **Add an encryption key algorithm** request.
1. In the path parameters, replace the following variables:
    * `{url}`: Your Okta domain URL where the app is configured
    * `{clientId}`: The client ID
1. On the **Body** tab, use the request body template to add the appropriate values for your client, and then add the `id_token_encrypted_response_alg` parameter with a value of `RSA-OAEP-256`.
1. Send the `PUT {yourOktaDomain}/oauth2/v1/clients/{clienId}` request.

Example response

```JSON
    {
        "client_id": "{clientId}",
        "client_secret": "{clientSecret}",
        "client_id_issued_at": 1750709519,
        "client_secret_expires_at": 0,
        "client_name": "Test App",
        "client_uri": null,
        "logo_uri": null,
        "redirect_uris": [
            "http://localhost:8080/authorization-code/callback"
        ],
        "post_logout_redirect_uris": [
            "http://localhost:8080"
        ],
        "response_types": [
            "code"
        ],
        "grant_types": [
            "authorization_code"
        ],
        "jwks": {
            "keys": [
                {
                    "kty": "RSA",
                    "kid": "1",
                    "use": "enc",
                    "e": "AQAB",
                    "n": "2rzNBkCg7cf-GHQNvFf84ZE5M6u03YXlBWx8XFNty5XSfPS6L1Q652qRX3PjKLKSQjnJPpJ0qwD9ciwLQ6yCWGRltnT-3dm-a441cYdXUZPMtf6i-HfPNkVdeZt-WG9jFj2_i5c399CnPyAUyLnO3ygnJqoP7EEBIzdjjQCQlLW4B9T3b5NHBo5-VzLjsu-mRcSEKQnVdEW6WLk8_hMU8cH5hRSBnxo-B2a6aXffZdzMXB6-Rn5CFKjrtg0mSFYc9XHQynCZ1yH_D3Dtl48-8_6F0oJ9c7mwt1Ph8OvHY1o3xsHxdLo6dAJm7AUeCTImhopW1hGXpashGSqtBGt7Ew"
                }
            ]
        },
        "token_endpoint_auth_method": "client_secret_basic",
        "application_type": "web",
        "id_token_encrypted_response_alg": "RSA-OAEP-256"
    }
```

## Encrypt an access token

<ApiLifecycle access="ea" />

You can encrypt access tokens using an encryption key. This ensures the access token's confidentiality and protects sensitive information, such as scopes or permissions. You can encrypt access tokens minted only by an Okta custom authorization server.

> **Note**: The **Encrypt an access token** folder of the Postman Collection is used in this section.

## Save keys in Okta for a custom authorization server

This option allows you to bring your own encryption key. You can add up to 50 keys per authorization server. However, only one key can be active at a time. When you add the key, add it with a status of `INACTIVE` and then activate it in the [next section](#use-a-url-to-fetch-keys-dynamically-1). This section assumes that you've already [generated your JWK public and private key pair](#what-you-need).

> **Note:** To add a public key using the Admin Console, see [Manage secrets and keys for OIDC apps](https://help.okta.com/okta_help.htm?type=oie&id=oauth-client-cred).

1. Use the **Add an encryption key** request.
1. In the path parameters, replace the following variables:
    * `{url}`: Your Okta domain URL where the app is configured
    * `{authorizationServerId}`: The custom authorization server ID
1. On the **Body** tab, paste the public key from the resource server. Parameters to include:
    * `kid`
    * `use: enc`
    * `status: INACTIVE`
    **Note:** You can have only one active key at any given time for the authorization server. When you activate an inactive key, Okta automatically deactivates the current active key.
1. Send the `POST {yourOktaDomain}/api/v1/authorizationServers/{authServerId}/resourceservercredentials/keys` request. The response should look something like this:

    ```JSON
        {
            "kty": "RSA",
            "id": "{keyId}",
            "created": "2025-07-18T17:32:45.000Z",
            "lastUpdated": "2025-07-18T17:32:45.000Z",
            "status": "INACTIVE",
            "kid": "zUjOKTJrPP-XFgg7B8nAJN9vAUONXuFPUBi1kD_HLAs",
            "use": "enc",
            "_links": {
                "activate": {
                    "href": "https://{yourOktaDomain}/api/v1/authorizationServers/{authorizationServerId}/resourceservercredentials/keys/{keyId}/lifecycle/activate",
                    "hints": {
                        "allow": [
                            "POST"
                        ]
                    }
                },
                "delete": {
                    "href": "https://{yourOktaDomain}/api/v1/authorizationServers/{authorizationServerId}/resourceservercredentials/keys/{KeyId}",
                    "hints": {
                        "allow": [
                            "DELETE"
                        ]
                    }
                }
            },
            "e": "AQAB",
            "n": "hUo9QIgVHGG9zopM6u2Mj9NYu6IeuwI_seODhZ1qMb66Mhq1QWk7gYbRIfX7cj-IjetiNNwd5lOAB0jL4u8YXAtUfzVPOaQitnmC3rGBEu6JM_zh1yy6zxzgu85ekp2qfUTqdiLaAxmQq0VVQNPGXpN3axb17CtPFG7MjVAuuGSHQAKvGkSmz8av_bIHYbflksACoCohoH_5nFoN6wVamE1w43zwSy8W4SMwzfOQO10lCdBGexnunOKtHsmE0lKD0sb0UI6QGxDwePRy-gJC4s7FkM4gnHxhPbGsoOMlOYiczR5FANtCVA8WjqkJ2uxUvjEaegKjHE16GFKnvavtoQ"
        }
    ```

## Activate an encryption key

To activate an encryption key for your custom authorization server, follow these steps.

> **Note:** To activate an encryption key using the Admin Console, see [Manage secrets and keys for OIDC apps](https://help.okta.com/okta_help.htm?type=oie&id=oauth-client-cred).

1. Use the **Activate an encryption key** request.
1. In the path parameters, replace the following variables:
    * `{url}`: Your Okta domain URL where the app is configured
    * `{authorizationServerId}`: The application ID
    * `{keyId}`: The `id` of the public JWK
1. Send the `POST {yourOktaDomain}/api/v1/authorizationServers/{authorizationServerId}/resourceservercredentials/keys/{keyId}/lifecycle/activate` request. The response should look something like this:

    ```JSON
        {
            "kty": "RSA",
            "id": "apk8m6rvgsLSCdAmO0g7",
            "created": "2025-07-18T19:23:36.000Z",
            "lastUpdated": "2025-07-18T19:24:38.000Z",
            "status": "ACTIVE",
            "kid": "zUjOKTJrPP-XFgg7B8nAJN9vAUONXuFPUBi1kD_HLAs",
            "use": "enc",
            "e": "AQAB",
            "n": "hUo9QIgVHGG9zopM6u2Mj9NYu6IeuwI_seODhZ1qMb66Mhq1QWk7gYbRIfX7cj-IjetiNNwd5lOAB0jL4u8YXAtUfzVPOaQitnmC3rGBEu6JM_zh1yy6zxzgu85ekp2qfUTqdiLaAxmQq0VVQNPGXpN3axb17CtPFG7MjVAuuGSHQAKvGkSmz8av_bIHYbflksACoCohoH_5nFoN6wVamE1w43zwSy8W4SMwzfOQO10lCdBGexnunOKtHsmE0lKD0sb0UI6QGxDwePRy-gJC4s7FkM4gnHxhPbGsoOMlOYiczR5FANtCVA8WjqkJ2uxUvjEaegKjHE16GFKnvavtoQ"
        }
    ```

## Use a URL to fetch keys dynamically

This option allows you to host your public key in a URI. By hosting the keys in a URL, you can conveniently rotate the keys without having to update the authorization server configuration every time. Okta dynamically fetches the latest public key, which eliminates the need to manually update the public key when you’re rotating the key pair. If you switch from saving keys in Okta to using a URL to fetch keys dynamically, any saved public keys are deleted.

> **Note:** To add a URL to fetch keys dynamically using the Admin Console, see [Manage secrets and keys for OIDC apps](https://help.okta.com/okta_help.htm?type=oie&id=oauth-client-cred).

1. Use the **Add an encryption key URI** request.
1. In the path parameters, replace the following variables:
    * `{url}`: Your Okta domain URL where the app is configured
    * `{authorizationServerId}`: The custom authorization server ID
1. On the **Body** tab, use the request body template to add the appropriate values for your authorization server, and then add your JWKS URI as the value for `jwksUri`.
    **Note:** You can have only one JWKS URI at a time for the authorization server.
1. Send the `PUT {yourOktaDomainl}/api/v1/authorizationServers/{authorizationServerId}` request.

    **Note**: You can also add a JWKS URI when you create the authorization server. See the [Authorization Server API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/AuthorizationServer/#tag/AuthorizationServer/operation/createAuthorizationServer!path=jwks&t=request).

     The response should look something like the following example. This response is truncated for brevity.

    ```JSON
        {
            "id": "{authServerId}",
            "name": "AuthServerName",
            "description": "testing",
            "audiences": [
                "api://default"
            ],
            "issuer": "https://{yourOktaDomain}/oauth2/{authorizationServerId}",
            "issuerMode": "DYNAMIC",
            "jwksUri": "https://{yourJWKSURI}",
            "status": "ACTIVE",
            "created": "2025-07-18T17:26:03.000Z",
            "lastUpdated": "2025-07-18T18:35:33.000Z",
            "credentials": {
                "signing": {
                    "kid": "mGCeIdK0yN6n6Gl_tMV4H8u0q3XpOSxMgY0m_Tw6b1I",
                    "rotationMode": "AUTO",
                    "lastRotated": "2025-07-18T17:26:03.000Z",
                    "nextRotation": "2025-10-16T17:26:03.000Z"
                }
            },
            "default": false,
            "_links": {
                "rotateKey": {
                    "href": "https://{yourOktaDomain}/api/v1/authorizationServers/{authorizationServerId}/credentials/lifecycle/keyRotate",
                    "hints": {
                        "allow": [
                            "POST"
                        ]
                    }
                },
        . . . . .
        }
    }
    ```

## Add an encryption key algorithm

Optional. You can use the same encryption key with different algorithms. Okta supports the following algorithms:

* RSA-OAEP-256
* RSA-OAEP-384
* RSA-OAEP-512

The encryption key must have an **ACTIVE** status to add an encryption algorithm.

> **Note:** To add an encryption key algorithm using the Admin Console, see [Manage secrets and keys for OIDC apps](https://help.okta.com/okta_help.htm?type=oie&id=oauth-client-cred).

1. Use the **Add an encryption key algorithm** request.
1. In the path parameters, replace the following variables:
    * `{url}`: Your Okta domain URL where the app is configured
    * `{authorizationServerId}`: The client ID
1. On the **Body** tab, use the request body template to add the appropriate values for your client, and then add the `accessTokenEncryptedResponseAlgorithm` with a value of `RSA-OAEP-256`.
1. Send the `PUT {yourOktaDomain}/api/v1/authorizationServers/{authorizationServerId}` request.

    The response should look something like the following example. This response is truncated for brevity.

    ```JSON
        {
            "id": "{authorizationServerId}",
            "name": "namehere",
            "description": "authorization server description",
            "audiences": [
                "api://default"
            ],
            "issuer": "https://{yourOktaDomain}/oauth2/namehere",
            "issuerMode": "DYNAMIC",
            "accessTokenEncryptedResponseAlgorithm": "RSA-OAEP-256",
            "jwks": {
                "keys": [
                    {
                        "kty": "RSA",
                        "id": "apk8m6ruyq1P0UlBE0g7",
                        "status": "ACTIVE",
                        "kid": "zUjOKTJrPP-XFgg7B8nAJN9vAUONXuFPUBi1kD_HLAs",
                        "use": "enc",
                        "e": "AQAB",
                        "n": "hUo9QIgVHGG9zopM6u2Mj9NYu6IeuwI_seODhZ1qMb66Mhq1QWk7gYbRIfX7cj-IjetiNNwd5lOAB0jL4u8YXAtUfzVPOaQitnmC3rGBEu6JM_zh1yy6zxzgu85ekp2qfUTqdiLaAxmQq0VVQNPGXpN3axb17CtPFG7MjVAuuGSHQAKvGkSmz8av_bIHYbflksACoCohoH_5nFoN6wVamE1w43zwSy8W4SMwzfOQO10lCdBGexnunOKtHsmE0lKD0sb0UI6QGxDwePRy-gJC4s7FkM4gnHxhPbGsoOMlOYiczR5FANtCVA8WjqkJ2uxUvjEaegKjHE16GFKnvavtoQ"
                    }
                ]
            },
        }
    ```

## Deactivate an encryption key

When you’re ready to retire a public key, change the JWK status from **Active** to **Inactive** using the API.

> **Note:** To retire a public key using the Admin Console, see [Manage secrets and keys for OIDC apps](https://help.okta.com/okta_help.htm?type=oie&id=oauth-client-cred).

1. Use the **List JWKS** and **Get a JWK** requests to obtain the key ID.
1. Use the **Deactive a JWK** request after you have the key ID that you need.
1. In the path parameters, replace the following variables:
    * `{url}`: Your Okta domain URL where the app is configured
    * `{authorizationServerId}`: The application ID
    * `{keyId}`: The `id` of the public JWK
1. Send the `POST {yourOktaDomain}/api/v1/authorizationServers/{authorizationServerId}/resourceservercredentials/keys/{keyId}/lifecycle/deactivate` request. The response should look something like this:

??VERIFY THE URL!??

## Delete a public key

After you deactivate the old key, you can then delete it. This ensures that the older key isn’t used by mistake. The **Client authentication** and **Encrypt the ID token** folders of the Postman Collection are used in this section.

> **Note:** To delete a public key using the Admin Console, see [Manage secrets and keys for OIDC apps](https://help.okta.com/okta_help.htm?type=oie&id=oauth-client-cred).

1. Use the **Delete a signing key** or **Delete an encryption key** <ApiLifecycle access="ea" />request.
1. In the path parameters, replace the following variables:
    * `{url}`: Your Okta domain URL where the app is configured
    * `{authorizationServerId}`: The application ID
    * `{keyId}`: The `id` of the public JWK
1. Send the `DELETE {yourOktaDomain}/api/v1/authorizationServers/{authorizationServerId}/resourceservercredentials/keys/{keyId}` request.
