---
title: Build an Anything-as-a-Source custom client integration
meta:
  - name: description
    content: This is an Anything-as-a-Source custom client developer guide to synchronize any HR source with Okta user profiles.
---

This guide outlines how to develop a custom client to manage an identity source with Okta for the Anything-as-a-Source (XaaS) integration. The custom client can be a standalone app or a component of an existing app. The client drives the synchronization between the HR source (the identity source) and the Okta Universal Directory.

---

#### Learning outcomes

* Learn how to use the Identity Sources API to manage an Anything-as-a-Source integration with Okta.

#### What you need

* [Okta Developer Edition organization](https://developer.okta.com/signup/)
   * A Custom Identity Source integration configured in your Okta org (see [Anything-as-a-Source](https://help.okta.com/okta_help.htm?type=oie&id=ext-anything-as-a-source))
      >  **Note:** Your org needs to have the Identity Source Apps feature enabled. Contact your Okta account team to enable this feature. <!-- IDENTITY_SOURCE_APPS feature flag needs to be enabled (Checked with Karthik Reddy on Sept 11, 2023 - this text should remain in place until Eng has enabled all SKUs)-->
   * [An Okta API token](/docs/guides/create-an-api-token/) to make secure API calls

* An HR source from which you want to synchronize user data with Okta
* A custom client to add Identity Sources API integration

---

## Overview

The Okta Anything-as-a-Source (XaaS) integration provides your organization with the ability to source identities from any HR source to your Okta org. The HR source acts as a source of truth, and users are pushed and mapped to Okta user profiles in the Okta Universal Directory. There are two methods to implement the XaaS integration:

* Using Okta Workflows
* Developing a custom client

With either method, you need to first define your HR source in your Okta org. This is referred to as the Custom Identity Source integration. Okta provides a Custom Identity Source unique identifier that you can use in your Okta Workflow or custom client to identify the HR source. See Create and configure a Custom Identity Source in [Use Anything-as-a-Source](https://help.okta.com/okta_help.htm?type=oie&id=ext-use-xaas).

This guide outlines the Identity Sources API flow so that you can develop your custom client for the XaaS integration. For XaaS integrations using [Okta Workflows](https://help.okta.com/okta_help.htm?type=wf), see Okta connector action cards for bulk user import and identity-source session management.

## Identity Sources API concepts

### Identity source session

The Identity Sources API synchronizing data flow uses an [identity source session](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/IdentitySource/#tag/IdentitySource/operation/getIdentitySourceSession!c=200&path=id&t=response) object to encapsulate the data upload and the data import processing tasks. You need to create an identity source session object each time that you want to synchronize data from the HR source to Okta. The identity source session object uses the following `status` values to indicate each stage of the synchronization process flow.

### Identity source session status

* **CREATED**: The identity source session object has been created for a specific Custom Identity Source integration. You can load data to the session at this stage. Data import processing hasn't been invoked, and you can cancel the session at this stage.
* **TRIGGERED**: Okta is processing the uploaded data in the identity source session. You can't load new data to the identity source session object at this stage, and you can't cancel the session. You can view sessions with this status on the [Import Monitoring](https://help.okta.com/okta_help.htm?id=ext-view-import-monitoring-dashboard) page in the Admin Console.
* **COMPLETED**: The data in the identity source session object has been processed by Okta. You can't upload new data to the identity source session object if it has this status, because the synchronization data job is considered complete.
* **CLOSED**: The session is canceled and isn't available for further activity. You can only cancel identity source sessions with the `CREATED` status. You can't cancel a session that has been triggered or completed. Previously loaded data is deleted from a canceled identity source session.
* **EXPIRED**: This status indicates that the identity source session has timed out during the data loading stage. An identity source session with the `CREATED` status expires after 24 hours of inactivity.

### Identity source session process

You can only process one identity source session at a time (for a specific Custom Identity Source integration) to avoid conflicts. The following are more identity source session behaviors:

* You can only load data to an identity source session when it's in the `CREATED` status.
* There can only be one identity source session in the `CREATED` status for an identity source.
* An identity source session with the `CREATED` or `TRIGGERED` status is considered active.
* If there are no API requests in 24 hours for an identity source session that has the `CREATED` status, then the status is set to `EXPIRED` and the session can no longer be used.
* Okta processes the sessions synchronously (not in parallel) for an identity source. If you trigger multiple sessions for an identity source, then the sessions are queued up for sequential processing.
* You can't create an identity source session within five minutes of triggering an active session associated with the same identity source. If Okta receives a new identity source session request within five minutes of an active identity source session with the `CREATED` or the `TRIGGERED` status, Okta returns a 400 Bad Request response.

> **Note:** You can use the [List all identity source sessions](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/IdentitySource/#tag/IdentitySource/operation/listIdentitySourceSessions) request to return active identity source sessions for an identity source.

### Bulk-load requests

There are two types of bulk-load requests:

* `/bulk-upsert`: Insert or update user profiles in the bulk-load request
* `/bulk-delete`: Deactivate the user profiles in the bulk-load request

You can load up to 200 KB of data in a single bulk-load (`/bulk-upsert` or `/bulk-delete`) request for an identity source session. This equates to 200 user profiles. To load more user profiles, make multiple bulk-load requests to the same session. The maximum number of bulk-load requests for a session is 50.

Create another identity source session object when you exhaust the maximum number of bulk-load requests and need to load more user profiles. Keep in mind that you can only load user data to an identity source session with the `CREATED` status.

> **Note:** Only `"importType": "INCREMENTAL"` is currently supported for an identity source session.

### Bulk user profile data

The bulk-load request contains an array of external [identity source user profiles for upsert](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/IdentitySource/#tag/IdentitySource/operation/uploadIdentitySourceDataForUpsert) or [identity source user profiles for delete](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/IdentitySource/#tag/IdentitySource/operation/uploadIdentitySourceDataForDelete) objects that contain the following:

* `externalId`: The unique identifier from the HR source and is assumed to be immutable (never updated for a specific user). This helps determine if a new user needs to be created or if an existing user needs to be updated.

* `profile`: The set of attributes from the HR source to synchronize with the Okta user profile. User profiles are mapped according to the attribute mappings that you specified in your Custom Identity Source configuration. See Declare an identity source schema in [Use Anything-as-a-Source](https://help.okta.com/okta_help.htm?type=oie&id=ext-use-xaas).
    > **Note:** All attributes in a `profile` object are treated as strings. Arrays are not supported.

> **Note:** You can only load user profile data to an identity source session object with the `"entityType": "USERS"` property. Group data load isn't currently supported.

## Identity Sources API flow

Before you start to build your XaaS data synchronization client, you need to set up a few configuration variables:

* Your Okta org domain URL (`{yourOktaDomain}`) for API requests
* Your Custom Identity Source ID (`{identitySourceId}`): The unique identifier that you obtained from configuring a Custom Identity Source integration in your Okta org. See Create and configure a Custom Identity Source in [Use Anything-as-a-Source](https://help.okta.com/okta_help.htm?type=oie&id=ext-use-xaas).
* An API token (`{apiKey}`): Obtain an [API token](/docs/guides/create-an-api-token/main/) from your Okta org to make secure API calls to Okta. Use this API token in the SSWS Authorization header.

Code your XaaS data synchronization client with the following generalized API flow:

1. Create an identity source session.
2. Load bulk data into the identity source session (if required, load multiple batches of bulk data).
3. Trigger the data import process.
4. Monitor the identity source session until the data processing completes.

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
* [Cancel an identity source session](#cancel-an-identity-source-session)
* [Monitor identity source sessions](#monitor-identity-source-sessions)

### Bulk import user data

Use these steps to insert or update a set of user data profiles from your HR source to Okta:

1. [Create an identity source session](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/IdentitySource/#tag/IdentitySource/operation/createIdentitySourceSession):

   ```bash
    curl -i -X POST \
      'https://{yourOktaDomain}/api/v1/identity-sources/{identitySourceId}/sessions' \
    -H 'Authorization: SSWS {apiKey}' \
    -H 'Content-Type: application/json'
    ```

    Possible returned responses:

    * **200 OK**: The identity source session was created successfully, and the `id` property was returned in the response. Save the `id` value to make further API calls.

      ```json
      {
        "id": "{sessionId}",
        "identitySourceId": "{identitySourceId}",
        "status": "CREATED",
        "importType": "INCREMENTAL"
      }
      ```

      > **Note:** Only `"importType": "INCREMENTAL"` is supported for an identity source session.

    * **400 Bad Request**: Another active identity source session exists for the same identity source.
    * **401 Unauthorized**: The API key isn't valid.

2. [Upload bulk-upsert data](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/IdentitySource/#tag/IdentitySource/operation/uploadIdentitySourceDataForUpsert):

    * Use the `id` property value returned from the created identity source session to make the bulk-upsert data request.
    * Obtain the user profiles from your HR source and add each user profile and their attributes into the `profiles` array. You can have up to a maximum of 200 user profiles in the array.
    * Set `entityType` to `USERS`. Only user data is supported. Group data isn't currently supported.
    * If you need to add more users, make another bulk-upsert data request with the same `{sessionId}` value. You can make up to 50 bulk-load requests for one identity source session.

    ```bash
    curl -i -X POST \
      'https://{yourOktaDomain}/api/v1/identity-sources/{identitySourceId}/sessions/{sessionId}/bulk-upsert' \
    -H 'Authorization: SSWS {apiKey}' \
    -H 'Content-Type: application/json' \
    -d '{
        "entityType": "USERS",
        "profiles": [
            {
                "externalId": "{userId}",
                "profile": {
                    "userName": "{userName}",
                    "firstName": "{firstName}",
                    "lastName": "{lastName}",
                    "email": "{userEmail}",
                    "secondEmail": "{userEmail2}",
                    "mobilePhone": "{userMobileNumber}",
                    "homeAddress": "{userAddress}"
                }
            }
        ]
    }'
    ```

    Possible returned responses:
    * **202 Accepted**: The bulk-upsert request was successful.
    * **400 Bad Request**: The `profiles` array is missing, malformed, or empty in the bulk-upsert request.
    * **401 Unauthorized**: The API key isn't valid.

3. [Start the data import process](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/IdentitySource/#tag/IdentitySource/operation/startImportFromIdentitySource):

    After you loaded all user profiles to insert or update, start the processing job to import users into Universal Directory:

    ```bash
    curl -i -X POST \
      'https://{yourOktaDomain}/api/v1/identity-sources/{identitySourceId}/sessions/{sessionId}/start-import' \
    -H 'Authorization: SSWS {apiKey}' \
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

    * **400 Bad Request**: The identity source session was already triggered and doesn't have the `CREATED` status.
    * **401 Unauthorized**: The API key isn't valid.

4. You can monitor the identity source session until the data processing completes by reviewing the status of the session. See [Monitor identity source sessions](#monitor-identity-source-sessions).

### Bulk deactivate user data

When users are deactivated or deleted from your HR source, you need to reflect that status in Okta. Okta doesn't delete user profile objects, it deactivates the users that are no longer active. Use these steps to deactivate a set of user data profiles from Okta.

1. [Create an identity source session](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/IdentitySource/#tag/IdentitySource/operation/createIdentitySourceSession):

    ```bash
    curl -i -X POST \
      'https://{yourOktaDomain}/api/v1/identity-sources/{identitySourceId}/sessions' \
    -H 'Authorization: SSWS {apiKey}' \
    -H 'Content-Type: application/json'
    ```

    Possible returned responses:

    * **200 OK**: The identity source session created successfully and returns an `id` property. Save the `id` value to make further API calls.

      ```json
      {
        "id": "{sessionId}",
        "identitySourceId": "{identitySourceId}",
        "status": "CREATED",
        "importType": "INCREMENTAL"
      }
      ```

      > **Note:** Only `"importType": "INCREMENTAL"` is supported for an identity source session.

    * **400 Bad Request**: Another active identity source session exists for the same identity source.
    * **401 Unauthorized**: The API key isn't valid.

2. [Upload bulk-delete data](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/IdentitySource/#tag/IdentitySource/operation/uploadIdentitySourceDataForDelete):

    * Use the `id` property value returned from the created identity source session to make the bulk-delete data request.
    * Obtain the unique user identifiers from your HR source and add each `externalId` value into the `profiles` array. You can have up to a maximum of 200 user IDs in the array.
    * Set `entityType` to `USERS`. Only user data is supported. Group data isn't currently supported.
    * If you need to deactivate more users, make another bulk-delete data request with the same `{sessionId}` value. You can make up to 50 bulk-load requests for one identity source session.

    ```bash
    curl -i -X POST \
      'https://{yourOktaDomain}/api/v1/identity-sources/{identitySourceId}/sessions/{sessionId}/bulk-delete' \
    -H 'Authorization: SSWS {apiKey}' \
    -H 'Content-Type: application/json' \
    -d '{
        "entityType": "USERS",
        "profiles": [
          {
            "externalId": "{userId1}"
          },
          {
            "externalId": "{userId2}"
          },
          {
            "externalId": "{userId3}"
          }
        ]
      }'
    ```

    > **Note:** If the `externalId` of the user profile in the bulk-delete data isn't matched to a user in Okta, then the user profile is silently ignored.

    Possible returned responses:
    * **202 Accepted**: The bulk delete operation was successful.
    * **400 Bad Request**: There's no payload in the bulk-delete request.
    * **401 Unauthorized**: The API key isn't valid.

3. [Start the data import process](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/IdentitySource/#tag/IdentitySource/operation/startImportFromIdentitySource):

    After you loaded all the user IDs, start the processing job to deactivate users from the Okta Universal Directory:

    ```bash
    curl -i -X POST \
      'https://{yourOktaDomain}/api/v1/identity-sources/{identitySourceId}/session/{sessionId}/start-import' \
    -H 'Authorization: SSWS {apiKey}' \
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

    * **400 Bad Request**: The identity source session was already triggered and doesn't have the `CREATED` status.
    * **401 Unauthorized**: The API key isn't valid.

4. You can monitor the identity source session until the data processing completes by reviewing the status of the session. See [Monitor identity source sessions](#monitor-identity-source-sessions).

### Cancel an identity source session

If there's an identity source session with the `CREATED` status for your identity source and you don't want to run the import process, then you can cancel the session. This operation deletes all loaded data in the identity source session and sets the session status to `CLOSED`.

Use the [Delete an identity source session](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/IdentitySource/#tag/IdentitySource/operation/deleteIdentitySourceSession) operation to cancel the identity source session and delete all the bulk data associated with the session:

```bash
curl -i -X DELETE \
  'https://{yourOktaDomain}/api/v1/identity-sources/{identitySourceId}/sessions/{sessionId}' \
-H 'Authorization: SSWS {apiKey}' \
-H 'Content-Type: application/json'
```

Possible returned responses:

* **204 No Content**: The identity source session was canceled successfully. All bulk data is removed from the session.
* **400 Bad Request**: The identity source session ID is unknown.
* **401 Unauthorized**: The API key isn't valid.

### Monitor identity source sessions

To monitor identity source session activity for an identity source, use one of these methods to retrieve session properties:

* [Retrieve active identity source sessions](#retrieve-active-identity-source-sessions) 
* [Retrieve an identity source session by ID](#retrieve-an-identity-source-session-by-id)

#### Retrieve active identity source sessions

The [List all identity source sessions](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/IdentitySource/#tag/IdentitySource/operation/listIdentitySourceSessions) request returns a list of active identity source sessions for an identity source. This list helps determine which sessions are currently processing and actively being worked on. An identity source session is considered active if it has the `CREATED` or `TRIGGERED` status. Data processing is complete for an identity source if no active session is returned (since a session that contains the `COMPLETED` status isn't considered active).

```bash
curl -i -X GET \
  'https://{yourOktaDomain}/api/v1/identity-sources/{identitySourceId}/sessions' \
-H 'Authorization: SSWS {apiKey}' \
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

> **Note:** Alternatively, you can use the [Import Monitoring](https://help.okta.com/okta_help.htm?id=ext-view-import-monitoring-dashboard) page from the Admin Console to monitor the import process job. When the job completes, a summary of the import process appears in the Import Monitoring dashboard.

#### Retrieve an identity source session by ID

The [Retrieve an identity source session](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/IdentitySource/#tag/IdentitySource/operation/getIdentitySourceSession) request returns the identity source session properties for a specific session ID. Data processing is completed if the returned session status is `COMPLETED`.

```bash
curl -i -X GET \
  'https://{yourOktaDomain}/api/v1/identity-sources/{identitySourceId}/sessions/{sessionId}' \
-H 'Authorization: SSWS {apiKey}' \
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

* **400 Bad Request**: The identity source session ID is unknown.
* **401 Unauthorized**: The API key isn't valid.
