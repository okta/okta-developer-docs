---
title: Expression Language In Identity Engine
meta:
  - name: description
    content: Learn more about the features and syntax of the Okta Expression Language in Identity Engine.
---

# Okta Expression Language In Identity Engine

<ApiLifecycle access="ie" /><br>
<ApiLifecycle access="Limited GA" />

## Overview

Expressions allow you to reference, transform, and combine properties before you store them on a user profile or before passing them to an application for authentication or provisioning. For example, you might use a custom expression to create a username by stripping `@company.com` from an email address. Or, you might combine `firstName` and lastName properties into a single `displayName` property.

This document details the features and syntax of the Okta Expression Language used in the Identity Engine. Expressions being used outside of the Identity Engine should continue using the features and syntax of [the legacy Okta Expression Language](/docs/reference/okta-expression-language/). This document will be updated over time as new capabilities are added to the language. Okta Expression Language is based on a subset of [SpEL functionality](http://docs.spring.io/spring/docs/3.0.x/reference/expressions.html).

## Unsupported Features

The following operators and functionality offered by SpEL are not supported in Okta Expression Language:

- [Decrement operator](https://www.javadoc.io/static/org.springframework/spring-expression/4.0.2.RELEASE/org/springframework/expression/spel/ast/OpDec.html)
- [Increment operator](https://www.javadoc.io/static/org.springframework/spring-expression/4.0.2.RELEASE/org/springframework/expression/spel/ast/OpInc.html)
- [Instanceof operator](https://www.javadoc.io/static/org.springframework/spring-expression/4.0.2.RELEASE/org/springframework/expression/spel/ast/OperatorInstanceof.html)
- [Between operator](https://www.javadoc.io/static/org.springframework/spring-expression/4.0.2.RELEASE/org/springframework/expression/spel/ast/OperatorBetween.html)
- [Assign](https://www.javadoc.io/static/org.springframework/spring-expression/4.0.2.RELEASE/org/springframework/expression/spel/ast/Assign.html)
- [Bean reference](https://www.javadoc.io/static/org.springframework/spring-expression/4.0.2.RELEASE/org/springframework/expression/spel/ast/BeanReference.html)
- [Constructor reference](https://www.javadoc.io/static/org.springframework/spring-expression/4.0.2.RELEASE/org/springframework/expression/spel/ast/ConstructorReference.html)
- [Function reference](https://www.javadoc.io/static/org.springframework/spring-expression/4.0.2.RELEASE/org/springframework/expression/spel/ast/FunctionReference.html)
- [Type reference](https://www.javadoc.io/static/org.springframework/spring-expression/4.0.2.RELEASE/org/springframework/expression/spel/ast/TypeReference.html)
- [Variable reference](https://www.javadoc.io/static/org.springframework/spring-expression/4.0.2.RELEASE/org/springframework/expression/spel/ast/VariableReference.html)
- [Projection](https://www.javadoc.io/static/org.springframework/spring-expression/4.0.2.RELEASE/org/springframework/expression/spel/ast/Projection.html)
- [Qualified identifier](https://www.javadoc.io/static/org.springframework/spring-expression/4.0.2.RELEASE/org/springframework/expression/spel/ast/QualifiedIdentifier.html)

## Referencing Attributes

### Okta User Profile

When you create an Okta expression, you can reference any property that exists in an Okta User Profile, in addition to some top-level User properties.

| Syntax                             | Definitions                                                                              | Examples                                                       |
| --------                           | ----------                                                                               | ------------                                                   |
| `user.$property`                  | `user` reference to the Okta user<br>`property` the top-level property variable name<br>`id`, `status`, `created`, `lastUpdated`, `passwordChanged`, `lastLogin`   | `user.id`<br>`user.status`<br>`user.created`   |
| `user.profile.$profile_property`  | `profile_property` reference to user profile property, including custom-defined properties  | `user.profile.firstName`<br>`user.profile.email`<br>           |

### Okta Device Profile
When you create an Okta expression, you can reference EDR attributes and any property that exists in an Okta Device Profile.

| Syntax                             | Definitions                                                                              | Examples                                                       |
| --------                           | ----------                                                                               | ------------                                                   |
| `device.profile.$profile_property`  | `profile_property` references a Device Profile property  | `device.profile.managed`<br>`device.profile.registered`<br>           |
| `device.provider.<vendor>.<signal>`| `vendor` references a vendor, such as `wtc` for Windows Security Center, or `zta` for CrowdStrike. <br>`signal` references the supported EDR signal by the vendor.| `device.provider.wsc.fireWall`<br>`device.provider.wsc.autoUpdateSettings`<br>`device.provider.zta.overall`   |
For details about the `vendor` and `signal`, see [Integrate with Endpoint Detection and Response solutions
](https://help.okta.com/oie/en-us/Content/Topics/identity-engine/devices/edr-integration-main.htm) and [Available EDR signals by vendor](https://help.okta.com/oie/en-us/Content/Topics/identity-engine/devices/edr-integration-available-signals.htm).

## Functions

Okta offers a variety of functions to manipulate properties to generate a desired output. You can combine and nest functions inside a single expression.

> **Note:** For the following expression examples, assume the following properties exist in Okta and the User has the associated values.

| Attribute       | Type          | Data                       |
| ---------       | ----          | --------                   |
| created         | ZonedDateTime | 2015-07-30T23:58:32.000Z   |
| firstName       | String        | "John"                     |
| lastName        | String        | "Doe"                      |
| email           | String        | "john.doe@okta.com"        |
| strArray        | Array         | `{"one", "two"}`           |
| intArray        | Array         | `{1, 2, 3}`                |
| stringDouble    | String        | "1.1"                      |
| country         | String        | "United States"            |
| countryAlpha2   | String        | "US"                       |
| countryAlpha3   | String        | "USA"                      |
| isContractor    | Boolean       | False                      |

### String Functions

| Function                                | Input Parameter Signature                     | Return Type | Example                                          | Output           |
| -----------------------                 | -------------------------                     | ----------- | -------                                          | ------           |
| `$string_object.toUpperCase`            | -                                             | String      | `'test'.toUpperCase()`                           | "TEST"           |
|                                         |                                               |             | `user.profile.firstName.toUpperCase()`           | "JOHN"           |
| `$string_object.toLowerCase`            | -                                             | String      | `'TEST'.toLowerCase()`                           | "test"           |
| `$string_object.substring`              | (int startIndex)                              | String      | `'test.substring(1)'`                            | "est"            |
| `$string_object.substring`              | (int startIndex, int endIndex)                | String      | `user.profile.firstName.substring(1,3)`          | "oh"             |
| `$string_object.replace`                | (String match, String replacement)            | String      | `'hello'.replace('l', 'p')`                      | "heppo"          |
|                                         |                                               |             | `user.profile.firstName.replace('ohn', 'ames')`  | "James"          |
| `$string_object.replaceFirst`           | (String match, String replacement)            | String      | `'hello'.replaceFirst('l', 'p')`                 | "helpo"          |
| `$string_object.length`                 | -                                             | Integer     | `'test'.length()`                                | 4                |
| `$string_object.removeSpaces`           | -                                             | String      | `'This is a test'.removeSpaces()`                | "Thisisatest"    |
| `$string_object.contains`               | (String searchString)                         | Boolean     | `'This is a test'.contains('test')`              | True             |
|                                         |                                               |             | `'This is a test'.contains('Test')`              | False            |
| `$string_object.substringBefore`        | (String searchString)                         | String      | `user.profile.email.substringBefore('@')`        | "john.doe"       |
| `$string_object.substringAfter`         | (String searchString)                         | String      | `user.profile.email.substringAfter('@')`         | "okta.com"       |
|                                         |                                               |             | `user.profile.email.substringAfter('.')`         | "doe@okta.com"   |

**Note:**  In the `substring` function, `startIndex` is inclusive and `endIndex` is exclusive.

### Array Functions

| Function                         | Input Parameter Signature                     | Return Type | Example                                          | Output                      |
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

### Conversion Functions

##### Data Conversion Functions

| Function                         | Return Type | Example                                          | Output                           |
| ---------------                  | ----------- | -------                                          | -----                            |
| `$string_object.toInteger`       | Integer     | `user.profile.stringDouble.toInteger()`          | 1                                |
|                                  |             | `user.profile.email.toInteger()`                 | An exception will be thrown      |
|                                  |             | `'-2147483649'.toInteger()`                      | 2147483647                       |
| `$string_object.toNumber`        | Double      | `user.profile.stringDouble.toNumber()`           | 1.1                              |
|                                  |             | `'1.7'.toNumber()`                               | 1.7                              |
|                                  |             | `'123This is a test'.toNumber()`                 | An exception will be thrown      |
| `$number_object.toInteger`       | Integer     | `1.1.toInteger()`                                | 1                                |
|                                  |             | `-1.6.toInteger()`                               | -2                               |
|                                  |             | `2147483647.7.toInteger()`                       | -2147483648 (Integer overflow)   |

> **Note:**  The `toInteger` functions round the passed numeric value (or the String representation of the numeric value) either up or down to the nearest integer.
Be sure to consider integer type range limitations when converting to an integer with these functions.

##### Country Code Conversion Functions

These functions convert between ISO 3166-1 2-character country codes (Alpha 2), 3-character country codes (Alpha 3), numeric country codes, and full ISO country names.

| Function                                 | Return Type | Example                                                             | Output                    |
| ---------------                          | ----------- | -------                                                             | -----                     |
| `$string_object.parseCountryCode`        | CountryCode | `user.profile.country.parseCountryCode()`                           | US (CountryCode object)   |
|                                          |             | `user.profile.countryAlpha2.parseCountryCode()`                     | US (CountryCode object)   |
|                                          |             | `user.profile.countryAlpha3.parseCountryCode()`                     | US (CountryCode object)   |
|                                          |             | `'840'.parseCountryCode()`                                          | US (CountryCode object)   |
| `$country_code_object.toAlpha2`          | String      | `'USA'.parseCountryCode().toAlpha2()`                               | "US"                      |
| `$country_code_object.toAlpha3`          | String      | `'840'.parseCountryCode().toAlpha3()`                               | "USA"                     |
| `$country_code_object.toNumeric`         | String      | `'United States'.parseCountryCode().toNumeric()`                    | "840"                     |
| `$country_code_object.toName`            | String      | `'US'.parseCountryCode().toName()`                                  | "United States"           |

> **Note:**  The `parseCountryCode` function can be called on the String representations of ISO 3166-1 2-character country codes (Alpha 2), 3-character country codes (Alpha 3), numeric country codes, and country names. The other four functions can be called on country code objects, and return the output in the format specified by the function names.

For more information on these codes, see the [ISO 3166-1 online lookup tool](https://www.iso.org/obp/ui/#search/code/).


### Group Functions

> **Note:** For the following expression examples, assume that the User is a member of the following Groups.

| Group ID                 | Group Name               | Group Type            |
| --------                 | -----------              | -----------           |
| 00gak46y5hydV6NdM0g4     | Everyone                 | BUILT_IN              |
| 00g1emaKYZTWRYYRRTSK     | West Coast Users         | OKTA_GROUP            |
| 00garwpuyxHaWOkdV0g4     | West Coast Admins        | OKTA_GROUP            |
| 00gjitX9HqABSoqTB0g3     | Engineering Users        | APP_GROUP             |

Group functions take in a list of search criteria as input. Each search criteria is a key-value pair:<br>
Key: Specifies the matching property. Currently supported keys are `group.id`, `group.type`, and `group.profile.name`.<br>
Value: Specifies a list of matching values which can be exact values or a regex pattern (only supporting the [.*] wildcard to match `starts with`)

| Function                 | Return Type | Example                                                                                                         | Output                                                                          |
| ---------------          | ----------- | -------                                                                                                         | -----                                                                           |
| `user.getGroups`         | Array       | `user.getGroups({'group.id': {'00gjitX9HqABSoqTB0g3'}}, {'group.profile.name': 'West Coast.*'})`                | {}                                                                              |
|                          |             | `user.getGroups({'group.type': {'OKTA_GROUP'}}, {'group.profile.name': {'Everyone', 'West Coast Admins'}})`     | A list of User Groups that contains the Groups with ID `00garwpuyxHaWOkdV0g4`  |
|                          |             | `user.getGroups({'group.profile.name': 'East Coast.*'})`                                                        | {}                                                                              |
|                          |             | `user.getGroups({'group.type': {'OKTA_GROUP', 'APP_GROUP'}})`                                                   | A list of User Groups that contains the Groups with IDs `00g1emaKYZTWRYYRRTSK`, `00garwpuyxHaWOkdV0g4`, and `00gjitX9HqABSoqTB0g3`  |
| `user.isMemberOf`        | Boolean     | `user.isMemberOf({'group.id': {'00gjitX9HqABSoqTB0g3', '00garwpuyxHaWOkdV0g4'}}, {'group.type': 'APP_GROUP'})`  | True                                                                            |
|                          |             | `user.isMemberOf({'group.id': {'00gjitX9HqABSoqTB0g3', '00garwpuyxHaWOkdV0g4'}}, {'group.type': 'BUILT_IN'})`   | False

### Linked Object Function

Use this function to retrieve the User identified with the specified `primary` relationship. You can then access properties of that User.

* Function: `user.getLinkedObject($primaryName)`
    * Parameter: (String primaryName)
    * Return Type: User
    * Example: `user.getLinkedObject("manager").lastName`
    * Example Result: `Gates`

### Time Functions

> **Note:** For the following expression examples, assume that the current date and time is `2015-07-31T17:18:37.979Z`.

| Function                                 | Input Parameter Signature            | Return Type     | Example                                                               | Output                                                                      |
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

> **Note:** Okta supports the use of the time zone IDs and aliases listed in [the Time Zone Codes table](/docs/reference/okta-expression-language/#appendix-time-zone-codes).

## Constants and Operators

| Common Action                                                                               | Example                                                     |
| ----------------                                                                            | --------                                                    |
| Refer to a `String` constant                                                                | `'Hello world'`                                             |
| Refer to a `Integer` constant                                                               | `1234`                                                      |
| Refer to a `Number` constant                                                                | `3.141`                                                     |
| Refer to a `Boolean` constant                                                               | `true`                                                      |
| Concatenate two strings                                                                     | `user.profile.firstName + user.profile.lastName`            |

## Conditional Expressions

The following rules apply to conditional expressions.

* Expressions must have valid syntax.
* Expressions must evaluate to Boolean.
* Expressions cannot contain an assignment operator, such as `=`.
* User properties referenced in an expression must exist.

<br>The following functions are supported in conditions.

* Any Okta Expression Language function
* The `&&` operator to designate AND
* The `||` operator to designate OR
* The `!` operator to designate NOT
* Standard relational operators including `&lt;`, `&gt;`, `&lt;=`, and `&gt;=`.

**Note:** Use the double equals sign `==` to check for equality and `!=` for inequality.

Examples:

| Expression                                                                 | Output                                 |
| -----------                                                                | -------                                |
| `user.profile.country == "United States"`                                  | True                                   |
| `user.profile.intArray.contains(0)`                                        | False                                  |
| `user.profile.isContractor &#124;&#124; user.created.withinSeconds(0)`     | False                                  |

You can use the ternary operator for performing IF, THEN, ELSE conditional logic inside the expression.

The format for a ternary conditional expression is `[Condition] ? [Value if TRUE] : [Value if FALSE]`

Examples:

If the middle initial is not empty, include it as part of the full name, using just the first character and appending a period.<br>
`user.profile.firstName + " " + (user.profile.middleInitial.length() == 0 ? "" : (user.profile.middleInitial.substring(0, 1) + ". ")) + user.profile.lastName`

If the user is a contractor and is a member of the "West Coast Users" user group, output "West coast contractors", else output "Others".<br>
`user.profile.isContractor && user.isMemberOf({'group.profile.name': 'West Coast Users'}) ? "West coast contractors" : "Others"`
