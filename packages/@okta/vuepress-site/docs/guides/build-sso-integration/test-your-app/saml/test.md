### Test a SAML integration

#### Assign users

Assign users to your app:

1. Click the **Assignments** tab.
1. Click **Assign** and then select either **Assign to People** or **Assign to Groups**.
1. Enter the appropriate people or groups that you want to have Single Sign-On into your application, and then click **Assign** for each.
1. For any people that you add, verify the user-specific attributes, and then select **Save and Go Back**.
1. Click **Done**.

#### Test SSO

1. Sign out of your administrator account in your development org.
  ![Sign out of the Admin Console](/img/oin/sso_user-sign-out.png "Sign out of the Admin Console")
1. Sign in to the Okta End-User Dashboard as the regular user that you assigned to the app.
1. Click on the app icon in your dashboard and confirm that the user is signed in to your app.

#### Troubleshoot issues

If you run into issues with your sign-in process, you can try the following to troubleshoot the issues:

* Use the [Okta SAML validation tool](http://saml.oktadev.com/) to speed up the process of developing a SAML SP.
  This tool makes it easy for you to send SAML Requests to your SAML SP. It allows you to quickly change the contents of the SAML requests and simplifies the process of debugging SAML issues by automatically decoding SAML payloads and displaying server headers for you.
* You can also install the [SAML Tracer extension to Firefox](https://addons.mozilla.org/en-US/firefox/addon/saml-tracer/) for testing, or similar tools for other browsers.
* Send an email to <developers@okta.com>, or post your questions on the [Okta developer forum](https://devforum.okta.com/search?q=saml) or on [stackoverflow](https://stackoverflow.com/search?q=saml+okta).

#### Prepare to submit

After your testing is complete, copy the app's instance URL (for example `https://acme.oktapreview.com/admin/app/acme_mytestapp/instance/123123123`) into a text file. You will need this information during the OIN submission process.
