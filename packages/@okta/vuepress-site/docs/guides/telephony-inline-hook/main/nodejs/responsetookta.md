```javascript
function getSuccessResponse(method, sid) {
  console.log("Successfully sent " + method + " : " + sid);
  const actionKey = "com.okta.telephony.action";
  const actionVal = "SUCCESSFUL";
  const providerName = "TWILIO";
  const resp = {
    commands: [
      {
        type: actionKey,
        value: [
          {
            status: actionVal,
            provider: providerName,
            transactionId: sid,
          },
        ],
      },
    ],
  };
  return resp;
}
```

You can also include an error object in the response.

```javascript
function getErrorResponse(method, error) {
  console.log("Error in " + method + " : " + error);
  const errorResp = {
    error: {
      errorSummary: error.message,
      errorCauses: [
        {
          errorSummary: error.status,
          reason: error.moreInfo,
          location: error.detail,
        },
      ],
    },
  };
  return errorResp;
}
```
