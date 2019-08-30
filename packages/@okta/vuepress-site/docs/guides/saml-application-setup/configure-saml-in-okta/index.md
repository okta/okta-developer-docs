---
title: Configure SAML in Okta
---
To configure the SAML settings of your SAML Service Provider app in Okta, follow these steps using the information that you gathered in the <GuideLink link="../overview">first step</GuideLink>:

1. On the **SAML Settings** page, paste the ACS URL into the **Single sign on URL** field.

2. Paste the Audience URI into the **Audience URI (SP Entity ID)** field.

    > **Note**: If you are just testing the setup and are using a SAML SP such as this [SAML Service Provider on GitHub](https://github.com/mcguinness/saml-sp), enter this test URL into the **Single sign on URL** and **Audience URI (SP Entity ID)** fields: `http://example.com/saml/sso/example-okta-com`.

3. Select the **Name ID format** that your application requires (for example, `EmailAddress`) or leave the default.

4. Leave the default **Application username** or select a differrent value that your application requires.

5. In the **ATTRIBUTE STATEMENTS (OPTIONAL)** section, add the required SAML attributes for your app. For example:
    
    | Name                    | Value                     | 
    | ----------------------- | ------------------------- | 
    | `FirstName`             | `user.firstName`          | 
    | `LastName`              | `user.lastName`           |
    | `Email`                 | `user.email`              |

6. In the **GROUP ATTRIBUTE STATEMENTS (OPTIONAL)** section, add the required group attributes for your app. For example:

    * **Name**: groups
    * **Filter**: Matches regex
    * **Value**: .*

7. Click **Next**.

8. On the **Feedback** page, select **I'm an Okta customer adding an internal app**. The section expands and displays more options.

9. Select **This is an internal app that we have created** as the **App type**.

10. Click **Finish**.

<NextSectionLink/>