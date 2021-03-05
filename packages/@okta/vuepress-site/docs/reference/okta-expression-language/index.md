---
title: Expression Language Overview
meta:
  - name: description
    content: Learn more about the features and syntax of the Okta Expression Language, which can be used throughout the administrator UI and API.
---

# Overview

Expressions allow you to reference, transform, and combine attributes before you store them on a user profile or before passing them to an application for authentication or provisioning. For example, you might use a custom expression to create a username by stripping @company.com from an email address. Or, you might combine `firstName` and `lastName` attributes into a single `displayName` attribute.

This document details the features and syntax of the Okta Expression Language, which can be used throughout the administrator UI and API. This document will be updated over time as new capabilities are added to the language. Okta's expression language is based on [SpEL](http://docs.spring.io/spring/docs/3.0.x/reference/expressions.html) and uses a subset of functionalities offered by SpEL.

## Referencing User Attributes
When you create an Okta expression, you can reference any attribute that lives on an Okta user profile or App user profile.

### Okta User Profile
Every user has an Okta user profile. The Okta user profile is the central source of truth for a user's core attributes. To reference an Okta user profile attribute, just reference `user` and specify the attribute variable name.


| Syntax            | Definitions                                                                   | Examples                                                       |
| --------          | ----------                                                                    | ------------                                                   |
| `user.$attribute` | `user` reference to the Okta user<br>`$attribute` the attribute variable name | user.firstName<br>user.lastName<br>user.login<br>user.email |

### Application User Profile
In addition to an Okta user profile, all users have a separate Application user profile for each of their applications. Application user profiles are used to store application specific information about users, such as application username or user role. To reference an App user profile attribute, just specify the application variable and the attribute variable in that application's App user profile. In specifying the application, you can either name the specific application you're referencing or use an implicit reference to an in-context application.

| Syntax                | Definitions                                                                                | Examples                                                              |
| --------              | ----------                                                                                 | ------------                                                          |
| `$appuser.$attribute` | `$appuser` explicit reference to specific app<br>`$attribute` the attribute variable name  | zendesk.firstName<br>active_directory.managerUpn<br>google_apps.email |
| `appuser.$attribute`  | `appuser` implicit reference to in-context app<br>`$attribute` the attribute variable name | appuser.firstName                                                     |

> **Note:** Explicit references to apps aren't supported for custom OAuth/OIDC claims.
>

