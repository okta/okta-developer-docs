---
title: API Integration Actions reference
meta:
  - name: description
    content: Provides references to API Integration Actions schema contracts inorder to create flows for API actions.
---

This reference provides the API Integration Actions schema contracts supported in the Integration Builder. Use them to create API action flows to your APIs.

## Universal Logout

The following are schema contracts for Universal Logout action.

### Proprietary Universal Logout

The following are input (requests) and outputs (responses) for the **Proprietary Universal Logout** action.

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
| **executionStatus.errors[].details** | Additional error details | array |
| **executionStatus.errors[].httpStatusCode** | HTTP status code associated with the error | integer |
| **executionStatus.errors[].requestId** | Request identifier associated with the error | string |
| **executionStatus.errors[].type** | Categorized error type (`RESOURCE_NOT_FOUND`, `RATE_LIMIT_EXCEEDED`, `INVALID_CREDENTIALS`, `TOKEN_EXPIRED`, `GENERIC_FAILURE`) | string |
| **logoutStatus** | Final logout outcome returned by the action (`SUCCESS` or `FAILURE`) | string |

## Provisioning action contracts

The following are input (requests) and outputs (responses) for the **Provisioning action contracts** action, which also includes Entitlement Management.

### Provisioning Create User

This action schema contract is for provisioning users.

#### Input

| Property | Description | Type | Required|
| ----- | ----- | ----- | ----- |
| **user** | A SCIM user object | object |  |
| **user.schemas** | List of Schemas for the user object | array | TRUE |
| **user.id** | The ID of the user | string | TRUE |
| **user.externalId** | External ID of the user, defined by the provisioning client | string |  |
| **user.userName** | Unique identifier for the user, typically used by the user to directly authenticate to the service provider. Each user MUST include a non-empty userName value. This identifier MUST be unique across the service provider's entire set of users. REQUIRED | string | TRUE |
| **user.name** | The components of the user's real name | object |  |
| **user.name.formatted** | The full name, including middle names, titles, and suffixes, formatted for display | string |  |
| **user.name.familyName** | The family name of the user | string |  |
| **user.name.givenName** | The given name of the user | string |  |
| **user.name.middleName** | The middle name(s) of the user | string |  |
| **user.name.honorificPrefix** | The honorific prefix or title of the user | string |  |
| **user.name.honorificSuffix** | The honorific suffix of the user | string |  |
| **user.displayName** | The name of the user, suitable for display to end-users | string |  |
| **user.nickName** | The casual way to address the user in real life | string |  |
| **user.profileUrl** | A fully qualified URL pointing to a page representing the user's online profile | string |  |
| **user.title** | The user's title, such as Vice President | string |  |
| **user.userType** | Identifies the relationship between the organization and the user | string |  |
| **user.preferredLanguage** | Indicates the user's preferred written or spoken language | string |  |
| **user.locale** | Indicates the user's default location for localization purposes | string |  |
| **user.timezone** | The user's time zone in Olson database format, for example America/Los_Angeles | string |  |
| **user.active** | A Boolean value indicating the user's administrative status | boolean |  |
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
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.employeeNumber** | String identifier assigned to a person by the organization | string |  |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.costCenter** | Name of the cost center | string |  |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.organization** | Name of the organization | string |  |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.division** | Name of the division | string |  |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.department** | Name of the department | string |  |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.manager** | Manager object for the user | object |  |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.manager.value** | ID of the SCIM resource representing the user's manager | string |  |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.manager.ref** | URI of the SCIM resource representing the user's manager | string |  |
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.manager.displayName** | Display name of the user's manager | string |  |

#### Outputs

| Property | Description | Type |
| ----- | ----- | ----- |
| **user** | A SCIM user object | object |
| **user.schemas** | List of Schemas for the user object | array |
| **user.id** | The ID of the user | string |
| **user.externalId** | External ID of the user, defined by the provisioning client | string |
| **user.userName** | Unique identifier for the user, typically used by the user to directly authenticate to the service provider. Each user MUST include a non-empty userName value. This identifier MUST be unique across the service provider's entire set of users. REQUIRED | string |
| **user.name** | The components of the user's real name | object |
| **user.name.formatted** | The full name, including middle names, titles, and suffixes, formatted for display | string |
| **user.name.familyName** | The family name of the user | string |
| **user.name.givenName** | The given name of the user | string |
| **user.name.middleName** | The middle name(s) of the user | string |
| **user.name.honorificPrefix** | The honorific prefix or title of the user | string |
| **user.name.honorificSuffix** | The honorific suffix of the user | string |
| **user.displayName** | The name of the user, suitable for display to end-users | string |
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
| **executionStatus.errors[].details** | Additional error details | array |
| **executionStatus.errors[].details[]** | Additional error detail entry | string |
| **executionStatus.errors[].httpStatusCode** | HTTP status code associated with the error | integer |
| **executionStatus.errors[].requestId** | Request identifier associated with the error | string |
| **executionStatus.errors[].type** | Categorized error type (`RESOURCE_NOT_FOUND`, `RATE_LIMIT_EXCEEDED`, `INVALID_CREDENTIALS`, `TOKEN_EXPIRED`, `GENERIC_FAILURE`) | string |

