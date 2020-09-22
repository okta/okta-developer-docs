In the Developer Console, complete these steps:

1. Click **Applications**.

2. Click **Add Application**.

3. Select **Web** as the type of application. Click **Next**.

4. Enter the **Name** of your app.

5. Leave **Base URI** set to the default. This is the domain where your app runs. For this quick start guide, we'll use `localhost`, which is where the sample apps run by default. You might need to change the port, depending on the default port your framework uses to serve `localhost` pages. 

6. Leave **Login redirect URIs** set to the default. Okta sends OAuth authorization responses to these URIs, which are also known as callback endpoints.

5. Leave **Logout redirect URIs** set to the default. This setting lets you specify a URI to redirect the user’s browser to when they sign out.

6. Leave **Group assignments** set to the default, which is "Everyone". Users can only sign in to apps that they are assigned to. Group assignments let you manage assignments for large numbers of users at once.

7. For **Grant type allowed**, under "Client acting on behalf of a user", select **Authorization Code**. This is the OAuth 2.0 grant type that Okta will provide.

8. Click **Done**.

