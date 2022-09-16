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

The Okta Anything-as-a-Source (XaaS) solution provides your organization the ability to integrate any HR source into your Okta org. The HR source acts as a source-of-truth and users are pushed and mapped to Okta user profiles in the Okta Universal Directory. There are two methods to implement the XaaS integration:

* using Okta Workflows
or
* developing a custom client

With either method, you need to first define your HR source in your Okta org. This is referred to as the Custom Identity Source integration. Okta provides you with a Custom Identity Source unique identifier that you can use in your Okta Workflow or custom client to identify the HR source. See Configuration of a Custom Identity Source in  [Using anything as a source](https://okta.github.io/doc_reviews/en-us/Content/Topics/users-groups-profiles/usgp-anything-as-a-source.htm).

This guide outlines the XaaS API flow so that you can develop your custom client for the XaaS integration. For XaaS integrations using Okta Workflows, see [Okta Workflows](https://help.okta.com/okta_help.htm?type=wf).

To make secure API calls from your custom client, obtain an API token from Okta. See [Create an API token](/docs/guides/create-an-api-token/main/).

## XaaS API concepts

### Import Session

The XaaS API synchronizing data flow uses an [Import Session](/docs/reference/xaas/#import-session) object to encapsulate the data upload and the data import processing tasks. You need to create an Import Session object each time you want to synchronize data from the HR source to Okta. The Import Session object uses the following status to indicate the stage of the synchronization process flow.

### Import Session status

* **CREATED**: The Import Session object has been created for a specific Custom Identity Source integration and data can be uploaded to the session at this stage. No data import processing has been invoked and the session can be deleted at this stage.
* **IN_PROGRESS**:  Okta is processing the import data in this session. You can’t upload new data to the Import Session object at this stage and the session can’t be deleted. Import Sessions with this status can be viewed in the [Import Monitoring](https://help.okta.com/okta_help.htm?id=ext-view-import-monitoring-dashboard) page in the Admin Console.
* **COMPLETED**:  The data in the Import Session object has been processed by Okta. You can’t upload new data to the Import Session object if it has the `COMPLETED` status. The synchronization data job is considered complete. You can close the Import Session by calling the DELETE operation to set its object status to `CANCELLED`.
* **CANCELLED**: The session is considered closed by Okta and is available for archival  purposes. You can’t upload data or trigger the import process on an Import Session that is in `CANCELLED` status. Previous user data uploaded is deleted from an Import Session that is in the `CANCELLED` status. 
* **EXPIRED**: ??? This status indicates that the Import Session has timed-out during the data import processing stage.

### Import Session process

You can only process one Import Session, for a specific Custom Identity Source integration, at a time to avoid conflicts. The following are additional Import Session behaviors:

* Data can only be uploaded to an Import Session when it’s in the `CREATED` status.
* A Custom Identity Source integration can only ever have one active Import Session at a time. An Import Session with the  `CREATED` or `IN_PROGRESS` status is considered active.
* A new Import Session can’t be created in less than five minutes after the previous Import Session associated with the same identity source was created. If Okta receives a new Import Session request within five minutes of a recently created Import Session in the `CREATE` status, Okta returns a 400 - Bad Request response.

> **Note:** If you receive a 400 Bad Request from a create Import Session request, then ensure that there is no Import Session with the `CREATED` status for the same identity source. Use the `GET /identitysources/${identitySourceId}/session` request to list all the existing Import Sessions for an identity source.

> **???KNOWN ISSUE:** Import Sessions do not expire if left in an “CREATED” state and a further creation of new sessions will fail
> [Van question]: If this known issue is still valid, then can we say that there can only be one Import Session in the `CREATED` status for an identity source? And remove the 5 minute note in the above description?

### Bulk user imports

You can upload up to 200 KB of data in a single bulk import (`bulkImport`) request for a particular Import Session. This equates to 200 user profiles. To add more user profiles, you can make multiple bulk import requests for a particular session. The maximum number of bulk import requests for a session is 50. If you have exhausted the maximum number of bulk import requests and you still need to upload more user profiles, then create another Import Session object for the additional user profiles. Keep in mind that you can only import user data for Import Sessions in the `CREATED` status and that you can’t process user imports in parallel for a specific identity source.

### Bulk user profile data

The bulk import request contains an array of [User Profile Data](/docs/reference/api/xaas/#user-profile-data) objects that contain the following:

* `externalId`: Contains the unique identifier from the HR source and is assumed to be immutable (never updated for a specific user). This value is used to determine if a new user needs to be created or an existing user needs to be updated.

* `profile`:  Contains the set of attributes from the HR source to synchronize with Okta user profiles. User profiles are mapped according to the attribute mappings you specified in your Custom Identity Source configuration.  See Declaration of a Custom Identity Source Schema in  [Using anything as a source](https://help.okta.com/okta_help.htm?type=wf).

> **Note:** Only user profile data can be imported to an Import Session object with the `entityName` = `USERS` property. Group data import isn’t supported.

### Bulk user profile data type

There are two types of bulk import requests:

* `UPSERT`: Insert or update the profile users in this bulk import request
* `DELETE`: Deactivate the user profiles in this bulk import request

## XaaS API flow

Before you start to build your integration component, you need to set up a few configuration variables:

* Your Okta org domain URL (`${yourOktaDomain}`): This is for XaaS API requests.
* Your Custom Identity Source ID (`${identitySourceId}`): This is the unique identifier you obtain from [configuring a Custom Identity Source integration] in your Okta org. 
* An API Token (`${apiKey}`}: You need to [obtain an API token from your Okta org] to make API calls to Okta. Use this API token in the SSWS Authorization header.

Code your XaaS data synchronization component with the following generalized API flow:

1. Create an Import Session
2. Load user data profile (if required, load multiple batches of user data)
3. Trigger the data import process
4. Monitor the Import Session until the data processing completes
5. Close the Import Session

    > **Note:** It is good practice to close the Import Session in your custom code. Closing the Import Session sets the status to `CANCELLED` and removes all the imported user data from Okta, freeing up space.


<div class="full">

![Anything-as-a-Source API flow](/img/xaas-flow.png)

</div>

For detailed API calls, see the following guidelines for specific use case flows:

* [Bulk import user data](#bulk-import-user-data)
* [Bulk deactivate user data](#bulk-deactivate-user-data)

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

    * **200 OK**: The Import Session created successfully and returns a `sessionId` property. Save the `sessionId` value to make further API calls.

      ```json
          {
          	sessionId: “${sessionId}”,
          	status: “CREATED”
          }
      ```

    * **400 Bad Request**: Another active Import Session exists for the same identity source.
    * **403 Access Denied**

2. [Load user data profile](/docs/reference/api/xaas) in bulk:

    * Use the `sessionId` property value returned from the created Import Session to make the [Load user data profile](link to API operation) request.
    * Obtain the user profiles from your HR source and add each user profile attribute into the `profiles` array. Set the bulk import `type` to `UPSERT`. You can have up to a maximum of 200 user profiles in the array.
    * Set `entityName` to `USERS`. Only user import is supported; group import is not supported.
    * If you need to add more users, make another [Load user data profile](link to API operation) request with the same `sessionId` value. You can make up to 50 load user data requests for one Import Session.

    ```bash
    curl -i -X POST \
      'https://${yourOktaDomain}/api/v1/identity-sources/${identitySourceId}/sessions/${sessionId}/bulk-import' \
    -H 'Authorization: SSWS ${apiKey}' \
    -H 'Content-Type: application/json' \
    -d '{
        "type": "UPSERT",
        "entityName": "USERS",
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
    * **202 ???** : The bulk import was successful. A `batchId` value is returned.
    * **400 Bad Request**: Another active Import Session exists for the same identity source.
    * **403 Access Denied**

3. [Trigger the data import process](/docs/reference/api/xaas):

    Once you have imported all your user profiles to insert or update, start the import processing job to add users to the Okta Universal Directory:

    ```bash
    curl -i -X PUT \
      'https://${yourOktaDomain}/api/v1/identity-sources/${identitySourceId}' \
    -H 'Authorization: SSWS ${apiKey}' \
    -H 'Content-Type: application/json' 
    ```

    Possible returned responses:
    * **200 OK**: The data import process started successfully and returns the following properties:

        ```json
          {
            "id": "${sessionId}",
            "identitySourceId": "${identitySourceId}",
            "status": "IN_PROGRESS"
        }
        ```

    * **400 Bad Request**: Another active Import Session exists for the same identity source.
    * **403 Access Denied**

4. Monitor the Import Session until the data processing completes

    Request for status of the Import Session to verify that the import job is complete:

    ```bash
    curl -i -X GET \
      'https://${yourOktaDomain}/api/v1/identity-sources/sessions/${sessionId} \
    -H 'Authorization: SSWS ${apiKey}' \
    -H 'Content-Type: application/json' 
    ```

    Alternatively, use the [Import Monitoring](https://help.okta.com/okta_help.htm?id=ext-view-import-monitoring-dashboard) page in the Admin Console.

    Possible returned responses:
    * **200 OK**: The data import process started successfully and returns the following properties:

        ```json
        {
            "id": "${sessionId}",
            "identitySourceId": "${identitySourceId}",
            "status": "COMPLETED"
        }
        ```

    * **400 Bad Request**: Unknown Import Session ID
    * **403 Access Denied**

5. [Close the Import Session](/docs/reference/api/xaas/)

    Use the DELETE operation to close the Import Session and delete all the bulk user data associated with the session.

    ```bash
    curl -i -X DELETE \
      'https://${yourOktaDomain}/api/v1/identity-sources/sessions/${sessionId} \
    -H 'Authorization: SSWS ${apiKey}' \
    -H 'Content-Type: application/json' 
    ```

    Possible returned responses:
    * **204 No content**: The Import Session closed successfully and contains the `CANCELLED` status. All bulk user data is removed from the session.
    * **400 Bad Request**: Unknown Import Session ID
    * **403 Access Denied**

### Bulk deactivate user data

When users have been deactivated or deleted from your HR source, you need to reflect that status in Okta. Okta does not delete user profile objects, it deactivates the users that are no longer active. Use these steps to deactivate a set of user data profiles from Okta.  

1. [Create an Import Session](/docs/reference/api/xaas/):

   ```bash
    curl -i -X POST \
      'https://${yourOktaDomain}/api/v1/identity-sources/${identitySourceId}/sessions' \
    -H 'Authorization: SSWS ${apiKey}' \
    -H 'Content-Type: application/json' 
    ```

    Possible returned responses:

    * **200 OK**: The Import Session created successfully and returns a `sessionId` property. Save the `sessionId` value to make further API calls.

      ```json
          {
          	sessionId: “${sessionId}”,
          	status: “CREATED”
          }
      ```

    * **400 Bad Request**: Another active Import Session exists for the same identity source.
    * **403 Access Denied**

2. [Load user data profile](/docs/reference/api/xaas) in bulk:

    * Use the `sessionId` property value returned from the created Import Session to make the [Load user data profile](/docs/reference/api/xaas) request.
    * Obtain the unique user identifiers  from your HR source and add each `externalId` value into the `profiles` array. Set the bulk import `type` to `DELETE`. You can have up to a maximum of 200 user IDs in the array.
    * Set `entityName` to `USERS`. Only user import is supported.

    * If you need to deactivate more users, make another [Load user data profile](/docs/reference/api/xaas) request with the same `sessionId` value. You can make up to 50 load user data requests for one Import Session.

    ```bash
    curl -i -X POST \
      'https://${yourOktaDomain}/api/v1/identity-sources/${identitySourceId}/sessions/${sessionId}/bulk-import' \
    -H 'Authorization: SSWS ${apiKey}' \
    -H 'Content-Type: application/json' \
    -d '{
        "type": "DELETE",
        "entityName": "USERS",
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
    * **202 ???** : The bulk import was successful. A `batchId` value is returned.
    * **400 Bad Request**: Another active Import Session exists for the same identity source.
    * **403 Access Denied**

3. [Trigger the data import process](/docs/reference/api/xaas):

    Once you have imported all your user IDs, start the processing job to deactivate users from the Okta Universal Directory:

    ```bash
    curl -i -X PUT \
      'https://${yourOktaDomain}/api/v1/identity-sources/${identitySourceId}' \
    -H 'Authorization: SSWS ${apiKey}' \
    -H 'Content-Type: application/json' 
    ```

    Possible returned responses:
    * **200 OK**: The data import process started successfully and returns the following properties:

        ```json
          {
            "id": "${sessionId}",
            "identitySourceId": "${identitySourceId}",
            "status": "IN_PROGRESS"
        }
        ```

    * **400 Bad Request**: Another active Import Session exists for the same identity source.
    * **403 Access Denied**

4. Monitor the Import Session until the data processing completes

    Request for status of the Import Session to verify that the import job is complete:

    ```bash
    curl -i -X GET \
      'https://${yourOktaDomain}/api/v1/identity-sources/sessions/${sessionId} \
    -H 'Authorization: SSWS ${apiKey}' \
    -H 'Content-Type: application/json' 
    ```

    Alternatively, use the [Import Monitoring](https://help.okta.com/okta_help.htm?id=ext-view-import-monitoring-dashboard) page in the Admin Console.

    Possible returned responses:
    * **200 OK**: The data import process started successfully and returns the following properties:

        ```json
        {
            "id": "${sessionId}",
            "identitySourceId": "${identitySourceId}",
            "status": "COMPLETED"
        }
        ```

    * **400 Bad Request**: Unknown Import Session ID
    * **403 Access Denied**

5. [Close the Import Session](/docs/reference/api/xaas/)

    Use the DELETE operation to close the Import Session and delete all the bulk user data associated with the session.

    ```bash
    curl -i -X DELETE \
      'https://${yourOktaDomain}/api/v1/identity-sources/sessions/${sessionId} \
    -H 'Authorization: SSWS ${apiKey}' \
    -H 'Content-Type: application/json' 
    ```

    Possible returned responses:
    * **204 No content**: The Import Session closed successfully and contains the `CANCELLED` status. All bulk user data is removed from the session.
    * **400 Bad Request**: Unknown Import Session ID
    * **403 Access Denied**
