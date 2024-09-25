For this example, only users with emails that contain `example.com` are allowed to self-register. You can also include an `error` object in the response for users that are denied self-registration.

See the [response properties](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/InlineHook/#tag/InlineHook/operation/create-registration-hook!c=200&path=commands&t=response) of a registration inline hook for full details.


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


