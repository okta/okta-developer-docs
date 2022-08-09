<!-- Note: this file isn't necessary for the latest version of the registration inline hook guide. I'm keeping it her for future reference, that is, if we document SDKs other than the Node.js SDK -->


### Add self-service registration (SSR) request code

The following is a JSON example of an incoming SSR request from Okta that shows the user's profile data in the `userProfile` property. The values of `data.userProfile` from within the request body contains the properties that Okta verifies.

See the [request properties](/docs/reference/registration-hook/#objects-in-the-request-from-okta) of a registration inline hook for full details.


```json
{
   "eventId":"16Ja0HcdSYy602188z6gIg",
   "eventTime":"2021-12-03T20:08:10.000Z",
   "eventType":"com.okta.user.pre-registration",
   "eventTypeVersion":"1.0",
   "contentType":"application/json",
   "cloudEventVersion":"0.1",
   "source":"rul1bufGk5dJdRYw50g4",
   "data":{
      "context":{
         "request":{
            "id":"reqQFcZNuvhRj2VZbngrI2ZJA",
            "method":"POST",
            "url":{
               "value":"/idp/idx/enroll/new"
            },
            "ipAddress":"127.0.0.1"
         }
      },
      "userProfile":{
         "lastName":"Test",
         "firstName":"Test",
         "test":"value",
         "login":"test.user@okta.com",
         "email":"test.user@okta.com"
      },
      "action":"ALLOW"
   }
}
```


### Add Progressive Profile request code

<ApiLifecycle access="ie" />
The following JSON example is a Progressive Profile request to the external service.

See the [request properties](/docs/reference/registration-hook/#objects-in-the-request-from-okta) of a registration inline hook for full details.

```json
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

> **Note:** See [Send Progressive Profile response](#send-progressive-profile-response) for details.
