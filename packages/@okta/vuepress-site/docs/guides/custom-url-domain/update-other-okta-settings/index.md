---
title: Update other Okta settings
---
After you add your custom URL, some features or APIs require additional configuration to reflect that change.

### Authorization Server issuer

After you customize your Okta domain URL, existing [Custom Authorization Servers](/docs/concepts/auth-servers/) continue to use the Okta organization URL until you change it. All new Custom Authorization Servers use the custom URL by default.

You need to update existing Custom Authorization Servers to return the custom domain as the `issuer` value:

1. From the Developer Console, select **API** and then **Authorization Servers**.
2. Select the Custom Authorization Server that you want to update and click **Edit**.
3. From the **Issuer** drop-down box, select the custom URL and click **Save**.

Additionally, you might want to change the issuer for your OpenID Connect applications that are using the Org authorization server.

<RequireClassicUI/>

1. Make sure that you are using the Admin Console. If you see **Developer Console** in the top left of the page, click it and select **Classic UI** to switch.
2. From the Admin Console, select **Applications** and then the OpenID Connect application that you want to update.
2. Select the **Sign On** tab, scroll to the **OpenID Connect ID Token** section, and then click **Edit**.
3. From the **Issuer** drop-down box, select the custom URL and click **Save**.

### Update application endpoints

If you have applications that use Okta endpoints with the uncustomized URL domain, update them to use the custom URL domain.

> **Note:** The next page covers the steps to quickly set up a custom domain using CloudFlare. If you don't want to check that content out, move on to the <GuideLink link="../next-steps">Next steps</GuideLink> page.

<NextSectionLink/>
