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
| **externalUserId** | The external user ID | String |  |
| **externalUserName** | The external username | String |  |
| **oktaUserId** | The Okta user ID | String |  |

#### Output

| **Property** | Description | Type |
| ----- | ----- | ----- |
| **executionStatus** | Execution result details for the logout request | Object |
| **executionStatus.status** | Execution result state of the request (`SUCCEEDED` or `FAILED`) | String |
| **executionStatus.errors** | List of error objects returned when execution fails or partially fails | Array |
| **executionStatus.errors[].code** | Error code identifier | String |
| **executionStatus.errors[].summary** | Human-readable summary of the error | String |
| **executionStatus.errors[].details** | More error details | Array |
| **executionStatus.errors[].httpStatusCode** | HTTP status code associated with the error | Integer |
| **executionStatus.errors[].requestId** | Request identifier associated with the error | String |
| **executionStatus.errors[].type** | Categorized error type (`RESOURCE_NOT_FOUND`, `RATE_LIMIT_EXCEEDED`, `INVALID_CREDENTIALS`, `TOKEN_EXPIRED`, `GENERIC_FAILURE`) | String |
| **logoutStatus** | Final logout outcome returned by the action (`SUCCESS` or `FAILURE`) | String |

## Provisioning action contracts

The following are schema contracts for provisioning actions, which also includes Entitlement Management.

### Provisioning Create User

This action schema contract is for provisioning users.

#### Input

| Property | Description | Type | Required|
| ----- | ----- | ----- | ----- |
| **user** | A SCIM user object | Object |  |
| **user.schemas** | List of schemas for the user object | Array | TRUE |
| **user.id** | The ID of the user | String | TRUE |
| **user.externalId** | External ID of the user, defined by the provisioning client | String |  |
| **user.userName** | A unique identifier for the user, typically used by the user to directly authenticate to the service provider. Each user must include a non-empty username value. This identifier must be unique across the service provider's entire set of users. Required. | String | TRUE |
| **user.name** | The components of the user's real name | Object |  |
| **user.name.formatted** | The full name (including middle name, titles, and suffixes) that's formatted for display | String |  |
| **user.name.familyName** | The family name of the user | String |  |
| **user.name.givenName** | The given name of the user | String |  |
| **user.name.middleName** | The middle name of the user | String |  |
| **user.name.honorificPrefix** | The honorific prefix or title of the user | String |  |
| **user.name.honorificSuffix** | The honorific suffix of the user | String |  |
| **user.displayName** | The name of the user, suitable for display to end users | String |  |
| **user.nickName** | The casual way to address the user in real life | String |  |
| **user.profileUrl** | A fully qualified URL pointing to a page representing the user's online profile | String |  |
| **user.title** | The user's title, such as Vice President | String |  |
| **user.userType** | Identifies the relationship between the organization and the user | String |  |
| **user.preferredLanguage** | Indicates the user's preferred written or spoken language | String |  |
| **user.locale** | Indicates the user's default location for localization purposes | String |  |
| **user.timezone** | The user's time zone in Olson database format, for example America/Los_Angeles | String |  |
| **user.active** | A Boolean value indicating the user's administrative status | Boolean |  |
| **user.password** | The user's cleartext password used for initial set or reset | String |  |
| **user.emails** | Email addresses for the user | Array |  |
| **user.emails[].value** | Email address value for the user | String |  |
| **user.emails[].display** | Human-readable display value for the email entry | String |  |
| **user.emails[].type** | Label indicating the email type, such as work or home | String |  |
| **user.emails[].primary** | Indicates whether this is the primary email value | Boolean |  |
| **user.phoneNumbers** | Phone numbers for the user | Array |  |
| **user.phoneNumbers[].value** | Phone number value for the user | String |  |
| **user.phoneNumbers[].display** | Human-readable display value for the phone entry | String |  |
| **user.phoneNumbers[].type** | Label indicating the phone type, such as work, home, or mobile | String |  |
| **user.phoneNumbers[].primary** | Indicates whether this is the primary phone number | Boolean |  |
| **user.ims** | Instant messaging addresses for the user | Array |  |
| **user.ims[].value** | Instant messaging address value for the user | String |  |
| **user.ims[].display** | Display value for the IM entry | String |  |
| **user.ims[].type** | Label indicating the IM type, such as AIM or XMPP | String |  |
| **user.ims[].primary** | Indicates whether this is the primary IM value | Boolean |  |
| **user.photos** | URLs of photos of the user | Array |  |
| **user.photos[].value** | URL value for the photo entry | String |  |
| **user.photos[].display** | Human-readable display value for the photo entry | String |  |
| **user.photos[].type** | Label indicating photo type, such as photo or thumbnail | String |  |
| **user.photos[].primary** | Indicates whether this is the primary photo value | Boolean |  |
| **user.addresses** | A physical mailing address for the user | Array |  |
| **user.addresses[].formatted** | Full mailing address formatted for display | String |  |
| **user.addresses[].streetAddress** | Full street address component | String |  |
| **user.addresses[].locality** | City or locality component | String |  |
| **user.addresses[].region** | State or region component | String |  |
| **user.addresses[].postalCode** | ZIP or postal code component | String |  |
| **user.addresses[].country** | Country name component | String |  |
| **user.addresses[].type** | Label indicating address type, such as work or home | String |  |
| **user.addresses[].primary** | Indicates whether this is the primary address value | Boolean |  |
| **user.groups** | A list of groups to which the user belongs | Array |  |
| **user.groups[].value** | Identifier of the user's group | String |  |
| **user.groups[].ref** | URI of the corresponding group resource | String |  |
| **user.groups[].display** | Human-readable display value for the group entry | String |  |
| **user.groups[].type** | Label indicating group membership type | String |  |
| **user.entitlements** | A list of entitlements for the user | Array |  |
| **user.entitlements[].value** | Entitlement value | String |  |
| **user.entitlements[].display** | Human-readable display value for the entitlement entry | String |  |
| **user.entitlements[].type** | Label indicating entitlement type | String |  |
| **user.entitlements[].primary** | Indicates whether this is the primary entitlement value | Boolean |  |
| **user.roles** | A list of roles for the user | Array |  |
| **user.roles[].value** | Role value | String |  |
| **user.roles[].display** | Human-readable display value for the role entry | String |  |
| **user.roles[].type** | Label indicating role type | String |  |
| **user.roles[].primary** | Indicates whether this is the primary role value | Boolean |  |
| **user.x509Certificates** | A list of certificates issued to the user | Array |  |
| **user.x509Certificates[].value** | X.509 certificate value | String |  |
| **user.x509Certificates[].display** | Human-readable display value for the certificate entry | String |  |
| **user.x509Certificates[].type** | Label indicating certificate type | String |  |
| **user.x509Certificates[].primary** | Indicates whether this is the primary certificate value | Boolean |  |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User** | Enterprise user object schema | Object |  |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.employeeNumber** | A string identifier assigned to a person by the organization | String |  |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.costCenter** | Name of the cost center | String |  |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.organization** | Name of the organization | String |  |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.division** | Name of the division | String |  |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.department** | Name of the department | String |  |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.manager** | Manager object for the user | Object |  |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.manager.value** | ID of the SCIM resource representing the user's manager | String |  |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.manager.ref** | URI of the SCIM resource representing the user's manager | String |  |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.manager.displayName** | Display name of the user's manager | String |  |

#### Output

