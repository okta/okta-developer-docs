The following code represents a simple check on the email property of an incoming request from Okta; that is, the email used to self-register. The values of `data.userProfile` from within the request body contains the email property that will be verified. The variable `emailRegistration` stores the value of the email.



```javascript
app.post('/registrationHook', async (request, response) => {
  var emailRegistration = request.body.data.userProfile['email'];


}
```

>**Note:** The method definition begun in this code snippet is incomplete and is completed in the <GuideLink link="../send-response-code/">Send response code</GuideLink> section.
