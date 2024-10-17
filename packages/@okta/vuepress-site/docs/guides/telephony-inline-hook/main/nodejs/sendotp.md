```javascript
function sendOtp(userPhoneNumber, userOtpCode, channel, response) {
  client.verify.v2
    .services(serviceSid)
    .verifications.create({
      to: userPhoneNumber,
      customCode: userOtpCode,
      channel: channel,
    })
    .then((verification) => {
      response.status(200).json(getSuccessResponse(channel, verification.sid));
    })
    .catch((error) => {
      response.status(400).json(getErrorResponse(channel, error));
    });
}
```
