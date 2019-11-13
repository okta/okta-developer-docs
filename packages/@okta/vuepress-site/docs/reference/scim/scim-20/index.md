---
title: SCIM 2.0 Protocol Reference
icon: /assets/img/icons/scim.svg
meta:
  - name: description
    content: Your SCIM API must support specific SCIM 2.0 API endpoints to work with Okta. Those endpoints and their explanations are detailed here.
---

# Okta and SCIM V2.0

This reference focuses on how Okta API endpoints share information with System for Cross-domain Identity Management (SCIM) specific API calls. This document specifically covers Version 2.0 of the SCIM specification.

For Version 1.1 of the SCIM specification, see our [SCIM 1.1 reference](/docs/reference/scim/scim-11/).

The SCIM Protocol is an application-level REST protocol for provisioning and managing identity data on the web. The protocol supports creation, discovery, retrieval, and modification of core identity resources.

To better understand SCIM and the specific implementation of SCIM using Okta, see our [Understanding SCIM](/docs/concepts/scim/) guide or our blog post on [What is SCIM?](https://www.okta.com/blog/2017/01/what-is-scim/).

## SCIM User operations

### Creating users

The User creation operation brings the user's application profile from Okta over to the Service Provider. A user's application profile represents the key-value pairs defined on the **Profile** tab when a user is added.

To enable user provisioning, an Okta administrator must configure the provisioning options under the Okta Admin Console. For more information on enabling the provisioning features of your SCIM application, see [Provisioning and Deprovisioning](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Provisioning_Deprovisioning_Overview) under the **Accessing Provisioning Features** section.

Next, the Okta administrator selects the option for **Create Users** on the **Provisioning >> To App** tab.

After you complete this step, whenever a user is assigned to the application in Okta, the following operation requests are made against the SCIM server:

* Determine if the user already exists
* Create the user if the user isn't found

#### Determine if the user already exists

<ApiOperation method="get" url="/Users" />

Okta checks that the user exists on the SCIM server through a GET operation with the `filter=userName` parameter (or any other filter parameter that was configured with the SCIM application). This check is performed using the `eq` (equal) operator and is the only one necessary to successfully provision users with Okta.

> **Note:** The filter must check an attribute that is _unique_ for all users in the Service Provider profiles.

For Okta Integration Network (OIN) applications, this filter is configured during the review process done by the Okta Application Analyst assigned to evaluate the application submission. Application submissions are processed through the [OIN Manager](https://oinmanager.okta.com).

The requests from Okta to the Service Provider are of the form:

```http
GET /scim/v2/Users?filter=userName%20eq%20%22test.user%40example%22&startIndex=1&count=100 HTTP/1.1
User-Agent: Okta SCIM Client 1.0.0
Authorization: <Authorization credentials>
```

The SCIM application checks the filter provided and returns an empty response if no users match the filter criteria. For example:

```http
HTTP/1.1 200 OK
Date: Tue, 10 Sep 2019 01:49:39 GMT
Content-Type: text/json;charset=UTF-8

{
    "Resources": [],
    "itemsPerPage": 0,
    "schemas": ["urn:ietf:params:scim:api:messages:2.0:ListResponse"],
    "startIndex": 0
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

<ApiOperation method="post" url="/Users" />

If the user isn't found on the SCIM server, then Okta attempts to create it through a POST operation that contains the user application profile. The request looks like the following:

```http
POST /scim/v2/Users HTTP/1.1
User-Agent: Okta SCIM Client 1.0.0
Authorization: <Authorization credentials>

{
    "schemas": ["urn:ietf:params:scim:schemas:core:2.0:User"],
    "userName": "test.user@example.com",
    "name": {
        "givenName": "Test",
        "familyName": "User"
    },
    "emails": [{
        "primary": true,
        "value": "test.user@example.com",
        "type": "work"
    }],
    "displayName": "Test User",
    "locale": "en-US",
    "externalId": "00ujl29u0le5T6Aj10h7",
    "groups": [],
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
    "userName": "test.user@example.com",
    "name": {
        "givenName": "Test",
        "familyName": "User"
    },
    "emails": [{
        "primary": true,
        "value": "test.user@example.com",
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

If the SCIM server returns an empty response body to the provisioning request, then Okta marks the operation as invalid, and the Okta administrator is shown an error in the Admin Console:

> Automatic provisioning of user `userName` to app `AppName` failed: Error while creating user `userName`: Create new user returned empty user.

If the user that Okta tries to create already exists in the Service Provider application, then the Service Provider needs to respond with an error schema to stop the provisioning job. The response looks like the following:

```http
HTTP/1.1 409 Conflict
Date: Tue, 10 Sep 2019 02:22:30 GMT
Content-Type: text/json;charset=UTF-8

{
    "schemas": ["urn:ietf:params:scim:api:messages:2.0:Error"],
    "detail": "Conflict - User already exists",
    "status": 409
}
```

### Retrieving users

<ApiOperation method="get" url="/Users" />

When importing users from the SCIM server, Okta accesses the `/Users` endpoint and processes them page by page, using `startIndex`, `count`, and `totalResults` as pagination references.

Okta always uses `count=100` as the pagination reference and returns 100 elements. If the value of `totalResults` is higher than 100, then after Okta finishes retrieving the resources, the `startIndex` becomes `startIndex+100` and is passed as a query parameter along with `count` in a new request to the `/Users` endpoint. This pagination operation repeats until all pages are viewed. The number of pages is calculated using the formula:

```matlab
pages = ceil(totalResults / 100)
```

A sample request from Okta to retrieve the users from the SCIM app:

```http
GET /scim/v2/Users?startIndex=1&count=100 HTTP/1.1
User-Agent: Okta SCIM Client 1.0.0
Authorization: <Authorization credentials>
```

The response to this request is a JSON listing of all the resources found in the SCIM app.

> **Note:** The `itemsPerPage`, `startIndex`, and `totalResults` values need to be exchanged as integers, not as strings.

### Retrieving a specific user

<ApiOperation method="get" url="/Users/${userId}" />

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
    "userName": "another.user@okta.com",
    "name": {
        "givenName": "Another",
        "middleName": "",
        "familyName": "User"
    },
    "emails": [{
        "primary": true,
        "value": "another.user@example.com",
        "type": "work",
        "display": "another.user@example.com"
    }],
    "active": true,
    "groups": [],
    "meta": {
        "resourceType": "User"
    }
}
```

### Updating a specific user (PUT)

Updating a user refers to modifying an attribute in the Okta user profile that is mapped with an attribute in the SCIM application.

To update a user, the functionality needs to be enabled in Okta. In the Okta Admin Console, select the SCIM application from your list of applications. Under the **Provisioning** tab, click **To App**. In the **Update User Attributes** option, click **Enable**.

#### Retrieve the user profile

<ApiOperation method="get" url="/Users/${userId}" />

To update a user profile, Okta first makes a GET request to `/Users/${userId}` and retrieves the body of the user's SCIM profile:

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
    "userName": "another.user@okta.com",
    "name": {
        "givenName": "Another",
        "middleName": "",
        "familyName": "User"
    },
    "emails": [{
        "primary": true,
        "value": "another.user@example.com",
        "type": "work",
        "display": "another.user@example.com"
    }],
    "active": true,
    "groups": [],
    "meta": {
        "resourceType": "User"
    }
}
```

#### Update the user profile

<ApiOperation method="put" url="/Users/${userId}" />

After the user's profile is retrieved from the SCIM server, Okta modifies the attributes that were changed and runs a PUT request with the new body to the `/Users/${userId}` endpoint:

```http
PUT /scim/v2/Users/72196b36-667a-4aa6-aacd-a808672adc40 HTTP/1.1
User-Agent: Okta SCIM Client 1.0.0
Authorization: <Authorization credentials>

{
    "schemas": ["urn:ietf:params:scim:schemas:core:2.0:User"],
    "id": "23a35c27-23d3-4c03-b4c5-6443c09e7173",
    "userName": "another.user@okta.com",
    "name": {
        "givenName": "Another",
        "middleName": "",
        "familyName": "User"
    },
    "emails": [{
        "primary": true,
        "value": "another.user@example.com",
        "type": "work",
        "display": "another.user@example.com"
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
    "userName": "another.user@okta.com",
    "name": {
        "givenName": "Another",
        "middleName": "",
        "familyName": "User"
    },
    "emails": [{
        "primary": true,
        "value": "another.user@example.com",
        "type": "work",
        "display": "another.user@example.com"
    }],
    "active": true,
    "groups": [],
    "meta": {
        "resourceType": "User"
    }
}
```

### Updating a specific user (PATCH)

<ApiOperation method="patch" url="/Users/${userId}" />

In some situations, you may want to send a PATCH operation to modify user attributes. For more information about modifying PATCH operations, see [RFC 7644, Section 3.5.2](https://tools.ietf.org/html/rfc7644#section-3.5.2). Okta can modify any mapped SCIM attributes through a PATCH operation.

To update users, the functionality needs to be enabled in Okta. In the Okta Admin Console, select the SCIM application from your list of applications. Under the **Provisioning** tab, click **To App**. In the **Update User Attributes** option, click **Enable**.

One important attribute modified through a PATCH operation is the `active` attribute. This attribute represents the user's current status.

To deactivate users, the functionality needs to be enabled in Okta. In the Okta Admin Console, under the **Provisioning** tab, click **To App**. In the **Deactivate Users** option, click **Enable**.

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
    "userName": "another.user@okta.com",
    "name": {
        "givenName": "Another",
        "middleName": "",
        "familyName": "User"
    },
    "emails": [{
        "primary": true,
        "value": "another.user@example.com",
        "type": "work",
        "display": "another.user@example.com"
    }],
    "active": false,
    "groups": [],
    "meta": {
        "resourceType": "User"
    }
}
```

> **Note:** The SCIM server response to PATCH operation requests can also be a HTTP 204 response, with no body returned.

### Deleting specific users

<ApiOperation method="delete" url="/Users/${userId}" />

Okta doesn't perform DELETE operations on specific users.

If a user is suspended, deactivated, or removed from the application in Okta, then Okta sends a PATCH request to set the `active` attribute to `false`.

## SCIM Group operations

### Creating groups

<ApiOperation method="post" url="/Groups" />

To create a group on the SCIM server, an Okta administrator must push the group using the Okta Admin Console. In the Okta Admin Console, select the SCIM application from your list of applications. On the **Push Groups** tab, click **Push Groups**. For more information, see the [Using Group Push topic](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Directory_Using_Group_Push) in the Okta Help Center.

After the group is selected, Okta makes a POST request to the Service Provider:

```http
POST /scim/v2/Groups HTTP/1.1
User-Agent: Okta SCIM Client 1.0.0
Authorization: <Authorization credentials>

{
    "schemas": ["urn:ietf:params:scim:schemas:core:2.0:Group"],
    "displayName": "Test SCIM",
    "members": []
}
```

When it receives this request, the SCIM server responds with the group details as it would for a GET operation to the `/Groups/${groupId}/`:

```http
HTTP/1.1 201 Created
Date: Tue, 10 Sep 2019 04:54:18 GMT
Content-Type: text/json;charset=UTF-8

{
    "schemas": ["urn:ietf:params:scim:schemas:core:2.0:Group"],
    "id": "abf4dd94-a4c0-4f67-89c9-76b03340cb9b",
    "displayName": "Test SCIM",
    "members": [],
    "meta": {
        "resourceType": "Group"
    }
}
```

### Retrieving groups

<ApiOperation method="get" url="/Groups" />

When importing groups from the SCIM server, Okta accesses the `/Groups` endpoint and processes them page by page, using the `startIndex`, `count`, and `totalResults` values for reference.

> **Note:** The `itemsPerPage`, `startIndex`, and `totalResults` values need to be exchanged as integers, not as strings.

Okta always uses `count=100` as the pagination reference and returns 100 elements. If the value of `totalResults` is higher than 100, then after Okta finishes retrieving the resources, the `startIndex` becomes `startIndex+100` and is passed as a query parameter along with `count` in a new request to the `/Groups` endpoint. This pagination operation repeats until all pages are viewed. The number of pages is calculated using the formula:

```matlab
pages = ceil(totalResults / 100)
```

A sample request from Okta to retrieve the groups from the SCIM app:

```http
GET /scim/v2/Groups?startIndex=1&count=100 HTTP/1.1
User-Agent: Okta SCIM Client 1.0.0
Authorization: <Authorization credentials>
```

The response to this request is a JSON listing of all the group resources found in the SCIM app.

### Retrieving specific groups

<ApiOperation method="get" url="/Groups/${groupId}" />

There are situations where Okta needs to run a GET operation on a specific `${groupId}`, for example to see if the group still exists on the SCIM server. The request looks like the following:

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
    "displayName": "Test SCIM",
    "members": null,
    "meta": {
        "resourceType": "Group"
    }
}
```

### Updating a specific group name

<ApiOperation method="patch" url="/Groups/${groupId}" />

Updates to existing group names are handled by a PATCH operation. The group must already be pushed out to the SCIM server.

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
            "displayName": "Test SCIM2"
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
    "displayName": "Test SCIM2",
    "members": null,
    "meta": {
        "resourceType": "Group"
    }
}
```

> **Note:** The SCIM server response to PATCH operation requests can also be a HTTP 204 response, with no body returned.

### Updating specific group membership

<ApiOperation method="patch" url="/Groups/${groupId}" />

To add users to a specific pushed group on the SCIM server, Okta requires the following:

* The user must be a member of the group in Okta
* The user has been added under the **Assignments** tab of the SCIM application inside the Okta Admin Console
* The group is pushed under the **Push Groups** tab of the SCIM application inside the Okta Admin Console

If these three requirements are met, Okta sends a PATCH request to add the specified users to the group on the SCIM server:

```http
PATCH /scim/v2/Groups/abf4dd94-a4c0-4f67-89c9-76b03340cb9b HTTP/1.1
User-Agent: Okta SCIM Client 1.0.0
Authorization: <Authorization credentials>

{
    "schemas": ["urn:ietf:params:scim:api:messages:2.0:PatchOp"],
    "Operations": [{
        "op": "add",
        "path": "members",
        "value": [{
            "value": "1baf6a44-70e0-44ef-a043-3a546116799f",
            "display": "test.user@example.com"
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
    "displayName": "Test SCIM",
    "members": null,
    "meta": {
        "resourceType": "Group"
    }
}
```

In this example, the `members` attribute is returned with a null value. Okta does not require the list of users to be returned, but it does require the other details about the group.

The other operations for updating the users present in the group are “replace” and “remove”.

> **Note:** The SCIM server response to PATCH operation requests can also be a HTTP 204 response, with no body returned.

### Deleting a specific group

<ApiOperation method="delete" url="/Groups/$[groupId}" />

Okta administrators can remove pushed groups from the Okta Admin Console, under the **Push Groups** tab of the SCIM application.

On the **Push Groups** tab, click **Active** then **Unlink pushed group**. In the dialog box that appears, you can choose whether you want to **Delete the group in the target app** or **Leave the group in the target app** on the SCIM server.

When the admin clicks **Unlink**, Okta sends a DELETE request:

```http
DELETE /scim/v2/Groups/abf4dd94-a4c0-4f67-89c9-76b03340cb9b HTTP/1.1
User-Agent: Okta SCIM Client 1.0.0
Authorization: <Authorization credentials>
```

The SCIM server can respond with an empty 204 response:

```http
HTTP/1.1 204 No Content
Date: Tue, 10 Sep 2019 05:29:25 GMT
```

### Additional references

* [What is SCIM?](https://www.okta.com/blog/2017/01/what-is-scim/)
* [SCIM at Okta](/doc/concepts/scim/)
* [Build a provisioning app using SCIM](/docs/guides/build-provisioning-integration/)
* [SCIM 2.0 RFC: Core Schema](https://tools.ietf.org/html/rfc7643)
* [SCIM 2.0 RFC: Protocol](https://tools.ietf.org/html/rfc7644)
* [SCIM 2.0 RFC: Definitions and Use Cases](https://tools.ietf.org/html/rfc7642)
