---
title: Configure the Authorization Server policy
---

To enable consent for the [scopes](/docs/reference/api/authorization-servers/#create-a-scope) that you want to require consent for, select **API**, **Authorization Servers**, and then select **default** (Custom Authorization Server) in the table. In this example, we are enabling consent for default Custom Authorization Server scopes.

Make sure that the SAML 2.0 Assertion grant type is enabled in the Authorization Server default policy rule.

1. From the Admin Console side navigation, select **Security** and then **API**.

2. On the **Authorization Servers** tab, select **default** from the **Name** column in the table. In this example, we are configuring the Default Policy Rule for the [default Custom Authorization Server](/docs/concepts/auth-servers/).

3. Select the **Access Policies** tab and then click the pencil for the Default Policy Rule to make changes.

4. In the **Edit Rule** window, select **SAML 2.0 Assertion** in the **IF Grant type is** section.

5. Click **Update Rule**.

<NextSectionLink/>
