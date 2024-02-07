The following code parses the Okta request body for the username and stores it in the variable `patientName`.


```JavaScript
app.post("/tokenHook", (request, response) => {
  console.log(" ");
  console.log(request.body.data.identity.claims["preferred_username"]);
  var patientName = request.body.data.identity.claims["preferred_username"];

  ...

}
)
```
> **Note**: The method definition started in this code snippet is incomplete and is completed by the [Send a response to Okta](/docs/guides/token-inline-hook/#send-a-response-to-okta) section.
