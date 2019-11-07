---
title: SCIM 1.1 Protocol Reference
icon: /assets/img/icons/scim.svg
meta:
  - name: description
    content: Your SCIM API must support specific SCIM 1.1 API endpoints to work with Okta. Those endpoints and their explanations are detailed here.
---

# Okta and SCIM 1.1 Protocol

This reference focuses on how Okta API endpoints share information with SCIM Version 1.1 specific API calls.

The SCIM Protocol is an application-level, REST protocol for provisioning and managing identity data on the web. The protocol supports creation, discovery, retrieval, and modification of core identity Resources.

## User operations

### Creating users

<ApiOperation method="post" url="/users" />

The user creation operation brings the user’s application profile from Okta over to the service provider. An user's application profile represents the key-value pairs defined in the Profile tab when a user is added.

To enable user provisioning, an Okta administrator must configure the provisioning options under the Okta Admin Console. For more information on enabling the provisioning features of your SCIM application, see [Provisioning and Deprovisioning](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Provisioning_Deprovisioning_Overview), under the **Accessing Provisioning Features** section.

After saving the application configuration, Okta runs two requests:

    GET /scim/v1/users?startIndex=1&count=2 HTTP/1.1
    User-Agent: Okta SCIM Client 1.0.0
    Authorization: <Authorization credentials>

and

    GET /scim/v1/Groups?startIndex=1&count=100 HTTP/1.1
    User-Agent: Okta SCIM Client 1.0.0
    Authorization: <Authorization credentials>

**Note:** The query parameters that Okta sends at this point are always constant.

Next the Okta administrator checks the option for **Create Users** under the **Provisioning >> To App** tab. After this is complete, when a user is assigned to the application in Okta, the following requests are sent to the SCIM server:

#### Determine if the user already exists

<ApiOperation method="get" url="/users" />

  Okta checks that the user exists on the SCIM server through a GET operation with the `userName` filter or any other filter that was configured with the SCIM application. This check is performed using the `eq` (equal) operator and is the only one necessary to successfully provision users with Okta.

**Note:** The filter must identify a unique property of the user in the service provider profiles.

