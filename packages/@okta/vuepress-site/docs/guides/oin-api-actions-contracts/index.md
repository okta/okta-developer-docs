---
title: API Integration Actions reference
meta:
  - name: description
    content: Provides references to API Integration Actions schema contracts inorder to create flows for API actions.
---

This reference provides the API Integration Actions schema contracts supported in the Integration Builder. Use them to create API action flows to your APIs.

## Universal Logout

The following are schema contracts for Universal Logout actions.

### Proprietary Universal Logout

The following are input (requests) and output (responses) for the **Proprietary Universal Logout** action.

#### Input

| **Property** | Description | Type | Required |
| ----- | ----- | ----- | ----- |
| **externalUserId** | The external user ID | string |  |
| **externalUserName** | The external username | string |  |
| **oktaUserId** | The Okta user ID | string |  |

#### Output

| **Property** | Description | Type |
| ----- | ----- | ----- |
| **executionStatus** | Execution result details for the logout request | object |
| **executionStatus.status** | Execution result state of the request (`SUCCEEDED` or `FAILED`) | string |
| **executionStatus.errors** | List of error objects returned when execution fails or partially fails | array |
| **executionStatus.errors[].code** | Error code identifier | string |
| **executionStatus.errors[].summary** | Human-readable summary of the error | string |
| **executionStatus.errors[].details** | More error details | array |
| **executionStatus.errors[].httpStatusCode** | HTTP status code associated with the error | integer |
| **executionStatus.errors[].requestId** | Request identifier associated with the error | string |
| **executionStatus.errors[].type** | Categorized error type (`RESOURCE_NOT_FOUND`, `RATE_LIMIT_EXCEEDED`, `INVALID_CREDENTIALS`, `TOKEN_EXPIRED`, `GENERIC_FAILURE`) | string |
| **logoutStatus** | Final logout outcome returned by the action (`SUCCESS` or `FAILURE`) | string |

## Provisioning action contracts

The following are schema contracts for provisioning actions, which also includes Entitlement Management.

### Provisioning Create User

This action schema contract is for provisioning users.

#### Input

| Property | Description | Type | Required|
| ----- | ----- | ----- | ----- |
| **user** | A SCIM user object | object |  |
| **user.schemas** | List of schemas for the user object | array | TRUE |
| **user.id** | The ID of the user | string | TRUE |
| **user.externalId** | External ID of the user, defined by the provisioning client | string |  |
| **user.userName** | A unique identifier for the user, typically used by the user to directly authenticate to the service provider. Each user must include a non-empty username value. This identifier must be unique across the service provider's entire set of users. Required. | string | TRUE |
| **user.name** | The components of the user's real name | object |  |
| **user.name.formatted** | The full name (including middle name, titles, and suffixes) that's formatted for display | string |  |
| **user.name.familyName** | The family name of the user | string |  |
| **user.name.givenName** | The given name of the user | string |  |
| **user.name.middleName** | The middle name of the user | string |  |
| **user.name.honorificPrefix** | The honorific prefix or title of the user | string |  |
| **user.name.honorificSuffix** | The honorific suffix of the user | string |  |
| **user.displayName** | The name of the user, suitable for display to end users | string |  |
| **user.nickName** | The casual way to address the user in real life | string |  |
| **user.profileUrl** | A fully qualified URL pointing to a page representing the user's online profile | string |  |
| **user.title** | The user's title, such as Vice President | string |  |
| **user.userType** | Identifies the relationship between the organization and the user | string |  |
| **user.preferredLanguage** | Indicates the user's preferred written or spoken language | string |  |
| **user.locale** | Indicates the user's default location for localization purposes | string |  |
| **user.timezone** | The user's time zone in Olson database format, for example America/Los_Angeles | string |  |
| **user.active** | A boolean value indicating the user's administrative status | boolean |  |
| **user.password** | The user's cleartext password used for initial set or reset | string |  |
| **user.emails** | Email addresses for the user | array |  |
| **user.emails[].value** | Email address value for the user | string |  |
| **user.emails[].display** | Human-readable display value for the email entry | string |  |
| **user.emails[].type** | Label indicating the email type, such as work or home | string |  |
| **user.emails[].primary** | Indicates whether this is the primary email value | boolean |  |
| **user.phoneNumbers** | Phone numbers for the user | array |  |
| **user.phoneNumbers[].value** | Phone number value for the user | string |  |
| **user.phoneNumbers[].display** | Human-readable display value for the phone entry | string |  |
| **user.phoneNumbers[].type** | Label indicating the phone type, such as work, home, or mobile | string |  |
| **user.phoneNumbers[].primary** | Indicates whether this is the primary phone number | boolean |  |
| **user.ims** | Instant messaging addresses for the user | array |  |
| **user.ims[].value** | Instant messaging address value for the user | string |  |
| **user.ims[].display** | Human-readable display value for the IM entry | string |  |
| **user.ims[].type** | Label indicating the IM type, such as aim or xmpp | string |  |
| **user.ims[].primary** | Indicates whether this is the primary IM value | boolean |  |
| **user.photos** | URLs of photos of the user | array |  |
| **user.photos[].value** | URL value for the photo entry | string |  |
| **user.photos[].display** | Human-readable display value for the photo entry | string |  |
| **user.photos[].type** | Label indicating photo type, such as photo or thumbnail | string |  |
| **user.photos[].primary** | Indicates whether this is the primary photo value | boolean |  |
| **user.addresses** | A physical mailing address for the user | array |  |
| **user.addresses[].formatted** | Full mailing address formatted for display | string |  |
| **user.addresses[].streetAddress** | Full street address component | string |  |
| **user.addresses[].locality** | City or locality component | string |  |
| **user.addresses[].region** | State or region component | string |  |
| **user.addresses[].postalCode** | ZIP or postal code component | string |  |
| **user.addresses[].country** | Country name component | string |  |
| **user.addresses[].type** | Label indicating address type, such as work or home | string |  |
| **user.addresses[].primary** | Indicates whether this is the primary address value | boolean |  |
| **user.groups** | A list of groups to which the user belongs | array |  |
| **user.groups[].value** | Identifier of the user's group | string |  |
| **user.groups[].ref** | URI of the corresponding group resource | string |  |
| **user.groups[].display** | Human-readable display value for the group entry | string |  |
| **user.groups[].type** | Label indicating group membership type | string |  |
| **user.entitlements** | A list of entitlements for the user | array |  |
| **user.entitlements[].value** | Entitlement value | string |  |
| **user.entitlements[].display** | Human-readable display value for the entitlement entry | string |  |
| **user.entitlements[].type** | Label indicating entitlement type | string |  |
| **user.entitlements[].primary** | Indicates whether this is the primary entitlement value | boolean |  |
| **user.roles** | A list of roles for the user | array |  |
| **user.roles[].value** | Role value | string |  |
| **user.roles[].display** | Human-readable display value for the role entry | string |  |
| **user.roles[].type** | Label indicating role type | string |  |
| **user.roles[].primary** | Indicates whether this is the primary role value | boolean |  |
| **user.x509Certificates** | A list of certificates issued to the user | array |  |
| **user.x509Certificates[].value** | X.509 certificate value | string |  |
| **user.x509Certificates[].display** | Human-readable display value for the certificate entry | string |  |
| **user.x509Certificates[].type** | Label indicating certificate type | string |  |
| **user.x509Certificates[].primary** | Indicates whether this is the primary certificate value | boolean |  |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User** | Enterprise user object schema | object |  |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.employeeNumber** | A string identifier assigned to a person by the organization | string |  |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.costCenter** | Name of the cost center | string |  |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.organization** | Name of the organization | string |  |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.division** | Name of the division | string |  |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.department** | Name of the department | string |  |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.manager** | Manager object for the user | object |  |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.manager.value** | ID of the SCIM resource representing the user's manager | string |  |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.manager.ref** | URI of the SCIM resource representing the user's manager | string |  |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.manager.displayName** | Display name of the user's manager | string |  |

#### Output

