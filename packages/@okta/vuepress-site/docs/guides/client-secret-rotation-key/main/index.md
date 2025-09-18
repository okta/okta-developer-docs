---
title: Client secret rotation
meta:
  - name: description
    content: Okta client secret rotation helps you rotate and manage your client secrets without service or app downtime.
layout: Guides
sections:
- main
---

As a security best practice, rotate the client secret that your app uses to authenticate. Use the APIs to manage your client secrets without service or app downtime.

---

#### Learning outcomes

* Create more client secrets for a client app and manage existing client secrets.
* Generate public/private key pairs for a client app using the Admin Console and manage other key pairs.

#### What you need

* [Okta Integrator Free Plan org](https://developer.okta.com/signup)
* Access to client secret management APIs: `/api/v1/apps/{appId}/credentials/secrets` and JWKS management `/api/v1/apps/{appId}/credentials/jwks`. See [Application Client Auth Credentials](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/ApplicationSSOPublicKeys/#tag/ApplicationSSOPublicKeys).
* An existing OpenID Connect client app in Okta for testing in Okta
* The [Postman client](https://www.getpostman.com/downloads/) to test requests. See [Get Started with the Okta APIs](https://developer.okta.com/docs/reference/rest/) for information on setting up Postman.
* The [Client secret rotation Postman Collection](https://www.postman.com/devdocsteam/workspace/developer-docs-postman-collections/collection/6141897-2dcd48a0-4aaf-4911-9b82-d615f1222604) that allows you to test the API calls that are described in this guide. Click the ellipses next to the collection name in the left panel. Click **More** > **Export**, and then click **Export JSON** to export the collection locally. You can then import the collection into your Postman Workspace.

---

## About client secret rotation

Just like periodically changing passwords, regularly rotating the client secret that your app uses to authenticate is a security best practice. The challenge with rotating the client secret is to facilitate a seamless client secret rotation without service or app downtime. You need the ability to create overlapping client secrets.

> **Note:** Using client authentication with a client secret isn’t recommended for native apps because they’re public clients. The default authorization type for native apps is **Authorization Code with PKCE**. See [Choose an OAuth 2.0 flow](/docs/concepts/oauth-openid/#choose-an-oauth-2-0-flow) for more information on the type of flow to use. See [Implement authorization by grant type](https://developer.okta.com/docs/guides/implement-grant-type/authcodepkce/main/) for more information on how to implement that flow.

### Signing keys

Depending on the type of credentials that a [client uses to authenticate](https://developer.okta.com/docs/api/openapi/okta-oauth/guides/client-auth/#client-authentication-methods), a signing key pair (JWK) may be required. Apps that use signing keys for client authentication have substantially higher security. This is because only the client can access the private key. See [Key management](/docs/guides/key-management/main/) for the steps on managing signing keys and JWKS URIs for your app.

### About the Postman Collection

It’s up to you how you make requests to the APIs to generate client secrets. In this guide, Okta provides examples of the required API calls using a Postman Collection to demonstrate them in a language/platform neutral way.

> **Note:** Make sure that you [configure your Okta org as the environment in Postman](https://developer.okta.com/docs/reference/rest/).

## Rotate a client secret

When you’re ready to rotate a client secret for an app using the API, obtain the current client secrets for your app first. You use the appropriate `client_secret` value in a step later to deactivate the old client secret.

When you generate a new secret, the original secret remains in `ACTIVE` status. Both secrets are stored in parallel, allowing clients to continue using the old secret during secret rotation. Any request for a secret returns the newly generated client secret. Any requests that are sent using the previous secret still work. The requests continue to work until the status of that client secret is set to `INACTIVE`.

1. Use the **List client secrets for the specified app** request from the Postman Collection.
1. In the path parameters, replace the following variables:
    * `{url}`: Your Okta domain URL where the app is configured
    * `{appId}`: The app ID
1. Send the `GET {yourOktaDomain}/api/v1/apps/{appId}/credentials/secrets` request.
1. Save the appropriate client secret to use in the deactivate step later.

    The response should look something like this:

    ```JSON
        [
            {
                "id": "{secretId}",
                "created": "2022-01-10T21:06:31.000Z",
                "lastUpdated": "2022-01-10T21:06:31.000Z",
                "status": "ACTIVE",
                "client_secret": "3ZIqRCzmjcdNPK2Y29x1qSkI5NRHji_eGIm4aKtI",
                "secret_hash": "jMur1qOhMw_MtC9aQo7YEg",
                "_links": {
                    "deactivate": {
                        "href": "https://{yourOktaDomain}/api/v1/apps/{appId}/credentials/secrets/{secretId}/lifecycle/deactivate",
                        "hints": {
                            "allow": [
                                "POST"
                            ]
                        }
                    }
                }
            },
            {
                "id": "{secretId}",
                "created": "2022-01-10T22:33:19.000Z",
                "lastUpdated": "2022-01-10T22:33:19.000Z",
                "status": "ACTIVE",
                "client_secret": "D0HxBn1FtTXeYC4cSBwWL_sPMztMT2t6Ei9n1QjO",
                "secret_hash": "tI4z6TbSw5YYd8RtcClaEw",
                "_links": {
                    "deactivate": {
                        "href": "https://{yourOktaDomain}/api/v1/apps/{appId}/credentials/secrets/{secretId}/lifecycle/deactivate",
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

When you’re ready to rotate a client secret for an app, you can either [auto-generate the secret](#auto-generate-the-secret) or [bring your own](#bring-your-own-client-secret).

> **Note:** To rotate a client secret for an app using the Admin Console, see [Manage secrets and keys for OIDC apps](https://help.okta.com/okta_help.htm?type=oie&id=oauth-client-cred).

### Auto-generate the secret

To have Okta auto-generate the secret using the API, follow these steps:

> **Note:** To have Okta generate the client secret for the app using the Admin Console, see [Manage secrets and keys for OIDC apps](https://help.okta.com/okta_help.htm?type=oie&id=oauth-client-cred).

1. Use the **Add a client secret: auto-generated** request from the Postman Collection.
1. In the path parameters, replace the following variables:
    * `{url}`: Your Okta domain URL where the app is configured
    * `{appId}`: The app ID
1. Send the `POST {yourOktaDomain}/api/v1/apps/{appId}/credentials/secrets` request. The response should look something like this:

    ```JSON
        {
            "id": "{secretId}",
            "created": "2022-01-10T22:56:18.000Z",
            "lastUpdated": "2022-01-10T22:56:18.000Z",
            "status": "ACTIVE",
            "client_secret": "7U_MTFeIoRVHtPTcb4MY0gESLLisXfNRbbob1Quo",
            "secret_hash": "cfQjsGNDYEn5e3rqJME_jQ",
            "_links": {
                "deactivate": {
                    "href": "https://{yourOktaDomain}/api/v1/apps/{appId}/credentials/secrets/{secretId}/lifecycle/deactivate",
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

1. Use the **Add a client secret: bring your own secret** request from the Postman Collection.
1. In the path parameters, replace the following variables:
    * `{url}`: Your Okta domain URL where the app is configured
    * `{appId}`: The app ID
1. On the **Body** tab, use the request body template and enter your generated secret as the `client_secret` value.
1. Send the `POST {yourOktaDomain}/api/v1/apps/{appId}/credentials/secrets` request. The response should look something like this:

    ```JSON
        {
            "id": "{secretId}",
            "created": "2022-01-10T22:33:19.000Z",
            "lastUpdated": "2022-01-10T22:33:19.000Z",
            "status": "ACTIVE",
            "client_secret": "D0HxBn1FtTXeYC4cSBwWL_sPMztMT2t6Ei9n1QjO",
            "secret_hash": "tI4z6TbSw5YYd8RtcClaEw",
            "_links": {
                "deactivate": {
                    "href": "https://{yourOktaDomain}/api/v1/apps/{appId}/credentials/secrets/{secretId}/lifecycle/deactivate"
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

After you test your app and everything works correctly with the newly generated client secret, you can set the old client secret status to `INACTIVE`.

> **Note:** To set the old client secret to `INACTIVE` using the Admin Console, see [Manage secrets and keys for OIDC apps](https://help.okta.com/okta_help.htm?type=oie&id=oauth-client-cred).

1. Use the **Deactivate a client secret** request from the Postman Collection.
1. In the path parameters, replace the following variables:
    * `{url}`: Your Okta domain URL where the app is configured
    * `{appId}`: The app ID
    * `{secretId}`: The old client secret ID that you obtained in a previous step
1. Send the `POST {yourOktaDomain}/api/v1/apps/{appId}/credentials/secrets/{secretId}/lifecycle/deactivate` request. The response should look something like this:

    ```JSON
        {
            "id": "{secretId}",
            "created": "2022-01-10T21:06:31.000Z",
            "lastUpdated": "2022-01-10T22:39:43.000Z",
            "status": "INACTIVE",
            "client_secret": "3ZIqRCzmjcdNPK2Y29x1qSkI5NRHji_eGIm4aKtI",
            "secret_hash": "jMur1qOhMw_MtC9aQo7YEg",
            "_links": {
                "activate": {
                    "href": "https://{yourOktaDomain}/api/v1/apps/{appId}/credentials/secrets/{secretId}/lifecycle/activate",
                    "hints": {
                        "allow": [
                            "POST"
                        ]
                    }
                },
                "delete": {
                    "href": "https://{yourOktaDomain}/api/v1/apps/{appId}/credentials/secrets/{secretId}8",
                    "hints": {
                        "allow": [
                            "DELETE"
                        ]
                    }
                }
            }
        }
    ```

1. Validate that your app works after changing the old client secret status to rule out any possibility that your app is using older credentials. Should there be any issues with your app, you can change the status of the old client secret back to **Active** and troubleshoot.

### Delete the inactive client secret

After you validate that your app works after changing the old client secret status, you can delete it.

> **Note:** To delete the old client secret using the Admin Console, see [Manage secrets and keys for OIDC apps](https://help.okta.com/okta_help.htm?type=oie&id=oauth-client-cred).

1. Use the **Delete a client secret** request from the Postman Collection.
1. In the path parameters, replace the following variables:
    * `{url}`: Your Okta domain URL where the app is configured
    * `{appId}`: The app ID
    * `{secretId}`: The old client secret ID that you obtained in a previous step
1. Send the `DELETE {yourOktaDomain}/api/v1/apps/{appId}/credentials/secrets/{secretId}` request.

> **Note:** If you turn off **OAuth secrets and key management**, and you have two secrets for an app, Okta retains the secret with the most recent **Creation date**.

## See also

* [Key management](/docs/guides/key-management/main/)
* [Build a JWT for client authentication](/docs/guides/build-self-signed-jwt/java/main/)
* [OpenID Connect and OAuth 2.0 API /key endpoint](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/CustomAS/#tag/CustomAS/operation/oauthKeysCustomAS)
* [Implement OAuth for Okta with a service app](/docs/guides/implement-oauth-for-okta-serviceapp/main/)
