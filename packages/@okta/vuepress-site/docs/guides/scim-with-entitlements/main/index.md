---
title: Build a SCIM 2.0 server with entitlements
meta:
  - name: description
    content: Build a SCIM 2.0 server to support the exchange of entitlements between a downstream app and an Okta integration.
layout: Guides
---

This guide teaches you how to create a SCIM 2.0 server that supports provisioning entitlements to an app integration in Okta.

---

#### Learning outcomes

* Learn which endpoints are required to support entitlements.
* Understand how Okta uses SCIM calls to gather information about users in a downstream app.

#### What you need

* [Okta Developer Edition organization](https://developer.okta.com/signup).
* Some basic development experience with the System for Cross-domain Identity Management (SCIM) [core schema](https://datatracker.ietf.org/doc/html/rfc7643) and [protocol](https://datatracker.ietf.org/doc/html/rfc7644)

---

## Overview

Okta supports third-party entitlement discovery and assignment through a combination of [Okta Identity Governance](https://help.okta.com/okta_help.htm?type=oie&id=ext-iga) and SCIM 2.0.

In particular, user schema discovery allows Okta to support dynamic data from SCIM-enabled apps. The discovery process includes importing users into Okta and parsing the imported user objects.

When an app is provisioned, Okta calls the SCIM server to retrieve a list of resource types. Each User object consists of a core schema that's common to all users, and can optionally contain dynamic data. Okta defines schemas for two resource types: roles and entitlements.

You can also create custom schema extensions to support custom attributes for users, roles, and entitlements. Okta processes the available resource types and any custom attributes defined through schema extensions, which are added to the user profile for the app.

> **Note:** [Okta Identity Governance](https://help.okta.com/okta_help.htm?type=oie&id=ext-iga) is required to use [entitlements](https://help.okta.com/okta_help.htm?type=oie&id=ext-entitlement-mgt).

---
### Endpoint call sequence

The following sequence of calls begins when you enable provisioning for your SCIM 2.0 app with entitlements:

1. `/ResourceTypes`: Gets available Entitlements, Roles, Users, and Extension Schema Uniform Resource Names (URNs)
1. `/Schemas`: Gets available schemas that match the ResourceType extension URNs from the previous call
    > **Note:** The schemas for Entitlements, Roles, and Users (both Core and Enterprise) are known by Okta and aren't required from `/Schemas`. Only provide schema definitions for extensions unknown to Okta.
1. Resource endpoints. These endpoints are dynamic. Whatever is defined for the endpoint in the ResourceType is the endpoint that Okta calls. For each ResourceType with the Okta Role or Entitlement URN, Okta retrieves all values from the defined endpoints. For example, a Profile ResourceType could have a corresponding `/Profiles` endpoint. Other common endpoints include `/Entitlements`, `/Roles`, and `/Licenses`.

After the sequence of calls is complete, you can view entitlements in the **Governance** tab of a Governance-enabled app integration in the Admin Console.

This combination of endpoints enables user schema discovery. Okta combines the information gathered from the endpoints to build a representation in Okta to facilitate the use of entitlements within the app.

### User schema discovery and Profile Editor

User schema discovery must be enabled on your org for your app to understand entitlements and roles. To enable it, contact [Okta Support](https://support.okta.com/).

When user schema discovery is enabled for an app integration, admins can't add attributes to the app user profile in the Profile Editor in the Admin Console. This option is disabled because the contents of the app user profile are determined by the SCIM server between Okta and the downstream app. Okta gathers profile elements from the SCIM server to dynamically build the app user profile.

The SCIM server should be updated to maintain parity with the downstream app. User schema discovery allows the app provider to determine the contents of the app user profile.

### Create an app that supports entitlements and user schema discovery

https://help.okta.com/oie/en-us/content/topics/apps/aiw_scim_entitlements.htm

1. [Create a SCIM app integration with Entitlement Management](https://help.okta.com/oie/en-us/content/topics/apps/aiw_scim_entitlements.htm).
1. Ensure that your SCIM 2.0 server exposes the following endpoints:
    - `/ResourceTypes`
    - Any resource-specific endpoints for Entitlements (for example: `/Licenses`, `/Roles`, and so on)
1. Optional. If your app requires custom Entitlement, Role, or User schema extensions, expose the following endpoint:
    - `/Schemas`
1. Configure your app in Okta.

### User operations

Create, update, and import User operations are handled using [SCIM User operations](/docs/reference/scim/scim-20/#scim-user-operations). The User object should include any Entitlements, Roles, and custom User schema extensions that your app requires. See [User with entitlements and roles](#user-with-entitlements-and-roles) for an example.

### Endpoints for user schema discovery

#### /ResourceTypes

Okta calls this endpoint to gather a list of available resources with any associated schemas and schema extension URNs. 

Common resource types include the following:
- Users
- Groups
- Entitlements
- Roles

Okta doesn't offer custom handling for Groups. 

To expose Entitlements and Roles, you must create a corresponding `ResourceType` for each of these entities. See [ResourceTypes](#resourcetype) for an implementation example.

#### /Schemas

For any required custom schema extensions, implement the `/Schemas` endpoint. See [Schemas](#schemas) for an implementation example.

> **Note**: You don't need a `/Schemas` endpoint for apps that don't use custom schema extensions. Okta handles the base definitions for the following resources and objects:
- Entitlements
- Roles
- User:Core
- User:Enterprise

### Example user discovery data

The following sections provide sample structures in JSON format for ResourceTypes, schemas, custom entitlements with extensions, and a user that contains entitlements and roles.

#### ResourceTypes

Each resource includes the following fields:

* `id`: The value used by Okta.
* `name`: The name displayed for the resource on the **Governance** tab of the app integration.
* `endpoint`: The endpoint that Okta calls to gather entitlements for this resource.
* `description`: A description for the resource.
* `schema`: A Uniform Resource Name (URN) that conforms to the Okta Role/Entitlement URN for Okta Identity Governance:
    - Role: `urn:okta:scim:schemas:core:1.0:Role`
    - Entitlement: `urn:okta:scim:schemas:core:1.0:Entitlement`
    - The schema for users is the standard: `urn:ietf:params:scim:schemas:core:2.0:User`
* Schema extensions: List any extensions required for other properties. Generally, Entitlements and Roles don't need to have extensions, while it's common for Users to have highly customized extensions. For example, a User might have a schema extension to store a custom attribute for a particular app.

The default location for ResourceTypes definitions is `BaseURL/scim/v2/ResourceTypes`. For example, if your server is hosted on [https://example.com](https://example.com) then the available ResourceTypes can be retrieved from `https://example.com/scim/v2/ResourceTypes`.

The following ResourceTypes example includes a sample Role resource with no extensions, an Entitlement resource, and a Profile resource that includes extensions.
~~~
{
    "schemas": [
      "urn:ietf:params:scim:api:messages:2.0:ListResponse"
    ],
    "totalResults": 3,
    "startIndex": 1,
    "itemsPerPage": 3,
    "Resources": [
        {
            "schemas": [
            "urn:ietf:params:scim:schemas:core:2.0:ResourceType"
            ],
            "id": "Role",
            "name": "Role",
            "endpoint": "/Roles",
            "description": "Role",
            "schema": "urn:okta:scim:schemas:core:1.0:Role",
            "meta": {
                "location": "https://example.com/v2/ResourceTypes/Role",
                "resourceType": "ResourceType"
            }
        },

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
        },

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
    ]
}
~~~

#### Schemas

The following sample demonstrates a schema for an Entitlement property schema extension, where a custom profile property is defined for the Profile resourceType.

> **Note**: `isvname` is used as a placeholder in this schema. To ensure the uniqueness of your URNs and locations, replace it with the name of your organization or similar. 

~~~
{
    "schemas": [
      "urn:ietf:params:scim:api:messages:2.0:ListResponse"
    ],
    "totalResults": 1,
    "startIndex": 1,
    "itemsPerPage": 1,
    "Resources": [
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
    ]
}
~~~

#### Custom Entitlement with extensions

The following example demonstrates what the SCIM server might include in the response to a call to `/Licenses`. In this hypothetical example, two License resources are returned, where each License includes a Profile and a custom profile property.

~~~

{
    "schemas": [
      "urn:ietf:params:scim:api:messages:2.0:ListResponse"
    ],
    "totalResults": 2,
    "startIndex": 1,
    "itemsPerPage": 2,
    "Resources": [
        {
            "schemas": [
                "urn:okta:scim:schemas:core:1.0:Entitlement",
                "urn:<isvname>:scim:schemas:extension:<appname>:1.0:Profile"
            ],
            "type": "Profile",
            "id": "profile-123",
            "displayName": "Profile 123",
            "urn:<isvname>:scim:schemas:extension:<appname>:1.0:Profile": {
                "customProfileProperty": "test-value"
            }
        },
        {
            "schemas": [
                "urn:okta:scim:schemas:core:1.0:Entitlement",
                "urn:<isvname>:scim:schemas:extension:<appname>:1.0:Profile"
            ],
            "type": "Profile",
            "id": "profile-321",
            "displayName": "Profile 321",
            "urn:<isvname>:scim:schemas:extension:<appname>:1.0:Profile": {
                "customProfileProperty": "test-value"
            }
        }
    ]
}
~~~

### Role example

The following example demonstrates what the SCIM server might include in the response to a call to `/Roles`. In this hypothetical example, two Roles are returned.

```JSON
{
    "schemas": [
      "urn:ietf:params:scim:api:messages:2.0:ListResponse"
    ],
    "totalResults": 2,
    "startIndex": 1,
    "itemsPerPage": 2,
    "Resources": [
        {
            "schemas": [
                "urn:okta:scim:schemas:core:1.0:Role"
            ],
            "id": "role-1",
            "displayName": "First Role",
        },
        {
            "schemas": [
                "urn:okta:scim:schemas:core:1.0:Role"
            ],
            "id": "role-2",
            "displayName": "Second Role",
        }
    ]
}
~~~

### User with entitlements and roles

The following example demonstrates what the SCIM server might include in a User object. In this hypothetical example, two Users are returned, where the first has four entitlements and the second has none.

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
```

## See also

* [Okta and SCIM Version 2.0](/docs/reference/scim/scim-20/)
* [Create SCIM app integrations with Entitlement Management](https://help.okta.com/okta_help.htm?type=oie&id=ext-aiw-scim-entitlements)
