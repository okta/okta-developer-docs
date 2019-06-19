---
title: The Response from the External Service to Okta
---

The response that your external service constructs should have JSON payload containing commands for Okta. In a case where you want to change the value of the user's `login` attribute, the JSON payload would look something like this:

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

In this example, the resposnse consists of a `commands` object. That object needs to be an array. In this case, it has one element. The element specifies which supported command to invoke, as well as the parameter to pass for that command. The command use here is `com.okta.user.profile.update`, which updates the value of one of the Okta user profile attributes. The parameter is a name-value pair for the user profile attribute you want to change and the value to set it to. Here, `login` is the Okta user profile attribute being changed.

For complete information on the objects you can send in the payload of your response, see [Objects in Response You Send](/docs/reference/import-hook/#objects-in-response-you-send).

<NextSectionLink />


