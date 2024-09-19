The following code checks the `email` property of an incoming request from Okta, which is the email used to self-register. The values of `data.userProfile` from within the request body contains the `email` property that is verified. The variable `emailRegistration` stores the value of the email.

See the [request properties](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/InlineHook/#tag/InlineHook/operation/create-registration-hook) of a Registration Inline Hook for full details.


```javascript
app.post('/registrationHook', async (request, response) => {
  var emailRegistration = request.body.data.userProfile['email'];


}
```

> **Note:** The method definition in the previous code snippet is incomplete. See the next section for the complete method.