### Provisioning Update User

This action schema contract is for provisioning users.

#### Input

| **Property** | Description | Type | Required |
| ----- | ----- | ----- | ----- |
| **user** | A SCIM user object | object |  |
| **user.schemas** | List of Schemas for the user object | array | TRUE |
| **user.id** | The ID of the user | string | TRUE |
| **user.externalId** | External ID of the user, defined by the provisioning client | string |  |
| **user.userName** | Unique identifier for the user, typically used by the user to directly authenticate to the service provider. Each user MUST include a non-empty userName value. This identifier MUST be unique across the service provider's entire set of users. REQUIRED | string | TRUE |
| **user.name** | The components of the user's real name | object |  |
| **user.name.formatted** | The full name, including middle names, titles, and suffixes, formatted for display | string |  |
| **user.name.familyName** | The family name of the user | string |  |
| **user.name.givenName** | The given name of the user | string |  |
| **user.name.middleName** | The middle name(s) of the user | string |  |
| **user.name.honorificPrefix** | The honorific prefix or title of the user | string |  |
| **user.name.honorificSuffix** | The honorific suffix of the user | string |  |
| **user.displayName** | The name of the user, suitable for display to end-users | string |  |
| **user.nickName** | The casual way to address the user in real life | string |  |
| **user.profileUrl** | A fully qualified URL pointing to a page representing the user's online profile | string |  |
| **user.title** | The user's title, such as Vice President | string |  |
| **user.userType** | Identifies the relationship between the organization and the user | string |  |
| **user.preferredLanguage** | Indicates the user's preferred written or spoken language | string |  |
| **user.locale** | Indicates the user's default location for localization purposes | string |  |
| **user.timezone** | The user's time zone in Olson database format, for example America/Los_Angeles | string |  |
| **user.active** | A Boolean value indicating the user's administrative status | boolean |  |
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
| **user.urn:ietf:params:scim:schemas:extension:enterprise:2.0:<br>User.employeeNumber** | String identifier assigned to a person by the organization | string |  |
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
| **user.schemas** | List of Schemas for the user object | array |
| **user.id** | The ID of the user | string |
| **user.externalId** | External ID of the user, defined by the provisioning client | string |
| **user.userName** | Unique identifier for the user, typically used by the user to directly authenticate to the service provider. Each user MUST include a non-empty userName value. This identifier MUST be unique across the service provider's entire set of users. REQUIRED | string |
| **user.name** | The components of the user's real name | object |
| **user.name.formatted** | The full name, including middle names, titles, and suffixes, formatted for display | string |
| **user.name.familyName** | The family name of the user | string |
| **user.name.givenName** | The given name of the user | string |
| **user.name.middleName** | The middle name(s) of the user | string |
| **user.name.honorificPrefix** | The honorific prefix or title of the user | string |
| **user.name.honorificSuffix** | The honorific suffix of the user | string |
| **user.displayName** | The name of the user, suitable for display to end-users | string |
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
| **executionStatus.errors[].details** | Additional error details | array |
| **executionStatus.errors[].details[]** | Additional error detail entry | string |
| **executionStatus.errors[].httpStatusCode** | HTTP status code associated with the error | integer |
| **executionStatus.errors[].requestId** | Request identifier associated with the error | string |
| **executionStatus.errors[].type** | Categorized error type (`RESOURCE_NOT_FOUND`, `RATE_LIMIT_EXCEEDED`, `INVALID_CREDENTIALS`, `TOKEN_EXPIRED`, `GENERIC_FAILURE`) | string |

### Provisioning Update User Password

This action schema contract is for provisioning users.

### Provisioning Activate User

This action schema contract is for provisioning users.


### Provisioning Deactivate User

This action schema contract is for provisioning users.

### Provisioning Get User by ID

This action schema contract is for provisioning users.


### Provisioning Get User by UserName

This action schema contract is for provisioning users.

### Provisioning List Users

This action schema contract is for provisioning users.

### Provisioning Create Group

This action schema contract is for provisioning users.

### Provisioning Update Group

This action schema contract is for provisioning groups.

### Provisioning Remove Group

This action schema contract is for provisioning groups.


### Provisioning Add Group Members

This action schema contract is for provisioning groups.

### Provisioning Remove Group Members

This action schema contract is for provisioning groups.

### Provisioning List Group Members

This action schema contract is for provisioning groups.

### Provisioning Get Group by ID

This action schema contract is for provisioning groups.

### Provisioning List Groups

This action schema contract is for provisioning groups.

### Provisioning List Groups by Display Name

This action schema contract is for provisioning groups.

### Provisioning List User Schema

This action schema contract is for provisioning Entitlement Management.

### Provisioning List Entitlement Schema

This action schema contract is for provisioning Entitlement Management.


### Provisioning List User Schema Property Values

This action schema contract is for provisioning Entitlement Management.


### Provisioning List Entitlement Schema Property Values

This action schema contract is for provisioning Entitlement Management.