| Property | Description | Type |
| ----- | ----- | ----- |
| **user** | A SCIM user object | Object |
| **user.schemas** | List of schemas for the user object | Array |
| **user.id** | The ID of the user | String |
| **user.externalId** | External ID of the user, defined by the provisioning client | String |
| **user.userName** | Unique identifier for the user, typically used by the user to directly authenticate to the service provider. Each user must include a non-empty userName value. This identifier must be unique across the service provider's entire set of users. Required. | String |
| **user.name** | The components of the user's real name | Object |
| **user.name.formatted** | The full name, including middle name, titles, and suffixes, formatted for display | String |
| **user.name.familyName** | The family name of the user | String |
| **user.name.givenName** | The given name of the user | String |
| **user.name.middleName** | The middle name of the user | String |
| **user.name.honorificPrefix** | The honorific prefix or title of the user | String |
| **user.name.honorificSuffix** | The honorific suffix of the user | String |
| **user.displayName** | The name of the user for display in the UI | String |
| **user.nickName** | The casual way to address the user in real life | String |
| **user.profileUrl** | A fully qualified URL pointing to a page representing the user's online profile | String |
| **user.title** | The user's title, such as Vice President | String |
| **user.userType** | Identifies the relationship between the organization and the user | String |
| **user.preferredLanguage** | Indicates the user's preferred written or spoken language | String |
| **user.locale** | Indicates the user's default location for localization purposes | String |
| **user.timezone** | The user's time zone in Olson database format, for example America/Los_Angeles | String |
| **user.active** | A Boolean value indicating the user's administrative status | Boolean |
| **user.password** | The user's cleartext password used for initial set or reset | String |
| **user.emails** | Email addresses for the user | Array |
| **user.emails[].value** | Email address value for the user | String |
| **user.emails[].display** | Human-readable display value for the email entry | String |
| **user.emails[].type** | Label indicating the email type, such as work or home | String |
| **user.emails[].primary** | Indicates whether this is the primary email value | Boolean |
| **user.phoneNumbers** | Phone numbers for the user | Array |
| **user.phoneNumbers[].value** | Phone number value for the user | String |
| **user.phoneNumbers[].display** | Human-readable display value for the phone entry | String |
| **user.phoneNumbers[].type** | Label indicating the phone type, such as work, home, or mobile | String |
| **user.phoneNumbers[].primary** | Indicates whether this is the primary phone number | Boolean |
| **user.ims** | Instant messaging addresses for the user | Array |
| **user.ims[].value** | Instant messaging address value for the user | String |
| **user.ims[].display** | Display value for the IM entry | String |
| **user.ims[].type** | Label indicating the IM type, such as AIM or XMPP | String |
| **user.ims[].primary** | Indicates whether this is the primary IM value | Boolean |
| **user.photos** | URLs of photos of the user | Array |
| **user.photos[].value** | URL value for the photo entry | String |
| **user.photos[].display** | Human-readable display value for the photo entry | String |
| **user.photos[].type** | Label indicating photo type, such as photo or thumbnail | String |
| **user.photos[].primary** | Indicates whether this is the primary photo value | Boolean |
| **user.addresses** | A physical mailing address for the user | Array |
| **user.addresses[].formatted** | Full mailing address formatted for display | String |
| **user.addresses[].streetAddress** | Full street address component | String |
| **user.addresses[].locality** | City or locality component | String |
| **user.addresses[].region** | State or region component | String |
| **user.addresses[].postalCode** | ZIP or postal code component | String |
| **user.addresses[].country** | Country name component | String |
| **user.addresses[].type** | Label indicating address type, such as work or home | String |
| **user.addresses[].primary** | Indicates whether this is the primary address value | Boolean |
| **user.groups** | A list of groups to which the user belongs | Array |
| **user.groups[].value** | Identifier of the user's group | String |
| **user.groups[].ref** | URI of the corresponding group resource | String |
| **user.groups[].display** | Human-readable display value for the group entry | String |
| **user.groups[].type** | Label indicating group membership type | String |
| **user.entitlements** | A list of entitlements for the user | Array |
| **user.entitlements[].value** | Entitlement value | String |
| **user.entitlements[].display** | Human-readable display value for the entitlement entry | String |
| **user.entitlements[].type** | Label indicating entitlement type | String |
| **user.entitlements[].primary** | Indicates whether this is the primary entitlement value | Boolean |
| **user.roles** | A list of roles for the user | Array |
| **user.roles[].value** | Role value | String |
| **user.roles[].display** | Human-readable display value for the role entry | String |
| **user.roles[].type** | Label indicating role type | String |
| **user.roles[].primary** | Indicates whether this is the primary role value | Boolean |
| **user.x509Certificates** | A list of certificates issued to the user | Array |
| **user.x509Certificates[].value** | X.509 certificate value | String |
| **user.x509Certificates[].display** | Human-readable display value for the certificate entry | String |
| **user.x509Certificates[].type** | Label indicating certificate type | String |
| **user.x509Certificates[].primary** | Indicates whether this is the primary certificate value | Boolean |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User** | Enterprise user object schema | Object |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.employeeNumber** | String identifier assigned to a person by the organization | String |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.costCenter** | Name of the cost center | String |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.organization** | Name of the organization | String |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.division** | Name of the division | String |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.department** | Name of the department | String |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.manager** | Manager object for the user | Object |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.manager.value** | ID of the SCIM resource representing the user's manager | String |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.manager.ref** | URI of the SCIM resource representing the user's manager | String |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.manager.displayName** | Display name of the user's manager | String |
| **executionStatus** | Execution result details for the request | Object |
| **executionStatus.status** | Execution result state of the request (`SUCCEEDED` or `FAILED`) | String |
| **executionStatus.errors** | List of error objects returned when execution fails or partially fails | Array |
| **executionStatus.errors[].code** | Error code identifier | String |
| **executionStatus.errors[].summary** | Human-readable summary of the error | String |
| **executionStatus.errors[].details** | More error details | Array |
| **executionStatus.errors[].details[]** | More error detail entry | String |
| **executionStatus.errors[].httpStatusCode** | HTTP status code associated with the error | Integer |
| **executionStatus.errors[].requestId** | Request identifier associated with the error | String |
| **executionStatus.errors[].type** | Categorized error type (`RESOURCE_NOT_FOUND`, `RATE_LIMIT_EXCEEDED`, `INVALID_CREDENTIALS`, `TOKEN_EXPIRED`, `GENERIC_FAILURE`) | String |

### Provisioning Update User

This action schema contract is for provisioning users.

#### Input

| **Property** | Description | Type | Required |
| ----- | ----- | ----- | ----- |
| **user** | A SCIM user object | Object |  |
| **user.schemas** | List of schemas for the user object | Array | TRUE |
| **user.id** | The ID of the user | String | TRUE |
| **user.externalId** | External ID of the user, defined by the provisioning client | String |  |
| **user.userName** | A unique identifier for the user, typically used by the user to directly authenticate to the service provider. Each user must include a non-empty username value. This identifier must be unique across the service provider's entire set of users. Required. | String | TRUE |
| **user.name** | The components of the user's real name | Object |  |
| **user.name.formatted** | The full name (including middle name, titles, and suffixes) that's formatted for display | String |  |
| **user.name.familyName** | The family name of the user | String |  |
| **user.name.givenName** | The given name of the user | String |  |
| **user.name.middleName** | The middle name of the user | String |  |
| **user.name.honorificPrefix** | The honorific prefix or title of the user | String |  |
| **user.name.honorificSuffix** | The honorific suffix of the user | String |  |
| **user.displayName** | The name of the user, suitable for display to end users | String |  |
| **user.nickName** | The casual way to address the user in real life | String |  |
| **user.profileUrl** | A fully qualified URL pointing to a page representing the user's online profile | String |  |
| **user.title** | The user's title, such as Vice President | String |  |
| **user.userType** | Identifies the relationship between the organization and the user | String |  |
| **user.preferredLanguage** | Indicates the user's preferred written or spoken language | String |  |
| **user.locale** | Indicates the user's default location for localization purposes | String |  |
| **user.timezone** | The user's time zone in Olson database format, for example America/Los_Angeles | String |  |
| **user.active** | A Boolean value indicating the user's administrative status | Boolean |  |
| **user.password** | The user's cleartext password used for initial set or reset | String |  |
| **user.emails** | Email addresses for the user | Array |  |
| **user.emails[].value** | Email address value for the user | String |  |
| **user.emails[].display** | Human-readable display value for the email entry | String |  |
| **user.emails[].type** | Label indicating the email type, such as work or home | String |  |
| **user.emails[].primary** | Indicates whether this is the primary email value | Boolean |  |
| **user.phoneNumbers** | Phone numbers for the user | Array |  |
| **user.phoneNumbers[].value** | Phone number value for the user | String |  |
| **user.phoneNumbers[].display** | Human-readable display value for the phone entry | String |  |
| **user.phoneNumbers[].type** | Label indicating the phone type, such as work, home, or mobile | String |  |
| **user.phoneNumbers[].primary** | Indicates whether this is the primary phone number | Boolean |  |
| **user.ims** | Instant messaging addresses for the user | Array |  |
| **user.ims[].value** | Instant messaging address value for the user | String |  |
| **user.ims[].display** | Human-readable display value for the IM entry | String |  |
| **user.ims[].type** | Label indicating the IM type, such as AIM or XMPP | String |  |
| **user.ims[].primary** | Indicates whether this is the primary IM value | Boolean |  |
| **user.photos** | URLs of photos of the user | Array |  |
| **user.photos[].value** | URL value for the photo entry | String |  |
| **user.photos[].display** | Human-readable display value for the photo entry | String |  |
| **user.photos[].type** | Label indicating photo type, such as photo or thumbnail | String |  |
| **user.photos[].primary** | Indicates whether this is the primary photo value | Boolean |  |
| **user.addresses** | A physical mailing address for the user | Array |  |
| **user.addresses[].formatted** | Full mailing address formatted for display | String |  |
| **user.addresses[].streetAddress** | Full street address component | String |  |
| **user.addresses[].locality** | City or locality component | String |  |
| **user.addresses[].region** | State or region component | String |  |
| **user.addresses[].postalCode** | ZIP or postal code component | String |  |
| **user.addresses[].country** | Country name component | String |  |
| **user.addresses[].type** | Label indicating address type, such as work or home | String |  |
| **user.addresses[].primary** | Indicates whether this is the primary address value | Boolean |  |
| **user.groups** | A list of groups to which the user belongs | Array |  |
| **user.groups[].value** | Identifier of the user's group | String |  |
| **user.groups[].ref** | URI of the corresponding group resource | String |  |
| **user.groups[].display** | Human-readable display value for the group entry | String |  |
| **user.groups[].type** | Label indicating group membership type | String |  |
| **user.entitlements** | A list of entitlements for the user | Array |  |
| **user.entitlements[].value** | Entitlement value | String |  |
| **user.entitlements[].display** | Human-readable display value for the entitlement entry | String |  |
| **user.entitlements[].type** | Label indicating entitlement type | String |  |
| **user.entitlements[].primary** | Indicates whether this is the primary entitlement value | Boolean |  |
| **user.roles** | A list of roles for the user | Array |  |
| **user.roles[].value** | Role value | String |  |
| **user.roles[].display** | Human-readable display value for the role entry | String |  |
| **user.roles[].type** | Label indicating role type | String |  |
| **user.roles[].primary** | Indicates whether this is the primary role value | Boolean |  |
| **user.x509Certificates** | A list of certificates issued to the user | Array |  |
| **user.x509Certificates[].value** | X.509 certificate value | String |  |
| **user.x509Certificates[].display** | Human-readable display value for the certificate entry | String |  |
| **user.x509Certificates[].type** | Label indicating certificate type | String |  |
| **user.x509Certificates[].primary** | Indicates whether this is the primary certificate value | Boolean |  |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User** | Enterprise user object schema | Object |  |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.employeeNumber** | A string identifier assigned to a person by the organization | String |  |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.costCenter** | Name of the cost center | String |  |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.organization** | Name of the organization | String |  |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.division** | Name of the division | String |  |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.department** | Name of the department | String |  |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.manager** | Manager object for the user | Object |  |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.manager.value** | ID of the SCIM resource representing the user's manager | String |  |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.manager.ref** | URI of the SCIM resource representing the user's manager | String |  |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.manager.displayName** | Display name of the user's manager | String |  |


#### Output

