---
title: SCIM 2.0 Protocol Reference
icon: /assets/img/icons/scim.svg
meta:
  - name: description
    content: Your SCIM API must support specific SCIM 2.0 API endpoints to work with Okta. Those endpoints and their explanations are detailed here.
---

# Okta and SCIM V2.0

This reference focuses on how Okta API endpoints share information with System for Cross-domain Identity Management (SCIM) specific API calls.

This document specifically covers **Version 2.0** of the SCIM specification. For Version 1.1 of the SCIM specification, see our [SCIM 1.1 reference](/docs/reference/scim/scim-11/).

The SCIM Protocol is an application-level REST protocol for provisioning and managing identity data on the web. The protocol supports creation, discovery, retrieval, and modification of core identity resources.

To better understand SCIM and the specific implementation of SCIM using Okta, see our [Understanding SCIM](/docs/concepts/scim/) guide or our blog post on [What is SCIM?](https://www.okta.com/blog/2017/01/what-is-scim/).

>**Note:** Okta implements SCIM 2.0 as specified in the RFC documents from the Internet Engineering Task Force:
>
>* [Definitions, Overview, Concepts, and Requirements: RFC 7642](https://tools.ietf.org/html/rfc7642)
>* [Core Schema: RFC 7643](https://tools.ietf.org/html/rfc7643)
>* [Protocol: RFC 7644](https://tools.ietf.org/html/rfc7644)

## SCIM User operations

### Creating users

![Flowchart - create user](/img/oin/scim_flow-user-create.png "Simple flow diagram for create user process")

The User creation operation brings the user's application profile from Okta over to the Service Provider. A user's application profile represents the key-value attributes defined on the **Profile** tab when a user is added.

To enable user provisioning, you must configure the provisioning options in the Okta Admin Console. In the Okta Admin Console:

1. Select your SCIM application from your list of applications.
1. Under the **Provisioning** tab, click **To App** and **Edit**.
1. In the **Create User** option, click **Enable** and then **Save**.

For more information on enabling the provisioning features of your SCIM application, see [Provisioning and Deprovisioning](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Provisioning_Deprovisioning_Overview) under the **Accessing Provisioning Features** section.

After you complete this step, whenever a user is assigned to the application in Okta, the following operation requests are made against the SCIM server:

* Determine if the user already exists
* Create the user if the user isn't found

#### Determine if the user already exists

**GET** /Users

Okta checks that the user exists on the SCIM server through a GET operation with the `filter=userName` parameter (or any other filter parameter that was configured with the SCIM application). This check is performed using the `eq` (equal) operator and is the only one necessary to successfully provision users with Okta.

> **Note:** The filter must check an attribute that is _unique_ for all users in the Service Provider profiles.

For Okta Integration Network (OIN) applications, this filter is configured during the review process done by the Okta Application Analyst assigned to evaluate the application submission. Application submissions are processed through the [OIN Manager](https://oinmanager.okta.com).

The requests from Okta to the Service Provider are of the form:

```http
GET /scim/v2/Users?filter=userName%20eq%20%22test.user%40okta.local%22&startIndex=1&count=100 HTTP/1.1
User-Agent: Okta SCIM Client 1.0.0
Authorization: <Authorization credentials>
```

The SCIM application checks the filter provided and returns an empty response if no users match the filter criteria. For example:

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

Another acceptable response from the SCIM application if no users match the filter criteria is to return the error schema response:

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

If the SCIM server does return a user, Okta automatically matches the result with the user in Okta, sending the user application profile to the SCIM server.

#### Create the user

**POST** /Users

If the user isn't found on the SCIM server, then Okta attempts to create it through a POST operation that contains the user application profile. The request looks like the following:

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

The response from the SCIM server contains the created user profile:

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

If the SCIM server returns an empty response body to the provisioning request, then Okta marks the operation as invalid, and the Okta Admin Console displays an error:

"Automatic provisioning of user `userName` to app `AppName` failed: Error while creating user `displayName`: Create new user returned empty user."

If the user that Okta tries to create already exists in the Service Provider application, then the Service Provider needs to respond with an error schema to stop the provisioning job. The response looks like the following:

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

### Retrieving users

**GET** /Users

When importing users from the SCIM server, Okta accesses the `/Users` endpoint and processes them page by page, using `startIndex`, `count`, and `totalResults` as pagination references. Similarly, when returning large lists of resources, your SCIM implementation must support pagination. Using a limit of `count` results and an offset of `startIndex` returns smaller groupings of resources in a request.

> **Note:** The `itemsPerPage`, `startIndex`, and `totalResults` values need to be exchanged as integers, not as strings.

Okta uses `count=100` as the pagination reference to return up to 100 elements. If the value of `totalResults` is higher than 100, then after Okta finishes retrieving the first 100 resources, the `startIndex` becomes `startIndex+100` and is passed as a query parameter along with `count` in a new request to the `/Users` endpoint. This pagination operation repeats until all pages are viewed.

The SCIM server must consistently return the same ordering of results for the requests, regardless of which values are provided for the `count` and `startIndex` pagination references. For more information on pagination, see [Section 3.4.2.4](https://tools.ietf.org/html/rfc7644#section-3.4.2.4) of the V2.0 specification.

A sample request from Okta to retrieve the users from the SCIM app:

```http
GET /scim/v2/Users?startIndex=1&count=100 HTTP/1.1
User-Agent: Okta SCIM Client 1.0.0
Authorization: <Authorization credentials>
```

The response to this request is a JSON listing of all the resources found in the SCIM app.

### Retrieving a specific user

**GET** /Users/*$userID*

Okta can also run a GET operation to check if a specific user still exists on the SCIM server. The request looks like the following:

```http
GET /scim/v2/Users/23a35c27-23d3-4c03-b4c5-6443c09e7173 HTTP/1.1
User-Agent: Okta SCIM Client 1.0.0
Authorization: <Authorization credentials>
```

The response from the server is the user profile:

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

### Updating a specific user (PUT)

![Flowchart - update user (PUT)](/img/oin/scim_flow-user-update-put.png "Simple flow diagram for updating a user with a PUT operation")

Updating a user refers to modifying an attribute in the Okta user profile that is mapped with an attribute in the SCIM application.

To update a user, you need to enable the functionality in the Okta Admin Console:

1. Select the SCIM application from your list of applications.
1. Under the **Provisioning** tab, click **To App**.
1. In the **Update User Attributes** option, click **Enable** and then **Save**.

#### Retrieve the user profile

**GET** /Users/*$userID*

To update a user profile, Okta first makes a GET request to `/Users/${userID}` and retrieves the body of the user's SCIM profile:

```http
GET /scim/v2/Users/23a35c27-23d3-4c03-b4c5-6443c09e7173 HTTP/1.1
User-Agent: Okta SCIM Client 1.0.0
Authorization: <Authorization credentials>
```

When the SCIM server receives this request, it responds with the user's SCIM profile:

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

#### Update the user profile

**PUT** /Users/*$userID*

After the user's profile is retrieved from the SCIM server, Okta modifies the attributes that were changed and runs a PUT request with the new body to the `/Users/${userID}` endpoint:

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

The response from the SCIM server needs to be the user's updated SCIM profile:

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

### Updating a specific user (PATCH)

![Flowchart - update user (PATCH)](/img/oin/scim_flow-user-update-patch.png "Simple flow diagram for updating a user with a PATCH operation")

**PATCH** /Users/*$userID*

A user resource can be updated through a PATCH operation for the following actions:

* Activating a user
* Deactivating a user
* Syncing the user password

The `active` attribute in a user profile represents the user's current status.  

Other updates to attributes in a user profile should be handled through a PUT operation.

To deactivate users, you need to enable the functionality in the Okta Admin Console:

1. Select your SCIM application from your list of applications.
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

The response from the SCIM server needs to be the user's updated SCIM profile:

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

> **Note:** The SCIM server response to PATCH operation requests can also be a HTTP 204 response, with no body returned.

### Deleting users

![Flowchart - delete user](/img/oin/scim_flow-user-deprovision.png "Simple flow diagram for deprovisioning a user")

**DELETE** /Users/*$userID*

Okta doesn't perform DELETE operations on users.

If a user is suspended, deactivated, or removed from the application in Okta, then Okta sends a PATCH request to set the `active` attribute to `false`.

## SCIM Group operations

### Creating groups

**POST** /Groups

To create a group on the SCIM server, you need to push the group using the Okta Admin Console:

1. Select the SCIM application from your list of applications.
1. On the **Push Groups** tab, click **Push Groups**.

You can select which existing Okta group to push, either by specifying a name or a rule. For more information, see the [Using Group Push topic](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Directory_Using_Group_Push) in the Okta Help Center.

After the group is selected, Okta makes a POST request to the Service Provider:

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

When it receives this request, the SCIM server responds with the group details as it would for a GET operation to the `/Groups/${groupID}/`:

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

### Retrieving groups

**GET** /Groups

When importing groups from the SCIM server, Okta accesses the `/Groups` endpoint and processes them page by page, using the `startIndex`, `count`, and `totalResults` values for reference. Similarly, when returning large lists of resources, your SCIM implementation must support pagination. Using a limit of `count` results and an offset of `startIndex` returns smaller groupings of resources in a request.

> **Note:** The `itemsPerPage`, `startIndex`, and `totalResults` values need to be exchanged as integers, not as strings.

Okta uses `count=100` as the pagination reference to return up to 100 elements. If the value of `totalResults` is higher than 100, then after Okta finishes retrieving the first 100 resources, the `startIndex` becomes `startIndex+100` and is passed as a query parameter along with `count` in a new request to the `/Groups` endpoint. This pagination operation repeats until all pages are viewed.

The SCIM server must consistently return the same ordering of results for the requests, regardless of which values are provided for the `count` and `startIndex` pagination references.

A sample request from Okta to retrieve the groups from the SCIM app:

```http
GET /scim/v2/Groups?startIndex=1&count=100 HTTP/1.1
User-Agent: Okta SCIM Client 1.0.0
Authorization: <Authorization credentials>
```

The response to this request is a JSON listing of all the group resources found in the SCIM app.

### Retrieving specific groups

**GET** /Groups/*$groupID*

There are situations where Okta needs to run a GET operation on a specific `${groupID}`, for example to see if the group still exists on the SCIM server. The request looks like the following:

```http
GET /scim/v2/Groups/abf4dd94-a4c0-4f67-89c9-76b03340cb9b HTTP/1.1
User-Agent: Okta SCIM Client 1.0.0
Authorization: <Authorization credentials>
```

The response from the server is the group details:

```http
HTTP/1.1 200 OK
Date: Tue, 10 Sep 2019 05:06:25 GMT
Content-Type: text/json;charset=UTF-8

{
    "schemas": ["urn:ietf:params:scim:schemas:core:2.0:Group"],
    "id": "abf4dd94-a4c0-4f67-89c9-76b03340cb9b",
    "displayName": "Test SCIMv2",
    "members": null,
    "meta": {
        "resourceType": "Group"
    }
}
```

### Updating a specific group name

**PATCH** /Groups/*$groupID*

Updates to existing group names for existing Okta groups are handled by a PATCH operation. The group must already be pushed out to the SCIM server.

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

The group name Update operation occurs each time there is a group membership Update operation.

The SCIM server response is to return the updated group details:

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

> **Note:** The SCIM server response to PATCH operation requests can also be a HTTP 204 response, with no body returned.

### Updating specific group membership

**PATCH** /Groups/*$groupID*

To add or remove users inside a specific pushed group on the SCIM server, Okta requires the following:

* The user must be a member of the group in Okta
* The user has been added under the **Assignments** tab of the SCIM application inside the Okta Admin Console
* The group is pushed under the **Push Groups** tab of the SCIM application inside the Okta Admin Console

If these three requirements are met, Okta sends a request to add the specified users to the group on the SCIM server. The operation can be sent as a PUT or a PATCH operation depending on the configuration of the SCIM application.

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
              "value": "1baf6a44-70e0-44ef-a043-3a546116799f",
              "display": "test.user@okta.local"
        }]
    }]
}
```

The SCIM server response is to return the updated group details:

```http
HTTP/1.1 200 OK
Date: Tue, 10 Sep 2019 05:06:25 GMT
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

In this example, the `members` attribute is returned with a null value. Okta doesn't require the list of users to be returned, but it does require the other details about the group.

You can also pass a full push of the group membership to the SCIM server using the `replace` operation. This operation replaces all the group members with the supplied resource values.

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
          "value": "addUser1",
          "display": "add.User1@example.com"
        },
        {
          "value": "addUser2",
          "display": "add.User2@example.com"
        }
      ]
    }
  ]
}
```

> **Note:** The SCIM server response to PATCH operation requests can also be a HTTP 204 response, with no body returned.

### Deleting a specific group

**DELETE** /Groups/*$groupID*

Okta administrators can remove pushed groups from the Okta Admin Console, under the **Push Groups** tab of the SCIM application.

On the **Push Groups** tab, click **Active** then click **Unlink pushed group**. In the dialog box that appears, you can choose whether you want to **Delete the group in the target app** or **Leave the group in the target app** on the SCIM server.

When the admin clicks **Unlink**, Okta sends a DELETE request:

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
* [Build a provisioning app using SCIM](/docs/guides/build-provisioning-integration/)
* [SCIM 2.0 RFC: Core Schema](https://tools.ietf.org/html/rfc7643)
* [SCIM 2.0 RFC: Protocol](https://tools.ietf.org/html/rfc7644)
* [SCIM 2.0 RFC: Definitions and Use Cases](https://tools.ietf.org/html/rfc7642)
