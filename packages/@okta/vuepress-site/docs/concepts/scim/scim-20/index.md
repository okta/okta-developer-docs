---
title: SCIM 2.0 Protocol Reference
meta:
  - name: description
    content: Your SCIM API must support specific SCIM 2.0 API endpoints to work with Okta. Those endpoints and their explanations are detailed here.
---

# Okta and SCIM Version 2.0

This reference focuses on how Okta API endpoints share information with System for Cross-domain Identity Management (SCIM) specific API calls.

This document specifically covers **Version 2.0** of the SCIM specification. For Version 1.1 of the SCIM specification, see our [SCIM 1.1 reference](/docs/concepts/scim/scim-11/).

<!-- Uncomment when the Okta Inbound SCIM 2.0 API section is promoted (INBOUND_SCIM is PRODUCT_DEV)
> **Note:** This reference describes **outbound** SCIM provisioning, where Okta acts as the SCIM client and calls the SCIM server that your app implements to provision users and groups. If you're instead looking for the API that lets an external SCIM client provision identities **into** Okta (inbound SCIM, where Okta is the SCIM server), see the [Okta Inbound SCIM 2.0 API](https://developer.okta.com/docs/api/openapi/okta-scim/inbound/overview).
-->

The SCIM protocol is an app-level REST protocol for provisioning and managing identity data on the web. The protocol supports creation, discovery, retrieval, and modification of core identity resources.

