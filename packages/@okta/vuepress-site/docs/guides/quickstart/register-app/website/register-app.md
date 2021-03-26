In the Admin Console, complete these steps:

1. Select **Applications > Applications** in the side navigation.

2. Click **Add Application**.

3. Select **SPA** or **Web** as the **Type of Application**. Select **SPA** if your application is using the tokens in Angular, React, Vue, or other browser-side code. Pick **Web** if your application is using the tokens solely in server-side code.

4. Enter the **Name** of your app.

5. Leave **Base URI** set to the default. This is the domain where your app runs. For this quick start guide, we use `localhost`, which is where the sample apps run by default. You might need to change the port, depending on the default port your framework uses to serve `localhost` pages.

6. For **Login redirect URIs**, use `http://localhost:8080/login/callback` for **SPA** apps and `http://localhost:8080/authorization-code/callback` for **Web** apps. These URIs are customizable within your app, so you don't have to use these defaults. Okta sends OAuth authorization responses to the specified URIs, which are also known as callback endpoints.

5. Leave **Logout redirect URIs** set to the default. This setting lets you specify a URI to redirect the user’s browser to when they sign out.

6. Leave **Group assignments** set to the default, which is **Everyone**. Users can only sign in to apps that they are assigned to. Group assignments let you manage assignments for large numbers of users at once.

7. For **Grant type allowed**, under "Client acting on behalf of a user", select **Authorization Code**. This is the OAuth 2.0 grant type that Okta provides.

8. Click **Done**.
