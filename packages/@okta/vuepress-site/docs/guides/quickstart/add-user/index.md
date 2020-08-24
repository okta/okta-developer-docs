---
title: Add a user
---

Any authentication system needs to have a way of keeping track of the end users who are allowed to authenticate.

When you use Okta for authentication, you don't need to implement your own user management solution. Creating and deleting users, configuring their authentication flows, and resetting their passwords, can all be done from the Developer Console UI. User profiles are stored securely for you in the Okta cloud. You just need to focus on your app.

Note that, to try out an end user authentication flow, you'll need to have access to the email address you set for the end user.

To create a new user:

1. From the Dashboard, click **Users**.
2. Click **Add Person**.
3. Fill in first name, last name, username (must be an email address), primary email. For example: Joe Smith, joe.smith@example.com, joe.smith@example.com.
4. For password, let's select "Set by user".
5. Click **Save**.

As you’ll see later, in addition to manually creating a user in the Developer Console, there are multiple ways of importing users from existing user stores.

