---
title: Configure the Authorization Server policy
---

Make sure that the SAML 2.0 Assertion grant type is enabled in the Authorization Server default policy rule.

1. From the Admin Console side navigation, select **Security** and then **API**.

2. In the **Name** column, select **default** to make changes to the [default authorization server](/docs/concepts/auth-servers/).

3. Select the **Access Policies** tab and then click the pencil for the Default Policy Rule to make changes.

4. In the **Edit Rule** window, select **SAML 2.0 Assertion** in the **IF Grant type is** section.

5. Click **Update Rule**.

<NextSectionLink/>