To better understand SCIM and the specific implementation of SCIM using Okta, see our [Understanding SCIM](/docs/concepts/scim/) guide or our blog post on [What is SCIM?](https://www.okta.com/blog/2017/01/what-is-scim/).

> **Note:** Okta implements SCIM 2.0 as specified in the RFC documents from the Internet Engineering Task Force:
>
>* [Definitions, Overview, Concepts, and Requirements: RFC 7642](https://tools.ietf.org/html/rfc7642)
>* [Core Schema: RFC 7643](https://tools.ietf.org/html/rfc7643)
>* [Protocol: RFC 7644](https://tools.ietf.org/html/rfc7644)

## SCIM user operations

### Create users

<div class="three-quarter">

![Simple flow diagram for create user process](/img/oin/scim_flow-user-create.png)

</div>

The user creation operation brings the user's app profile from Okta over to the service provider as a user object. A user's app profile represents the key-value attributes defined on the **Profile** tab when a user object is added.

To enable user provisioning, you must configure the provisioning options in the Admin Console:

1. Select your SCIM integration from the list of integrations in your Okta org.
1. Click **To App** and **Edit** under the **Provisioning** tab.
1. Click **Enable** and then **Save** in the **Create User** section.

For more information on enabling the provisioning features of your SCIM integration, see [Configure provisioning for an app integration](https://help.okta.com/okta_help.htm?id=ext_prov_lcm_prov_app).

After saving the configuration, Okta makes two requests to your SCIM server:

> **Note:**  The number of requests made by Okta depends on the **Import Groups** checkbox setting. If this checkbox is selected, Okta makes two API calls, one to `/Users` and another to `/Groups`. If the checkbox isn’t selected, only the call to `/Users` is made to create the user.

```http
GET /scim/v2/Users?startIndex=1&count=2 HTTP/1.1
User-Agent: Okta SCIM Client 1.0.0
Authorization: <Authorization credentials>
```

and

```http
GET /scim/v2/Groups?startIndex=1&count=100 HTTP/1.1
User-Agent: Okta SCIM Client 1.0.0
Authorization: <Authorization credentials>
```

> **Note:** The query parameters that Okta sends at this point are always constant.

After you complete this step, whenever a user is assigned to the integration in Okta, the following requests are made against the SCIM server:

* Determine if the user object exists. Okta runs a query against the `userName` values stored on the SCIM server. If the query matches a user object, the SCIM server returns the user object's unique ID value. Okta stores this value as the `externalId` value in the Okta user profile.
* If the user isn't found on the SCIM server, create the user.
* If the user is found on the SCIM server, but the Okta account isn't active, activate the user in Okta.
* If the user is found on the SCIM server and the Okta account is active, then update the Okta profile by setting its unique `externalId` value to match the ID value returned from the SCIM server.

#### Determine if the user already exists

**GET** /Users

Okta checks that the user object exists on the SCIM server through a GET method request with the `filter=userName eq "{userName}"` query parameter. Your SCIM server must support this query parameter to provision users with Okta successfully. This check is performed using the `eq` (equal) operator against the unique identifier configured for the SCIM integration.

For example, if you configure the email attribute as a unique identifier, then the query parameter to determine if the user exists is `filter=userName eq "{email}"`.

> **Note:** The filter must check an attribute that’s _unique_ for all users in the service provider profiles.

For Okta Integration Network (OIN) integrations, this filter is configured with the help of the assigned Okta App analyst during the submission process. Integration submissions are handled through the [OIN Manager](https://oinmanager.okta.com).

The requests from Okta to the service provider are of the form:

```http
GET /scim/v2/Users?filter=userName%20eq%20%22test.user%40okta.local%22&startIndex=1&count=100 HTTP/1.1
User-Agent: Okta SCIM Client 1.0.0
Authorization: <Authorization credentials>
```

The SCIM app checks the filter provided and returns an empty response if no users match the filter criteria. For example:

```http
HTTP/1.1 200 OK
Date: Tue, 10 Sep 2019 01:49:39 GMT
Content-Type: application/scim+json; charset=UTF-8

{
    "schemas": ["urn:ietf:params:scim:api:messages:2.0:ListResponse"],
    "totalResults": 0,
    "startIndex": 1,
    "itemsPerPage": 0,
    "Resources": []
}
```

Another acceptable response from the SCIM app if no user objects match the filter criteria is to return the error schema response:

```http
HTTP/1.1 404 Not Found
Date: Tue, 10 Sep 2019 01:58:03 GMT
Content-Type: application/scim+json; charset=UTF-8

{
    "schemas": ["urn:ietf:params:scim:api:messages:2.0:Error"],
    "detail": "User not found",
    "status": "404"
}
```

If the SCIM server does return a user object, Okta automatically matches the result with the user in Okta and sends the user's app profile to the SCIM server.

#### Create the user

**POST** /Users

If the user object isn't found on the SCIM server, then Okta attempts to create it through a POST method request that contains the user's app profile. The request appears as follows:

```http
POST /scim/v2/Users HTTP/1.1
User-Agent: Okta SCIM Client 1.0.0
Authorization: <Authorization credentials>

{
    "schemas": ["urn:ietf:params:scim:schemas:core:2.0:User"],
    "userName": "test.user@okta.local",
    "name": {
        "givenName": "Test",
        "familyName": "User"
    },
    "emails": [{
        "primary": true,
        "value": "test.user@okta.local",
        "type": "work"
    }],
    "displayName": "Test User",
    "locale": "en-US",
    "externalId": "00ujl29u0le5T6Aj10h7",
    "groups": [],
    "password": "1mz050nq",
    "active": true
}
```

> **Note:** Okta sends the `password` parameter in a create user request, even if password sync isn't enabled. This parameter acts as a placeholder for legacy provisioning platforms and its value isn't relevant or sensitive in nature.

The response from the SCIM server contains the created user object:

```http
HTTP/1.1 201 Created
Date: Tue, 10 Sep 2019 02:02:58 GMT
Content-Type: application/scim+json; charset=UTF-8

{
    "schemas": ["urn:ietf:params:scim:schemas:core:2.0:User"],
    "id": "23a35c27-23d3-4c03-b4c5-6443c09e7173",
    "userName": "test.user@okta.local",
    "name": {
        "givenName": "Test",
        "familyName": "User"
    },
    "emails": [{
        "primary": true,
        "value": "test.user@okta.local",
        "type": "work"
    }],
    "displayName": "Test User",
    "locale": "en-US",
    "externalId": "00ujl29u0le5T6Aj10h7",
    "active": true,
    "groups": [],
    "meta": {
        "resourceType": "User"
    }
}
```

Another scenario is if your SCIM server has custom attributes that you want to add for any new user. Any custom attributes defined in your app schema for user profiles are applied to the user's app profile when the user is created. The request to the SCIM server looks like the following:

```http
POST /scim/v2/Users HTTP/1.1
User-Agent: Okta SCIM Client 1.0.0
Authorization: <Authorization credentials>

{
    "schemas": ["urn:ietf:params:scim:schemas:core:2.0:User"],
    "userName": "test.user@okta.local",
    "name": {
        "givenName": "Test",
        "familyName": "User"
    },
    "emails": [{
        "primary": true,
        "value": "test.user@okta.local",
        "type": "work"
    }],
    "displayName": "Test User",
    "locale": "en-US",
    "groups": [],
    "password": "1mz050nq",
    "active": true
}
```

The response from the SCIM server contains the created user object with the additional custom attributes:

```http
HTTP/1.1 201 Created
Date: Tue, 10 Sep 2019 02:02:58 GMT
Content-Type: application/scim+json; charset=UTF-8

{
    "schemas": ["urn:ietf:params:scim:schemas:core:2.0:User"],
    "id": "23a35c27-23d3-4c03-b4c5-6443c09e7173",
    "userName": "test.user@okta.local",
    "name": {
        "givenName": "Test",
        "familyName": "User"
    },
    "emails": [{
        "primary": true,
        "value": "test.user@okta.local",
        "type": "work"
    }],
    "displayName": "Test User",
    "locale": "en-US",
    "externalId": "00ujl29u0le5T6Aj10h7",
    "active": true,
    "userType": "Contractor"
    "groups": [],
    "meta": {
        "resourceType": "User"
    }
}
```

In this example, the `externalID` and `userType` attributes weren't included in the original POST method request, but are generated and returned in the SCIM server response.

> **Note:** If your custom attributes are defined in your Okta integration (as an app to Okta mapping), the custom attributes aren't applied to the Okta user profile until an admin runs an import from the SCIM app or a Force Sync operation.

If the SCIM server returns an empty response body to the provisioning request, then Okta marks the operation as invalid, and the Admin Console displays an error:

"Automatic provisioning of user `userName` to app `AppName` failed: Error while creating user `displayName`: Create new user returned empty user."

If the user object that Okta tries to create exists in the service provider app, then the service provider needs to respond with an error schema to stop the provisioning job. The response appears as follows:

```http
HTTP/1.1 409 Conflict
Date: Tue, 10 Sep 2019 02:22:30 GMT
Content-Type: application/scim+json; charset=UTF-8

{
    "schemas": ["urn:ietf:params:scim:api:messages:2.0:Error"],
    "detail": "User already exists in the database.",
    "status": "409"
}
```

### Retrieve users

**GET** /Users

When importing user objects from the SCIM server, Okta accesses the `/Users` endpoint and processes them page by page, using `startIndex`, `count`, and `totalResults` as pagination references. Similarly, when returning large lists of resources, your SCIM implementation must support pagination. Using a limit of `count` results and an offset of `startIndex` returns smaller groupings of resources in a request.

> **Note:** The `itemsPerPage`, `startIndex`, and `totalResults` values need to be exchanged as integers, not as strings.

Okta uses `count=100` as the pagination reference to return up to 100 elements. If the value of `totalResults` is higher than 100, then after Okta finishes retrieving the first 100 resources, the `startIndex` becomes `startIndex+100` and is passed as a query parameter along with `count` in a new request to the `/Users` endpoint. This pagination operation repeats until all pages are viewed.

The SCIM server must consistently return the same ordering of results for the requests, regardless of which values are provided for the `count` and `startIndex` pagination references. For more information on pagination, see [Section 3.4.2.4](https://tools.ietf.org/html/rfc7644#section-3.4.2.4) of the V2.0 specification.

The following is a sample request from Okta to retrieve the users from the SCIM app:

```http
GET /scim/v2/Users?startIndex=1&count=100 HTTP/1.1
User-Agent: Okta SCIM Client 1.0.0
Authorization: <Authorization credentials>
```

The response to this request is a JSON list of all the resources found in the SCIM app.

### Retrieve a specific user

**GET** /Users/*{userID}*

Okta can also run a GET method request to check if a specific user object still exists on the SCIM server. The request looks like the following:

```http
GET /scim/v2/Users/23a35c27-23d3-4c03-b4c5-6443c09e7173 HTTP/1.1
User-Agent: Okta SCIM Client 1.0.0
Authorization: <Authorization credentials>
```

The response from the server is the user object:

```http
HTTP/1.1 200 OK
Date: Tue, 10 Sep 2019 03:46:53 GMT
Content-Type: application/scim+json; charset=UTF-8

{
    "schemas": ["urn:ietf:params:scim:schemas:core:2.0:User"],
    "id": "23a35c27-23d3-4c03-b4c5-6443c09e7173",
    "userName": "test.user@okta.local",
    "name": {
        "givenName": "Test",
        "middleName": "",
        "familyName": "User"
    },
    "active": true,
    "emails": [{
        "primary": true,
        "value": "test.user@okta.local",
        "type": "work",
        "display": "test.user@okta.local"
    }],
    "groups": [],
    "meta": {
        "resourceType": "User"
    }
}
```

### Update a specific user (PUT)

<div class="three-quarter">

![Simple flow diagram for updating a user with a PUT method request](/img/oin/scim_flow-user-update-put.png)

</div>

Updating a user object refers to modifying an attribute in the Okta user's app profile that is mapped to an attribute in the SCIM app.

To update a user object, you need to enable the functionality in the Admin Console:

1. Select your SCIM integration from the list of integrations in your Okta org.
1. Under the **Provisioning** tab, click **To App**.
1. In the **Update User Attributes** option, click **Enable** and then **Save**.

#### Retrieve the user

**GET** /Users/*{userID}*

To update a user, Okta first makes a GET method request to `/Users/{userID}` and retrieves the body of the user object:

```http
GET /scim/v2/Users/23a35c27-23d3-4c03-b4c5-6443c09e7173 HTTP/1.1
User-Agent: Okta SCIM Client 1.0.0
Authorization: <Authorization credentials>
```

When the SCIM server receives this request, it responds with the user object:

```http
HTTP/1.1 200 OK
Date: Tue, 10 Sep 2019 03:46:53 GMT
Content-Type: application/scim+json; charset=UTF-8

{
    "schemas": ["urn:ietf:params:scim:schemas:core:2.0:User"],
    "id": "23a35c27-23d3-4c03-b4c5-6443c09e7173",
    "userName": "test.user@okta.local",
    "name": {
        "givenName": "Another",
        "middleName": "",
        "familyName": "User"
    },
    "emails": [{
        "primary": true,
        "value": "test.user@okta.local",
        "type": "work",
        "display": "test.user@okta.local"
    }],
    "active": true,
    "groups": [],
    "meta": {
        "resourceType": "User"
    }
}
```

#### Update the user

**PUT** /Users/*{userID}*

> **Note:**
>
> * For any new OIN app integrations, all updates to a user object are handled using a PUT method request, except as noted in [Update a specific user (PATCH)](#update-a-specific-user-patch).
> * For any custom app integrations created using the App Integration Wizard (AIW), all updates to a user object are handled using a PUT method request.

After the SCIM server retrieves the user object, Okta modifies the attributes that were changed and runs a PUT method request with the new body to the `/Users/{userID}` endpoint:

```http
PUT /scim/v2/Users/23a35c27-23d3-4c03-b4c5-6443c09e7173 HTTP/1.1
User-Agent: Okta SCIM Client 1.0.0
Authorization: <Authorization credentials>

{
    "schemas": ["urn:ietf:params:scim:schemas:core:2.0:User"],
    "id": "23a35c27-23d3-4c03-b4c5-6443c09e7173",
    "userName": "test.user@okta.local",
    "name": {
        "givenName": "Another",
        "middleName": "Excited",
        "familyName": "User"
    },
    "emails": [{
        "primary": true,
        "value": "test.user@okta.local",
        "type": "work",
        "display": "test.user@okta.local"
    }],
    "active": true,
    "groups": [],
    "meta": {
        "resourceType": "User"
    }
}
```

The response from the SCIM server needs to be the updated user object:

```http
HTTP/1.1 200 OK
Date: Tue, 10 Sep 2019 03:48:10 GMT
Content-Type: application/scim+json; charset=UTF-8

{
    "schemas": ["urn:ietf:params:scim:schemas:core:2.0:User"],
    "id": "23a35c27-23d3-4c03-b4c5-6443c09e7173",
    "userName": "test.user@okta.local",
    "name": {
        "givenName": "Another",
        "middleName": "Excited",
        "familyName": "User"
    },
    "emails": [{
        "primary": true,
        "value": "test.user@okta.local",
        "type": "work",
        "display": "test.user@okta.local"
    }],
    "active": true,
    "groups": [],
    "meta": {
        "resourceType": "User"
    }
}
```

### Update a specific user (PATCH)

<div class="three-quarter">

![Simple flow diagram for updating a user with a PATCH method request](/img/oin/scim_flow-user-update-patch.png)

</div>

**PATCH** /Users/*{userID}*

For new OIN app integrations, the following operations update a user object through a PATCH method request:

* Activating a user
* Deactivating a user
* Syncing the user password

All other updates to user objects are handled through a PUT method request.

For any custom app integrations created using the AIW, all SCIM operations that update a user object, including these operations, are always sent through a PUT method request.

The `active` attribute in an Okta user profile represents the user's current status.

To deactivate users, you need to enable the functionality in the Admin Console:

1. Select your SCIM integration from the list of integrations in your Okta org.
1. Click **To App** and **Edit** under the **Provisioning** tab.
1. Click **Enable** and then **Save** in the **Deactivate Users** section.

When a user is deactivated, Okta sends this request:

```http
PATCH /scim/v2/Users/23a35c27-23d3-4c03-b4c5-6443c09e7173 HTTP/1.1
User-Agent: Okta SCIM Client 1.0.0
Authorization: <Authorization credentials>

{
    "schemas": ["urn:ietf:params:scim:api:messages:2.0:PatchOp"],
    "Operations": [{
        "op": "replace",
        "value": {
            "active": false
        }
    }]
}
```

The response from the SCIM server needs to be the updated user object:

```http
HTTP/1.1 200 OK
Date: Tue, 10 Sep 2019 03:50:23 GMT
Content-Type: application/scim+json; charset=UTF-8

{
    "schemas": ["urn:ietf:params:scim:schemas:core:2.0:User"],
    "id": "23a35c27-23d3-4c03-b4c5-6443c09e7173",
    "userName": "test.user@okta.local",
    "name": {
        "givenName": "Another",
        "middleName": "",
        "familyName": "User"
    },
    "emails": [{
        "primary": true,
        "value": "test.user@okta.local",
        "type": "work",
        "display": "test.user@okta.local"
    }],
    "active": false,
    "groups": [],
    "meta": {
        "resourceType": "User"
    }
}
```

> **Note:** The SCIM server response to PATCH method requests can also be an HTTP 204 response, with no body returned.

### Delete users

<div class="three-quarter">

![Simple flow diagram for deprovisioning a user](/img/oin/scim_flow-user-deprovision.png)

</div>

**DELETE** /Users/*{userID}*

Okta doesn't perform DELETE operations on user objects in your SCIM app.

If a user is deactivated or removed from your integration inside Okta, then Okta sends a request to your SCIM app to set the `active` attribute to `false`. There's no deprovisioning event sent for users that are suspended inside Okta.

* For all new OIN app integrations, this request to update a user object is sent through a PATCH method request.
* For any custom app integrations created using the AIW, this request is sent through a PUT method request.

For a detailed explanation on deleting users, see [Delete (Deprovision)](/docs/concepts/scim/#delete-deprovision).

## SCIM group operations

### Create groups

**POST** /Groups

To create a group object on the SCIM server, you first need to enable provisioning with the **Push Group** feature in the Admin Console:

1. Select your SCIM integration from the list of integrations in your Okta org.
2. Click **Push Groups** on the **Push Groups** tab.

You can select which existing Okta group to push, either by specifying a name or a rule. If a group doesn't exist, create a group in Okta and then push it to the SCIM server. For more information, see [Group Push](https://help.okta.com/okta_help.htm?id=ext_Directory_Using_Group_Push) in the Okta Help Documentation.

After the group is selected, Okta makes a POST method request to the service provider:

```http
POST /scim/v2/Groups HTTP/1.1
User-Agent: Okta SCIM Client 1.0.0
Authorization: <Authorization credentials>

{
    "schemas": ["urn:ietf:params:scim:schemas:core:2.0:Group"],
    "displayName": "Test SCIMv2",
    "members": []
}
```

When it receives this request, the SCIM server responds with the group object as it would for a GET method request to `/Groups/${groupID}/`:

```http
HTTP/1.1 201 Created
Date: Tue, 10 Sep 2019 04:54:18 GMT
Content-Type: application/scim+json; charset=UTF-8

{
    "schemas": ["urn:ietf:params:scim:schemas:core:2.0:Group"],
    "id": "abf4dd94-a4c0-4f67-89c9-76b03340cb9b",
    "displayName": "Test SCIMv2",
    "members": [],
    "meta": {
        "resourceType": "Group"
    }
}
```

### Retrieve groups

**GET** /Groups

When importing group objects from the SCIM server, Okta accesses the `/Groups` endpoint and processes them page by page, using the `startIndex`, `count`, and `totalResults` values for reference. Similarly, when returning large lists of resources, your SCIM implementation must support pagination. Using a limit of `count` results and an offset of `startIndex` returns smaller groupings of resources in a request.

> **Note:** The `itemsPerPage`, `startIndex`, and `totalResults` values need to be exchanged as integers, not as strings.

Okta uses `count=100` as the pagination reference to return up to 100 elements. If the value of `totalResults` is higher than 100, then after Okta finishes retrieving the first 100 resources, the `startIndex` becomes `startIndex+100` and is passed as a query parameter along with `count` in a new request to the `/Groups` endpoint. This pagination operation repeats until all pages are viewed.

The SCIM server must consistently return the same ordering of results for the requests, regardless of which values are provided for the `count` and `startIndex` pagination references.

The following is a sample request from Okta to retrieve the group objects from the SCIM app:

```http
GET /scim/v2/Groups?startIndex=1&count=100 HTTP/1.1
User-Agent: Okta SCIM Client 1.0.0
Authorization: <Authorization credentials>
```

The response to this request is a JSON list of all the group objects found in the SCIM app.

You must also implement filtering results with the `eq` (equals) operator on your SCIM server.
Okta checks that the group object exists on the SCIM server through a GET method request with the `filter=displayName eq "{groupName}"` path parameter, where `groupName` is the group name on the target app.

Okta uses the `GET /Groups` request with a group name filter when you want to update a group, but the external group ID isn't known.

> **Note:** One case where the external group ID isn't known is when admins configure the provisioning app integration and clear the **Import Groups** checkbox. See [Configure provisioning for an app integration](https://help.okta.com/okta_help.htm?id=ext_prov_lcm_prov_app).

The following is an example of a request to the SCIM server:

```http
GET /scim/v2/Groups?filter=displayName%20eq%20%22Test%20SCIMv2%22&startIndex=1&count=100 HTTP/1.1
User-Agent: Okta SCIM Client 1.0.0
Authorization: <Authorization credentials>
```

The SCIM server processes the request and responds with one of the following:

* A list of groups if they match the filter criteria, for example:

    ```http
    HTTP/1.1 200 OK
    Date: Wed, 15 May 2024 10:02:45 GMT
    Content-Type: application/scim+json; charset=UTF-8

    {
        "schemas": [
            "urn:ietf:params:scim:api:messages:2.0:ListResponse"
        ],
        "totalResults": 1,
        "startIndex": 1,
        "itemsPerPage": 1,
        "Resources": [
            {
            "id": "e7d09e9b3faa4888b65cf9e9316cba1c",
            "meta": {
                "created": "2024-05-15T09:21:23",
                "lastModified": "2024-05-15T09:21:23",
                "version": "v1.0"
            },
            "displayName": "Test SCIMv1"
           },
        ]
    }
    ```

* An empty response if no groups match the filter criteria, for example:

    ```http
    HTTP/1.1 200 OK
    Date: Wed, 15 May 2024 11:02:14 GMT
    Content-Type: application/scim+json; charset=UTF-8

    {
        "schemas": ["urn:ietf:params:scim:api:messages:2.0:ListResponse"],
        "totalResults": 0,
        "startIndex": 1,
        "itemsPerPage": 0,
        "Resources": []
    }
    ```

### Retrieve specific groups

**GET** /Groups/*{groupID}*

There are situations where Okta needs to run a GET method request on a specific `{groupID}`, for example, to see if the group object still exists on the SCIM server. The request appears as follows:

```http
GET /scim/v2/Groups/abf4dd94-a4c0-4f67-89c9-76b03340cb9b HTTP/1.1
User-Agent: Okta SCIM Client 1.0.0
Authorization: <Authorization credentials>
```

The response from the server is the group object details:

```http
HTTP/1.1 200 OK
Date: Tue, 10 Sep 2019 05:06:25 GMT
Content-Type: application/scim+json; charset=UTF-8

{
    "schemas": ["urn:ietf:params:scim:schemas:core:2.0:Group"],
    "id": "abf4dd94-a4c0-4f67-89c9-76b03340cb9b",
    "displayName": "Test SCIMv2",
    "members":  [{
        "value": "b1c794f24f4c49f4b5d503a4cb2686ea",
        "display": "SCIM 2 Group A"
    }],
    "meta": {
        "resourceType": "Group"
    }
}
```

> **Note:** You must return the `members` list payload when `GET /Groups/{groupID}` is requested without any query parameters.

### Update a specific group name

**PATCH** /Groups/*{groupID}*

**PUT** /Groups/*{groupID}*

Updates to existing names for Okta groups are handled by a method request to your SCIM app. The group object must be already pushed out to the SCIM server.

* For all new OIN app integrations, this request to update a group object is sent through a PATCH method request.
* For custom app integrations created using the AIW, this request to update a group object is sent through a PUT request.

>**Note:** Okta recommends using the PATCH method to update the group name for SCIM groups.

#### PATCH method request

```http
PATCH /scim/v2/Groups/abf4dd94-a4c0-4f67-89c9-76b03340cb9b HTTP/1.1
User-Agent: Okta SCIM Client 1.0.0
Authorization: <Authorization credentials>

{
    "schemas": ["urn:ietf:params:scim:api:messages:2.0:PatchOp"],
    "Operations": [{
        "op": "replace",
        "value": {
            "id": "abf4dd94-a4c0-4f67-89c9-76b03340cb9b",
            "displayName": "Test SCIMv2"
        }
    }]
}
```

The group name update operation triggers each time there's a group membership update operation.

The SCIM server response returns the updated group object:

```http
HTTP/1.1 200 OK
Date: Tue, 10 Sep 2019 05:08:48 GMT
Content-Type: application/scim+json; charset=UTF-8

{
    "schemas": ["urn:ietf:params:scim:schemas:core:2.0:Group"],
    "id": "abf4dd94-a4c0-4f67-89c9-76b03340cb9b",
    "displayName": "Test SCIMv20",
    "members": null,
    "meta": {
        "resourceType": "Group"
    }
}
```

> **Note:** The SCIM server response to PATCH method requests can also be an HTTP 204 response, with no body returned.

#### PUT method request

```http
PUT /scim/v2/Groups/U0FP0NMEE HTTP/1.1
User-Agent: Okta SCIM Client 1.0.0
Authorization: <Authorization credentials>
{
        "schemas": ["urn:ietf:params:scim:schemas:core:2.0:Group"],
        "id":"e9e30dba-f08f-4109-8486-d5c6a331660a",
        "displayName": "Tour Guides",
        "members": [
        {
        "value": "some-member-1",
        "display": "Babs Jensen"
        },
        {
        "value": "some-member-2",
        "display": "Mandy Pepperidge"
        }
        ]
}
```

The SCIM server response returns the updated group object:

```http
HTTP/1.1 200 OK
Content-Type: application/scim+json; charset=UTF-8

{
    "schemas": ["urn:ietf:params:scim:schemas:core:2.0:Group"],
    "id":"e9e30dba-f08f-4109-8486-d5c6a331660a",
    "displayName": "Tour Guides",
    "members": [
        {
            "value": "some-member-1",
            "display": "Babs Jensen"
        },
        {
            "value": "some-member-2",
            "display": "Mandy Pepperidge"
        }
    ],
    "meta": {
        "resourceType": "Group",
        "created": "01-23-2017 00:00:00",
        "lastModified": "01-23-2017 00:00:00",
        "version": "v1.0"
        }
}
```

### Update specific group membership

**PATCH** /Groups/*{groupID}*

**PUT** /Groups/*{groupID}*

To add or remove users inside a specific pushed group object on the SCIM server, Okta requires the following:

* The user must be a member of the group in Okta.
* The user has been added under the **Assignments** tab of the SCIM integration inside the Admin Console.
* The group is pushed under the **Push Groups** tab of the SCIM integration inside the Admin Console.

If these three requirements are met, Okta sends a request to add the specified users to the group object on the SCIM server.

* For all new OIN app integrations, a PATCH method request is used to update a group object, for example:

    ```http
    PATCH /scim/v2/Groups/abf4dd94-a4c0-4f67-89c9-76b03340cb9b HTTP/1.1
    User-Agent: Okta SCIM Client 1.0.0
    Authorization: <Authorization credentials>

    {
        "schemas": ["urn:ietf:params:scim:api:messages:2.0:PatchOp"],
        "Operations": [{
            "op": "remove",
            "path": "members[value eq \"89bb1940-b905-4575-9e7f-6f887cfb368e\"]"
            },
            {
            "op": "add",
            "path": "members",
            "value": [{
                "value": "23a35c27-23d3-4c03-b4c5-6443c09e7173",
                "display": "test.user@okta.local"
            }]
        }]
    }
    ```

* For custom app integrations created using the AIW, a PUT method request is used to update a group object, for example:

    ```http
    PUT /scim/v2/Groups/abf4dd94-a4c0-4f67-89c9-76b03340cb9b HTTP/1.1
    User-Agent: Okta SCIM Client 1.0.0
    Authorization: <Authorization credentials>

    {
        "schemas": ["urn:ietf:params:scim:schemas:core:2.0:Group"],
        "displayName": "Test SCIMv2",
        "members": [
                {
                "value": "23a35c27-23d3-4c03-b4c5-6443c09e7173",
                "display": "test.user@okta.local"
                }
        ]
    }
    ```

The SCIM server response returns the updated group object:

```http
HTTP/1.1 200 OK
Date: Tue, 10 Sep 2019 05:06:25 GMT
Content-Type: application/scim+json; charset=UTF-8

{
    "schemas": ["urn:ietf:params:scim:schemas:core:2.0:Group"],
    "id": "abf4dd94-a4c0-4f67-89c9-76b03340cb9b",
    "displayName": "Test SCIMv20",
    "members": [
        {
            "value": "23a35c27-23d3-4c03-b4c5-6443c09e7173",
            "display": "test.user@okta.local"
        }
     ],
    "meta": {
        "resourceType": "Group"
    }
}
```

In this example, the `members` attribute returns a null value. Okta doesn't require the list of users to be returned, but it does require the other details about the group.

You can also send a full push of the membership to the SCIM server using the `replace` operation. This operation replaces all the group members with the supplied object values.

```http
PATCH /scim/v2/Groups/abf4dd94-a4c0-4f67-89c9-76b03340cb9b HTTP/1.1
User-Agent: Okta SCIM Client 1.0.0
Authorization: <Authorization credentials>

{
  "schemas": [
    "urn:ietf:params:scim:api:messages:2.0:PatchOp"
  ],
  "Operations": [
    {
      "op": "replace",
      "path": "members",
      "value": [
        {
          "value": "23a35c27-23d3-4c03-b4c5-6443c09e7173",
          "display": "test.user@okta.local"
        },
        {
          "value": "89bb1940-b905-4575-9e7f-6f887cfb368e",
          "display": "test.user@okta.local"
        }
      ]
    }
  ]
}
```

> **Note:** The SCIM server response to PATCH method requests can also be an HTTP 204 response, with no body returned.

### Delete a specific group

**DELETE** /Groups/*{groupID}*

Okta administrators can remove pushed groups from the Admin Console, under the **Push Groups** tab of the SCIM integration.

On the **Push Groups** tab, click **Active** then click **Unlink pushed group**. In the dialog box that appears, you can choose whether you want to **Delete the group in the target app** or **Leave the group in the target app** on the SCIM server.

When you select the **Delete the group in the target app** option and click **Unlink**, Okta sends a DELETE method request:

```http
DELETE /scim/v2/Groups/abf4dd94-a4c0-4f67-89c9-76b03340cb9b HTTP/1.1
User-Agent: Okta SCIM Client 1.0.0
Authorization: <Authorization credentials>
```

The SCIM server can return an empty response:

```http
HTTP/1.1 204 No Content
Date: Tue, 10 Sep 2019 05:29:25 GMT
```

### Additional references

* [What is SCIM?](https://www.okta.com/blog/2017/01/what-is-scim/)
* [SCIM Provisioning using Okta Lifecycle Management](/docs/concepts/scim/)
* [Build a SCIM provisioning integration](/docs/guides/scim-provisioning-integration-overview)
* [SCIM 2.0 RFC: Core Schema](https://tools.ietf.org/html/rfc7643)
* [SCIM 2.0 RFC: Protocol](https://tools.ietf.org/html/rfc7644)
* [SCIM 2.0 RFC: Definitions and Use Cases](https://tools.ietf.org/html/rfc7642)