| Property | Description | Type |
| ----- | ----- | ----- |
| **user** | A SCIM user object | object |
| **user.schemas** | List of schemas for the user object | array |
| **user.id** | The ID of the user | string |
| **user.externalId** | External ID of the user, defined by the provisioning client | string |
| **user.userName** | Unique identifier for the user, typically used by the user to directly authenticate to the service provider. Each user must include a non-empty userName value. This identifier must be unique across the service provider's entire set of users. Required. | string |
| **user.name** | The components of the user's real name | object |
| **user.name.formatted** | The full name, including middle name, titles, and suffixes, formatted for display | string |
| **user.name.familyName** | The family name of the user | string |
| **user.name.givenName** | The given name of the user | string |
| **user.name.middleName** | The middle name of the user | string |
| **user.name.honorificPrefix** | The honorific prefix or title of the user | string |
| **user.name.honorificSuffix** | The honorific suffix of the user | string |
| **user.displayName** | The name of the user for display in the UI | string |
| **user.nickName** | The casual way to address the user in real life | string |
| **user.profileUrl** | A fully qualified URL pointing to a page representing the user's online profile | string |
| **user.title** | The user's title, such as Vice President | string |
| **user.userType** | Identifies the relationship between the organization and the user | string |
| **user.preferredLanguage** | Indicates the user's preferred written or spoken language | string |
| **user.locale** | Indicates the user's default location for localization purposes | string |
| **user.timezone** | The user's time zone in Olson database format, for example America/Los_Angeles | string |
| **user.active** | A Boolean value indicating the user's administrative status | boolean |
| **user.password** | The user's cleartext password used for initial set or reset | string |
| **user.emails** | Email addresses for the user | array |
| **user.emails[].value** | Email address value for the user | string |
| **user.emails[].display** | Human-readable display value for the email entry | string |
| **user.emails[].type** | Label indicating the email type, such as work or home | string |
| **user.emails[].primary** | Indicates whether this is the primary email value | boolean |
| **user.phoneNumbers** | Phone numbers for the user | array |
| **user.phoneNumbers[].value** | Phone number value for the user | string |
| **user.phoneNumbers[].display** | Human-readable display value for the phone entry | string |
| **user.phoneNumbers[].type** | Label indicating the phone type, such as work, home, or mobile | string |
| **user.phoneNumbers[].primary** | Indicates whether this is the primary phone number | boolean |
| **user.ims** | Instant messaging addresses for the user | array |
| **user.ims[].value** | Instant messaging address value for the user | string |
| **user.ims[].display** | Human-readable display value for the IM entry | string |
| **user.ims[].type** | Label indicating the IM type, such as aim or xmpp | string |
| **user.ims[].primary** | Indicates whether this is the primary IM value | boolean |
| **user.photos** | URLs of photos of the user | array |
| **user.photos[].value** | URL value for the photo entry | string |
| **user.photos[].display** | Human-readable display value for the photo entry | string |
| **user.photos[].type** | Label indicating photo type, such as photo or thumbnail | string |
| **user.photos[].primary** | Indicates whether this is the primary photo value | boolean |
| **user.addresses** | A physical mailing address for the user | array |
| **user.addresses[].formatted** | Full mailing address formatted for display | string |
| **user.addresses[].streetAddress** | Full street address component | string |
| **user.addresses[].locality** | City or locality component | string |
| **user.addresses[].region** | State or region component | string |
| **user.addresses[].postalCode** | ZIP or postal code component | string |
| **user.addresses[].country** | Country name component | string |
| **user.addresses[].type** | Label indicating address type, such as work or home | string |
| **user.addresses[].primary** | Indicates whether this is the primary address value | boolean |
| **user.groups** | A list of groups to which the user belongs | array |
| **user.groups[].value** | Identifier of the user's group | string |
| **user.groups[].ref** | URI of the corresponding group resource | string |
| **user.groups[].display** | Human-readable display value for the group entry | string |
| **user.groups[].type** | Label indicating group membership type | string |
| **user.entitlements** | A list of entitlements for the user | array |
| **user.entitlements[].value** | Entitlement value | string |
| **user.entitlements[].display** | Human-readable display value for the entitlement entry | string |
| **user.entitlements[].type** | Label indicating entitlement type | string |
| **user.entitlements[].primary** | Indicates whether this is the primary entitlement value | boolean |
| **user.roles** | A list of roles for the user | array |
| **user.roles[].value** | Role value | string |
| **user.roles[].display** | Human-readable display value for the role entry | string |
| **user.roles[].type** | Label indicating role type | string |
| **user.roles[].primary** | Indicates whether this is the primary role value | boolean |
| **user.x509Certificates** | A list of certificates issued to the user | array |
| **user.x509Certificates[].value** | X.509 certificate value | string |
| **user.x509Certificates[].display** | Human-readable display value for the certificate entry | string |
| **user.x509Certificates[].type** | Label indicating certificate type | string |
| **user.x509Certificates[].primary** | Indicates whether this is the primary certificate value | boolean |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User** | Enterprise user object schema | object |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.employeeNumber** | String identifier assigned to a person by the organization | string |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.costCenter** | Name of the cost center | string |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.organization** | Name of the organization | string |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.division** | Name of the division | string |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.department** | Name of the department | string |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.manager** | Manager object for the user | object |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.manager.value** | ID of the SCIM resource representing the user's manager | string |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.manager.ref** | URI of the SCIM resource representing the user's manager | string |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.manager.displayName** | Display name of the user's manager | string |
| **executionStatus** | Execution result details for the request | object |
| **executionStatus.status** | Execution result state of the request (`SUCCEEDED` or `FAILED`) | string |
| **executionStatus.errors** | List of error objects returned when execution fails or partially fails | array |
| **executionStatus.errors[].code** | Error code identifier | string |
| **executionStatus.errors[].summary** | Human-readable summary of the error | string |
| **executionStatus.errors[].details** | More error details | array |
| **executionStatus.errors[].details[]** | More error detail entry | string |
| **executionStatus.errors[].httpStatusCode** | HTTP status code associated with the error | integer |
| **executionStatus.errors[].requestId** | Request identifier associated with the error | string |
| **executionStatus.errors[].type** | Categorized error type (`RESOURCE_NOT_FOUND`, `RATE_LIMIT_EXCEEDED`, `INVALID_CREDENTIALS`, `TOKEN_EXPIRED`, `GENERIC_FAILURE`) | string |

### Provisioning Update User

This action schema contract is for provisioning users.

#### Input

| **Property** | Description | Type | Required |
| ----- | ----- | ----- | ----- |
| **user** | A SCIM user object | object |  |
| **user.schemas** | List of schemas for the user object | array | TRUE |
| **user.id** | The ID of the user | string | TRUE |
| **user.externalId** | External ID of the user, defined by the provisioning client | string |  |
| **user.userName** | A unique identifier for the user, typically used by the user to directly authenticate to the service provider. Each user must include a non-empty username value. This identifier must be unique across the service provider's entire set of users. Required. | string | TRUE |
| **user.name** | The components of the user's real name | object |  |
| **user.name.formatted** | The full name (including middle name, titles, and suffixes) that's formatted for display | string |  |
| **user.name.familyName** | The family name of the user | string |  |
| **user.name.givenName** | The given name of the user | string |  |
| **user.name.middleName** | The middle name of the user | string |  |
| **user.name.honorificPrefix** | The honorific prefix or title of the user | string |  |
| **user.name.honorificSuffix** | The honorific suffix of the user | string |  |
| **user.displayName** | The name of the user, suitable for display to end users | string |  |
| **user.nickName** | The casual way to address the user in real life | string |  |
| **user.profileUrl** | A fully qualified URL pointing to a page representing the user's online profile | string |  |
| **user.title** | The user's title, such as Vice President | string |  |
| **user.userType** | Identifies the relationship between the organization and the user | string |  |
| **user.preferredLanguage** | Indicates the user's preferred written or spoken language | string |  |
| **user.locale** | Indicates the user's default location for localization purposes | string |  |
| **user.timezone** | The user's time zone in Olson database format, for example America/Los_Angeles | string |  |
| **user.active** | A boolean value indicating the user's administrative status | boolean |  |
| **user.password** | The user's cleartext password used for initial set or reset | string |  |
| **user.emails** | Email addresses for the user | array |  |
| **user.emails[].value** | Email address value for the user | string |  |
| **user.emails[].display** | Human-readable display value for the email entry | string |  |
| **user.emails[].type** | Label indicating the email type, such as work or home | string |  |
| **user.emails[].primary** | Indicates whether this is the primary email value | boolean |  |
| **user.phoneNumbers** | Phone numbers for the user | array |  |
| **user.phoneNumbers[].value** | Phone number value for the user | string |  |
| **user.phoneNumbers[].display** | Human-readable display value for the phone entry | string |  |
| **user.phoneNumbers[].type** | Label indicating the phone type, such as work, home, or mobile | string |  |
| **user.phoneNumbers[].primary** | Indicates whether this is the primary phone number | boolean |  |
| **user.ims** | Instant messaging addresses for the user | array |  |
| **user.ims[].value** | Instant messaging address value for the user | string |  |
| **user.ims[].display** | Human-readable display value for the IM entry | string |  |
| **user.ims[].type** | Label indicating the IM type, such as aim or xmpp | string |  |
| **user.ims[].primary** | Indicates whether this is the primary IM value | boolean |  |
| **user.photos** | URLs of photos of the user | array |  |
| **user.photos[].value** | URL value for the photo entry | string |  |
| **user.photos[].display** | Human-readable display value for the photo entry | string |  |
| **user.photos[].type** | Label indicating photo type, such as photo or thumbnail | string |  |
| **user.photos[].primary** | Indicates whether this is the primary photo value | boolean |  |
| **user.addresses** | A physical mailing address for the user | array |  |
| **user.addresses[].formatted** | Full mailing address formatted for display | string |  |
| **user.addresses[].streetAddress** | Full street address component | string |  |
| **user.addresses[].locality** | City or locality component | string |  |
| **user.addresses[].region** | State or region component | string |  |
| **user.addresses[].postalCode** | ZIP or postal code component | string |  |
| **user.addresses[].country** | Country name component | string |  |
| **user.addresses[].type** | Label indicating address type, such as work or home | string |  |
| **user.addresses[].primary** | Indicates whether this is the primary address value | boolean |  |
| **user.groups** | A list of groups to which the user belongs | array |  |
| **user.groups[].value** | Identifier of the user's group | string |  |
| **user.groups[].ref** | URI of the corresponding group resource | string |  |
| **user.groups[].display** | Human-readable display value for the group entry | string |  |
| **user.groups[].type** | Label indicating group membership type | string |  |
| **user.entitlements** | A list of entitlements for the user | array |  |
| **user.entitlements[].value** | Entitlement value | string |  |
| **user.entitlements[].display** | Human-readable display value for the entitlement entry | string |  |
| **user.entitlements[].type** | Label indicating entitlement type | string |  |
| **user.entitlements[].primary** | Indicates whether this is the primary entitlement value | boolean |  |
| **user.roles** | A list of roles for the user | array |  |
| **user.roles[].value** | Role value | string |  |
| **user.roles[].display** | Human-readable display value for the role entry | string |  |
| **user.roles[].type** | Label indicating role type | string |  |
| **user.roles[].primary** | Indicates whether this is the primary role value | boolean |  |
| **user.x509Certificates** | A list of certificates issued to the user | array |  |
| **user.x509Certificates[].value** | X.509 certificate value | string |  |
| **user.x509Certificates[].display** | Human-readable display value for the certificate entry | string |  |
| **user.x509Certificates[].type** | Label indicating certificate type | string |  |
| **user.x509Certificates[].primary** | Indicates whether this is the primary certificate value | boolean |  |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User** | Enterprise user object schema | object |  |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.employeeNumber** | A string identifier assigned to a person by the organization | string |  |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.costCenter** | Name of the cost center | string |  |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.organization** | Name of the organization | string |  |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.division** | Name of the division | string |  |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.department** | Name of the department | string |  |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.manager** | Manager object for the user | object |  |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.manager.value** | ID of the SCIM resource representing the user's manager | string |  |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.manager.ref** | URI of the SCIM resource representing the user's manager | string |  |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.manager.displayName** | Display name of the user's manager | string |  |


