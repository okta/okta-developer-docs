The following code represents a check on the `email` property of an incoming request from Okta; that is, the email used to self-register. The values of `data.userProfile` from within the request body contains the `email` property that will be verified. The variable `emailRegistration` stores the value of the email.

See the [request properties](/docs/reference/registration-hook/#objects-in-the-request-from-okta) of a Registration Inline Hook for full details.


```javascript
app.post('/registrationHook', async (request, response) => {
  var emailRegistration = request.body.data.userProfile['email'];
}
```

> **Note:** The method definition that begins in this code snippet is incomplete. See [Send response](#send-response) for the finished method.

### Add Progressive Profile request code

<ApiLifecycle access="ie" />
The following code allows an external service to supply values for updating attributes on a user profile.

See the [request properties](/docs/reference/registration-hook/#objects-in-the-request-from-okta) of a Registration Inline Hook for full details.

```javascript
{
    "eventId": "YFtkmR0US_-WRIkMgC9V-g",
    "eventTime": "2021-12-07T22:22:05.000Z",
    "eventType": "com.okta.user.pre-registration",
    "eventTypeVersion": "1.0",
    "contentType": "application/json",
    "cloudEventVersion": "0.1",
    "source": "rul1bufGk5dJdRYw50g4",
    "data": {
        "context": {
            "request": {
                "id": "reqQsH_sl8TSiu9WTC3VfS7yw",
                "method": "POST",
                "url": {
                    "value": "/idp/idx/enroll/update"
                },
                "ipAddress": "127.0.0.1"
            },
            "user": {
                "id": "00u1bspyAvImafPWz0g4",
                "passwordChanged": "2021-10-19T19:56:22.000Z",
                "profile": {
                    "login": "admin@okta.com",
                    "firstName": "Admin",
                    "lastName": "Admin",
                    "locale": "en",
                    "timeZone": "America/Los_Angeles"
                },
                "_links": {
                    "groups": {
                        "href": "http://oie-local.okta1.com:1802/api/v1/users/00u1bspyAvImafPWz0g4/groups"
                    },
                    "factors": {
                        "href": "http://oie-local.okta1.com:1802/api/v1/users/00u1bspyAvImafPWz0g4/factors"
                    }
                }
            }
        },
        "action": "ALLOW",
        "userProfileUpdate": {
            "test1": "value1",
            "test2": "value2"
        }
    }
}
```

> **Note:** The method definition that begins in this code snippet is incomplete. See [Send Progressive Profile response](#send-progressive-profile-response).