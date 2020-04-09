---
title: Set up your Okta org for MFA
---

Before you begin, make sure to enable support for MFA in the Admin Console of your Okta org.

## Enable MFA in your Okta org

You need to enable MFA from the Admin Console of your Okta org before you can use it with the Okta API. In this example, we are going to enable the **Google Authenticator** MFA factor type.

> **Note:** Make sure that you are using the Admin Console for these steps. If you see **Developer Console** in the top left of the page, click it and select **Classic UI** to switch.

1. From the Admin Console, select **Security** from the main menu and then select **Multifactor**.
2. On the **Factor Types** tab, select **Google Authenticator** from the left navigation.
3. Click the **Inactive** drop-down and select **Activate**.

    ![Multifactor page](/img/multifactor.png "Multifactor page with Google Authenticator selected and an arrow pointing to it and the Inactive drop-down selected with an arrow pointing to it.")

    > **Note:** See [MFA](https://help.okta.com/en/prod/Content/Topics/Security/MFA.htm) and [Security Policies](https://help.okta.com/en/prod/Content/Topics/Security/Security_Policies.htm) for more information about MFA and the Okta org.

<NextSectionLink/>
