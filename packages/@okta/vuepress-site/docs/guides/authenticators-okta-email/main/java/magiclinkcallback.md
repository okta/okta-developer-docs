```velocity
#if(${oneTimePassword})
    <a id="reset-password-link" href="http://localhost:8080/magiclink/callback?otp=${oneTimePassword}&state=${request.relayState}">
    ...
#else
    <a id="reset-password-link" href="${resetPasswordLink}" style="text-decoration: none;">
    ...
```