#### Output

| Property | Description | Type |
| ----- | ----- | ----- |
| **user** | A SCIM user object | object |
| **user.schemas** | List of schemas for the user object | array |
| **user.id** | The ID of the user | string |
| **user.externalId** | External ID of the user, defined by the provisioning client | string |
| **user.userName** | A unique identifier for the user, typically used by the user to directly authenticate to the service provider. Each user must include a non-empty username value. This identifier must be unique across the service provider's entire set of users. Required. | string |
| **user.name** | The components of the user's real name | object |
| **user.name.formatted** | The full name (including middle names, titles, and suffixes) formatted for display | string |
| **user.name.familyName** | The family name of the user | string |
| **user.name.givenName** | The given name of the user | string |
| **user.name.middleName** | The middle name of the user | string |
| **user.name.honorificPrefix** | The honorific prefix or title of the user | string |
| **user.name.honorificSuffix** | The honorific suffix of the user | string |
| **user.displayName** | The name of the user, suitable for display to end users | string |
| **user.nickName** | The casual way to address the user in real life | string |
| **user.profileUrl** | A fully qualified URL pointing to a page representing the user's online profile | string |
| **user.title** | The user's title, such as Vice President | string |
| **user.userType** | Identifies the relationship between the organization and the user | string |
| **user.preferredLanguage** | Indicates the user's preferred written or spoken language | string |
| **user.locale** | Indicates the user's default location for localization purposes | string |
| **user.timezone** | The user's time zone in Olson database format, for example America/Los_Angeles | string |
| **user.active** | A boolean value indicating the user's administrative status | boolean |
| **user.password** | The user's cleartext password used for initial set or reset | string |
| **user.emails** | Email addresses for the user | array |
| **user.emails[].value** | Email address value for the user | string |
| **user.emails[].display** | Human-readable display value for the email entry | string |
| **user.emails[].type** | Label indicating the email type, such as work or home | string |
| **user.emails[].primary** | Indicates whether this is the primary email value | boolean |
| **user.phoneNumbers** | Phone numbers for the user | array |
| **user.phoneNumbers[].value** | Phone number value for the user | string |
| **user.phoneNumbers[].display** | Human-readable display value for the phone entry | string |
| **user.phoneNumbers[].type** | Label indicating the phone type, such as work, home, or mobile | string |
| **user.phoneNumbers[].primary** | Indicates whether this is the primary phone number | boolean |
| **user.ims** | Instant messaging addresses for the user | array |
| **user.ims[].value** | Instant messaging address value for the user | string |
| **user.ims[].display** | Human-readable display value for the IM entry | string |
| **user.ims[].type** | Label indicating the IM type, such as aim or xmpp | string |
| **user.ims[].primary** | Indicates whether this is the primary IM value | boolean |
| **user.photos** | URLs of photos of the user | array |
| **user.photos[].value** | URL value for the photo entry | string |
| **user.photos[].display** | Human-readable display value for the photo entry | string |
| **user.photos[].type** | Label indicating photo type, such as photo or thumbnail | string |
| **user.photos[].primary** | Indicates whether this is the primary photo value | boolean |
| **user.addresses** | A physical mailing address for the user | array |
| **user.addresses[].formatted** | Full mailing address formatted for display | string |
| **user.addresses[].streetAddress** | Full street address component | string |
| **user.addresses[].locality** | City or locality component | string |
| **user.addresses[].region** | State or region component | string |
| **user.addresses[].postalCode** | ZIP or postal code component | string |
| **user.addresses[].country** | Country name component | string |
| **user.addresses[].type** | Label indicating address type, such as work or home | string |
| **user.addresses[].primary** | Indicates whether this is the primary address value | boolean |
| **user.groups** | A list of groups to which the user belongs | array |
| **user.groups[].value** | Identifier of the user's group | string |
| **user.groups[].ref** | URI of the corresponding group resource | string |
| **user.groups[].display** | Human-readable display value for the group entry | string |
| **user.groups[].type** | Label indicating group membership type | string |
| **user.entitlements** | A list of entitlements for the user | array |
| **user.entitlements[].value** | Entitlement value | string |
| **user.entitlements[].display** | Human-readable display value for the entitlement entry | string |
| **user.entitlements[].type** | Label indicating entitlement type | string |
| **user.entitlements[].primary** | Indicates whether this is the primary entitlement value | boolean |
| **user.roles** | A list of roles for the user | array |
| **user.roles[].value** | Role value | string |
| **user.roles[].display** | Human-readable display value for the role entry | string |
| **user.roles[].type** | Label indicating role type | string |
| **user.roles[].primary** | Indicates whether this is the primary role value | boolean |
| **user.x509Certificates** | A list of certificates issued to the user | array |
| **user.x509Certificates[].value** | X.509 certificate value | string |
| **user.x509Certificates[].display** | Human-readable display value for the certificate entry | string |
| **user.x509Certificates[].type** | Label indicating certificate type | string |
| **user.x509Certificates[].primary** | Indicates whether this is the primary certificate value | boolean |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User** | Enterprise user object schema | object |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.employeeNumber** | A string identifier assigned to a person by the organization | string |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.costCenter** | Name of the cost center | string |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.organization** | Name of the organization | string |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.division** | Name of the division | string |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.department** | Name of the department | string |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.manager** | Manager object for the user | object |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.manager.value** | ID of the SCIM resource representing the user's manager | string |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.manager.ref** | URI of the SCIM resource representing the user's manager | string |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.manager.displayName** | Display name of the user's manager | string |
| **executionStatus** | Execution result details for the request | object |
| **executionStatus.status** | Execution result state of the request (`SUCCEEDED` or `FAILED`) | string |
| **executionStatus.errors** | List of error objects returned when execution fails or partially fails | array |
| **executionStatus.errors[].code** | Error code identifier | string |
| **executionStatus.errors[].summary** | Human-readable summary of the error | string |
| **executionStatus.errors[].details** | More error details | array |
| **executionStatus.errors[].details[]** | More error detail entry | string |
| **executionStatus.errors[].httpStatusCode** | HTTP status code associated with the error | integer |
| **executionStatus.errors[].requestId** | Request identifier associated with the error | string |
| **executionStatus.errors[].type** | Categorized error type (`RESOURCE_NOT_FOUND`, `RATE_LIMIT_EXCEEDED`, `INVALID_CREDENTIALS`, `TOKEN_EXPIRED`, `GENERIC_FAILURE`) | string |

### Provisioning Update User Password

This action schema contract is for provisioning users.

#### Input

| **Property** | Description | Type | Required |
| ----- | ----- | ----- | ----- |
| **userId** | ID of the user whose password is updated | string | TRUE |
| **password** | New password for the user | string | TRUE |

#### Output

| Property | Description | Type |
| ----- | ----- | ----- |
| **executionStatus** | Execution result details for the request | object |
| **executionStatus.status** | Execution result state of the request (`SUCCEEDED` or `FAILED`) | string |
| **executionStatus.errors** | List of error objects returned when execution fails or partially fails | array |
| **executionStatus.errors[].code** | Error code identifier | string |
| **executionStatus.errors[].summary** | Human-readable summary of the error | string |
| **executionStatus.errors[].details** | More error details | array |
| **executionStatus.errors[].details[]** | More error detail entry | string |
| **executionStatus.errors[].httpStatusCode** | HTTP status code associated with the error | integer |
| **executionStatus.errors[].requestId** | Request identifier associated with the error | string |
| **executionStatus.errors[].type** | Categorized error type (`RESOURCE_NOT_FOUND`, `RATE_LIMIT_EXCEEDED`, `INVALID_CREDENTIALS`, `TOKEN_EXPIRED`, `GENERIC_FAILURE`) | string |

### Provisioning Activate User

This action schema contract is for provisioning users.

#### Input

| **Property** | Description | Type | Required |
| ----- | ----- | ----- | ----- |
| **userId** | ID of the user to activate | string | TRUE |

#### Output

