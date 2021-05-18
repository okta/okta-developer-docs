8. In the General Settings section, click **Edit**, select **Interaction Code** as a **Grant type allowed**, and click **Save**.
9. Build your issuer URL, which is the URL of the authorization server that performs the authentication. In this example, we use the "default" Custom Authorization Server. The issuer is a combination of your Org URL (found in the global header located in the upper-right corner of the Admin Console) and `/oauth2/default`. For example: `https://example-1234.oktapreview.com/oauth2/default`
10. From the side navigation, select **Security** > **API**, and then select the "default" Custom Authorization Server.
11. Select **Access Policies** and then click the pencil icon for the **Default Policy Rule**.
12. Select **Interaction Code** in the **IF Grant type is** section and click **Update Rule**.
