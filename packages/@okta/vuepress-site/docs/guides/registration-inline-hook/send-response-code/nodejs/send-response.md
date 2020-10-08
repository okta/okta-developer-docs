For this example, only emails containing *yourDomain.com* are allowed and can self-register. You can also include an `error` object in the response for those users denied registration.

For full details on the request and response properties of a Registration Inline Hook, see [Registration Inline Hook](/docs/reference/registration-hook/).



```javascript
app.post('/registrationHook', async (request, response) => {
  console.log(" "); // for separation of logs during testing
  console.log('Email for ' + request.body.data.userProfile['firstName'] + " " + request.body.data.userProfile['lastName'] + " " + request.body.data.userProfile['email']);

  var emailRegistration = request.body.data.userProfile['email'];
  if (emailRegistration.includes("yourDomain.com")){

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


