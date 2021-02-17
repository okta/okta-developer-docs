```JavaScript
//Token Inline Hook POST from Okta (endpoint: tokenHook)

app.post("/tokenHook", (request, response) => {
  console.log(" ");
  console.log(request.body.data.identity.claims["preferred_username"]);
  var patientName = request.body.data.identity.claims["preferred_username"];
  if (patients.some(user => user.username == patientName)){
    const arrayPosition = patients.findIndex(user => user.username == patientName);
    const patientID = patients[arrayPosition].ExternalServicePatientID;
    var returnValue = { "commands":[
                          { "type":"com.okta.identity.patch",
                            "value": [
                                {
                                  "op": "add",
                                  "path": "/claims/extPatientId",
                                  "value": patientID
                                }
                                ]

                          }
                                  ],
                    }
  console.log("Added claim to ID Token, with a value of: " + returnValue.commands[0].value[0]["value"]);
  response.send(JSON.stringify(returnValue));
  }
  else {
  console.log("Not part of patient data store");
  response.status(204).send();
  }
}
);
```