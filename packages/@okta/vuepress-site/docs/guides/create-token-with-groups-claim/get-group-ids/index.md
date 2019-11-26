---
title: Get the group IDs
---
Send a request to `https://${yourOktaDomain}/api/v1/groups` and collect the IDs for all of the groups that you want to whitelist.

**Request Example**

```bash
curl -X GET \
-H 'accept: application/json' \
-H 'authorization: SSWS ${api_token}' \
-H 'content-type: application/json' \
"https://${yourOktaDomain}/api/v1/groups"
```

**Response Example**

```json
{
        "id": "00goeudyucv6CcaeV0h7",
        "created": "2019-11-12T19:56:23.000Z",
        "lastUpdated": "2019-11-12T19:56:23.000Z",
        "lastMembershipUpdated": "2019-11-12T22:59:13.000Z",
        "objectClass": [
            "okta:user_group"
        ],
        "type": "OKTA_GROUP",
        "profile": {
            "name": "IT",
            "description": "Info Tech"
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
                "href": "https://${yourOktaDomain}/api/v1/groups/00goeudyucv6CcaeV0h7/users"
            },
            "apps": {
                "href": "https://${yourOktaDomain}/api/v1/groups/00goeudyucv6CcaeV0h7/apps"
            }
        }
    },
```

<NextSectionLink/>
