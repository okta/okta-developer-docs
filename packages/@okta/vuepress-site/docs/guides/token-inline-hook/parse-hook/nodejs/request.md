The following code parses the Okta request body for the user name and stores it in the variable `patientName`.


```JavaScript
app.post("/tokenHook", (request, response) => {
  console.log(" ");
  console.log(request.body.data.identity.claims["preferred_username"]);
  var patientName = request.body.data.identity.claims["preferred_username"];

  ...

}
)
```
> **Note**: The method definition begun in this code snippet is incomplete and is completed by the [Send response](/docs/guides/token-inline-hook/send-response) section.
