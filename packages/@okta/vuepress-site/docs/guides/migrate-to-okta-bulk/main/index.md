---
title: Bulk migration with credentials
meta:
  - name: description
    content: Perform a bulk migration of users into Okta using the Okta API
layout: Guides
---

As part of your plan to migrate users to Okta, you gathered source data into a staging area like a secure database or CSV file. This guide explains how you can use that data to create users and groups in Okta with the [Okta Users API](/docs/reference/api/users/) and the [Okta Groups API](/docs/reference/api/groups/).

---

#### Learning outcomes

Perform a bulk migration of users into Okta by using Okta APIs.

#### What you need

* [Okta Developer Edition organization](https://developer.okta.com/signup)
* Postman client to run API requests. See [Use Postman with the Okta REST APIs](https://developer.okta.com/docs/reference/rest/) for information on setting up Postman.
* Example or test source data to test user and group creation requests. (Don't use real user data when testing.)
* [A plan for migrating existing users to Okta](/docs/guides/migrate-to-okta-prerequisites/)

**Sample code**

[Creating groups](#request-example), [creating users with groups](#request-example-with-groups), and [creating users without groups](#request-example-without-groups) for cURL request examples

> **Note:** The examples in this guide are presented by using cURL commands. Postman can generate request code for several programming languages that can help with development.

---

## Sample data

The [Okta Users API](/docs/reference/api/users/) provides several operations to create users. To keep things simple, this guide uses [Create User without Credentials](/docs/reference/api/users/#create-user-without-credentials).

This guide uses the following sample data for one user:

* First Name: John
* Last Name: Smith
* Email Address: john.smith@example.com
* Groups: All Employees, Sales, Northeast

It's a good idea to use sample data that's as close as possible to your real user data to identify any potential issues before implementation.

## Create groups

Suppose you have groups in your user data that you want to include when you create your users in Okta. To do this, you must first create Okta Groups that are equivalent to the groups in your user data. You can create an Okta Group for the sample data (in this case, "All Employees") using an [Add Group](/docs/reference/api/groups/#add-group) request:

### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "profile": {
    "name": "All Employees",
    "description": "Every single one of our employees"
  }
}' "https://${yourOktaDomain}/api/v1/groups"
```

The description property can be empty.

### Response example

```json
{
    "id": "00g40q3dfwN2l6Bju357",
    "created": "2020-05-26T21:29:25.000Z",
    "lastUpdated": "2020-05-26T21:29:25.000Z",
    "lastMembershipUpdated": "2020-05-26T21:29:25.000Z",
    "objectClass": [
        "okta:user_group"
    ],
    "type": "OKTA_GROUP",
    "profile": {
        "name": "All Employees",
        "description": "Every single one of our employees"
    },
    "_links": {
        "logo": [
            {
                "name": "medium",
                "href": "https://{yourOktaDomain}/img/logos/groups/okta-medium.png",
                "type": "image/png"
            },
            {
                "name": "large",
                "href": "https://{yourOktaDomain}/img/logos/groups/okta-large.png",
                "type": "image/png"
            }
        ],
        "users": {
            "href": "https://{yourOktaDomain}/api/v1/groups/00g40q3dfwN2l6Bju357/users"
        },
        "apps": {
            "href": "https://{yourOktaDomain}/api/v1/groups/00g40q3dfwN2l6Bju357/apps"
        }
    }
}
```

You can obtain the new Group ID (`id`) from the response to use when you create Users in that Group later. You can also list all Groups in your org and obtain their IDs using a [List Groups](/docs/reference/api/groups/#list-groups) request.

You can also create Groups in your Okta Admin Console. For more information, see [About groups](https://help.okta.com/okta_help.htm?id=Directory_Groups) in the product documentation.

## Create users

Once you have created all the necessary Okta Groups, you can create Users including their Group Memberships. As mentioned earlier, this example uses [Create User without Credentials](/docs/reference/api/users/#create-user-without-credentials) to create our sample user.
In our sample, the user's email address is our unique login and the Group IDs are from the List Groups request in the previous step.

### Request example with groups

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "profile": {
    "firstName": "John",
    "lastName": "Smith",
    "email": "john.smith@example.com",
    "login": "john.smith@example.com"
  },
  "groupIds": [
    "00g40q3dfwN2l6Bju357",
    "00g40qj7v5fn1AcOi357",
    "00g40qkfmol5YWDUX357"
  ]
}' "https://${yourOktaDomain}/api/v1/users?activate=false"
```

If you don't have any Groups or want to add your Users to Groups later, simply use the same request but without the `groupIds` array.

### Request example without groups

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "profile": {
    "firstName": "John",
    "lastName": "Smith",
    "email": "john.smith@example.com",
    "login": "john.smith@example.com"
  }
}' "https://${yourOktaDomain}/api/v1/users?activate=false"
```

### Response example for both requests

```json
{
    "id": "00u40qykk8zaeeRfe357",
    "status": "STAGED",
    "created": "2020-05-26T22:33:44.000Z",
    "activated": null,
    "statusChanged": null,
    "lastLogin": null,
    "lastUpdated": "2020-05-26T22:33:44.000Z",
    "passwordChanged": null,
    "type": {
        "id": "oty1lidmn8y5qtJc6357"
    },
    "profile": {
        "firstName": "John",
        "lastName": "Smith",
        "mobilePhone": null,
        "secondEmail": null,
        "login": "john.smith@example.com",
        "email": "john.smith@example.com"
    },
    "credentials": {
        "emails": [
            {
                "value": "john.smith@example.com",
                "status": "VERIFIED",
                "type": "PRIMARY"
            }
        ],
        "provider": {
            "type": "OKTA",
            "name": "OKTA"
        }
    },
    "_links": {
        "schema": {
            "href": "https://{yourOktaDomain}/api/v1/meta/schemas/user/osc1lidmn8y5qtJc6357"
        },
        "activate": {
            "href": "https://{yourOktaDomain}/api/v1/users/00u40qykk8zaeeRfe357/lifecycle/activate",
            "method": "POST"
        },
        "self": {
            "href": "https://{yourOktaDomain}/api/v1/users/00u40qykk8zaeeRfe357"
        },
        "type": {
            "href": "https://{yourOktaDomain}/api/v1/meta/types/user/oty1lidmn8y5qtJc6357"
        }
    }
}
```

## User status and activation

The user status in the response when you create a User is set to `STAGED`, which essentially means that the user has been created but not activated yet. You can activate users using the API or in your Okta Admin Console. For more information on account states and activation, see:

* [User status values](/docs/reference/api/users/#user-status) (API reference)
* [Activate User request](/docs/reference/api/users/#activate-user) (API reference)
* [About user account status](https://help.okta.com/okta_help.htm?id=ext_end_user_states) (product documentation)
* [Activate user accounts](https://help.okta.com/okta_help.htm?id=ext_activate_user) (product documentation)

## Rate limits

Remember that [rate limits](/docs/reference/rate-limits/) apply to API requests when doing bulk/batch user migration. Rate limits differ depending on the level of service that you have purchased from Okta. [You can check your rate limits](/docs/reference/rate-limits/#check-your-rate-limits-with-okta-s-rate-limit-headers) in your code using Okta's Rate Limit Headers.

## Next steps

At this point, you should understand how to use the Okta API to migrate legacy users and groups to Okta.

Your next step should be configuring the necessary integration and access to applications for your users. Be sure to read the product documentation for an [overview of application integration](https://help.okta.com/okta_help.htm?id=ext_Apps_Apps) and see the information about [The Applications Page](https://help.okta.com/okta_help.htm?id=ext_Apps_Apps_Page) for more on how to configure your applications.

## See also

### API reference pages

* [Okta Users API](/docs/reference/api/users/)
* [Okta Groups API](/docs/reference/api/groups/)
* [API error codes](/docs/reference/error-codes/)
* [Default user profile properties](/docs/reference/api/users/#default-profile-properties)
* [Rate limits](/docs/reference/rate-limits/)

### Product help pages

* [Get started with Okta](https://help.okta.com/okta_help.htm?id=ext-get-started)
* [About profile sourcing](https://help.okta.com/okta_help.htm?id=csh-profile-masters)
* [Users, Groups, and Profiles](https://help.okta.com/okta_help.htm?id=ext_User_Lifecycle_Overview)