---
title: Create your Okta organization
---

You built an awesome app and you want to add user authentication to it. Let’s get you set up and working with Okta.

To start, you're going to need a free Okta developer edition org. An org is a private data space Okta provisions for you, to hold all the resources you create to handle user authentication.

An org is free, and you can use it to handle authentication for up to 1,000 users. Later, if you need more capacity, you can upgrade to a paid org.

#### Create your org

You can create an account on our website:

1. Go to: <https://developer.okta.com/signup>

2. Fill out the form. You'll need to supply:
	 - email address
	 - first name
	 - last name
	 - company
	 - country
	 - state/province

3. Click to agree to the terms.

4. Click **Get Started**.

5. You receive an email to activate your account. The email gives you a temporary password and also lets you know your Okta domain.

	Your Okta domain is important: It’s the base of the URL you use to access your org.  Authorization requests for users will be directed to an endpoint that has this as its base, and any Okta API endpoints you call will also have this URL as their base.

	Record your Okta domain and your temporary password. Click the **Activate your account** button in the email.

6. You're prompted to sign in to your org. Supply your email address and the temporary password that was provided in the email.

7. You're prompted to change your password and to choose a security question. You're also prompted to choose a security image. The image is displayed whenever Okta prompts you to sign in, providing some assurance that it’s Okta asking.

#### Next steps

Your org is now created and usable. There's a survey you’re prompted to fill out about your role, aims, and software stack, which can help us support you.

A wizard launches to help you through basic setup for a few commons scenarios. You can choose to exit the wizard by clicking **Dashboard**. (In the next sections of this QuickStart, we won’t use the wizard, but rather the regular Dashboard menus that can be used on an ongoing basis.)

You now have an org. You can create additional orgs at any time, and it's often useful to do so to support separate development environments.

<NextSectionLink/>

