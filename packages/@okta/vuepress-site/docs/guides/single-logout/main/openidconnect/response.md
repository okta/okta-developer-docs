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
