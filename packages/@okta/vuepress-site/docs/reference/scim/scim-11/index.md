---
title: SCIM 1.1 Protocol Reference
icon: /assets/img/icons/scim.svg
meta:
  - name: description
    content: Your SCIM API must support specific SCIM 1.1 API endpoints to work with Okta. Those endpoints and their explanations are detailed here.
---

# Okta and SCIM V1.1

This reference focuses on how Okta API endpoints share information with System for Cross-domain Identity Management (SCIM) specific API calls. This document specifically covers Version 1.1 of the SCIM specification.

For Version 2.0 of the SCIM specification, see our [SCIM 2.0 reference](/docs/reference/scim/scim-20/)

The SCIM Protocol is an application-level REST protocol for provisioning and managing identity data on the web. The protocol supports creation, discovery, retrieval, and modification of core identity Resources.

To better understand SCIM and the specific implementation of SCIM using Okta, see our [Understanding SCIM](/docs/concepts/scim/) guide or our blog post on [What is SCIM?](https://www.okta.com/blog/2017/01/what-is-scim/)

## SCIM User operations

### Creating users

The User creation operation brings the user's application profile from Okta over to the Service Provider. A user's application profile represents the key-value pairs defined on the Profile tab when a user is added.

To enable user provisioning, an Okta administrator must configure the provisioning options under the Okta Admin Console. For more information on enabling the provisioning features of your SCIM application, see [Provisioning and Deprovisioning](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Provisioning_Deprovisioning_Overview) under the **Accessing Provisioning Features** section.

After saving the application configuration, Okta makes two requests:

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

Next, the Okta administrator selects the option for **Create Users** on the **Provisioning >> To App** tab. 

After this step is complete, then whenever a user is assigned to the application in Okta, the following operation requests are made against the SCIM server:

* Determine if the user already exists
* Create the user if the user is not found

#### Determine if the user already exists

<ApiOperation method="get" url="/Users" />

  Okta checks that the user exists on the SCIM server through a GET operation with the `filter=userName` parameter (or any other filter parameter that was configured with the SCIM application). This check is performed using the `eq` (equal) operator and is the only one necessary to successfully provision users with Okta.

> **Note:** The filter must check an attribute that is _unique_ for all users in the Service Provider profiles.

For Okta Integration Network (OIN) applications, this filter is configured during the review process done by the Okta Application Analyst assigned to evaluate the application submission. Application submissions are processed through the [OIN Manager](https://oinmanager.okta.com).

The requests from Okta to the Service Provider are of the form:

```http
GET /scim/v1/Users?filter=userName%20eq%20%22test.user%40okta.local%22&startIndex=1&count=100 HTTP/1.1
User-Agent: Okta SCIM Client 1.0.0
Authorization: <Authorization credentials>
```

The SCIM application checks the filter provided and returns an empty response if no users match the filter criteria. For example:

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

If the SCIM server does return a user, Okta automatically matches the result with the user in Okta, sending the user application profile to the SCIM server.

<ApiOperation method="put" url="/Users/${userId}" />

```http
PUT /scim/v1/Users/e155dc98-aeee-4f58-b683-12b93dbc86b3 HTTP/1.1
User-Agent: Okta SCIM Client 1.0.0
Authorization: <Authorization credentials>

{
    "schemas": ["urn:scim:schemas:core:1.0"],
    "id": "e155dc98-aeee-4f58-b683-12b93dbc86b3",
    "userName": "test.user@okta.local",
    "externalId": "00unrudb40SOK2eup0h7",
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

#### Create the user

<ApiOperation method="post" url="/Users" />

If the user isn't found on the SCIM server, then Okta attempts to create it through a POST operation that contains the user application profile. The request looks like the following:

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
    "externalId": "00unrudb40SOK2eup0h7",
    "groups": [],
    "password": "1mz050nq",
    "active": true
}
```

The response from the SCIM server contains the created user profile:

```http
HTTP/1.1 201 Created
Date: Fri, 18 Oct 2019 06:39:04 GMT
Content-Type: application/json

{
    "schemas": ["urn:scim:schemas:core:1.0"],
    "id": "e155dc98-aeee-4f58-b683-12b93dbc86b3",
    "userName": "test.user@okta.local",
    "externalId": "00unrudb40SOK2eup0h7",
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

> **Note:** If the SCIM server returns an empty response body to the provisioning request, then Okta marks the operation as invalid, and the Okta administrator sees the following error:

![Provisioning operation not valid error](/img/scim11-user-not-created.png "Provisioning operation not valid")

> **Note:** If the user that Okta tries to create already exists in the Service Provider application, then the Service Provider must respond with an error schema to stop the provisioning job. The response looks like the following:

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

### Retrieving users

<ApiOperation method="get" url="/Users" />

When importing users from the SCIM server, Okta accesses the `/Users` endpoint and processes them page by page, using `startIndex`, `count`, and `totalResults` as pagination references.

Okta always uses `count=100` as the pagination reference and returns 100 elements. If the value of `totalResults` is higher than 100, then after Okta finishes retrieving the resources, the `startIndex` becomes `startIndex+100` and is passed as a query parameter along with `count` in a new request to the `/Users` endpoint. This pagination operation repeats until all pages are viewed. The number of pages is calculated using the formula:

```matlab
pages = ceil(totalResults / 100)
```

A sample request from Okta to retrieve the users from the SCIM app:

```http
GET /scim/v1/Users?startIndex=1&count=100 HTTP/1.1
User-Agent: Okta SCIM Client 1.0.0
Authorization: <Authorization credentials>
```

The response to this request is a JSON listing of all the Resources found in the SCIM app.

> **Note:** The `itemsPerPage`, `startIndex`, and `totalResults` values need to be exchanged as integers, not as strings.

### Retrieving a specific user

<ApiOperation method="get" url="/Users/${userId}" />

Okta can also run a GET operation to check if a specific user still exists on the SCIM server. The request looks like the following:

```http
GET /scim/v1/Users/48e0a2da-0999-4f2c-87f4-80432cfe6617 HTTP/1.1
User-Agent: Okta SCIM Client 1.0.0
Authorization: <Authorization credentials>
```

The response from the server is the user profile:

```http
HTTP/1.1 200 OK
Date: Fri, 18 Oct 2019 06:54:35 GMT
Content-Type: text/json;charset=UTF-8

{
    "schemas": ["urn:scim:schemas:core:1.0"],
    "id": "48e0a2da-0999-4f2c-87f4-80432cfe6617",
    "userName": "test.user@okta.local",
    "externalId": "00unrudb40SOK2eup0h7",
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

### Updating a specific user (PUT)

Updating a user refers to modifying an attribute in the Okta user profile that is mapped with an attribute in the SCIM application.

To update a user, the functionality needs to be enabled in Okta. In the Okta Admin Console, select the SCIM application from your list of applications. Under the **Provisioning** tab, click **To App** and select **Update User Attributes**.

#### Retrieve the user profile

<ApiOperation method="get" url="/Users/${userId}" />

To update a user profile, Okta first makes a GET request to `/Users/${userId}` and retrieves the body of the user's SCIM profile:

```http
GET /scim/v1/Users/48e0a2da-0999-4f2c-87f4-80432cfe6617 HTTP/1.1
User-Agent: Okta SCIM Client 1.0.0
Authorization: <Authorization credentials>
```

When the SCIM server receives this request, it responds with the user's SCIM profile:

```http
HTTP/1.1 200 OK
Date: Fri, 18 Oct 2019 06:56:38 GMT
Content-Type: text/json;charset=UTF-8

{
    "schemas": ["urn:scim:schemas:core:1.0"],
    "id": "48e0a2da-0999-4f2c-87f4-80432cfe6617",
    "userName": "test.user@okta.local",
    "externalId": "00unrudb40SOK2eup0h7",
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

#### Update the user profile

<ApiOperation method="put" url="/Users/${userId}" />

After the user's profile is retrieved from the SCIM server, Okta modifies the attributes that were changed and runs a PUT request with the new body to the `/Users/${userId}` endpoint:

```http
PUT /scim/v1/Users/48e0a2da-0999-4f2c-87f4-80432cfe6617 HTTP/1.1
User-Agent: Okta SCIM Client 1.0.0
Authorization: <Authorization credentials>

{
    "schemas": ["urn:scim:schemas:core:1.0"],
    "id": "48e0a2da-0999-4f2c-87f4-80432cfe6617",
    "userName": "test.user@okta.local",
    "externalId": "00unrudb40SOK2eup0h7",
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

The response from the SCIM server needs to be the user's updated SCIM profile:

```http
HTTP/1.1 200 OK
Date: Fri, 18 Oct 2019 06:56:39 GMT
Content-Type: text/json;charset=UTF-8

{
    "schemas": ["urn:scim:schemas:core:1.0"],
    "id": "48e0a2da-0999-4f2c-87f4-80432cfe6617",
    "userName": "test.user@okta.local",
    "externalId": "00unrudb40SOK2eup0h7",
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

### Updating a specific user (PATCH)

<ApiOperation method="patch" url="/Users/${userId}" />

In some situations, you may want to send a PATCH operation to modify user attributes. For more information about modifying PATCH operations, see [RFC 7644, Section 3.5.2](https://tools.ietf.org/html/rfc7644#section-3.5.2). Okta can modify any mapped SCIM attributes through a PATCH operation.

To update users, the functionality needs to be enabled in Okta. In the Okta Admin Console, select the SCIM application from your list of applications. Under the **Provisioning** tab, click **To App** and select **Update User Attributes**.

One important attribute modified through a PATCH operation is the `active` attribute. This attribute represents the user's current status.

To deactivate users, the functionality needs to be enabled in Okta. In the Okta Admin Console, under the **Provisioning** tab, click **To App** and select **Deactivate Users**.

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

The response from the SCIM server needs to be the user's updated SCIM profile:

```http
HTTP/1.1 200 OK
Date: Fri, 18 Oct 2019 07:00:47 GMT
Content-Type: text/json;charset=UTF-8

{
    "schemas": ["urn:scim:schemas:core:1.0"],
    "id": "48e0a2da-0999-4f2c-87f4-80432cfe6617",
    "userName": "test.user@okta.local",
    "externalId": "00unrudb40SOK2eup0h7",
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
POST /scim/v1/Groups HTTP/1.1
User-Agent: Okta SCIM Client 1.0.0
Authorization: <Authorization credentials>

{
    "schemas": ["urn:scim:schemas:core:1.0"],
    "displayName": "Test SCIM2"
}
```

When it receives this request, the SCIM server responds with the group details as it would for a GET operation to the `/Groups/${groupId}/`:

```http
HTTP/1.1 201 Created
Date: Fri, 18 Oct 2019 07:02:44 GMT
Content-Type: text/json;charset=UTF-8

{
    "schemas": ["urn:scim:schemas:core:1.0"],
    "id": "74094a55-c9ee-47ae-9fd4-9137deb43497",
    "displayName": "Test SCIM2",
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

The SCIM server isn't required to save and return the group description. However, there is no option to prevent the description from being sent.

### Retrieving groups

<ApiOperation method="get" url="/Groups" />

When importing groups from the SCIM server, Okta accesses the `/Groups` endpoint and processes them page by page, using `startIndex`, `count`, and `totalResults` values for reference.

Okta always uses `count=100` as the pagination reference and returns 100 elements. If the value of `totalResults` is higher than 100, then after Okta finishes retrieving the resources, the `startIndex` becomes `startIndex+100` and is passed as a query parameter along with `count` in a new request to the `/Groups` endpoint. This pagination operation repeats until all pages are viewed. The number of pages is calculated using the formula:

```matlab
pages = ceil(totalResults / 100)
```

A sample request from Okta to retrieve the groups from the SCIM app:

```http
GET /scim/v1/Groups?startIndex=1&count=100 HTTP/1.1
User-Agent: Okta SCIM Client 1.0.0
Authorization: <Authorization credentials>
```

The response to this request is a JSON listing of all the Group Resources found in the SCIM app:

> **Note:** The `itemsPerPage`, `startIndex`, and `totalResults` values need to be exchanged as integers, not as strings.

### Retrieving specific groups

<ApiOperation method="get" url="/Groups/${groupId}" />

There are situations where Okta needs to run a GET operation on a specific `${groupId}`, for example to see if the group still exists on the SCIM server. The request looks like the following:

```http
GET /scim/v1/Groups/74094a55-c9ee-47ae-9fd4-9137deb43497 HTTP/1.1
User-Agent: Okta SCIM Client 1.0.0
Authorization: <Authorization credentials>
```

The response from the server is the group details:

```http
HTTP/1.1 200 OK
Date: Fri, 18 Oct 2019 07:08:51 GMT
Content-Type: text/json;charset=UTF-8

{
    "schemas": ["urn:scim:schemas:core:1.0"],
    "id": "74094a55-c9ee-47ae-9fd4-9137deb43497",
    "displayName": "Test SCIM2",
    "members": [],
    "meta": {
        "created": "2019-10-18T07:02:44+00:00",
        "lastModified": "2019-10-18T07:02:44+00:00",
        "version": "12ba4e7e158aa0b78d78c7e9ae15d917"
    }
}
```

### Updating a specific group name

<ApiOperation method="patch" url="/Groups/${groupId}" />

When a group is pushed to the SCIM server, the group name is updated or inserted by Okta through a PATCH operation:

```http
PATCH /scim/v1/Groups/74094a55-c9ee-47ae-9fd4-9137deb43497 HTTP/1.1
User-Agent: Okta SCIM Client 1.0.0
Authorization: <Authorization credentials>

{
    "schemas": ["urn:scim:schemas:core:1.0"],
    "id": "74094a55-c9ee-47ae-9fd4-9137deb43497",
    "displayName": "Test SCIM2"
}
```

The SCIM server response is to return the updated group details:

```http
HTTP/1.1 200 OK
Date: Fri, 18 Oct 2019 07:11:00 GMT
Content-Type: text/json;charset=UTF-8

{
    "schemas": ["urn:scim:schemas:core:1.0"],
    "id": "74094a55-c9ee-47ae-9fd4-9137deb43497",
    "displayName": "Test SCIM2",
    "members": [],
    "meta": {
        "created": "2019-10-18T07:02:44+00:00",
        "lastModified": "2019-10-18T07:11:00+00:00",
        "version": "3a0c8354ccfcaab56019859469078a0b"
    }
}
```

### Updating specific group membership

<ApiOperation method="patch" url="/Groups/${groupId}" />

To add users to a specific pushed group on the SCIM server, Okta requires the following:

* The user must be a member of the group in Okta
* The user has been added under the **Assignments** tab of the SCIM application inside the Okta Admin Console
* The group is pushed under the **Push Groups** tab of the SCIM application inside the Okta Admin Console

If these three requirements are met, Okta sends a PATCH request to add the specified users to the group on the SCIM server:

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

The SCIM server response is to return the updated group details:

```http
HTTP/1.1 200 OK
Date: Fri, 18 Oct 2019 07:11:01 GMT
Content-Type: text/json;charset=UTF-8

{
    "schemas": ["urn:scim:schemas:core:1.0"],
    "id": "74094a55-c9ee-47ae-9fd4-9137deb43497",
    "displayName": "Test SCIM2",
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

When a user is removed from the group, Okta sends the `members` array, specifying the `${userId}` along with an `operations` element that has the value `delete`.

### Deleting a specific group

<ApiOperation method="delete" url="/Groups/$[groupId}" />

Okta administrators can remove pushed groups under the **Push Groups** tab of the SCIM application inside the Okta Admin Console. 

On the **Push Groups** tab, click **Active** then **Unlink pushed group**. In the dialog box that appears, Okta provides an option to delete the group on the SCIM server:

![Unlink a pushed group in Okta Admin console](/img/scim11-unlink-group.png "Unlink a pushed group in Okta Admin Console")

When the admin clicks **Unlink**, Okta sends a DELETE request:

```http
DELETE /scim/v1/Groups/74094a55-c9ee-47ae-9fd4-9137deb43497 HTTP/1.1
User-Agent: Okta SCIM Client 1.0.0
Authorization: <Authorization credentials>
```

The SCIM server can respond with an empty response:

```http
HTTP/1.1 204 No Content
Date: Fri, 18 Oct 2019 07:16:10 GMT
```

### Additional references

* [What is SCIM?](https://www.okta.com/blog/2017/01/what-is-scim/)
* [SCIM at Okta](/doc/concepts/scim/)
* [Build a provisioning app using SCIM](/docs/guides/build-provisioning-integration/)
* [SCIM V1.1 RFC: Core Schema](https://tools.ietf.org/html/rfc7643)
* [SCIM V1.1 RFC: Protocol](https://tools.ietf.org/html/rfc7644)
