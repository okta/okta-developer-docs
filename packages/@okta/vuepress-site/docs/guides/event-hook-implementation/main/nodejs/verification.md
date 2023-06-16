The value `userDeactivated` is the endpoint in this example.

```javascript

// Event hook initial verification
// Extract header 'x-okta-verification-challenge' from Okta request
// Return value as JSON object verification

app.get("/userDeactivated", (request, response) => {
  var returnValue = {
    "verification": request.headers['x-okta-verification-challenge'],
  };
  console.log("Event hook verification request received.")
  response.json(returnValue);
});

```
