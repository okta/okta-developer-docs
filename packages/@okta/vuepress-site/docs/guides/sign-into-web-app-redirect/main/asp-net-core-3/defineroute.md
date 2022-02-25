To sign users in, your application redirects the browser to an Okta-hosted sign-in page. Okta then redirects back to your application with information about the user. You can learn more about how this works on [Okta-hosted flows](https://developer.okta.com/docs/concepts/okta-hosted-flows/).

Your web application must host a route that Okta sends information to when a user signs in. This route is called a callback route or redirect URI. The callback route isn't seen by the user, and it's not the user's final destination. It's just one step in the authentication redirect flow.

Similarly, when your web application contacts Okta to sign a user out, Okta redirects the browser to a sign-out redirect URI that the application must also host.

The Okta ASP.NET Core SDK configures and hosts these routes for you in your web app. By default, the sign-in route is hosted at `/authorization-code/callback` and the sign-out route is hosted at `/signout/callback`. You need to update the redirect URIs of your Okta app integration to reflect the development URLs that Visual Studio assigned to your app.

1. In Visual Studio, open **Properties** > **launchSettings.json**.
2. Make a note of the **sslPort** settings under **iisExpress**. In the example below, that's `44300`.

```json
  "iisSettings": {
    "windowsAuthentication": false,
    "anonymousAuthentication": true,
    "iisExpress": {
      "applicationUrl": "http://localhost:1544",
      "sslPort": 44300
    }
  }
```

3. Open the Okta Admin Console.
4. Select **Applications** > **Applications** from the left navigation.
5. Click the entry for your application integration.
6. Click **Edit** on the **General** tab.
7. Scroll down to the **LOGIN** section.
8. Edit the **Sign-in redirect URIs** to use the **sslPort** that you made note of earlier, for example `https://localhost:44300/authorization-code/callback`.
9. Edit the **Sign-out redirect URIs** to use the **sslPort** that you made note of earlier, for example `https://localhost:44300/signout/callback`
10. Click **Save**.
