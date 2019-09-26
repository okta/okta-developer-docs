---
title: Use the Client Credentials grant flow
---
For machine to machine use cases where a backend service or a daemon has to call Okta APIs, use the Client Credentials grant flow with an OAuth Service app. The Client Credentials grant flow is the only valid grant type for an OAuth Service app. 

> **Note:** Move on to the <GuideLink link="../define-allowed-scopes">next section</GuideLink> if you don't need to use the Client Credentials grant flow.

## Create a public/private key pair
The [`private_key_jwt`](/docs/reference/api/oidc/#jwt-with-private-key) client authentication method is the only supported method for OAuth Service apps that want to get Okta-scoped tokens. The private key that you use to sign the JWT must have the corresponding public key registered in the [JWKSet](/docs/reference/api/oauth-clients/#json-web-key-set) of the OAuth Service app. So, we recommend generating the public/private key pair first before creating the OAuth Service app.

1. Generate an RSA 2048-bit private key and then output the key to a PEM file. The following example is using openSSL in a terminal window:

   ```bash
   openssl genrsa -out key.pem 2048
   ```

2. Extract the public key from the private key and create a JSON Web Key Set (`jwks`). This can be done in several ways.

    The `jwks` should look something like this:

    ```json
    {
        "keys": [
            {
                "kty": "RSA",
                "e":"AQAB",
                "kid": "jwks1",
                "n":"AJncrKuine49_CE….RL0HU=" // key truncated for brevity
            }    
        ]
    }
    ```
## Create a Service app
Register the public key with the Service app by creating an OAuth Service client app using the `/apps` API. The following example uses the **Add OAuth2 Client App** request in Postman:

1. In Postman, select the **Add OAuth2 Client App** request within the **Apps** collection.
2. On the **Body** tab, make the following noted changes to the parameter values and add the `jwks` section.

    For example:
    ```json
    {
        "name": "oidc_client",
        "label": "Name your app", //enter a name for the Service app
        "signOnMode": "OPENID_CONNECT",
        "credentials": {
            "oauthClient": {
                "token_endpoint_auth_method": "private_key_jwt" //update to private_key_jwt
            }
        },
        "settings": {
            "oauthClient": {
                "client_uri": "http://localhost:8080",
                "logo_uri": "http://developer.okta.com/assets/images/logo-new.png",
                 "redirect_uris": [
                    "http://{yourOktadomain}/callback"   
                ],
                "response_types": [
                    "token" //remove all options except token
                ],
                "grant_types": [
                    "client_credentials" //replace all options with client_credentials   
                ],
                "application_type": "service", //change to service
                "jwks": { //add the jwks section with the values from your generated jwks
                    "keys": [
                        {
                            "kty": "RSA",
                            "e":"AQAB",
                            "kid": "name your jwks",
                            "n":"AJncrKuine49_CE…..RL0HU="
                        }    
                    ]
                }
            }
        }
    }
    ```
3. When you finish, click **Send** to create the Service app with the `JWKS`.

## Sign the JWT
You need to now sign the JWT with your private key for use in the request for a scoped access token. Crafting this `client_credentials` JWT can be done in several ways. See [Build a JWT with a private key](/docs/guides/build-self-signed-jwt/java/jwt-with-private-key/) for both a Java and a JavaScript example.

> **Note:** After the Service app has Okta-scoped grants, only an admin with Super Admin permissions can rotate the keys.

<NextSectionLink/>
