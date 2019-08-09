When you are configuring federation between two Okta orgs using OpenID Connect:

1. At the Okta org that represents the Identity Provider, select **Applications** and then click **Add Application**.

2. You need a trusted client, so select **Web** as the platform. OpenID Connect is the sign-in method by default.

3. Click **Next**.

4. Enter a name for your application.

5. Leave the default for **Login Redirect URI** for now. We come back to it later.

6. Assign a group or leave the **Everyone** default. Be sure to verify that the users you want to have access are assigned to the group that you select.

7. Click **Done**.

8. Copy the Client ID and Client Secret from the **Client Credentials** section and paste into a text editor. You need these when you configure this Identity Provider in your org.