---
title: Configure the Authorization Server policy
---

Make sure that the SAML 2.0 Assertion grant type is enabled in the Authorization Server. You can update an existing rule or create a new rule. In this example, we are updating the Default Policy Rule.

1. From the Admin Console side navigation, select **Security** and then **API**.

2. On the **Authorization Servers** tab, select **default** from the **Name** column in the table. In this example, we are configuring the Default Policy Rule for the [default Custom Authorization Server](/docs/concepts/auth-servers/).

> **Note:** See [Configure an Access Policy](/docs/guides/configure-access-policy/overview/) for information on creating an access policy in the Okta Authorization Server.

3. Select the **Access Policies** tab and then click the pencil for the Default Policy Rule to make changes.

4. In the **Edit Rule** window, select **SAML 2.0 Assertion** in the **IF Grant type is** section.

5. Click **Update Rule**.

<NextSectionLink/>