| Property | Description | Type |
| ----- | ----- | ----- |
| **user** | A SCIM user object | Object |
| **user.schemas** | List of schemas for the user object | Array |
| **user.id** | The ID of the user | String |
| **user.externalId** | External ID of the user, defined by the provisioning client | String |
| **user.userName** | A unique identifier for the user, typically used by the user to directly authenticate to the service provider. Each user must include a non-empty username value. This identifier must be unique across the service provider's entire set of users. Required. | String |
| **user.name** | The components of the user's real name | Object |
| **user.name.formatted** | The full name (including middle names, titles, and suffixes) formatted for display | String |
| **user.name.familyName** | The family name of the user | String |
| **user.name.givenName** | The given name of the user | String |
| **user.name.middleName** | The middle name of the user | String |
| **user.name.honorificPrefix** | The honorific prefix or title of the user | String |
| **user.name.honorificSuffix** | The honorific suffix of the user | String |
| **user.displayName** | The name of the user, suitable for display to end users | String |
| **user.nickName** | The casual way to address the user in real life | String |
| **user.profileUrl** | A fully qualified URL pointing to a page representing the user's online profile | String |
| **user.title** | The user's title, such as Vice President | String |
| **user.userType** | Identifies the relationship between the organization and the user | String |
| **user.preferredLanguage** | Indicates the user's preferred written or spoken language | String |
| **user.locale** | Indicates the user's default location for localization purposes | String |
| **user.timezone** | The user's time zone in Olson database format, for example America/Los_Angeles | String |
| **user.active** | A Boolean value indicating the user's administrative status | Boolean |
| **user.password** | The user's cleartext password used for initial set or reset | String |
| **user.emails** | Email addresses for the user | Array |
| **user.emails[].value** | Email address value for the user | String |
| **user.emails[].display** | Human-readable display value for the email entry | String |
| **user.emails[].type** | Label indicating the email type, such as work or home | String |
| **user.emails[].primary** | Indicates whether this is the primary email value | Boolean |
| **user.phoneNumbers** | Phone numbers for the user | Array |
| **user.phoneNumbers[].value** | Phone number value for the user | String |
| **user.phoneNumbers[].display** | Human-readable display value for the phone entry | String |
| **user.phoneNumbers[].type** | Label indicating the phone type, such as work, home, or mobile | String |
| **user.phoneNumbers[].primary** | Indicates whether this is the primary phone number | Boolean |
| **user.ims** | Instant messaging addresses for the user | Array |
| **user.ims[].value** | Instant messaging address value for the user | String |
| **user.ims[].display** | Display value for the IM entry | String |
| **user.ims[].type** | Label indicating the IM type, such as AIM or XMPP | String |
| **user.ims[].primary** | Indicates whether this is the primary IM value | Boolean |
| **user.photos** | URLs of photos of the user | Array |
| **user.photos[].value** | URL value for the photo entry | String |
| **user.photos[].display** | Human-readable display value for the photo entry | String |
| **user.photos[].type** | Label indicating photo type, such as photo or thumbnail | String |
| **user.photos[].primary** | Indicates whether this is the primary photo value | Boolean |
| **user.addresses** | A physical mailing address for the user | Array |
| **user.addresses[].formatted** | Full mailing address formatted for display | String |
| **user.addresses[].streetAddress** | Full street address component | String |
| **user.addresses[].locality** | City or locality component | String |
| **user.addresses[].region** | State or region component | String |
| **user.addresses[].postalCode** | ZIP or postal code component | String |
| **user.addresses[].country** | Country name component | String |
| **user.addresses[].type** | Label indicating address type, such as work or home | String |
| **user.addresses[].primary** | Indicates whether this is the primary address value | Boolean |
| **user.groups** | A list of groups to which the user belongs | Array |
| **user.groups[].value** | Identifier of the user's group | String |
| **user.groups[].ref** | URI of the corresponding group resource | String |
| **user.groups[].display** | Human-readable display value for the group entry | String |
| **user.groups[].type** | Label indicating group membership type | String |
| **user.entitlements** | A list of entitlements for the user | Array |
| **user.entitlements[].value** | Entitlement value | String |
| **user.entitlements[].display** | Human-readable display value for the entitlement entry | String |
| **user.entitlements[].type** | Label indicating entitlement type | String |
| **user.entitlements[].primary** | Indicates whether this is the primary entitlement value | Boolean |
| **user.roles** | A list of roles for the user | Array |
| **user.roles[].value** | Role value | String |
| **user.roles[].display** | Human-readable display value for the role entry | String |
| **user.roles[].type** | Label indicating role type | String |
| **user.roles[].primary** | Indicates whether this is the primary role value | Boolean |
| **user.x509Certificates** | A list of certificates issued to the user | Array |
| **user.x509Certificates[].value** | X.509 certificate value | String |
| **user.x509Certificates[].display** | Human-readable display value for the certificate entry | String |
| **user.x509Certificates[].type** | Label indicating certificate type | String |
| **user.x509Certificates[].primary** | Indicates whether this is the primary certificate value | Boolean |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User** | Enterprise user object schema | Object |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.employeeNumber** | A string identifier assigned to a person by the organization | String |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.costCenter** | Name of the cost center | String |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.organization** | Name of the organization | String |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.division** | Name of the division | String |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.department** | Name of the department | String |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.manager** | Manager object for the user | Object |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.manager.value** | ID of the SCIM resource representing the user's manager | String |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.manager.ref** | URI of the SCIM resource representing the user's manager | String |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.manager.displayName** | Display name of the user's manager | String |
| **executionStatus** | Execution result details for the request | Object |
| **executionStatus.status** | Execution result state of the request (`SUCCEEDED` or `FAILED`) | String |
| **executionStatus.errors** | List of error objects returned when execution fails or partially fails | Array |
| **executionStatus.errors[].code** | Error code identifier | String |
| **executionStatus.errors[].summary** | Human-readable summary of the error | String |
| **executionStatus.errors[].details** | More error details | Array |
| **executionStatus.errors[].details[]** | More error detail entry | String |
| **executionStatus.errors[].httpStatusCode** | HTTP status code associated with the error | Integer |
| **executionStatus.errors[].requestId** | Request identifier associated with the error | String |
| **executionStatus.errors[].type** | Categorized error type (`RESOURCE_NOT_FOUND`, `RATE_LIMIT_EXCEEDED`, `INVALID_CREDENTIALS`, `TOKEN_EXPIRED`, `GENERIC_FAILURE`) | String |

### Provisioning Update User Password

This action schema contract is for provisioning users.

#### Input

| **Property** | Description | Type | Required |
| ----- | ----- | ----- | ----- |
| **userId** | ID of the user whose password is updated | String | TRUE |
| **password** | New password for the user | String | TRUE |

#### Output

| Property | Description | Type |
| ----- | ----- | ----- |
| **executionStatus** | Execution result details for the request | Object |
| **executionStatus.status** | Execution result state of the request (`SUCCEEDED` or `FAILED`) | String |
| **executionStatus.errors** | List of error objects returned when execution fails or partially fails | Array |
| **executionStatus.errors[].code** | Error code identifier | String |
| **executionStatus.errors[].summary** | Human-readable summary of the error | String |
| **executionStatus.errors[].details** | More error details | Array |
| **executionStatus.errors[].details[]** | More error detail entry | String |
| **executionStatus.errors[].httpStatusCode** | HTTP status code associated with the error | Integer |
| **executionStatus.errors[].requestId** | Request identifier associated with the error | String |
| **executionStatus.errors[].type** | Categorized error type (`RESOURCE_NOT_FOUND`, `RATE_LIMIT_EXCEEDED`, `INVALID_CREDENTIALS`, `TOKEN_EXPIRED`, `GENERIC_FAILURE`) | String |

### Provisioning Activate User

This action schema contract is for provisioning users.

#### Input

| **Property** | Description | Type | Required |
| ----- | ----- | ----- | ----- |
| **userId** | ID of the user to activate | String | TRUE |

#### Output

| Property | Description | Type |
| ----- | ----- | ----- |
| **executionStatus** | Execution result details for the request | Object |
| **executionStatus.status** | Execution result state of the request (`SUCCEEDED` or `FAILED`) | String |
| **executionStatus.errors** | List of error objects returned when execution fails or partially fails | Array |
| **executionStatus.errors[].code** | Error code identifier | String |
| **executionStatus.errors[].summary** | Human-readable summary of the error | String |
| **executionStatus.errors[].details** | More error details | Array |
| **executionStatus.errors[].details[]** | More error detail entry | String |
| **executionStatus.errors[].httpStatusCode** | HTTP status code associated with the error | Integer |
| **executionStatus.errors[].requestId** | Request identifier associated with the error | String |
| **executionStatus.errors[].type** | Categorized error type (`RESOURCE_NOT_FOUND`, `RATE_LIMIT_EXCEEDED`, `INVALID_CREDENTIALS`, `TOKEN_EXPIRED`, `GENERIC_FAILURE`) | String |

### Provisioning Deactivate User

This action schema contract is for provisioning users.

#### Input

| **Property** | Description | Type | Required |
| ----- | ----- | ----- | ----- |
| **userId** | ID of the user to deactivate | String | TRUE |

#### Output

| Property | Description | Type |
| ----- | ----- | ----- |
| **executionStatus** | Execution result details for the request | Object |
| **executionStatus.status** | Execution result state of the request (`SUCCEEDED` or `FAILED`) | String |
| **executionStatus.errors** | List of error objects returned when execution fails or partially fails | Array |
| **executionStatus.errors[].code** | Error code identifier | String |
| **executionStatus.errors[].summary** | Human-readable summary of the error | String |
| **executionStatus.errors[].details** | More error details | Array |
| **executionStatus.errors[].details[]** | More error detail entry | String |
| **executionStatus.errors[].httpStatusCode** | HTTP status code associated with the error | Integer |
| **executionStatus.errors[].requestId** | Request identifier associated with the error | String |
| **executionStatus.errors[].type** | Categorized error type (`RESOURCE_NOT_FOUND`, `RATE_LIMIT_EXCEEDED`, `INVALID_CREDENTIALS`, `TOKEN_EXPIRED`, `GENERIC_FAILURE`) | String |

### Provisioning Get User by ID

This action schema contract is for provisioning users.

#### Input

| **Property** | Description | Type | Required |
| ----- | ----- | ----- | ----- |
| **userId** | ID of the user to retrieve | String | TRUE |

#### Output

