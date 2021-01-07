---
title: Verification
---

There are several ways to verify that you've successfully created a user grant:

* Check the ID token payload if you requested an ID token. To check the ID token payload, you can copy the token value and paste it into any [JWT decoder](https://token.dev/). The payload should look similar to this. Note that no scopes are returned in an ID token:

    ```json
    {
        "sub": "00uixa271s6x7qt8I0h7",
        "ver": 1,
        "iss": "https://${yourOktaDomain}/oauth2/default",
        "aud": "0oaosna3ilNxgPTmk0h7",
        "iat": 1575931097,
        "exp": 1575934697,
        "jti": "ID.67UFdLqtzyqtWEcO4GJPVBE6MMe-guCdXwzuv11p-eE",
        "amr": [
            "mfa",
            "pwd",
            "kba"
            ],
        "idp": "00oixa26ycdNcX0VT0h7",
        "nonce": "UBGW",
        "phone_number": "7206685241",
        "auth_time": 1575929999
    }

* Check the access token if you requested one. To check the access token payload, you can copy the token value and paste it into any JWT decoder. The payload should look something like this:

    ```json
    {
        "ver": 1,
        "jti": "AT.xtjhr8FeMkyMfgLiFzVYOYPbgqWdd6ONULT3ffeK7d4",
        "iss": "https://${yourOktaDomain}/oauth2/default",
        "aud": "api://default",
        "iat": 1575929637,
        "exp": 1575933237,
        "cid": "0oaosna3ilNxgPTmk0h7",
        "uid": "00uixa271s6x7qt8I0h7",
        "scp": [
                "openid",
                "phone"
            ],
        "sub": "joe.smith@okta.com"
    }
    ```

* You can verify that a grant was created by listing the grants given to a specific user:

    ```bash
    curl -v -X GET \
    -H "Accept: application/json" \
    -H "Content-Type: application/json" \
    -H "Authorization: SSWS ${api_token} \
    "https://${yourOktaDomain}/api/v1/users/${userId}/grants"
    ```

    The response should contain the `scopeId` for the grant that you created when you clicked **Allow** in the previous step.

    ```json
    [
        {
        "id": "oaggjy8vxJwKeiMx20h6",
        "status": "ACTIVE",
        "created": "2019-12-09T17:36:12.000Z",
        "createdBy": {
            "id": "00uixa271s6x7qt8I0h7",
            "type": "User"
        },
        "lastUpdated": "2019-12-09T17:36:12.000Z",
        "issuer": "https://${yourOktaDomain}/oauth2/default",
        "clientId": "0oaosna3ilNxgPTmk0h7",
        "userId": "00uixa271s6x7qt8I0h7",
        "scopeId": "scpixa2zmc8Eumvjb0h7",
        "source": "END_USER",
        "_links": {
            "app": {
                "href": "https://${yourOktaDomain}/api/v1/apps/0oaosna3ilNxgPTmk0h7",
                "title": "ConsentWebApp"
            },
            "authorizationServer": {
                "href": "https://${yourOktaDomain}/api/v1/authorizationServers/default",
                "title": "default"
            },
            "scope": {
                "href": "https://${yourOktaDomain}/api/v1/authorizationServers/default/scopes/scpixa2zmc8Eumvjb0h7",
                "title": "phone"
            },
            "self": {
                "href": "https://${yourOktaDomain}/api/v1/users/00uixa271s6x7qt8I0h7/grants/oaggjy8vxJwKeiMx20h6",
                "hints": {
                    "allow": [
                        "GET",
                        "DELETE"
                    ]
                }
            },
            "client": {
                "href": "https://${yourOktaDomain}/oauth2/v1/clients/0oaosna3ilNxgPTmk0h7",
                "title": "ConsentWebApp"
            },
            "user": {
                "href": "https://${yourOktaDomain}/api/v1/users/00uixa271s6x7qt8I0h7",
                "title": "Joe Smith"
                }
             }
        }
    ]
    ```

<NextSectionLink/>