| Property | Description | Type |
| ----- | ----- | ----- |
| **executionStatus** | Execution result details for the request | object |
| **executionStatus.status** | Execution result state of the request (`SUCCEEDED` or `FAILED`) | string |
| **executionStatus.errors** | List of error objects returned when execution fails or partially fails | array |
| **executionStatus.errors[].code** | Error code identifier | string |
| **executionStatus.errors[].summary** | Human-readable summary of the error | string |
| **executionStatus.errors[].details** | More error details | array |
| **executionStatus.errors[].details[]** | More error detail entry | string |
| **executionStatus.errors[].httpStatusCode** | HTTP status code associated with the error | integer |
| **executionStatus.errors[].requestId** | Request identifier associated with the error | string |
| **executionStatus.errors[].type** | Categorized error type (`RESOURCE_NOT_FOUND`, `RATE_LIMIT_EXCEEDED`, `INVALID_CREDENTIALS`, `TOKEN_EXPIRED`, `GENERIC_FAILURE`) | string |

### Provisioning Deactivate User

This action schema contract is for provisioning users.

#### Input

| **Property** | Description | Type | Required |
| ----- | ----- | ----- | ----- |
| **userId** | ID of the user to deactivate | string | TRUE |

#### Output

| Property | Description | Type |
| ----- | ----- | ----- |
| **executionStatus** | Execution result details for the request | object |
| **executionStatus.status** | Execution result state of the request (`SUCCEEDED` or `FAILED`) | string |
| **executionStatus.errors** | List of error objects returned when execution fails or partially fails | array |
| **executionStatus.errors[].code** | Error code identifier | string |
| **executionStatus.errors[].summary** | Human-readable summary of the error | string |
| **executionStatus.errors[].details** | More error details | array |
| **executionStatus.errors[].details[]** | More error detail entry | string |
| **executionStatus.errors[].httpStatusCode** | HTTP status code associated with the error | integer |
| **executionStatus.errors[].requestId** | Request identifier associated with the error | string |
| **executionStatus.errors[].type** | Categorized error type (`RESOURCE_NOT_FOUND`, `RATE_LIMIT_EXCEEDED`, `INVALID_CREDENTIALS`, `TOKEN_EXPIRED`, `GENERIC_FAILURE`) | string |

### Provisioning Get User by ID

This action schema contract is for provisioning users.

#### Input

| **Property** | Description | Type | Required |
| ----- | ----- | ----- | ----- |
| **userId** | ID of the user to retrieve | string | TRUE |

#### Output

| Property | Description | Type |
| ----- | ----- | ----- |
| **user** | A SCIM user object | object |
| **user.schemas** | List of schemas for the user object. Required. | array |
| **user.id** | The ID of the user. Required. | string |
| **user.externalId** | External ID of the user, defined by the provisioning client | string |
| **user.userName** | A unique identifier for the user, typically used by the user to directly authenticate to the service provider. Each user must include a non-empty username value. This identifier must be unique across the service provider's entire set of users. Required. | string |
| **executionStatus** | Execution result details for the request | object |
| **executionStatus.status** | Execution result state of the request (`SUCCEEDED` or `FAILED`) | string |
| **executionStatus.errors** | List of error objects returned when execution fails or partially fails | array |
| **executionStatus.errors[].code** | Error code identifier | string |
| **executionStatus.errors[].summary** | Human-readable summary of the error | string |
| **executionStatus.errors[].details** | More error details | array |
| **executionStatus.errors[].details[]** | More error detail entry | string |
| **executionStatus.errors[].httpStatusCode** | HTTP status code associated with the error | integer |
| **executionStatus.errors[].requestId** | Request identifier associated with the error | string |
| **executionStatus.errors[].type** | Categorized error type (`RESOURCE_NOT_FOUND`, `RATE_LIMIT_EXCEEDED`, `INVALID_CREDENTIALS`, `TOKEN_EXPIRED`, `GENERIC_FAILURE`) | string |

### Provisioning Get User by UserName

This action schema contract is for provisioning users.

#### Input

| **Property** | Description | Type | Required |
| ----- | ----- | ----- | ----- |
| **userName** | A unique username of the user to retrieve | string | TRUE |

#### Output

| Property | Description | Type |
| ----- | ----- | ----- |
| **user** | A SCIM user object | object |
| **user.schemas** | List of schemas for the user object | array |
| **user.id** | The ID of the user | string |
| **user.externalId** | External ID of the user, defined by the provisioning client | string |
| **user.userName** | A unique identifier for the user, typically used by the user to directly authenticate to the service provider. Each user must include a non-empty username value. This identifier must be unique across the service provider's entire set of users. Required. | string |
| **user.name** | Components of the user's name | object |
| **user.name.formatted** | Full name formatted for display | string |
| **user.name.familyName** | Family name of the user (last name) | string |
| **user.name.givenName** | Given name of the user (first name) | string |
| **user.name.middleName** | Middle name of the user | string |
| **user.name.honorificPrefix** | Honorific prefix or title of the user  | string |
| **user.name.honorificSuffix** | Honorific suffix of the user | string |
| **user.displayName** | Display name suitable for end users | string |
| **user.nickName** | Casual name used to address the user | string |
| **user.profileUrl** | Fully qualified URL to the user profile page | string (URI) |
| **user.title** | User title, such as vice president | string |
| **user.userType** | Relationship type between the organization and the user | string |
| **user.preferredLanguage** | Preferred written or spoken language | string |
| **user.locale** | Default locale for formatting and localization | string |
| **user.timezone** | User time zone in olson format | string |
| **user.active** | Administrative status of the user | boolean |
| **user.password** | Cleartext password used for create/reset operations | string |
| **user.emails** | Email addresses for the user | array |
| **user.emails[]** | User email object | object |
| **user.emails[].value** | Email address value | string |
| **user.emails[].display** | Human-readable display value (read-only) | string |
| **user.emails[].type** | Label of email function (for example, work/home) | string |
| **user.emails[].primary** | Whether this is the primary email value | boolean |
| **user.phoneNumbers** | Phone numbers for the user | array |
| **user.phoneNumbers[]** | User phone number object | object |
| **user.phoneNumbers[].value** | Phone number value | string |
| **user.phoneNumbers[].display** | Human-readable display value (read-only) | string |
| **user.phoneNumbers[].type** | Label of phone function (for example, work/home/mobile) | string |
| **user.phoneNumbers[].primary** | Whether this is the primary phone number value | boolean |
| **user.ims** | Instant messaging addresses for the user | array |
| **user.ims[]** | User im object | object |
| **user.ims[].value** | Instant messaging address value | string |
| **user.ims[].display** | Human-readable display value (read-only) | string |
| **user.ims[].type** | Label of im function (for example, aim/gtalk/xmpp) | string |
| **user.ims[].primary** | Whether this is the primary im value | boolean |
| **user.photos** | Photo URLs for the user | array |
| **user.photos[]** | User photo object | object |
| **user.photos[].value** | Photo URL value | string (URI) |
| **user.photos[].display** | Display text for the photo entry | string |
| **user.photos[].type** | Label of photo function (photo/thumbnail) | string |
| **user.photos[].primary** | Whether this is the primary photo value | boolean |
| **user.addresses** | Physical mailing addresses for the user | array |
| **user.addresses[]** | User address object | object |
| **user.addresses[].formatted** | Full address formatted for display | string |
| **user.addresses[].streetAddress** | Full street address component | string |
| **user.addresses[].locality** | City or locality component | string |
| **user.addresses[].region** | State or region component | string |
| **user.addresses[].postalCode** | Zip/postal code component | string |
| **user.addresses[].country** | Country name component | string |
| **user.addresses[].type** | Label of address function (for example, work/home) | string |
| **user.addresses[].primary** | Whether this is the primary address value | boolean |
| **user.groups** | Groups the user belongs to | array |
| **user.groups[]** | User group object | object |
| **user.groups[].value** | Group identifier | string |
| **user.groups[].ref** | URI of the related group resource | string (URI) |
| **user.groups[].display** | Display text for the group entry | string |
| **user.groups[].type** | Label of group membership function (for example, direct/indirect) | string |
| **user.entitlements** | Entitlements assigned to the user | array |
| **user.entitlements[]** | User entitlement object | object |
| **user.entitlements[].value** | Entitlement value | string |
| **user.entitlements[].display** | Display text for the entitlement entry | string |
| **user.entitlements[].type** | Label of entitlement function | string |
| **user.entitlements[].primary** | Whether this is the primary entitlement value | boolean |
| **user.roles** | Roles assigned to the user | array |
| **user.roles[]** | User role object | object |
| **user.roles[].value** | Role value | string |
| **user.roles[].display** | Display text for the role entry | string |
| **user.roles[].type** | Label of role function | string |
| **user.roles[].primary** | Whether this is the primary role value | boolean |
| **user.x509Certificates** | Certificates issued to the user | array |
| **user.x509Certificates[]** | User certificate object | object |
| **user.x509Certificates[].value** | X.509 certificate value | string |
| **user.x509Certificates[].display** | Label describing the certificate entry type | string |
| **user.x509Certificates[].type** | Label of certificate function | string |
| **user.x509Certificates[].primary** | Whether this is the primary certificate value | boolean |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User** | Enterprise user extension object | object |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.employeeNumber** | Employee number identifier | string |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.costCenter** | Cost center name | string |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.organization** | Organization name | string |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.division** | Division name | string |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.department** | Department name | string |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.manager** | Manager object for organizational hierarchy | object |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.manager.value** | Id of the manager SCIM resource | string |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.manager.ref** | URI of the manager SCIM resource | string (URI) |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.manager.displayName** | Display name of the manager | string |
| **executionStatus** | Execution result details for the request | object |
| **executionStatus.status** | Execution result state of the request (`SUCCEEDED` or `FAILED`) | string |
| **executionStatus.errors** | List of error objects returned when execution fails or partially fails | array |
| **executionStatus.errors[].code** | Error code identifier | string |
| **executionStatus.errors[].summary** | Human-readable summary of the error | string |
| **executionStatus.errors[].details** | More error details | array |
| **executionStatus.errors[].details[]** | More error detail entry | string |
| **executionStatus.errors[].httpStatusCode** | HTTP status code associated with the error | integer |
| **executionStatus.errors[].requestId** | Request identifier associated with the error | string |
| **executionStatus.errors[].type** | Categorized error type (`RESOURCE_NOT_FOUND`, `RATE_LIMIT_EXCEEDED`, `INVALID_CREDENTIALS`, `TOKEN_EXPIRED`, `GENERIC_FAILURE`) | string |