| Property | Description | Type |
| ----- | ----- | ----- |
| **user** | A SCIM user object | Object |
| **user.schemas** | List of schemas for the user object. Required. | Array |
| **user.id** | The ID of the user. Required. | String |
| **user.externalId** | External ID of the user, defined by the provisioning client | String |
| **user.userName** | A unique identifier for the user, typically used by the user to directly authenticate to the service provider. Each user must include a non-empty username value. This identifier must be unique across the service provider's entire set of users. Required. | String |
| **user.name** | The components of the user's name | Object |
| **user.name.formatted** | The full name of the user, including all middle names, titles, and suffixes as appropriate, formatted for display | String |
| **user.name.familyName** | The family name of the user | String |
| **user.name.givenName** | The given name of the user | String |
| **user.name.middleName** | The middle names of the user | String |
| **user.name.honorificPrefix** | The honorific prefixes of the user | String |
| **user.name.honorificSuffix** | The honorific suffixes of the user | String |
| **user.displayName** | Display name suitable for end users | String |
| **user.nickName** | Casual name used to address the user | String |
| **user.profileUrl** | Fully qualified URL to the user profile page | String |
| **user.title** | The user title, such as Vice President | String |
| **user.userType** | The relationship between the organization and the user | String |
| **user.preferredLanguage** | Indicates the user's preferred written or spoken language | String |
| **user.locale** | Used to indicate the user's default location for localization purposes | String |
| **user.timezone** | The user time zone in the Olson time zone database format | String |
| **user.active** | A Boolean value indicating the user administrative status | Boolean |
| **user.password** | The user cleartext password used to specify an initial password or reset an existing password | String |
| **user.emails** | Email addresses for the user | Array |
| **user.emails[].value** | Email address for the user | String |
| **user.emails[].display** | A human-readable name, primarily used for display purposes; read-only | String |
| **user.emails[].type** | A label indicating the attribute function, such as work or home | String |
| **user.emails[].primary** | A Boolean value indicating the primary or preferred attribute value for this attribute | Boolean |
| **user.phoneNumbers** | Phone numbers for the user | Array |
| **user.phoneNumbers[].value** | Phone number of the user | String |
| **user.phoneNumbers[].display** | Display text for the email entry ; read-only | String |
| **user.phoneNumbers[].type** | A label indicating the attribute function, such as work, home, or mobile | String |
| **user.phoneNumbers[].primary** | A Boolean value indicating the primary or preferred attribute value for this attribute | Boolean |
| **user.ims** | Instant messaging addresses for the user | Array |
| **user.ims[].value** | Instant messaging address for the user | String |
| **user.ims[].display** | Display text for the instant message entry; read-only | String |
| **user.ims[].type** | A label indicating the attribute function, such as AIM, gtalk, or XMPP | String |
| **user.ims[].primary** | A Boolean value indicating the primary or preferred attribute value for this attribute | Boolean |
| **user.photos** | URLs of photos of the user | Array |
| **user.photos[].value** | URL of a photo of the user | String |
| **user.photos[].display** | Display text for the photo entry; read-only | String |
| **user.photos[].type** | A label indicating the attribute function, such as photo or thumbnail | String |
| **user.photos[].primary** | A Boolean value indicating the primary or preferred attribute value for this attribute | Boolean |
| **user.addresses** | A physical mailing address for the user | Array |
| **user.addresses[].formatted** | The full mailing address, formatted for display or use with a mailing label | String |
| **user.addresses[].streetAddress** | The full street address component | String |
| **user.addresses[].locality** | The city or locality component | String |
| **user.addresses[].region** | The state or region component | String |
| **user.addresses[].postalCode** | The zip code or postal code component | String |
| **user.addresses[].country** | The country name component | String |
| **user.addresses[].type** | A label indicating the attribute function, such as work or home | String |
| **user.addresses[].primary** | A Boolean value indicating the primary or preferred attribute value for this attribute | Boolean |
| **user.groups** | A list of groups to which the user belongs | Array |
| **user.groups[].value** | The identifier of the user group | String |
| **user.groups[].ref** | The URI of the corresponding group resource to which the user belongs | String (uri) |
| **user.groups[].display** | Display text for the group entry; read-only | String |
| **user.groups[].type** | A label indicating the attribute function, such as direct or indirect | String |
| **user.entitlements** | A list of entitlements for the user that represent a thing the user has | Array |
| **user.entitlements[].value** | The value of an entitlement | String |
| **user.entitlements[].display** | Display text for the entitlement entry; read-only | String |
| **user.entitlements[].type** | A label indicating the attribute function | String |
| **user.entitlements[].primary** | A Boolean value indicating the primary or preferred attribute value for this attribute | Boolean |
| **user.roles** | A list of roles for the user that collectively represent who the user is | Array |
| **user.roles[].value** | The value of a role | String |
| **user.roles[].display** | Display text for the role entry; read-only | String |
| **user.roles[].type** | A label indicating the attribute function | String |
| **user.roles[].primary** | A Boolean value indicating the primary or preferred attribute value for this attribute | Boolean |
| **user.x509Certificates** | A list of certificates issued to the user | Array |
| **user.x509Certificates[].value** | The value of an X.509 certificate | String |
| **user.x509Certificates[].display** | Display text for the certificate entry; read-only | String |
| **user.x509Certificates[].type** | A label indicating the attribute function | String |
| **user.x509Certificates[].primary** | A Boolean value indicating the primary or preferred attribute value for this attribute | Boolean |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User** | Enterprise user object schema | Object |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.employeeNumber** | A string identifier assigned to a person, typically based on order of hire or association with an organization | String |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.costCenter** | Identifies the name of the cost center | String |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.organization** | Identifies the name of an organization | String |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.division** | Identifies the name of a division | String |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.department** | Identifies the name of a department | String |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.manager** | The user manager, used to represent organizational hierarchy | Object |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.manager.value** | The ID of the SCIM resource representing the user manager | String |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.manager.ref** | The URI of the SCIM resource representing the user manager | String (uri) |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.manager.displayName** | The display name of the user manager; optional and read-only | String |
| **executionStatus** | Execution result details for the request | Object |
| **executionStatus.status** | Execution result state of the request (`SUCCEEDED` or `FAILED`) | String |
| **executionStatus.errors** | List of error objects returned when execution fails or partially fails | Array |
| **executionStatus.errors[].code** | Error code identifier | String |
| **executionStatus.errors[].summary** | Human-readable summary of the error | String |
| **executionStatus.errors[].details** | More error details | Array |
| **executionStatus.errors[].details[]** | More error detail entry | String |
| **executionStatus.errors[].httpStatusCode** | HTTP status code associated with the error | Integer |
| **executionStatus.errors[].requestId** | Request identifier associated with the error | String |
| **executionStatus.errors[].type** | Categorized error type (`RESOURCE_NOT_FOUND`, `RATE_LIMIT_EXCEEDED`, `INVALID_CREDENTIALS`, `TOKEN_EXPIRED`, `GENERIC_FAILURE`) | String |

### Provisioning Get User by UserName

This action schema contract is for provisioning users.

#### Input

| **Property** | Description | Type | Required |
| ----- | ----- | ----- | ----- |
| **userName** | A unique username of the user to retrieve | String | TRUE |

#### Output

| Property | Description | Type |
| ----- | ----- | ----- |
| **user** | A SCIM user object | Object |
| **user.schemas** | List of schemas for the user object | Array |
| **user.id** | The ID of the user | String |
| **user.externalId** | External ID of the user, defined by the provisioning client | String |
| **user.userName** | A unique identifier for the user, typically used by the user to directly authenticate to the service provider. Each user must include a non-empty username value. This identifier must be unique across the service provider's entire set of users. Required. | String |
| **user.name** | Components of the user's name | Object |
| **user.name.formatted** | Full name formatted for display | String |
| **user.name.familyName** | Family name of the user (last name) | String |
| **user.name.givenName** | Given name of the user (first name) | String |
| **user.name.middleName** | Middle name of the user | String |
| **user.name.honorificPrefix** | Honorific prefix or title of the user  | String |
| **user.name.honorificSuffix** | Honorific suffix of the user | String |
| **user.displayName** | Display name suitable for end users | String |
| **user.nickName** | Casual name used to address the user | String |
| **user.profileUrl** | Fully qualified URL to the user profile page | String |
| **user.title** | User title, such as Vice President | String |
| **user.userType** | Relationship type between the organization and the user | String |
| **user.preferredLanguage** | Preferred written or spoken language | String |
| **user.locale** | Default locale for formatting and localization | String |
| **user.timezone** | User time zone in Olson format | String |
| **user.active** | Administrative status of the user | Boolean |
| **user.password** | Cleartext password used for create/reset operations | String |
| **user.emails** | Email addresses for the user | Array |
| **user.emails[]** | User email object | Object |
| **user.emails[].value** | Email address value | String |
| **user.emails[].display** | Human-readable display value (read-only) | String |
| **user.emails[].type** | Label of email function (for example, work/home) | String |
| **user.emails[].primary** | Whether this is the primary email value | Boolean |
| **user.phoneNumbers** | Phone numbers for the user | Array |
| **user.phoneNumbers[]** | User phone number object | Object |
| **user.phoneNumbers[].value** | Phone number value | String |
| **user.phoneNumbers[].display** | Human-readable display value (read-only) | String |
| **user.phoneNumbers[].type** | Label of phone function (for example, work/home/mobile) | String |
| **user.phoneNumbers[].primary** | Whether this is the primary phone number value | Boolean |
| **user.ims** | Instant messaging addresses for the user | Array |
| **user.ims[]** | User IM object | Object |
| **user.ims[].value** | Instant messaging address value | String |
| **user.ims[].display** | Human-readable display value (read-only) | String |
| **user.ims[].type** | Label of IM function (for example, aim/gtalk/xmpp) | String |
| **user.ims[].primary** | Whether this is the primary IM value | Boolean |
| **user.photos** | Photo URLs for the user | Array |
| **user.photos[]** | User photo object | Object |
| **user.photos[].value** | Photo URL value | String |
| **user.photos[].display** | Display text for the photo entry | String |
| **user.photos[].type** | Label of photo function (photo/thumbnail) | String |
| **user.photos[].primary** | Whether this is the primary photo value | Boolean |
| **user.addresses** | Physical mailing addresses for the user | Array |
| **user.addresses[]** | User address object | Object |
| **user.addresses[].formatted** | Full address formatted for display | String |
| **user.addresses[].streetAddress** | Full street address component | String |
| **user.addresses[].locality** | City or locality component | String |
| **user.addresses[].region** | State or region component | String |
| **user.addresses[].postalCode** | Zip/postal code component | String |
| **user.addresses[].country** | Country name component | String |
| **user.addresses[].type** | Label of address function (for example, work/home) | String |
| **user.addresses[].primary** | Whether this is the primary address value | Boolean |
| **user.groups** | Groups the user belongs to | Array |
| **user.groups[]** | User group object | Object |
| **user.groups[].value** | Group identifier | String |
| **user.groups[].ref** | URI of the related group resource | String |
| **user.groups[].display** | Display text for the group entry | String |
| **user.groups[].type** | Label of group membership function (for example, direct/indirect) | String |
| **user.entitlements** | Entitlements assigned to the user | Array |
| **user.entitlements[]** | User entitlement object | Object |
| **user.entitlements[].value** | Entitlement value | String |
| **user.entitlements[].display** | Display text for the entitlement entry | String |
| **user.entitlements[].type** | Label of entitlement function | String |
| **user.entitlements[].primary** | Whether this is the primary entitlement value | Boolean |
| **user.roles** | Roles assigned to the user | Array |
| **user.roles[]** | User role object | Object |
| **user.roles[].value** | Role value | String |
| **user.roles[].display** | Display text for the role entry | String |
| **user.roles[].type** | Label of role function | String |
| **user.roles[].primary** | Whether this is the primary role value | Boolean |
| **user.x509Certificates** | Certificates issued to the user | Array |
| **user.x509Certificates[]** | User certificate object | Object |
| **user.x509Certificates[].value** | X.509 certificate value | String |
| **user.x509Certificates[].display** | Label describing the certificate entry type | String |
| **user.x509Certificates[].type** | Label of certificate function | String |
| **user.x509Certificates[].primary** | Whether this is the primary certificate value | Boolean |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User** | Enterprise user extension object | Object |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.employeeNumber** | Employee number identifier | String |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.costCenter** | Cost center name | String |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.organization** | Organization name | String |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.division** | Division name | String |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.department** | Department name | String |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.manager** | Manager object for organizational hierarchy | Object |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.manager.value** | Id of the manager SCIM resource | String |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.manager.ref** | URI of the manager SCIM resource | String |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.manager.displayName** | Display name of the manager | String |
| **executionStatus** | Execution result details for the request | Object |
| **executionStatus.status** | Execution result state of the request (`SUCCEEDED` or `FAILED`) | String |
| **executionStatus.errors** | List of error objects returned when execution fails or partially fails | Array |
| **executionStatus.errors[].code** | Error code identifier | String |
| **executionStatus.errors[].summary** | Human-readable summary of the error | String |
| **executionStatus.errors[].details** | More error details | Array |
| **executionStatus.errors[].details[]** | More error detail entry | String |
| **executionStatus.errors[].httpStatusCode** | HTTP status code associated with the error | Integer |
| **executionStatus.errors[].requestId** | Request identifier associated with the error | String |
| **executionStatus.errors[].type** | Categorized error type (`RESOURCE_NOT_FOUND`, `RATE_LIMIT_EXCEEDED`, `INVALID_CREDENTIALS`, `TOKEN_EXPIRED`, `GENERIC_FAILURE`) | String |

