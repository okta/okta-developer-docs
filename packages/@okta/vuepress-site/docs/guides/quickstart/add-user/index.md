---
title: Add a user
---

Any authentication system needs to have a way of keeping track of the end users who are allowed to authenticate.

When you use Okta for authentication, you don't need to implement your own user management solution. Creating and deleting users, configuring their authentication flows, and resetting their passwords, can all be done from the Developer Console UI. User profiles are stored securely for you in the Okta cloud..


To create a new user:

1. From the Dashboard, click **Users**.
2. Click **Add Person**.
3. Fill in first name, last name, username (must be an email address), primary email, for example:
	 - **First name:** Joe
	 - **Last name:** Smith
	 - **Username:** joe.smith@example.com
	 - **Primary email:** joe.smith@example.com
	>**Note:** To try out end user flows, you'll need to have access to the email address you set for the end user.
4. For password, select "Set by user".
5. Click **Save**.

As you’ll see later, in addition to manually creating a user in the Developer Console, you can also create users via API, and there are multiple ways of doing batch imports of users from existing user stores.

<NextSectionLink/>