### Provisioning List Users

This action schema contract is for provisioning users.

#### Input

| **Property** | Description | Type | Required |
| ----- | ----- | ----- | ----- |
| **pagination** | Pagination object for list users requests | object |  |
| **pagination.cursor** | Cursor used to continue listing users from a specific position | string |  |
| **pagination.limit** | Maximum number of users to return in the response | integer |  |

#### Output

| Property | Description | Type |
| ----- | ----- | ----- |
| **resources** | List of user objects returned by the request | array |
| **resources[].schemas** | List of schemas for the user object | array |
| **resources[].id** | The ID of the user | string |
| **resources[].externalId** | External ID of the user, defined by the provisioning client | string |
| **resources[].userName** | Unique identifier for the user, typically used by the user to directly authenticate to the service provider. Each user must include a non-empty username value. This identifier must be unique across the service provider's entire set of users. Required. | string |
| **resources[].name** | Components of the user's name | object |
| **resources[].name.formatted** | Full name formatted for display including middle names, titles, and suffixes | string |
| **resources[].name.familyName** | Family name of the user | string |
| **resources[].name.givenName** | Given name of the user | string |
| **resources[].name.middleName** | Middle name of the user | string |
| **resources[].name.honorificPrefix** | Honorific prefix or title of the user | string |
| **resources[].name.honorificSuffix** | Honorific suffix of the user | string |
| **resources[].displayName** | Display name suitable for end users | string |
| **resources[].nickName** | Casual name used to address the user | string |
| **resources[].profileUrl** | Fully qualified URL to the user profile page | string |
| **resources[].title** | Title of the user | string |
| **resources[].userType** | Relationship type between the organization and the user | string |
| **resources[].preferredLanguage** | Preferred written or spoken language of the user | string |
| **resources[].locale** | Locale used for localization preferences | string |
| **resources[].timezone** | Timezone of the user in olson format | string |
| **resources[].active** | Administrative status of the user | boolean |
| **resources[].password** | Cleartext password value used for initial set or reset | string |
| **resources[].emails** | Email entries for the user | array |
| **resources[].emails[].value** | Email address value | string |
| **resources[].emails[].display** | display text for the email entry | string |
| **resources[].emails[].type** | Label describing the email entry type | string |
| **resources[].emails[].primary** | Whether the email entry is primary | boolean |
| **resources[].phoneNumbers** | Phone number entries for the user | array |
| **resources[].phoneNumbers[].value** | Phone number value | string |
| **resources[].phoneNumbers[].display** | Display text for the phone number entry | string |
| **resources[].phoneNumbers[].type** | Label describing the phone number entry type | string |
| **resources[].phoneNumbers[].primary** | Whether the phone number entry is primary | boolean |
| **resources[].ims** | Instant messaging entries for the user | array |
| **resources[].ims[].value** | Instant messaging address value | string |
| **resources[].ims[].display** | Display text for the im entry | string |
| **resources[].ims[].type** | Label describing the im entry type | string |
| **resources[].ims[].primary** | Whether the im entry is primary | boolean |
| **resources[].photos** | Photo entries for the user | array |
| **resources[].photos[].value** | URL value of the photo | string |
| **resources[].photos[].display** | Display text for the photo entry | string |
| **resources[].photos[].type** | Label describing the photo entry type | string |
| **resources[].photos[].primary** | Whether the photo entry is primary | boolean |
| **resources[].addresses** | Physical mailing address entries for the user | array |
| **resources[].addresses[].formatted** | Full mailing address formatted for display | string |
| **resources[].addresses[].streetAddress** | Street address component | string |
| **resources[].addresses[].locality** | City or locality component | string |
| **resources[].addresses[].region** | State or region component | string |
| **resources[].addresses[].postalCode** | Postal code component | string |
| **resources[].addresses[].country** | Country component | string |
| **resources[].addresses[].type** | Label describing the address entry type | string |
| **resources[].addresses[].primary** | Whether the address entry is primary | boolean |
| **resources[].groups** | Group membership entries for the user | array |
| **resources[].groups[].value** | Identifier of the user group | string |
| **resources[].groups[].ref** | URI of the related group resource | string |
| **resources[].groups[].display** | Display text for the group entry | string |
| **resources[].groups[].type** | Label describing the group membership type | string |
| **resources[].entitlements** | Entitlement entries for the user | array |
| **resources[].entitlements[].value** | Entitlement value | string |
| **resources[].entitlements[].display** | Display text for the entitlement entry | string |
| **resources[].entitlements[].type** | Label describing the entitlement entry type | string |
| **resources[].entitlements[].primary** | Whether the entitlement entry is primary | boolean |
| **resources[].roles** | Role entries for the user | array |
| **resources[].roles[].value** | Role value | string |
| **resources[].roles[].display** | Display text for the role entry | string |
| **resources[].roles[].type** | Label describing the role entry type | string |
| **resources[].roles[].primary** | Whether the role entry is primary | boolean |
| **resources[].x509Certificates** | X.509 certificate entries for the user | array |
| **resources[].x509Certificates[].value** | X.509 certificate value | string |
| **resources[].x509Certificates[].display** | Display text for the certificate entry | string |
| **resources[].x509Certificates[].type** | Label describing the certificate entry type | string |
| **resources[].x509Certificates[].primary** | Whether the certificate entry is primary | boolean |
| **resources[].urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User** | Enterprise user extension object | object |
| **resources[].urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.employeeNumber** | Employee number identifier | string |
| **resources[].urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.costCenter** | Cost center name | string |
| **resources[].urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.organization** | Organization name | string |
| **resources[].urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.division** | Division name | string |
| **resources[].urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.department** | Department name | string |
| **resources[].urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.manager** | Manager object for the user | object |
| **resources[].urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.manager.value** | Id of the manager scim resource | string |
| **resources[].urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.manager.ref** | URI of the manager scim resource | string |
| **resources[].urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.manager.displayName** | Display name of the manager | string |
| **pagination** | Pagination details for the response | object |
| **pagination.nextCursor** | Cursor for retrieving the next page of users | string |
| **executionStatus** | Execution result details for the request | object |
| **executionStatus.status** | Execution result state of the request (`SUCCEEDED` or `FAILED`) | string |
| **executionStatus.errors** | List of error objects returned when execution fails or partially fails | array |
| **executionStatus.errors[].code** | Error code identifier | string |
| **executionStatus.errors[].summary** | Human-readable summary of the error | string |
| **executionStatus.errors[].details** | More error details | array |
| **executionStatus.errors[].details[]** | More error detail entry | string |
| **executionStatus.errors[].httpStatusCode** | HTTP status code associated with the error | integer |
| **executionStatus.errors[].requestId** | Request identifier associated with the error | string |
| **executionStatus.errors[].type** | Categorized error type (`RESOURCE_NOT_FOUND`, `RATE_LIMIT_EXCEEDED`, `INVALID_CREDENTIALS`, `TOKEN_EXPIRED`, `GENERIC_FAILURE`) | string |

### Provisioning Create Group

This action schema contract is for provisioning users.

#### Input

| Property | Description | Type | Required |
| ----- | ----- | ----- | ----- |
| **group** | group object for provisioning operations | object |  |
| **group.schemas** | List of schemas for the group object | array | TRUE |
| **group.id** | The ID of the group | string |  |
| **group.displayName** | A human-readable name for the group. Required. | string | TRUE |
| **group.description** | Group description | string |  |

#### Output

| Property | Description | Type |
| ----- | ----- | ----- |
| **group** | A SCIM group object | object |
| **group.schemas** | List of schemas for the group object | array |
| **group.id** | The ID of the group | string |
| **group.displayName** | A human-readable name for the group. Required. | string |
| **group.description** | Group description | string |
| **executionStatus** | Execution result details for the request | object |
| **executionStatus.status** | Execution result state of the request (`SUCCEEDED` or `FAILED`) | string |
| **executionStatus.errors** | List of error objects returned when execution fails or partially fails | array |
| **executionStatus.errors[].code** | Error code identifier | string |
| **executionStatus.errors[].summary** | Human-readable summary of the error | string |
| **executionStatus.errors[].details** | More error details | array |
| **executionStatus.errors[].details[]** | More error detail entry | string |
| **executionStatus.errors[].httpStatusCode** | HTTP status code associated with the error | integer |
| **executionStatus.errors[].requestId** | Request identifier associated with the error | string |
| **executionStatus.errors[].type** | Categorized error type (`RESOURCE_NOT_FOUND`, `RATE_LIMIT_EXCEEDED`, `INVALID_CREDENTIALS`, `TOKEN_EXPIRED`, `GENERIC_FAILURE`) | string |

### Provisioning Update Group

This action schema contract is for provisioning groups.

#### Input