### Provisioning List Users

This action schema contract is for provisioning users.

#### Input

| **Property** | Description | Type | Required |
| ----- | ----- | ----- | ----- |
| **pagination** | Pagination object for list users requests | Object |  |
| **pagination.cursor** | Cursor used to continue listing users from a specific position | String |  |
| **pagination.limit** | Maximum number of users to return in the response | Integer |  |

#### Output

| Property | Description | Type |
| ----- | ----- | ----- |
| **resources** | List of user objects returned by the request | Array |
| **resources[].schemas** | List of schemas for the user object | Array |
| **resources[].id** | The ID of the user | String |
| **resources[].externalId** | External ID of the user, defined by the provisioning client | String |
| **resources[].userName** | Unique identifier for the user, typically used by the user to directly authenticate to the service provider. Each user must include a non-empty username value. This identifier must be unique across the service provider's entire set of users. Required. | String |
| **resources[].name** | Components of the user's name | Object |
| **resources[].name.formatted** | Full name formatted for display including middle names, titles, and suffixes | String |
| **resources[].name.familyName** | Family name of the user | String |
| **resources[].name.givenName** | Given name of the user | String |
| **resources[].name.middleName** | Middle name of the user | String |
| **resources[].name.honorificPrefix** | Honorific prefix or title of the user | String |
| **resources[].name.honorificSuffix** | Honorific suffix of the user | String |
| **resources[].displayName** | Display name suitable for end users | String |
| **resources[].nickName** | Casual name used to address the user | String |
| **resources[].profileUrl** | Fully qualified URL to the user profile page | String |
| **resources[].title** | Title of the user | String |
| **resources[].userType** | Relationship type between the organization and the user | String |
| **resources[].preferredLanguage** | Preferred written or spoken language of the user | String |
| **resources[].locale** | Locale used for localization preferences | String |
| **resources[].timezone** | Timezone of the user in Olson format | String |
| **resources[].active** | Administrative status of the user | Boolean |
| **resources[].password** | Cleartext password value used for initial set or reset | String |
| **resources[].emails** | Email entries for the user | Array |
| **resources[].emails[].value** | Email address value | String |
| **resources[].emails[].display** | Display text for the email entry | String |
| **resources[].emails[].type** | Label describing the email entry type | String |
| **resources[].emails[].primary** | Whether the email entry is primary | Boolean |
| **resources[].phoneNumbers** | Phone number entries for the user | Array |
| **resources[].phoneNumbers[].value** | Phone number value | String |
| **resources[].phoneNumbers[].display** | Display text for the phone number entry | String |
| **resources[].phoneNumbers[].type** | Label describing the phone number entry type | String |
| **resources[].phoneNumbers[].primary** | Whether the phone number entry is primary | Boolean |
| **resources[].ims** | Instant messaging entries for the user | Array |
| **resources[].ims[].value** | Instant messaging address value | String |
| **resources[].ims[].display** | Display text for the IM entry | String |
| **resources[].ims[].type** | Label describing the IM entry type | String |
| **resources[].ims[].primary** | Whether the IM entry is primary | Boolean |
| **resources[].photos** | Photo entries for the user | Array |
| **resources[].photos[].value** | URL value of the photo | String |
| **resources[].photos[].display** | Display text for the photo entry | String |
| **resources[].photos[].type** | Label describing the photo entry type | String |
| **resources[].photos[].primary** | Whether the photo entry is primary | Boolean |
| **resources[].addresses** | Physical mailing address entries for the user | Array |
| **resources[].addresses[].formatted** | Full mailing address formatted for display | String |
| **resources[].addresses[].streetAddress** | Street address component | String |
| **resources[].addresses[].locality** | City or locality component | String |
| **resources[].addresses[].region** | State or region component | String |
| **resources[].addresses[].postalCode** | Postal code component | String |
| **resources[].addresses[].country** | Country component | String |
| **resources[].addresses[].type** | Label describing the address entry type | String |
| **resources[].addresses[].primary** | Whether the address entry is primary | Boolean |
| **resources[].groups** | Group membership entries for the user | Array |
| **resources[].groups[].value** | Identifier of the user group | String |
| **resources[].groups[].ref** | URI of the related group resource | String |
| **resources[].groups[].display** | Display text for the group entry | String |
| **resources[].groups[].type** | Label describing the group membership type | String |
| **resources[].entitlements** | Entitlement entries for the user | Array |
| **resources[].entitlements[].value** | Entitlement value | String |
| **resources[].entitlements[].display** | Display text for the entitlement entry | String |
| **resources[].entitlements[].type** | Label describing the entitlement entry type | String |
| **resources[].entitlements[].primary** | Whether the entitlement entry is primary | Boolean |
| **resources[].roles** | Role entries for the user | Array |
| **resources[].roles[].value** | Role value | String |
| **resources[].roles[].display** | Display text for the role entry | String |
| **resources[].roles[].type** | Label describing the role entry type | String |
| **resources[].roles[].primary** | Whether the role entry is primary | Boolean |
| **resources[].x509Certificates** | X.509 certificate entries for the user | Array |
| **resources[].x509Certificates[].value** | X.509 certificate value | String |
| **resources[].x509Certificates[].display** | Display text for the certificate entry | String |
| **resources[].x509Certificates[].type** | Label describing the certificate entry type | String |
| **resources[].x509Certificates[].primary** | Whether the certificate entry is primary | Boolean |
| **resources[].urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User** | Enterprise user extension object | Object |
| **resources[].urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.employeeNumber** | Employee number identifier | String |
| **resources[].urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.costCenter** | Cost center name | String |
| **resources[].urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.organization** | Organization name | String |
| **resources[].urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.division** | Division name | String |
| **resources[].urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.department** | Department name | String |
| **resources[].urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.manager** | Manager object for the user | Object |
| **resources[].urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.manager.value** | ID of the manager SCIM resource | String |
| **resources[].urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.manager.ref** | URI of the manager SCIM resource | String |
| **resources[].urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.manager.displayName** | Display name of the manager | String |
| **pagination** | Pagination details for the response | Object |
| **pagination.nextCursor** | Cursor for retrieving the next page of users | String |
| **executionStatus** | Execution result details for the request | Object |
| **executionStatus.status** | Execution result state of the request (`SUCCEEDED` or `FAILED`) | String |
| **executionStatus.errors** | List of error objects returned when execution fails or partially fails | Array |
| **executionStatus.errors[].code** | Error code identifier | String |
| **executionStatus.errors[].summary** | Human-readable summary of the error | String |
| **executionStatus.errors[].details** | More error details | Array |
| **executionStatus.errors[].details[]** | More error detail entry | String |
| **executionStatus.errors[].httpStatusCode** | HTTP status code associated with the error | Integer |
| **executionStatus.errors[].requestId** | Request identifier associated with the error | String |
| **executionStatus.errors[].type** | Categorized error type (`RESOURCE_NOT_FOUND`, `RATE_LIMIT_EXCEEDED`, `INVALID_CREDENTIALS`, `TOKEN_EXPIRED`, `GENERIC_FAILURE`) | String |

### Provisioning Create Group

This action schema contract is for provisioning users.

#### Input

