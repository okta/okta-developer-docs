SLO supports web and single-page (SPA) OIDC apps and OAuth 2.0 client apps. The following steps explain how to configure your apps for SLO using the API.

> **Note**: See [Configure Single Logout in app integrations](https://help.okta.com/okta_help.htm?type=oie&id=apps-single-logout) to update your app using the Admin Console.

1. Send a GET app request and copy the response body for use in the PUT request.

   `GET https://{yourOktaDomain}/api/v1/apps/{appID}`

2. Update the response body by editing the `settings.oauthClient` object:

    * Update the `participate_slo` property to `true`.
    * Add the following new properties:
      * `frontchannel_logout_uri`: Enter the URL where Okta sends the IdP-initiated logout request.
      * `frontchannel_logout_session_required`: Set to `true` to include the session ID (`sid`) and issuer (`iss`) as part of the IdP-initiated logout request. This ends a specific user’s session rather than all active user sessions within that browser.

    **Example request**

    The request is truncated for brevity.

    ```json
    { ...
        "settings" { ...
            "oauthClient": {
                "client_uri": null,
                "logo_uri": null,
                "redirect_uris": [
                "http://myapp.exampleco.com/authorization-code/callback"
                ],
                "post_logout_redirect_uris": [
                    "http://myapp.exampleco.com"
                ],
                "response_types": [
                    "code"
                ],
                "grant_types": [
                    "authorization_code"
                ],
                "application_type": "web",
                "consent_method": "REQUIRED",
                "issuer_mode": "DYNAMIC",
                "idp_initiated_login": {
                "mode": "DISABLED",
                "default_scope": []
                },
                "wildcard_redirect": "DISABLED",
                "participate_slo": true,
                "frontchannel_logout_uri": "http://myapp.exampleco.com/logout/callback",
                "frontchannel_logout_session_required": true
            }
        }
    }
    ```

3. Use the updated response body in a PUT request.

   `PUT https://${yourOktaDomain}/api/v1/apps/${appID}`

    **Example response**

    The response is truncated for brevity.

    ```json
    { ...
        "settings": { ...
            "oauthClient": {
                "client_uri": null,
                "logo_uri": null,
                "redirect_uris": [
                    "http://myapp.exampleco.com/authorization-code/callback"
                ],
                "post_logout_redirect_uris": [
                    "http://myapp.exampleco.com"
                ],
                "response_types": [
                    "code"
                ],
                "grant_types": [
                    "authorization_code"
                ],
                "application_type": "web",
                "consent_method": "REQUIRED",
                "issuer_mode": "DYNAMIC",
                "idp_initiated_login": {
                    "mode": "DISABLED",
                    "default_scope": []
                },
                "wildcard_redirect": "DISABLED",
                "participate_slo": true,
                "frontchannel_logout_uri": "http://myapp.exampleco.com/logout/callback",
                "frontchannel_logout_session_required": true
            }
        } ...
    }
    ```
