The Okta ASP.NET Core SDK configures and hosts both sign-in and sign-out callback routes for you in your web application. By default, the sign-in route is hosted at `/authorization-code/callback` and the sign-out route is hosted at `/signout/callback`.

Check that the redirect URIs of your Okta app integration match the development URLs that Visual Studio assigned to your app.

1. Open the **Properties** > **launchSettings.json** file.
1. Make note of the **sslPort** settings under **iisExpress**. In the following code, that's `44314`.

   ```json
   "iisSettings": {
     "windowsAuthentication": false,
     "anonymousAuthentication": true,
     "iisExpress": {
       "applicationUrl": "http://localhost:8080",
       "sslPort": 44314
     }
   }
   ```

If this differs from the SSL port used as part of the callback URLs you set earlier when [creating an app integration in the Admin Console](#create-an-app-integration-in-the-admin-console), update the URLs to match the SSL port:

1. Open the Admin Console for your org.
1. Go to **Applications** > **Applications** to view the current app integrations.
1. Select the entry for your application integration.
1. Go to the **General Settings** section on the **General** tab and click **Edit**.
1. Update the **Sign-in redirect URIs** to use the **sslPort** that you made note of earlier. For example, `https://localhost:44314/authorization-code/callback`.
1. Update the **Sign-out redirect URIs** to use the **sslPort** that you made note of earlier. For example, `https://localhost:44314/signout/callback`
1. Click **Save**.
