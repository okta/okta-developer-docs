---
title: The Call from Okta to the External Service
---

Each time a user is imported through the CSV Directory Integration, the Import Inline Hook automatically fires, and Okta sends an HTTPS request to your external service's endpoint.

The payload of the request looks like this:

```json
{
   "source":"cal7eyxOsnb20oWbZ0g4",
   "eventId":"JUGOUiYZTaKPmH6db0nDag",
   "eventTime":"2019-02-27T20:59:04.000Z",
   "eventTypeVersion":"1.0",
   "cloudEventVersion":"0.1",
   "eventType":"com.okta.import.transform",
   "contentType":"application/json",

   "data":{
      "context":{
         "conflicts":[
            "login"
         ],
         "application":{
            "name":"test_app",
            "id":"0oa7ey7aLRuBvcYUD0g4",
            "label":"app7ey6eU5coTOO5v0g4",
            "status":"ACTIVE"
         },
         "job":{
            "id":"ij17ez2AWtMZRfCZ60g4",
            "type":"import:users"
         },
         "matches":[

         ],
         "policy":[
            "EMAIL",
            "FIRST_AND_LAST_NAME"
         ]
      },

      "action":{
         "result":"CREATE_USER"
      },

      "appUser":{
         "profile":{
            "firstName":"Sally2",
            "lastName":"Admin2",
            "mobilePhone":null,
            "accountType":"PRO",
            "secondEmail":null,
            "failProvisioning":null,
            "failDeprovisioning":null,
            "externalId":"user221",
            "groups":[
               "everyone@clouditude.net",
               "tech@clouditude.net"
            ],
            "userName":"administrator2",
            "email":"sally.admin@clouditude.net"
         }
      },

      "user":{
         "profile":{
            "lastName":"Admin2",
            "zipCode":null,
            "city":null,
            "secondEmail":null,
            "postAddress":null,
            "login":"sally.admin@clouditude.net",
            "firstName":"Sally2",
            "primaryPhone":null,
            "mobilePhone":null,
            "streetAddress":null,
            "countryCode":null,
            "typeId":null,
            "state":null,
            "email":"sally.admin@clouditude.net"
         }
      }
   }
}
```
The payload gives you information on the user profile information coming in, whether a conflict was detected, and what Okta is going to populate the user's Okta profile attributes with.

The `data.appUser` object contains the attributes of the user's profile in the application that the user is being imported from. In the case of the CSV agent that we are using in this guide, the attributes are the fields in the CSV file.

In addition to the user's application profile, the payload provides you with the Okta user profile that Okta is set to create for this user if you don't intervene. This is provided in `data.user`.

Any conflicts that Okta detected are indicated in the `data.context.conflicts` attribute. Currently, there is only support for detecting conflicts in the `login` attribute.

Finally, `data.action` tells you what Okta is set to do for this user, if you don't intervene: Whether Okta is going to create a new user profile or treat this user as a match for an existing user.

For complete descriptions of each object in the request from Okta, see [Objects in the Request from Okta](/docs/reference/import-hook/#objects-in-the-request-from-okta). 

<NextSectionLink />