> **Note:** The application reference is usually the `name` of the application, as distinct from the `label` (display name).  (See [Application properties](/docs/reference/api/apps/#application-properties).)  If your organization has configured multiple instances of the same application, the names of the later instances are differentiated by a randomly assigned suffix, for example: `zendesk_9ao1g13`.  You can find the name of any specific App instance in the Profile Editor, where it is shown in lighter text beneath the App's label.

### IdP User Profile
In addition to an Okta user profile, some users have separate IdP user profiles for their external Identity Provider. These IdP user profiles are used to store identity provider specific information about a user. This data can be used in an EL expression to transform an external user's username into the equivalent Okta username. To reference an IdP user profile attribute, specify the identity provider variable and the corresponding attribute variable for that identity provider's IdP user profile. This profile is only available when specifying the username transform used to generate an Okta username for the IdP user.

| Syntax                 | Definitions                                                                                  | Examples          |
| ---------------------- | -------------------------------------------------------------------------------------------- | ------------      |
| `idpuser.$attribute`   | `idpuser` implicit reference to in-context IdP<br>`$attribute` the attribute variable name   | idpuser.firstName |


> With Universal Directory, there are about 30 attributes in the base Okta profile and any number of custom attributes can be added. All App user profiles have a username attribute and possibly others depending on the application. To find a full list of Okta user and App user attributes and their variable names, go to People > Profile Editor. If you're not yet using Universal Directory, contact your Support or Professional Services team.

## Referencing Application and Organization Properties
In addition to referencing user attributes, you can also reference App properties and the properties of your Organization. To reference a particular attribute, just specify the appropriate binding and the attribute variable name. The binding for an App is the name of the App with `_app` appended. The App name can be found as described above for [Application user profile attributes](#application-user-profile). Here are some examples:

### Application Properties

| Syntax            | Definitions                                                                                     | Examples                                               |
| ------            | ----------                                                                                      | ------------                                           |
| `$app.$attribute` | `$app` explicit reference to specific app instance<br>`$attribute` the attribute variable name  | office365_app.domain<br>zendesk_app.companySubDomain |
| `app.$attribute`  | `app` implicit reference to in-context app instance<br>`$attribute` the attribute variable name | app.domain<br>app.companySubDomain                     |

> **Note:** Explicit references to apps are not supported for custom OAuth/OIDC claims.
>

### Organization Properties

| Syntax           | Definitions                                                             | Examples     |
| --------         | ----------                                                              | ------------ |
| `org.$attribute` | `org` reference to Okta org<br>`$attribute` the attribute variable name | org.name<br>org.subdomain   |

## Referencing Session Properties

In addition to referencing User, App, and Organization properties, you can also reference user Session properties. Session properties allow you to configure Okta to pass Dynamic Authentication Context to SAML apps through the assertion using custom SAML attributes. The App can then use that information to limit access to certain App-specific behaviors and calculate the risk profile for the signed-in user.

### Session Properties

| Syntax            | Definitions                                                 | Evaluation Example                                     |
| ----------------- | ----------------------------------------------------------- | ------------------------------------------------------ |
| `session.amr`     | `session` reference to a user's session<br> `amr` the attribute name that is resolvable to an array of [Authentication Method References](https://tools.ietf.org/html/rfc8176) | `["pwd"]` &mdash; password used by the user for authentication<br>`["mfa", "pwd", "kba"]` &mdash; password and MFA security question used by the user for authentication<br>`["mfa", "mca", "pwd", "sms"]` &mdash; password and MFA SMS used by the user for authentication |

## Functions

Okta offers a variety of functions to manipulate attributes or properties to generate a desired output. You can combine and nest functions inside a single expression.

### String Functions

| Function                 | Input Parameter Signature                                     | Return Type | Example                                                                                                       | Output         |
| --------                 | -------------------------                                     | ----------- | -------                                                                                                       | ------         |
| `String.append`          | (String str, String suffix)                                   | String      | `String.append("This is", " a test")`                                                                         | This is a test |
| `String.join`            | (String separator, String... strings)                         | String      | `String.join(",", "This", "is", "a", "test")`                                                                 | This,is,a,test |
|                          |                                                               |             | `String.join("", "This", "is", "a", "test")`                                                                   | Thisisatest    |
| `String.len`             | (String input)                                                | Integer     | `String.len("This")`                                                                                          | 4              |
| `String.removeSpaces`    | (String input)                                                | String      | `String.removeSpaces("This is a test")`                                                                       | Thisisatest    |
| `String.replace`         | (String input, match, replacement)                            | String      | `String.replace("This is a test", "is", "at")`                                                                | That at a test |
| `String.replaceFirst`    | (String input, match, replacement)                            | String      | `String.replaceFirst("This is a test", "is", "at")`                                                           | That is a test |
| `String.stringContains`  | (String input, String searchString)                           | Boolean     | `String.stringContains("This is a test", "test")`                                                             | true           |
|                          |                                                               |             | `String.stringContains("This is a test", "doesn'tExist")`                                                     | false          |
| `String.stringSwitch`    | (String input, String defaultString, String... keyValuePairs) | String      | `String.stringSwitch("This is a test", "default", "key1", "value1")`                                          | default        |
|                          |                                                               |             | `String.stringSwitch("This is a test", "default", "test", "value1")`                                          | value1         |
|                          |                                                               |             | `String.stringSwitch("First match wins", "default", "absent", "value1", "wins", "value2", "match", "value3")` | value2         |
|                          |                                                               |             | `String.stringSwitch("Substrings count", "default", "ring", "value1")`                                        | value1         |
| `String.substring `      | (String input, int startIndex, int endIndex)                  | String      | `String.substring("This is a test", 2, 9)`                                                                    | is is a        |
| `String.substringAfter`  | (String input, String searchString)                           | String      | `String.substringAfter("abc@okta.com", "@")`                                                                  | okta.com       |
| `String.substringBefore` | (String input, String searchString)                           | String      | `String.substringBefore("abc@okta.com", "@")`                                                                 | abc            |
| `String.toUpperCase`     | (String input)                                                | String      | `String.toUpperCase("This")`                                                                                  | THIS           |
| `String.toLowerCase`     | (String input)                                                | String      | `String.toLowerCase("ThiS")`                                                                                  | this           |



The following <ApiLifecycle access="deprecated" /> functions perform some of the same tasks as the ones in the above table.

| Function                          | Example                             | Input         | Output    |
| --------                          | ---------                           | -------       | --------  |
| `toUpperCase(string)`             | `toUpperCase(source.firstName)`     | Alexander     | ALEXANDER |
| `toLowerCase(string)`             | `toLowerCase(source.firstName)`     | AlexANDER     | alexander |
| `substringBefore(string, string)` | `substringBefore(user.email, '@')`  | alex@okta.com | alex      |
| `substringAfter(string, string)`  | `substringAfter(user.email, '@')`   | alex@okta.com | okta.com  |
| `substring(string, int, int)`     | `substring(source.firstName, 1, 4)` | Alexander     | lex       |

### Array Functions

| Function                         | Return Type                         | Example                                             | Output             |
| --------                         | ---------                           | ---------                                           | --------           |
| `Arrays.add(array, value)`       | Array                               | `Arrays.add({10, 20, 30}, 40)`                      | `{10, 20, 30, 40}` |
| `Arrays.remove(array, value)`    | Array                               | `Arrays.remove({10, 20, 30}, 20)`                   | `{10, 30}`         |
| `Arrays.clear(array)`            | Array                               | `Arrays.clear({10, 20, 30})`                        | `{ }`              |
| `Arrays.get(array, position)`    | -                                   | `Arrays.get({0, 1, 2}, 0)`                          | 0                  |
| `Arrays.flatten(list of values)` | Array                               | `Arrays.flatten(10, {20, 30}, 40)`                  | `{10, 20, 30, 40}` |
| `Arrays.contains(array, value)`  | Boolean                             | `Arrays.contains({10, 20, 30}, 10)`                 | true               |
|                                  |                                     | `Arrays.contains({10, 20, 30}, 50)`                 | false              |
| `Arrays.size(array)`             | Integer                             | `Arrays.size({10, 20, 30})`                         | 3                  |
|                                  |                                     | `Arrays.size(NULL)`                                 | 0                  |
| `Arrays.isEmpty(array)`          | Boolean                             | `Arrays.isEmpty({10, 20})`                          | false              |
|                                  |                                     | `Arrays.isEmpty(NULL)`                              | true              |
| `Arrays.toCsvString(array)`      | String                              | `Arrays.toCsvString({"This", "is", " a ", "test"})` | This,is, a ,test   |


### Conversion Functions

##### Data Conversion Functions

| Function                | Return Type | Example              | Input                  | Output   |
| --------                | ---------   | ---------            | -------                | -------- |
| `Convert.toInt(string)` | Integer     | `Convert.toInt(val)` | `String val = '1234'`  | 1234     |
| `Convert.toInt(double)` | Integer     | `Convert.toInt(val)` | `Double val = 123.4`   | 123      |
|                         |             |                      | `Double val = 123.6`   | 124      |
| `Convert.toNum(string)` | Double      | `Convert.toNum(val)` | `String val = '3.141'` | 3.141    |

**Note:**  Convert.toInt(double) rounds the passed numeric value either up or down to the nearest integer. Be sure to consider
integer type range limitations when converting from a number to an integer with this function.

##### Country Code Conversion Functions

These functions convert between ISO 3166-1 2-character country codes (Alpha 2), 3-character country codes (Alpha 3), numeric country codes, and full ISO country names.

| Function                           | Return Type | Example                           | Output |
| ---                                | ---         | ---                               | ---    |
| `Iso3166Convert.toAlpha2(string)`  | String      | `Iso3166Convert.toAlpha2("IND")`  | IN     |
| `Iso3166Convert.toAlpha3(string)`  | String      | `Iso3166Convert.toAlpha3("840")`  | USA    |
| `Iso3166Convert.toNumeric(string)` | String      | `Iso3166Convert.toNumeric("USA")` | 840    |
| `Iso3166Convert.toName(string)`    | String      | `Iso3166Convert.toName("IN")`     | India  |

**Note:**  All these functions take ISO 3166-1 2-character country codes (Alpha 2), 3-character country codes (Alpha 3), and numeric country codes as input. The function determines the input type and returns the output in the format specified by the function name.

For more information on these codes, see the [ISO 3166-1 online lookup tool](https://www.iso.org/obp/ui/#search/code/).


### Group Functions

Group functions return either an array of groups or **True** or **False**.

| Function                        | Return Type | Example                                                         |
| ---------                       | ----------- | -------                                                         |
| `getFilteredGroups`             | Array       | `getFilteredGroups({"00gml2xHE3RYRx7cM0g3"}, "group.name", 40)` |
| `Groups.contains`               | Array       | `contains(app_type/app_instance_id, pattern, limit)`            |
| `Groups.startsWith`             | Array       | `startsWith(app_type/app_instance_id, pattern, limit)`          |
| `Groups.endsWith`               | Array       | `endsWith(app_type/app_instance_id, pattern, limit)`            |
| `isMemberOfGroupName`           | Boolean     | `isMemberOfGroupName("group1")`                                 |
| `isMemberOfGroup`               | Boolean     | `isMemberOfGroup("groupId")`                                    |
| `isMemberOfAnyGroup`            | Boolean     | `isMemberOfAnyGroup("groupId1", "groupId2", "groupId3")`        |
| `isMemberOfGroupNameStartsWith` | Boolean     | `isMemberOfGroupNameStartsWith("San Fr")`                       |
| `isMemberOfGroupNameContains`   | Boolean     | `isMemberOfGroupNameContains("admin")`                          |
| `isMemberOfGroupNameRegex`      | Boolean     | `isMemberOfGroupNameRegex("/.*admin.*")`                        |

**Note:** The **Groups.contains**, **Groups.startsWith**, and **Groups.endsWith** group functions are designed to work only with group claims. You can't use these functions with property mappings.

For an example using group functions and for more information on using group functions for dynamic and static allow lists, see [Customize tokens returned from Okta](/docs/guides/customize-tokens-returned-from-okta/).

> **Important:** When you use `Groups.startWith`, `Groups.endsWith`, or `Groups.contains`, the `pattern` argument is matched and populated on the `name` attribute rather than the Group's email (for example, when using G Suite). If you are targeting groups that may have duplicate group names (such as Google Groups), use the `getFilteredGroups` Group function instead.
>
>Example: `getFilteredGroups({"00gml2xHE3RYRx7cM0g3"}, "group.name", 40) )`
>
>See the **Parameter Examples** section of [Use group functions for static group allow lists](/docs/guides/customize-tokens-static/static-allowlist/#use-group-functions-for-static-group-allow-lists) for more information on the parameters used in this Group function.

### Linked Object Function

Use this function to retrieve the user identified with the specified `primary` relationship. You can then access properties of that user.

* Function: `user.getLinkedObject($primaryName)`
    * Parameter: (String primaryName)
    * Return Type: User
    * Example: `user.getLinkedObject("manager").lastName`
    * Example Result: `Gates`

### Time Functions

| Function                    | Input Parameter Signature          | Return Type      | Example                                                                                                            | Output                                                                                                  |
| :-----------                | :--------------------------        | :--------------- | :-----                                                                                                             | :---                                                                                                    |
| `Time.now`                  | (String timeZoneId, String format) | String           | `Time.now()`                                                                                                       | 2015-07-31T17:18:37.979Z (Current time, UTC format)                                                     |
|                             |                                    |                  | `Time.now("EST")`                                                                                                  | 2015-07-31T13:30:49.964-04:00 (Specified time zone)                                                     |
|                             |                                    |                  | `Time.now("EST", "YYYY-MM-dd HH:mm:ss")`                                                                           | 2015-07-31 13:36:48 (Specified time zone and format, military time)                                     |
| `Time.fromWindowsToIso8601` | (String time)                      | String           | Windows timestamp time as a string (Windows/LDAP timestamp doc)                                                    | The passed-in time expressed in ISO 8601 format (specifically the RFC 3339 subset of the ISO standard). |
| `Time.fromUnixToIso8601`    | (String time)                      | String           | Unix timestamp time as a string (Unix timestamp reference)                                                         | The passed-in time expressed in ISO 8601 format (specifically the RFC 3339 subset of the ISO standard). |
| `Time.fromStringToIso8601`  | (String time, String format)       | String           | Timestamp time in a human-readable yet machine-parseable arbitrary format format (as defined by [Joda time pattern](https://www.joda.org/joda-time/key_format.html)) | The passed-in time expressed in ISO 8601 format (specifically the RFC 3339 subset of the ISO standard). |
| `Time.fromIso8601ToWindows` | (String time)                      | String           | ISO 8601 timestamp time as a string                                                                                | The passed-in time expressed in Windows timestamp format.                                               |
| `Time.fromIso8601ToUnix`    | (String time)                      | String           | ISO 8601 timestamp time as a string                                                                                | The passed-in time expressed in Unix timestamp format.                                                  |
| `Time.fromIso8601ToString`  | (String time, String format)       | String           | ISO 8601 timestamp time, to convert to format using the same [Joda time pattern](https://www.joda.org/joda-time/key_format.html) semantics as fromStringToIso8601     | The passed-in time expressed informat format.                                                           |

>Note: Both input parameters are optional for the Time.now function. The time zone ID supports both new and old style formats, listed below. The third example for the Time.now function shows how to specify the military time format.

Okta supports the use of the time zone IDs and aliases listed in [the Time Zone Codes table](#appendix-time-zone-codes).

### Manager/Assistant Functions

| Function                                                           | Description                                                                         | Example                                                       |
| ---------                                                          | -----------                                                                         | -------                                                       |
| `getManagerUser(managerSource).$attribute`                         | Gets the manager's Okta user attribute values                                       | `getManagerUser("active_directory").firstName`                |
| `getManagerAppUser(managerSource, attributeSource).$attribute`     | Gets the manager's app user attribute values for the app user of any appinstance.   | `getManagerAppUser("active_directory", "google").firstName`   |
| `getAssistantUser(assistantSource).$attribute`                     | Gets the assistant's Okta user attribute values.                                    | `getAssistantUser("active_directory").firstName`              |
| `getAssistantAppUser(assistantSource, attributeSource).$attribute` | Gets the assistant's app user attribute values for the app user of any appinstance. | `getAssistantAppUser("active_directory", "google").firstName` |

The following should be noted about these functions:

* Be sure to pass the correct App name for the `managerSource`, `assistantSource`, and `attributeSource` parameters.<br />
* At this time, `active_directory` is the only supported value for `managerSource` and `assistantSource`.
* Calling the `getManagerUser("active_directory")` function doesn't trigger a user profile update after the manager is changed.

### Directory and Workday Functions

| Function              | Description                                                                                                                                 |
| --------              | ---------                                                                                                                                   |
| `hasDirectoryUser()`  | Checks whether the user has an Active Directory assignment and returns a boolean                                                            |
| `hasWorkdayUser()`    | Checks whether the user has a Workday assignment and returns a boolean                                                                      |
| `findDirectoryUser()` | Finds the Active Directory App user object and returns that object or null if the user has more than one or no Active Directory assignments |
| `findWorkdayUser()`   | Finds the Workday App user object and returns that object or null if the user has more than one or no Active Directory assignments          |

The functions above are often used in tandem to check whether a user has an AD or Workday assignment, and if so, return an AD or Workday attribute. See the 'Popular Expressions' table below for some examples.

## Constants and Operators

| Common Actions                                                                              | Example                                     |
| ----------------                                                                            | --------                                    |
| Refer to a `String` constant                                                                | `'Hello world'`                             |
| Refer to a `Integer` constant                                                               | `1234`                                      |
| Refer to a `Number` constant                                                                | `3.141`                                     |
| Refer to a `Boolean` constant                                                               | `true`                                      |
| Concatenate two strings                                                                     | `user.firstName + user.lastName`            |
| Concatenate two strings with space                                                          | `user.firstName + " " + user.lastName`      |
| Ternary operator example:<br>If group code is 123, assign value of Sales, else assign Other | `user.groupCode == 123 ? 'Sales' : 'Other'` |

## Conditional Expressions

You can specify IF...THEN...ELSE statements with the Okta EL. The primary use of these expressions is profile mappings and group rules. Group rules do not usually specify an ELSE component.


The format for conditional expressions is
<p><code>[Condition] ? [Value if TRUE] : [Value if FALSE]</code></p>


<br>There are several rules for specifying the condition.

* Expressions must have valid syntax.
* Expressions must evaluate to Boolean.
* Expressions cannot contain an assignment operator, such as =.
* User attributes used in expressions can contain only available User or AppUser attributes.

<br>The following functions are supported in conditions.

* Any Okta Expression Language function
* The `AND` operator
* The `OR` operator
* The `!` operator to designate NOT
* Standard relational operators including <code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>, and <code>&gt;=</code>.

**Note:** Use the double equals sign `==` to check for equality and `!=` for inequality.

The following functions are not supported in conditions:

- Convert
- Array
- Time

### Samples

For these samples, assume that *user* has following attributes in Okta.

| Attribute       | Type    |
| ---------       | ----    |
| firstName       | String  |
| lastName        | String  |
| middleInitial   | String  |
| fullName        | String  |
| honorificPrefix | String  |
| email1          | String  |
| email2          | String  |
| additionalEmail | Boolean |
| city            | String  |
| salary          | Int     |
| isContractor    | Boolean |


##### Samples Using Profile Mapping

The following samples are valid conditional expressions that apply to profile mapping. The attribute `courtesyTitle` is from another system being mapped to Okta.

If the middle initial is not empty, include it as part of the full name, using just the first character and appending a period.<br>
`firstName + " " + (String.len(middleInitial) == 0 ? "" : (String.substring(middleInitial, 0, 1) + ". ")) + lastName`

Include the honorific prefix in front of the full name, or use the courtesy title instead if it exists. If both are absent, don't use any title.<br>
`(courtesyTitle != "" ? (courtesyTitle + " ") : honorificPrefix != "" ? (honorificPrefix + " ") : "") + firstName + " " + (String.len(middleInitial) == 0 ? "" : (String.substring(middleInitial, 0, 1) + ". ")) + lastName`

##### Samples Using Group Rules

The following samples are valid conditional expressions. The actions in these cases are group assignments.


| IF (Implicit) | Condition                                      | Assign to this Group Name if Condition is TRUE |
| ---           | ---                                            | ---                                            |
| IF            | String.stringContains(user.firstName, "dummy") | dummyUsers                                     |
| IF            | user.city == "San Francisco"                   | sfo                                            |
| IF            | user.salary >= 1000000                         | expensiveEmployee                              |
| IF            | !user.isContractor                             | fullTimeEmployees                              |
| IF            | user.salary > 1000000 AND !user.isContractor   | expensiveFullTimeEmployees                     |


## Popular Expressions

Sample user data:

* Firstname = Winston
* Lastname = Churchill
* Email = winston.churchill@gmail.com
* Login = winston.churchill@gmail.com

| Value to Obtain                                                    | Expression                                                                                                                                               | Example Output          | Explanation                                                                                                                                                                                                                                                                                                                                                                                            |
| ----------                                                         | ----                                                                                                                                                     | -----                   | ---------------                                                                                                                                                                                                                                                                                                                                                                                        |
| Firstname                                                          | `user.firstName`                                                                                                                                         | Winston                 | Obtain the value of users' firstname attribute.                                                                                                                                                                                                                                                                                                                                                        |
| Firstname + Lastname                                               | `user.firstName + user.lastName`                                                                                                                         | WinstonChurchill        | Obtain Firstname and Lastname values and append each together.                                                                                                                                                                                                                                                                                                                                         |
| Firstname + Lastname with Separator                                | `user.firstName + "." + user.lastName`                                                                                                                   | Winston.Churchill       | Obtain Firstname value, append a "." character. Obtain and append the Lastname value.                                                                                                                                                                                                                                                                                                                  |
| First Initial + Lastname                                           | `substring(user.firstName, 0, 1) + user.lastName`                                                                                                        | WChurchill              | Obtain Firstname value. From result, retrieve characters greater than position 0 thru position 1, including position 1. Obtain and append the Lastname value.                                                                                                                                                                                                                                          |
| First Initial + Lastname with Limit                                | `substring(user.firstName, 0, 1) + substring(user.lastName, 0, 6)`                                                                                       | WChurch                 | Obtain Firstname value. From result, retrieve 1 character starting at the beginning of the string. Obtain Lastname value. From result, retrieve characters greater than position 0 thru position 6, including position 6.                                                                                                                                                                              |
| Lower Case First Initial + Lower Case Lastname with Separator      | `toLowerCase(substring( user.firstName, 0, 1)) + "." + toLowerCase(user.lastName)`                                                                       | w.churchhill            | Obtain Firstname value. From result, retrieve characters greater than position 0 thru position 1, including position 1. Convert result to lowercase. Append a "." character. Obtain the Lastname value. Convert to lowercase and append.                                                                                                                                                               |
| Email Domain + Email Prefix with Separator                         | `toUpperCase(substringBefore( substringAfter(user.email, "@"), ".")) + "\" + substringBefore( user.email, "@")`                                          | GMAIL\winston.churchill | Obtain Email value. From result, parse everything after the "@ character". From result, parse everything before the "." character. Convert to uppercase. Append a backslash "\" character. Obtain the email value again. From result, parse for everything before the "@" character.                                                                                                                   |
| Email Domain + Lowercase First Initial and Lastname with Separator | `toUpperCase(substringBefore( substringAfter(user.email, "@"), ".")) + "\" + toLowerCase(substring( user.firstName, 0, 1)) + toLowerCase(user.lastName)` | GMAIL\wchurchill        | Obtain Email value. From result, parse everything after the "@ character". From result, parse everything before the "." character. Convert to uppercase. Append a backslash "\" character. Obtain the Firstname value. From result, retrieve characters greater than position 0 thru position 1, including position 1. Convert it to lowercase. Obtain the Lastname value and convert it to lowercase. |
| Static Domain + Email Prefix with Separator                        | `"XDOMAIN\" + toLowerCase(substring( user.firstName, 0, 1)) + toLowerCase(user.lastName)`                                                                | XDOMAIN\wchurchill      | Add "XDOMAIN" string. Append a backslash "\" character. Obtain the Firstname value. From result, retrieve characters greater than position 0 thru position 1, including position 1. Convert it to lowercase. Obtain the Lastname value. Convert it to lowercase.                                                                                                                                       |
| Workday ID                                                         | `hasWorkdayUser() ? findWorkdayUser().employeeID : null`                                                                                                 | 123456                  | Check if user has a Workday assignment, and if so, return their Workday employee ID.                                                                                                                                                                                                                                                                                                                   |
| Active Directory UPN                                               | `hasDirectoryUser() ? findDirectoryUser().managerUpn : null`                                                                                             | bob@okta.com            | Check if user has an Active Directory assignment, and if so, return their Active Directory manager UPN.                                                                                                                                                                                                                                                                                                |

## Appendix: Time Zone Codes

Okta supports the use of the following time zone codes:

| Standard Offset       | Canonical ID                   | Aliases                                                                           |
| --------------------: | :-----------------             | ---------                                                                         |
| -12:00                | Etc/GMT+12                     |                                                                                   |
| -11:00                | Etc/GMT+11                     |                                                                                   |
| -11:00                | Pacific/Apia                   |                                                                                   |
| -11:00                | Pacific/Midway                 |                                                                                   |
| -11:00                | Pacific/Niue                   |                                                                                   |
| -11:00                | Pacific/Pago_Pago              | Pacific/Samoa, US/Samoa                                                           |
| -10:00                | America/Adak                   | America/Atka, US/Aleutian                                                         |
| -10:00                | Etc/GMT+10                     |                                                                                   |
| -10:00                | HST                            |                                                                                   |
| -10:00                | Pacific/Fakaofo                |                                                                                   |
| -10:00                | Pacific/Honolulu               | US/Hawaii                                                                         |
| -10:00                | Pacific/Johnston               |                                                                                   |
| -10:00                | Pacific/Rarotonga              |                                                                                   |
| -10:00                | Pacific/Tahiti                 |                                                                                   |
| -09:30                | Pacific/Marquesas              |                                                                                   |
| -09:00                | America/Anchorage              | US/Alaska                                                                         |
| -09:00                | America/Juneau                 |                                                                                   |
| -09:00                | America/Nome                   |                                                                                   |
| -09:00                | America/Yakutat                |                                                                                   |
| -09:00                | Etc/GMT+9                      |                                                                                   |
| -09:00                | Pacific/Gambier                |                                                                                   |
| -08:00                | America/Dawson                 |                                                                                   |
| -08:00                | America/Los_Angeles            | US/Pacific, US/Pacific-New                                                        |
| -08:00                | America/Santa_Isabel           |                                                                                   |
| -08:00                | America/Tijuana                | America/Ensenada, Mexico/BajaNorte                                                |
| -08:00                | America/Vancouver              | Canada/Pacific                                                                    |
| -08:00                | America/Whitehorse             | Canada/Yukon                                                                      |
| -08:00                | Etc/GMT+8                      |                                                                                   |
| -08:00                | PST8PDT                        |                                                                                   |
| -08:00                | Pacific/Pitcairn               |                                                                                   |
| -07:00                | America/Boise                  |                                                                                   |
| -07:00                | America/Cambridge_Bay          |                                                                                   |
| -07:00                | America/Chihuahua              |                                                                                   |
| -07:00                | America/Dawson_Creek           |                                                                                   |
| -07:00                | America/Denver                 | America/Shiprock, Navajo, US/Mountain                                             |
| -07:00                | America/Edmonton               | Canada/Mountain                                                                   |
| -07:00                | America/Hermosillo             |                                                                                   |
| -07:00                | America/Inuvik                 |                                                                                   |
| -07:00                | America/Mazatlan               | Mexico/BajaSur                                                                    |
| -07:00                | America/Ojinaga                |                                                                                   |
| -07:00                | America/Phoenix                | US/Arizona                                                                        |
| -07:00                | America/Yellowknife            |                                                                                   |
| -07:00                | Etc/GMT+7                      |                                                                                   |
| -07:00                | MST                            |                                                                                   |
| -07:00                | MST7MDT                        |                                                                                   |
| -06:00                | America/Bahia_Banderas         |                                                                                   |
| -06:00                | America/Belize                 |                                                                                   |
| -06:00                | America/Cancun                 |                                                                                   |
| -06:00                | America/Chicago                | US/Central                                                                        |
| -06:00                | America/Costa_Rica             |                                                                                   |
| -06:00                | America/El_Salvador            |                                                                                   |
| -06:00                | America/Guatemala              |                                                                                   |
| -06:00                | America/Indiana/Knox           | America/Knox_IN, US/Indiana-Starke                                                |
| -06:00                | America/Indiana/Tell_City      |                                                                                   |
| -06:00                | America/Managua                |                                                                                   |
| -06:00                | America/Matamoros              |                                                                                   |
| -06:00                | America/Menominee              |                                                                                   |
| -06:00                | America/Merida                 |                                                                                   |
| -06:00                | America/Mexico_City            | Mexico/General                                                                    |
| -06:00                | America/Monterrey              |                                                                                   |
| -06:00                | America/North_Dakota/Center    |                                                                                   |
| -06:00                | America/North_Dakota/New_Salem |                                                                                   |
| -06:00                | America/Rainy_River            |                                                                                   |
| -06:00                | America/Rankin_Inlet           |                                                                                   |
| -06:00                | America/Regina                 | Canada/East-Saskatchewan, Canada/Saskatchewan                                     |
| -06:00                | America/Swift_Current          |                                                                                   |
| -06:00                | America/Tegucigalpa            |                                                                                   |
| -06:00                | America/Winnipeg               | Canada/Central                                                                    |
| -06:00                | CST6CDT                        |                                                                                   |
| -06:00                | Etc/GMT+6                      |                                                                                   |
| -06:00                | Pacific/Easter                 | Chile/EasterIsland                                                                |
| -06:00                | Pacific/Galapagos              |                                                                                   |
| -05:00                | America/Atikokan               | America/Coral_Harbour                                                             |
| -05:00                | America/Bogota                 |                                                                                   |
| -05:00                | America/Cayman                 |                                                                                   |
| -05:00                | America/Detroit                | US/Michigan                                                                       |
| -05:00                | America/Grand_Turk             |                                                                                   |
| -05:00                | America/Guayaquil              |                                                                                   |
| -05:00                | America/Havana                 | Cuba                                                                              |
| -05:00                | America/Indiana/Indianapolis   | America/Fort_Wayne, America/Indianapolis US/East-Indiana                          |
| -05:00                | America/Indiana/Marengo        |                                                                                   |
| -05:00                | America/Indiana/Petersburg     |                                                                                   |
| -05:00                | America/Indiana/Vevay          |                                                                                   |
| -05:00                | America/Indiana/Vincennes      |                                                                                   |
| -05:00                | America/Indiana/Winamac        |                                                                                   |
| -05:00                | America/Iqaluit                |                                                                                   |
| -05:00                | America/Jamaica                | Jamaica                                                                           |
| -05:00                | America/Kentucky/Louisville    | America/Louisville                                                                |
| -05:00                | America/Kentucky/Monticello    |                                                                                   |
| -05:00                | America/Lima                   |                                                                                   |
| -05:00                | America/Montreal               |                                                                                   |
| -05:00                | America/Nassau                 |                                                                                   |
| -05:00                | America/New_York               | US/Eastern                                                                        |
| -05:00                | America/Nipigon                |                                                                                   |
| -05:00                | America/Panama                 |                                                                                   |
| -05:00                | America/Pangnirtung            |                                                                                   |
| -05:00                | America/Port-au-Prince         |                                                                                   |
| -05:00                | America/Resolute               |                                                                                   |
| -05:00                | America/Thunder_Bay            |                                                                                   |
| -05:00                | America/Toronto                | Canada/Eastern                                                                    |
| -05:00                | EST                            |                                                                                   |
| -05:00                | EST5EDT                        |                                                                                   |
| -05:00                | Etc/GMT+5                      |                                                                                   |
| -04:30                | America/Caracas                |                                                                                   |
| -04:00                | America/Anguilla               |                                                                                   |
| -04:00                | America/Antigua                |                                                                                   |
| -03:00                | America/Argentina/San_Luis     |                                                                                   |
| -04:00                | America/Aruba                  |                                                                                   |
| -04:00                | America/Asuncion               |                                                                                   |
| -04:00                | America/Barbados               |                                                                                   |
| -04:00                | America/Blanc-Sablon           |                                                                                   |
| -04:00                | America/Boa_Vista              |                                                                                   |
| -04:00                | America/Campo_Grande           |                                                                                   |
| -04:00                | America/Cuiaba                 |                                                                                   |
| -04:00                | America/Curacao                |                                                                                   |
| -04:00                | America/Dominica               |                                                                                   |
| -04:00                | America/Eirunepe               |                                                                                   |
| -04:00                | America/Glace_Bay              |                                                                                   |
| -04:00                | America/Goose_Bay              |                                                                                   |
| -04:00                | America/Grenada                |                                                                                   |
| -04:00                | America/Guadeloupe             | America/Marigot, America/St_Barthelemy                                            |
| -04:00                | America/Guyana                 |                                                                                   |
| -04:00                | America/Halifax                | Canada/Atlantic                                                                   |
| -04:00                | America/La_Paz                 |                                                                                   |
| -04:00                | America/Manaus                 | Brazil/West                                                                       |
| -04:00                | America/Martinique             |                                                                                   |
| -04:00                | America/Moncton                |                                                                                   |
| -04:00                | America/Montserrat             |                                                                                   |
| -04:00                | America/Port_of_Spain          |                                                                                   |
| -04:00                | America/Porto_Velho            |                                                                                   |
| -04:00                | America/Puerto_Rico            |                                                                                   |
| -04:00                | America/Rio_Branco             | America/Porto_Acre, Brazil/Acre                                                   |
| -04:00                | America/Santiago               | Chile/Continental                                                                 |
| -04:00                | America/Santo_Domingo          |                                                                                   |
| -04:00                | America/St_Kitts               |                                                                                   |
| -04:00                | America/St_Lucia               |                                                                                   |
| -04:00                | America/St_Thomas              | America/Virgin                                                                    |
| -04:00                | America/St_Vincent             |                                                                                   |
| -04:00                | America/Thule                  |                                                                                   |
| -04:00                | America/Tortola                |                                                                                   |
| -04:00                | Antarctica/Palmer              |                                                                                   |
| -04:00                | Atlantic/Bermuda               |                                                                                   |
| -04:00                | Atlantic/Stanley               |                                                                                   |
| -04:00                | Etc/GMT+4                      |                                                                                   |
| -03:30                | America/St_Johns               | Canada/Newfoundland                                                               |
| -03:00                | America/Araguaina              |                                                                                   |
| -03:00                | America/Argentina/Buenos_Aires | America/Buenos_Aires                                                              |
| -03:00                | America/Argentina/Catamarca    | America/Argentina/ComodRivadavia, America/Catamarca                               |
| -03:00                | America/Argentina/Cordoba      | America/Cordoba, America/Rosario                                                  |
| -03:00                | America/Argentina/Jujuy        | America/Jujuy                                                                     |
| -03:00                | America/Argentina/La_Rioja     |                                                                                   |
| -03:00                | America/Argentina/Mendoza      | America/Mendoza                                                                   |
| -03:00                | America/Argentina/Rio_Gallegos |                                                                                   |
| -03:00                | America/Argentina/Salta        |                                                                                   |
| -03:00                | America/Argentina/San_Juan     |                                                                                   |
| -03:00                | America/Argentina/Tucuman      |                                                                                   |
| -03:00                | America/Argentina/Ushuaia      |                                                                                   |
| -03:00                | America/Bahia                  |                                                                                   |
| -03:00                | America/Belem                  |                                                                                   |
| -03:00                | America/Cayenne                |                                                                                   |
| -03:00                | America/Fortaleza              |                                                                                   |
| -03:00                | America/Godthab                |                                                                                   |
| -03:00                | America/Maceio                 |                                                                                   |
| -03:00                | America/Miquelon               |                                                                                   |
| -03:00                | America/Montevideo             |                                                                                   |
| -03:00                | America/Paramaribo             |                                                                                   |
| -03:00                | America/Recife                 |                                                                                   |
| -03:00                | America/Santarem               |                                                                                   |
| -03:00                | America/Sao_Paulo              | Brazil/East                                                                       |
| -03:00                | Antarctica/Rothera             |                                                                                   |
| -03:00                | Etc/GMT+3                      |                                                                                   |
| -02:00                | America/Noronha                | Brazil/DeNoronha                                                                  |
| -02:00                | Atlantic/South_Georgia         |                                                                                   |
| -02:00                | Etc/GMT+2                      |                                                                                   |
| -01:00                | America/Scoresbysund           |                                                                                   |
| -01:00                | Atlantic/Azores                |                                                                                   |
| -01:00                | Atlantic/Cape_Verde            |                                                                                   |
| -01:00                | Etc/GMT+1                      |                                                                                   |
| +00:00                | Africa/Abidjan                 |                                                                                   |
| +00:00                | Africa/Accra                   |                                                                                   |
| +00:00                | Africa/Bamako                  | Africa/Timbuktu                                                                   |
| +00:00                | Africa/Banjul                  |                                                                                   |
| +00:00                | Africa/Bissau                  |                                                                                   |
| +00:00                | Africa/Casablanca              |                                                                                   |
| +00:00                | Africa/Conakry                 |                                                                                   |
| +00:00                | Africa/Dakar                   |                                                                                   |
| +00:00                | Africa/El_Aaiun                |                                                                                   |
| +00:00                | Africa/Freetown                |                                                                                   |
| +00:00                | Africa/Lome                    |                                                                                   |
| +00:00                | Africa/Monrovia                |                                                                                   |
| +00:00                | Africa/Nouakchott              |                                                                                   |
| +00:00                | Africa/Ouagadougou             |                                                                                   |
| +00:00                | Africa/Sao_Tome                |                                                                                   |
| +00:00                | America/Danmarkshavn           |                                                                                   |
| +00:00                | Atlantic/Canary                |                                                                                   |
| +00:00                | Atlantic/Faroe                 | Atlantic/Faeroe                                                                   |
| +00:00                | Atlantic/Madeira               |                                                                                   |
| +00:00                | Atlantic/Reykjavik             | Iceland                                                                           |
| +00:00                | Atlantic/St_Helena             |                                                                                   |
| +00:00                | Etc/GMT                        | Etc/GMT+0, Etc/GMT-0, Etc/GMT0, Etc/Greenwich, GMT, GMT+0, GMT-0, GMT0, Greenwich |
| +00:00                | Etc/UCT                        | UCT                                                                               |
| +00:00                | Etc/UTC                        | Etc/Universal, Etc/Zulu, Universal, Zulu                                          |
| +00:00                | Europe/Dublin                  | Eire                                                                              |
| +00:00                | Europe/Lisbon                  | Portugal                                                                          |
| +00:00                | Europe/London                  | Europe/Belfast, Europe/Guernsey, Europe/Isle_of_Man, Europe/Jersey, GB, GB-Eire   |
| +00:00                | UTC                            |                                                                                   |
| +00:00                | WET                            |                                                                                   |
| +01:00                | Africa/Algiers                 |                                                                                   |
| +01:00                | Africa/Bangui                  |                                                                                   |
| +01:00                | Africa/Brazzaville             |                                                                                   |
| +01:00                | Africa/Ceuta                   |                                                                                   |
| +01:00                | Africa/Douala                  |                                                                                   |
| +01:00                | Africa/Kinshasa                |                                                                                   |
| +01:00                | Africa/Lagos                   |                                                                                   |
| +01:00                | Africa/Libreville              |                                                                                   |
| +01:00                | Africa/Luanda                  |                                                                                   |
| +01:00                | Africa/Malabo                  |                                                                                   |
| +01:00                | Africa/Ndjamena                |                                                                                   |
| +01:00                | Africa/Niamey                  |                                                                                   |
| +01:00                | Africa/Porto-Novo              |                                                                                   |
| +01:00                | Africa/Tunis                   |                                                                                   |
| +01:00                | Africa/Windhoek                |                                                                                   |
| +01:00                | CET                            |                                                                                   |
| +01:00                | Etc/GMT-1                      |                                                                                   |
| +01:00                | Europe/Amsterdam               |                                                                                   |
| +01:00                | Europe/Andorra                 |                                                                                   |
| +01:00                | Europe/Belgrade                | Europe/Ljubljana, Europe/Podgorica, Europe/Sarajevo, Europe/Skopje, Europe/Zagreb |
| +01:00                | Europe/Berlin                  |                                                                                   |
| +01:00                | Europe/Brussels                |                                                                                   |
| +01:00                | Europe/Budapest                |                                                                                   |
| +01:00                | Europe/Copenhagen              |                                                                                   |
| +01:00                | Europe/Gibraltar               |                                                                                   |
| +01:00                | Europe/Luxembourg              |                                                                                   |
| +01:00                | Europe/Madrid                  |                                                                                   |
| +01:00                | Europe/Malta                   |                                                                                   |
| +01:00                | Europe/Monaco                  |                                                                                   |
| +01:00                | Europe/Oslo                    | Arctic/Longyearbyen, Atlantic/Jan_Mayen                                           |
| +01:00                | Europe/Paris                   |                                                                                   |
| +01:00                | Europe/Prague                  | Europe/Bratislava                                                                 |
| +01:00                | Europe/Rome                    | Europe/San_Marino, Europe/Vatican                                                 |
| +01:00                | Europe/Stockholm               |                                                                                   |
| +01:00                | Europe/Tirane                  |                                                                                   |
| +01:00                | Europe/Vaduz                   |                                                                                   |
| +01:00                | Europe/Vienna                  |                                                                                   |
| +01:00                | Europe/Warsaw                  | Poland                                                                            |
| +01:00                | Europe/Zurich                  |                                                                                   |
| +01:00                | MET                            |                                                                                   |
| +02:00                | Africa/Blantyre                |                                                                                   |
| +02:00                | Africa/Bujumbura               |                                                                                   |
| +02:00                | Africa/Cairo                   | Egypt                                                                             |
| +02:00                | Africa/Gaborone                |                                                                                   |
| +02:00                | Africa/Harare                  |                                                                                   |
| +02:00                | Africa/Johannesburg            |                                                                                   |
| +02:00                | Africa/Kigali                  |                                                                                   |
| +02:00                | Africa/Lubumbashi              |                                                                                   |
| +02:00                | Africa/Lusaka                  |                                                                                   |
| +02:00                | Africa/Maputo                  |                                                                                   |
| +02:00                | Africa/Maseru                  |                                                                                   |
| +02:00                | Africa/Mbabane                 |                                                                                   |
| +02:00                | Africa/Tripoli                 | Libya                                                                             |
| +02:00                | Asia/Amman                     |                                                                                   |
| +02:00                | Asia/Beirut                    |                                                                                   |
| +02:00                | Asia/Damascus                  |                                                                                   |
| +02:00                | Asia/Gaza                      |                                                                                   |
| +02:00                | Asia/Jerusalem                 | Asia/Tel_Aviv, Israel                                                             |
| +02:00                | Asia/Nicosia                   | Europe/Nicosia                                                                    |
| +02:00                | EET                            |                                                                                   |
| +02:00                | Etc/GMT-2                      |                                                                                   |
| +02:00                | Europe/Athens                  |                                                                                   |
| +02:00                | Europe/Bucharest               |                                                                                   |
| +02:00                | Europe/Chisinau                | Europe/Tiraspol                                                                   |
| +02:00                | Europe/Helsinki                | Europe/Mariehamn                                                                  |
| +02:00                | Europe/Istanbul                | Asia/Istanbul, Turkey                                                             |
| +02:00                | Europe/Kaliningrad             |                                                                                   |
| +02:00                | Europe/Kiev                    |                                                                                   |
| +02:00                | Europe/Minsk                   |                                                                                   |
| +02:00                | Europe/Riga                    |                                                                                   |
| +02:00                | Europe/Simferopol              |                                                                                   |
| +02:00                | Europe/Sofia                   |                                                                                   |
| +02:00                | Europe/Tallinn                 |                                                                                   |
| +02:00                | Europe/Uzhgorod                |                                                                                   |
| +02:00                | Europe/Vilnius                 |                                                                                   |
| +02:00                | Europe/Zaporozhye              |                                                                                   |
| +03:00                | Africa/Addis_Ababa             |                                                                                   |
| +03:00                | Africa/Asmara                  | Africa/Asmera                                                                     |
| +03:00                | Africa/Dar_es_Salaam           |                                                                                   |
| +03:00                | Africa/Djibouti                |                                                                                   |
| +03:00                | Africa/Kampala                 |                                                                                   |
| +03:00                | Africa/Khartoum                |                                                                                   |
| +03:00                | Africa/Mogadishu               |                                                                                   |
| +03:00                | Africa/Nairobi                 |                                                                                   |
| +03:00                | Antarctica/Syowa               |                                                                                   |
| +03:00                | Asia/Aden                      |                                                                                   |
| +03:00                | Asia/Baghdad                   |                                                                                   |
| +03:00                | Asia/Bahrain                   |                                                                                   |
| +03:00                | Asia/Kuwait                    |                                                                                   |
| +03:00                | Asia/Qatar                     |                                                                                   |
| +03:00                | Asia/Riyadh                    |                                                                                   |
| +03:00                | Etc/GMT-3                      |                                                                                   |
| +03:00                | Europe/Moscow                  | W-SU                                                                              |
| +03:00                | Europe/Samara                  |                                                                                   |
| +03:00                | Europe/Volgograd               |                                                                                   |
| +03:00                | Indian/Antananarivo            |                                                                                   |
| +03:00                | Indian/Comoro                  |                                                                                   |
| +03:00                | Indian/Mayotte                 |                                                                                   |
| +03:30                | Asia/Tehran                    | Iran                                                                              |
| +04:00                | Asia/Baku                      |                                                                                   |
| +04:00                | Asia/Dubai                     |                                                                                   |
| +04:00                | Asia/Muscat                    |                                                                                   |
| +04:00                | Asia/Tbilisi                   |                                                                                   |
| +04:00                | Asia/Yerevan                   |                                                                                   |
| +04:00                | Etc/GMT-4                      |                                                                                   |
| +04:00                | Indian/Mahe                    |                                                                                   |
| +04:00                | Indian/Mauritius               |                                                                                   |
| +04:00                | Indian/Reunion                 |                                                                                   |
| +04:30                | Asia/Kabul                     |                                                                                   |
| +05:00                | Antarctica/Mawson              |                                                                                   |
| +05:00                | Asia/Aqtau                     |                                                                                   |
| +05:00                | Asia/Aqtobe                    |                                                                                   |
| +05:00                | Asia/Ashgabat                  | Asia/Ashkhabad                                                                    |
| +05:00                | Asia/Dushanbe                  |                                                                                   |
| +05:00                | Asia/Karachi                   |                                                                                   |
| +05:00                | Asia/Oral                      |                                                                                   |
| +05:00                | Asia/Samarkand                 |                                                                                   |
| +05:00                | Asia/Tashkent                  |                                                                                   |
| +05:00                | Asia/Yekaterinburg             |                                                                                   |
| +05:00                | Etc/GMT-5                      |                                                                                   |
| +05:00                | Indian/Kerguelen               |                                                                                   |
| +05:00                | Indian/Maldives                |                                                                                   |
| +05:30                | Asia/Colombo                   |                                                                                   |
| +05:30                | Asia/Kolkata                   | Asia/Calcutta                                                                     |
| +05:45                | Asia/Kathmandu                 | Asia/Katmandu                                                                     |
| +06:00                | Antarctica/Vostok              |                                                                                   |
| +06:00                | Asia/Almaty                    |                                                                                   |
| +06:00                | Asia/Bishkek                   |                                                                                   |
| +06:00                | Asia/Dhaka                     | Asia/Dacca                                                                        |
| +06:00                | Asia/Novokuznetsk              |                                                                                   |
| +06:00                | Asia/Novosibirsk               |                                                                                   |
| +06:00                | Asia/Omsk                      |                                                                                   |
| +06:00                | Asia/Qyzylorda                 |                                                                                   |
| +06:00                | Asia/Thimphu                   | Asia/Thimbu                                                                       |
| +06:00                | Etc/GMT-6                      |                                                                                   |
| +06:00                | Indian/Chagos                  |                                                                                   |
| +06:30                | Asia/Rangoon                   |                                                                                   |
| +06:30                | Indian/Cocos                   |                                                                                   |
| +07:00                | Antarctica/Davis               |                                                                                   |
| +07:00                | Asia/Bangkok                   |                                                                                   |
| +07:00                | Asia/Ho_Chi_Minh               | Asia/Saigon                                                                       |
| +07:00                | Asia/Hovd                      |                                                                                   |
| +07:00                | Asia/Jakarta                   |                                                                                   |
| +07:00                | Asia/Krasnoyarsk               |                                                                                   |
| +07:00                | Asia/Phnom_Penh                |                                                                                   |
| +07:00                | Asia/Pontianak                 |                                                                                   |
| +07:00                | Asia/Vientiane                 |                                                                                   |
| +07:00                | Etc/GMT-7                      |                                                                                   |
| +07:00                | Indian/Christmas               |                                                                                   |
| +08:00                | Antarctica/Casey               |                                                                                   |
| +08:00                | Asia/Brunei                    |                                                                                   |
| +08:00                | Asia/Choibalsan                |                                                                                   |
| +08:00                | Asia/Chongqing                 | Asia/Chungking                                                                    |
| +08:00                | Asia/Harbin                    |                                                                                   |
| +08:00                | Asia/Hong_Kong                 | Hongkong                                                                          |
| +08:00                | Asia/Irkutsk                   |                                                                                   |
| +08:00                | Asia/Kashgar                   |                                                                                   |
| +08:00                | Asia/Kuala_Lumpur              |                                                                                   |
| +08:00                | Asia/Kuching                   |                                                                                   |
| +08:00                | Asia/Macau                     | Asia/Macao                                                                        |
| +08:00                | Asia/Makassar                  | Asia/Ujung_Pandang                                                                |
| +08:00                | Asia/Manila                    |                                                                                   |
| +08:00                | Asia/Shanghai                  | PRC                                                                               |
| +08:00                | Asia/Singapore                 | Singapore                                                                         |
| +08:00                | Asia/Taipei                    | ROC                                                                               |
| +08:00                | Asia/Ulaanbaatar               | Asia/Ulan_Bator                                                                   |
| +08:00                | Asia/Urumqi                    |                                                                                   |
| +08:00                | Australia/Perth                | Australia/West                                                                    |
| +08:00                | Etc/GMT-8                      |                                                                                   |
| +08:45                | Australia/Eucla                |                                                                                   |
| +09:00                | Asia/Dili                      |                                                                                   |
| +09:00                | Asia/Jayapura                  |                                                                                   |
| +09:00                | Asia/Pyongyang                 |                                                                                   |
| +09:00                | Asia/Seoul                     | ROK                                                                               |
| +09:00                | Asia/Tokyo                     | Japan                                                                             |
| +09:00                | Asia/Yakutsk                   |                                                                                   |
| +09:00                | Etc/GMT-9                      |                                                                                   |
| +09:00                | Pacific/Palau                  |                                                                                   |
| +09:30                | Australia/Adelaide             | Australia/South                                                                   |
| +09:30                | Australia/Broken_Hill          | Australia/Yancowinna                                                              |
| +09:30                | Australia/Darwin               | Australia/North                                                                   |
| +10:00                | Antarctica/DumontDUrville      |                                                                                   |
| +10:00                | Asia/Sakhalin                  |                                                                                   |
| +10:00                | Asia/Vladivostok               |                                                                                   |
| +10:00                | Australia/Brisbane             | Australia/Queensland                                                              |
| +10:00                | Australia/Currie               |                                                                                   |
| +10:00                | Australia/Hobart               | Australia/Tasmania                                                                |
| +10:00                | Australia/Lindeman             |                                                                                   |
| +10:00                | Australia/Melbourne            | Australia/Victoria                                                                |
| +10:00                | Australia/Sydney               | Australia/ACT, Australia/Canberra, Australia/NSW                                  |
| +10:00                | Etc/GMT-10                     |                                                                                   |
| +10:00                | Pacific/Chuuk                  | Pacific/Truk, Pacific/Yap                                                         |
| +10:00                | Pacific/Guam                   |                                                                                   |
| +10:00                | Pacific/Port_Moresby           |                                                                                   |
| +10:00                | Pacific/Saipan                 |                                                                                   |
| +10:30                | Australia/Lord_Howe            | Australia/LHI                                                                     |
| +11:00                | Antarctica/Macquarie           |                                                                                   |
| +11:00                | Asia/Anadyr                    |                                                                                   |
| +11:00                | Asia/Kamchatka                 |                                                                                   |
| +11:00                | Asia/Magadan                   |                                                                                   |
| +11:00                | Etc/GMT-11                     |                                                                                   |
| +11:00                | Pacific/Efate                  |                                                                                   |
| +11:00                | Pacific/Guadalcanal            |                                                                                   |
| +11:00                | Pacific/Kosrae                 |                                                                                   |
| +11:00                | Pacific/Noumea                 |                                                                                   |
| +11:00                | Pacific/Pohnpei                | Pacific/Ponape                                                                    |
| +11:30                | Pacific/Norfolk                |                                                                                   |
| +12:00                | Antarctica/McMurdo             | Antarctica/South_Pole                                                             |
| +12:00                | Etc/GMT-12                     |                                                                                   |
| +12:00                | Pacific/Auckland               | NZ                                                                                |
| +12:00                | Pacific/Fiji                   |                                                                                   |
| +12:00                | Pacific/Funafuti               |                                                                                   |
| +12:00                | Pacific/Kwajalein              | Kwajalein                                                                         |
| +12:00                | Pacific/Majuro                 |                                                                                   |
| +12:00                | Pacific/Nauru                  |                                                                                   |
| +12:00                | Pacific/Tarawa                 |                                                                                   |
| +12:00                | Pacific/Wake                   |                                                                                   |
| +12:00                | Pacific/Wallis                 |                                                                                   |
| +12:45                | Pacific/Chatham                | NZ-CHAT                                                                           |
| +13:00                | Etc/GMT-13                     |                                                                                   |
| +13:00                | Pacific/Enderbury              |                                                                                   |
| +13:00                | Pacific/Tongatapu              |                                                                                   |
| +14:00                | Etc/GMT-14                     |                                                                                   |
| +14:00                | Pacific/Kiritimati             |                                                                                   |