| Property | Description | Type | Required |
| ----- | ----- | ----- | ----- |
| **group** | group object for provisioning operations | object |  |
| **group.schemas** | List of schemas for the group object | array | TRUE |
| **group.id** | The ID of the group | string |  |
| **group.displayName** | A human-readable name for the group. Required. | string | TRUE |
| **group.description** | Group description | string |  |

#### Output

| Property | Description | Type |
| ----- | ----- | ----- |
| **group** | A SCIM group object | object |
| **group.schemas** | List of schemas for the group object | array |
| **group.id** | The ID of the group | string |
| **group.displayName** | A human-readable name for the group. Required. | string |
| **group.description** | Group description | string |
| **executionStatus** | Execution result details for the request | object |
| **executionStatus.status** | Execution result state of the request (`SUCCEEDED` or `FAILED`) | string |
| **executionStatus.errors** | List of error objects returned when execution fails or partially fails | array |
| **executionStatus.errors[].code** | Error code identifier | string |
| **executionStatus.errors[].summary** | Human-readable summary of the error | string |
| **executionStatus.errors[].details** | More error details | array |
| **executionStatus.errors[].details[]** | More error detail entry | string |
| **executionStatus.errors[].httpStatusCode** | HTTP status code associated with the error | integer |
| **executionStatus.errors[].requestId** | Request identifier associated with the error | string |
| **executionStatus.errors[].type** | Categorized error type (`RESOURCE_NOT_FOUND`, `RATE_LIMIT_EXCEEDED`, `INVALID_CREDENTIALS`, `TOKEN_EXPIRED`, `GENERIC_FAILURE`) | string |

### Provisioning Remove Group

This action schema contract is for provisioning groups.

#### Input

| Property | Description | Type | Required |
| ----- | ----- | ----- | ----- |
| **groupId** | ID of the group to remove | string | TRUE |

#### Output

| Property | Description | Type |
| ----- | ----- | ----- |
| **executionStatus** | Execution result details for the request | object |
| **executionStatus.status** | Execution result state of the request (`SUCCEEDED` or `FAILED`) | string |
| **executionStatus.errors** | List of error objects returned when execution fails or partially fails | array |
| **executionStatus.errors[].code** | Error code identifier | string |
| **executionStatus.errors[].summary** | Human-readable summary of the error | string |
| **executionStatus.errors[].details** | More error details | array |
| **executionStatus.errors[].details[]** | More error detail entry | string |
| **executionStatus.errors[].httpStatusCode** | HTTP status code associated with the error | integer |
| **executionStatus.errors[].requestId** | Request identifier associated with the error | string |
| **executionStatus.errors[].type** | Categorized error type (`RESOURCE_NOT_FOUND`, `RATE_LIMIT_EXCEEDED`, `INVALID_CREDENTIALS`, `TOKEN_EXPIRED`, `GENERIC_FAILURE`) | string |

### Provisioning Add Group Members

This action schema contract is for provisioning groups.

#### Input

| Property | Description | Type | Required |
| ----- | ----- | ----- | ----- |
| **groupId** | Identifier of the group | string | TRUE |
| **groupMembers** | List of group member objects to add | array | TRUE |
| **groupMembers[].value** | Identifier of the member of this group | string | TRUE |
| **groupMembers[].display** | The display name for this group member object | string |  |

#### Output

| Property | Description | Type |
| ----- | ----- | ----- |
| **executionStatus** | Execution result details for the request | object |
| **executionStatus.status** | Execution result state of the request (`SUCCEEDED` or `FAILED`) | string |
| **executionStatus.errors** | List of error objects returned when execution fails or partially fails | array |
| **executionStatus.errors[].code** | Error code identifier | string |
| **executionStatus.errors[].summary** | Human-readable summary of the error | string |
| **executionStatus.errors[].details** | More error details | array |
| **executionStatus.errors[].details[]** | More error detail entry | string |
| **executionStatus.errors[].httpStatusCode** | HTTP status code associated with the error | integer |
| **executionStatus.errors[].requestId** | Request identifier associated with the error | string |
| **executionStatus.errors[].type** | Categorized error type (`RESOURCE_NOT_FOUND`, `RATE_LIMIT_EXCEEDED`, `INVALID_CREDENTIALS`, `TOKEN_EXPIRED`, `GENERIC_FAILURE`) | string |

### Provisioning Remove Group Members

This action schema contract is for provisioning groups.

#### Input

| Property | Description | Type | Required |
| ----- | ----- | ----- | ----- |
| **groupId** | Identifier of the group | string | TRUE |
| **groupMembers** | List of group member objects to remove | array | TRUE |
| **groupMembers[].value** | Identifier of the member of this group | string | TRUE |
| **groupMembers[].display** | The display name for this group member object | string |  |

#### Output

| Property | Description | Type |
| ----- | ----- | ----- |
| **executionStatus** | Execution result details for the request | object |
| **executionStatus.status** | Execution result state of the request (`SUCCEEDED` or `FAILED`) | string |
| **executionStatus.errors** | List of error objects returned when execution fails or partially fails | array |
| **executionStatus.errors[].code** | Error code identifier | string |
| **executionStatus.errors[].summary** | Human-readable summary of the error | string |
| **executionStatus.errors[].details** | More error details | array |
| **executionStatus.errors[].details[]** | More error detail entry | string |
| **executionStatus.errors[].httpStatusCode** | HTTP status code associated with the error | integer |
| **executionStatus.errors[].requestId** | Request identifier associated with the error | string |
| **executionStatus.errors[].type** | Categorized error type (`RESOURCE_NOT_FOUND`, `RATE_LIMIT_EXCEEDED`, `INVALID_CREDENTIALS`, `TOKEN_EXPIRED`, `GENERIC_FAILURE`) | string |

### Provisioning List Group Members

This action schema contract is for provisioning groups.

#### Input

| Property | Description | Type | Required |
| ----- | ----- | ----- | ----- |
| **groupId** | Identifier of the group | string | TRUE |
| **pagination** | Pagination object for list requests | object |  |
| **pagination.cursor** | Cursor used to continue listing members from a specific position | string |  |
| **pagination.limit** | Maximum number of members to return in the response | integer |  |

#### Output

| Property | Description | Type |
| ----- | ----- | ----- |
| **resources** | List of group member objects returned by the request | array |
| **resources[].value** | Identifier of the member of this group | string |
| **resources[].display** | The display name for this group member object | string |
| **pagination** | Pagination details for the response | object |
| **pagination.nextCursor** | Cursor for retrieving the next page of members | string |
| **executionStatus** | Execution result details for the request | object |
| **executionStatus.status** | Execution result state of the request (`SUCCEEDED` or `FAILED`) | string |
| **executionStatus.errors** | List of error objects returned when execution fails or partially fails | array |
| **executionStatus.errors[].code** | Error code identifier | string |
| **executionStatus.errors[].summary** | Human-readable summary of the error | string |
| **executionStatus.errors[].details** | More error details | array |
| **executionStatus.errors[].details[]** | More error detail entry | string |
| **executionStatus.errors[].httpStatusCode** | HTTP status code associated with the error | integer |
| **executionStatus.errors[].requestId** | Request identifier associated with the error | string |
| **executionStatus.errors[].type** | Categorized error type (`RESOURCE_NOT_FOUND`, `RATE_LIMIT_EXCEEDED`, `INVALID_CREDENTIALS`, `TOKEN_EXPIRED`, `GENERIC_FAILURE`) | string |

### Provisioning Get Group by ID

This action schema contract is for provisioning groups.

#### Input

| Property | Description | Type | Required |
| ----- | ----- | ----- | ----- |
| **groupId** | Identifier of the group | string | TRUE |

#### Output

| Property | Description | Type |
| ----- | ----- | ----- |
| **group** | A SCIM group object | object |
| **group.schemas** | List of schemas for the group object | array |
| **group.id** | The ID of the group | string |
| **group.displayName** | A human-readable name for the group | string |
| **group.description** | Group description | string |
| **executionStatus** | Execution status of the action | object |
| **executionStatus.status** | Outcome of the action (`SUCCEEDED`, `FAILED`) | string |
| **executionStatus.errors[]** | List of errors that occurred during the action | array |
| **executionStatus.errors[].code** | Error code | string |
| **executionStatus.errors[].summary** | Summary of the error | string |
| **executionStatus.errors[].details[]** | Details of the error | array |
| **executionStatus.errors[].httpStatusCode** | HTTP status code associated with the error | integer |
| **executionStatus.errors[].requestId** | Request identifier associated with the error | string |
| **executionStatus.errors[].type** | Categorized error type (`RESOURCE_NOT_FOUND`, `RATE_LIMIT_EXCEEDED`, `INVALID_CREDENTIALS`, `TOKEN_EXPIRED`, `GENERIC_FAILURE`) | string |

### Provisioning List Groups

This action schema contract is for provisioning groups.

#### Input

| Property | Description | Type | Required |
| ----- | ----- | ----- | ----- |
| **pagination** | Pagination object | object | |
| **pagination.cursor** | Cursor for the next page of results | string | |
| **pagination.limit** | Maximum number of results to return | integer | |

#### Output


