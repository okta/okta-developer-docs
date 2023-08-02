The Okta ASP.NET Core SDK configures and hosts both sign-in and sign-out callback routes for you in your web application. By default, the sign-in route is hosted at `/authorization-code/callback` and the sign-out route is hosted at `/signout/callback`.

Check the redirect URIs of your Okta app integration match the development URLs that Visual Studio assigned to your app.

1. Open the **Properties** > **launchSettings.json** file.
1. Make a note of the **sslPort** settings under **iisExpress**. In the example below, that's `44388`.

   ```json
   "iisSettings": {
     "windowsAuthentication": false,
     "anonymousAuthentication": true,
     "iisExpress": {
       "applicationUrl": "http://localhost:23316",
       "sslPort": 44388
     }
   }
   ```

If this differs from the SSL port used as part of the callback URLs you set earlier when [creating an app integration in the admin console](#create-an-app-integration-in-the-admin-console), you should update the URLs to match the SSL port:

1. Open the Admin Console for your org.
1. Go to **Applications** > **Applications** to view the current app integrations.
1. Select the entry for your application integration.
1. Go to the **General Settings** section on the **General** tab and click **Edit**.
1. Update the **Sign-in redirect URIs** to use the **sslPort** that you made note of earlier. For example, `https://localhost:44388/authorization-code/callback`.
1. Update the **Sign-out redirect URIs** to use the **sslPort** that you made note of earlier. For example, `https://localhost:44388/signout/callback`
1. Click **Save**.
