---
title: SCIM 2.0 Protocol Reference
meta:
  - name: description
    content: Your SCIM API must support specific SCIM 2.0 API endpoints to work with Okta. Those endpoints and their explanations are detailed here.
---

# Okta and SCIM Version 2.0

This reference focuses on how Okta API endpoints share information with System for Cross-domain Identity Management (SCIM) specific API calls.

This document specifically covers **Version 2.0** of the SCIM specification. For Version 1.1 of the SCIM specification, see our [SCIM 1.1 reference](/docs/reference/scim/scim-11/).

The SCIM protocol is an application-level REST protocol for provisioning and managing identity data on the web. The protocol supports creation, discovery, retrieval, and modification of core identity resources.

To better understand SCIM and the specific implementation of SCIM using Okta, see our [Understanding SCIM](/docs/concepts/scim/) guide or our blog post on [What is SCIM?](https://www.okta.com/blog/2017/01/what-is-scim/).

>**Note:** Okta implements SCIM 2.0 as specified in the RFC documents from the Internet Engineering Task Force:
>
>* [Definitions, Overview, Concepts, and Requirements: RFC 7642](https://tools.ietf.org/html/rfc7642)
>* [Core Schema: RFC 7643](https://tools.ietf.org/html/rfc7643)
>* [Protocol: RFC 7644](https://tools.ietf.org/html/rfc7644)

## SCIM User operations

### Create Users

<div class="three-quarter">

![Simple flow diagram for create User process](/img/oin/scim_flow-user-create.png)

</div>

The User creation operation brings the user's application profile from Okta over to the Service Provider as a User object. A user's application profile represents the key-value attributes defined on the **Profile** tab when a User object is added.

To enable user provisioning, you must configure the provisioning options in the Okta Admin Console. In the Okta Admin Console:

1. Select your SCIM integration from the list of integrations in your Okta org.
1. Under the **Provisioning** tab, click **To App** and **Edit**.
1. In the **Create User** option, click **Enable** and then **Save**.

For more information on enabling the provisioning features of your SCIM integration, see [Configure provisioning for an app integration](https://help.okta.com/okta_help.htm?id=ext_prov_lcm_prov_app).

After you complete this step, whenever a user is assigned to the integration in Okta, the following requests are made against the SCIM server:

* Determine if the User object already exists. Okta runs a query against the `userName` values stored on the SCIM server. If the query matches a User object, the SCIM server returns the User object's unique ID value. Okta stores this value as the `externalId` value in the Okta user profile.
* If the User isn't found on the SCIM server, create the User.
* If the User is found on the SCIM server, but the Okta account is not active, activate the User in Okta.
* If the User is found on the SCIM server and the Okta account is active, then update the Okta profile by setting its unique `externalId` value to match the ID value returned from the SCIM server.

#### Determine if the User already exists

**GET** /Users

Okta checks that the User object exists on the SCIM server through a GET method request with the `filter=userName` parameter (or any other filter parameter that was configured with the SCIM integration). This check is performed using the `eq` (equal) operator and is the only one necessary to successfully provision users with Okta.

> **Note:** The filter must check an attribute that is _unique_ for all Users in the Service Provider profiles.

For Okta Integration Network (OIN) integrations, this filter is configured with the help of the assigned Okta App Analyst during the submission process. Integration submissions are handled through the [OIN Manager](https://oinmanager.okta.com).

The requests from Okta to the Service Provider are of the form:

```http
GET /scim/v2/Users?filter=userName%20eq%20%22test.user%40okta.local%22&startIndex=1&count=100 HTTP/1.1
User-Agent: Okta SCIM Client 1.0.0
Authorization: <Authorization credentials>
```

The SCIM application checks the filter provided and returns an empty response if no Users match the filter criteria. For example:

```http
HTTP/1.1 200 OK
Date: Tue, 10 Sep 2019 01:49:39 GMT
Content-Type: text/json;charset=UTF-8

{
    "schemas": ["urn:ietf:params:scim:api:messages:2.0:ListResponse"],
    "totalResults": 0,
    "startIndex": 1,
    "itemsPerPage": 0,
    "Resources": []
}
```

Another acceptable response from the SCIM application if no User objects match the filter criteria is to return the error schema response:

```http
HTTP/1.1 404 Not Found
Date: Tue, 10 Sep 2019 01:58:03 GMT
Content-Type: text/html; charset=UTF-8

{
    "schemas": ["urn:ietf:params:scim:api:messages:2.0:Error"],
    "detail": "User not found",
    "status": 404
}
```

If the SCIM server does return a User object, Okta automatically matches the result with the user in Okta and sends the user's application profile to the SCIM server.

#### Create the User

**POST** /Users

If the User object isn't found on the SCIM server, then Okta attempts to create it through a POST method request that contains the user's application profile. The request looks like the following:

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

The response from the SCIM server contains the created User object:

```http
HTTP/1.1 201 Created
Date: Tue, 10 Sep 2019 02:02:58 GMT
Content-Type: text/json;charset=UTF-8

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

There is another scenario if your SCIM server has custom attributes that you want to add for any new user. Any custom attributes defined in your application schema for user profiles are applied to the user's application profile when the user is created. The request to the SCIM server looks like the following:

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
Content-Type: text/json;charset=UTF-8

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

>**Note:** If your custom attributes are defined in your Okta integration (as an App to Okta mapping), the custom attributes aren't applied to the Okta user profile until an admin runs an import from the SCIM application or a Force Sync operation.

If the SCIM server returns an empty response body to the provisioning request, then Okta marks the operation as invalid, and the Okta Admin Console displays an error:

"Automatic provisioning of user `userName` to app `AppName` failed: Error while creating user `displayName`: Create new user returned empty user."

If the User object that Okta tries to create already exists in the Service Provider application, then the Service Provider needs to respond with an error schema to stop the provisioning job. The response looks like the following:

```http
HTTP/1.1 409 Conflict
Date: Tue, 10 Sep 2019 02:22:30 GMT
Content-Type: text/json;charset=UTF-8

{
    "schemas": ["urn:ietf:params:scim:api:messages:2.0:Error"],
    "detail": "User already exists in the database.",
    "status": 409
}
```

### Retrieve Users

**GET** /Users

When importing User objects from the SCIM server, Okta accesses the `/Users` endpoint and processes them page by page, using `startIndex`, `count`, and `totalResults` as pagination references. Similarly, when returning large lists of resources, your SCIM implementation must support pagination. Using a limit of `count` results and an offset of `startIndex` returns smaller groupings of resources in a request.

> **Note:** The `itemsPerPage`, `startIndex`, and `totalResults` values need to be exchanged as integers, not as strings.

Okta uses `count=100` as the pagination reference to return up to 100 elements. If the value of `totalResults` is higher than 100, then after Okta finishes retrieving the first 100 resources, the `startIndex` becomes `startIndex+100` and is passed as a query parameter along with `count` in a new request to the `/Users` endpoint. This pagination operation repeats until all pages are viewed.

The SCIM server must consistently return the same ordering of results for the requests, regardless of which values are provided for the `count` and `startIndex` pagination references. For more information on pagination, see [Section 3.4.2.4](https://tools.ietf.org/html/rfc7644#section-3.4.2.4) of the V2.0 specification.

A sample request from Okta to retrieve the Users from the SCIM application:

```http
GET /scim/v2/Users?startIndex=1&count=100 HTTP/1.1
User-Agent: Okta SCIM Client 1.0.0
Authorization: <Authorization credentials>
```

The response to this request is a JSON list of all the resources found in the SCIM application.

### Retrieve a specific User

**GET** /Users/*$userID*

Okta can also run a GET method request to check if a specific User object still exists on the SCIM server. The request looks like the following:

```http
GET /scim/v2/Users/23a35c27-23d3-4c03-b4c5-6443c09e7173 HTTP/1.1
User-Agent: Okta SCIM Client 1.0.0
Authorization: <Authorization credentials>
```

The response from the server is the User object:

```http
HTTP/1.1 200 OK
Date: Tue, 10 Sep 2019 03:46:53 GMT
Content-Type: text/json;charset=UTF-8

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

### Update a specific User (PUT)

<div class="three-quarter">

![Simple flow diagram for updating a User with a PUT method request](/img/oin/scim_flow-user-update-put.png)

</div>

Updating a User object refers to modifying an attribute in the Okta user's application profile that is mapped to an attribute in the SCIM application.

To update a User object, you need to enable the functionality in the Okta Admin Console:

1. Select your SCIM integration from the list of integrations in your Okta org.
1. Under the **Provisioning** tab, click **To App**.
1. In the **Update User Attributes** option, click **Enable** and then **Save**.

#### Retrieve the User

**GET** /Users/*$userID*

To update a user, Okta first makes a GET method request to `/Users/${userID}` and retrieves the body of the User object:

```http
GET /scim/v2/Users/23a35c27-23d3-4c03-b4c5-6443c09e7173 HTTP/1.1
User-Agent: Okta SCIM Client 1.0.0
Authorization: <Authorization credentials>
```

When the SCIM server receives this request, it responds with the User object:

```http
HTTP/1.1 200 OK
Date: Tue, 10 Sep 2019 03:46:53 GMT
Content-Type: text/json;charset=UTF-8

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

#### Update the User

**PUT** /Users/*$userID*

>**Note:**
>
> * For any new OIN app integrations, all updates to a User object are handled using a PUT method request, except as noted in [Update a specific User (PATCH)](#update-a-specific-user-patch).
> * For any custom app integrations created using the App Integration Wizard (AIW), all updates to a User object are handled using a PUT method request.

After the User object is retrieved from the SCIM server, Okta modifies the attributes that were changed and runs a PUT method request with the new body to the `/Users/${userID}` endpoint:

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

The response from the SCIM server needs to be the updated User object:

```http
HTTP/1.1 200 OK
Date: Tue, 10 Sep 2019 03:48:10 GMT
Content-Type: text/json;charset=UTF-8

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

### Update a specific User (PATCH)

<div class="three-quarter">

![Simple flow diagram for updating a User with a PATCH method request](/img/oin/scim_flow-user-update-patch.png)

</div>

**PATCH** /Users/*$userID*

For new OIN app integrations, the following operations update a User object through a PATCH method request:

* Activating a user
* Deactivating a user
* Syncing the user password

All other updates to User objects are handled through a PUT method request.

For any custom app integrations created using the AIW, all SCIM operations that update a User object, including these operations, are always sent through a PUT method request.

The `active` attribute in an Okta user profile represents the user's current status.  

To deactivate users, you need to enable the functionality in the Okta Admin Console:

1. Select your SCIM integration from the list of integrations in your Okta org.
1. Under the **Provisioning** tab, click **To App** and **Edit**.
1. In the **Deactivate Users** option, click **Enable** and then **Save**.

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

The response from the SCIM server needs to be the updated User object:

```http
HTTP/1.1 200 OK
Date: Tue, 10 Sep 2019 03:50:23 GMT
Content-Type: text/json;charset=UTF-8

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

> **Note:** The SCIM server response to PATCH method requests can also be a HTTP 204 response, with no body returned.

### Delete Users

<div class="three-quarter">

![Simple flow diagram for deprovisioning a User](/img/oin/scim_flow-user-deprovision.png)

</div>

**DELETE** /Users/*$userID*

Okta doesn't perform DELETE operations on User objects in your SCIM application.

If a user is deactivated or removed from your integration inside Okta, then Okta sends a request to your SCIM application to set the `active` attribute to `false`. There is no deprovisioning event sent for users that are suspended inside Okta.

* For all new OIN app integrations, this request to update a User object is sent through a PATCH method request.
* For any custom app integrations created using the AIW, this request is sent through a PUT method request.

For a detailed explanation on deleting users, see [Delete (Deprovision)](/docs/concepts/scim/#delete-deprovision).

## SCIM Group operations

### Create Groups

**POST** /Groups

To create a Group object on the SCIM server, you first need to enable provisioning with the Group Push feature in the Admin Console:

1. Select your SCIM integration from the list of integrations in your Okta org.
2. On the **Push Groups** tab, click **Push Groups**.

You can select which existing Okta group to push, either by specifying a name or a rule. If a group doesn't exist, create a new group in Okta and then push it to the SCIM server. For more information, see [About Group push](https://help.okta.com/okta_help.htm?id=ext_Directory_Using_Group_Push) in the Okta Help Center.

After the group is selected, Okta makes a POST method request to the Service Provider:

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

When it receives this request, the SCIM server responds with the Group object as it would for a GET method request to the `/Groups/${groupID}/`:

```http
HTTP/1.1 201 Created
Date: Tue, 10 Sep 2019 04:54:18 GMT
Content-Type: text/json;charset=UTF-8

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

### Retrieve Groups

**GET** /Groups

When importing Group objects from the SCIM server, Okta accesses the `/Groups` endpoint and processes them page by page, using the `startIndex`, `count`, and `totalResults` values for reference. Similarly, when returning large lists of resources, your SCIM implementation must support pagination. Using a limit of `count` results and an offset of `startIndex` returns smaller groupings of resources in a request.

> **Note:** The `itemsPerPage`, `startIndex`, and `totalResults` values need to be exchanged as integers, not as strings.

Okta uses `count=100` as the pagination reference to return up to 100 elements. If the value of `totalResults` is higher than 100, then after Okta finishes retrieving the first 100 resources, the `startIndex` becomes `startIndex+100` and is passed as a query parameter along with `count` in a new request to the `/Groups` endpoint. This pagination operation repeats until all pages are viewed.

The SCIM server must consistently return the same ordering of results for the requests, regardless of which values are provided for the `count` and `startIndex` pagination references.

A sample request from Okta to retrieve the Group objects from the SCIM application:

```http
GET /scim/v2/Groups?startIndex=1&count=100 HTTP/1.1
User-Agent: Okta SCIM Client 1.0.0
Authorization: <Authorization credentials>
```

The response to this request is a JSON list of all the Group objects found in the SCIM application.

### Retrieve specific Groups

**GET** /Groups/*$groupID*

There are situations where Okta needs to run a GET method request on a specific `${groupID}`, for example to see if the Group object still exists on the SCIM server. The request looks like the following:

```http
GET /scim/v2/Groups/abf4dd94-a4c0-4f67-89c9-76b03340cb9b HTTP/1.1
User-Agent: Okta SCIM Client 1.0.0
Authorization: <Authorization credentials>
```

The response from the server is the Group object details:

```http
HTTP/1.1 200 OK
Date: Tue, 10 Sep 2019 05:06:25 GMT
Content-Type: text/json;charset=UTF-8

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

### Update a specific Group name

**PATCH** /Groups/*$groupID*

**PUT** /Groups/*$groupID*

Updates to existing names for Okta groups are handled by a method request to your SCIM application. The Group object must be already pushed out to the SCIM server.

* For all new OIN app integrations, this request to update a Group object is sent through a PATCH method request.
* For custom app integrations created using the AIW, this request to update a Group object is sent through a PUT request.

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

The group name update operation is triggered each time there is a group membership update operation.

The SCIM server response is to return the updated Group object:

```http
HTTP/1.1 200 OK
Date: Tue, 10 Sep 2019 05:08:48 GMT
Content-Type: text/json;charset=UTF-8

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

> **Note:** The SCIM server response to PATCH method requests can also be a HTTP 204 response, with no body returned.

### Update specific Group membership

**PATCH** /Groups/*$groupID*

**PUT** /Groups/*$groupID*

To add or remove users inside a specific pushed Group object on the SCIM server, Okta requires the following:

* The user must be a member of the group in Okta.
* The user has been added under the **Assignments** tab of the SCIM integration inside the Okta Admin Console.
* The group is pushed under the **Push Groups** tab of the SCIM integration inside the Okta Admin Console.

If these three requirements are met, Okta sends a request to add the specified users to the Group object on the SCIM server.

* For all new OIN app integrations, a PATCH method request is used to update a Group object. For example:

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

* For custom app integrations created using the AIW, a PUT method request is used to update a Group object. For example:

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

The SCIM server response is to return the updated Group object:

```http
HTTP/1.1 200 OK
Date: Tue, 10 Sep 2019 05:06:25 GMT
Content-Type: text/json;charset=UTF-8

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

In this example, the `members` attribute is returned with a null value. Okta doesn't require the list of users to be returned, but it does require the other details about the Group.

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

> **Note:** The SCIM server response to PATCH method requests can also be a HTTP 204 response, with no body returned.

### Delete a specific Group

**DELETE** /Groups/*$groupID*

Okta administrators can remove pushed groups from the Okta Admin Console, under the **Push Groups** tab of the SCIM integration.

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

## SCIM with Entitlements

Okta supports third-party entitlement discovery and assignment through a combination of [Okta Identity Governance](https://help.okta.com/en-us/content/topics/identity-governance/iga.htm) and SCIM 2.0.

In particular, user schema discovery allows Okta to support dynamic data from SCIM-enabled apps. The discovery process includes importing users into Okta and parsing the imported User objects.

When an app is provisioned, Okta calls the SCIM server to retrieve a list of resource types. Each User object consists of a core schema that's common to all users, and can optionally contain dynamic data. Okta defines schemas for two resource types: roles and entitlements. You can also create custom schema extensions to support custom attributes for Users, roles, and entitlements. Okta processes the available resource types and any custom attributes defined through schema extensions, which are added to the user profile for the app.

> **Note:** [Okta Identity Governance](https://help.okta.com/en-us/content/topics/identity-governance/iga.htm) is required to use entitlements.

---
### Endpoint call sequence

When you enable provisioning for your SCIM 2.0 app with entitlements, Okta calls the following endpoints in this order:
1. `/ResourceTypes`: Gets available Entitlements, Roles, Users, and Extension Schema URNs
1. `/Schemas`: Gets available schemas that match the ResourceType extension URNs from previous call
    > The schemas for Entitlements, Roles, and User (both Core and Enterprise) are known by Okta, and aren't required from `/Schemas`. 
    Only provide schema definitions for extensions unknown to Okta.
1. `/Entitlements` and `/Roles` endpoints: For each ResourceType with Okta's Role or Entitlement URN, Okta retrieves all values from the designated endpoints as defined in the respective ResourceType. For example, there might be a Profile ResourceType that has a corresponding `/Profiles` endpoint.
    > These endpoints are dynamic; whatever is defined for the endpoint in the ResourceType is the endpoint that Okta calls.

[insert image here - Scott to provide]

### User schema discovery and Profile Editor

User schema discovery is required for your app to understand entitlements and roles. 

When user schema discovery is enabled, admins can't add attributes to the app user profile in the Profile Editor in the Admin Console. The ability to add attributes is disabled because the contents of the app user profile is determined by the SCIM server between Okta and the downstream app. Okta gathers profile elements from the SCIM server to dynamically build the app user profile. 

The SCIM server should be updated as necessary to maintain parity with the downstream app. The user schema discovery mechanism allows the app provider to determine the contents of the app user profile.

### Create an app that supports entitlements and user schema discovery

    > (the app is really used by Okta as a gateway to call the endpoints - maybe simplify this seciton and not have so many details? Not just user schema discovery - this section might be more the integration guide than the dev guide) **REMOVE THIS NOTE**

1. Create an app using the SCIM 2.0 with OIG app template from the OIN.
    1. In the Admin Console, go to **Applications** > **Applications**.
    1. Click **Browse App Catalog**.
    1. Search the catalog for one of the following app integrations:
        - `SCIM 2.0 with Entitlements Management (Basic Auth)`
        - `SCIM 2.0 with Entitlements Management (Header Auth)`
        - `SCIM 2.0 with Entitlements Management (OAuth Header Auth)`
    1.  Select the integration with the appropriate authentication type for your app and click **Add Integration**.
    1. Complete the required configuration steps for the integration and then click **Next**.
    {style="list-style-type:lower-alpha"}
1. Ensure that your SCIM 2.0 server exposes the following endpoints:
    - `/ServiceProviderConfig`
    - `/ResourceTypes`
    - `/Schemas`
1. Configure the app in Okta (see Product doc (tbd))

### Endpoints for user schema discovery

#### /ServiceProviderConfig
Okta calls `/ServiceProviderConfig` to understand your server's configuration, including provisioning capabilities, authentication, and so on.

#### /ResourceTypes

Okta calls this endpoint to gather a list of available resources with any associated schemas and schema extension urns. 

Possible resource types include the following:
- Users
- Groups
- Entitlements
- Roles

Currently, Okta doesn't offer any custom handling for Groups. 

To expose Entitlements and Roles, you must create corresponding `ResourceType`s for these entities. See [ResourceTypes](#resourcetype) section for examples.

#### /Schemas



- Call out the gotchas with each endpoint (what happens when you enable Governance, then Provisioning)
- Endpoint must be associated with the endpoint for your schema
- You may not have a schema but if you have custom extensions you must put them here

This combination of endpoints enables user schema discovery. Okta combines the gathered information to takes this information and creates the required structures to support 

devs need to create a scim server with /ServiceProviderConfig, /ResourceTypes, /Schemas, and then Okta calls those endpoints to discover what functionality the app has, such as any additional available endpoints (/Users, /Groups, /Roles, etc...)
Okta requires that apps provide `/ResourceTypes` and `/Schemas` endpoints

- You can do dynamic schemas with the user operations
    - Probably don't have to explain user ops too much since described earlier
    - Nothing to do for groups, since not supported


#### Example user discovery data

The following sections provide sample structures in JSON format for ResourceTypes, schemas, custom entitlements with extensions, and a User that contains entitlements and roles.

### ResourceType

- id - value behind the scenes in Okta
- name - appears on the Governance tab
- endpoint - Okta gathers entitlements from this endpoint
- description - doesn't show up currently but should
- schema - highly important and gotcha-based; must conform to Okta's Role/Entitlement urn (add a list):
    - Role: "urn:okta:scim:schemas:core:1.0:Role"
    - Entitlement: "urn:okta:scim:schemas:core:1.0:Entitlement"
- Schema extensions - List any extensions required for addtional properties. Generally, Entitlements and Roles don't need to have extensions, while it's common for Users to have highly customized extensions. For example, a User might have a schema extension to store a custom attribute for a particular app. 


~~~
// <base>/scim/v2/ResourceTypes   
   // Sample Role resource
[
  {
    "schemas": [
      "urn:ietf:params:scim:schemas:core:2.0:ResourceType"
    ],
    "id": "Role",
    "name": "Role",
    "endpoint": "/Roles",
    "description": "Role",
    "schema": "urn:okta:scim:schemas:core:1.0:Role",
    "schemaExtensions": [
      {
        "schema": "urn:isvname:scim:schemas:extension:appname:1.0:Role",
        "resourceType": "ResourceType"
      }
    ],
    "meta": {
      "location": "https://example.com/v2/ResourceTypes/Role",
      "resourceType": "ResourceType"
    }
  }
]

// Sample (Generic/Singular) Entitlement resource
{
  "schemas": [
    "urn:ietf:params:scim:schemas:core:2.0:ResourceType"
  ],
  "id": "Entitlement",
  "name": "Entitlement",
  "description": "Entitlement resource",
  "endpoint": "/Entitlements",
  "schema": "urn:okta:scim:schemas:core:1.0:Entitlement",
  "meta": {
    "location": "https://example.com/v2/ResourceTypes/Entitlement",
    "resourceType": "ResourceType"
  }
}

// Sample (Specific or with Extensions) "Profile" type of Entitlement resource
{
  "schemas": [
    "urn:ietf:params:scim:schemas:core:2.0:ResourceType"
  ],
  "id": "Profile",
  "name": "Profile",
  "endpoint": "/Profiles",
  "description": "Profile",
  "schema": "urn:okta:scim:schemas:core:1.0:Entitlement",
  "schemaExtensions": [
    {
      "schema": "urn:isvname:scim:schemas:extension:appname:1.0:Profile",
      "required": true
    }
  ],
  "meta": {
    "location": "https://example.com/v2/ResourceTypes/Profile",
    "resourceType": "ResourceType"
  }
}
~~~

### Schemas

~~~
// <base>/scim/v2/Schemas/urn:isvname:scim:schemas:extension:appname:1.0:License  
  // Sample schema for an Entitlement property schemaExtension
{
  "id": "urn:isvname:scim:schemas:extension:appname:1.0:Profile",
  "name": "Profile",
  "description": "An example of a Profile Entitlement schema extension",
  "attributes": [
    {
      "name": "customProfileProperty",
      "type": "string",
      "multiValued": false,
      "description": "A Profile Entitlement extension field",
      "required": false,
      "caseExact": false,
      "mutability": "readWrite",
      "returned": "default",
      "uniqueness": "none"
    }
  ],
  "meta": {
    "resourceType": "Schema",
    "location": "/v2/Schemas/urn:isvname:scim:schemas:extension:appname:1.0:Profile"
  }
} 
    
// <base>/scim/v2/Schemas/urn:isvname:scim:schemas:extension:appname:1.0:RoleExample
// Sample schema for a Role property
{
  "id": "urn:isvname:scim:schemas:extension:appname:1.0:RoleExample",
  "name": "RoleExample",
  "description": "An example of a Role schemaExtension",
  "attributes": [
    {
      "name": "customRoleProperty",
      "type": "string",
      "multiValued": false,
      "description": "A custom Role field",
      "required": false,
      "caseExact": false,
      "mutability": "readWrite",
      "returned": "default",
      "uniqueness": "none"
    }
  ],
  "meta": {
    "resourceType": "Schema",
    "location": "/v2/Schemas/urn:isvname:scim:schemas:extension:appname:1.0:RoleExample"
  }
}
~~~

### Custom Entitlement with extensions

~~~
// Sample representation of hypothetical /Entitlements
  // License
[
  {
    "schemas": [
      "urn:okta:scim:schemas:core:1.0:Entitlement",
      "urn:<isvname>:scim:schemas:extension:<appname>:1.0:License"
    ],
    "type": "License",
    "id": "license-123",
    "displayName": "Basic",
    "urn:<isvname>:scim:schemas:extension:<appname>:1.0:License": {
      "customEntitlementProperty": "value"
    }
  }
]
~~~

### User with entitlements and roles

~~~
{
  "schemas": [
    "urn:ietf:params:scim:schemas:core:2.0:User",
    "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"
  ],
  "id": "2819c223-7f76-453a-919d-413861904646",
  "externalId": 701984,
  "userName": "bjensen@example.com",
  "name": null,
  "formatted": "Ms. Barbara J Jensen, III",
  "familyName": "Jensen",
  "givenName": "Barbara",
  "middleName": "Jane",
  "honorificPrefix": "Ms.",
  "honorificSuffix": "III",
  "displayName": "Babs Jensen",
  "nickName": "Babs",
  "profileUrl": "https://login.example.com/bjensen",
  "emails": [
    {
      "value": "bjensen@example.com",
      "type": "work",
      "primary": true
    },
    {
      "value": "babs@jensen.org",
      "type": "home"
    }
  ],
  "addresses": [
    {
      "type": "work",
      "streetAddress": "100 Universal City Plaza",
      "locality": "Hollywood",
      "region": "CA",
      "postalCode": 91608,
      "country": "USA",
      "formatted": "100 Universal City Plaza\nHollywood, CA 91608 USA",
      "primary": true
    },
    {
      "type": "home",
      "streetAddress": "456 Hollywood Blvd",
      "locality": "Hollywood",
      "region": "CA",
      "postalCode": 91608,
      "country": "USA",
      "formatted": "456 Hollywood Blvd\nHollywood, CA 91608 USA"
    }
  ],
  "phoneNumbers": [
    {
      "value": "555-555-5555",
      "type": "work"
    },
    {
      "value": "555-555-4444",
      "type": "mobile"
    }
  ],
  "ims": [
    {
      "value": "someaimhandle",
      "type": "aim"
    }
  ],
  "photos": [
    {
      "value": "https://photos.example.com/profilephoto/72930000000Ccne/F",
      "type": "photo"
    },
    {
      "value": "https://photos.example.com/profilephoto/72930000000Ccne/T",
      "type": "thumbnail"
    }
  ],
  "userType": "Employee",
  "title": "Tour Guide",
  "preferredLanguage": "en-US",
  "locale": "en-US",
  "timezone": "America/Los_Angeles",
  "active": true,
  "password": "t1meMa$heen",
  "groups": [
    {
      "value": "e9e30dba-f08f-4109-8486-d5c6a331660a",
      "$ref": "https://example.com/v2/Groups/e9e30dba-f08f-4109-8486-d5c6a331660a",
      "display": "Tour Guides"
    },
    {
      "value": "fc348aa8-3835-40eb-a20b-c726e15c55b5",
      "$ref": "https://example.com/v2/Groups/fc348aa8-3835-40eb-a20b-c726e15c55b5",
      "display": "Employees"
    },
    {
      "value": "71ddacd2-a8e7-49b8-a5db-ae50d0a5bfd7",
      "$ref": "https://example.com/v2/Groups/71ddacd2-a8e7-49b8-a5db-ae50d0a5bfd7",
      "display": "US Employees"
    }
  ],
  "entitlements": [
    {
      "value": "entitlement123",
      "display": "First Entitlement",
      "type": "License"
    },
    {
      "value": "profile123",
      "display": "First Profile",
      "type": "Profile"
    }
  ],
  "roles": [
    {
      "value": "role123",
      "display": "First Role"
    }
  ],
  "x509Certificates": [
    {
      "value": "certvalue"
    }
  ],
  "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User": {
    "employeeNumber": 701984,
    "costCenter": 4130,
    "organization": "Universal Studios",
    "division": "Theme Park",
    "department": "Tour Operations",
    "manager": {
      "value": "26118915-6090-4610-87e4-49d8ca9f808d",
      "$ref": "../Users/26118915-6090-4610-87e4-49d8ca9f808d",
      "displayName": "John Smith"
    }
  },
  "meta": {
    "resourceType": "User",
    "created": "2010-01-23T04:56:22Z",
    "lastModified": "2011-05-13T04:42:34Z",
    "version": "W/\"a330bc54f0671c9\"",
    "location": "https://example.com/v2/Users/2819c223-7f76-453a-919d-413861904646"
  }
}
~~~

### Create Users

New Template Apps for Entitlements imports
User Schema Discovery:  Why?
We need to enable schema disco in order to understand entitlements
This changes the Profile Editor UI so that you cannot add custom AppUser profile fields
Thus: introducing dynamic user schema in addition to entitlement schema
"When you use OIG + SCIM to handle third party entitlement discovery and assignment, Okta will require a new SCIM App Template: <name>.  This template implements User Schema Discovery by default in order to discover these attributes; therefore, custom profile attributes may not be added and must be implemented and discovered via custom User Schema and User operation management on the SCIM server."
Dynamic Schema Discovery additions
Flow: Reach out to ResourceTypes
Compare ResourceTypes to Schema endpoints and flatten
Use any endpoints listed in ResourceTypes to get entitlement values and external IDs
Populate the Governance UI accordingly

### Required endpoints

Endpoints:
ResourceTypes ** [from SI page]
Schemas
Entities
Entitlement operations
Get Metadata
Get Objects
Get User Entitlements


---- stuff that I cut ----

You can handle third-party entitlement discovery and assignment by using [Okta Identity Governance](https://help.okta.com/en-us/content/topics/identity-governance/iga.htm) with SCIM. [Create an app integration](https://help.okta.com/en-us/content/topics/apps/apps-add-applications.htm) (replace < with alias) using the SCIM 2.0 with OIG app integration (Name TBD). 

To support user schema discovery, Okta relies upon a SCIM 2.0 server that has the following endpoints:
- `/ServiceProviderConfig`: Provides provisioning capabilities, authentication, and so on
- `/ResourceTypes`: Lists resource types and available schemas
- `/Schemas`: Provides metadata about available resource types
- 
- In particular, user schema discovery allows Okta to support dynamic data from SCIM-enabled apps. The discovery process includes importing users from an app integration into Okta and parsing the imported objects. 
- 
- 
- Depending on your implementation, your server may expose the following endpoints:
- `/Users`
- `/Groups`
- `/Roles`
- `/Entitlements`
- `./Search` (from root or from within a resource)
- `/Me`
- Endpoints for custom `resourceType`s (for example, `/Profile`, `/License`, and so on)
