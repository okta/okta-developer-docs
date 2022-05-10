4. Select **Native Application** as the **Application type**, then click **Next**.
5. Specify the **App integration name**.
6. Select **Resource Owner Password** as one of the allowed **Grant type**.
7. Fill in the remaining details for your app integration, then click **Save**.
8. On the **General** tab, click **Edit** in the the **Client Credentials** section.
9. Select **Use Client Authentication**, then click **Save**.

On the **General** tab, the **Client Credentials** section contains the **Client ID** for your app integration. It also shows the **Client authentication** that defaults to **None**. The use of **None** for client authentication requires the use of a Proof Key for Code Exchange (PKCE) for additional verification. PKCE ensures that only the client that requests the access token can redeem it.

Save the generated **Client ID** value to implement your authorization flow.
