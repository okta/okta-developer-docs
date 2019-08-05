---
title: Create an Identity Provider in Okta
---
To connect your org to the Identity Provider, add and configure that Identity Provider in Okta.

1. From the Developer Console, hover over **Users** and then select **Social & Identity Providers** from the menu that appears. If you are using the Classic UI, hover over **Security** and then select **Identity Providers**.

2. Select **Add Identity Provider** and then select the appropriate Identity Provider.

3. In the **Add an Identity Provider** dialog box, define the following:

    * **Name**: Enter the name that you would expect to see on a button, such as **Sign in to Facebook**.
    * **Client Id**: Paste the app ID or client ID that you obtained from the Identity Provider in the <GuideLink link="../create-an-app-at-idp">previous section</GuideLink>.
    * **Client Secret**: Paste the secret that you obtained from the Identity Provider in the <GuideLink link="../create-an-app-at-idp">previous section</GuideLink>. 
    * **Scopes**: Leave the defaults.

    > Note: For more information about these as well as the Advanced Settings, see [Social Identity Provider Settings](/docs/reference/social-settings/).

    <StackSelector snippet="appidpinokta" />

4. Click **Add Identity Provider**. The Identity Providers page appears.

5. Locate the Identity Provider that you just added and expand the information.

6. Copy both the **Authorize URL** and the **Redirect URI**, which ends in `/authorize/callback`.

<StackSelector snippet="afterappidpinokta" />

<NextSectionLink/>