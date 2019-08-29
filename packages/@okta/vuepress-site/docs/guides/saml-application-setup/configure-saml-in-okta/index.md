---
title: Configure SAML in Okta
---
To configure the SAML settings of your SAML Service Provider app in Okta:

1. On the **SAML Settings** page, paste the ACS URL that you gathered in the <GuideLink link="../overview">first step</GuideLink> into the **Single sign on URL** field.

2. Paste the Audience URI that you gathered in the <GuideLink link="../overview">first step</GuideLink> into the **Audience URI (SP Entity ID)** field.

    > **Note**: If you are just testing the setup and are using a SAML SP such as this [SAML Service Provider on GitHub](https://github.com/mcguinness/saml-sp), enter this test URL into the **Single sign on URL** and **Audience URI (SP Entity ID)** fields: `http://example.com/saml/sso/example-okta-com`.

3. In the **ATTRIBUTE STATEMENTS (OPTIONAL)** section, add three attribute statements, and then any other required SAML attributes for your app:
    
    | Name                    | Value                     | 
    | ----------------------- | ------------------------- | 
    | `FirstName`             | `user.firstName`          | 
    | `LastName`              | `user.lastName`           |
    | `Email`                 | `user.email`              |

4. Click **Next**.

5. On the **Feedback** page, select **I'm an Okta customer adding an internal app**. The section expands and displays more options.

6. Select **This is an internal app that we have created** as the **App type**.

7. Click **Finish**.

<NextSectionLink/>