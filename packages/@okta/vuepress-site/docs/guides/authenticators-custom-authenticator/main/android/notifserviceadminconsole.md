1. In the Admin Console, go to **Security** > **Device integrations**.
2. Click **Notification Services**.
3. Click **Add Notification Service**, then select **FCM**.
4. Enter the required information:
   * **Name:** Enter a unique name for the Firebase Cloud Messaging service.
   * **Service account JSON:** Enter your service account key in JSON format.
   You can use the Google Cloud Console, Google Cloud CLI, or one of the client libraries to create your service account key. See [Creating and managing service account keys](https://cloud.google.com/iam/docs/creating-managing-service-account-keys).
5. Click **Add**.

After you have added a notification service, you can check for successful and failed push notifications sent to users in the System Log. See [View push notification events](https://help.okta.com/okta_help.htm?type=oie&id=ext-all-notification-services).

Alternatively, you can add a notification service using the [Create Push Provider](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/PushProvider/#tag/PushProvider/operation/createPushProvider) operation of the Push Providers API.
