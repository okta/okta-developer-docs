---
title: Disable the security image and additional self-service recovery options
---
<RequireClassicUI/>

With Okta, new users are prompted to choose a security image and optionally an additional security question prompt when they first sign in. To provide your users with a seamless and smooth sign-in experience, you may need to disable these options.

1. In the Admin Console, go to **Settings** and then **Customization**.

2. In the **Optional User Account Fields** section, click **Edit**.

3. Select **Disabled** from the **Security image** drop-down box, and then click **Save**.

If you don't have any policies configured or your org doesn't allow disabling additional self-service recovery options, you can skip the following steps. Disabling additional self-service recovery options is an Early Access feature. To enable it, contact [Okta Support](https://support.okta.com/help/s/?_ga=2.17747641.1660906902.1597076228-1076744453.1575496867).

1. Go to **Security** and then **Authentication**

2. Select a policy from the left, click **Edit**, and scroll down to **ACCOUNT RECOVERY**.

3. Clear the **Security question** check box in the **Additional self-service recovery** section.

4. Click **Update Policy**.

5. Repeat steps 3 to 4 for any other policies that you have configured.

<NextSectionLink/>
