---
title: Bulk migration with credentials
meta:
  - name: description
    content: Perform a bulk migration of users into Okta using the Okta API
layout: Guides
---

As part of your plan to migrate users to Okta, you gathered source data into a staging area like a secure database or CSV file. This guide explains how you can use that data to create users and groups in Okta with the [Okta Users API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/User/) and the [Okta Groups API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Group/).

---

#### Learning outcomes

Perform a bulk migration of users into Okta by using Okta APIs.

#### What you need

* [Okta Integrator Free Plan org](https://developer.okta.com/signup)
* Postman client to run API requests. See [Use Postman with the Okta REST APIs](https://developer.okta.com/docs/reference/rest/) for information on setting up Postman.
* Example or test source data to test user and group creation requests. (Don't use real user data when testing.)
* [A plan for migrating existing users to Okta](/docs/guides/migrate-to-okta-prerequisites/)

#### Sample code

[Creating groups](#request-example), [creating users with groups](#request-example-with-groups), and [creating users without groups](#request-example-without-groups) for cURL request examples

> **Note:** The examples in this guide are presented by using cURL commands. Postman can generate request code for several programming languages that can help with development.

---

## Sample data

The [Okta Users API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/User/) provides several operations to create users. To keep things simple, this guide uses the [Create user without credentials](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/User/#create-user-without-credentials) scenario.

This guide uses the following sample data for one user:

* First name: John
* Last name: Smith
* Email address: john.smith@example.com
* Groups: All Employees, Sales, Northeast

It's a good idea to use sample data that's similar to your real user data to identify any potential issues before implementation.

## Create groups

Suppose that you have groups in your user data that you want to include when you create your users in Okta. To do this, you must first create Okta groups that are equivalent to the groups in your user data. You can create an Okta group for the sample data (in this case, "All Employees") using an [Add a group](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Group/#tag/Group/operation/addGroup) request:

### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS {api_token}" \
-d '{
  "profile": {
    "name": "All Employees",
    "description": "Every single one of our employees"
  }
}' "https://{yourOktaDomain}/api/v1/groups"
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

You can obtain the new group ID (`id`) from the response to use when you create users in that group later. You can also list all groups in your org and obtain their IDs using a [List all groups](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Group/#tag/Group/operation/listGroups) request.

To create groups in your Admin Console, see [About groups](https://help.okta.com/okta_help.htm?id=Directory_Groups) in the product documentation.

## Create users

After you create all the necessary Okta groups, you can create users and include their group memberships. As mentioned earlier, this example uses the [Create user without credentials](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/User/#create-user-without-credentials) scenario to create our sample user. In this sample, the user's email address is the unique login. The group IDs are from the List all groups request in the previous step.

### Request example with groups

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS {api_token}" \
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
}' "https://{yourOktaDomain}/api/v1/users?activate=false"
```

If you don't have any groups or want to add your users to groups later, use the same request but without the `groupIds` array.

### Request example without groups

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS {api_token}" \
-d '{
  "profile": {
    "firstName": "John",
    "lastName": "Smith",
    "email": "john.smith@example.com",
    "login": "john.smith@example.com"
  }
}' "https://{yourOktaDomain}/api/v1/users?activate=false"
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

The user status in the response when you create a user is set to `STAGED`, which means that the user has been created but not activated yet. You can activate users with the API or in your Admin Console. For more information on account states and activation, see the following links:

* [User status values](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/User/#user-status) (API reference)
* [Activate a user request](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/UserLifecycle/#tag/UserLifecycle/operation/activateUser) (API reference)
* [About user account status](https://help.okta.com/okta_help.htm?id=ext_end_user_states) (product documentation)
* [Activate user accounts](https://help.okta.com/okta_help.htm?id=ext_activate_user) (product documentation)

## Rate limits

Remember that [rate limits](/docs/reference/rate-limits/) apply to API requests when performing bulk/batch user migration. Rate limits differ depending on the level of service that you’ve purchased from Okta. [You can check your rate limits](/docs/reference/rate-limits/#check-your-rate-limits-with-okta-s-rate-limit-headers) in your code using the Okta Rate Limit Headers.

## Next steps

At this point, you should understand how to use the Okta API to migrate legacy users and groups to Okta.

Your next step is configuring the necessary integration and access to apps for your users. Be sure to read the product documentation for an [overview of application integration](https://help.okta.com/okta_help.htm?id=ext_Apps_Apps) and see [The Applications Page](https://help.okta.com/okta_help.htm?id=ext_Apps_Apps_Page) for more on how to configure your apps.

## See also

### API reference pages

* [Okta Users API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/User/)
* [Okta Groups API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Group/)
* [API error codes](/docs/reference/error-codes/)
* [User profile attributes](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/User/#tag/User/operation/listUsers!c=200&path=profile&t=response)
* [Rate limits](/docs/reference/rate-limits/)

### Product help pages

* [Get started with Okta](https://help.okta.com/okta_help.htm?id=ext-get-started)
* [About profile sourcing](https://help.okta.com/okta_help.htm?id=csh-profile-masters)
* [Users, Groups, and Profiles](https://help.okta.com/okta_help.htm?id=ext_User_Lifecycle_Overview)