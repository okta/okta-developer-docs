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

### Update application endpoints

If you have applications that use Okta endpoints with the uncustomized URL domain, update them to use the custom URL domain.

<NextSectionLink>Next Steps</NextSectionLink>
