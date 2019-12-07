---
title: Verification
---

If you want to verify that you've successfully created a user grant, here are a few ways:

* Check the ID token payload if you requested an ID token. The payload should contain the requested scopes.

    ```
    {
      "ver": 1,
      "jti": "AT.HVDRVIwbyq2jmP0SeNjyvMKq5zsMvUNJlzvXH5rfvOA",
      "iss": "https://${yourOktaDomain}/oauth2/default",
      "aud": "Test",
      "iat": 1524520458,
      "exp": 1524524058,
      "cid": "xfnIflwIn2TkbpNBs6JQ",
      "uid": "00u5t60iloOHN9pBi0h7",
      "scp": [
        "email",
      ],
      "sub": "saml.jackson@stark.com"
    }
    ```

* Check the access token if you requested one. The payload should contain:

    ```
    {
      "sub": "00u5t60iloOHN9pBi0h7",
      "email": "saml.jackson@stark.com",
      "ver": 1,
      "iss": "https://${yourOktaDomain}/oauth2/${authenticationServerId}",
      "aud": "xfnIflwIn2TkbpNBs6JQ",
      "iat": 1524520458,
      "exp": 1524524058,
      "jti": "ID.lcnZvvp-5PQYlTNEfv3Adq6PotmYBcl1D1S-zErEhuk",
      "amr": [
        "pwd"
      ],
      "nonce": "nonce",
      "auth_time": 1000,
      "at_hash": "preview_at_hash"
    }
    ```

* You can verify that a grant was created by listing the grants given by a specific user:

    ```bash
    curl -v -X GET \
    -H "Accept: application/json" \
    -H "Content-Type: application/json" \
    -H "Authorization: SSWS ${api_token} \
    "https://${yourOktaDomain}/api/v1/users/${userId}/grants"
    ```

    The response should contain the grant you created when you clicked **Allow** in the previous step.

    ```json
    [
        {
            "id": "oag4xfx62r6S53kHr0h6",
            "status": "ACTIVE",
            "created": "2018-04-23T21:53:25.000Z",
            "lastUpdated": "2018-04-23T21:53:25.000Z",
            "issuerId": "auscl1o4tnf48w5Wt0h7",
            "issuer": null,
            "clientId": "xfnIflwIn2TkbpNBs6JQ",
            "userId": "00u5t60iloOHN9pBi0h7",
            "scopeId": "scpcl1o4toFjganq10h7",
            "_links": {
                "app": {
                    "href": "https://${yourOktaDomain}/api/v1/apps/0oaaggpxeqxTDuP780h7",
                    "title": "Acme OIDC Client"
                },
                "authorizationServer": {
                    "href": "https://${yourOktaDomain}/api/v1/authorizationServers/auscl1o4tnf48w5Wt0h7",
                    "title": "My Authorization Server"
                },
                "scope": {
                    "href": "https://${yourOktaDomain}/api/v1/authorizationServers/auscl1o4tnf48w5Wt0h7/scopes/scpcl1o4toFjganq10h7",
                    "title": "openid"
                },
                "self": {
                    "href": "https://${yourOktaDomain}/api/v1/users/00u5t60iloOHN9pBi0h7/grants/oag4xfx62r6S53kHr0h6"
                },
                "revoke": {
                    "href": "https://${yourOktaDomain}/api/v1/users/00u5t60iloOHN9pBi0h7/grants/oag4xfx62r6S53kHr0h6",
                    "hints": {
                        "allow": [
                            "DELETE"
                        ]
                    }
                },
                "client": {
                    "href": "https://${yourOktaDomain}/oauth2/v1/clients/xfnIflwIn2TkbpNBs6JQ",
                    "title": "Acme OIDC Client"
                },
                "user": {
                    "href": "https://${yourOktaDomain}/api/v1/users/00u5t60iloOHN9pBi0h7",
                    "title": "Saml Jackson "
                },
                "issuer": {
                    "href": "https://${yourOktaDomain}/api/v1/authorizationServers/auscl1o4tnf48w5Wt0h7",
                    "title": "My Authentication Server"
                }
            }
        }
    ]
    ```