| Property | Description | Type | Required |
| ----- | ----- | ----- | ----- |
| **group** | group object for provisioning operations | Object |  |
| **group.schemas** | List of schemas for the group object | Array | TRUE |
| **group.id** | The ID of the group | String |  |
| **group.displayName** | A human-readable name for the group. Required. | String | TRUE |
| **group.description** | Group description | String |  |

#### Output

| Property | Description | Type |
| ----- | ----- | ----- |
| **group** | A SCIM group object | Object |
| **group.schemas** | List of schemas for the group object | Array |
| **group.id** | The ID of the group | String |
| **group.displayName** | A human-readable name for the group. Required. | String |
| **group.description** | Group description | String |
| **executionStatus** | Execution result details for the request | Object |
| **executionStatus.status** | Execution result state of the request (`SUCCEEDED` or `FAILED`) | String |
| **executionStatus.errors** | List of error objects returned when execution fails or partially fails | Array |
| **executionStatus.errors[].code** | Error code identifier | String |
| **executionStatus.errors[].summary** | Human-readable summary of the error | String |
| **executionStatus.errors[].details** | More error details | Array |
| **executionStatus.errors[].details[]** | More error detail entry | String |
| **executionStatus.errors[].httpStatusCode** | HTTP status code associated with the error | Integer |
| **executionStatus.errors[].requestId** | Request identifier associated with the error | String |
| **executionStatus.errors[].type** | Categorized error type (`RESOURCE_NOT_FOUND`, `RATE_LIMIT_EXCEEDED`, `INVALID_CREDENTIALS`, `TOKEN_EXPIRED`, `GENERIC_FAILURE`) | String |

### Provisioning Update Group

This action schema contract is for provisioning groups.

#### Input

| Property | Description | Type | Required |
| ----- | ----- | ----- | ----- |
| **group** | group object for provisioning operations | Object |  |
| **group.schemas** | List of schemas for the group object | Array | TRUE |
| **group.id** | The ID of the group | String |  |
| **group.displayName** | A human-readable name for the group. Required. | String | TRUE |
| **group.description** | Group description | String |  |

#### Output

| Property | Description | Type |
| ----- | ----- | ----- |
| **group** | A SCIM group object | Object |
| **group.schemas** | List of schemas for the group object | Array |
| **group.id** | The ID of the group | String |
| **group.displayName** | A human-readable name for the group. Required. | String |
| **group.description** | Group description | String |
| **executionStatus** | Execution result details for the request | Object |
| **executionStatus.status** | Execution result state of the request (`SUCCEEDED` or `FAILED`) | String |
| **executionStatus.errors** | List of error objects returned when execution fails or partially fails | Array |
| **executionStatus.errors[].code** | Error code identifier | String |
| **executionStatus.errors[].summary** | Human-readable summary of the error | String |
| **executionStatus.errors[].details** | More error details | Array |
| **executionStatus.errors[].details[]** | More error detail entry | String |
| **executionStatus.errors[].httpStatusCode** | HTTP status code associated with the error | Integer |
| **executionStatus.errors[].requestId** | Request identifier associated with the error | String |
| **executionStatus.errors[].type** | Categorized error type (`RESOURCE_NOT_FOUND`, `RATE_LIMIT_EXCEEDED`, `INVALID_CREDENTIALS`, `TOKEN_EXPIRED`, `GENERIC_FAILURE`) | String |

### Provisioning Remove Group

This action schema contract is for provisioning groups.

#### Input

| Property | Description | Type | Required |
| ----- | ----- | ----- | ----- |
| **groupId** | ID of the group to remove | String | TRUE |

#### Output

| Property | Description | Type |
| ----- | ----- | ----- |
| **executionStatus** | Execution result details for the request | Object |
| **executionStatus.status** | Execution result state of the request (`SUCCEEDED` or `FAILED`) | String |
| **executionStatus.errors** | List of error objects returned when execution fails or partially fails | Array |
| **executionStatus.errors[].code** | Error code identifier | String |
| **executionStatus.errors[].summary** | Human-readable summary of the error | String |
| **executionStatus.errors[].details** | More error details | Array |
| **executionStatus.errors[].details[]** | More error detail entry | String |
| **executionStatus.errors[].httpStatusCode** | HTTP status code associated with the error | Integer |
| **executionStatus.errors[].requestId** | Request identifier associated with the error | String |
| **executionStatus.errors[].type** | Categorized error type (`RESOURCE_NOT_FOUND`, `RATE_LIMIT_EXCEEDED`, `INVALID_CREDENTIALS`, `TOKEN_EXPIRED`, `GENERIC_FAILURE`) | String |

### Provisioning Add Group Members

This action schema contract is for provisioning groups.

#### Input

| Property | Description | Type | Required |
| ----- | ----- | ----- | ----- |
| **groupId** | Identifier of the group | String | TRUE |
| **groupMembers** | List of group member objects to add | Array | TRUE |
| **groupMembers[].value** | Identifier of the member of this group | String | TRUE |
| **groupMembers[].display** | The display name for this group member object | String |  |

#### Output

| Property | Description | Type |
| ----- | ----- | ----- |
| **executionStatus** | Execution result details for the request | Object |
| **executionStatus.status** | Execution result state of the request (`SUCCEEDED` or `FAILED`) | String |
| **executionStatus.errors** | List of error objects returned when execution fails or partially fails | Array |
| **executionStatus.errors[].code** | Error code identifier | String |
| **executionStatus.errors[].summary** | Human-readable summary of the error | String |
| **executionStatus.errors[].details** | More error details | Array |
| **executionStatus.errors[].details[]** | More error detail entry | String |
| **executionStatus.errors[].httpStatusCode** | HTTP status code associated with the error | Integer |
| **executionStatus.errors[].requestId** | Request identifier associated with the error | String |
| **executionStatus.errors[].type** | Categorized error type (`RESOURCE_NOT_FOUND`, `RATE_LIMIT_EXCEEDED`, `INVALID_CREDENTIALS`, `TOKEN_EXPIRED`, `GENERIC_FAILURE`) | String |

### Provisioning Remove Group Members

This action schema contract is for provisioning groups.

#### Input

| Property | Description | Type | Required |
| ----- | ----- | ----- | ----- |
| **groupId** | Identifier of the group | String | TRUE |
| **groupMembers** | List of group member objects to remove | Array | TRUE |
| **groupMembers[].value** | Identifier of the member of this group | String | TRUE |
| **groupMembers[].display** | The display name for this group member object | String |  |

#### Output

| Property | Description | Type |
| ----- | ----- | ----- |
| **executionStatus** | Execution result details for the request | Object |
| **executionStatus.status** | Execution result state of the request (`SUCCEEDED` or `FAILED`) | String |
| **executionStatus.errors** | List of error objects returned when execution fails or partially fails | Array |
| **executionStatus.errors[].code** | Error code identifier | String |
| **executionStatus.errors[].summary** | Human-readable summary of the error | String |
| **executionStatus.errors[].details** | More error details | Array |
| **executionStatus.errors[].details[]** | More error detail entry | String |
| **executionStatus.errors[].httpStatusCode** | HTTP status code associated with the error | Integer |
| **executionStatus.errors[].requestId** | Request identifier associated with the error | String |
| **executionStatus.errors[].type** | Categorized error type (`RESOURCE_NOT_FOUND`, `RATE_LIMIT_EXCEEDED`, `INVALID_CREDENTIALS`, `TOKEN_EXPIRED`, `GENERIC_FAILURE`) | String |

### Provisioning List Group Members

This action schema contract is for provisioning groups.

#### Input

| Property | Description | Type | Required |
| ----- | ----- | ----- | ----- |
| **groupId** | Identifier of the group | String | TRUE |
| **pagination** | Pagination object for list requests | Object |  |
| **pagination.cursor** | Cursor used to continue listing members from a specific position | String |  |
| **pagination.limit** | Maximum number of members to return in the response | Integer |  |

#### Output

| Property | Description | Type |
| ----- | ----- | ----- |
| **resources** | List of group member objects returned by the request | Array |
| **resources[].value** | Identifier of the member of this group | String |
| **resources[].display** | The display name for this group member object | String |
| **pagination** | Pagination details for the response | Object |
| **pagination.nextCursor** | Cursor for retrieving the next page of members | String |
| **executionStatus** | Execution result details for the request | Object |
| **executionStatus.status** | Execution result state of the request (`SUCCEEDED` or `FAILED`) | String |
| **executionStatus.errors** | List of error objects returned when execution fails or partially fails | Array |
| **executionStatus.errors[].code** | Error code identifier | String |
| **executionStatus.errors[].summary** | Human-readable summary of the error | String |
| **executionStatus.errors[].details** | More error details | Array |
| **executionStatus.errors[].details[]** | More error detail entry | String |
| **executionStatus.errors[].httpStatusCode** | HTTP status code associated with the error | Integer |
| **executionStatus.errors[].requestId** | Request identifier associated with the error | String |
| **executionStatus.errors[].type** | Categorized error type (`RESOURCE_NOT_FOUND`, `RATE_LIMIT_EXCEEDED`, `INVALID_CREDENTIALS`, `TOKEN_EXPIRED`, `GENERIC_FAILURE`) | String |

### Provisioning Get Group by ID

This action schema contract is for provisioning groups.

#### Input

| Property | Description | Type | Required |
| ----- | ----- | ----- | ----- |
| **groupId** | Identifier of the group | String | TRUE |

#### Output

| Property | Description | Type |
| ----- | ----- | ----- |
| **group** | A SCIM group object | Object |
| **group.schemas** | List of schemas for the group object | Array |
| **group.id** | The ID of the group | String |
| **group.displayName** | A human-readable name for the group | String |
| **group.description** | Group description | String |
| **executionStatus** | Execution status of the action | Object |
| **executionStatus.status** | Outcome of the action (`SUCCEEDED`, `FAILED`) | String |
| **executionStatus.errors[]** | List of errors that occurred during the action | Array |
| **executionStatus.errors[].code** | Error code | String |
| **executionStatus.errors[].summary** | Summary of the error | String |
| **executionStatus.errors[].details[]** | Details of the error | Array |
| **executionStatus.errors[].httpStatusCode** | HTTP status code associated with the error | Integer |
| **executionStatus.errors[].requestId** | Request identifier associated with the error | String |
| **executionStatus.errors[].type** | Categorized error type (`RESOURCE_NOT_FOUND`, `RATE_LIMIT_EXCEEDED`, `INVALID_CREDENTIALS`, `TOKEN_EXPIRED`, `GENERIC_FAILURE`) | String |