| Property | Description | Type |
| ----- | ----- | ----- |
| **resources[]** | List of SCIM group objects | array |
| **resources[].schemas** | List of schemas for the group object | array |
| **resources[].id** | The ID of the group | string |
| **resources[].displayName** | A human-readable name for the group | string |
| **resources[].description** | Group description | string |
| **pagination** | Pagination object | object |
| **pagination.nextCursor** | Cursor for the next page of results | string |
| **executionStatus** | Execution status of the action | object |
| **executionStatus.status** | Outcome of the action (`SUCCEEDED`, `FAILED`) | string |
| **executionStatus.errors[]** | List of errors that occurred during the action | array |
| **executionStatus.errors[].code** | Error code | string |
| **executionStatus.errors[].summary** | Summary of the error | string |
| **executionStatus.errors[].details[]** | Details of the error | array |
| **executionStatus.errors[].httpStatusCode** | HTTP status code associated with the error | integer |
| **executionStatus.errors[].requestId** | Request identifier associated with the error | string |
| **executionStatus.errors[].type** | Categorized error type (`RESOURCE_NOT_FOUND`, `RATE_LIMIT_EXCEEDED`, `INVALID_CREDENTIALS`, `TOKEN_EXPIRED`, `GENERIC_FAILURE`) | string |

### Provisioning List Groups by Display Name

This action schema contract is for provisioning groups.

#### Input

| Property | Description | Type | Required |
| ----- | ----- | ----- | ----- |
| **displayName** | Display name of the group | string | TRUE |
| **pagination** | Pagination object | object | |
| **pagination.cursor** | Cursor for the next page of results | string | |
| **pagination.limit** | Maximum number of results to return | integer | |

#### Output

| Property | Description | Type |
| ----- | ----- | ----- |
| **resources[]** | List of SCIM group objects | array |
| **resources[].schemas** | List of schemas for the group object | array |
| **resources[].id** | The ID of the group | string |
| **resources[].displayName** | A human-readable name for the group | string |
| **resources[].description** | Group description | string |
| **pagination** | Pagination object | object |
| **pagination.nextCursor** | Cursor for the next page of results | string |
| **executionStatus** | Execution status of the action | object |
| **executionStatus.status** | Outcome of the action (`SUCCEEDED`, `FAILED`) | string |
| **executionStatus.errors[]** | List of errors that occurred during the action | array |
| **executionStatus.errors[].code** | Error code | string |
| **executionStatus.errors[].summary** | Summary of the error | string |
| **executionStatus.errors[].details[]** | Details of the error | array |
| **executionStatus.errors[].httpStatusCode** | HTTP status code associated with the error | integer |
| **executionStatus.errors[].requestId** | Request identifier associated with the error | string |
| **executionStatus.errors[].type** | Categorized error type (`RESOURCE_NOT_FOUND`, `RATE_LIMIT_EXCEEDED`, `INVALID_CREDENTIALS`, `TOKEN_EXPIRED`, `GENERIC_FAILURE`) | string |

### Provisioning List User Schema

This action schema contract is for provisioning Entitlement Management.

#### Input

| Property | Description | Type | Required |
| ----- | ----- | ----- | ----- |
| **scim** | SCIM server configuration | object | |
| **scim.baseUri** | The base URL of the SCIM server | string | TRUE |
| **scim.authMode** | Authentication mode of the SCIM server (`header`, `bearer`, `oauth`) | string | TRUE |
| **scim.entitlementTypes[]** | List of entitlement types supported by the SCIM server | array | TRUE |
| **scim.entitlementTypes[].name** | Entitlement type name | string | TRUE |
| **scim.entitlementTypes[].endpoint** | The resource type's HTTP-addressable endpoint relative to the base URL | string | TRUE |
| **scim.entitlementTypes[].description** | The resource type's human-readable description | string | |
| **scim.entitlementTypes[].attributes** | The attributes of the resource type | object | |
| **scim.entitlementTypes[].attributes.required** | Whether this entitlement attribute is required | boolean | |
| **scim.entitlementTypes[].attributes.multiValued** | Whether this entitlement attribute can have multiple values | boolean | |
| **scim.entitlementTypes[].mappings** | Schema mappings for the entitlement type | object | TRUE |
| **scim.entitlementTypes[].mappings.idField** | The name of the field that contains the unique identifier for the entitlement | string | TRUE |
| **scim.entitlementTypes[].mappings.displayNameField** | The name of the field that contains the display name for the entitlement | string | TRUE |
| **scim.entitlementTypes[].mappings.descriptionField** | The name of the field that contains the description of the entitlement | string | |
| **pagination** | Pagination object | object | |
| **pagination.cursor** | Cursor for the next page of results | string | |
| **pagination.limit** | Maximum number of results to return | integer | |

#### Output

| Property | Description | Type |
| ----- | ----- | ----- |
| **schemaProperties[]** | List of schema property definitions | array |
| **schemaProperties[].name** | Name of the schema property | string |
| **schemaProperties[].title** | Display title of the schema property | string |
| **schemaProperties[].externalName** | External name of the schema property | string |
| **schemaProperties[].externalNamespace** | External namespace of the schema property | string |
| **schemaProperties[].description** | Description of the schema property | string |
| **schemaProperties[].required** | Whether the schema property is required | boolean |
| **schemaProperties[].propertyType** | Data type of the schema property (`STRING`, `NUMBER`, `INTEGER`, `BOOLEAN`, `DATE`, `ARRAY`, `URI`, `COUNTRY_CODE`, `TIMEZONE`, `LOCALE`, `LANGUAGE_CODE`, `EMAIL`, `OBJECT`) | string |
| **schemaProperties[].scope** | Scope of the schema property (`SELF`, `SYSTEM`, `NONE`) | string |
| **schemaProperties[].schemaName** | Name of the schema this property belongs to | string |
| **schemaProperties[].defaultValue** | Default value for the schema property | any |
| **schemaProperties[].enumConstraint** | List of allowed enum values | array |
| **schemaProperties[].oneOfConstraint** | Map of allowed key-value pairs for the property | object |
| **schemaProperties[].enumTitles** | Display titles for enum values | object |
| **schemaProperties[].__metadata** | More metadata for the schema property | object |
| **schemaProperties[].properties[]** | Nested schema property definitions (for object types) | array |
| **schemaProperties[].minItems** | Minimum number of items (for array types) | number |
| **schemaProperties[].maxItems** | Maximum number of items (for array types) | number |
| **schemaProperties[].minLength** | Minimum string length | number |
| **schemaProperties[].maxLength** | Maximum string length | number |
| **schemaProperties[].pattern** | Regex pattern constraint | string |
| **schemaProperties[].minimum** | Minimum numeric value | integer |
| **schemaProperties[].maximum** | Maximum numeric value | integer |
| **schemaProperties[].minSize** | Minimum size constraint | number |
| **schemaProperties[].maxSize** | Maximum size constraint | number |
| **schemaProperties[].beforeDate** | Upper bound date constraint | date-time |
| **schemaProperties[].afterDate** | Lower bound date constraint | date-time |
| **pagination** | Pagination object | object |
| **pagination.nextCursor** | Cursor for the next page of results | string |
| **executionStatus** | Execution status of the action | object |
| **executionStatus.status** | Outcome of the action (`SUCCEEDED`, `FAILED`) | string |
| **executionStatus.errors[]** | List of errors that occurred during the action | array |
| **executionStatus.errors[].code** | Error code | string |
| **executionStatus.errors[].summary** | Summary of the error | string |
| **executionStatus.errors[].details[]** | Details of the error | array |
| **executionStatus.errors[].httpStatusCode** | HTTP status code associated with the error | integer |
| **executionStatus.errors[].requestId** | Request identifier associated with the error | string |
| **executionStatus.errors[].type** | Categorized error type (`RESOURCE_NOT_FOUND`, `RATE_LIMIT_EXCEEDED`, `INVALID_CREDENTIALS`, `TOKEN_EXPIRED`, `GENERIC_FAILURE`) | string |

### Provisioning List Entitlement Schema

This action schema contract is for provisioning Entitlement Management.

#### Input

| Property | Description | Type | Required |
| ----- | ----- | ----- | ----- |
| **scim** | SCIM server configuration | object | |
| **scim.baseUri** | The base URL of the SCIM server | string | TRUE |
| **scim.authMode** | Authentication mode of the SCIM server (`header`, `bearer`, `oauth`) | string | TRUE |
| **scim.entitlementTypes[]** | List of entitlement types supported by the SCIM server | array | TRUE |
| **scim.entitlementTypes[].name** | Entitlement type name | string | TRUE |
| **scim.entitlementTypes[].endpoint** | The resource type's HTTP-addressable endpoint relative to the base URL | string | TRUE |
| **scim.entitlementTypes[].description** | The resource type's human-readable description | string | |
| **scim.entitlementTypes[].attributes** | The attributes of the resource type | object | |
| **scim.entitlementTypes[].attributes.required** | Whether this entitlement attribute is required | boolean | |
| **scim.entitlementTypes[].attributes.multiValued** | Whether this entitlement attribute can have multiple values | boolean | |
| **scim.entitlementTypes[].mappings** | Schema mappings for the entitlement type | object | TRUE |
| **scim.entitlementTypes[].mappings.idField** | The name of the field that contains the unique identifier for the entitlement | string | TRUE |
| **scim.entitlementTypes[].mappings.displayNameField** | The name of the field that contains the display name for the entitlement | string | TRUE |
| **scim.entitlementTypes[].mappings.descriptionField** | The name of the field that contains the description of the entitlement | string | |
| **pagination** | Pagination object | object | |
| **pagination.cursor** | Cursor for the next page of results | string | |
| **pagination.limit** | Maximum number of results to return | integer | |

#### Output

