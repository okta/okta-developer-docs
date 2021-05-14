---
title: Add a user using Console
---

Any authentication system needs to have a way of keeping track of the end users who are allowed to authenticate.

When you use Okta for authentication, you don't need to implement your own user management solution. Creating and deleting users, configuring their authentication flows, and resetting their passwords, can all be done from the Admin Console. User profiles are stored securely for you in the Okta cloud.

To create a new user:

1. In the Admin Console, go to **Directory** > **People**.
1. Click **Add Person**.
1. Fill in first name, last name, username (must be an email address), and primary email. For example:
    - **First name:** Joe
    - **Last name:** Smith
    - **Username:** joe.smith@example.com
    - **Primary email:** joe.smith@example.com

    > **Note:** To try out end user flows, you'll need to have access to the email address you set for the end user.

1. For password, select **Set by user**.
1. Click **Save**.

In addition to manually creating a user in the Admin Console, you can also create users through the API, and there are multiple ways of doing batch imports of users from existing user stores.

<NextSectionLink/>
