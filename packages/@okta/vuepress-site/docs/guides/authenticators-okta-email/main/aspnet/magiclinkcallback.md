```velocity
#if(${oneTimePassword})
    <a id="reset-password-link" href="http://localhost:44314/magiclink/callback?otp=${oneTimePassword}&state=${request.relayState}">
    ...
#else
    <a id="reset-password-link" href="${resetPasswordLink}" style="text-decoration: none;">
    ...
```
