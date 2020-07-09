---
title: Create the token
---
To create an API token, follow these steps:

1. Sign in to your Okta organization as a user with [administrator privileges](https://help.okta.com/en/prod/Content/Topics/Security/Administrators.htm?cshid=Security_Administrators#Security_Administrators).

     API tokens have the same permissions as the user who creates them, and if the user permissions change, the API token permissions also change.

    See the note above on <GuideLink link="../overview/#privilege-level">Privilege level</GuideLink>, regarding the use of a service account when creating an API token, to specifically control the privilege level associated with the token.

    If you don't have an Okta organization, you can [create one for free](https://developer.okta.com/signup).

2. Access the API page:
    - If you use the Developer Console, select **Tokens** from the **API** menu.
    - If you use the Administrator Console (Classic UI), select **API** from the **Security** menu, and then select **Tokens**.

3. Click **Create Token**.

4. Name your token and click **Create Token**.

5. Record the token value. This is the only opportunity to see it and record it.

<NextSectionLink/>
