To use the Okta CLI:

1. Enter the command: `okta apps create`.
2. Give your app a name.
3. Select **SPA** or **Web** as the **Type of Application**. Select **SPA** if your application is using the tokens in Angular, React, Vue, or other browser-side code.  Pick **Web** if your application is using the tokens solely in server-side code.
4. Select **Other**.
5. For the **Login redirect URI**, enter: `http://localhost:8080/login/callback`.