For Okta Integration Network (OIN) applications, this filter is configured during the review process done by the Okta Application Analyst assigned to evaluate the application submission. Application submissions are processed through the [OIN Manager](https://oinmanager.okta.com).

The requests from Okta to the service provider are of the form:

    GET /scim/v1/users?filter=userName%20eq%20%22test.user%40okta.local%22&startIndex=1&count=100 HTTP/1.1
    User-Agent: Okta SCIM Client 1.0.0
    Authorization: <Authorization credentials>

The SCIM application must check the filter provided and return and empty response if no users match the search criteria. For example:

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

If the SCIM server does return a user, Okta automatically matches the result with the user in Okta, sending the user application profile to the SCIM server.

<ApiOperation method="put" url="/users/{userId}" />

    PUT /scim/v1/users/e155dc98-aeee-4f58-b683-12b93dbc86b3 HTTP/1.1
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

#### Create the user

<ApiOperation method="post" url="/users" />

If the user is not found in the SCIM server, then Okta attempts to create it through a POST operation that contains the user application profile. The request looks like the following:

    POST /scim/v1/users HTTP/1.1
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

The response from the SCIM server contains the user profile, similar to a GET operation on `/scim/v1/users/${userId}`.

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

**Note:** An empty response body to the provisioning request marks the operation as invalid in Okta, and the Okta administrator sees the following error:

![Provisioning operation not valid error](/img/scim11-user-not-created.png "Provisioning operation not valid")

If the user that Okta tries to create already exists in the service provider application, then the service provider must respond with an error schema in order to stop the provisioning job. The response should like the following:

    HTTP/1.1 409 Conflict
    Date: Fri, 18 Oct 2019 06:50:25 GMT
    Content-Type: application/json

    {
        "Errors": [{
            "description": "User already exists in the database.",
            "code": 409
        }]
    }

### Listing/retrieving users

<ApiOperation method="get" url="/users" />

When importing from the SCIM server, Okta will access the /users endpoint and follow page by page, using `startIndex`, `count` and `totalResults` as a pagination references.

Okta always uses `count=100` as the pagination reference, and returns 100 elements. If the value of `totalResults` is higher than 100, then, after Okta finishes retrieving the resources, the `startIndex` will become `startIndex+100` and is passed as a query parameter along with `count` in a new request to the /users endpoint. This pagination operation repeats until all pages are viewed. The number of pages is calculated using the formula:

    pages = ceil(`totalResults` / 100)

A sample request from Okta to retrieve the users from the SCIM app:

    GET /scim/v1/users?startIndex=1&count=100 HTTP/1.1
    User-Agent: Okta SCIM Client 1.0.0
    Authorization: <Authorization credentials>

The response to this request:

    HTTP/1.1 200 OK
    Date: Fri, 18 Oct 2019 06:53:36 GMT
    Content-Type: text/json;charset=UTF-8

    {
        "schemas": ["urn:scim:schemas:core:1.0"],
        "totalResults": 1,
        "startIndex": 1,
        "itemsPerPage": 1,
        "Resources": [{
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
        }]
    }

**Note:** The `itemsPerPage`, `startIndex`, and `totalResults` values need to be returned as integers and not as strings.

### Retrieving specific users

<ApiOperation method="get" url="/users/${userId}" />

Okta can also run a GET operation to handle the specific use-case where it needs to see if a user still exists on the SCIM server. The request looks like the following:

    GET /scim/v1/users/48e0a2da-0999-4f2c-87f4-80432cfe6617 HTTP/1.1
    User-Agent: Okta SCIM Client 1.0.0
    Authorization: <Authorization credentials>

The response from the server is the user profile:

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

### Update specific users (PUT)

<ApiOperation method="put" url="/users/${userId}" />

Updating a user refers to modifying an attribute in the Okta user profile that is mapped with an attribute in the SCIM application.

To update a user, the functionality needs to be enabled in Okta. In the Okta Admin Console, select the SCIM application from your list of applications. Under the **Provisioning** tab, click **To App** and select **Update User Attributes**.

#### Retrieve the user profile

To update a user profile, Okta first makes a GET request to `/users/${userId}` and retrieves the body of the user’s SCIM profile:

    GET /scim/v1/users/48e0a2da-0999-4f2c-87f4-80432cfe6617 HTTP/1.1
    User-Agent: Okta SCIM Client 1.0.0
    Authorization: <Authorization credentials>

When the SCIM server receives this request, it responds with the user’s SCIM profile:

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

#### Update the user profile

<ApiOperation method="put" url="/Users/${userId}" />

After the user's profile is retrieved from the SCIM server, Okta modifies the attributes that were changed and runs a PUT request with the new body to the `/users/${userId}` endpoint:

    PUT /scim/v1/users/48e0a2da-0999-4f2c-87f4-80432cfe6617 HTTP/1.1
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

The response from the SCIM server needs to be the user’s SCIM profile:

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

### Update specific users (PATCH)

<ApiOperation method="patch" url="/users/${userId}" />

In some situations, you may want to send a PATCH operation to modify user attributes. For more information about modifying PATCH operations, see [RFC 7644, Section 3.5.2](https://tools.ietf.org/html/rfc7644#section-3.5.2). Okta can modify any mapped SCIM attributes through a PATCH operation.

To update a user, the functionality needs to be enabled in Okta. In the Okta Admin Console, select the SCIM application from your list of applications. Under the **Provisioning** tab, click **To App** and select **Update User Attributes**.

One important attribute modified through PATCH is the `active` attribute, representing the user’s current status.

In order to deactivate a user, you need to enable the functionality in Okta. In the Okta Admin Console, under the **Provisioning** tab, click **To App** and select **Deactivate Users**.

When a user is deactivated, Okta sends this request:

    PATCH /scim/v1/users/48e0a2da-0999-4f2c-87f4-80432cfe6617 HTTP/1.1
    User-Agent: Okta SCIM Client 1.0.0
    Authorization: <Authorization credentials>

    {
        "schemas": ["urn:scim:schemas:core:1.0"],
        "id": "48e0a2da-0999-4f2c-87f4-80432cfe6617",
        "active": false
    }

The response from the SCIM server needs to be the user’s SCIM profile:

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

### Deleting specific users

<ApiOperation method="delete" url="/users/${userId}" />

Okta does not perform a DELETE operation on `/users/${userId}`.

If a user is suspended, deactivated, or removed from the application in Okta, then Okta sends a PATCH request to set the `active` attribute to `false`.

## Group operations

### Creating groups

<ApiOperation method="post" url="/groups" />

To create a group in the SCIM server, an Okta administrator must push the group using the Okta Admin Console. In the Okta Admin Console, select the SCIM application from your list of applications. In the **Push Groups** tab, click **Push Groups**. For more information, see the [Using Group Push topic](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Directory_Using_Group_Push) in the Okta Help Center.

After the group is selected, Okta makes a POST request to the service provider:

    POST /scim/v1/groups HTTP/1.1
    User-Agent: Okta SCIM Client 1.0.0
    Authorization: <Authorization credentials>

    {
        "schemas": ["urn:scim:schemas:core:1.0"],
        "displayName": "Test SCIM2"
    }

When it receives this request the SCIM server responds with the group details, as it would for a GET operation to the `/groups/${groupId}/`:

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

**Note:** If the group has a description, it is sent automatically to the SCIM server:

    {
    "schemas": ["urn:scim:schemas:core:1.0", "urn:okta:custom:group:1.0"],
        "displayName": "Group 10",
        "urn:okta:custom:group:1.0": {
            "description": "All Users West of The Rockies"
        }
    }

The SCIM server is not required to save and return the group description; however there is no option to remove the description from being sent.

### Listing/retrieving groups

<ApiOperation method="get" url="/groups" />

When importing groups from the SCIM server, Okta accesses the `/groups` endpoint and processes them page by page, using `startIndex`, `count` and `totalResults` values for reference.

Okta always uses `count=100` as reference to return 100 elements. If the value of `totalResults` is higher than 100, then, after finishing retrieving the resources, `startIndex` becomes `startIndex+100` and it is passed as a query parameter along with `count` in a new request to the `/groups` endpoint. This pagination operation repeats until all pages are viewed. The number of pages is calculated using the formula:

    pages = ceil(totalResults / 100)

A sample request from Okta to retrieve the groups:

    GET /scim/v1/groups?startIndex=1&count=100 HTTP/1.1
    User-Agent: Okta SCIM Client 1.0.0
    Authorization: <Authorization credentials>

The response to this request:

    HTTP/1.1 200 OK
    Date: Fri, 18 Oct 2019 07:07:12 GMT
    Content-Type: text/json;charset=UTF-8

    {
        "schemas": ["urn:scim:schemas:core:1.0"],
        "totalResults": 1,
        "startIndex": 0,
        "itemsPerPage": 1,
        "Resources": [{
            "schemas": ["urn:scim:schemas:core:1.0"],
            "id": "74094a55-c9ee-47ae-9fd4-9137deb43497",
            "displayName": "Test SCIM2",
            "members": [],
            "meta": {
                "created": "2019-10-18T07:02:44+00:00",
                "lastModified": "2019-10-18T07:02:44+00:00",
                "version": "12ba4e7e158aa0b78d78c7e9ae15d917"
            }
        }]
    }

**Note:** The `itemsPerPage`, `startIndex`, and `totalResults` values need to be returned as integers and not as strings.

### Retrieving specific groups

<ApiOperation method="get" url="/groups/${groupId}" />

There are situations where Okta needs to run a GET operation on a specific `${groupId}`, for example to see if the group still exists on the SCIM server. The request looks like the following:

    GET /scim/v1/groups/74094a55-c9ee-47ae-9fd4-9137deb43497 HTTP/1.1
    User-Agent: Okta SCIM Client 1.0.0
    Authorization: <Authorization credentials>

The SCIM server response is to return the group details:

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

### Update specific group name

<ApiOperation method="patch" url="/groups/${groupId}" />

When a group is pushed to the SCIM server, most of the time the group name is updated or inserted by Okta through a PATCH operation:

    PATCH /scim/v1/groups/74094a55-c9ee-47ae-9fd4-9137deb43497 HTTP/1.1
    User-Agent: Okta SCIM Client 1.0.0
    Authorization: <Authorization credentials>

    {
        "schemas": ["urn:scim:schemas:core:1.0"],
        "id": "74094a55-c9ee-47ae-9fd4-9137deb43497",
        "displayName": "Test SCIM2"
    }

The SCIM server response is to return the group details, just as for a group retrieval request:

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

### Update specific group membership

<ApiOperation method="patch" url="/groups/${groupId}" />

To add users to a specific pushed group on the SCIM server, Okta requires:

* The user must be a member of the group in Okta
* The user has been added under the **Assignments** tab of the SCIM application inside the Okta Admin Console
* The group is pushed under the **Push Groups** tab of the SCIM application inside the Okta Admin Console

If these three requirements are met; Okta sends a PATCH request to add a user on the SCIM server. The request looks similar to the following:

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

The SCIM server response is to return the group details, just as for a group retrieval request:

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

When a user is removed from the group, Okta sends the `members` array with an `operations` element that has the value `delete`.

### Deleting specific groups

<ApiOperation method="delete" url="/groups/$[groupId}" />

Okta administrators can remove pushed groups under the **Push Groups** tab of the SCIM application inside the Okta Admin Console, In the **Push Groups** tab, click **Active** then **Unlink pushed group**. In the dialog box that appears, Okta provides an option to delete the group on the SCIM server:

![Unlink a pushed group in Okta Admin console](/img/scim11-unlink-group.png "Unlink a pushed group in Okta Admin Console")

When the admin clicks on the **Unlink** button, Okta sends a DELETE request:

    DELETE /scim/v1/Groups/74094a55-c9ee-47ae-9fd4-9137deb43497 HTTP/1.1
    User-Agent: Okta SCIM Client 1.0.0
    Authorization: <Authorization credentials>

The SCIM server can respond with an empty response:

    HTTP/1.1 204 No Content
    Date: Fri, 18 Oct 2019 07:16:10 GMT

### See also

* [What is SCIM?](https://www.okta.com/blog/2017/01/what-is-scim/)
* [SCIM at Okta](/doc/concepts/scim/)
* [Build a provisioning app using SCIM](/docs/guides/build-provisioning-integration/)
