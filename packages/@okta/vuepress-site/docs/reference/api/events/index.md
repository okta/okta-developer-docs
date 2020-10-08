---
title: Events
category: management
deprecated: true
---

# Events API

The Okta Events API provides read access to your organization's system log. [Export event data](https://support.okta.com/help/Documentation/Knowledge_Article/Exporting-Okta-Log-Data) as a batch job from your organization to another system for reporting or analysis.

> **Important:** The [System Log API](/docs/reference/api/system-log/) will eventually replace the Events API and contains much more [structured data](/docs/reference/api/system-log/#logevent-object). As of Jan 7, 2019 developers of new projects are unable to access the Events API and should use the System Log API. As of April 20, 2020, no new event types will be added for the Events API. Information about migrating from the Events API to the System Log API can be found on the [Events API Migration page](/docs/concepts/events-api-migration/). Other information can be found in the [Events API End of Life FAQ](https://support.okta.com/help/s/article/FAQ-Events-API-End-of-Life)

## Getting Started

Explore the Events API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/f990a71f061a7a16d0bf)

## Data Retention

Log data older than 90 days is not returned, in accordance with Okta's [Data Retention Policy](https://support.okta.com/help/Documentation/Knowledge_Article/Okta-Data-Retention-Policy).

## Event Operations

### List Events


<ApiOperation method="get" url="/api/v1/events" />

Fetches a list of events from your Okta organization system log

##### Request Parameters


