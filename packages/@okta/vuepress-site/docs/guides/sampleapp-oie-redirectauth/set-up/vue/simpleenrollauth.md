1. On the command line inside the `okta-hosted-login` subdirectory, start the <StackSelector snippet="applang" noSelector inline /> app by running `npm start`.
2. Open `localhost:8080` in an incognito/private window, and the PKCE Flow w/Okta Hosted Login Page appears for the Okta Vue sample project.
3. Click **Login**. You are redirected to the Okta Sign-In Widget.
4. Enter the **Username** and **Password** for an admin user in your Okta org. You are redirected to the success page.
    > **Note:** Which authenticators appear during sign-in depends on how your [application sign-on policy](https://help.okta.com/en/prod/okta_help_CSH.htm#ext-about-asop) is configured.
5. Click **Logout** at the top of the page to sign out of the <StackSelector snippet="applang" noSelector inline /> app.
