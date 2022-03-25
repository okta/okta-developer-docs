Before you can start using the email authenticator, you need to enable it in your Okta org and assign it an authentication policy which requires it to be used.

### Add the email authenticator to your org

First, add the email authenticator to your org and enable it for both authentication and recovery.

1. Open the **Admin Console** for your org.
2. Choose **Security > Authenticators** to show the available authenticators.
3. If the **Email** authenticator isn’t in the list:
   1. Click **Add Authenticator**.
   2. Click **Add** on the **Email** tile.
   3. Select the **Authentication and recovery** option, and then click **Save**.

   If the **Email** authenticator is in the list:
   1. Click the **Actions** menu for the **Email** authenticator.
   2. Click **Edit**.
   3. Select the **Authentication and recovery** option, and then click **Save**.
4. Select the **Enrollment** tab.
5. Check that **Email** is set to either **Optional** or **Required** in the **Eligible Authenticators** section of the Default Policy.
   1. If **Email** is set to **Disabled**, click **Edit** for the Default Policy
   2. Select **Optional** from the drop-down box for the **Email** authenticator, and then click **Update Policy**.

### Set your app integration to use the email authenticator

New apps are automatically assigned the shared default [authentication policy](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-asop). This policy has a catch-all rule that allows a user access to the app using either one or two factors, depending on your org setup. In production, it becomes evident when you can share your authentication needs between apps. In testing, it's recommended that you create a new policy specifically for your app.

1. Open the **Admin Console** for your org.
2. Choose **Security > Authentication Policies** to show the available authentication policies.
3. Click **Add a Policy**.
4. Give the policy a name, and then click **Save**.
5. Locate the Catch-all Rule of the new policy and select **Actions > Edit**.
6. Select **Allowed after successful authentication**.
7. Set **User must authenticate with** to **Password + Another factor**.
8. For **Possession factor constraints**
   1. Verify that **Device Bound** isn’t selected.
   2. Verify that **Email** is listed in the box under **Additional factor types**. If it is not listed, check the authenticator has been enabled using steps 4 and 5 of [Add the email authenticator to your org](#add-the-email-authenticator-to-your-org).
   3. Click **Save**.

9. Select the **Applications** tab for your newly created policy, and then click **Add App**.
10. Find your app in the list and click **Add** next to it.
11. Click **Close**.
12. Verify that the app is now listed in the **Applications** tab of the new policy.

### Set up magic links

Enable magic links in your org.

1. Open the **Admin Console** for your Okta org.
2. Choose **Applications > Applications** to show the app integrations you have already created.
3. Click on the application you’ve previously created on the Applications page.
4. In the **General Settings** tab under the **General** tab, and then click **Edit**
5. Under **EMAIL VERIFICATION EXPERIENCE** enter a callback URI for your application. The sample application uses `https://localhost:44314/magiclink/callback`.
6. Click **Save** to save your changes.
