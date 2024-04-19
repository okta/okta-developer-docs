---
title: User query options
meta:
  - name: description
    content: Learn how to use the search parameter for most user query operations.
---

# User query options

Searching for and returning Okta users is a standard Users API lifecycle operation. The Users API supports four options to return an individual, subset, or all users:

- [search parameter](#search-users): Returns one or more users matched against a search expression and User object properties
- [filter parameter](#filter-users): Returns one or more users that match a filter expression checked against a subset of User object properties
- [find parameter](#find-users): Returns one or more users matched against the user profile properties of `firstName`, `lastName`, or `email`
- [list-all-users](#list-all-users): Returns all users that don't have a `DEPROVISIONED` status 

> **Note:** Okta recommends using the `search` parameter when querying for users.

For details on user operations, see the [Users API](/docs/reference/api/users/) reference.

## Search users

The search query parameter (`search`) returns one or more users matched against a search expression and User object properties, including:

- Any user profile property, including custom-defined properties
- The top-level body properties `id`, `status`, `created`, `activated`, `statusChanged`, and `lastUpdated`
- The User Type accessed from `type.id`
- Properties that have array values

This query parameter provides the largest range of search options and optimal performance. The `search` parameter requires URL encoding for applicable search expressions, supports pagination, and accepts sorting parameters.

The search query parameter uses standard Okta API filtering semantics to create search criteria that includes mathematical operators such as equal to (`eq`), greater than or equal to (`ge`), and so on. You can combine multiple expressions using logical operators and parentheses. The `ne` (not equal) operator isn't supported, but you can obtain the same result by using `lt ... or ... gt`. For example, to see all users except those that have a status of "STAGED", use `https://${yourOktaDomain}/api/v1/users?search=status+lt+%22STAGED%22+or+status+gt+%22STAGED%22`. See [Filtering](/docs/reference/core-okta-api/#filter).

This query parameter supports using the `co` operator with the `profile.firstName`, `profile.lastNameExpressions`, `profile.email`, and `profile.login` attributes.

This query parameter supports using the `co` operator with the `profile.firstName`, `profile.lastNameExpressions`, `profile.email`, and `profile.login` attributes.

### URL encoding

The search parameter requires URL encoding for expressions that include characters such as spaces and double quotes used for strings. See [URL encoding](http://en.wikipedia.org/wiki/Percent-encoding). For example:

`search=profile.department eq "Engineering"` is encoded as `search=profile.department%20eq%20%22Engineering%22`.

> **Note:** If you use the special character `"` within a quoted string, you must also escape it `\` and encode it. For example, `search=profile.lastName eq "bob"smith"` is encoded as `search=profile.lastName%20eq%20%22bob%5C%22smith%22`.

#### Request example

The following example finds all users from the engineering department:

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users?search=profile.department%20eq%20%22Engineering%22
```

#### Response example
For brevity, the response is truncated.

```JSON
{
        "id": "00u1xke1apZnmHgpB1d7",
        "status": "STAGED",
        "created": "2021-11-17T16:11:16.000Z",
        "activated": null,
        "statusChanged": null,
        "lastLogin": null,
        "lastUpdated": "2022-05-24T15:39:09.000Z",
        "passwordChanged": null,
        "type": {
            "id": "oty2di92xFgQTiKEJ1d6"
        },
        "profile": {
            "firstName": "Ben",
            "lastName": "Richler",
            "mobilePhone": null,
            "secondEmail": "",
            "department": "Engineering",
            "login": "ben.richler@example.com",
            "email": "ben.richler@example.com"
        },
    },
    {
        "id": "00u269cmneNMFHCH51d7",
        "status": "PROVISIONED",
        "created": "2021-12-17T15:16:55.000Z",
        "activated": null,
        "statusChanged": null,
        "lastLogin": null,
        "lastUpdated": "2022-05-24T15:38:04.000Z",
        "passwordChanged": "2021-12-17T15:16:56.000Z",
        "type": {
            "id": "oty2di92xFgQTiKEJ1d6"
        },
        "profile": {
            "firstName": "Janice",
            "lastName": "Benson",
            "mobilePhone": null,
            "secondEmail": null,
            "department": "Engineering",
            "login": "janice.benson@gmail.com",
            "email": "janice.benson@gmail.com"
        },
     }
```

### Limits and pagination

You can include the parameters `limit` and `after` in search expressions to limit the return of user records and to access the [pagination](/docs/reference/core-okta-api/#pagination) cursor location. By using the `after` parameter with the `limit` parameter, you can define the cursor location in the data set and manage the user records per page. The cursor is an opaque value that is obtained through the link header [next link relation](/docs/reference/core-okta-api/#link-header).

> **Note:** If you don't specify a value for `limit`, the maximum (200) is used as a default.

#### Request example

The following example returns users who have an `ACTIVE` status and limits the records returned to five.

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users?search=status+eq+%22ACTIVE%22&limit=5"
```

#### Response header
The request returned the first five users and included the following next link relation in the header:

```JSON
HTTP/1.1 200 OK
Content-Type: application/json
Link: <https://{yourOktaDomain}/api/v1/users?search=status+eq+%22ACTIVE%22&limit=5>; rel="self"
Link:<https://{yourOktaDomain}/api/v1/users?after=00u3p62n11UKppeh31d7&limit=5&search=status+eq+%22ACTIVE%22>; rel="next"
```

#### Request example

The following example returns the next five users with an `ACTIVE` status using the next link relation:

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users?after=00u3p62n11UKppeh31d7&limit=5&search=status+eq+%22ACTIVE%22"
```

### Sorting parameters

You can include the sorting parameters `sortBy` and `sortOrder` in search expressions to deliver results sorted by any single user property, for example, returning users sorted by department or employee number. All users returned by a `sortBy` expression are, by default, ordered by their user `id`. Use `sortBy` to specify the property that you want to sort by and `sortOrder` to specify the order (`asc` or `desc`). By default, the sort order is ascending.

#### Request example

The following example sorts all users with a status of DEPROVISIONED by last name using the default sort order (ascending):

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users?search=status+eq+%22DEPROVISIONED%22&sortBy=profile.lastName"
```

### Array searches

The `search` parameter can also search array data types for custom user profile properties. Okta follows the [SCIM Protocol Specification](https://datatracker.ietf.org/doc/html/rfc7644#section-3.4.2.2) for searching arrays. If any element of the array matches the search term, the entire array (object) is returned.

You can create expressions that search multiple arrays, multiple values in an array, as well as using the standard logical and filtering operators such as starts with (`sw`), greater than (`gt`), and so on. See [Filtering](/docs/reference/core-okta-api#filter).

#### Request example

The following example returns all users who have a custom string array attribute (`customProp1`) that includes at least one value equal to `a`:

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users?search=profile.customProp1+eq+%22a%22"
```

#### Response example

For brevity, only the user information and custom profile attribute are shown.

```JSON
"id": "00u3q8ta4i7sbzIQv1d7",
        "status": "ACTIVE",
        "created": "2022-05-20T14:41:39.000Z",
        "activated": "2022-05-20T14:41:41.000Z",
        "statusChanged": "2022-05-20T14:41:41.000Z",
        "lastLogin": null,
        "lastUpdated": "2022-05-20T14:45:47.000Z",
        "passwordChanged": "2022-05-20T14:41:40.000Z",
        "type": {
            "id": "oty2di92xFgQTiKEJ1d6"
        },
        "profile": {
            "firstName": "Sylvia A.",
            "lastName": "Ray",
            "mobilePhone": null,
            "customProp1": [
                "a",
                "b",
                "c",
                "d",
                "e"
            ],

```

#### Request example

The following example returns all users who have a custom array attribute (`customProp1`) that includes at least one value equal to `a` or a custom number array attribute (`customProp2`) that includes at least one value equal to `7`:

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users?search=profile.customProp1+eq+%22a%22+or+profile.customProp2+eq+7"

```

#### Response example

For brevity, only the user information and custom profile attribute are shown.

```JSON
{
        "id": "00u3q8ta4i7sbzIQv1d7",
        "status": "ACTIVE",
        "created": "2022-05-20T14:41:39.000Z",
        "activated": "2022-05-20T14:41:41.000Z",
        "statusChanged": "2022-05-20T14:41:41.000Z",
        "lastLogin": null,
        "lastUpdated": "2022-05-20T14:45:47.000Z",
        "passwordChanged": "2022-05-20T14:41:40.000Z",
        "type": {
            "id": "oty2di92xFgQTiKEJ1d6"
        },
        "profile": {
            "firstName": "Sylvia A.",
            "lastName": "Ray",
            "mobilePhone": null,
            "customProp1": [
                "a",
                "b",
                "c",
                "d",
                "e"
            ],
            "customProp2": [
                1,
                2,
                3,
                4,
                5
            ],
        }
},
{
        "id": "00u3q8uarelmiiw0H1d7",
        "status": "ACTIVE",
        "created": "2022-05-20T14:42:13.000Z",
        "activated": "2022-05-20T14:42:14.000Z",
        "statusChanged": "2022-05-20T14:42:14.000Z",
        "lastLogin": null,
        "lastUpdated": "2022-05-20T14:46:54.000Z",
        "passwordChanged": "2022-05-20T14:42:14.000Z",
        "type": {
            "id": "oty2di92xFgQTiKEJ1d6"
        },
        "profile": {
            "firstName": "Bruce A.",
            "lastName": "Ray",
            "mobilePhone": null,
            "customProp1": [
                "f",
                "g",
                "h",
                "i",
                "j"
            ],
            "customProp2": [
                6,
                7,
                8,
                9,
                10],
        }
}
```

#### Request example

The following example returns all users who have a custom number array attribute (`customProp2`) that includes at least one value greater than or equal to `3`:

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users?search=profile.customProp2+gt+3"
```

#### Response example

For brevity, only the user information and custom profile attribute are shown.

```JSON
{
        "id": "00u3q8ta4i7sbzIQv1d7",
        "status": "ACTIVE",
        "created": "2022-05-20T14:41:39.000Z",
        "activated": "2022-05-20T14:41:41.000Z",
        "statusChanged": "2022-05-20T14:41:41.000Z",
        "lastLogin": null,
        "lastUpdated": "2022-05-20T14:45:47.000Z",
        "passwordChanged": "2022-05-20T14:41:40.000Z",
        "type": {
            "id": "oty2di92xFgQTiKEJ1d6"
        },
        "profile": {
            "firstName": "Sylvia A.",
            "lastName": "Ray",
            "mobilePhone": null,
            "customProp1": [
                "a",
                "b",
                "c",
                "d",
                "e"
            ],
            "customProp2": [
                1,
                2,
                3,
                4,
                5
            ],
        }
},
{
        "id": "00u3q8uarelmiiw0H1d7",
        "status": "ACTIVE",
        "created": "2022-05-20T14:42:13.000Z",
        "activated": "2022-05-20T14:42:14.000Z",
        "statusChanged": "2022-05-20T14:42:14.000Z",
        "lastLogin": null,
        "lastUpdated": "2022-05-20T14:46:54.000Z",
        "passwordChanged": "2022-05-20T14:42:14.000Z",
        "type": {
            "id": "oty2di92xFgQTiKEJ1d6"
        },
        "profile": {
            "firstName": "Bruce A.",
            "lastName": "Ray",
            "mobilePhone": null,
            "customProp1": [
                "f",
                "g",
                "h",
                "i",
                "j"
            ],
            "customProp2": [
                6,
                7,
                8,
                9,
                10],
        }
}

```

For further search expression examples and reference material, see [Find Users](/docs/reference/api/users/#find-users) in the Users API reference.

## Filter users

The filter query parameter (`filter`) returns one or more users that match a filter expression checked against the following subset of user object properties: `status`, `lastUpdated`, `id`, `profile.login`, `profile.email`, `profile.firstName`, and `profile.lastName`. The filter query parameter supports [pagination](#limits-and-pagination) and requires [URL encoding](#url-encoding) for applicable filter expressions.

> **Note:** For optimal performance, Okta recommends using a `search` parameter instead. See [Search users](#search-users).

The filter query parameter only uses the equal (`eq`) operator of the standard Okta API filtering semantics. The `lastUpdated` property, however, can also implement the inequality operators greater than (`gt`), greater than or equal to (`ge`), less than (`lt`), and less than or equal to (`le`). For example, you can use these operators to filter users updated before or after a specific date and time. You can combine multiple expressions using the logical operators `and` and `or`, and parentheses. The `not` operator isn't supported. See [List users with a filter](/docs/reference/api/users/#list-users-with-a-filter) for example expressions.

The filter query parameter is case-sensitive and also supports the `limit` and `after` parameters, see [Limits and pagination](#limits-and-pagination).

#### Request example

The following example finds all locked out users:

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users?filter=status+eq%22LOCKED_OUT%22"
```

#### Response example

```JSON

    {
        "id": "00u3m5wrdPjJYUFb81d6",
        "status": "LOCKED_OUT",
        "created": "2020-10-22T15:15:30.000Z",
        "activated": "2020-10-22T15:15:30.000Z",
        "statusChanged": "2020-10-22T16:09:13.000Z",
        "lastLogin": null,
        "lastUpdated": "2020-10-22T16:09:13.000Z",
        "passwordChanged": "2020-10-22T15:15:30.000Z",
        "type": {
            "id": "oty2di92xFgQTiKEJ1d6"
        },
        "profile": {
            "firstName": "John",
            "lastName": "Richards",
            "mobilePhone": null,
            "secondEmail": null,
            "login": "johnrichards@example.com",
            "email": "johnrichards@example.com"
        },
        "credentials": {
            "password": {},
            "emails": [
                {
                    "value": "johntest@example.com",
                    "status": "VERIFIED",
                    "type": "PRIMARY"
                }
            ],
            "provider": {
                "type": "IMPORT",
                "name": "IMPORT"
            }
        },
        "_links": {
            "self": {
                "href": "https://{yourOktaDomain}/api/v1/users/00u3m5wrdPjJYUFb81d6"
            }
        }
    }
```

#### Request example

The following example finds and returns all users that were deprovisioned on August 19, 2021:

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users?filter=status+eq+%22DEPROVISIONED%22+and+(lastUpdated+ge+%222021-08-19T00:00:00.000Z%22+and+lastUpdated+lt+%222021-08-20T00:00:00.000Z%22)"
```

#### Response example

```JSON
 {
        "id": "00u17p0pb9o1Llc4p1d7",
        "status": "DEPROVISIONED",
        "created": "2021-08-19T17:58:35.000Z",
        "activated": "2021-08-19T17:58:36.000Z",
        "statusChanged": "2021-08-19T17:58:50.000Z",
        "lastLogin": null,
        "lastUpdated": "2021-08-19T17:58:50.000Z",
        "passwordChanged": "2021-08-19T17:58:35.000Z",
        "type": {
            "id": "oty2di92xFgQTiKEJ1d6"
        },
        "profile": {
            "firstName": "Jane",
            "lastName": "McLean",
            "mobilePhone": null,
            "secondEmail": null,
            "login": "janemclean@example.com",
            "email": "janemclean@example.com"
        },
        "credentials": {
            "emails": [
                {
                    "value": "janemclean@example.com",
                    "status": "VERIFIED",
                    "type": "PRIMARY"
                }
            ],
            "provider": {
                "type": "OKTA",
                "name": "OKTA"
            }
        },
        "_links": {
            "self": {
                "href": "https://{yourOktaDomain}/api/v1/users/00u17p0pb9o1Llc4p1d7"
            }
        }
    },
    {
        "id": "00u17p1t4q3RNcjFc1d7",
        "status": "DEPROVISIONED",
        "created": "2021-08-19T17:56:35.000Z",
        "activated": "2021-08-19T17:56:40.000Z",
        "statusChanged": "2021-08-19T17:58:00.000Z",
        "lastLogin": null,
        "lastUpdated": "2021-08-19T17:58:00.000Z",
        "passwordChanged": "2021-08-19T17:56:39.000Z",
        "type": {
            "id": "oty2di92xFgQTiKEJ1d6"
        },
        "profile": {
            "firstName": "John",
            "lastName": "Cook",
            "mobilePhone": null,
            "secondEmail": null,
            "login": "jcook@example.com",
            "email": "jcook@example.com"
        },
        "credentials": {
            "emails": [
                {
                    "value": "jcook@example.com",
                    "status": "VERIFIED",
                    "type": "PRIMARY"
                }
            ],
            "provider": {
                "type": "OKTA",
                "name": "OKTA"
            }
        },
        "_links": {
            "self": {
                "href": "https://{yourOktaDomain}/api/v1/users/00u17p1t4q3RNcjFc1d7"
            }
        }
    }

```

For further filter expression examples and reference material, see [Find Users](/docs/reference/api/users/#find-users) in the Users API reference.

## Find users

The find users query parameter (`q`) returns one or more users matched against the user profile properties of `firstName`, `lastName`, or `email`, and is designed for simple lookup implementations, such as a people picker. This query parameter excludes users with a `DEPROVISIONED` status, doesn't support pagination, and isn't designed for large data sets.

> **Note:** For optimal performance, Okta recommends using a [search](#search-users) parameter instead. See [Search users](#search-users).

The `q` parameter checks the prefix of the profile property (`startWith` method) to find all matches against any of the three profile properties. The matching method isn't case-sensitive. The find users query can use limits (`limit`), but doesn't support pagination (`after`). See [Limits and pagination](#limits-and-pagination).

> **Note:** If you're using the `q` parameter, the default limit is 10 users.

#### Request example

The following example finds and returns all users that have a first name, last name, or email address that begins with John or john.

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users?q=john"
```

#### Response example

```JSON
{
        "id": "00u3ojhmm3cCa3a221d7",
        "status": "ACTIVE",
        "created": "2022-05-13T20:05:39.000Z",
        "activated": "2022-05-13T20:05:41.000Z",
        "statusChanged": "2022-05-13T20:05:41.000Z",
        "lastLogin": null,
        "lastUpdated": "2022-05-13T20:05:41.000Z",
        "passwordChanged": "2022-05-13T20:05:41.000Z",
        "type": {
            "id": "oty2di92xFgQTiKEJ1d6"
        },
        "profile": {
            "firstName": "Tony",
            "lastName": "Johnson",
            "mobilePhone": null,
            "secondEmail": null,
            "login": "tony.johnson@example.com",
            "email": "tony.johnson@example.com"
        },
        "credentials": {
            "password": {},
            "emails": [
                {
                    "value": "tony.johnson@example.com",
                    "status": "VERIFIED",
                    "type": "PRIMARY"
                }
            ],
            "provider": {
                "type": "OKTA",
                "name": "OKTA"
            }
        },
        "_links": {
            "self": {
                "href": "https://{yourOktaDomain}/api/v1/users/00u3ojhmm3cCa3a221d7"
            }
        }
    },
    {
        "id": "00u3m5wrdPjJYUFb81d6",
        "status": "LOCKED_OUT",
        "created": "2020-10-22T15:15:30.000Z",
        "activated": "2020-10-22T15:15:30.000Z",
        "statusChanged": "2020-10-22T16:09:13.000Z",
        "lastLogin": null,
        "lastUpdated": "2020-10-22T16:09:13.000Z",
        "passwordChanged": "2020-10-22T15:15:30.000Z",
        "type": {
            "id": "oty2di92xFgQTiKEJ1d6"
        },
        "profile": {
            "firstName": "John",
            "lastName": "Mclean",
            "mobilePhone": null,
            "secondEmail": null,
            "login": "johnmclean@example.com",
            "email": "johnmclean@example.com"
        },
        "credentials": {
            "password": {},
            "emails": [
                {
                    "value": "johnmclean@example.com",
                    "status": "VERIFIED",
                    "type": "PRIMARY"
                }
            ],
            "provider": {
                "type": "IMPORT",
                "name": "IMPORT"
            }
        },
        "_links": {
            "self": {
                "href": "https://{yourOktaDomain}/api/v1/users/00u3m5wrdPjJYUFb81d6"
            }
        }
    },
    {
        "id": "00u3ojdzgjrAhuYGg1d7",
        "status": "ACTIVE",
        "created": "2022-05-13T20:06:20.000Z",
        "activated": "2022-05-13T20:06:22.000Z",
        "statusChanged": "2022-05-13T20:06:22.000Z",
        "lastLogin": null,
        "lastUpdated": "2022-05-13T20:06:22.000Z",
        "passwordChanged": "2022-05-13T20:06:21.000Z",
        "type": {
            "id": "oty2di92xFgQTiKEJ1d6"
        },
        "profile": {
            "firstName": "Jack",
            "lastName": "Phillips",
            "mobilePhone": null,
            "secondEmail": null,
            "login": "john.j.phillips@example.com",
            "email": "john.j.phillips@example.com"
        },
        "credentials": {
            "password": {},
            "emails": [
                {
                    "value": "john.j.phillips@example.com",
                    "status": "VERIFIED",
                    "type": "PRIMARY"
                }
            ],
            "provider": {
                "type": "OKTA",
                "name": "OKTA"
            }
        },
        "_links": {
            "self": {
                "href": "https://{yourOktaDomain}/api/v1/users/00u3ojdzgjrAhuYGg1d7"
            }
        }
    }
```

See [Find Users](/docs/reference/api/users/#find-users) in the Users API reference.

## List all users

If a query doesn't include the `search`, `filter`, or `q` parameter, it returns all users (except those with DEPROVISIONED status), with a default limit of 200 records. For this simple use case, the list-all query performance is superior to other search options.

> **Note:** For most scenarios, use a [search](#search-users) parameter to refine the number of users returned.

The list all users command supports [limits and pagination](#limits-and-pagination), but not sorting.

#### Request example

The following example returns all users to a limit of 25:

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users?limit=25
```

See [Find Users](/docs/reference/api/users/#list-users) in the Users API reference.

## See also

- [Users API](/docs/reference/api/users)
- [User profiles](/docs/concepts/user-profiles/)