### Provisioning List Groups

This action schema contract is for provisioning groups.

#### Input

| Property | Description | Type | Required |
| ----- | ----- | ----- | ----- |
| **pagination** | Pagination object | Object | |
| **pagination.cursor** | Cursor for the next page of results | String | |
| **pagination.limit** | Maximum number of results to return | Integer | |

#### Output


| Property | Description | Type |
| ----- | ----- | ----- |
| **resources[]** | List of SCIM group objects | Array |
| **resources[].schemas** | List of schemas for the group object | Array |
| **resources[].id** | The ID of the group | String |
| **resources[].displayName** | A human-readable name for the group | String |
| **resources[].description** | Group description | String |
| **pagination** | Pagination object | Object |
| **pagination.nextCursor** | Cursor for the next page of results | String |
| **executionStatus** | Execution status of the action | Object |
| **executionStatus.status** | Outcome of the action (`SUCCEEDED`, `FAILED`) | String |
| **executionStatus.errors[]** | List of errors that occurred during the action | Array |
| **executionStatus.errors[].code** | Error code | String |
| **executionStatus.errors[].summary** | Summary of the error | String |
| **executionStatus.errors[].details[]** | Details of the error | Array |
| **executionStatus.errors[].httpStatusCode** | HTTP status code associated with the error | Integer |
| **executionStatus.errors[].requestId** | Request identifier associated with the error | String |
| **executionStatus.errors[].type** | Categorized error type (`RESOURCE_NOT_FOUND`, `RATE_LIMIT_EXCEEDED`, `INVALID_CREDENTIALS`, `TOKEN_EXPIRED`, `GENERIC_FAILURE`) | String |

### Provisioning List Groups by Display Name

This action schema contract is for provisioning groups.

#### Input

| Property | Description | Type | Required |
| ----- | ----- | ----- | ----- |
| **displayName** | Display name of the group | String | TRUE |
| **pagination** | Pagination object | Object | |
| **pagination.cursor** | Cursor for the next page of results | String | |
| **pagination.limit** | Maximum number of results to return | Integer | |

#### Output

| Property | Description | Type |
| ----- | ----- | ----- |
| **resources[]** | List of SCIM group objects | Array |
| **resources[].schemas** | List of schemas for the group object | Array |
| **resources[].id** | The ID of the group | String |
| **resources[].displayName** | A human-readable name for the group | String |
| **resources[].description** | Group description | String |
| **pagination** | Pagination object | Object |
| **pagination.nextCursor** | Cursor for the next page of results | String |
| **executionStatus** | Execution status of the action | Object |
| **executionStatus.status** | Outcome of the action (`SUCCEEDED`, `FAILED`) | String |
| **executionStatus.errors[]** | List of errors that occurred during the action | Array |
| **executionStatus.errors[].code** | Error code | String |
| **executionStatus.errors[].summary** | Summary of the error | String |
| **executionStatus.errors[].details[]** | Details of the error | Array |
| **executionStatus.errors[].httpStatusCode** | HTTP status code associated with the error | Integer |
| **executionStatus.errors[].requestId** | Request identifier associated with the error | String |
| **executionStatus.errors[].type** | Categorized error type (`RESOURCE_NOT_FOUND`, `RATE_LIMIT_EXCEEDED`, `INVALID_CREDENTIALS`, `TOKEN_EXPIRED`, `GENERIC_FAILURE`) | String |

### Provisioning List User Schema

This action schema contract is for provisioning Entitlement Management.

#### Input

| Property | Description | Type | Required |
| ----- | ----- | ----- | ----- |
| **scim** | SCIM server configuration | Object | |
| **scim.baseUri** | The base URL of the SCIM server | String | TRUE |
| **scim.authMode** | Authentication mode of the SCIM server (`header`, `bearer`, `oauth`) | String | TRUE |
| **scim.entitlementTypes[]** | List of entitlement types supported by the SCIM server | Array | TRUE |
| **scim.entitlementTypes[].name** | Entitlement type name | String | TRUE |
| **scim.entitlementTypes[].endpoint** | The resource type's HTTP-addressable endpoint relative to the base URL | String | TRUE |
| **scim.entitlementTypes[].description** | The resource type's human-readable description | String | |
| **scim.entitlementTypes[].attributes** | The attributes of the resource type | Object | |
| **scim.entitlementTypes[].attributes.required** | Whether this entitlement attribute is required | Boolean | |
| **scim.entitlementTypes[].attributes.multiValued** | Whether this entitlement attribute can have multiple values | Boolean | |
| **scim.entitlementTypes[].mappings** | Schema mappings for the entitlement type | Object | TRUE |
| **scim.entitlementTypes[].mappings.idField** | The name of the field that contains the unique identifier for the entitlement | String | TRUE |
| **scim.entitlementTypes[].mappings.displayNameField** | The name of the field that contains the display name for the entitlement | String | TRUE |
| **scim.entitlementTypes[].mappings.descriptionField** | The name of the field that contains the description of the entitlement | String | |
| **pagination** | Pagination object | Object | |
| **pagination.cursor** | Cursor for the next page of results | String | |
| **pagination.limit** | Maximum number of results to return | Integer | |

#### Output

| Property | Description | Type |
| ----- | ----- | ----- |
| **schemaProperties[]** | List of schema property definitions | Array |
| **schemaProperties[].name** | Name of the schema property | String |
| **schemaProperties[].title** | Display title of the schema property | String |
| **schemaProperties[].externalName** | External name of the schema property | String |
| **schemaProperties[].externalNamespace** | External namespace of the schema property | String |
| **schemaProperties[].description** | Description of the schema property | String |
| **schemaProperties[].required** | Whether the schema property is required | Boolean |
| **schemaProperties[].propertyType** | Data type of the schema property (`STRING`, `NUMBER`, `INTEGER`, `BOOLEAN`, `DATE`, `ARRAY`, `URI`, `COUNTRY_CODE`, `TIMEZONE`, `LOCALE`, `LANGUAGE_CODE`, `EMAIL`, `OBJECT`) | String |
| **schemaProperties[].scope** | Scope of the schema property (`SELF`, `SYSTEM`, `NONE`) | String |
| **schemaProperties[].schemaName** | Name of the schema this property belongs to | String |
| **schemaProperties[].defaultValue** | Default value for the schema property | any |
| **schemaProperties[].enumConstraint** | List of allowed enum values | Array |
| **schemaProperties[].oneOfConstraint** | Map of allowed key-value pairs for the property | Object |
| **schemaProperties[].enumTitles** | Display titles for enum values | Object |
| **schemaProperties[].__metadata** | More metadata for the schema property | Object |
| **schemaProperties[].properties[]** | Nested schema property definitions (for object types) | Array |
| **schemaProperties[].minItems** | Minimum number of items (for array types) | Number |
| **schemaProperties[].maxItems** | Maximum number of items (for array types) | Number |
| **schemaProperties[].minLength** | Minimum string length | Number |
| **schemaProperties[].maxLength** | Maximum string length | Number |
| **schemaProperties[].pattern** | Regex pattern constraint | String |
| **schemaProperties[].minimum** | Minimum numeric value | Integer |
| **schemaProperties[].maximum** | Maximum numeric value | Integer |
| **schemaProperties[].minSize** | Minimum size constraint | Number |
| **schemaProperties[].maxSize** | Maximum size constraint | Number |
| **schemaProperties[].beforeDate** | Upper bound date constraint | date-time |
| **schemaProperties[].afterDate** | Lower bound date constraint | date-time |
| **pagination** | Pagination object | Object |
| **pagination.nextCursor** | Cursor for the next page of results | String |
| **executionStatus** | Execution status of the action | Object |
| **executionStatus.status** | Outcome of the action (`SUCCEEDED`, `FAILED`) | String |
| **executionStatus.errors[]** | List of errors that occurred during the action | Array |
| **executionStatus.errors[].code** | Error code | String |
| **executionStatus.errors[].summary** | Summary of the error | String |
| **executionStatus.errors[].details[]** | Details of the error | Array |
| **executionStatus.errors[].httpStatusCode** | HTTP status code associated with the error | Integer |
| **executionStatus.errors[].requestId** | Request identifier associated with the error | String |
| **executionStatus.errors[].type** | Categorized error type (`RESOURCE_NOT_FOUND`, `RATE_LIMIT_EXCEEDED`, `INVALID_CREDENTIALS`, `TOKEN_EXPIRED`, `GENERIC_FAILURE`) | String |

### Provisioning List Entitlement Schema

This action schema contract is for provisioning Entitlement Management.

#### Input

| Property | Description | Type | Required |
| ----- | ----- | ----- | ----- |
| **scim** | SCIM server configuration | Object | |
| **scim.baseUri** | The base URL of the SCIM server | String | TRUE |
| **scim.authMode** | Authentication mode of the SCIM server (`header`, `bearer`, `oauth`) | String | TRUE |
| **scim.entitlementTypes[]** | List of entitlement types supported by the SCIM server | Array | TRUE |
| **scim.entitlementTypes[].name** | Entitlement type name | String | TRUE |
| **scim.entitlementTypes[].endpoint** | The resource type's HTTP-addressable endpoint relative to the base URL | String | TRUE |
| **scim.entitlementTypes[].description** | The resource type's human-readable description | String | |
| **scim.entitlementTypes[].attributes** | The attributes of the resource type | Object | |
| **scim.entitlementTypes[].attributes.required** | Whether this entitlement attribute is required | Boolean | |
| **scim.entitlementTypes[].attributes.multiValued** | Whether this entitlement attribute can have multiple values | Boolean | |
| **scim.entitlementTypes[].mappings** | Schema mappings for the entitlement type | Object | TRUE |
| **scim.entitlementTypes[].mappings.idField** | The name of the field that contains the unique identifier for the entitlement | String | TRUE |
| **scim.entitlementTypes[].mappings.displayNameField** | The name of the field that contains the display name for the entitlement | String | TRUE |
| **scim.entitlementTypes[].mappings.descriptionField** | The name of the field that contains the description of the entitlement | String | |
| **pagination** | Pagination object | Object | |
| **pagination.cursor** | Cursor for the next page of results | String | |
| **pagination.limit** | Maximum number of results to return | Integer | |

