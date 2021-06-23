---
title: Bulk Migration with Credentials
---

## Performing a migration using the Okta API

As part of your plan and preparation to migrate your users to Okta, you gathered your source data into an intermediate staging area such as a secure local database or a CSV file. This guide shows you how to use that data to create users and groups in Okta using the [Okta Users API](https://developer.okta.com/docs/reference/api/users/) and the [Okta Groups API](https://developer.okta.com/docs/reference/api/groups/).

### Prerequisites

To use this guide, you need the following:

* An Okta developer org. (Don’t have one? [Create an org for free.](https://developer.okta.com/signup))
* Postman client to run API requests. See [Use Postman with the Okta REST APIs](https://developer.okta.com/code/rest/) for information on setting up Postman.
* Example or test source data to test user and group creation requests. (Do not use real user data when testing!)

**Note:** The examples in this guide are presented using cURL commands. Postman can generate request code for a number of programming languages that can help with development.

### Sample data

The [Okta Users API](https://developer.okta.com/docs/reference/api/users/) provides several operations to create users. To keep it simple, we’ll use [Create User without Credentials](https://developer.okta.com/docs/reference/api/users/#create-user-without-credentials) in this guide.

This is the sample data we’ll use for one user:

* First Name: John
* Last Name: Smith
* Email Address: john.smith@example.com
* Groups: All Employees, Sales, Northeast

It’s a good idea to use sample data that’s as close as possible to your real user data to identify any potential issues before implementation.

### Create groups

If your user data includes groups and you want to include those groups when you create your users in Okta, you’ll have to create equivalent Okta Groups first. You can create an Okta Group for the sample data we’re using (in this case, “All Employees”) using an [Add Group](https://developer.okta.com/docs/reference/api/groups/#add-group) request:

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

The description property can be blank.

#### Response example

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
                "href": "https://${yourOktaDomain}/img/logos/groups/okta-medium.png",
                "type": "image/png"
            },
            {
                "name": "large",
                "href": "https://${yourOktaDomain}/img/logos/groups/okta-large.png",
                "type": "image/png"
            }
        ],
        "users": {
            "href": "https://${yourOktaDomain}/api/v1/groups/00g40q3dfwN2l6Bju357/users"
        },
        "apps": {
            "href": "https://${yourOktaDomain}/api/v1/groups/00g40q3dfwN2l6Bju357/apps"
        }
    }
}
```

You can obtain the new Group ID (`id`) from the response to use when you create Users in that Group later. You can also list all Groups in your org and obtain their IDs using a [List Groups](/docs/reference/api/groups/#list-groups) request.

You can also create Groups in your Okta Admin Console. For more information, see [Manage groups](https://help.okta.com/en/prod/okta_help_CSH.htm#Directory_Groups) in the product documentation.

### Create users

Once you have created all the necessary Okta Groups, you can create Users including their Group Memberships. As mentioned earlier, we’re using [Create User without Credentials](/docs/reference/api/users/#create-user-without-credentials) to create our sample user.
In our sample, the user’s email address is our unique login and the Group IDs are from the List Groups request in the previous step.

#### Request example with groups

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

If you don’t have any Groups or want to add your Users to Groups later, simply use the same request but without the `groupIds` array.

#### Request example without groups

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

#### Response example for both requests

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
            "href": "https://${yourOktaDomain}/api/v1/meta/schemas/user/osc1lidmn8y5qtJc6357"
        },
        "activate": {
            "href": "https://${yourOktaDomain}/api/v1/users/00u40qykk8zaeeRfe357/lifecycle/activate",
            "method": "POST"
        },
        "self": {
            "href": "https://${yourOktaDomain}/api/v1/users/00u40qykk8zaeeRfe357"
        },
        "type": {
            "href": "https://${yourOktaDomain}/api/v1/meta/types/user/oty1lidmn8y5qtJc6357"
        }
    }
}
```

### User status and activation

The user status in the response when you create a User is set to `STAGED`, which essentially means that the user has been created but not activated yet. You can activate users using the API or in your Okta Admin Console. For more information on account states and activation, see:

* [User status values](https://developer.okta.com/docs/reference/api/users/#user-status) (API reference)
* [Activate User request](https://developer.okta.com/docs/reference/api/users/#activate-user) (API reference)
* [End user account states](https://help.okta.com/en/prod/Content/Topics/Directory/end-user-states.htm) (product documentation)
* [Activate user accounts](https://help.okta.com/en/prod/Content/Topics/Directory/ad-agent-activate-user-accounts.htm) (product documentation)

### Rate limits

Remember that [rate limits](https://developer.okta.com/docs/reference/rate-limits/) apply to API requests when doing bulk/batch user migration, and the rate limits differ depending on the level of service you have purchased from Okta. [You can check your rate limits](https://developer.okta.com/docs/reference/rate-limits/#check-your-rate-limits-with-okta-s-rate-limit-headers) in your code using Okta’s Rate Limit Headers.

### Next steps

At this point, you should understand how to use the Okta API to migrate legacy users and groups to Okta.

Your next step should be configuring the necessary integration and access to applications for your users. Be sure to read the product documentation for an [overview of application integration](https://help.okta.com/en/prod/Content/Topics/Apps/Apps_Apps.htm) and see the information about [The Applications Page](https://help.okta.com/en/prod/Content/Topics/Apps/Apps_Apps_Page.htm) for more on how to configure your applications.

### Reference 

This is a collection of reference links that we covered in this guide, as well as links for further information:

#### API reference pages

* [Okta Users API](/docs/reference/api/users/)
* [Okta Groups API](https://developer.okta.com/docs/reference/api/groups/)
* [API error codes](/docs/reference/error-codes/)
* [Default user profile properties](/docs/reference/api/users/#default-profile-properties)
* [Rate limits](/docs/reference/rate-limits/)

#### Product help pages

* [Get started with Okta](https://help.okta.com/en/prod/okta_help_CSH.htm#ext-get-started)
* [Profile mastering](https://help.okta.com/en/prod/okta_help_CSH.htm#csh-profile-masters)
* [Users, Groups, and Profiles](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_User_Lifecycle_Overview)

Lastly, if you get stuck, don’t hesitate to post a question on the [Okta Developer Forum](https://devforum.okta.com).
