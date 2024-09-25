---
title: System log query
meta:
  - name: description
    content: Learn how to query the System Log using the API and filters.
---

# System log query

This guide is intended as a companion guide for use with the Okta [System Log API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/SystemLog/), and provides additional details and examples on how to query the system log effectively.

The System Log API provides near real-time, read-only access to your organization's system log and is the programmatic counterpart of the [System Log UI](https://help.okta.com/okta_help.htm?type=oie&id=ext_Reports_SysLog).

The log records system events that are related to your organization. These records provide detailed information on events, activities, and performance metrics critical to the operations between your Okta org, apps, and users. You can use the system log to:

* provide an audit trail
* diagnose errors or problems
* ensure security and compliance
* optimize performance
* investigate and troubleshoot incidents

For the full request and response schemas of the system log API, see [System Log](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/SystemLog/#tag/SystemLog).

>**Note:** The System Log API isn't intended for use as a Database as a Service (DBaaS) or to serve data directly to downstream consumers without an intermediate data store.

#### Authentication and authorization

The system log API uses standard protocols for authentication and authorization, including the proprietary Okta SSWS API tokens. However, Okta recommends using scoped OAuth 2.0 and OIDC access tokens to authenticate with the system log api and other management APIs. OAuth 2.0 and OIDC access tokens provide fine-grain control over the bearer's actions on specific endpoints. See [Okta API authentication methods](https://developer.okta.com/docs/api/openapi/okta-oauth/guides/overview/).

## Event types

Event types categorize event instances by action and are recorded in the response to a [system log API query](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/SystemLog/#tag/SystemLog/operation/listLogEvents). They are key to navigating the system log through [Expression Filters](#expression-filter).

The following sections outline the key event types that are captured by the system log. See [Event Types catalog](/docs/reference/api/event-types/#catalog) for a complete list.

### Application event

| Event                                          | Description                                                |
| :--------------------------------------------- | :--------------------------------------------------------- |
| application.lifecycle.activate                 | An application is activated.                              |
| application.lifecycle.create                   | An application is created.                                |
| application.lifecycle.deactivate               | An application is deactivated.                            |
| application.lifecycle.delete                   | An application is deleted.                                |
| application.lifecycle.update                   | An application is updated.                                |
| application.user_membership.add                | A user is assigned to an application.                     |
| application.user_membership.change_username    | The name of a user who is assigned to an application is changed. |
| application.user_membership.remove             | A user is removed from an application.                    |

### Group event

| Event                          | Description                      |
| :----------------------------- | :------------------------------- |
| group.user_membership.add      | A user is added to a group.     |
| group.user_membership.remove   | A user is removed from a group. |

### Policy events

| Event                         | Description                         |
| :---------------------------- | :---------------------------------- |
| policy.lifecycle.activate     | A lifecycle policy is activated.   |
| policy.lifecycle.create       | A lifecycle policy is created.     |
| policy.lifecycle.deactivate   | A lifecycle policy is deactivated. |
| policy.lifecycle.delete       | A lifecycle policy is deleted.     |
| policy.lifecycle.update       | A lifecycle policy is updated.     |
| policy.rule.activate          | A rule in a policy is activated.   |
| policy.rule.add               | A rule is added to a policy.       |
| policy.rule.deactivate        | A rule in a policy is deactivated. |
| policy.rule.delete            | A rule is deleted from a policy.   |
| policy.rule.update            | A rule in a policy is updated.     |

#### Policy event details

* `policy.evaluate_sign_on` provides context on the values that are used and evaluated in the context of the Okta sign-in policy. For example, you can determine which network zones are matched for this event.
* For `policy.lifecycle` and `policy.rule` events, the corresponding policy is listed in the target object.

### Rate limit events

See [System Log events for rate limits](/docs/reference/rl-system-log-events/) for information on rate limit event types.

Rate limit warnings are sent at different times, depending on the org type. For One App and Enterprise orgs, the warning is sent when the org is at 60% of its limit.

> **Note:** For orgs created before 2018-05-17, the warning is sent at 90%.

Rate limit violations are sent when a rate limit is exceeded.

### Security events

| Event                    | Description                                                                                   |
| :-------------------     | :----------------------------------                                                           |
| security.request.blocked | A request is blocked due to a blocklist rule (such as an IP network zone or location rule). |

### User events

| Event                       | Description                                               |
| :-------------------------- | :-------------------------------------------------------- |
| user.authentication.sso     | A user attempts a Single Sign-On (SSO) to an application managed in Okta |
| user.lifecycle.activate     | A user account is activated.                             |
| user.lifecycle.create       | A user account is created.                               |
| user.lifecycle.deactivate   | A user account is deactivated.                           |
| user.lifecycle.suspend      | A user account is suspended.                             |
| user.lifecycle.unsuspend    | A user account is moved from suspended status.           |
| user.session.start          | Okta issues a session to a user who is authenticating.     |

#### User event details

`user.authentication.sso` doesn't capture whether the SSO attempt is successful or has failed, because Okta can't collect the subsequent authentication attempt status from the third-party service.

## Event correlation

When looking through the System Log, it is often useful to correlate events so that you can understand the thread of events that have occurred at a particular time.

The response object offers two identifiers in this respect:
  - `authenticationContext.externalSessionId`: Identifies events that occurred in the same user session
  - `transaction.id`: Identifies events that have occurred together as part of an operation (for example, a request to Okta's servers)

### Correlating events based on API Token

It may be useful to identify multiple events that are the result of an action made using a specific API token. For example, when investigating a [rate limit warning](/docs/reference/rate-limits/), the events made by a specific token may be helpful in identifying the cause of the warning. The filter `filter=transaction.detail.requestApiTokenId eq "00T94e3cn9kSEO3c51s5"` returns all events that were the result of an action made using the token `00T94e3cn9kSEO3c51s5`, subject to other parameters of the query.

### Event correlation example

The following table shows 18 events produced from 13 transactions over six different sessions, all performed by one user.

**Note:** `authenticationContext.externalSessionId` is abbreviated to `sessionId` in this table.

| sessionId                   | transaction.id                | uuid                                   | eventType                                     | displayMessage                        |
| :-------------------------- | :---------------------------- | :------------------------------------- | :-------------------------------------------- | :--------------------------------     |
| trs5JnlvlaIQTOqOj9imLy7lA   | WcKPxq1f8QLfFvv3UPHhhgAACGM   | f24790d0-d324-47f8-aac5-c27a31ab928d   | user.session.access_admin_app                 | User accessing Okta administrator app |
|                             | WcKPxq1f8QLfFvv3UPHhhgAACGM   | ed317758-8776-4240-a540-277c44dcb408   | application.lifecycle.update                  | Update application                    |
|                             |                               | 421c1551-71b2-4ebe-a70d-b5f7d3698429   | application.lifecycle.update                  | Update application                    |
|                             |                               | 06a50bbe-44fd-40de-83e6-2e4cc2a17d16   | application.lifecycle.update                  | Update application                    |
| trsUz2TG3wKS6ar1lvWzHo71w   | Wij-6q4YuniRd9yTmWHpfwAAADc   | 3e240ff4-6af7-47f2-b107-a2ef661ffc01   | application.user_membership.change_username   | Change users application username     |
|                             |                               | 572b05e9-b6be-4dfe-8bc3-01bb3a5a1af5   | application.user_membership.add               | Add user to application membership    |
|                             |                               | 30f29bbf-3218-429b-827a-0a93809591db   | application.user_membership.remove            | Remove users application membership   |
|                             | Wij-964YuniRd9yTmWHu1AAAAEA   | 5f98d062-05a9-4ede-89a0-8a2ce27efdd4   | user.session.access_admin_app                 | User accessing Okta administrator app |
|                             | Wij-95eCbHF7In2MKNavlgAAD9I   | 45f71ac2-e8b2-4c19-b4cc-d2560108c889   | application.lifecycle.update                  | Update application                    |
|                             |                               | 46b85d65-01c6-44d2-86d2-25704804b1c5   | application.lifecycle.update                  | Update application                    |
| 102GALFw8CzRT2KXoqnca8Jdg   | Wij-AJeCbHF7In2MKNaOpAAAEC4   | b9ab9263-a4ae-4780-9981-377ec8f2da86   | user.session.start                            | User login to Okta                    |
|                             | Wij-7q4YuniRd9yTmWHrBQAAAKQ   | ff325685-0220-484c-82cf-5f8dc596acbe   | user.authentication.sso                       | User single sign on to app            |
| trsf8nlpDJZTZeFlcc8nszbjw   | Wij-7a4YuniRd9yTmWHqqAAAAKY   | 5526a4c4-7f68-4b2a-bab7-2d10ebaeeb1c   | mim.checkOSXAccessEligibility.true            | *blank*                               |
|                             | Wij-764YuniRd9yTmWHrkAAAAGw   | 232774ba-8feb-4b00-a732-e0ec99a24434   | user.session.start                            | User login to Okta                    |
| trswPONv4wIRaKDNWVVcmtceg   | Wij-6K4YuniRd9yTmWHo9wAAAAY   | d31d819a-1427-45b0-a8b4-8a8fb40c72f1   | user.session.start                            | User login to Okta                    |
|                             | Wij-564YuniRd9yTmWHoaQAAAII   | 0cc6f4c8-9b91-4a70-b5c4-09d6ad159d32   | mim.checkOSXAccessEligibility.true            | *blank*                               |
|                             | Wij-2q4YuniRd9yTmWHjRAAAADA   | 92606da8-7eeb-4ad7-8ffb-502dd0ec64cc   | user.authentication.sso                       | User single sign on to app            |
| *null*                      | Wm@-R2s5lEMbNIB03krtvAAACyo   | 566671be-ec0b-400d-ad2e-6fc73ed12fb1   | user.session.start                            | User login to Okta                    |
[[.table-word-break]]

As evidenced by the `null` `authenticationContext.externalSessionId` field in the last row, neither `transaction.id` nor `uuid` maintain a many-to-one relationship with `authenticationContext.externalSessionId`. In this particular case, the `null` `authenticationContext.externalSessionId` field can be explained by a user sign-in failure. There is no session granted to the user's client since the sign-in failure.

## List events

##### Request types

All requests to the `/api/v1/logs` endpoint fall into one of these two categories:

* [Polling Requests](#polling-requests)
* [Bounded Requests](#bounded-requests)

###### Polling requests

Polling requests are for situations when you want to consume an ongoing stream of events from Okta.

Example use cases include:

* [Ingesting System Log data into an external SIEM system](#transferring-data-to-a-separate-system).
* Using System Log data for real-time monitoring.

For a request to be a polling request, it must meet the following request parameter criteria:

* `until` must be unspecified.
* `sortOrder` must be `ASCENDING`.

Polling requests to the `/api/v1/logs` API have the following semantics:

* They return every event that occurs in your organization.
* The returned events are time filtered by their internal "persistence time" to avoid skipping records due to system delays (unlike [Bounded Requests](#bounded-requests)).
* They may return events out of order according to the `published` field.
* They have an infinite number of pages. That is, a [`next` `link` relation header](#next-link-response-header) is always present, even if there are no new events (the event list may be empty).

###### Bounded requests

Bounded requests are for situations when you know the definite time period of logs you want to retrieve.

Example use cases include:

* [Debugging or troubleshooting system behavior](#debugging).
* Auditing events that happened at a particular time.

For a request to be a bounded request, it must meet the following request parameter criteria:

* `since` must be specified.
* `until` must be specified.

Bounded requests to the `/api/v1/logs` API have the following semantics:

* The returned events are time filtered by their associated `published` field (unlike [Polling Requests](#polling-requests)).
* The returned events are guaranteed to be in order according to the `published` field.
* They have a finite number of pages. That is, the last page doesn't contain a [`next` `link` relation header](#next-link-response-header).
* Not all events for the specified time range may be present. Some events may be delayed. Such delays are rare but possible.

##### Filtering results

###### Expression filter

An expression filter is useful for performing structured queries where constraints on the response object's attribute values can be explicitly targeted.

The following example expressions are supported for events with the `filter` query parameter:

| Filter                                       | Description                                                                    |
| -------------------------------------------- | ------------------------------------------------------------------------------ |
| `eventType eq ":eventType"`                  | Events that have a specific action [eventType](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/SystemLog/#tag/SystemLog/operation/listLogEvents!c=200&path=eventType&t=response)                    |
| `target.id eq ":id"`                         | Events that are published with a specific [target](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/SystemLog/#tag/SystemLog/operation/listLogEvents!c=200&path=target&t=response) ID                                     |
| `actor.id eq ":id"`                          | Events that are published with a specific [actor](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/SystemLog/#tag/SystemLog/operation/listLogEvents!c=200&path=actor&t=response) ID                                      |

> **Note:** SCIM filter expressions can't use the `published` attribute since it may conflict with the logic of the `since`, `after`, and `until` query parameters.
> In addition, a SCIM filter expression that uses the `co` (contains) operator with the `debugContext.debugData.url` or the `debugContext.debugData.requestUri` attribute is not supported.
> A request with an invalid SCIM filter expression returns an HTTP 400 API response.

See [Filtering](/docs/reference/core-okta-api/#filter) for more information on expressions.

The following are examples of filter expressions:

* Events that are published for a target user

```javascript
filter=target.id eq "00uxc78lMKUMVIHLTAXY"
```

* Events that are published for all actors except for a specific user

```javascript
filter=actor.id ne "00uxc78lMKUMVIHLTAXY"
```

* Failed sign-in events

```javascript
filter=eventType eq "user.session.start" and outcome.result eq "FAILURE"
```

* Events that are published for a target user and application

```javascript
filter=target.id eq "00uxc78lMKUMVIHLTAXY" and target.id eq "0oabe82gnXOFVCDUMVAK"
```

* App SSO events for a target user and application

```javascript
filter=eventType eq "app.auth.sso" and target.id eq "00uxc78lMKUMVIHLTAXY" and target.id eq "0oabe82gnXOFVCDUMVAK"
```

* Events that are published for a given IP address

```javascript
filter=client.ipAddress eq "184.73.186.14"
```

* Events that start with event_hook

```javascript
filter=eventType sw "event_hook"
```

* Events that contain session

```javascript
filter=eventType co "session"
```

* Events that end with token

```javascript
filter=eventType ew "token"
```

###### Keyword filter

The query parameter `q` can be used to perform keyword matching against a response object's attribute values. To satisfy the constraint, all supplied keywords must be matched exactly.

>**Note:** Keyword matching is case-insensitive.

The following are examples of common keyword filtering:

* Events that mention a specific city: `q=San Francisco`
* Events that mention a specific URL: `q=interestingURI.com`
* Events that mention a specific person: `q=firstName lastName`

> **Note:** When hyphens are present in an event instance's attribute value, they are split and added to the list of matching candidates, in addition to the full hyphenated value. Therefore, events that contain the text `XOxBw-2JIRnCFd0gG0GjHAAABjY` are matched with a `q` value of `XOxBw`, `2JIRnCFd0gG0GjHAAABjY`, or `XOxBw-2JIRnCFd0gG0GjHAAABjY`.

###### Date and time filter

The system log response objects can be filtered by the response object's [published](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/SystemLog/#tag/SystemLog/operation/listLogEvents!c=200&path=published&t=response) attribute value with the following combination of parameters:

* `since`
* `until`
* `since` and `until`
* `after`

>**Note:** `since` and `after` are mutually exclusive and can't be specified simultaneously.

The `after` parameter is system generated for use in ["next" links](#next-link-response-header). Don't attempt to craft requests that use this value. Rely on the system-generated links instead.

##### System log API response

The system log API response contains a JSON array of [response](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/SystemLog/#tag/SystemLog/operation/listLogEvents!c=200&path=actor&t=response) objects.

###### Self link response header

The response always includes a `self` `link` header, which is a link to the current query that was executed.

The header has the following format:

```bash
link: <url>; rel="self"
```

For example:

```bash
link: <https://{yourOktaDomain}/api/v1/logs?q=&sortOrder=DESCENDING&limit=20&until=2017-09-17T23%3A59%3A59%2B00%3A00&since=2017-06-10T00%3A00%3A00%2B00%3A00>; rel="self"
```

###### Next link response header

The response may include a `next` `link` header, which is a link to the next page of results, if there is one.

>**Note:** While the `self` `link` always exists, the `next` `link` may not exist.

The header has the following format:

```bash
link: <url>; rel="next"
```

For example:

```bash
link: <https://{yourOktaDomain}/api/v1/logs?q=&sortOrder=DESCENDING&limit=20&until=2017-09-17T15%3A41%3A12.994Z&after=349996bd-5091-45dc-a39f-d357867a30d7&since=2017-06-10T00%3A00%3A00%2B00%3A00>; rel="next"
```

#### Timeouts

Individual queries have a timeout of 30 seconds.

## Transferring data to a separate system

You can export your log events to a separate system for analysis or compliance. To obtain the entire dataset, query from the appropriate point of time in the past.

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/logs?since=2023-10-01T00:00:00.000Z"
```

Then retrieve the next page of events through the [link response header](/docs/reference/core-okta-api/#link-header) value with the `next` link relation. Continue this process until no events are returned.

>**Note:** Don't transfer data by manually paginating using `since` and `until`, as this may lead to skipped or duplicated events. Instead, always follow the `next` links.

For further information on exporting system log events to external platforms, see [Log streaming](https://help.okta.com/okta_help.htm?type=oie&id=csh-log-streams) and the [Log Streaming API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/LogStream/#tag/LogStream).

### Errors

The system log API provides errors of the following types:

```json
{
  "errorCode": "E0000001",
  "errorSummary": "Api validation failed: 'until': The date format in your query is not recognized. Please enter dates using ISO8601 string format. 'until': must be a valid date-time or empty.",
  "errorId": "dd4998a1-2267-499b-9e4d-ec821fcc5ca9",
  "errorCauses": [
    {
      "errorSummary": "until: The date format in your query is not recognized. Please enter dates using ISO8601 string format."
    },
    {
      "errorSummary": "until: must be a valid date-time or empty."
    }
  ]
}
```

An invalid SCIM filter returns the HTTP 400 error with a description of the issue with the SCIM filter, for example:

```json
{
  "errorCode": "E0000053",
  "errorSummary": "Invalid filter 'display_message eqq \"Create okta user\"': Unrecognized attribute operator 'eqq' at position 16. Expected: eq,co,sw,pr,gt,ge,lt,le",
  "errorId": "eb83dfe1-6d76-458c-8c0c-f8df8fb7a24b"
}
```

An invalid field returns the HTTP 400 error with a message that indicates which field is invalid, for example:

```json
{
  "errorCode": "E0000053",
  "errorSummary": "field is not valid: some_invalid_field",
  "errorId": "ec93dhe2-6d76-458c-8c0c-f8df8fb7a24b"
}
```

The following is another example, where the parameters are invalid:

```json
{
  "errorCode": "E0000053",
  "errorSummary": "Invalid parameter: The since parameter is over 180 days prior to the current day.",
  "errorId": "55166534-b7d8-45a5-a4f6-3b38a5507046"
}
```

An invalid SCIM field and operator combination within a `filter` request parameter (for example, `debugContext.debugData.url co "/oauth/"`) returns an HTTP 400 error with a message that indicates the unsupported combination, for example:

```json
{
  "errorCode": "E0000031",
  "errorSummary": "The supplied combination of operator and field is not currently supported. Operator: co, Field: debugContext.debugData.url",
  "errorId": "ec93dhe2-6d76-458c-8c0c-f8df8fb7a24b"
}
```

An internal service error returns the HTTP 500 error with the message:

```json
{
  "errorCode": "E0000053",
  "errorSummary": "Sorry, there's been an error. We aren't sure what caused it, but we've logged this and will work to address it. Please try your request again.",
  "errorId": "55166534-b7d8-45a5-a4f6-3b38a5507046"
}
```

A timeout returns the HTTP 500 error with the message:

```json
{
  "errorCode": "E0000009",
  "errorSummary": "Your last request took too long to complete. This is likely due to a load issue on our side. We've logged this and will work to address it. Please either simplify your query or wait a few minutes and try again."
}
```

A free-form query that is too long returns the following error message:

```json
{
  "errorCode": "E0000001",
  "errorSummary": "Api validation failed: 'q': Freeform search cannot contain items longer than 40 characters. Please shorten the items in your search or use an advanced filter to query by specific fields."
}
```

Exceeding the rate limit returns the following error message:

```json
{
  "errorCode": "E0000047",
  "errorSummary": "API call exceeded rate limit due to too many requests."
}
```

## Data retention

System log data older than 90 days isn't returned, in accordance with Okta's [Data Retention Policy](https://support.okta.com/help/Documentation/Knowledge_Article/Okta-Data-Retention-Policy). Queries that exceed the retention period succeed, but only those results that have a `published` timestamp within the window are returned.

## Examples

### Debugging

The system log API can be used to troubleshoot user problems. For example, you can use the following `curl` command to see events from user "Jane Doe":

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/logs?q=Jane+Doe"
```

You can also use this API to search for particular type of event:

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/logs?filter=event_type+eq+%22user.session.start%22"
```

Use the following call to search for system log records that contain a specified keyword:

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/logs?q=logout"

```

and use the following call to search for records from a specific date:

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/logs?since=2014-09-01T00:00:00.000Z"
```
