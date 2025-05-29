> **Note**: See [Enable Single Logout for an Identity Provider](https://help.okta.com/okta_help.htm?type=oie&id=?????) to update your identity provider using the Admin Console.

1. Send a GET IdP request and copy the response body for use in the PUT request.

   `GET https://{yourOktaDomain}/api/v1/idps/{idpID}`

2. Update the response body by editing the `protocol.endpoints` object:

    * Add the following `slo` object:

        ```json
        "slo": {
            "url": "http://idp.example.com/slo/logout",
            "binding": "HTTP-REDIRECT"
        }
        ```

    * In the `protocol.settings` object, update the `participate_slo` property value to `true`.

    **Example request**

    The request is truncated for brevity.

    ```json
    { ...
    "protocol": {
        "type": "OIDC",
        "endpoints": {
            "slo": {
                "url": "http://idp.example.com/slo/logout",
                "binding": "HTTP-REDIRECT"
            },
            "authorization": {
                "url": "https://idp.example.com/authorize",
                "binding": "HTTP-REDIRECT"
            },
            "token": {
                "url": "https://idp.example.com/token",
                "binding": "HTTP-POST"
            },
            "userInfo": {
                "url": "https://idp.example.com/userinfo",
                "binding": "HTTP-REDIRECT"
            },
            "jwks": {
                "url": "https://idp.example.com/keys",
                "binding": "HTTP-REDIRECT"
            }
        },
        "settings": {
            "nameFormat": null,
            "participateSlo": true,
            "sendApplicationContext": false
        },
    }....
    }
    ```

3. Use the updated response body in a PUT request.

   `PUT https://${yourOktaDomain}/api/v1/idps/${idpID}`

   **Example response**

    The response is truncated for brevity.

    ```json
    { ...
    "protocol": {
        "type": "OIDC",
        "endpoints": {
            "slo": {
                "url": "http://idp.example.com/slo/logout",
                "binding": "HTTP-REDIRECT"
            },
            "authorization": {
                "url": "https://idp.example.com/authorize",
                "binding": "HTTP-REDIRECT"
            },
            "token": {
                "url": "https://idp.example.com/token",
                "binding": "HTTP-POST"
            },
            "userInfo": {
                "url": "https://idp.example.com/userinfo",
                "binding": "HTTP-REDIRECT"
            },
            "jwks": {
                "url": "https://idp.example.com/keys",
                "binding": "HTTP-REDIRECT"
            }
        },
        "settings": {
            "nameFormat": null,
            "participateSlo": true,
            "sendApplicationContext": false
        },
    }....
    }
    ```
