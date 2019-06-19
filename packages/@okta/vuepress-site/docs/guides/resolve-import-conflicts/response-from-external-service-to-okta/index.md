---
title: The Response from the External Service to Okta
---

The response that your external service constructs should have a JSON payload containing any commands you want to return to Okta. In a case where you want to change the value of the user's `login` attribute, the JSON payload would look something like this:

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

In this example, the response consists of a `commands` object. That object needs to be an array. In this case, the array has one element. That element specifies which of the supported commands to invoke, as well as the parameter to pass to that command. The command used here is `com.okta.user.profile.update`, which updates the value of one of the Okta user profile attributes. The parameter is a name-value pair consisting of the user profile attribute you want to change and the value to set it to. Here, `login` is the Okta user profile attribute being changed and the value it's being set to is "sally.elizabeth.jones@clouditude.net".

For complete information on the objects you can send in the payload of your response, see [Objects in Response You Send](/docs/reference/import-hook/#objects-in-response-you-send).

<NextSectionLink />


