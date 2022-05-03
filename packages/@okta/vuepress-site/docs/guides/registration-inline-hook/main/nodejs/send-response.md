<!-- Note: this file isn't necessary for the latest version of the registration inline hook guide. I'm keeping it her for future reference, that is, if we document SDKs other than the Node.js SDK -->

### Send self-service registration (SSR) response

For this example, only emails containing "example.com" are allowed and can self-register. You can also include an `error` object in the response for those users who were denied registration.

See the [response properties](/docs/reference/registration-hook/#objects-in-the-response-from-okta) of a Registration Inline Hook for full details.


```javascript
app.post('/registrationHook', async (request, response) => {
  console.log(" "); // for separation of logs during testing
  console.log('Email for ' + request.body.data.userProfile['firstName'] + " " + request.body.data.userProfile['lastName'] + " " + request.body.data.userProfile['email']);

  var emailRegistration = request.body.data.userProfile['email'];
  if (emailRegistration.includes("example.com")){

    var returnValue = { "commands":[
                          { "type":"com.okta.action.update",
                            "value":{ "registration": "ALLOW"} }
                                   ]
                      }

  }

  else {

    var returnValue = { "commands":[
                          { "type":"com.okta.action.update",
                            "value":{ "registration": "DENY"} }
                                   ],
                         "error": {
                          "errorSummary":"Incorrect email address. Please contact your admin.",
                          "errorCauses":[
                             {
                                "errorSummary":"Only yourDomain emails can register.",
                                "reason":"INVALID_EMAIL_DOMAIN",
                                "locationType":"body",
                                "location":"data.userProfile.login",
                                "domain":"end-user"
                             }
                                        ]
                          }

                      }
  }

  response.send(JSON.stringify(returnValue));

  }
)

```

### Send Progressive Profile response

This response example uses the `com.okta.user.progressive.profile.update` command to supply values for attributes in the response.

See the [response properties](/docs/reference/registration-hook/#objects-in-the-response-from-okta) of a Registration Inline Hook for full details.

```json
{
  "commands": [
    {
      "type": "com.okta.user.progressive.profile.update",
      "value": {
        "test1": "value1",
        "test2": "value2"
      }
    }
  ]
}

```
