---
title: SCIM 1.1 Protocol Reference
meta:
  - name: description
    content: Your SCIM API must support specific SCIM 1.1 API endpoints to work with Okta. Those endpoints and their explanations are detailed here.
---

# Okta and SCIM Version 1.1

This reference focuses on how Okta API endpoints share information with System for Cross-domain Identity Management (SCIM) specific API calls.

This document specifically covers **Version 1.1** of the SCIM specification. For Version 2.0 of the SCIM specification, see our [SCIM 2.0 reference](/docs/reference/scim/scim-20/).

The SCIM protocol is an application-level REST protocol for provisioning and managing identity data on the web. The protocol supports creation, discovery, retrieval, and modification of core identity resources.

To better understand SCIM and the specific implementation of SCIM using Okta, see our [Understanding SCIM](/docs/concepts/scim/) guide or our blog post on [What is SCIM?](https://www.okta.com/blog/2017/01/what-is-scim/).

## SCIM User operations

### Create Users

![Flowchart - create User](/img/oin/scim_flow-user-create.png "Simple flow diagram for create User process")

The User creation operation brings the user's application profile from Okta over to the Service Provider as a User object. A user's application profile represents the key-value attributes defined on the **Profile** tab when a User object is added.

To enable user provisioning, you must configure the provisioning options in the Okta Admin Console. In the Okta Admin Console:

1. Select your SCIM integration from the list of integrations in your Okta org.
1. Under the **Provisioning** tab, click **To App** and **Edit**.
1. In the **Create User** option, click **Enable** and then **Save**.

For more information on enabling the provisioning features of your SCIM integration, see [Provisioning and Deprovisioning](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Provisioning_Deprovisioning_Overview) under the **Accessing Provisioning Features** section.

After saving the configuration, Okta makes two requests to your SCIM server:

```http
GET /scim/v1/Users?startIndex=1&count=2 HTTP/1.1
User-Agent: Okta SCIM Client 1.0.0
Authorization: <Authorization credentials>
```

and

```http
GET /scim/v1/Groups?startIndex=1&count=100 HTTP/1.1
User-Agent: Okta SCIM Client 1.0.0
Authorization: <Authorization credentials>
```

> **Note:** The query parameters that Okta sends at this point are always constant.

After you complete this step, whenever a user is assigned to the integration in Okta, the following requests are made against the SCIM server:

* Determine if the User object already exists
* Create the User object if it isn't found

#### Determine if the User already exists

**GET** /Users

Okta checks that the User object exists on the SCIM server through a GET method request with the `filter=userName` parameter (or any other filter parameter that was configured with the SCIM integration). This check is performed using the `eq` (equal) operator and is the only one necessary to successfully provision users with Okta.

> **Note:** The filter must check an attribute that is _unique_ for all Users in the Service Provider profiles.

For Okta Integration Network (OIN) integrations, this filter is configured with the help of the assigned Okta App Analyst during the submission process. Integration submissions are handled through the [OIN Manager](https://oinmanager.okta.com).

The requests from Okta to the Service Provider are of the form:

```http
GET /scim/v1/Users?filter=userName%20eq%20%22test.user%40okta.local%22&startIndex=1&count=100 HTTP/1.1
User-Agent: Okta SCIM Client 1.0.0
Authorization: <Authorization credentials>
```

The SCIM application checks the filter provided and returns an empty response if no Users match the filter criteria. For example:

```http
HTTP/1.1 200 OK
Date: Fri, 18 Oct 2019 06:39:03 GMT
Content-Type: application/json

{
    "schemas": ["urn:scim:schemas:core:1.0"],
    "totalResults": 0,
    "startIndex": 1,
    "itemsPerPage": 0,
    "Resources": []
}
```

If the SCIM server does return a User object, Okta automatically matches the result with the user in Okta, sending the user's application profile to the SCIM server.

**PUT** /Users/*$userID*

```http
PUT /scim/v1/Users/e155dc98-aeee-4f58-b683-12b93dbc86b3 HTTP/1.1
User-Agent: Okta SCIM Client 1.0.0
Authorization: <Authorization credentials>

{
    "schemas": ["urn:scim:schemas:core:1.0"],
    "id": "e155dc98-aeee-4f58-b683-12b93dbc86b3",
    "userName": "test.user@okta.local",
    "externalId": "00b443dd40SOK2eup0h7",
    "name": {
        "givenName": "Test",
        "familyName": "User"
    },
    "displayName": "Test User",
    "locale": "en_US",
    "active": true,
    "emails": [{
        "primary": true,
        "value": "test.user@okta.local",
        "type": "work"
    }],
    "groups": []
}
```

#### Create the User

**POST** /Users

If the User object isn't found on the SCIM server, then Okta attempts to create it through a POST method request that contains the user's application profile. The request looks like the following:

```http
POST /scim/v1/Users HTTP/1.1
User-Agent: Okta SCIM Client 1.0.0
Authorization: <Authorization credentials>

{
    "schemas": ["urn:scim:schemas:core:1.0"],
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
    "locale": "en_US",
    "externalId": "00b443dd40SOK2eup0h7",
    "groups": [],
    "password": "1mz050nq",
    "active": true
}
```

The response from the SCIM server contains the created User object:

```http
HTTP/1.1 201 Created
Date: Fri, 18 Oct 2019 06:39:04 GMT
Content-Type: application/json

{
    "schemas": ["urn:scim:schemas:core:1.0"],
    "id": "e155dc98-aeee-4f58-b683-12b93dbc86b3",
    "userName": "test.user@okta.local",
    "externalId": "00b443dd40SOK2eup0h7",
    "name": {
        "givenName": "Test",
        "familyName": "User"
    },
    "displayName": "Test User",
    "locale": "en_US",
    "active": true,
    "emails": [{
        "primary": true,
        "value": "test.user@okta.local",
        "type": "work"
    }],
    "groups": [],
    "meta": {
        "created": "2019-10-18T06:39:04+00:00",
        "lastModified": "2019-10-18T06:39:04+00:00",
        "version": "fe2a80129b16ff934d485c3c9c45892f"
    }
}
```

There is another scenario if your SCIM server has custom attributes that you want to add for any new user. Any custom attributes defined in your application schema for user profiles are applied to the user's application profile when the user is created. The request to the SCIM server looks like the following:

```http
POST /scim/v1/Users HTTP/1.1
User-Agent: Okta SCIM Client 1.0.0
Authorization: <Authorization credentials>

{
    "schemas": ["urn:scim:schemas:core:1.0"],
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
    "schemas": ["urn:scim:schemas:core:1.0"],
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
Date: Fri, 18 Oct 2019 06:50:25 GMT
Content-Type: application/json

{
    "Errors": [{
        "description": "User already exists in the database.",
        "code": 409
    }]
}
```

### Retrieve Users

**GET** /Users

When importing User objects from the SCIM server, Okta accesses the `/Users` endpoint and processes them page by page, using `startIndex`, `count`, and `totalResults` as pagination references. Similarly, when returning large lists of resources, your SCIM implementation must support pagination. Using a limit of `count` results and an offset of `startIndex` returns smaller groupings of resources in a request.

> **Note:** The `itemsPerPage`, `startIndex`, and `totalResults` values need to be exchanged as integers, not as strings.

Okta uses `count=100` as the pagination reference to return up to 100 elements. If the value of `totalResults` is higher than 100, then after Okta finishes retrieving the first 100 resources, the `startIndex` becomes `startIndex+100` and is passed as a query parameter along with `count` in a new request to the `/Users` endpoint. This pagination operation repeats until all pages are viewed.

The SCIM server must consistently return the same ordering of results for the requests, regardless of which values are provided for the `count` and `startIndex` pagination references. For more information on pagination, see [Section 3.2.2.3](http://www.simplecloud.info/specs/draft-scim-api-01.html#query-resources) of the V1.1 specification.

A sample request from Okta to retrieve the Users from the SCIM application:

```http
GET /scim/v1/Users?startIndex=1&count=100 HTTP/1.1
User-Agent: Okta SCIM Client 1.0.0
Authorization: <Authorization credentials>
```

The response to this request is a JSON list of all the resources found in the SCIM application.

### Retrieve a specific User

**GET** /Users/*$userID*

Okta can also run a GET method request to check if a specific User object still exists on the SCIM server. The request looks like the following:

```http
GET /scim/v1/Users/48e0a2da-0999-4f2c-87f4-80432cfe6617 HTTP/1.1
User-Agent: Okta SCIM Client 1.0.0
Authorization: <Authorization credentials>
```

The response from the server is the User object:

```http
HTTP/1.1 200 OK
Date: Fri, 18 Oct 2019 06:54:35 GMT
Content-Type: text/json;charset=UTF-8

{
    "schemas": ["urn:scim:schemas:core:1.0"],
    "id": "48e0a2da-0999-4f2c-87f4-80432cfe6617",
    "userName": "test.user@okta.local",
    "externalId": "00b443dd40SOK2eup0h7",
    "name": {
        "givenName": "Test",
        "familyName": "User"
    },
    "displayName": "Test User",
    "locale": "en_US",
    "active": true,
    "emails": [{
        "primary": true,
        "value": "test.user@okta.local",
        "type": "work"
    }],
    "groups": [],
    "meta": {
        "created": "2019-10-18T06:50:23+00:00",
        "lastModified": "2019-10-18T06:50:23+00:00",
        "version": "6d8ef4c9b0ae96fae6623e549f820a60"
    }
}
```

### Update a specific User (PUT)

![Flowchart - update User (PUT)](/img/oin/scim_flow-user-update-put.png "Simple flow diagram for updating a User with a PUT method request")

Updating a User object refers to modifying an attribute in the Okta user's application profile that is mapped to an attribute in the SCIM application.

To update a User object, you need to enable the functionality in the Okta Admin Console:

1. Select your SCIM integration from the list of integrations in your Okta org.
1. Under the **Provisioning** tab, click **To App**.
1. In the **Update User Attributes** option, click **Enable** and then **Save**.

#### Retrieve the User

**GET** /Users/*$userID*

To update a user, Okta first makes a GET method request to `/Users/${userID}` and retrieves the body of the User object:

```http
GET /scim/v1/Users/48e0a2da-0999-4f2c-87f4-80432cfe6617 HTTP/1.1
User-Agent: Okta SCIM Client 1.0.0
Authorization: <Authorization credentials>
```

When the SCIM server receives this request, it responds with the User object:

```http
HTTP/1.1 200 OK
Date: Fri, 18 Oct 2019 06:56:38 GMT
Content-Type: text/json;charset=UTF-8

{
    "schemas": ["urn:scim:schemas:core:1.0"],
    "id": "48e0a2da-0999-4f2c-87f4-80432cfe6617",
    "userName": "test.user@okta.local",
    "externalId": "00b443dd40SOK2eup0h7",
    "name": {
        "givenName": "Test",
        "familyName": "User"
    },
    "displayName": "Test User",
    "locale": "en_US",
    "active": true,
    "emails": [{
        "primary": true,
        "value": "test.user@okta.local",
        "type": "work"
    }],
    "groups": [],
    "meta": {
        "created": "2019-10-18T06:50:23+00:00",
        "lastModified": "2019-10-18T06:56:20+00:00",
        "version": "a7fc04c68e3f5551e29a448031d45425"
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
PUT /scim/v1/Users/48e0a2da-0999-4f2c-87f4-80432cfe6617 HTTP/1.1
User-Agent: Okta SCIM Client 1.0.0
Authorization: <Authorization credentials>

{
    "schemas": ["urn:scim:schemas:core:1.0"],
    "id": "48e0a2da-0999-4f2c-87f4-80432cfe6617",
    "userName": "test.user@okta.local",
    "externalId": "00b443dd40SOK2eup0h7",
    "name": {
        "givenName": "Test1",
        "familyName": "User"
    },
    "displayName": "Test1 User",
    "locale": "en_US",
    "active": true,
    "emails": [{
        "primary": true,
        "value": "test.user@okta.local",
        "type": "work"
    }],
    "meta": {
        "created": "2019-10-18T06:50:23+00:00",
        "lastModified": "2019-10-18T06:56:20+00:00",
        "version": "a7fc04c68e3f5551e29a448031d45425"
    },
    "groups": []
}
```

The response from the SCIM server needs to be the updated User object:

```http
HTTP/1.1 200 OK
Date: Fri, 18 Oct 2019 06:56:39 GMT
Content-Type: text/json;charset=UTF-8

{
    "schemas": ["urn:scim:schemas:core:1.0"],
    "id": "48e0a2da-0999-4f2c-87f4-80432cfe6617",
    "userName": "test.user@okta.local",
    "externalId": "00b443dd40SOK2eup0h7",
    "name": {
        "givenName": "Test1",
        "familyName": "User"
    },
    "displayName": "Test1 User",
    "locale": "en_US",
    "active": true,
    "emails": [{
        "primary": true,
        "value": "test.user@okta.local",
        "type": "work"
    }],
    "groups": [],
    "meta": {
        "created": "2019-10-18T06:50:23+00:00",
        "lastModified": "2019-10-18T06:56:39+00:00",
        "version": "7c9d14512d03434910940e5574f6f8f0"
    }
}
```

### Update a specific User (PATCH)

![Flowchart - update User (PATCH)](/img/oin/scim_flow-user-update-patch.png "Simple flow diagram for updating a User with a PATCH method request")

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
PATCH /scim/v1/Users/48e0a2da-0999-4f2c-87f4-80432cfe6617 HTTP/1.1
User-Agent: Okta SCIM Client 1.0.0
Authorization: <Authorization credentials>

{
    "schemas": ["urn:scim:schemas:core:1.0"],
    "id": "48e0a2da-0999-4f2c-87f4-80432cfe6617",
    "active": false
}
```

The response from the SCIM server needs to be the updated User object:

```http
HTTP/1.1 200 OK
Date: Fri, 18 Oct 2019 07:00:47 GMT
Content-Type: text/json;charset=UTF-8

{
    "schemas": ["urn:scim:schemas:core:1.0"],
    "id": "48e0a2da-0999-4f2c-87f4-80432cfe6617",
    "userName": "test.user@okta.local",
    "externalId": "00b443dd40SOK2eup0h7",
    "name": {
        "givenName": "Test1",
        "familyName": "User"
    },
    "displayName": "Test1 User",
    "locale": "en_US",
    "active": false,
    "emails": [{
        "primary": true,
        "value": "test.user@okta.local",
        "type": "work"
    }],
    "groups": [],
    "meta": {
        "created": "2019-10-18T06:50:23+00:00",
        "lastModified": "2019-10-18T07:00:47+00:00",
        "version": "6feac5cd8e2e3a617037e2543e3e83d0"
    }
}
```

> **Note:** The SCIM server response to PATCH method requests can also be a HTTP 204 response, with no body returned.

### Delete Users

![Flowchart - deprovision User](/img/oin/scim_flow-user-deprovision.png "Simple flow diagram for deprovisioning a User")

**DELETE** /Users/*$userID*

Okta doesn't perform DELETE operations on User objects in your SCIM application.

If a user is suspended, deactivated, or removed from your integration inside Okta, then Okta sends a request to your SCIM application to set the `active` attribute to `false`.

* For all new OIN app integrations, this request to update a User object is sent through a PATCH method request.
* For any custom app integrations created using the AIW, this request is sent through a PUT method request.

For a detailed explanation on deleting users, see [Delete (Deprovision)](/docs/concepts/scim/#delete-deprovision).

## SCIM Group operations

### Create Groups

**POST** /Groups

To create a Group object on the SCIM server, you need to push the Okta group using the Okta Admin Console:

1. Select your SCIM integration from the list of integrations in your Okta org.
1. On the **Push Groups** tab, click **Push Groups**.

You can select which existing Okta group to push, either by specifying a name or a rule. For more information, see the [Using Group Push topic](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Directory_Using_Group_Push) in the Okta Help Center.

After the group is selected, Okta makes a POST method request to the Service Provider:

```http
POST /scim/v1/Groups HTTP/1.1
User-Agent: Okta SCIM Client 1.0.0
Authorization: <Authorization credentials>

{
    "schemas": ["urn:scim:schemas:core:1.0"],
    "displayName": "Test SCIMv1"
}
```

When it receives this request, the SCIM server responds with the Group object as it would for a GET method request to the `/Groups/${groupID}/`:

```http
HTTP/1.1 201 Created
Date: Fri, 18 Oct 2019 07:02:44 GMT
Content-Type: text/json;charset=UTF-8

{
    "schemas": ["urn:scim:schemas:core:1.0"],
    "id": "74094a55-c9ee-47ae-9fd4-9137deb43497",
    "displayName": "Test SCIMv1",
    "members": [],
    "meta": {
        "created": "2019-10-18T07:02:44+00:00",
        "lastModified": "2019-10-18T07:02:44+00:00",
        "version": "12ba4e7e158aa0b78d78c7e9ae15d917"
    }
}
```

> **Note:** If the group has a description, it is sent automatically to the SCIM server:

```http
{
"schemas": ["urn:scim:schemas:core:1.0", "urn:okta:custom:group:1.0"],
    "displayName": "Group 10",
    "urn:okta:custom:group:1.0": {
        "description": "All Users West of the Rockies"
    }
}
```

The SCIM server isn't required to save and return the description. However, there is no option to prevent the description from being sent.

### Retrieve Groups

**GET** /Groups

When importing Group objects from the SCIM server, Okta accesses the `/Groups` endpoint and processes them page by page, using the `startIndex`, `count`, and `totalResults` values for reference. Similarly, when returning large lists of resources, your SCIM implementation must support pagination. Using a limit of `count` results and an offset of `startIndex` returns smaller groupings of resources in a request.

> **Note:** The `itemsPerPage`, `startIndex`, and `totalResults` values need to be exchanged as integers, not as strings.

Okta uses `count=100` as the pagination reference to return up to 100 elements. If the value of `totalResults` is higher than 100, then after Okta finishes retrieving the first 100 resources, the `startIndex` becomes `startIndex+100` and is passed as a query parameter along with `count` in a new request to the `/Groups` endpoint. This pagination operation repeats until all pages are viewed.

The SCIM server must consistently return the same ordering of results for the requests, regardless of which values are provided for the `count` and `startIndex` pagination references.

A sample request from Okta to retrieve the Group objects from the SCIM application:

```http
GET /scim/v1/Groups?startIndex=1&count=100 HTTP/1.1
User-Agent: Okta SCIM Client 1.0.0
Authorization: <Authorization credentials>
```

The response to this request is a JSON list of all the Group objects found in the SCIM application.

### Retrieve specific Groups

**GET** /Groups/*$groupID*

There are situations where Okta needs to run a GET method request on a specific `${groupID}`, for example to see if the Group object still exists on the SCIM server. The request looks like the following:

```http
GET /scim/v1/Groups/74094a55-c9ee-47ae-9fd4-9137deb43497 HTTP/1.1
User-Agent: Okta SCIM Client 1.0.0
Authorization: <Authorization credentials>
```

The response from the server is the Group object details:

```http
HTTP/1.1 200 OK
Date: Fri, 18 Oct 2019 07:08:51 GMT
Content-Type: text/json;charset=UTF-8

{
    "schemas": ["urn:scim:schemas:core:1.0"],
    "id": "74094a55-c9ee-47ae-9fd4-9137deb43497",
    "displayName": "Test SCIMv1",
    "members": [],
    "meta": {
        "created": "2019-10-18T07:02:44+00:00",
        "lastModified": "2019-10-18T07:02:44+00:00",
        "version": "12ba4e7e158aa0b78d78c7e9ae15d917"
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
PATCH /scim/v1/Groups/74094a55-c9ee-47ae-9fd4-9137deb43497 HTTP/1.1
User-Agent: Okta SCIM Client 1.0.0
Authorization: <Authorization credentials>

{
    "schemas": ["urn:scim:schemas:core:1.0"],
    "id": "74094a55-c9ee-47ae-9fd4-9137deb43497",
    "displayName": "Test SCIMv11"
}
```

The group name update operation is triggered each time there is a group membership update operation.

The SCIM server response is to return the updated Group object:

```http
HTTP/1.1 200 OK
Date: Fri, 18 Oct 2019 07:11:00 GMT
Content-Type: text/json;charset=UTF-8

{
    "schemas": ["urn:scim:schemas:core:1.0"],
    "id": "74094a55-c9ee-47ae-9fd4-9137deb43497",
    "displayName": "Test SCIMv11",
    "members": [],
    "meta": {
        "created": "2019-10-18T07:02:44+00:00",
        "lastModified": "2019-10-18T07:11:00+00:00",
        "version": "3a0c8354ccfcaab56019859469078a0b"
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

* For all new OIN app integrations, this request to update a Group object is sent through a PATCH method request.
* For custom app integrations created using the AIW, this request to update a Group object is sent through a PUT request.

```http
PATCH /scim/v1/Groups/74094a55-c9ee-47ae-9fd4-9137deb43497 HTTP/1.1
User-Agent: Okta SCIM Client 1.0.0
Authorization: <Authorization credentials>

{
    "schemas": ["urn:scim:schemas:core:1.0"],
    "members": [{
        "value": "48e0a2da-0999-4f2c-87f4-80432cfe6617",
        "display": "test.user@okta.local"
    }]
}
```

The SCIM server response is to return the updated Group object:

```http
HTTP/1.1 200 OK
Date: Fri, 18 Oct 2019 07:11:01 GMT
Content-Type: text/json;charset=UTF-8

{
    "schemas": ["urn:scim:schemas:core:1.0"],
    "id": "74094a55-c9ee-47ae-9fd4-9137deb43497",
    "displayName": "Test SCIMv11",
    "members": [{
        "value": "48e0a2da-0999-4f2c-87f4-80432cfe6617",
        "display": "test.user@okta.local"
    }],
    "meta": {
        "created": "2019-10-18T07:02:44+00:00",
        "lastModified": "2019-10-18T07:11:01+00:00",
        "version": "cca3a6ab18596cc450377eddcc4b5a58"
    }
}
```

When a user is removed from the group, Okta sends the `members` array, specifying the `${userID}` along with an `operations` element that has the value `delete`.

```http
PATCH /scim/v1/Groups/74094a55-c9ee-47ae-9fd4-9137deb43497 HTTP/1.1
User-Agent: Okta SCIM Client 1.0.0
Authorization: <Authorization credentials>

{
    "schemas": [
        "urn:scim:schemas:core:1.0"
    ],
    "members": [
        {
            "value": "b4327d81-fc79-47ad-a7ff-182d9e103291",
            "display": "test.user2@okta.local",
            "operation": "delete"
        }
    ]
}
```

The SCIM server response is to return the updated Group object:

```http
HTTP/1.1 200 OK
Date: Fri, 18 Oct 2019 07:11:01 GMT
Content-Type: text/json;charset=UTF-8

{
    "schemas": ["urn:scim:schemas:core:1.0"],
    "id": "74094a55-c9ee-47ae-9fd4-9137deb43497",
    "displayName": "Test SCIMv11",
    "members": [{
        "value": "48e0a2da-0999-4f2c-87f4-80432cfe6617",
        "display": "test.user@okta.local"
    }],
    "meta": {
        "created": "2019-10-18T07:02:44+00:00",
        "lastModified": "2019-10-18T07:11:01+00:00",
        "version": "cca3a6ab18596cc450377eddcc4b5a58"
    }
}
```

> **Note:** The SCIM server response to PATCH method requests can also be a HTTP 204 response, with no body returned.

### Delete a specific Group

**DELETE** /Groups/*$groupID*

Okta administrators can remove pushed groups from the Okta Admin Console, under the **Push Groups** tab of the SCIM integration.

On the **Push Groups** tab, click **Active** then click **Unlink pushed group**. In the dialog box that appears, you can choose whether you want to **Delete the group in the target app** or **Leave the group in the target app** on the SCIM server.

When you select the **Delete the group in the target app** option and click **Unlink**, Okta sends a DELETE method request:

```http
DELETE /scim/v1/Groups/74094a55-c9ee-47ae-9fd4-9137deb43497 HTTP/1.1
User-Agent: Okta SCIM Client 1.0.0
Authorization: <Authorization credentials>
```

The SCIM server can return an empty response:

```http
HTTP/1.1 204 No Content
Date: Fri, 18 Oct 2019 07:16:10 GMT
```

### Additional references

* [What is SCIM?](https://www.okta.com/blog/2017/01/what-is-scim/)
* [SCIM Provisioning using Okta Lifecycle Management](/docs/concepts/scim/)
* [Build a SCIM provisioning integration](/docs/guides/build-provisioning-integration/)
* [SCIM 1.1 RFC: Core Schema](http://www.simplecloud.info/specs/draft-scim-core-schema-01.html)
* [SCIM 1.1 RFC: Protocol](http://www.simplecloud.info/specs/draft-scim-api-01.html)
