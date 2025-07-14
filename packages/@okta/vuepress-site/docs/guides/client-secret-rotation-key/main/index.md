---
title: Client secret rotation and key management
meta:
  - name: description
    content: Okta client secret rotation helps you rotate and manage your client secrets without service or app downtime. Additionally, you can generate public/private key pairs and manage them using the Admin Console.
layout: Guides
sections:
- main
---

This guide shows you how to rotate and manage your client secrets without service or app downtime. This guide also shows you how to generate public/private key pairs and manage them using the Admin Console.

---

#### Learning outcomes

* Create more client secrets for a client app and manage existing client secrets.
* Generate public/private key pairs for a client app using the Admin Console and manage other key pairs.

#### What you need

* [Okta Integrator Free Plan org](https://developer.okta.com/signup)
* Access to client secret management APIs: `/api/v1/apps/{appId}/credentials/secrets` and JWKS management `/api/v1/apps/{appId}/credentials/jwks`. See [Application Client Auth Credentials](/openapi/okta-management/management/tag/ApplicationSSOCredentialOAuth2ClientAuth/).
* An existing OpenID Connect client app in Okta for testing in Okta
* The[Postman client](https://www.getpostman.com/downloads/) to test requests. See [Get Started with the Okta APIs](https://developer.okta.com/docs/reference/rest/) for information on setting up Postman.
* The [Client Secret Rotation and Key Management Postman Collection](https://www.postman.com/devdocsteam/workspace/developer-docs-postman-collections/collection/6141897-2cc824d1-a4d2-4a13-8460-988a8f834f5e) that allows you to test the API calls that are described in this guide. Click the ellipses next to the collection name in the left panel. Click **More** > **Export**, and then click **Export JSON**. You can then import the collection into your Postman Workspace.

---

## About client secret rotation and public/private key pairs

Just like periodically changing passwords, regularly rotating the client secret that your app uses to authenticate is a security best practice. The challenge with rotating the client secret is to facilitate a seamless client secret rotation without service or app downtime. You need the ability to create overlapping client secrets.

Depending on what type of credentials that a [client uses to authenticate](https://developer.okta.com/docs/api/openapi/okta-oauth/guides/client-auth/#client-authentication-methods), a JSON Web Key (JWK) public/private key pair may be required. Apps that use private/public key pairs for client authentication have substantially higher security. This is because only the client can access the private key. But, private/public key pair generation is laborious and time-consuming, and using the API can lead to errors.

### Generate more secrets and JWKS

To make client secret rotation more seamless, generate an additional client secret for web apps, service apps, and native apps using the API. You can also add a JWK public/private key pair (in JWK format) or define a JWKS URI for your app using the API. You can only use the Admin Console to have Okta generate a JWK public/private key pair (in JWK format) for your app.

To rotate a secret for an app, add your own JWK key pairs and JWKS URIs using the Admin Console, see [Manage secrets and keys for OIDC apps](https://help.okta.com/okta_help.htm?type=oie&id=oauth-client-cred).

> **Note:** Using client authentication with a client secret isn’t recommended for native apps because they’re public clients. The default authorization type for native apps is **Authorization Code with PKCE**. See [Choose an OAuth 2.0 flow](/docs/concepts/oauth-openid/#choose-an-oauth-2-0-flow) for more information on the type of flow to use. See [Implement authorization by grant type](https://developer.okta.com/docs/guides/implement-grant-type/authcodepkce/main/) for more information on how to implement that flow.

### About the Postman Collection

It’s up to you how you make requests to the APIs to generate client secrets and manage JWKs. In this guide, Okta provides examples of the required API calls using a Postman Collection to demonstrate them in a language/platform neutral way. The collection contains two subcollections:

* **Secret Management API** for client secret generation and management tasks
* **JSON Web Key (JWK) Management API** for key management tasks

> **Note:** Make sure that you [configure your Okta org as the environment in Postman](https://developer.okta.com/docs/reference/rest/).

## Rotate a client secret

When you’re ready to rotate a client secret for an app using the API, obtain the current client secrets for your app first. You use the appropriate `cllient_secret` value in a step later to deactivate the old client secret.

When you generate a new secret, the original secret remains in **Active** status. Both secrets are stored in parallel, allowing clients to continue using the old secret during secret rotation. Any request for a secret returns the newly generated client secret. Any requests that are sent using the previous secret still work. The requests continue to work until the status of that client secret is set to **Inactive**.

1. Use the **List client secrets for the specified app** request in the **Secret Management API** folder of the Postman Collection.
1. In the path parameters, replace the following variables:
    * `{url}`: Your Okta domain URL where the app is configured
    * `{applicationId}`: The application ID
1. Send the `GET {yourOktaDomain}/api/v1/apps/{applicationId}/credentials/secrets` request.
1. Save the appropriate client secret to use in the deactivate step later.

    The response should look something like this:

    ```json
        [
            {
                "id": "ocs14izzvk9BGLiu30h8",
                "created": "2022-01-10T21:06:31.000Z",
                "lastUpdated": "2022-01-10T21:06:31.000Z",
                "status": "ACTIVE",
                "client_secret": "3ZIqRCzmjcdNPK2Y29x1qSkI5NRHji_eGIm4aKtI",
                "secret_hash": "jMur1qOhMw_MtC9aQo7YEg",
                "_links": {
                    "deactivate": {
                        "href": "https://{yourOktaDomain}/api/v1/apps/ocs14j5h6sbrzwuzR0h8/credentials/secrets/ocs14izzvk9BGLiu30h8/lifecycle/deactivate",
                        "hints": {
                            "allow": [
                                "POST"
                            ]
                        }
                    }
                }
            },
            {
                "id": "ocs14j4d1kdTKN9fg0h8",
                "created": "2022-01-10T22:33:19.000Z",
                "lastUpdated": "2022-01-10T22:33:19.000Z",
                "status": "ACTIVE",
                "client_secret": "D0HxBn1FtTXeYC4cSBwWL_sPMztMT2t6Ei9n1QjO",
                "secret_hash": "tI4z6TbSw5YYd8RtcClaEw",
                "_links": {
                    "deactivate": {
                        "href": "https://{yourOktaDomain}/api/v1/apps/ocs14j5h6sbrzwuzR0h8/credentials/secrets/ocs14j4d1kdTKN9fg0h8/lifecycle/deactivate",
                        "hints": {
                            "allow": [
                                "POST"
                            ]
                        }
                    }
                }
            }
        ]
    ```

When you’re ready to rotate a client secret for an app, use the following steps with the Postman Collection.

> **Note:** To rotate a client secret for an app using the Admin Console, see [Manage secrets and keys for OIDC apps](https://help.okta.com/okta_help.htm?type=oie&id=oauth-client-cred).

### Auto-generate the secret

To have Okta auto-generate the secret, follow these steps:

1. Use the **Add a client secret: auto-generated** request in the **Secret Management API** folder of the Postman Collection.
1. In the path parameters, replace the following variables:
    * `{url}`: Your Okta domain URL where the app is configured
    * `{applicationId}`: The application ID
1. Send the `POST {yourOktaDomain}/api/v1/apps/{applicationId}/credentials/secrets` request. The response should look something like this:

    ```json
        {
            "id": "ocs14j5h6sbrzwuzR0h8",
            "created": "2022-01-10T22:56:18.000Z",
            "lastUpdated": "2022-01-10T22:56:18.000Z",
            "status": "ACTIVE",
            "client_secret": "7U_MTFeIoRVHtPTcb4MY0gESLLisXfNRbbob1Quo",
            "secret_hash": "cfQjsGNDYEn5e3rqJME_jQ",
            "_links": {
                "deactivate": {
                    "href": "https://{yourOktaDomain}/api/v1/apps/ocs14j5h6sbrzwuzR0h8/credentials/secrets/ocs14izzvk9BGLiu30h8/lifecycle/deactivate",
                    "hints": {
                        "allow": [
                            "POST"
                        ]
                    }
                }
            }
        }
    ```

1. Test your app and ensure that all functionality works with the newly generated client secret.

### Bring your own client secret

To generate your own secret for use with your app, follow these steps:

1. Use the **Add a client secret: bring your own secret** request in the **Secret Management API** folder of the Postman Collection.
1. In the path parameters, replace the following variables:
    * `{url}`: Your Okta domain URL where the app is configured
    * `{applicationId}`: The application ID
1. On the **Body** tab, use the request body template and enter your generated secret as the `client_secret` value.
1. Send the `POST {yourOktaDomain}/api/v1/apps/{applicationId}/credentials/secrets` request. The response should look something like this:

    ```json
        {
            "id": "ocs14j4d1kdTKN9fg0h8",
            "created": "2022-01-10T22:33:19.000Z",
            "lastUpdated": "2022-01-10T22:33:19.000Z",
            "status": "ACTIVE",
            "client_secret": "D0HxBn1FtTXeYC4cSBwWL_sPMztMT2t6Ei9n1QjO",
            "secret_hash": "tI4z6TbSw5YYd8RtcClaEw",
            "_links": {
                "deactivate": {
                    "href": "https://{yourOktaDomain}/api/v1/apps/ocs14j5h6sbrzwuzR0h8/credentials/secrets/ocs14j4d1kdTKN9fg0h8/lifecycle/deactivate"
                    "hints": {
                        "allow": [
                            "POST"
                        ]
                    }
                }
            }
        }
    ```

1. Test your app and ensure that all functionality works with the newly generated client secret.

### Deactive the old client secret

After you test your app and everything works correctly with the newly generated client secret, you can set the old client secret status to **Inactive**.

> **Note:** To set the old client secret to **Inactive** using the Admin Console, see [Manage secrets and keys for OIDC apps](https://help.okta.com/okta_help.htm?type=oie&id=oauth-client-cred).

1. Use the **Deactivate a client secret** request in the **Secret Management API** folder of the Postman Collection.
1. In the path parameters, replace the following variables:
    * `{url}`: Your Okta domain URL where the app is configured
    * `{applicationId}`: The application ID
    * `{secretId}`: The old client secret ID that you obtained in a previous step
1. Send the `POST {yourOktaDomain}/api/v1/apps/{applicationId}/credentials/secrets/{secretId}/lifecycle/deactivate` request. The response should look something like this:

    ```json
        {
            "id": "ocs14izzvk9BGLiu30h8",
            "created": "2022-01-10T21:06:31.000Z",
            "lastUpdated": "2022-01-10T22:39:43.000Z",
            "status": "INACTIVE",
            "client_secret": "3ZIqRCzmjcdNPK2Y29x1qSkI5NRHji_eGIm4aKtI",
            "secret_hash": "jMur1qOhMw_MtC9aQo7YEg",
            "_links": {
                "activate": {
                    "href": "https://{yourOktaDomain}/api/v1/apps/ocs14j5h6sbrzwuzR0h8/credentials/secrets/ocs14izzvk9BGLiu30h8/lifecycle/activate",
                    "hints": {
                        "allow": [
                            "POST"
                        ]
                    }
                },
                "delete": {
                    "href": "https://{yourOktaDomain}/api/v1/apps/ocs14j5h6sbrzwuzR0h8/credentials/secrets/ocs14izzvk9BGLiu30h8",
                    "hints": {
                        "allow": [
                            "DELETE"
                        ]
                    }
                }
            }
        }
    ```

1. Revalidate that your app works after changing the old client secret status to rule out any possibility that your app is using older credentials. Should there be any issues with your app, you can change the status of the old client secret back to **Active** and troubleshoot.

### Delete the inactive client secret

After you revalidate that your app works after changing the old client secret status, you can delete it.

> **Note:** To delete the old client secret using the Admin Console, see [Manage secrets and keys for OIDC apps](https://help.okta.com/okta_help.htm?type=oie&id=oauth-client-cred).

1. Use the **Delete a client secret** request in the **Secret Management API** folder of the Postman Collection.
1. In the path parameters, replace the following variables:
    * `{url}`: Your Okta domain URL where the app is configured
    * `{applicationId}`: The application ID
    * `{secretId}`: The old client secret ID that you obtained in a previous step
1. Send the `DELETE {yourOktaDomain}/api/v1/apps/{applicationId}/credentials/secrets/{secretId}` request.

> **Note:** If you turn off **OAuth secrets and key management**, and you have two secrets for an app, Okta retains the secret with the most recent **Creation date**.

## Add a JWK key pair or URI

You can use the API to add your own JWK key pair and JWK URI. To have Okta generate a JWK key pair for your app, use the [Admin Console](https://help.okta.com/okta_help.htm?type=oie&id=oauth-client-cred).

> **Note:** Use the Admin Console to generate a JWK public/private key pair for testing purposes only. For a production use case, use your own internal instance of the key pair generator. For an example, see [key pair generator](https://github.com/mitreid-connect/mkjwk.org).

### Save keys in Okta

This option allows you to bring your own keys. You can add up to 50 keys per app.

> **Note**: Some Okta SDKs require that keys be in privacy enhanced mail (PEM) format. If you're using an SDK, verify the format required before you create your JWK.

1. Use the **Add a JWK** request in the **JSON Web Key (JWK) Management API** folder of the Postman collection.
1. In the path parameters, replace the following variables:
    * `{url}`: Your Okta domain URL where the app is configured
    * `{applicationId}`: The application ID
1. On the **Body** tab, paste your public key.
1. Send the `POST {yourOktaDomain}/api/v1/apps/{applicationId}/credentials/jwks` request. The response should look something like this:

    ```json
        {
            "kty": "RSA",
            "id": "pks14j70wgyQbcEmZ0h8",
            "created": "2022-01-10T23:53:49.000Z",
            "lastUpdated": "2022-01-10T23:53:49.000Z",
            "status": "ACTIVE",
            "alg": "RS256",
            "kid": "key1",
            "use": "sig",
            "_links": {
                "deactivate": {
                    "href": "https://{yourOktaDomain}/api/v1/apps/0oa14izzvjc2b6f3Q0h8/credentials/jwks/pks14j70wgyQbcEmZ0h8/lifecycle/deactivate",
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

1. Test your app and ensure that all functionality works with the new JWK.

### Use a URL to fetch keys dynamically

This option allows you to host your public key in a URI. This URL contains public keys that clients can use to verify the signature of client-based access tokens and OpenID Connect ID tokens. By hosting the keys in a URL, you can conveniently rotate the keys without having to update the app configuration every time. Okta dynamically fetches the latest public key for the app, which eliminates the need to manually update the public key when you’re rotating the key pair.

1. Use the **Add a JWK URI** request in the **JSON Web Key (JWK) Management API** folder of the Postman collection.
1. In the path parameters, replace the following variables:
    * `{url}`: Your Okta domain URL where the app is configured
    * `{applicationId}`: The application ID
1. On the **Body** tab, use the request body template to add the appropriate values for your app and enter your JWKS URI as the `jwks_uri` value.
1. Send the `POST {yourOktaDomain}/oauth2/v1/clients/{clientId}` request. The response should look something like this:

    ```JSON
        {
            "client_id": "{{client_id}}",
            "client_secret": "{{client_secret}}",
            "client_id_issued_at": 1642033231,
            "client_secret_expires_at": 0,
            "client_name": "JWKs URI Test App",
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
            "jwks_uri": "{URI_to_JWK}",
            "token_endpoint_auth_method": "client_secret_basic",
            "application_type": "web"
        }
    ```

### Retire a public key

When you’re ready to retire a public key, change the older JWK status from **Active** to **Inactive** using the API.

> **Note:** To retire a public key using the Admin Console, see [Manage secrets and keys for OIDC apps](https://help.okta.com/okta_help.htm?type=oie&id=oauth-client-cred).

1. Use the **List JWKS** and **Get a JWK** requests in the **JSON Web Key (JWK) Management API** folder of the Postman Collection to locate the correct JWKS ID to retire.
1. Use the **Deactive a JWK** request after you have the JWKS ID that you need.
1. In the path parameters, replace the following variables:
    * `{url}`: Your Okta domain URL where the app is configured
    * `{applicationId}`: The application ID
    * `{jwksId}`: The `id` of the public JWK
1. Send the `POST {yourOktaDomain}/api/v1/apps/{applicationId}/credentials/jwks/{jwksId}/lifecycle/deactivate` request. The response should look something like this:

    ```JSON
        {
            "kty": "RSA",
            "id": "pks14j70wgyQbcEmZ0h8",
            "created": "2022-01-10T23:53:49.000Z",
            "lastUpdated": "2022-01-11T00:25:16.000Z",
            "status": "INACTIVE",
            "alg": "RS256",
            "kid": "key1",
            "use": "sig",
            "_links": {
                "activate": {
                    "href": "https://{yourOktaDomain}/api/v1/apps/0oa14izzvjc2b6f3Q0h8/credentials/jwks/pks14j70wgyQbcEmZ0h8/lifecycle/activate",
                    "hints": {
                        "allow": [
                            "POST"
                        ]
                    }
                },
                "delete": {
                    "href": "https://{yourOktaDomain}/api/v1/apps/0oa14izzvjc2b6f3Q0h8/credentials/jwks/pks14j70wgyQbcEmZ0h8",
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

### Delete a public key

After you deactivate the old key, you can then delete it. This ensures that the older key isn’t used by mistake.

> **Note:** To delete a public key using the Admin Console, see [Manage secrets and keys for OIDC apps](https://help.okta.com/okta_help.htm?type=oie&id=oauth-client-cred).

1. Use the **Delete a JWK** request in the **JSON Web Key (JWK) Management API** folder of the Postman Csollection.
1. In the path parameters, replace the following variables:
    * `{url}`: Your Okta domain URL where the app is configured
    * `{applicationId}`: The application ID
    * `{jwksId}`: The `id` of the public JWK
1. Send the `DELETE {yourOktaDomain}/api/v1/apps/{applicationId}/credentials/jwks/{jwksId}` request.

## See also

* [Build a JWT for client authentication](/docs/guides/build-self-signed-jwt/java/main/)
* [OpenID Connect and OAuth 2.0 API /key endpoint](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/CustomAS/#tag/CustomAS/operation/oauthKeysCustomAS)
* [Implement OAuth for Okta with a service app](/docs/guides/implement-oauth-for-okta-serviceapp/main/)
