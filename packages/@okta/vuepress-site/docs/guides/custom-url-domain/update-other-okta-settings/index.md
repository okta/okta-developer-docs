---
title: Update other Okta settings
---
After you add your custom URL, some features or APIs require additional configuration to reflect that change.

### Authorization Server issuer

After you customize your Okta domain URL, existing [Custom Authorization Servers](/docs/concepts/auth-servers/) continue to use the Okta organization URL until you change it. All new Custom Authorization Servers use the custom URL by default.

You need to update existing Custom Authorization Servers to return the custom domain as the `issuer` value:

1. From the Admin Console side navigation, select **Security** and then **API**.
1. From the **Authorization Servers** tab, select the Custom Authorization Server that you want to update.
1. Click **Edit** on the Custom Authorization Server that you selected.
1. From the **Issuer** drop-down box, select the custom URL and click **Save**.

Additionally, you might want to change the issuer for your OpenID Connect applications that are using the Org authorization server.

1. From the Admin Console side navigation, select **Applications** and then **Applications**.
1. Click the OpenID Connect application that you want to update.
1. Select the **Sign On** tab, scroll to the **OpenID Connect ID Token** section, and then click **Edit**.
1. From the **Issuer** drop-down box, select the custom URL and click **Save**.

### Update application endpoints

If you have applications that use Okta endpoints with the uncustomized URL domain, update them to use the custom URL domain.

> **Note:** The next page covers the steps to quickly set up a custom domain using CloudFlare. If you don't want to check that content out, move on to the <GuideLink link="../next-steps">Next steps</GuideLink> page.

<NextSectionLink/>
