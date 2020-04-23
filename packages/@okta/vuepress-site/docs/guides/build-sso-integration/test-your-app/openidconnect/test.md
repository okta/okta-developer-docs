### Test an OIDC integration

You should test both the Okta-initiated and App-initiated sign-in flows for your OIDC app.

#### Assign users

Assign users to your app:

1. Click the **Assignments** tab.
1. Click **Assign** and then select either **Assign to People** or **Assign to Groups**.
1. Enter the appropriate people or groups that you want to have Single Sign-On into your application, and then click **Assign** for each.
1. For any people that you add, verify the user-specific attributes, and then select **Save and Go Back**.
1. Click **Done**.

#### Test SSO

##### Test the Okta-initiated sign-in flow

1. Sign out of your administrator account in your development org.
  ![Sign out of the Admin Console](/img/oin/sso_user-sign-out.png "Sign out of the Admin Console")
1. Sign in to the Okta End-User Dashboard as the regular user that you assigned to the app.
1. Click on the app icon in your dashboard and confirm that the user is signed in to your app.

##### Test the App-initiated sign-in flow

1. Sign out of your administrator account in your development org and sign out of your app.
1. In your browser, sign in to your app either through your app's sign in button, or directly using the Login redirect URI. Regardless of which method you choose, your browser must end up at the Okta-hosted sign-in page.
1. Sign in to your regular user account on the Okta-hosted sign-in page.
1. Confirm that Okta successfully redirects you back to your application.

#### Troubleshoot issues

If you run into issues with your sign-in process, you can try the following to troubleshoot the issues:

* In the Admin Console of your Okta development org, navigate to **Reports** > **System Log** and examine any failure messages reported.
* Open the developer console of your web browser and examine any status messages related to your authentication request. The console errors have status codes in the 4XX range. Investigate and resolve any error messages from your request.
* Send an email to <developers@okta.com>, or post your questions on the [Okta developer forum](https://devforum.okta.com/search?q=oidc) or on [Stack Overflow](https://stackoverflow.com/search?q=oidc+okta).
