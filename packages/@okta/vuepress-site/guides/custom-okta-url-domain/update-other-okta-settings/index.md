---
title: Update Other Okta Settings
---
After you add your custom URL, some features or APIs require additional configuration to reflect that change.

You need to configure your Custom Authorization Servers to return the custom domain as the `issuer` value. 

1. From the Developer Console, select **API** and then **Authorization Servers**. 
2. Select the Custom Authorization Server that you want to update and click **Edit**.
3. From the **Issuer** drop-down list box, select the custom URL and click **Save**.

> After you customize your Okta domain URL, all new Custom Authorization Servers use the custom url domain by default. All existing Custom Authorization Servers continue to use the Org URL until you change it using either the Developer Console or the API.

<NextSectionLink/>