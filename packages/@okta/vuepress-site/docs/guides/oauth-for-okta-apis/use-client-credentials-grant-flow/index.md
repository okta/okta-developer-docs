---
title: Use the Client Credentials grant flow
---
For machine to machine use cases where a backend service or a daemon has to call Okta APIs, use the Client Credentials grant flow with an OAuth Service app. The Client Credentials grant flow is the only valid grant type for an OAuth Service app. 

> **Note:** Move on to the <GuideLink link="../define-allowed-scopes">next section</GuideLink> if you don't need to use the Client Credentials grant flow.

The following steps are required to configure the Client Credentials grant flow with an OAuth Service app: 

1. Create the private key and then extract the public key from the private key to create a JSON Web Key Set (JWKS). 
2. Create the app and register the public key with the app.
3. Sign the JWT with the private key.

## Create a public/private key pair
The [`private_key_jwt`](/docs/reference/api/oidc/#jwt-with-private-key) client authentication method is the only supported method for OAuth Service apps that want to get Okta-scoped tokens. The private key that you use to sign the JWT must have the corresponding public key registered in the [JWKSet](/docs/reference/api/oauth-clients/#json-web-key-set) of the OAuth Service app. So, we recommend generating the public/private key pair first before creating the OAuth Service app.

You can use a tool such as this [JSON Web Key Generator](https://mkjwk.org/) to generate an RSA 2048 JWKS key pair for testing. 

> Note: Use the JSON Web Key Generator link to generate JWKS key pairs for testing purposes only. For a production use case, use your own [internal instance](https://github.com/mitreid-connect/mkjwk.org) of the key pair generator.

The JWKS should look something like this:

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
Create an OAuth Service client app and register the public key with the Service app using the `/apps` API. The following example uses the **Add OAuth2 Client App** request in Postman:

1. In Postman, select the **Add OAuth2 Client App** request within the **Apps** collection.
2. On the **Body** tab, make the following noted changes to the parameter values and add the JWKS section.

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
                "jwks": { //add the JWKS section with the values from your generated jwks
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

   You can also create a service client using the dynamic `/oauth/v1/clients` registration endpoint:

    ```json
    { 
    "client_name":"OAuthServiceClient",
    "response_types":[ 
        "token"
    ],
    "grant_types":[ 
        "client_credentials"
    ],
    "token_endpoint_auth_method":"private_key_jwt",
    "application_type":"service",
    "jwks":{ 
        "keys":[ 
            { 
                "kty":"RSA",
                "e":"AQAB",
                "use":"sig",
                "kid":"7164109848619491",
                "alg":"RS256",
                "n":"1rM-gaSnogAzxdbuEc0M6nKkurrOdSXbSH_NqSjn-FDAWl4tZQHTg6cUaYkhsmpT5PAh5AngsCgvoqRydx-m6irfL-4xkvXV4PNbZkGpNdcQluEpwZvGwUz69wwo_tZl_3syBQSV3TRqRUv7-p7WyeHD78oM0SpPbm7cEzM_A2kDHROFiR9njWdr6R_PCHXmQHjp28ChwnxiA_WJczmmnU88K6cf0OatQsthn649XG2pqtSyZwr0uYu5mWiJvVAcGAD6eZH9u7hsGKQ3iJiPuToaY3QUqH-fJnU64_jxHIYlLdbgJhmY8LxeAomUdgYj3EegmQCtik3uWK00EnK3PQ"
            }
        ]
    }
    }'
    ```
 
3. When you finish, click **Send** to create the Service app with the JWKS.

## Sign the JWT
You now need to sign the JWT with your private key for use in the request for a scoped access token. Crafting this `client_credentials` JWT can be done in several ways. See [Build a JWT with a private key](/docs/guides/build-self-signed-jwt/java/jwt-with-private-key/) for both a Java and a JavaScript example.

> **Note:** After the Service app has Okta-scoped grants, only an admin with Super Admin permissions can rotate the keys.

<NextSectionLink/>
