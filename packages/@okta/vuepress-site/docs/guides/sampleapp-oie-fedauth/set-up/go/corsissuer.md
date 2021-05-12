9. From the side navigation, select **Security** > **API**, and then select the **Trusted Origins** tab.
10. Click **Add Origin**, enter a **Name**, and add `http://localhost:8080` as the **Origin URL**.
11. Select the **CORS** check box and click **Save**.
12. Build your issuer URL, which is the URL of the authorization server that performs the authentication. In this example, we use the "default" Custom Authorization Server. The issuer is a combination of your Org URL (found in the global header located in the upper-right corner of the Admin Console) and `/oauth2/default`. For example: `https://example-1234.oktapreview.com/oauth2/default`
