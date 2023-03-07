6. From the side navigation, select **Security** > **API**, and then select the **Trusted Origins** tab.
7. Click **Add Origin**, enter a **Name**, and add `http://localhost:8080` as the **Origin URL**.
8. Select the **CORS** check box and click **Save**.
9. Build your issuer URL, which is the URL of the authorization server that performs the authentication. In this example, we use the "default" custom authorization server. The issuer is a combination of your Org URL (found in the global header located in the upper-right corner of the Admin Console) and `/oauth2/default`. For example: `https://example-1234.oktapreview.com/oauth2/default`
     > **Note:** If you are using a custom domain to reference the issuer, make sure that you also configure the custom authorization server to [reflect the custom domain](/docs/guides/custom-url-domain/main/#authorization-server-issuer). Otherwise, there is a mismatch between the issuer in the request and the tokens minted.
