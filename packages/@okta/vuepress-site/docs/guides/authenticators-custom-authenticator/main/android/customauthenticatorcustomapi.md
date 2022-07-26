Use this API to add custom push verification functionality to your mobile app. See [Custom Authenticator API](/docs/reference/api/authenticators-admin/#create-authenticator).

<ApiOperation method="post" url="/api/v1/authenticators" />

#### Sample request

This request needs the following:

* The `okta.authenticators.manage.self` scope enabled.
* An Authenticator object in the request body. See [Example Custom Authenticator](/docs/reference/api/authenticators-admin/#example-custom-app-authenticator).

> **Note:** When creating a new `custom_app` authenticator, you need to set the `agreeToTerms` property to `true`. This property shows that the administrator accepts the [terms](https://www.okta.com/privacy-policy/) for creating a new authenticator.

The following shows a sample request:

```json
{
    "type": "app",
    "id": "aut67ryPSDvEpomfS0g5",
    "key": "custom_app",
    "status": "ACTIVE",
    "name": "Custom App Authenticator",
    "created": "2022-06-24T21:02:50.000Z",
    "lastUpdated": "2022-06-24T21:02:50.000Z",
    "settings": {
        "appInstanceId": "0oa33z6AFuYWYjdBf0g4",
        "userVerification": "PREFERRED",
        "oauthClientId": "myCustomAppClientId"
    },
    "provider": {
        "type": "PUSH",
        "configuration": {
            "apns": {
                "id": "ppc1buciB5V7ZdcB70g4",
                "appBundleId":"com.my.app.release",
                "debugAppBundleId":"com.my.app.debug"
            },
            "fcm": {
                "id": "ppc38rxEr5dEKqDD10g4"
            }
        }
    },
    "_links": {
        "self": {
            "href": "https://{yourOktaDomain}/api/v1/authenticators/aut36ryPSDvEpomfS0g4",
            "hints": {
                "allow": [
                    "GET",
                    "PUT"
                ]
            }
        },
        "deactivate": {
            "href": "https://{yourOktaDomain}/api/v1/authenticators/aut36ryPSDvEpomfS0g4/lifecycle/deactivate",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        },
        "methods": {
            "href": "https://{yourOktaDomain}/api/v1/authenticators/aut36ryPSDvEpomfS0g4/methods",
            "hints": {
                "allow": [
                    "GET"
                ]
            }
        }
    }
}
```

#### Sample response

```json
{
    “key”:“custom_app”,
    “name”:“Custom App Authenticator”,
    “agreeToTerms” : true,
    “provider”: {
        “type”:“PUSH”,
        “configuration”: {
          “fcm”: {
             “id”:“ppc38rxEr5dEKqDD10g4"
            },
        “apns”: {
            “id”: “ppc1buciB5V7ZdcB70g4”,
            “appBundleId”:“com.my.app.release”,
            “debugAppBundleId”:“com.my.app.debug”
            }
        }
    },
    “settings”: {
     “appInstanceId”:“0oa33z6AFuYWYjdBf0g4",
     “userVerification”:“preferred”
    },
    “methods”: [
        {
            “type”:“push”,
            “status”:“ACTIVE”,
            “settings”: {
                “algorithms”: [
                “RS256",
                “ES256”
                        ],
                “keyProtection”:“ANY”
                    }
        }
