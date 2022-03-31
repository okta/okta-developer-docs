Before you can start using the email authenticator, you need to enable it in your Okta org.

### Add the email authenticator to your org

1. Open the Admin Console for your org.
1. Choose **Security > Authenticators** to show the available authenticators.
1. Locate the **Email** authenticator in the list. The **Email** authenticator is added by default for new orgs, but if it doesn't exist, use **Add Authenticator** to add it.
1. Find the **Email** authenticator in the list. If it doesn't exist, click **Add Authenticator** to add it.
1. For the **Email** Authenticator, click the **Actions** menu and then click **Edit**.
1. Select **Authentication and recovery** for **This authenticator can be used for**. Changing the value to **Authentication and recovery**  allows email for sign-in flows and password recoveries.
1. Click **Save** to save your changes.

### Set up your application to use the email authenticator

#### Add new authentication policy

1. Open the Admin Console for your org.
1. Choose **Security > Authentication Policies** to show the authentication policies for your org.
1. Click **Add a Policy**.
1. In the **Add Authentication Policy** dialog, enter a policy name (for example, 2FA Policy) and description.
1. Click **Save** to save the new policy.
1. In the new rule page, click **Add rule**.
1. Enter a name for the new rule (for example, 2FA Rule).
1. Set **User must authenticate with** to **Password+Another Factor**.
1. Confirm **Your org's authenticators that satisfy this requirement** is set to **Password AND Email or ...**
1. Click **Save**.

#### Assign authentication policy to your app

1. Choose **Applications > Applications** to show the list of app integrations.
1. Click the application integration that you want to use for this guide.
1. Switch to the **Sign-On** tab.
1. Scroll down to the **User authentication** section and click **Edit**.
1. For the **Authentication policy**, select the new authentication policy that you created in the last step.
1. Click **Save**.

### Set up callback URI for magic links

1. Open the Admin Console for your Okta org.
1. Choose **Applications > Applications** to show the app integrations that you have already created.
1. Click the application that you previously created on the **Applications** page.
1. In the **General Settings** section on the **General** tab, click **Edit**.
1. Under **EMAIL VERIFICATION EXPERIENCE**, enter a **Callback URI** for your application. This value should be a URL to your application that accepts OTP and state. The sample application uses <StackSnippet snippet="callbackuri" inline />.
1. Click **Save** to save your changes.
