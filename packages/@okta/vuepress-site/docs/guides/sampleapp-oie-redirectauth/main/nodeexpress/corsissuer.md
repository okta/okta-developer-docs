6. From the side navigation, select **Security** > **API**, and then select the **Trusted Origins** tab.
7. Click **Add Origin**, enter a **Name**, and add `http://localhost:8080` as the **Origin URL**.
8. Select the **CORS** checkbox and click **Save**.
9. Build your issuer URL, which is the URL of the authorization server that performs the authentication. This example uses the "default" custom authorization server. The issuer is a combination of your Org URL (found by clicking your username in the upper-right corner of the Admin Console) and `/oauth2/default`. For example: `https://example-1234.oktapreview.com/oauth2/default`