| Parameter   | Description                                                                                   | Param Type   | DataType   | Required   | Default |
| :---------- | :-------------------------------------------------------------------------------------------- | :----------- | :--------- | :--------- | :------ |
| limit       | Specifies the number of results to page                                                       | Query        | Number     | FALSE      | 1000    |
| startDate   | Specifies the timestamp to list events after                                                  | Query        | Date       | FALSE      |         |
| filter      | [Filter expression](/docs/reference/api-overview/#filtering) for events         | Query        | String     | FALSE      |         |
| after       | Specifies the pagination cursor for the next page of events                                   | Query        | String     | FALSE      |         |

Parameter Details

* Treat the `after` cursor as an opaque value as its contents are subject to change without notice. Obtain it through the `next` link relation. See [Pagination](/docs/reference/api-overview/#pagination) for more details on link relations.
* `startDate` and `filter` query parameters are mutually exclusive and cannot be used together in the same request.
* `startDate` and `after` query parameters are mutually exclusive and cannot be used together in the same request.
* `startDate` defaults to 1 hour ago when `filter`, `after` and `startDate` query parameters are omitted.
* `limit` can be no larger than 1000

###### Reliable Ingestion

The most reliable method to ingest all events from Okta is to use a [pagination](/docs/reference/api-overview/#pagination) cursor via the `after` parameter. This will ensure that events are not skipped or duplicated due to the lack of timestamp precision.

The general sequence of steps to leverage the `after` parameter:

1. Issue an initial request using `startDate` with a value set to some date in the last 90 days
1. Retrieve the next page of events through the [`Link` response header](/docs/reference/api-overview/#link-header) value with the `next` link relation
1. Optionally include a `filter` parameter to narrow the returned results
1. Issue the paginated request
1. Retrieve the next page of events through the `Link` response header value with the `next` link relation
1. Pause and repeat the previous step

Note that if no data is returned, this typically indicates you have caught up with the event stream. To avoid issues with [rate limiting](/docs/reference/rate-limits/), ensure your polling frequency is sufficiently long.

###### Filters

The following expressions are supported for events with the `filter` query parameter:

| Filter                                        | Description                                                                          |
| :-------------------------------------------- | :----------------------------------------------------------------------------------- |
| `action.objectType eq ":actionType"`          | Events that have a specific [action objectType](#action-objecttypes)                 |
| `target.objectType eq ":objectType"`          | Events published with a specific [target objectType](#actor-and-target-objecttypes)  |
| `target.id eq ":id"`                          | Events published with a specific target id                                           |
| `published lt "yyyy-MM-dd'T'HH:mm:ss.SSSZ"`   | Events published before a specific datetime                                          |
| `published eq "yyyy-MM-dd'T'HH:mm:ss.SSSZ"`   | Events published updated at a specific datetime                                      |
| `published gt "yyyy-MM-dd'T'HH:mm:ss.SSSZ"`   | Events published updated after a specific datetime                                   |

See [Filtering](/docs/reference/api-overview/#filtering) for more information on expressions.

>Note: All filters must be [URL encoded](http://en.wikipedia.org/wiki/Percent-encoding) where `filter=published gt "2017-10-01T00:00:00.000Z"` is encoded as `filter=published%20gt%20%222017-10-01T00:00:00.000Z%22`.

**Filter Examples**

Events published after 10/01/2017

    filter=published gt "2017-10-01T00:00:00.000Z"

Events published for a target user

    filter=target.id eq "00uxc78lMKUMVIHLTAXY"

Failed login events published after 10/01/2017

    filter=published gt "2017-10-01T00:00:00.000Z" and action.objectType eq "core.user_auth.login_failed"

Events published after 10/01/2017 for a target user and application

    filter=published gt "2017-10-01T00:00:00.000Z" and target.id eq "00uxc78lMKUMVIHLTAXY" and target.id eq "0oabe82gnXOFVCDUMVAK"

App SSO events for a target user and application

    filter=action.objectType eq "app.auth.sso" and target.id eq "00uxc78lMKUMVIHLTAXY" and target.id eq "0oabe82gnXOFVCDUMVAK"

Note that using `filter` with a value of `published gt "2017-10-01T00:00:00.000Z"` and `startDate` with a value of `2017-10-01T00:00:00.000Z` work the same way. The following two API calls:

    startDate=2017-10-01T00:00:00.000Z

    filter=published gt "2017-10-01T00:00:00.000Z"

return the same results. Since `filter` and `startDate` are [mutually exclusive](#request-parameters), `filter` must be used to simultaneously specify both time and additional filter criteria.

##### Response Parameters


Array of [Events](#event-object)

##### Request Example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/events?startDate=2013-07-15T16%3A00%3A00.000Z&limit=3"
```

##### Response Example


```http
HTTP/1.1 200 OK
Content-Type: application/json
Link: <https://${yourOktaDomain}/api/v1/events?startDate=2017-09-15T16%3A00%3A00.000Z&limit=3>; rel="self"
Link: <https://${yourOktaDomain}/api/v1/events?after=tevZxTo4IyHR9yUHIFdU0-f0w1373905100000&limit=3>; rel="next"

[
    {
        "eventId": "tev8hc_KK9NRzKe2WtdvVQIOg1784845263000",
        "published": "2017-11-19T07:14:23.000Z",
        "action": {
            "message": "App activated",
            "categories": [],
            "objectType": "app.generic.config.app_activated",
            "requestUri": "/api/v1/apps/0oadxaKUTKAXSXUZYJHC/lifecycle/activate"
        },
        "actors": [
            {
                "id": "00upgyMVOKIYORVNYUUM",
                "displayName": "Adam Malkovich",
                "login": "adam.malkovich@example.com",
                "objectType": "User"
            },
            {
                "id": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36",
                "displayName": "CHROME",
                "ipAddress": "192.168.1.100",
                "objectType": "Client"
            }
        ],
        "targets": [
            {
                "id": "0oadxaKUTKAXSXUZYJHC",
                "displayName": "Salesforce.com",
                "objectType": "AppInstance"
            }
        ]
    },
    {
        "eventId": "tevaEByjeq-QZW-utKgDVVvng1784847185000",
        "published": "2017-11-19T07:46:25.000Z",
        "action": {
            "message": "Sign-in successful",
            "categories": [
                "Sign-in Success"
            ],
            "objectType": "core.user_auth.login_success",
            "requestUri": "/login/do-login"
        },
        "actors": [
            {
                "id": "00ubgaSARVOQDIOXMORI",
                "displayName": "Samus Aran",
                "login": "samus.aran@example.com",
                "objectType": "User"
            },
            {
                "id": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36",
                "displayName": "CHROME",
                "ipAddress": "10.10.10.10",
                "objectType": "Client"
            }
        ],
        "targets": [
            {
                "id": "00ubgaSARVOQDIOXMORI",
                "displayName": "Samus Aran",
                "login": "samus.aran@example.com",
                "objectType": "User"
            }
        ]
    },
    {
        "eventId": "tevR26HuMJMSkWsKBUcQ65Raw1784847190000",
        "published": "2017-11-19T07:46:30.000Z",
        "action": {
            "message": "User performed single sign on to app",
            "categories": [
                "Application Access"
            ],
            "objectType": "app.auth.sso",
            "requestUri": "/app/salesforce/kdx9PWYBPEOBAUNVRBHK/sso/saml"
        },
        "actors": [
            {
                "id": "00ubgaSARVOQDIOXMORI",
                "displayName": "Samus Aran",
                "login": "samus.aran@example.com",
                "objectType": "User"
            },
            {
                "id": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36",
                "displayName": "CHROME",
                "ipAddress": "10.10.10.10",
                "objectType": "Client"
            }
        ],
        "targets": [
            {
                "id": "00ubgaSARVOQDIOXMORI",
                "displayName": "Samus Aran",
                "login": "samus.aran@example.com",
                "objectType": "User"
            },
            {
                "id": "0oadxaKUTKAXSXUZYJHC",
                "displayName": "Salesforce.com",
                "objectType": "AppInstance"
            }
        ]
    }
]
```

## Event object

Every organization has a system log that maintains a history of actions performed by users.  The Event object describes a single action that was performed by a set of actors for a set of targets.

### Example

``` json
{
   "eventId":"tevGr2BhQTMR72OiBGvKXTp2Q1799593071000",
   "published":"2017-09-08T23:51:11.000Z",
   "requestId":"req8U_MHmEbSai_0I4RopTnfA",
   "sessionId":"000cWiYg47QSFyk1YjE6cDcEg",
   "action":{
      "message":"Okta user created",
      "categories":[
         "User Creation"
      ],
      "objectType":"core.user.config.user_creation.success",
      "requestUri":"Background"
   },
   "actors":[
      {
         "id":"00ue1aWYUCUFFKXLXELW",
         "displayName":"Add-Min O'Cloudy Tud",
         "login":"administrator1@clouditude.net",
         "objectType":"User"
      },
      {
         "id":"Jakarta Commons-HttpClient/3.1",
         "displayName":"UNKNOWN",
         "ipAddress":"",
         "objectType":"Client"
      }
   ],
   "targets":[
      {
         "id":"00ue1gAKBMCSWHRZYDJS",
         "displayName":"Inca-Louise O'Rain Dum",
         "login":"inca@clouditude.net",
         "objectType":"User"
      }
   ]

}
```

### Attributes

The Event object is read only, with a fixed set of attributes:

| Property    | Description                                                             | DataType                                                         | Nullable   | Unique   | Readonly   | MinLength   | MaxLength |
| :---------- | :---------------------------------------------------------------------- | :--------------------------------------------------------------- | :--------- | :------- | :--------- | :---------- | :-------- |
| eventId     | Unique key for event                                                    | String                                                           | FALSE      | TRUE     | TRUE       |             |           |
| published   | Timestamp when event was published                                      | Date                                                             | FALSE      | TRUE     | TRUE       | 1           | 255       |
| requestId   | Identifies the request                                                  | String                                                           | TRUE       | FALSE    | TRUE       | 1           | 50        |
| sessionId   | Session in which the event occurred                                     | String                                                           | TRUE       | FALSE    | TRUE       |             |           |
| action      | Identifies the action that the event describes                          | [Action object](#action-object)                                  | FALSE      | FALSE    | TRUE       |             |           |
| actors      | Describes zero or more entities that performed the action               | Array of [Actor object](#actor-object)                           | FALSE      | FALSE    | TRUE       |             |           |
| targets     | Describes zero or more entities that the action was performed against   | Array of [Target object](#target-object)                         | TRUE       | FALSE    | TRUE       |             |           |
| _links      | discoverable resources related to the event                             | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06)   | TRUE       | FALSE    | TRUE       |             |           |
| _embedded   | embedded resources related to the event                                 | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06)   | TRUE       | FALSE    | TRUE       |             |           |

Property Details

* The actor and/or target of an event is dependent on the action performed. Not all events have an actor or target.
* The `sessionId` can identify multiple requests.  A single `requestId` can identify multiple events.  Use the `sessionId` to link events and requests that occurred in the same session.

### Action object

Describes an activity performed by a user, app, client, or other entity (actor) on a target:

| Property     | Description                                                       | DataType          | Nullable |
| :----------- | :---------------------------------------------------------------- | :---------------- | :------- |
| message      | Description of an action                                          | String            | FALSE    |
| categories   | [Categories](#action-categories) for an action                    | Array of String   | FALSE    |
| objectType   | Identifies the [unique type](#action-objecttypes) of an action    | String            | FALSE    |
| requestUri   | Uri of the request that generated the event.                      | String            | TRUE     |

Actions that do not define any categories will have a zero element array value.

```json
{
    "message": "User performed single sign on to app",
    "categories": [
        "Application Access"
    ],
    "objectType": "app.auth.sso",
    "requestUri": "/app/salesforce/kdx9PWYBPEOBAUNVRBHK/sso/saml"
}
```

#### Action Categories

Categories for an action:

* Application Assignment
* Application Access
* Active Directory Agent
* User Creation
* User Activation
* User Deactivation
* User Locked Out
* Sign-in Failure
* Sign-in Success
* Suspicious Activity
* Application Imports (Summary)
* Application Imports (Detailed)
* SMS Messages

>Note: Additional categories may be added in the future without versioning.

#### Action ObjectTypes

The action `objectType` identifies the unique action performed.

##### Application Authentication

| ObjectType                    | Description                                             |
| :---------------------------- | :------------------------------------------------------ |
| app.auth.sso                  | Event occurred during SSO                               |
| app.auth.delegated.outbound   | Event occurred during outbound delegated authentication |

##### Application User Management

| ObjectType                                                         | Description                                                               |
| :----------------------------------------------------------------- | :------------------------------------------------------------------------ |
| app.user_management.push_password_update                           | Update user's password in application                                     |
| app.user_management.push_profile_success                           | Successfully created or updated user's profile in application             |
| app.user_management.push_profile_failure                           | Failed to create or update user's profile in application                  |
| app.user_management.push_new_user                                  | Create new user in application                                            |
| app.user_management.push_pending_user                              | Queue update of user for application                                      |
| app.user_management.provision_user                                 | Created or updated user from application                                  |
| app.user_management.provision_user_failed                          | Failed to create or update user from application                          |
| app.user_management.importing_profile                              | Create or update user's profile from application                          |
| app.user_management.update_from_master_failed                      | Failed to master user's profile from application                          |
| app.user_management.verified_user_with_thirdparty                  | Verified user against application                                         |
| app.user_management.updating_api_credentials_for_password_change   | Updating API credentials due to  API administrator user password change   |
| app.user_management.activate_user                                  | Activate user in application                                              |
| app.user_management.deactivate_user                                | Deactivate user in application                                            |
| app.user_management.reactivate_user                                | Reactivate user in application                                            |
| app.user_management.provision_user.user_inactive                   | Attempt to provision a user to an inactive account, and cannot reactivate |
| app.user_management.deactivate_user.api_account                    | Deactivate API user in application                                        |
| app.user_management.deprovision_task_complete                      | Deprovisioning task has been marked complete (automatically or manually)  |

##### Application Group Management

| ObjectType                                                                                   | Description                                                                                                                                    |
| :------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------- |
| app.user_management.user_group_import.upsert_success                                         | Successfully created or updated group from application                                                                                         |
| app.user_management.user_group_import.delete_success                                         | Successfully removed imported group that was deleted from application                                                                          |
| app.user_management.app_group_member_import.insert_success                                   | Update group memmbership  an AppGroupUserMember from an import succeeded                                                                       |
| app.user_management.app_group_member_import.delete_success                                   | Deleting an AppGroupUserMember from an import succeeded                                                                                        |
| app.user_management.app_group_group_member_import.insert_success                             | Upserting an ResolvedAppGroupMember from an import succeeded                                                                                   |
| app.user_management.app_group_group_member_import.delete_success                             | Deleting an ResolvedAppGroupMember from an import succeeded                                                                                    |
| app.user_management.grouppush.mapping.created.from.rule                                      | A new mapping has been created from a rule                                                                                                     |
| app.user_management.grouppush.mapping.created.from.rule.error.duplicate                      | A new mapping from a rule was attempted to be created, but it turned out to be a dupe                                                          |
| app.user_management.grouppush.mapping.created.from.rule.warning.duplicate.name               | A new mapping from a rule was not created due to a duplicate group name                                                                        |
| app.user_management.grouppush.mapping.created.from.rule.warning.duplicate.name.tobecreated   | A new mapping from a rule was not created due to another mapping will be created that has the same user group name                             |
| app.user_management.grouppush.mapping.created.from.rule.warning.upsertGroup.duplicate.name   | Create or update of source group triggered mapping rule re-evaluation preventing a new application group mapping due to a duplicate group name |
| app.user_management.grouppush.mapping.created.from.rule.error.validation                     | Failed to create new application group mapping due to a validation error                                                                       |
| app.user_management.grouppush.mapping.created.from.rule.errors                               | Failed to create new application group mapping due to an error                                                                                 |
| app.user_management.grouppush.mapping.deactivated.source.group.renamed                       | Successfully deactivate target application group when source group was renamed                                                                 |
| app.user_management.grouppush.mapping.deactivated.source.group.renamed.failed                | Failed to deactivate target application group when source group was renamed                                                                    |
| app.user_management.grouppush.mapping.app.group.renamed                                      | Successfully renamed target application group when source group was renamed                                                                    |
| app.user_management.grouppush.mapping.app.group.renamed.failed                               | Failed to rename target application group when source group was renamed                                                                        |
| app.user_management.grouppush.mapping.and.groups.deleted.rule.deleted                        | An existing mapping and its target groups have been deleted because a mapping rule was deleted                                                 |


##### Delegated Authentication

| ObjectType                                                                 | Description                                   |
| :------------------------------------------------------------------------- | :-------------------------------------------- |
| app.inbound_del_auth.failure.not_supported                                 | Application doesn't support delauth           |
| app.inbound_del_auth.failure.instance_not_found                            | Couldn't find delauth app instance            |
| app.inbound_del_auth.failure.invalid_request.could_not_parse_credentials   | Couldn't parse credentials in delauth request |
| app.inbound_del_auth.failure.account_not_found                             | Inbound delauth account not found             |
| app.inbound_del_auth.failure.invalid_login_credentials                     | Inbound delauth, invalid login credentials    |
| app.inbound_del_auth.login_success                                         | Successful delauth login                      |

##### Rich Client Authentication

| ObjectType                              |
| :-------------------------------------- |
| app.rich_client.instance_not_found      |
| app.rich_client.account_not_found       |
| app.rich_client.multiple_accounts_found |
| app.rich_client.login_failure           |
| app.rich_client.login_success           |

##### Administrator Appplication

| ObjectType                    |
| :---------------------------- |
| app.admin.sso.no_response     |
| app.admin.sso.bad_response    |
| app.admin.sso.orgapp.notfound |

##### Applications

| ObjectType                                        | Description                                           |
| :------------------------------------------------ | :---------------------------------------------------- |
| app.generic.provision.assign_user_to_app          | Assign external user to internal Okta user            |
| app.generic.provision.deactivate_user_from_app    | Deactivate external user to internal Okta user        |
| app.generic.config.app_activated                  | Application has been activated                        |
| app.generic.config.app_deactivated                | Application has been deactivated                      |
| app.generic.import.provisioning_data              | Imported data used for provisioning                   |
| app.generic.import.import_user                    | Started user import                                   |
| app.generic.config.app_updated                    | Application config has been updated                   |
| app.generic.import.new_user                       | Application has imported a new user                   |
| app.generic.import.user_update                    | Application has updated an exsiting user              |
| app.generic.config.app_username_update            | User credentials for an application have been updated |
| app.generic.config.app_password_update            | User credentials for an application have been updated |
| app.generic.import.user_delete                    | Application has deleted user                          |
| app.generic.import.started                        |                                                       |
| app.generic.import.complete                       |                                                       |
| app.generic.import.user_match.complete            |                                                       |
| app.generic.import.details.add_custom_object      |                                                       |
| app.generic.import.details.update_custom_object   |                                                       |
| app.generic.import.details.delete_custom_object   |                                                       |
| app.generic.import.details.add_user               |                                                       |
| app.generic.import.details.update_user            |                                                       |
| app.generic.import.details.delete_user            |                                                       |
| app.generic.import.details.add_group              |                                                       |
| app.generic.import.details.update_group           |                                                       |
| app.generic.import.details.delete_group           |                                                       |
| app.generic.import.summary.custom_object          |                                                       |
| app.generic.import.summary.user                   |                                                       |
| app.generic.import.summary.group                  |                                                       |
| app.generic.import.summary.group_membership       |                                                       |

##### Credential Recovery

| ObjectType                                        |
| :------------------------------------------------ |
| app.generic.reversibility.credentials.recover     |
| app.generic.reversibility.personal.app.recovery   |
| app.generic.reversibility.individual.app.recovery |

##### Application Instance

| ObjectType                                 |
| :----------------------------------------- |
| app.app_instance.change                    |
| app.app_instance.logo_update               |
| app.app_instance.logo_reset                |
| app.app_instance.outbound_delauth_enabled  |
| app.app_instance.outbound_delauth_disabled |
| app.app_instance.config-error              |

##### User Authentication

| ObjectType                          |
| :---------------------------------- |
| core.user_auth.login_failed         |
| core.user_auth.login_success        |
| core.user_auth.logout_success       |
| core.user_auth.account_locked       |
| core.user_auth.session_expired      |
| core.user_auth.mfa_bypass_attempted |

##### User MFA Authentication

| ObjectType                          |
| :---------------------------------- |
| core.user.sms.message_sent.factor   |
| core.user.sms.message_sent.verify   |
| core.user.sms.message_sent.forgotpw |

##### User RADIUS Authentication

| ObjectType                            |
| :------------------------------------ |
| core.user_auth.radius.login.succeeded |
| core.user_auth.radius.login.failed    |

##### User Status

| ObjectType                                  |
| :------------------------------------------ |
| core.user.config.password_update.success    |
| core.user.config.password_update.failure    |
| core.user.config.user_activated             |
| core.user.config.user_deactivated"          |
| core.user.config.user_status.password_reset |
| core.user.config.user_creation.success      |
| core.user.config.user_creation.failure      |

##### User Impersonation

| ObjectType                                |
| :---------------------------------------- |
| core.user.impersonation.session.initiated |
| core.user.impersonation.session.ended     |
| core.user.impersonation.grant.enabled     |
| core.user.impersonation.grant.extended    |
| core.user.impersonation.grant.revoked     |

##### Group Administrator Roles

| ObjectType                        |
| --------------------------------- |
| core.user.admin_privilege.granted |
| core.user.admin_privilege.revoked |

### Actor object

Describes the user, app, client, or other entity (actor) who performed an action on a target:

| Property      | Description                                                  | DataType   | Nullable |
| :------------ | :----------------------------------------------------------- | :--------- | :------- |
| id            | Unique key for actor                                         | String     | FALSE    |
| displayName   | Name of actor used for display purposes                      | String     | TRUE     |
| objectType    | [User](#user-objecttype) or [Client](#client-objecttype)     | String     | FALSE    |


The schema of an actor is dependent on the actor's `objectType`.

### Target object

The entity upon which an actor performs an action. Targets may be anything, even a login token:

| Property      | Description                                                            | DataType   | Nullable |
| :------------ | :--------------------------------------------------------------------- | :--------- | :------- |
| id            | Unique key for target                                                  | String     | FALSE    |
| displayName   | Name of target used for display purposes                               | String     | TRUE     |
| objectType    | [User](#user-objecttype) or [AppInstance](#appinstance-objecttype)     | String     | FALSE    |

The schema of a target is dependent on the actor's `objectType`

### Actor and Target ObjectTypes

#### User ObjectType

A denormalized reference to a [User](/docs/reference/api/users/#user-object):

| Property      | Description                                               | DataType   | Nullable |
| :------------ | :-------------------------------------------------------- | :--------- | :------- |
| id            | Unique key for [user](/docs/reference/api/users/#user-object)                   | String     | FALSE    |
| displayName   | [User's](/docs/reference/api/users/#profile-object) first and last name        | String     | TRUE     |
| login         | Unique login for [user](/docs/reference/api/users/#user-object)                 | String     | TRUE     |
| objectType    | Type of object                                            | `User`     | FALSE    |

``` json
{
    "id": "00u3gjksoiRGRAZHLSYV",
    "displayName": "Jon Stewart",
    "login": "jon@example.com",
    "objectType": "User"
}
```

The user can be retrieved by `id` with the [User API](/docs/reference/api/users/#get-user-with-id).

#### AppInstance ObjectType

Describes an application:

| Property      | Description                                          | DataType        | Nullable |
| :------------ | :--------------------------------------------------- | :-------------- | :------- |
| id            | Unique key for [app](/docs/reference/api/apps/#application-object)         | String          | FALSE    |
| displayName   | [App's](/docs/reference/api/apps/#application-object) label                | String          | TRUE     |
| objectType    | Type of object                                       | `AppInstance`   | FALSE    |

``` json
{
    "id": "0oab5cZEHFHXHGRNRRNL",
    "displayName": "Zendesk",
    "objectType": "AppInstance"
}
```

The app can be retrieved by `id` with the [Apps API](/docs/reference/api/apps/#get-application).

#### Client ObjectType

Describes a client such as a browser:

| Property      | Description            | DataType   | Nullable |
| :------------ | :--------------------- | :--------- | :------- |
| id            | User agent of client   | String     | FALSE    |
| displayName   | Name of client         | String     | TRUE     |
| ipAddress     | IP Address of client   | String     | TRUE     |
| objectType    | Type of object         | `Client`   | FALSE    |

``` json
{
    "id": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.65 Safari/537.36",
    "displayName": "CHROME",
    "ipAddress": "127.0.0.1",
    "objectType": "Client"
}
```
