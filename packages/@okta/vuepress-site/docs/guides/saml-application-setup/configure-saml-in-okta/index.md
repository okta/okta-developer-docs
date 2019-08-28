---
title: Configure SAML in Okta
---
1.  On the **SAML Settings** page, paste the following URL into the **Single sign on URL** and **Audience URI (SP Entity ID)** fields: `http://example.com/saml/sso/example-okta-com`

2. In the **ATTRIBUTE STATEMENTS (OPTIONAL)** section, add three attribute statements:
    
    | Name                    | Value                     | 
    | ----------------------- | ------------------------- | 
    | FirstName               | user.firstName            | 
    | LastName                | user.lastName             |
    | Email                   | user.email                |

3. Click **Next**.

4. On the **Feedback** page, select **I'm an Okta customer adding an internal app**. The section expands and displays more options.

5. Select **This is an internal app that we have created** as the **App type**.

6. Click **Finish**.

<NextSectionLink/>