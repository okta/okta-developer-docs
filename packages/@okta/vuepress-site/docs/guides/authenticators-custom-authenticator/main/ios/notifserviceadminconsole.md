1. In the Admin Console, go to **Security** > **Device integrations**.
2. Click **Notification Services**.
3. Click **Add Notification Service**, then select the option for Apple Push Notification service.
4. Enter the required information:
   * **Name:** The name that appears for the new notification service in the Admin Console.
   * **Key ID:** The 10-character ID assigned to your APNs service by Apple shown in your Apple developer account.
   * **Team ID:** The Apple developer team identifier used to sign your app shown in the Xcode Signing & Capabilities pane for your app.
   * **Token signing key:** The APNs authentication token signing key (.p8) file for your service. For more information on generating the key, see [Establishing a Token-Based Connection to APNs](https://developer.apple.com/documentation/usernotifications/setting_up_a_remote_notification_server/establishing_a_token-based_connection_to_apns) in Apple developer documentation.
5. Click **Add**.

After you have added a notification service, you can check for successful and failed push notifications sent to users in the System Log. See [View push notification events](https://help.okta.com/okta_help.htm?type=oie&id=ext-all-notification-services).

Alternatively, you can add a notification service using the [Create Push Provider](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/PushProvider/#tag/PushProvider/operation/createPushProvider) operation of the Push Providers API.