| Property | Description | Type |
| ----- | ----- | ----- |
| **schemaProperties[]** | List of schema property definitions | array |
| **schemaProperties[].name** | Name of the schema property | string |
| **schemaProperties[].title** | Display title of the schema property | string |
| **schemaProperties[].externalName** | External name of the schema property | string |
| **schemaProperties[].externalNamespace** | External namespace of the schema property | string |
| **schemaProperties[].description** | Description of the schema property | string |
| **schemaProperties[].required** | Whether the schema property is required | boolean |
| **schemaProperties[].propertyType** | Data type of the schema property (`STRING`, `NUMBER`, `INTEGER`, `BOOLEAN`, `DATE`, `ARRAY`, `URI`, `COUNTRY_CODE`, `TIMEZONE`, `LOCALE`, `LANGUAGE_CODE`, `EMAIL`, `OBJECT`) | string |
| **schemaProperties[].scope** | Scope of the schema property (`SELF`, `SYSTEM`, `NONE`) | string |
| **schemaProperties[].schemaName** | Name of the schema this property belongs to | string |
| **schemaProperties[].defaultValue** | Default value for the schema property | any |
| **schemaProperties[].enumConstraint** | List of allowed enum values | array |
| **schemaProperties[].oneOfConstraint** | Map of allowed key-value pairs for the property | object |
| **schemaProperties[].enumTitles** | Display titles for enum values | object |
| **schemaProperties[].__metadata** | More metadata for the schema property | object |
| **schemaProperties[].properties[]** | Nested schema property definitions (for object types) | array |
| **schemaProperties[].minItems** | Minimum number of items (for array types) | number |
| **schemaProperties[].maxItems** | Maximum number of items (for array types) | number |
| **schemaProperties[].minLength** | Minimum string length | number |
| **schemaProperties[].maxLength** | Maximum string length | number |
| **schemaProperties[].pattern** | Regex pattern constraint | string |
| **schemaProperties[].minimum** | Minimum numeric value | integer |
| **schemaProperties[].maximum** | Maximum numeric value | integer |
| **schemaProperties[].minSize** | Minimum size constraint | number |
| **schemaProperties[].maxSize** | Maximum size constraint | number |
| **schemaProperties[].beforeDate** | Upper bound date constraint | date-time |
| **schemaProperties[].afterDate** | Lower bound date constraint | date-time |
| **pagination** | Pagination object | object |
| **pagination.nextCursor** | Cursor for the next page of results | string |
| **executionStatus** | Execution status of the action | object |
| **executionStatus.status** | Outcome of the action (`SUCCEEDED`, `FAILED`) | string |
| **executionStatus.errors[]** | List of errors that occurred during the action | array |
| **executionStatus.errors[].code** | Error code | string |
| **executionStatus.errors[].summary** | Summary of the error | string |
| **executionStatus.errors[].details[]** | Details of the error | array |
| **executionStatus.errors[].httpStatusCode** | HTTP status code associated with the error | integer |
| **executionStatus.errors[].requestId** | Request identifier associated with the error | string |
| **executionStatus.errors[].type** | Categorized error type (`RESOURCE_NOT_FOUND`, `RATE_LIMIT_EXCEEDED`, `INVALID_CREDENTIALS`, `TOKEN_EXPIRED`, `GENERIC_FAILURE`) | string |

### Provisioning List User Schema Property Values

This action schema contract is for provisioning Entitlement Management.

#### Input

| Property | Description | Type | Required |
| ----- | ----- | ----- | ----- |
| **scim** | SCIM server configuration | object | |
| **scim.baseUri** | The base URL of the SCIM server | string | TRUE |
| **scim.authMode** | Authentication mode of the SCIM server (`header`, `bearer`, `oauth`) | string | TRUE |
| **scim.entitlementTypes[]** | List of entitlement types supported by the SCIM server | array | TRUE |
| **scim.entitlementTypes[].name** | Entitlement type name | string | TRUE |
| **scim.entitlementTypes[].endpoint** | The resource type's HTTP-addressable endpoint relative to the base URL | string | TRUE |
| **scim.entitlementTypes[].description** | The resource type's human-readable description | string | |
| **scim.entitlementTypes[].attributes** | The attributes of the resource type | object | |
| **scim.entitlementTypes[].attributes.required** | Whether this entitlement attribute is required | boolean | |
| **scim.entitlementTypes[].attributes.multiValued** | Whether this entitlement attribute can have multiple values | boolean | |
| **scim.entitlementTypes[].mappings** | Schema mappings for the entitlement type | object | TRUE |
| **scim.entitlementTypes[].mappings.idField** | The name of the field that contains the unique identifier for the entitlement | string | TRUE |
| **scim.entitlementTypes[].mappings.displayNameField** | The name of the field that contains the display name for the entitlement | string | TRUE |
| **scim.entitlementTypes[].mappings.descriptionField** | The name of the field that contains the description of the entitlement | string | |
| **pagination** | Pagination object | object | |
| **pagination.cursor** | Cursor for the next page of results | string | |
| **pagination.limit** | Maximum number of results to return | integer | |

#### Output

| Property | Description | Type |
| ----- | ----- | ----- |
| **schemaPropertyValues[]** | List of schema property values | array |
| **schemaPropertyValues[].id** | Identifier of the schema property value | string |
| **schemaPropertyValues[].displayName** | Display name of the schema property value | string |
| **schemaPropertyValues[].schemaPropertyName** | Name of the schema property associated with this value | string |
| **schemaPropertyValues[].typeName** | Name of the entitlement type associated with this value | string |
| **schemaPropertyValues[].description** | Description of the schema property value | string |
| **pagination** | Pagination object | object |
| **pagination.nextCursor** | Cursor for the next page of results | string |
| **executionStatus** | Execution status of the action | object |
| **executionStatus.status** | Outcome of the action (`SUCCEEDED`, `FAILED`) | string |
| **executionStatus.errors[]** | List of errors that occurred during the action | array |
| **executionStatus.errors[].code** | Error code | string |
| **executionStatus.errors[].summary** | Summary of the error | string |
| **executionStatus.errors[].details[]** | Details of the error | array |
| **executionStatus.errors[].httpStatusCode** | HTTP status code associated with the error | integer |
| **executionStatus.errors[].requestId** | Request identifier associated with the error | string |
| **executionStatus.errors[].type** | Categorized error type (`RESOURCE_NOT_FOUND`, `RATE_LIMIT_EXCEEDED`, `INVALID_CREDENTIALS`, `TOKEN_EXPIRED`, `GENERIC_FAILURE`) | string |

### Provisioning List Entitlement Schema Property Values

This action schema contract is for provisioning Entitlement Management.

#### Input

| Property | Description | Type | Required |
| ----- | ----- | ----- | ----- |
| **scim** | SCIM server configuration | object | |
| **scim.baseUri** | The base URL of the SCIM server | string | TRUE |
| **scim.authMode** | Authentication mode of the SCIM server (`header`, `bearer`, `oauth`) | string | TRUE |
| **scim.entitlementTypes[]** | List of entitlement types supported by the SCIM server | array | TRUE |
| **scim.entitlementTypes[].name** | Entitlement type name | string | TRUE |
| **scim.entitlementTypes[].endpoint** | The resource type's HTTP-addressable endpoint relative to the base URL | string | TRUE |
| **scim.entitlementTypes[].description** | The resource type's human-readable description | string | |
| **scim.entitlementTypes[].attributes** | The attributes of the resource type | object | |
| **scim.entitlementTypes[].attributes.required** | Whether this entitlement attribute is required | boolean | |
| **scim.entitlementTypes[].attributes.multiValued** | Whether this entitlement attribute can have multiple values | boolean | |
| **scim.entitlementTypes[].mappings** | Schema mappings for the entitlement type | object | TRUE |
| **scim.entitlementTypes[].mappings.idField** | The name of the field that contains the unique identifier for the entitlement | string | TRUE |
| **scim.entitlementTypes[].mappings.displayNameField** | The name of the field that contains the display name for the entitlement | string | TRUE |
| **scim.entitlementTypes[].mappings.descriptionField** | The name of the field that contains the description of the entitlement | string | |
| **pagination** | Pagination object | object | |
| **pagination.cursor** | Cursor for the next page of results | string | |
| **pagination.limit** | Maximum number of results to return | integer | |

#### Output

| Property | Description | Type |
| ----- | ----- | ----- |
| **schemaPropertyValues[]** | List of schema property values | array |
| **schemaPropertyValues[].id** | Identifier of the schema property value | string |
| **schemaPropertyValues[].displayName** | Display name of the schema property value | string |
| **schemaPropertyValues[].schemaPropertyName** | Name of the schema property associated with this value | string |
| **schemaPropertyValues[].typeName** | Name of the entitlement type associated with this value | string |
| **schemaPropertyValues[].description** | Description of the schema property value | string |
| **pagination** | Pagination object | object |
| **pagination.nextCursor** | Cursor for the next page of results | string |
| **executionStatus** | Execution status of the action | object |
| **executionStatus.status** | Outcome of the action (`SUCCEEDED`, `FAILED`) | string |
| **executionStatus.errors[]** | List of errors that occurred during the action | array |
| **executionStatus.errors[].code** | Error code | string |
| **executionStatus.errors[].summary** | Summary of the error | string |
| **executionStatus.errors[].details[]** | Details of the error | array |
| **executionStatus.errors[].httpStatusCode** | HTTP status code associated with the error | integer |
| **executionStatus.errors[].requestId** | Request identifier associated with the error | string |
| **executionStatus.errors[].type** | Categorized error type (`RESOURCE_NOT_FOUND`, `RATE_LIMIT_EXCEEDED`, `INVALID_CREDENTIALS`, `TOKEN_EXPIRED`, `GENERIC_FAILURE`) | string |
