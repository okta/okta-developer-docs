---
title: Get the Group IDs
---

### If you have an Okta Authorization Server:

Send a request to `https://${yourOktaDomain}/api/v1/groups` and collect the IDs for all the groups you'll want to whitelist.

   Request Example:

```bash
curl -X GET \
-H 'accept: application/json' \
-H 'authorization: SSWS ${api_token}' \
-H 'content-type: application/json' \
"https://${yourOktaDomain}/api/v1/groups"
```

   Response Example:

```json
[
  {
    "id": "00gbso71miOMjxHRW0h7",
    "created": "2017-08-25T21:15:48.000Z",
    "lastUpdated": "2017-08-25T21:15:48.000Z",
    "lastMembershipUpdated": "2017-08-25T21:16:07.000Z",
    "objectClass": [
      "okta:user_group"
    ],
    "type": "OKTA_GROUP",
    "profile": {
      "name": "WestCoastDivision",
      "description": "Employees West of the Rockies"
    },
    "_links": {
      "logo": [
        {
          "name": "medium",
          "href": "https://op1static.oktacdn.com/assets/img/logos/groups/okta-medium.d7fb831bc4e7e1a5d8bd35dfaf405d9e.png",
          "type": "image/png"
        },
        {
          "name": "large",
          "href": "https://op1static.oktacdn.com/assets/img/logos/groups/okta-large.511fcb0de9da185b52589cb14d581c2c.png",
          "type": "image/png"
        }
      ],
      "users": {
        "href": "https://${yourOktaDomain}/api/v1/groups/00gbso71miOMjxHRW0h7/users"
      },
      "apps": {
        "href": "https://${yourOktaDomain}/api/v1/groups/00gbso71miOMjxHRW0h7/apps"
      }
    }
  }
]
```

This example uses one `groupId` for simplicity's sake.

### If you have a Custom Authorization Server:

Send a request to `https://${yourOktaDomain}/api/v1/groups` and collect the IDs for all the groups you'll want to whitelist.

Request Example:

```bash
curl -X GET \
-H 'accept: application/json' \
-H 'authorization: SSWS ${api_token}' \
-H 'content-type: application/json' \
"https://${yourOktaDomain}/api/v1/groups"
```

This example uses one `groupId` for simplicity's sake.

 Response Example:

```json
[
  {
    "id": "00gbso71miOMjxHRW0h7",
    "created": "2017-08-25T21:15:48.000Z",
    "lastUpdated": "2017-08-25T21:15:48.000Z",
    "lastMembershipUpdated": "2017-08-25T21:16:07.000Z",
    "objectClass": [
      "okta:user_group"
    ],
    "type": "OKTA_GROUP",
    "profile": {
      "name": "WestCoastDivision",
      "description": "Employees West of the Rockies"
    },
    "_links": {
      "logo": [
        {
          "name": "medium",
          "href": "https://op1static.oktacdn.com/assets/img/logos/groups/okta-medium.d7fb831bc4e7e1a5d8bd35dfaf405d9e.png",
          "type": "image/png"
        },
        {
          "name": "large",
          "href": "https://op1static.oktacdn.com/assets/img/logos/groups/okta-large.511fcb0de9da185b52589cb14d581c2c.png",
          "type": "image/png"
        }
      ],
      "users": {
        "href": "https://${yourOktaDomain}/api/v1/groups/00gbso71miOMjxHRW0h7/users"
      },
      "apps": {
        "href": "https://${yourOktaDomain}/api/v1/groups/00gbso71miOMjxHRW0h7/apps"
      }
    }
  }
]
```
<NextSectionLink/>
