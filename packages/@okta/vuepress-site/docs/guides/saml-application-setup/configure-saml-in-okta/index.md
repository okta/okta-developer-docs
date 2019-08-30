---
title: Configure SAML in Okta
---
To configure the SAML settings of your SAML Service Provider app in Okta:

1. On the **SAML Settings** page, paste the ACS URL that you gathered in the <GuideLink link="../overview">first step</GuideLink> into the **Single sign on URL** field.

2. Paste the Audience URI that you gathered in the <GuideLink link="../overview">first step</GuideLink> into the **Audience URI (SP Entity ID)** field.

    > **Note**: If you are just testing the setup and are using a SAML SP such as this [SAML Service Provider on GitHub](https://github.com/mcguinness/saml-sp), enter this test URL into the **Single sign on URL** and **Audience URI (SP Entity ID)** fields: `http://example.com/saml/sso/example-okta-com`.

3. Select the **Name ID format** that your application requires (for example, `EmailAddress`) or leave the default.

4. In the **ATTRIBUTE STATEMENTS (OPTIONAL)** section, add the required SAML attributes for your app, which you gathered in the <GuideLink link="../overview">first step</GuideLink>. For example:
    
    | Name                    | Value                     | 
    | ----------------------- | ------------------------- | 
    | `FirstName`             | `user.firstName`          | 
    | `LastName`              | `user.lastName`           |
    | `Email`                 | `user.email`              |

5. Click **Next**.

6. On the **Feedback** page, select **I'm an Okta customer adding an internal app**. The section expands and displays more options.

7. Select **This is an internal app that we have created** as the **App type**.

8. Click **Finish**.

<NextSectionLink/>