1. Start your app with the built-in PHP server:

   ```bash
   php -s 127.0.0.1:8080 -t public
   ```

1. Open a browser and navigate to `http://localhost:8080`.
1. Click **Sign In**. The browser redirects you to Okta to sign in using the Sign-In Widget.
1. After you have signed in, check your user's name appears.
1. Click **Sign Out**. The browser returns you to the home page.

> **Note**: If you are signed in as an administrator in the same browser already, it displays your name. You can open an incognito window and create a test user in the Admin Console to use if you want.