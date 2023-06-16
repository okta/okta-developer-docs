---
title: Build an Anything-as-a-Source custom client integration
meta:
  - name: description
    content: This is an Anything-as-a-Source custom client developer guide to synchronize any HR source with Okta user profiles.
---

<ApiLifecycle access="ea" /><!--EA for both Classic Engine and Identity Engine. Okta needs to turn on IDENTITY_SOURCE_APPS feature flag (not Self-Service)-->

This guide outlines how to develop a custom client to manage an identity source with Okta for the Anything-as-a-Source (XaaS) integration. The custom client can be a standalone app or a component of an existing app that drives the synchronization between the HR source (the identity source) and the Okta Universal Directory.

---

**Learning outcomes**

* Learn how to use the Identity Sources API to manage an Anything-as-a-Source integration with Okta.

**What you need**

* [Okta Developer Edition organization](https://developer.okta.com/signup/)
   * A Custom Identity Source integration configured in your Okta org (see [Anything-as-a-Source](https://help.okta.com/okta_help.htm?type=oie&id=ext-anything-as-a-source))
      >  **Note:** Your org needs to have the Identity Source Apps feature enabled. Contact your Okta account team to enable this feature. <!-- IDENTITY_SOURCE_APPS feature flag needs to be enabled-->
   * [An Okta API token](/docs/guides/create-an-api-token/) to make secure API calls

* An HR source from which you want to synchronize user data with Okta
* A custom client to add Identity Sources API integration

---

## Overview

The Okta Anything-as-a-Source (XaaS) integration provides your organization with the ability to source identities from any HR source to your Okta org. The HR source acts as a source of truth, and users are pushed and mapped to Okta user profiles in the Okta Universal Directory. There are two methods to implement the XaaS integration:

* Using Okta Workflows

   or

* Developing a custom client

With either method, you need to first define your HR source in your Okta org. This is referred to as the Custom Identity Source integration. Okta provides you with a Custom Identity Source unique identifier that you can use in your Okta Workflow or custom client to identify the HR source. See Create and configure a Custom Identity Source in [Use Anything-as-a-Source](https://help.okta.com/okta_help.htm?type=oie&id=ext-use-xaas).

This guide outlines the Identity Sources API flow so that you can develop your custom client for the XaaS integration. For XaaS integrations using [Okta Workflows](https://help.okta.com/okta_help.htm?type=wf), see Okta connector action cards for bulk user import and identity-source session management.

## Identity Sources API concepts

### Identity Source Session

The Identity Sources API synchronizing data flow uses an [Identity Source Session](/docs/reference/api/xaas/#identity-source-session-object) object to encapsulate the data upload and the data import processing tasks. You need to create an Identity Source Session object each time that you want to synchronize data from the HR source to Okta. The Identity Source Session object uses the following `status` values to indicate each stage of the synchronization process flow.

### Identity Source Session status

* **CREATED**: The Identity Source Session object has been created for a specific Custom Identity Source integration, and you can load data to the session at this stage. Data import processing hasn't been invoked, and you can cancel the session at this stage.
* **TRIGGERED**: Okta is processing the uploaded data in the Identity Source Session. You can’t load new data to the Identity Source Session object at this stage, and you can't cancel the session. You can view sessions with this status in the [Import Monitoring](https://help.okta.com/okta_help.htm?id=ext-view-import-monitoring-dashboard) page from the Admin Console.
* **COMPLETED**: The data in the Identity Source Session object has been processed by Okta. You can’t upload new data to the Identity Source Session object if it has the `COMPLETED` status. The synchronization data job is considered complete.
* **CLOSED**: The session is cancelled and isn't available for further activity. You can only cancel Identity Source Sessions with the `CREATED` status. You can't cancel a session that has been triggered or completed. Previously loaded data is deleted from a cancelled Identity Source Session.
* **EXPIRED**: This status indicates that the Identity Source Session has timed out during the data loading stage. An Identity Source Session with the `CREATED` status expires after 24 hours of inactivity.

### Identity Source Session process

You can only process one Identity Source Session at a time (for a specific Custom Identity Source integration) to avoid conflicts. The following are additional Identity Source Session behaviors:

* You can only load data to an Identity Source Session when it’s in the `CREATED` status.
* There can only be one Identity Source Session in the `CREATED` status for an identity source.
* An Identity Source Session with the `CREATED` or `TRIGGERED` status is considered active.
* If there are no API requests in 24 hours for an Identity Source Session that has the `CREATED` status, then the status is set to `EXPIRED` and the session can no longer be used.
* Okta processes the sessions synchronously (not in parallel) for an identity source. If you trigger multiple sessions for an identity source, then the sessions are queued up for sequential processing.
* You can't create a new Identity Source Session in less than five minutes after triggering an active session associated with the same identity source. If Okta receives a new Identity Source Session request within five minutes of an active Identity Source Session with the `CREATED` or the `TRIGGERED` status, Okta returns a 400 Bad Request response.

> **Note:** You can use the [List active Identity Source Sessions](/docs/reference/api/xaas/#list-active-identity-source-sessions) request to return active Identity Source Sessions for an identity source.

### Bulk-load requests

There are two types of bulk-load requests:

* `/bulk-upsert`: Insert or update user profiles in the bulk-load request
* `/bulk-delete`: Deactivate the user profiles in the bulk-load request

You can load up to 200 KB of data in a single bulk-load (`/bulk-upsert` or `/bulk-delete`) request for an Identity Source Session. This equates to 200 user profiles. To load more user profiles, you can make multiple bulk-load requests to the same session. The maximum number of bulk-load requests for a session is 50. If you exhaust the maximum number of bulk-load requests and you still need to load more user profiles, then create another Identity Source Session object for the additional user profiles. Keep in mind that you can only load user data to an Identity Source Session with the `CREATED` status.

> **Note:** Only `"importType": "INCREMENTAL"` is currently supported for an Identity Source Session.

### Bulk user profile data

The bulk-load request contains an array of external [Identity Source User Profile For Upsert](/docs/reference/api/xaas/#identity-source-user-profile-for-upsert-object) or [Identity Source User Profile For Delete](/docs/reference/api/xaas/#identity-source-user-profile-for-upsert-object) objects that contain the following:

* `externalId`: The unique identifier from the HR source and is assumed to be immutable (never updated for a specific user). This value is used as a key to determine if a new user needs to be created or if an existing user needs to be updated.

* `profile`: The set of attributes from the HR source to synchronize with the Okta user profile. User profiles are mapped according to the attribute mappings that you specified in your Custom Identity Source configuration. See Declare an identity source schema in [Use Anything-as-a-Source](https://help.okta.com/okta_help.htm?type=oie&id=ext-use-xaas).

> **Note:** You can only load user profile data to an Identity Source Session object with the `"entityType": "USERS"` property. Group data load isn’t currently supported.

## Identity Sources API flow

Before you start to build your XaaS data synchronization client, you need to set up a few configuration variables:

* Your Okta org domain URL (`${yourOktaDomain}`) for API requests
* Your Custom Identity Source ID (`${identitySourceId}`): The unique identifier that you obtained from configuring a Custom Identity Source integration in your Okta org. See Create and configure a Custom Identity Source in [Use Anything-as-a-Source](https://help.okta.com/okta_help.htm?type=oie&id=ext-use-xaas).
* An API token (`${apiKey}`}: Obtain an [API token](/docs/guides/create-an-api-token/main/) from your Okta org to make secure API calls to Okta. Use this API token in the SSWS Authorization header.

Code your XaaS data synchronization client with the following generalized API flow:

1. Create an Identity Source Session.
2. Load bulk data into the Identity Source Session (if required, load multiple batches of bulk data).
3. Trigger the data import process.
4. Monitor the Identity Source Session until the data processing completes.

<div class="full">

![Anything-as-a-Source API flow](/img/xaas-flow.png)

</div>

<!--

Source image:

https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3064%3A5755

-->

For detailed API calls, see the following for specific use case flows:

* [Bulk import user data](#bulk-import-user-data)
* [Bulk deactivate user data](#bulk-deactivate-user-data)
* [Cancel an Identity Source Session](#cancel-an-identity-source-session)
* [Monitor Identity Source Sessions](#monitor-identity-source-sessions)

### Bulk import user data

Use these steps to insert or update a set of user data profiles from your HR source to Okta:

1. [Create an Identity Source Session](/docs/reference/api/xaas/#create-an-identity-source-session):

   ```bash
    curl -i -X POST \
      'https://${yourOktaDomain}/api/v1/identity-sources/${identitySourceId}/sessions' \
    -H 'Authorization: SSWS ${apiKey}' \
    -H 'Content-Type: application/json'
    ```

    Possible returned responses:

    * **200 OK**: The Identity Source Session was created successfully, and the `id` property was returned in the response. Save the `id` value to make further API calls.

      ```json
      {
        "id": "{sessionId}",
        "identitySourceId": "{identitySourceId}",
        "status": "CREATED",
        "importType": "INCREMENTAL"
      }
      ```

      > **Note:** Only `"importType": "INCREMENTAL"` is currently supported for an Identity Source Session.

    * **400 Bad Request**: Another active Identity Source Session exists for the same identity source.
    * **401 Unauthorized**: The API key isn't valid.

2. [Upload bulk-upsert data](/docs/reference/api/xaas/#upload-bulk-upsert-data):

    * Use the `id` property value returned from the created Identity Source Session to make the bulk-upsert data request.
    * Obtain the user profiles from your HR source and add each user profile and their attributes into the `profiles` array. You can have up to a maximum of 200 user profiles in the array.
    * Set `entityType` to `USERS`. Only user data is supported. Group data isn't currently supported.
    * If you need to add more users, make another bulk-upsert data request with the same `${sessionId}` value. You can make up to 50 bulk-load requests for one Identity Source Session.

    ```bash
    curl -i -X POST \
      'https://${yourOktaDomain}/api/v1/identity-sources/${identitySourceId}/sessions/${sessionId}/bulk-upsert' \
    -H 'Authorization: SSWS ${apiKey}' \
    -H 'Content-Type: application/json' \
    -d '{
        "entityType": "USERS",
        "profiles": [
            {
                "externalId": "${userId}",
                "profile": {
                    "userName": "${userName}",
                    "firstName": "${firstName}",
                    "lastName": "${lastName}",
                    "email": "${userEmail}",
                    "secondEmail": "${userEmail2}",
                    "mobilePhone": "${userMobileNumber}",
                    "homeAddress": "${userAddress}"
                }
            }
        ]
    }'
    ```

    Possible returned responses:
    * **202 Accepted**: The bulk-upsert request was successful.
    * **400 Bad Request**: The `profiles` array is missing or empty in the bulk-upsert request.
    * **401 Unauthorized**: The API key isn't valid.

3. [Trigger the data import process](/docs/reference/api/xaas/#trigger-an-identity-source-session):

    After you loaded all user profiles to insert or update, start the processing job to import users into the Okta Universal Directory:

    ```bash
    curl -i -X POST \
      'https://${yourOktaDomain}/api/v1/identity-sources/${identitySourceId}/sessions/${sessionId}/start-import' \
    -H 'Authorization: SSWS ${apiKey}' \
    -H 'Content-Type: application/json'
    ```

    Possible returned responses:
    * **200 OK**: The data import process started successfully. The following is an example of the returned properties:

        ```json
        {
          "id": "{sessionId}",
          "identitySourceId": "{identitySourceId}",
          "status": "TRIGGERED",
          "importType": "INCREMENTAL"
        }
        ```

    * **400 Bad Request**: The Identity Source Session was already triggered and doesn't have the `CREATED` status.
    * **401 Unauthorized**: The API key isn't valid.

4. You can monitor the Identity Source Session until the data processing completes by reviewing the status of the session. See [Monitor Identity Source Sessions](#monitor-identity-source-sessions).

### Bulk deactivate user data

When users are deactivated or deleted from your HR source, you need to reflect that status in Okta. Okta doesn't delete user profile objects, it deactivates the users that are no longer active. Use these steps to deactivate a set of user data profiles from Okta.

1. [Create an Identity Source Session](/docs/reference/api/xaas/#create-an-identity-source-session):

    ```bash
    curl -i -X POST \
      'https://${yourOktaDomain}/api/v1/identity-sources/${identitySourceId}/sessions' \
    -H 'Authorization: SSWS ${apiKey}' \
    -H 'Content-Type: application/json'
    ```

    Possible returned responses:

    * **200 OK**: The Identity Source Session created successfully and returns an `id` property. Save the `id` value to make further API calls.

      ```json
      {
        "id": "{sessionId}",
        "identitySourceId": "{identitySourceId}",
        "status": "CREATED",
        "importType": "INCREMENTAL"
      }
      ```

      > **Note:** Only `"importType": "INCREMENTAL"` is currently supported for an Identity Source Session.

    * **400 Bad Request**: Another active Identity Source Session exists for the same identity source.
    * **401 Unauthorized**: The API key isn't valid.

2. [Upload bulk-delete data](/docs/reference/api/xaas/#upload-bulk-delete-data):

    * Use the `id` property value returned from the created Identity Source Session to make the bulk-delete data request.
    * Obtain the unique user identifiers from your HR source and add each `externalId` value into the `profiles` array. You can have up to a maximum of 200 user IDs in the array.
    * Set `entityType` to `USERS`. Only user data is supported. Group data isn't currently supported.
    * If you need to deactivate more users, make another bulk-delete data request with the same `${sessionId}` value. You can make up to 50 bulk-load requests for one Identity Source Session.

    ```bash
    curl -i -X POST \
      'https://${yourOktaDomain}/api/v1/identity-sources/${identitySourceId}/sessions/${sessionId}/bulk-delete' \
    -H 'Authorization: SSWS ${apiKey}' \
    -H 'Content-Type: application/json' \
    -d '{
        "entityType": "USERS",
        "profiles": [
          {
            "externalId": "${userId1}"
          },
          {
            "externalId": "${userId2}"
          },
          {
            "externalId": "${userId3}"
          }
        ]
      }'
    ```

    > **Note:** If the `externalId` of the user profile in the bulk-delete data isn't matched to a user in Okta, then the user profile is silently ignored.

    Possible returned responses:
    * **202 Accepted**: The bulk delete operation was successful.
    * **400 Bad Request**: There is no payload in the bulk-delete request.
    * **401 Unauthorized**: The API key isn't valid.

3. [Trigger the data import process](/docs/reference/api/xaas/#trigger-an-identity-source-session):

    After you loaded all the user IDs, start the processing job to deactivate users from the Okta Universal Directory:

    ```bash
    curl -i -X POST \
      'https://${yourOktaDomain}/api/v1/identity-sources/${identitySourceId}/session/${sessionId}/start-import' \
    -H 'Authorization: SSWS ${apiKey}' \
    -H 'Content-Type: application/json'
    ```

    Possible returned responses:
    * **200 OK**: The data import process started successfully and returned the following properties:

        ```json
        {
          "id": "{sessionId}",
          "identitySourceId": "{identitySourceId}",
          "status": "TRIGGERED",
          "importType": "INCREMENTAL"
        }
        ```

    * **400 Bad Request**: The Identity Source Session was already triggered and doesn't have the `CREATED` status.
    * **401 Unauthorized**: The API key isn't valid.

4. You can monitor the Identity Source Session until the data processing completes by reviewing the status of the session. See [Monitor Identity Source Sessions](#monitor-identity-source-sessions).

### Cancel an Identity Source Session

If there's an Identity Source Session with the `CREATED` status for your identity source and you don't want to run the import process, then you can cancel the session. This operation deletes all loaded data in the Identity Source Session and sets the session status to `CLOSED`.

Use the [Cancel an Identity Source Session](/docs/reference/api/xaas/#cancel-an-identity-source-session) operation to cancel the Identity Source Session and delete all the bulk data associated with the session:

```bash
curl -i -X DELETE \
  'https://${yourOktaDomain}/api/v1/identity-sources/${identitySourceId}/sessions/${sessionId}' \
-H 'Authorization: SSWS ${apiKey}' \
-H 'Content-Type: application/json'
```

Possible returned responses:

* **204 No Content**: The Identity Source Session cancelled successfully. All bulk data is removed from the session.
* **400 Bad Request**: The Identity Source Session ID is unknown.
* **401 Unauthorized**: The API key isn't valid.

### Monitor Identity Source Sessions

To monitor Identity Source Session activity for an identity source, you can use either [Retrieve active Identity Source Sessions](#retrieve-active-identity-source-sessions) or [Retrieve an Identity Source Session by ID](#retrieve-an-identity-source-session-by-id) requests to retrieve session properties.

#### Retrieve active Identity Source Sessions

The [List active Identity Source Sessions](/docs/reference/api/xaas/#list-active-identity-source-sessions) request returns a list of active Identity Source Sessions for an identity source to determine which sessions are currently processing and actively being worked on. An Identity Source Session is considered active if it has the `CREATED` or `TRIGGERED` status. Data processing completed for an identity source if no active session is returned (since a session that contains the `COMPLETED` status isn't considered active).

```bash
curl -i -X GET \
  'https://${yourOktaDomain}/api/v1/identity-sources/${identitySourceId}/sessions' \
-H 'Authorization: SSWS ${apiKey}' \
-H 'Content-Type: application/json'
```

Possible returned responses:

* **200 OK**: The request was successful and returned an empty list of active sessions:

  ```json
  []
  ```

* **200 OK**: The request was successful and returned a list of active sessions:

  ```json
  [
    {
      "id": "{sessionId1}",
      "identitySourceId": "{identitySourceId}",
      "status": "CREATED",
      "importType": "INCREMENTAL"
    },
    {
      "id": "{sessionId2}",
      "identitySourceId": "{identitySourceId}",
      "status": "TRIGGERED",
      "importType": "INCREMENTAL"
    }
  ]
  ```

* **401 Unauthorized**: The API key isn't valid.

> **Note:** Alternatively, you can use the [Import Monitoring](https://help.okta.com/okta_help.htm?id=ext-view-import-monitoring-dashboard) page from the Okta Admin Console to monitor the import process job. When the job completes, a summary of the import process appears in the Import Monitoring dashboard.

#### Retrieve an Identity Source Session by ID

The [Retrieve an Identity Source Session](/docs/reference/api/xaas/#retrieve-an-identity-source-session) request returns the Identity Source Session properties for a specific session ID. Data processing is completed if the returned session status is `COMPLETED`.

```bash
curl -i -X GET \
  'https://${yourOktaDomain}/api/v1/identity-sources/${identitySourceId}/sessions/${sessionId}' \
-H 'Authorization: SSWS ${apiKey}' \
-H 'Content-Type: application/json'
```

Possible returned responses:

* **200 OK**: The data import process completed successfully and returned the following properties:

  ```json
  {
    "id": "{sessionId}",
    "identitySourceId": "{identitySourceId}",
    "status": "COMPLETED",
    "importType": "INCREMENTAL"
  }
  ```

* **400 Bad Request**: The Identity Source Session ID is unknown.
* **401 Unauthorized**: The API key isn't valid.
