---
title: Build an Anything-as-a-Source custom client
meta:
  - name: description
    content: This is an Anything-as-a-Source custom client developer guide to synchronize any HR source with Okta user profiles.
---

This guide outlines how to develop a custom client to manage an identity source with Okta for the Anything-as-a-Source (XaaS) integration. The custom client can be a standalone app or a component of an existing app that drives the synchronization between the HR source (the identity source) and the Okta Universal Directory.

---

**Learning outcomes**

* Learn how to use the Anything-as-a-Source API to manage a Custom Identity Source integration with Okta.

**What you need**

* [Okta Developer Edition organization](https://developer.okta.com/signup/)
* [A Custom Identity Source](https://okta.github.io/doc_reviews/en-us/Content/Topics/users-groups-profiles/usgp-anything-as-a-source.htm) integration configured in your Okta org
* [An Okta API token](https://developer.okta.com/docs/guides/create-an-api-token/main/) to make secure API calls
* An HR source from which you want to synchronize user data with Okta
* A custom client to add XaaS API integration

---

## Overview

The Okta Anything-as-a-Source (XaaS) solution provides your organization with the ability to integrate any HR source into your Okta org. The HR source acts as a source-of-truth, and users are pushed and mapped to Okta user profiles in the Okta Universal Directory. There are two methods to implement the XaaS integration:

* Using Okta Workflows

   or

* Developing a custom client

With either method, you need to first define your HR source in your Okta org. This is referred to as the Custom Identity Source integration. Okta provides you with a Custom Identity Source unique identifier that you can use in your Okta Workflow or custom client to identify the HR source. See Configuration of a Custom Identity Source in [Using anything as a source](https://okta.github.io/doc_reviews/en-us/Content/Topics/users-groups-profiles/usgp-anything-as-a-source.htm).

This guide outlines the XaaS API flow so that you can develop your custom client for the XaaS integration. For XaaS integrations using Okta Workflows, see [Okta Workflows](https://help.okta.com/okta_help.htm?type=wf).

## XaaS API concepts

### Import Session

The XaaS API synchronizing data flow uses an [Import Session](/docs/reference/xaas/#import-session) object to encapsulate the data upload and the data import processing tasks. You need to create an Import Session object each time that you want to synchronize data from the HR source to Okta. The Import Session object uses the following `status` values to indicate each stage of the synchronization process flow.

### Import Session status

* **CREATED**: The Import Session object has been created for a specific Custom Identity Source integration, and you can load data to the session at this stage. No data import processing has been invoked, and you can cancel the session at this stage.
* **TRIGGERED**:  Okta is processing the loaded data in the Import Session. You can’t load new data to the Import Session object at this stage, and you can't cancel the session. You can view Import Sessions with this status in the [Import Monitoring](https://help.okta.com/okta_help.htm?id=ext-view-import-monitoring-dashboard) page from the Admin Console.
* **COMPLETED**:  The data in the Import Session object has been processed by Okta. You can’t upload new data to the Import Session object if it has the `COMPLETED` status. The synchronization data job is considered complete.
* **CLOSED**: The session is cancelled and isn't available for further activity. You can only cancel Import Sessions with the `CREATED` status. You can't cancel a session that has been triggered or completed. Previously loaded user data is deleted from a cancelled Import Session.
* **EXPIRED**: This status indicates that the Import Session has timed out during the data loading stage. An Import Session with the `CREATED` status expires from 24 hours of inactivity.

### Import Session process

You can only process one Import Session at a time (for a specific Custom Identity Source integration) to avoid conflicts. The following are additional Import Session behaviors:

* You can only load data to an Import Session when it’s in the `CREATED` status.
* A Custom Identity Source integration can only have one active Import Session at a time. An Import Session with the `CREATED` or `TRIGGERED` status is considered active.
* You can’t process an Import Session in parallel for the same identity source.
* You can't create a new Import Session in less than five minutes of an active Import Session associated with the same identity source. If Okta receives a new Import Session request within five minutes of an active Import Session with the `CREATED` or the `TRIGGERED` status, Okta returns a 400 - Bad Request response.
* If there are no API requests in 24 hours for an Import Session that has the `CREATED` status, then the status is set to `EXPIRED` and the session can no longer be used.

> **Note:** If you receive a 400 Bad Request from a create Import Session request, then ensure that there isn't an active Import Session for the same identity source. Use the [Retrieve the current Import Session](/docs/reference/api/xaas/#retrieve-the-current-import-session) request to return the current active Import Session for an identity source.

### Bulk-user-load requests

There are two types of bulk-user-load requests:

* `/bulk-upsert`: Insert or update the profile users in the bulk-user-load request
* `/bulk-delete`: Deactivate the user profiles in the bulk-user-load request

You can load up to 200 KB of data in a single bulk-user-load (`/bulk-upsert` or `/bulk-delete`) request for an Import Session. This equates to 200 user profiles. To load more user profiles, you can make multiple bulk-user-load requests to the same session. The maximum number of bulk-user-load requests for a session is 50. If you exhaust the maximum number of bulk-user-load requests and you still need to load more user profiles, then create another Import Session object for the additional user profiles. Keep in mind that you can only load user data to an Import Session with the `CREATED` status.

> **Note:** Only `"importType": "INCREMENTAL"` is currently supported for an Import Session.

### Bulk user profile data

The bulk-user-load request contains an array of [User Profile Data](/docs/reference/api/xaas/#profile-object) objects that contain the following:

* `externalId`: The unique identifier from the HR source and is assumed to be immutable (never updated for a specific user). This value is used as a key to determine if a new user needs to be created or if an existing user needs to be updated.

* `profile`:  The set of attributes from the HR source to synchronize with the Okta user profile. User profiles are mapped according to the attribute mappings that you specified in your Custom Identity Source configuration.  See Declaration of a Custom Identity Source Schema in  [Using anything as a source](https://okta.github.io/doc_reviews/en-us/Content/Topics/users-groups-profiles/usgp-anything-as-a-source.htm).

> **Note:** Only user profile data can be loaded to an Import Session object with the `"entityType": "USERS"` property. Group data load isn’t currently supported.

## XaaS API flow

Before you start to build your XaaS data synchronization component, you need to set up a few configuration variables:

* Your Okta org domain URL (`${yourOktaDomain}`) for API requests
* Your Custom Identity Source ID (`${identitySourceId}`): The unique identifier you obtained from [configuring a Custom Identity Source integration](https://okta.github.io/doc_reviews/en-us/Content/Topics/users-groups-profiles/usgp-anything-as-a-source.htm) in your Okta org
* An API Token (`${apiKey}`}: [Obtain an API token from your Okta org](/docs/guides/create-an-api-token/main/) to make secure API calls to Okta. Use this API token in the SSWS Authorization header.

Code your XaaS data synchronization component with the following generalized API flow:

1. Create an Import Session.
2. Load user data profile into the Import Session (if required, load multiple batches of user data).
3. Trigger the data import process.
4. Monitor the Import Session until the data processing completes.

<div class="full">

![Anything-as-a-Source API flow](/img/xaas-flow.png)

</div>

For detailed API calls, see the following guidelines for specific use case flows:

* [Bulk import user data](#bulk-import-user-data)
* [Bulk deactivate user data](#bulk-deactivate-user-data)
* [Cancel an Import Session](#cancel-an-import-session)

### Bulk import user data

Use these steps to insert or update a set of user data profiles from your HR source to Okta:

1. [Create an Import Session](/docs/reference/api/xaas/):

   ```bash
    curl -i -X POST \
      'https://${yourOktaDomain}/api/v1/identity-sources/${identitySourceId}/sessions' \
    -H 'Authorization: SSWS ${apiKey}' \
    -H 'Content-Type: application/json' 
    ```

    Possible returned responses:

    * **200 OK**: The Import Session created successfully and returns an `id` property. Save the `id` value to make further API calls.

      ```json
      {
        "id": "{sessionId}",
        "identitySourceId": "{identitySourceId}",
        "status": "CREATED",
        "importType": "INCREMENTAL"
      }
      ```

      > **Note:** Only `"importType": "INCREMENTAL"` is currently supported for an Import Session.

    * **400 Bad Request**: Another active Import Session exists for the same identity source.
    * **401 Unauthorized**: The API key isn't valid.

2. [Bulk upsert user data](/docs/reference/api/xaas/#bulk-upsert-user-data):

    * Use the `id` property value returned from the created Import Session to make the [bulk upsert user data](/docs/reference/api/xaas/#bulk-upsert-user-data) request.
    * Obtain the user profiles from your HR source and add each user profile attribute into the `profiles` array. You can have up to a maximum of 200 user profiles in the array.
    * Set `entityType` to `USERS`. Only user data is supported; group data is currently not supported.
    * If you need to add more users, make another [bulk upsert user data](/docs/reference/api/xaas/#bulk-upsert-user-data) request with the same `${sessionId}` value. You can make up to 50 bulk-user-load requests for one Import Session.

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
                    "mobilePhone": “${userMobileNumber}",
                    "homeAddress": "${userAddress}"
                }
            }
        ]
    }'
    ```

    Possible returned responses:
    * **202 Accepted** : The bulk upsert was successful.
    * **400 Bad Request**: Another active Import Session exists for the same identity source.
    * **401 Unauthorized**: The API key isn't valid.

3. [Trigger the data import process](/docs/reference/api/xaas):

    After you've loaded all your user profiles to insert or update, start the import processing job to add users to the Okta Universal Directory:

    ```bash
    curl -i -X PUT \
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

    * **400 Bad Request**: Another active Import Session exists for the same identity source.
    * **401 Unauthorized**: The API key isn't valid.

4. Monitor the Import Session until the data processing completes by making requests for the status of the Import Session:

    ```bash
    curl -i -X GET \
      'https://${yourOktaDomain}/api/v1/identity-sources/${identitySourceId}/sessions/${sessionId} \
    -H 'Authorization: SSWS ${apiKey}' \
    -H 'Content-Type: application/json' 
    ```

    Alternatively, use the [Import Monitoring](https://help.okta.com/okta_help.htm?id=ext-view-import-monitoring-dashboard) page in the Admin Console to monitor the import process job. When the job completes, a summary of the import process appears in the Import Monitoring dashboard.

    Possible returned responses:
    * **200 OK**: The data import process completed successfully and returns the following properties:

        ```json
        {
            "id": "{sessionId}",
            "identitySourceId": "{identitySourceId}",
            "status": "COMPLETED",
            "importType": "INCREMENTAL"
        }
        ```

    * **400 Bad Request**: The Import Session ID is unknown.
    * **401 Unauthorized**: The API key isn't valid.

### Bulk deactivate user data

When users are deactivated or deleted from your HR source, you need to reflect that status in Okta. Okta doesn't delete user profile objects, it deactivates the users that are no longer active. Use these steps to deactivate a set of user data profiles from Okta.  

1. [Create an Import Session](/docs/reference/api/xaas/):

   ```bash
    curl -i -X POST \
      'https://${yourOktaDomain}/api/v1/identity-sources/${identitySourceId}/sessions' \
    -H 'Authorization: SSWS ${apiKey}' \
    -H 'Content-Type: application/json' 
    ```

    Possible returned responses:

    * **200 OK**: The Import Session created successfully and returns an `id` property. Save the `id` value to make further API calls.

      ```json
      {
        "id": "{sessionId}",
        "identitySourceId": "{identitySourceId}",
        "status": "CREATED",
        "importType": "INCREMENTAL"
      }
      ```

      > **Note:** Only `"importType": "INCREMENTAL"` is currently supported for an Import Session.

    * **400 Bad Request**: Another active Import Session exists for the same identity source.
    * **401 Unauthorized**: The API key isn't valid.

2. [Bulk delete user data](/docs/reference/api/xaas/#bulk-delete-user-data):

    * Use the `id` property value returned from the created Import Session to make the [bulk delete user data](/docs/reference/api/xaas/#bulk-delete-user-data) request.
    * Obtain the unique user identifiers from your HR source and add each `externalId` value into the `profiles` array. You can have up to a maximum of 200 user IDs in the array.
    * Set `entityType` to `USERS`. Only user data is supported. Group data isn't currently supported.
    * If you need to deactivate more users, make another [bulk delete user data](/docs/reference/api/xaas/#bulk-delete-user-data) request with the same `${sessionId}` value. You can make up to 50 bulk-user-load requests for one Import Session.

    ```bash
    curl -i -X POST \
      'https://${yourOktaDomain}/api/v1/identity-sources/${identitySourceId}/sessions/${sessionId}/bulk-delete' \
    -H 'Authorization: SSWS ${apiKey}' \
    -H 'Content-Type: application/json' \
    -d '{
        "entityType": "USERS",
        "profiles": [
          {
            "externalId": "${userId1}",
          },
          {
            "externalId": "${userId2}"
          },
          {
            "externalId": "${userId3}",
          }
        ]
    }'
    ```

    Possible returned responses:
    * **202 Accepted**: The bulk delete operation was successful.
    * **400 Bad Request**: Another active Import Session exists for the same identity source.
    * **401 Unauthorized**: The API key isn't valid.

3. [Trigger the data import process](/docs/reference/api/xaas):

    After you've imported all your user IDs, start the processing job to deactivate users from the Okta Universal Directory:

    ```bash
    curl -i -X PUT \
      'https://${yourOktaDomain}/api/v1/identity-sources/${identitySourceId}/session/${sessionId}/start-import' \
    -H 'Authorization: SSWS ${apiKey}' \
    -H 'Content-Type: application/json' 
    ```

    Possible returned responses:
    * **200 OK**: The data import process started successfully and returns the following properties:

        ```json
          {
            "id": "{sessionId}",
            "identitySourceId": "{identitySourceId}",
            "status": "TRIGGERED",
            "importType": "INCREMENTAL"
        }
        ```

    * **400 Bad Request**: Another active Import Session exists for the same identity source.
    * **401 Unauthorized**: The API key isn't valid.

4. Monitor the Import Session until the data processing completes by making requests for the status of the Import Session:

    ```bash
    curl -i -X GET \
      'https://${yourOktaDomain}/api/v1/identity-sources/${identitySourceId}/sessions/${sessionId} \
    -H 'Authorization: SSWS ${apiKey}' \
    -H 'Content-Type: application/json' 
    ```

    Alternatively, use the [Import Monitoring](https://help.okta.com/okta_help.htm?id=ext-view-import-monitoring-dashboard) page in the Admin Console to monitor the import process job. When the job completes, a summary of the import process appears in the Import Monitoring dashboard.

    Possible returned responses:
    * **200 OK**: The data import process started successfully and returns the following properties:

        ```json
        {
            "id": "{sessionId}",
            "identitySourceId": "{identitySourceId}",
            "status": "COMPLETED",
            "importType": "INCREMENTAL"
        }
        ```

    * **400 Bad Request**: The Import Session ID is unknown.
    * **401 Unauthorized**: The API key isn't valid.

### Cancel an Import Session

If there's an Import Session with the `CREATED` status for your identity source and you don't want to run the import process, then you can cancel the session. This operation deletes all loaded user data in the Import Session and sets the session status to `CLOSED`.

Use the [Cancel an Import Session](/docs/reference/api/xaas/#cancel-an-import-session) operation to cancel the Import Session and delete all the bulk user data associated with the session:

```bash
curl -i -X DELETE \
  'https://${yourOktaDomain}/api/v1/identity-sources/${identitySourceId}/sessions/${sessionId} \
-H 'Authorization: SSWS ${apiKey}' \
-H 'Content-Type: application/json' 
```

Possible returned responses:

* **204 No content**: The Import Session cancelled successfully. All bulk user data is removed from the session.
* **400 Bad Request**: The Import Session ID is unknown.
* **401 Unauthorized**: The API key isn't valid.