#### Output

| Property | Description | Type |
| ----- | ----- | ----- |
| **schemaProperties[]** | List of schema property definitions | Array |
| **schemaProperties[].name** | Name of the schema property | String |
| **schemaProperties[].title** | Display title of the schema property | String |
| **schemaProperties[].externalName** | External name of the schema property | String |
| **schemaProperties[].externalNamespace** | External namespace of the schema property | String |
| **schemaProperties[].description** | Description of the schema property | String |
| **schemaProperties[].required** | Whether the schema property is required | Boolean |
| **schemaProperties[].propertyType** | Data type of the schema property (`STRING`, `NUMBER`, `INTEGER`, `BOOLEAN`, `DATE`, `ARRAY`, `URI`, `COUNTRY_CODE`, `TIMEZONE`, `LOCALE`, `LANGUAGE_CODE`, `EMAIL`, `OBJECT`) | String |
| **schemaProperties[].scope** | Scope of the schema property (`SELF`, `SYSTEM`, `NONE`) | String |
| **schemaProperties[].schemaName** | Name of the schema this property belongs to | String |
| **schemaProperties[].defaultValue** | Default value for the schema property | any |
| **schemaProperties[].enumConstraint** | List of allowed enum values | Array |
| **schemaProperties[].oneOfConstraint** | Map of allowed key-value pairs for the property | Object |
| **schemaProperties[].enumTitles** | Display titles for enum values | Object |
| **schemaProperties[].__metadata** | More metadata for the schema property | Object |
| **schemaProperties[].properties[]** | Nested schema property definitions (for object types) | Array |
| **schemaProperties[].minItems** | Minimum number of items (for array types) | Number |
| **schemaProperties[].maxItems** | Maximum number of items (for array types) | Number |
| **schemaProperties[].minLength** | Minimum string length | Number |
| **schemaProperties[].maxLength** | Maximum string length | Number |
| **schemaProperties[].pattern** | Regex pattern constraint | String |
| **schemaProperties[].minimum** | Minimum numeric value | Integer |
| **schemaProperties[].maximum** | Maximum numeric value | Integer |
| **schemaProperties[].minSize** | Minimum size constraint | Number |
| **schemaProperties[].maxSize** | Maximum size constraint | Number |
| **schemaProperties[].beforeDate** | Upper bound date constraint | date-time |
| **schemaProperties[].afterDate** | Lower bound date constraint | date-time |
| **pagination** | Pagination object | Object |
| **pagination.nextCursor** | Cursor for the next page of results | String |
| **executionStatus** | Execution status of the action | Object |
| **executionStatus.status** | Outcome of the action (`SUCCEEDED`, `FAILED`) | String |
| **executionStatus.errors[]** | List of errors that occurred during the action | Array |
| **executionStatus.errors[].code** | Error code | String |
| **executionStatus.errors[].summary** | Summary of the error | String |
| **executionStatus.errors[].details[]** | Details of the error | Array |
| **executionStatus.errors[].httpStatusCode** | HTTP status code associated with the error | Integer |
| **executionStatus.errors[].requestId** | Request identifier associated with the error | String |
| **executionStatus.errors[].type** | Categorized error type (`RESOURCE_NOT_FOUND`, `RATE_LIMIT_EXCEEDED`, `INVALID_CREDENTIALS`, `TOKEN_EXPIRED`, `GENERIC_FAILURE`) | String |

### Provisioning List User Schema Property Values

This action schema contract is for provisioning Entitlement Management.

#### Input

| Property | Description | Type | Required |
| ----- | ----- | ----- | ----- |
| **scim** | SCIM server configuration | Object | |
| **scim.baseUri** | The base URL of the SCIM server | String | TRUE |
| **scim.authMode** | Authentication mode of the SCIM server (`header`, `bearer`, `oauth`) | String | TRUE |
| **scim.entitlementTypes[]** | List of entitlement types supported by the SCIM server | Array | TRUE |
| **scim.entitlementTypes[].name** | Entitlement type name | String | TRUE |
| **scim.entitlementTypes[].endpoint** | The resource type's HTTP-addressable endpoint relative to the base URL | String | TRUE |
| **scim.entitlementTypes[].description** | The resource type's human-readable description | String | |
| **scim.entitlementTypes[].attributes** | The attributes of the resource type | Object | |
| **scim.entitlementTypes[].attributes.required** | Whether this entitlement attribute is required | Boolean | |
| **scim.entitlementTypes[].attributes.multiValued** | Whether this entitlement attribute can have multiple values | Boolean | |
| **scim.entitlementTypes[].mappings** | Schema mappings for the entitlement type | Object | TRUE |
| **scim.entitlementTypes[].mappings.idField** | The name of the field that contains the unique identifier for the entitlement | String | TRUE |
| **scim.entitlementTypes[].mappings.displayNameField** | The name of the field that contains the display name for the entitlement | String | TRUE |
| **scim.entitlementTypes[].mappings.descriptionField** | The name of the field that contains the description of the entitlement | String | |
| **pagination** | Pagination object | Object | |
| **pagination.cursor** | Cursor for the next page of results | String | |
| **pagination.limit** | Maximum number of results to return | Integer | |

#### Output

| Property | Description | Type |
| ----- | ----- | ----- |
| **schemaPropertyValues[]** | List of schema property values | Array |
| **schemaPropertyValues[].id** | Identifier of the schema property value | String |
| **schemaPropertyValues[].displayName** | Display name of the schema property value | String |
| **schemaPropertyValues[].schemaPropertyName** | Name of the schema property associated with this value | String |
| **schemaPropertyValues[].typeName** | Name of the entitlement type associated with this value | String |
| **schemaPropertyValues[].description** | Description of the schema property value | String |
| **pagination** | Pagination object | Object |
| **pagination.nextCursor** | Cursor for the next page of results | String |
| **executionStatus** | Execution status of the action | Object |
| **executionStatus.status** | Outcome of the action (`SUCCEEDED`, `FAILED`) | String |
| **executionStatus.errors[]** | List of errors that occurred during the action | Array |
| **executionStatus.errors[].code** | Error code | String |
| **executionStatus.errors[].summary** | Summary of the error | String |
| **executionStatus.errors[].details[]** | Details of the error | Array |
| **executionStatus.errors[].httpStatusCode** | HTTP status code associated with the error | Integer |
| **executionStatus.errors[].requestId** | Request identifier associated with the error | String |
| **executionStatus.errors[].type** | Categorized error type (`RESOURCE_NOT_FOUND`, `RATE_LIMIT_EXCEEDED`, `INVALID_CREDENTIALS`, `TOKEN_EXPIRED`, `GENERIC_FAILURE`) | String |

### Provisioning List Entitlement Schema Property Values

This action schema contract is for provisioning Entitlement Management.

#### Input

| Property | Description | Type | Required |
| ----- | ----- | ----- | ----- |
| **scim** | SCIM server configuration | Object | |
| **scim.baseUri** | The base URL of the SCIM server | String | TRUE |
| **scim.authMode** | Authentication mode of the SCIM server (`header`, `bearer`, `oauth`) | String | TRUE |
| **scim.entitlementTypes[]** | List of entitlement types supported by the SCIM server | Array | TRUE |
| **scim.entitlementTypes[].name** | Entitlement type name | String | TRUE |
| **scim.entitlementTypes[].endpoint** | The resource type's HTTP-addressable endpoint relative to the base URL | String | TRUE |
| **scim.entitlementTypes[].description** | The resource type's human-readable description | String | |
| **scim.entitlementTypes[].attributes** | The attributes of the resource type | Object | |
| **scim.entitlementTypes[].attributes.required** | Whether this entitlement attribute is required | Boolean | |
| **scim.entitlementTypes[].attributes.multiValued** | Whether this entitlement attribute can have multiple values | Boolean | |
| **scim.entitlementTypes[].mappings** | Schema mappings for the entitlement type | Object | TRUE |
| **scim.entitlementTypes[].mappings.idField** | The name of the field that contains the unique identifier for the entitlement | String | TRUE |
| **scim.entitlementTypes[].mappings.displayNameField** | The name of the field that contains the display name for the entitlement | String | TRUE |
| **scim.entitlementTypes[].mappings.descriptionField** | The name of the field that contains the description of the entitlement | String | |
| **pagination** | Pagination object | Object | |
| **pagination.cursor** | Cursor for the next page of results | String | |
| **pagination.limit** | Maximum number of results to return | Integer | |

#### Output

| Property | Description | Type |
| ----- | ----- | ----- |
| **schemaPropertyValues[]** | List of schema property values | Array |
| **schemaPropertyValues[].id** | Identifier of the schema property value | String |
| **schemaPropertyValues[].displayName** | Display name of the schema property value | String |
| **schemaPropertyValues[].schemaPropertyName** | Name of the schema property associated with this value | String |
| **schemaPropertyValues[].typeName** | Name of the entitlement type associated with this value | String |
| **schemaPropertyValues[].description** | Description of the schema property value | String |
| **pagination** | Pagination object | Object |
| **pagination.nextCursor** | Cursor for the next page of results | String |
| **executionStatus** | Execution status of the action | Object |
| **executionStatus.status** | Outcome of the action (`SUCCEEDED`, `FAILED`) | String |
| **executionStatus.errors[]** | List of errors that occurred during the action | Array |
| **executionStatus.errors[].code** | Error code | String |
| **executionStatus.errors[].summary** | Summary of the error | String |
| **executionStatus.errors[].details[]** | Details of the error | Array |
| **executionStatus.errors[].httpStatusCode** | HTTP status code associated with the error | Integer |
| **executionStatus.errors[].requestId** | Request identifier associated with the error | String |
| **executionStatus.errors[].type** | Categorized error type (`RESOURCE_NOT_FOUND`, `RATE_LIMIT_EXCEEDED`, `INVALID_CREDENTIALS`, `TOKEN_EXPIRED`, `GENERIC_FAILURE`) | String |
