
```javascript

//userDeactived Event request, POST from Okta

app.post("/userDeactivated", (request, response) => {
  console.log(" ");
  console.log('The user ' + request.body.data.events[0].target[0]["displayName"] + " has been deactivated on the Okta org!");
  response.sendStatus(200);

  }
)

```
