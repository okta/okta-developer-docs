---
title: The Response from the External Service to Okta
---

The response that your external service constructs, in a case where you want to change the value of the user's `login` attribute, should have a JSON payload that looks something like this:

```json
{
  "commands": [{
    "type": "com.okta.user.profile.update",
    "value": {
      "login": "sally.elizabeth.jones@clouditude.net"
    }
  }]
}
```

<NextSectionLink />


