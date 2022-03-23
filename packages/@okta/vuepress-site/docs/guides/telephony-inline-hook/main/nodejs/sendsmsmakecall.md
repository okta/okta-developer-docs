```javascript
function sendSms(from, userPhoneNumber, userOtpCode, response) {
  client.messages
    .create({
      body: "Your One-Time Passcode from the Glitch project is " + userOtpCode,
      to: userPhoneNumber,
      from: from,
    })
    .then((message) => {
      response.status(200).json(getSuccessResponse("SMS", message.sid));
    })
    .catch((error) => {
      response.status(400).json(getErrorResponse("SMS", error));
    });
}

function makeCall(from, to, otp, response) {
  // Add space to OTP digits for correct pronunciation
  otp = otp.replace(/\B(?=(\d{1})+(?!\d))/g, " ");
  const url = encodeURI(process.env.TWIML_URL + otp);

  client.calls
    .create({ to, from, url })
    .then((call) => {
      response.status(200).json(getSuccessResponse("VOICE", call.sid));
    })
    .catch((error) => {
      response.status(400).json(getErrorResponse("VOICE", error));
    });
}
```
