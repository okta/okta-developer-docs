```JavaScript
// Example Patients Data Store

const patients = [
  {
    username: 'michelle.test@example.com',
    ExternalServicePatientID: '1235',
  },
  {
    username: 'raj.gupta@example.com',
     ExternalServicePatientID: '6789',
  },
    {
    username: 'mark.christie2777@example.com',
     ExternalServicePatientID: '4235',
  },

  ]

app.post("/tokenHook", (request, response) => {

  console.log(" ");
  console.log(request.body.data.identity.claims["preferred_username"]);
  var patientName = request.body.data.identity.claims["preferred_username"];

  if (patients.some(user => user.username == patientName)){
    const arrayPosition = patients.findIndex(user => user.username == patientName);
    const patientID = patients[arrayPosition].ExternalServicePatientID;

    ...

  }
)
```
> **Note**: The method definition begun in this code snippet is incomplete and is completed by the [Send response](/docs/guides/token-inline-hook/send-response) section.