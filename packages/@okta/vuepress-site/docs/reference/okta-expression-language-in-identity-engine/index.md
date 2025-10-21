---
title: Okta Expression Language in Identity Engine
meta:
- name: description
  content: Learn more about the features and syntax of Okta Expression Language in Identity Engine.
---

# Okta Expression Language in Identity Engine

<ApiLifecycle access="ie" />

## Overview

This document details the features and syntax of Expression Language used for the following:

* [App sign-in policies](/docs/guides/configure-signon-policy/main/) of Identity Engine
* [Access Certification campaigns](https://help.okta.com/okta_help.htm?id=ext-el-eg), Entitlement Management policies, and [federated claims](/docs/guides/federated-claims/main/) for Okta Identity Governance

Expressions used outside of these areas should continue using the features and syntax of [Expression Language](/docs/reference/okta-expression-language/). This document is updated as new capabilities are added to the language. Expression Language is based on a subset of [SpEL functionality](https://docs.spring.io/spring-framework/reference/core/expressions.html).

> **Note:** In this reference, `$placeholder` denotes a value that you need to replace with an appropriate variable. For example, in `user.profile.$profile_property`, `$profile_property` can be replaced with `firstName`, `lastName`, `email`, and other valid values.

## Unsupported features

The following operators and functionalities offered by SpEL aren't supported in Expression Language:

* [Decrement operator](https://www.javadoc.io/doc/org.springframework/spring-expression/latest/org/springframework/expression/spel/ast/OpDec.html)
* [Increment operator](https://www.javadoc.io/doc/org.springframework/spring-expression/latest/org/springframework/expression/spel/ast/OpInc.html)
* [Instanceof operator](https://www.javadoc.io/doc/org.springframework/spring-expression/latest/org/springframework/expression/spel/ast/OperatorInstanceof.html)
* [Between operator](https://www.javadoc.io/doc/org.springframework/spring-expression/latest/org/springframework/expression/spel/ast/OperatorBetween.html)
* [Assign](https://www.javadoc.io/doc/org.springframework/spring-expression/latest/org/springframework/expression/spel/ast/Assign.html)
* [Bean reference](https://www.javadoc.io/doc/org.springframework/spring-expression/latest/org/springframework/expression/spel/ast/BeanReference.html)
* [Constructor reference](https://www.javadoc.io/doc/org.springframework/spring-expression/latest/org/springframework/expression/spel/ast/ConstructorReference.html)
* [Function reference](https://www.javadoc.io/doc/org.springframework/spring-expression/latest/org/springframework/expression/spel/ast/FunctionReference.html)
* [Type reference](https://www.javadoc.io/doc/org.springframework/spring-expression/latest/org/springframework/expression/spel/ast/TypeReference.html)
* [Variable reference](https://www.javadoc.io/doc/org.springframework/spring-expression/latest/org/springframework/expression/spel/ast/VariableReference.html)
* [Qualified identifier](https://www.javadoc.io/doc/org.springframework/spring-expression/latest/org/springframework/expression/spel/ast/QualifiedIdentifier.html)

## Reference attributes

### Application entitlements

When you create an Okta expression, you can specify entitlements within the `appuser` context.

> **Note:** Entitlements within the `appuser` context are only supported with [federated claims](/docs/guides/federated-claims/main/). You can't use these entitlements in app sign-in policies.

| Syntax                             | Definitions                                                                              | Examples                                                       |
| --------                           | ----------                                                                               | ------------                                                   |
| `appuser.entitlements.$attribute`  | `appuser` - implicit reference to in-context app entitlements<br>`$attribute` - the attribute variable name| `appuser.entitlements.role`|

### Okta user profile

When you create an Okta expression, you can reference any property that exists in an Okta user profile in addition to some top-level user properties.

> **Note:** You can't use the `user.status` expression with group rules. See [Group Rules operations](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/GroupRule/) and [Create Group Rule](https://help.okta.com/okta_help.htm?type=wf&id=ext-okta-method-creategrouprule).

| Syntax                             | Definitions                                                                              | Examples                                                       |
| --------                           | ----------                                                                               | ------------                                                   |
| `user.$property`                  | `user` - references the Okta user<br>`property` - top-level property variable name<br>Values: `id`, `status`, `created`, `lastUpdated`, `passwordChanged`, `lastLogin`   | `user.id`<br>`user.status`<br>`user.created`   |
| `user.profile.$profile_property`  | `profile_property` - references the user profile property, including custom-defined properties  | `user.profile.firstName`<br>`user.profile.email`<br>           |

### Okta device profile

When you create an Okta expression, you can reference EDR attributes and any property that exists in an Okta device profile.

> **Note:** You can only use `device.profile` with federated claims. `device.provider` isn't supported.

| Syntax                             | Definitions                                                                              | Examples                                                       |
| --------                           | ----------                                                                               | ------------                                                   |
| `device.profile.$profile_property`  | `profile_property` - references a device profile property  | `device.profile.managed`<br>`device.profile.registered`<br>           |
| `device.provider.$vendor.$signal`| `vendor` - references a vendor, such as `wsc` for Windows Security Center or `zta` for CrowdStrike <br>`signal` - references the supported EDR signal by the vendor| `device.provider.wsc.fireWall`<br>`device.provider.wsc.autoUpdateSettings`<br>`device.provider.zta.overall`   |

See [Integrate with Endpoint Detection and Response solutions](https://help.okta.com/okta_help.htm?type=oie&id=ext-edr-integration-main) and [Available EDR signals by vendor](https://help.okta.com/okta_help.htm?type=oie&id=ext-edr-integration-available-signals) for details about `vendor` and `signal`.

## Session properties

When you create an Okta expression, you can reference attributes within the `session` context.

| Syntax            | Definitions                                                 | Result                              |
| ----------------- | ----------------------------------------------------------- | ------------------------------------------------------ |
| `session.amr`     | `session` - reference to a user's session<br> `amr` - the attribute name that is resolvable to an array of [Authentication Method References](https://tools.ietf.org/html/rfc8176) | `["pwd", "otp", "mfa"]` - password and MFA OTP used by the user for authentication |
| `session.id`     | `session` - reference to a user's session<br> `id` - a unique key for the session |   |

### Security context

You can specify certain [rule conditions](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicyRule!path=0/conditions&t=request) in [app sign-in policies](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicyRule). Use expressions based on the security context of the app sign-on request. Security context is made up of the [risk level](https://help.okta.com/okta_help.htm?id=csh-risk-scoring) and the matching [User behaviors](https://help.okta.com/okta_help.htm?id=ext_proc_security_behavior_detection) for the request.

| Syntax | Definitions | Type | Examples | Usage   |
| ------ | ----------- | ---- | -------- | -----   |
| security.risk.level | `security` references the security context of the request<br>`risk` references the [risk](https://help.okta.com/okta_help.htm?id=csh-risk-scoring) context of the request<br>`level` is the risk level associated with the request | String | `'LOW'`<br>`'MEDIUM'`<br>`'HIGH'` | `security.risk.level == 'HIGH'`<br>`security.risk.level != 'LOW'`   |
| security.behaviors | `security` references the security context of the request<br>`behaviors` is the list of matching [User behaviors](https://help.okta.com/okta_help.htm?id=ext_proc_security_behavior_detection) for the request, by name. | Array of Strings | `{'New IP', 'New Device'}`| `security.behaviors.contains('New IP') && security.behaviors.contains('New Device')`   |

### Login context

<ApiLifecycle access="ea"/>

You can specify the [dynamic IdP](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicyRule). Use expressions based on the login context that holds the user's `username` as the `identifier`.

| Syntax | Definitions | Type |
| ------ | ----------- | ---- |
| login.identifier| `login` references the login context of the request. `identifier` references the user's `username`. |String|

### Okta account management

You can specify certain [Expression Language conditions](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicyRule!path=0/conditions/elCondition&t=request) in [Okta account management policies](/docs/guides/okta-account-management-policy/main/).

| Syntax | Definitions | Type |
| ------ | ----------- | ---- |
| `accessRequest.$operation`| `accessRequest` references the access context of the request. `operation` references the account management operation: `enroll`, `unenroll`, `recover`, or `unlockAccount`. | String |
| `accessRequest.authenticator.$id` | `accessRequest` references the access context of the request. `authenticator.id` references an optional authenticator `id`, for example, the `id` of a custom authenticator. | String |
| `accessRequest.authenticator.$key` | `accessRequest` references the access context of the request. `authenticator.key` references the [authenticator key](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicyRule!path=0/actions/appSignOn/verificationMethod/0/constraints/knowledge/authenticationMethods/key&t=request). | String |
| `accessRequest.metadata.type`| `accessRequest` references the access context of the request. `metadata.type` references specific information about the access request. Currently, `metadata` can only be used when referencing a `recover` operation and the only supported `metadata.type` is `expiry`. `expiry` references a recovery request where a password has expired or is expiring soon.  | String |

## Functions

Okta offers various functions to manipulate properties to generate a desired output. You can combine and nest functions inside a single expression.

> **Note:** For the following expression examples, assume that the following properties exist in Okta and that the user has the associated values.

| Attribute            | Type          | Data                       |
| ---------            | ----          | --------                   |
| user.created         | ZonedDateTime | 2015-07-30T23:58:32.000Z   |
| user.firstName       | String        | "John"                     |
| user.lastName        | String        | "Doe"                      |
| user.email           | String        | "john.doe@okta.com"        |
| user.strArray        | Array         | `{"one", "two"}`           |
| user.intArray        | Array         | `{1, 2, 3}`                |
| user.stringDouble    | String        | "1.1"                      |
| user.country         | String        | "United States"            |
| user.countryAlpha2   | String        | "US"                       |
| user.countryAlpha3   | String        | "USA"                      |
| user.isContractor    | Boolean       | False                      |

### String functions

| Function                                | Input parameter signature                     | Return type | Example                                          | Output           |
| -----------------------                 | -------------------------                     | ----------- | -------                                          | ------           |
| `$string_object.toUpperCase`            | -                                             | String      | `'test'.toUpperCase()`                           | "TEST"           |
|                                         |                                               |             | `user.profile.firstName.toUpperCase()`           | "JOHN"           |
| `$string_object.toLowerCase`            | -                                             | String      | `'TEST'.toLowerCase()`                           | "test"           |
| `$string_object.substring`              | (int startIndex)                              | String      | `'test.substring(1)'`                            | "est"            |
| `$string_object.substring`              | (int startIndex, int endIndex)                | String      | `user.profile.firstName.substring(1,3)`          | "oh"             |
| `$string_object.replace`                | (String match, String replacement)            | String      | `'hello'.replace('l', 'p')`                      | "heppo"          |
|                                         |                                               |             | `user.profile.firstName.replace('ohn', 'ames')`  | "James"          |
| `$string_object.replaceFirst`           | (String match, String replacement)            | String      | `'hello'.replaceFirst('l', 'p')`                 | "heplo"          |
| `$string_object.length`                 | -                                             | Integer     | `'test'.length()`                                | 4                |
| `$string_object.removeSpaces`           | -                                             | String      | `'This is a test'.removeSpaces()`                | "Thisisatest"    |
| `$string_object.contains`               | (String searchString)                         | Boolean     | `'This is a test'.contains('test')`              | True             |
|                                         |                                               |             | `'This is a test'.contains('Test')`              | False            |
| `$string_object.substringBefore`        | (String searchString)                         | String      | `user.profile.email.substringBefore('@')`        | "john.doe"       |
| `$string_object.substringAfter`         | (String searchString)                         | String      | `user.profile.email.substringAfter('@')`         | "okta.com"       |
|                                         |                                               |             | `user.profile.email.substringAfter('.')`         | "doe@okta.com"   |

> **Note:**  In the `substring` function, `startIndex` is inclusive and `endIndex` is exclusive.

### Array functions

| Function                         | Input parameter Signature                     | Return type | Example                                          | Output                      |
| ---------------                  | -------------------------                     | ----------- | -------                                          | ------                      |
| `$array_object.contains`         | (Object searchItem)                           | Boolean     | `user.profile.intArray.contains(3)`              | True                        |
|                                  |                                               |             | `{1, 2, 3}.contains('one')`                      | False                       |
| `$array_object.size`             | -                                             | Integer     | `user.profile.strArray.size()`                   | 2                           |
| `$array_object.isEmpty`          | -                                             | Boolean     | `{}.isEmpty()`                                   | True                        |
| `$array_object.add`              | (Object itemToAdd)                            | Array       | `user.profile.strArray.add('zero')`              | `{"one", "two", "zero"}`    |
|                                  |                                               |             | `{'one', 'two'}.add('two')`                      | `{"one", "two", "two"}`     |
| `$array_object.remove`           | (Object itemToRemove)                         | Array       | `user.profile.intArray.remove(1)`                | `{2, 3}`                    |
|                                  |                                               |             | `{2, 3}.remove(1)`                               | `{2, 3}`                    |
| `$array_object.flatten`          | -                                             | Array       | `{\\{1}, {2, 3}\\}.flatten()`                    | `{1, 2, 3}`                 |
|                                  |                                               |             | `user.profile.intArray.flatten()`                | `{1, 2, 3}`                 |

### Conversion functions

##### Data conversion functions

| Function                         | Return type | Example                                          | Output                           |
| ---------------                  | ----------- | -------                                          | -----                            |
| `$string_object.toInteger`       | Integer     | `user.profile.stringDouble.toInteger()`          | 1                                |
|                                  |             | `user.profile.email.toInteger()`                 | An exception is thrown      |
|                                  |             | `'-2147483649'.toInteger()`                      | 2147483647                       |
| `$string_object.toNumber`        | Double      | `user.profile.stringDouble.toNumber()`           | 1.1                              |
|                                  |             | `'1.7'.toNumber()`                               | 1.7                              |
|                                  |             | `'123This is a test'.toNumber()`                 | An exception is thrown      |
| `$number_object.toInteger`       | Integer     | `1.1.toInteger()`                                | 1                                |
|                                  |             | `-1.6.toInteger()`                               | -2                               |
|                                  |             | `2147483647.7.toInteger()`                       | -2147483648 (Integer overflow)   |

> **Note:**  The `toInteger` functions round the passed numeric value (or the string representation of the numeric value) either up or down to the nearest integer. Make sure to consider the range limitations of the integer type when you convert to an integer with these functions.

##### Country code conversion functions

These functions convert between ISO 3166-1 2-character country codes (Alpha 2), 3-character country codes (Alpha 3), numeric country codes, and full ISO country names.

| Function                                 | Return type | Example                                                             | Output                    |
| ---------------                          | ----------- | -------                                                             | -----                     |
| `$string_object.parseCountryCode`        | CountryCode | `user.profile.country.parseCountryCode()`                           | US (CountryCode object)   |
|                                          |             | `user.profile.countryAlpha2.parseCountryCode()`                     | US (CountryCode object)   |
|                                          |             | `user.profile.countryAlpha3.parseCountryCode()`                     | US (CountryCode object)   |
|                                          |             | `'840'.parseCountryCode()`                                          | US (CountryCode object)   |
| `$country_code_object.toAlpha2`          | String      | `'USA'.parseCountryCode().toAlpha2()`                               | "US"                      |
| `$country_code_object.toAlpha3`          | String      | `'840'.parseCountryCode().toAlpha3()`                               | "USA"                     |
| `$country_code_object.toNumeric`         | String      | `'United States'.parseCountryCode().toNumeric()`                    | "840"                     |
| `$country_code_object.toName`            | String      | `'US'.parseCountryCode().toName()`                                  | "United States"           |

> **Note:**  You can call the `parseCountryCode` function on the string representations of ISO 3166-1 2-character country codes (Alpha 2), 3-character country codes (Alpha 3), numeric country codes, and country names. You can call the other four functions on country code objects and return the output in the format specified by the function names.

See the [ISO 3166-1 online lookup tool](https://www.iso.org/obp/ui/#search/code/).

### Group functions

Use these functions to get information about a user's groups.

> **Note:** The `user.getGroups` function was previously only available for a limited set of features on Okta Identity Engine, but has been expanded to all features that allow Expression Language.

These group functions take in a list of search criteria as input. Each search criterion is a key-value pair:<br>
**Key:** Specifies the matching property. Currently supported keys are: `group.id`, `group.source.id`, `group.type`, and `group.profile.name`.<br>
**Value:** Specifies a list of matching values.

* The `group.id`, `group.source.id`, and `group.type` keys can match values that are exact.
* The `group.profile.name` key supports the operators `EXACT` and `STARTS_WITH` to identify exact matches or matches that include the value. If no operator is specified, the expression uses `STARTS_WITH`. You can't use these operators with `group.id`, `group.source.id`, or `group.type`.
* The `group.source.id` key supports when you need to disambiguate between groups that have the same group name. For example, if you're searching for app groups that start with "Admin" from a given app instance then you can use `group.source.id` to filter multiple groups across the different app group sources.

> **Note:** For the following expression examples, assume that the user is a member of the following groups:

| Group ID                 | Group name               | Group type            | Group source ID |
| --------                 | -----------              | -----------           | ----------- |
| 00gak46y5hydV6NdM0g4     | Everyone                 | BUILT_IN              | 0oazmqPIbHiVJBG4C0g3 |
| 00g1emaKYZTWRYYRRTSK     | West Coast Users         | OKTA_GROUP            | 0a81509410bdf807f680 |
| 00garwpuyxHaWOkdV0g4     | West Coast Admins        | OKTA_GROUP            | 0a03d062d3918fd34742 |
| 00gjitX9HqABSoqTB0g3     | Engineering Users        | APP_GROUP             | 0aae4be2456eb62f7c3d |
| 00gnftmgQxC2L19j6I9c     | Engineering Users        | APP_GROUP             | 0a61c8dacb58b3c0716e |

The `user.getGroups` function also supports collection projections for group claims. See [Collection projections](#collection-projections) and [Federated claims with entitlements](/docs/guides/federated-claims/main/).

| Function                 | Return type | Example                                                                                                         | Output explanation                                                                        | Example Output |
| ---------------          | ----------- | -------                                                                                                         | -----                                                                           | ---- |
| `user.getGroups`         | Array       | `user.getGroups({'group.id': {'00gjitX9HqABSoqTB0g3'}}, {'group.profile.name': 'Engineering.*'})`                | A list of groups with group ID `00gjitX9HqABSoqTB0g3` and a group name that starts with `Engineering`                                                                | The `Engineering Users` group with ID `00gjitX9HqABSoqTB0g3` |
|                          |             | `user.getGroups({'group.type': {'OKTA_GROUP'}}, {'group.profile.name': {'Everyone', 'West Coast Admins'}})`     | A list of groups that are of the type `OKTA_GROUP` and the group name starts with `Everyone` or `West Coast Admins` | A list of user groups that contains groups with ID `00garwpuyxHaWOkdV0g4`  |
|                          |             | `user.getGroups({'group.profile.name': 'East Coast.*'})`                                                        | A list of groups that start with the name `East Coast` | {}                                                                              |
|                          |             | `user.getGroups({'group.type': {'OKTA_GROUP', 'APP_GROUP'}})`                                                   | A list of groups that are of the type `OKTA_GROUP` or `APP_GROUP` | A list of user groups that contains groups with IDs `00g1emaKYZTWRYYRRTSK`, `00garwpuyxHaWOkdV0g4`, `00gjitX9HqABSoqTB0g3`, and `00gnftmgQxC2L19j6I9c`  |
|                          |             | `user.getGroups({'group.source.id': '0aae4be2456eb62f7c3d'} , {'group.profile.name': {'Engineering Users'}} )` | A filtered list of user groups that contains groups that start with the name `Engineering Users` and that has the source ID `0aae4be2456eb62f7c3d` | A list of user groups that contains groups with ID `00gjitX9HqABSoqTB0g3` |
| | | `user.getGroups({'group.profile.name': 'Everyone'}).![profile.name]` | A list of group names | A list of groups whose names begin with `Everyone` |
| `user.isMemberOf`        | Boolean     | `user.isMemberOf({'group.id': {'00gjitX9HqABSoqTB0g3', '00garwpuyxHaWOkdV0g4'}}, {'group.type': 'APP_GROUP'})`  | Whether the user is a member of one of the groups with ID `00gjitX9HqABSoqTB0g3` or `00garwpuyxHaWOkdV0g4` and the group type is  `APP_GROUP`   | True        |
|                          |             | `user.isMemberOf({'group.id': {'00gjitX9HqABSoqTB0g3', '00garwpuyxHaWOkdV0g4'}}, {'group.type': 'BUILT_IN'})`   | Whether the user is a member of one of the groups with ID `00gjitX9HqABSoqTB0g3` or `00garwpuyxHaWOkdV0g4` and the group type is `BUILT_IN`   | False |
|                          |             | `user.isMemberOf({'group.profile.name': 'West Coast', 'operator': 'STARTS_WITH' })`   | Whether the user is a member of a group whose name starts with `West Coast` | True |
|                          |             | `user.isMemberOf({'group.profile.name': 'West Coast', 'operator': 'EXACT' })`   | Whether the user is a member of a group whose exact name is `West Coast` | False |
|                          |             | `user.isMemberOf({'group.source.id': '0aae4be2456eb62f7c3d'} , {'group.profile.name': {'Engineering Users'}} )` | Whether the user is a member of a group whose source ID is `0aae4be2456eb62f7c3d` and the group name starts with `Engineering Users` | True |

#### Collection Projections

[Collection projections](https://docs.spring.io/spring-framework/reference/core/expressions/language-ref/collection-projection.html) enable you to use a subexpression (`.![$projectionExpression]`) that transforms a collection (like an array) into a new collection. It applies the expression to each element in the array and returns a new collection without modifying the original collection.

You can use collection projections with the `user.getGroups` function.

`user.getGroups($expression).![$projectionExpression]`:

* `user.getGroups` function passing search criteria as an `$expression`: Returns an array. See [Group functions](#group-functions).
* Parameter: (String projectionExpression). The `projectExpression` can be any group attribute. See [the response schema of the List all groups endpoint](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Group/#tag/Group/operation/listGroups!c=200&path=created&t=response).
* Return type: Array

The following examples use `user.getGroups({'group.profile.name': 'Everyone'})` as the `user.getGroups($expression)`, which would return a list of groups that starts with `Everyone`.

| Function example | Projection Expression | Output explanation |
| --- | --- |---|
| `user.getGroups({'group.profile.name': 'Everyone'}).![id]` | Group ID (`id`) | Returns a list of group IDs |
| `user.getGroups({'group.profile.name': 'Everyone'}).![type]` | Group type (`type`) | Returns a list of types |
| `user.getGroups({'group.profile.name': 'Everyone'}).![created]` | Group created date (`created`) | Returns a list of dates when the group was created |
| `user.getGroups({'group.profile.name': 'Everyone'}).![lastUpdated]` | Timestamp for when the group profile was last updated (`lastUpdated`) | Returns a list of times for when the groups were last updated|
| `user.getGroups({'group.profile.name': 'Everyone'}).![lastMembershipUpdated]` | Timestamp when the groups memberships were last updated (`lastMembershipUpdated`) | Returns a list of `lastMembershipUpdated` times |
| `user.getGroups({'group.profile.name': 'Everyone'}).![profile.name]` | Name of the group (`profile.name`) | Returns a list of group names |
| `user.getGroups({'group.profile.name': 'Everyone'}).![profile.description]` | Description of the group (`profile.description`) | Returns a list of group profile descriptions |

### Linked object function

Use this function to retrieve the user who's identified with the specified `primary` relationship. You can then access the properties of that user.

* **Function:** `user.getLinkedObject($primaryName)`
  * **Parameter:** (String primaryName)
  * **Return Type:** User
  * **Example:** `user.getLinkedObject("manager").lastName`
  * **Example Result:** `Gates`

### Time functions

> **Note:** For the following expression examples, assume that the current date and time is `2015-07-31T17:18:37.979Z`.

| Function                                 | Input parameter signature            | Return type     | Example                                                               | Output                                                                      |
| ---------------                          | -------------------------            | -----------     | -------                                                               | -----                                                                       |
| `DateTime.now`                           | -                                    | ZonedDateTime   | `DateTime.now()`                                                      | 2015-07-31T17:18:37.979Z (The current date-time in the UTC time-zone)       |
| `$string_object.parseWindowsTime`        | -                                    | ZonedDateTime   | `'130828367179790000'.parseWindowsTime()`                             | 2015-07-31T17:18:37.979Z                                                    |
| `$string_object.parseUnixTime`           | -                                    | ZonedDateTime   | `'1438377580979'.parseUnixTime()`                                     | 2015-07-31T21:19:40.979Z                                                    |
| `$string_object.parseStringTime`         | -                                    | ZonedDateTime   | `'2015-06-17T00:23:19.676Z'.parseStringTime()`                        | 2015-06-17T00:23:19.676Z                                                    |
| `$string_object.parseStringTime`         | (String dateTimeFormat)              | ZonedDateTime   | `'17 June 2015 00:23:19'.parseStringTime('dd MMMM yyyy HH:mm:ss')`    | 2015-06-17T00:23:19Z                                                        |
| `$zoned_date_time_object.toWindows`      | -                                    | String          | `user.created.toWindows()`                                            | "130827743120000000"                                                        |
| `$zoned_date_time_object.toUnix`         | -                                    | String          | `DateTime.now().toUnix()`                                             | "1438363117979"                                                             |
| `$zoned_date_time_object.toString`       | -                                    | String          | `user.created.toString()`                                             | "2015-07-30T23:58:32Z"                                                      |
| `$zoned_date_time_object.toString`       | (String dateTimeFormat)              | String          | `user.created.toString('MM/dd/yyyy')`                                 | "07/30/2015"                                                                |
| `$zoned_date_time_object.toZone`         | (String zoneId)                      | ZonedDateTime   | `Time.now().toZone('Asia/Tokyo')`                                     | 2015-08-01T02:18:37.979+09:00[Asia/Tokyo]                                   |
| `$zoned_date_time_object.plusDays`       | (int days)                           | ZonedDateTime   | `user.created.plusDays(2)`                                            | 2015-08-01T23:58:32.000Z                                                    |
| `$zoned_date_time_object.plusHours`      | (int hours)                          | ZonedDateTime   | `user.created.plusHours(-1)`                                          | 2015-07-30T22:58:32.000Z                                                    |
| `$zoned_date_time_object.plusMinutes`    | (int minutes)                        | ZonedDateTime   | `user.created.plusMinutes(0)`                                         | 2015-07-30T23:58:32.000Z                                                    |
| `$zoned_date_time_object.plusSeconds`    | (int seconds)                        | ZonedDateTime   | `user.created.plusSeconds(0)`                                         | 2015-07-30T23:58:32.000Z                                                    |
| `$zoned_date_time_object.minusDays`      | (int days)                           | ZonedDateTime   | `Time.now().minusDays(3)`                                             | 2015-07-28T17:18:37.979Z                                                    |
| `$zoned_date_time_object.minusHours`     | (int hours)                          | ZonedDateTime   | `Time.now().minusHours(100)`                                          | 2015-07-27T13:18:37.979Z                                                    |
| `$zoned_date_time_object.minusMinutes`   | (int minutes)                        | ZonedDateTime   | `Time.now().minusMinutes(-1)`                                         | 2015-07-31T17:19:37.979Z                                                    |
| `$zoned_date_time_object.minusSeconds`   | (int seconds)                        | ZonedDateTime   | `Time.now().minusSeconds(2)`                                          | 2015-07-31T17:18:35.979Z                                                    |
| `$zoned_date_time_object.withinDays`     | (int days)                           | Boolean         | `user.created.withinDays(1)`                                          | True                                                                        |
| `$zoned_date_time_object.withinHours`    | (int hours)                          | Boolean         | `user.created.withinHours(100)`                                       | True                                                                        |
| `$zoned_date_time_object.withinMinutes`  | (int minutes)                        | Boolean         | `user.created.withinMinutes(2)`                                       | False                                                                       |
| `$zoned_date_time_object.withinSeconds`  | (int seconds)                        | Boolean         | `user.created.withinSeconds(100)`                                     | False                                                                       |

> **Note:** Okta supports the use of the time zone IDs and aliases listed in the [Time Zone Codes table](/docs/reference/okta-expression-language/#appendix-time-zone-codes).

## Constants and operators

| Common Action                                                                               | Example                                                     |
| ----------------                                                                            | --------                                                    |
| Refer to a `String` constant                                                                | `'Hello world'`                                             |
| Refer to a `Integer` constant                                                               | `1234`                                                      |
| Refer to a `Number` constant                                                                | `3.141`                                                     |
| Refer to a `Boolean` constant                                                               | `true`                                                      |
| Concatenate two strings                                                                     | `user.profile.firstName + user.profile.lastName`            |

## Conditional expressions

The following rules apply to conditional expressions:

* Expressions must have valid syntax.
* Expressions must evaluate to Boolean.
* Expressions can't contain an assignment operator, such as `=`.
* User properties referenced in an expression must exist.

The following functions are supported in conditional expressions:

* Any Expression Language function
* The `&&` operator to designate AND
* The `||` operator to designate OR
* The `!` operator to designate NOT
* Standard relational operators including <code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>, and <code>&gt;=</code>

> **Note:** Use the double equals sign `==` to check for equality and `!=` for inequality.

**Examples**

| Expression                                                                 | Output                                 |
| -----------                                                                | -------                                |
| `user.profile.country == "United States"`                                  | True                                   |
| `user.profile.intArray.contains(0)`                                        | False                                  |
| `user.profile.isContractor \|\| user.created.withinSeconds(0)`     | False                                  |

You can use the ternary operator for performing IF, THEN, ELSE conditional logic inside the expression.

The format for a ternary conditional expression is: `[Condition] ? [Value if TRUE] : [Value if FALSE]`

**Examples**

If the middle initial isn't empty, include it as part of the full name using just the first character and appending a period.<br>
`user.profile.firstName + " " + (user.profile.middleInitial.length() == 0 ? "" : (user.profile.middleInitial.substring(0, 1) + ". ")) + user.profile.lastName`

If the user is a contractor and is a member of the "West Coast Users" user group, output "West coast contractors", else output "Others".<br>
`user.profile.isContractor && user.isMemberOf({'group.profile.name': 'West Coast Users'}) ? "West coast contractors" : "Others"`
