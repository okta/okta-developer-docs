---
title: Add a sign-in form to your mobile app
meta:
 - name: Add a sign-in form to your mobile app
   content: Connect your mobile app to Okta and sign your users in and out.
   date-updated: January 23, 2026
   target persona: Developer
   level: Beginner
---

<Introduction>

You've built a mobile app to access your customer portal and want to add identity-related functionality, such as an admin area, user profiles, and more. Use the Okta Client SDK for a complete, native user experience. 
<Learn Section>
Learn about Okta
There are three key elements to enabling a mobile sign-in form with the Okta platform.


An Okta org is the hub for all configurations, users, and groups. It is created as part of your integrator account. (info)
Okta Identity Engine (OIE) is the core server that verifies your users' identities. (info)
The Okta Client SDKs for Swift and Android provide a clean development experience for native app developers. (info)
<Plan section>
Consider how your users will sign in when they access your portal before designing your sign-in form. Your Okta org comes with three preset authentication policies—password only, any one factor, and any two factors—and four basic authentication factors enabled—password, email, SMS, and voice. (info)

When you need to add a new authentication factor - passkeys or Okta Verify, for instance - or start building your own custom authentication policy, you do it all in the Okta Admin Console, with no coding necessary. (info)
<Build section>
Set up your account
Sign up for an Okta account, and set up your new Okta org to test web apps.

Get an Okta account (info)
Set up your org for basic testing (info)
Add a way for users to sign in
To keep it simple, Okta recommends starting the sign-in process when a user accesses your application (a "federation model"). The application itself will invoke the sign-in flow with all the necessary context. Using the application as a point of entry, the Okta Platform supports several ways (aka deployment models) to add a sign-in form to your portal.

Learn about the different sign-in form options (deployment models) (info)
Choose the deployment model that best suits your needs (info)
The Okta-hosted way
The simplest and Okta-recommended way to sign users into your portal is to redirect them to an Okta-hosted sign-in page. This page displays the Okta Sign-in Widget, which can be customized to reflect your brand.

Learn about the Okta Sign-in Widget (info)
Configure the Swift SDK for an Okta-hosted sign-in form (info)
Sign users into your mobile app by redirecting them to an Okta sign-in page (info)

Learn how to customize the Sign-in Widget to match your app's theme or your company's brand (info)
The self-hosted way
The alternative is to add a custom sign-in form to your app and use the Direct Authentication flow to connect to Okta and perform the sign-in. 

Learn about the Direct Authentication flow (info)
Sign users into your mobile app with a self-hosted sign-in page and the Mobile SDK (info)
Maintain A User Session
Once a user has signed in, Identity Engine sends your app a set of tokens to identify the user, grant them access to their profile and other resources, and keep them signed in if they spend too long away from the app.


Learn about tokens (the token lifecycle, and the different types of tokens) (info)
Secure your tokens and user credentials with the Mobile SDK (info)
Check for an existing session before asking a user to sign in (info)
Keep the user signed in beyond the session's expiry time (info) - ask Alex
Add a way for users to sign out
How a user signs out of an application and what happens next is just as important as how they sign in. What happens when they click the sign-out button? What will they see when they return to an application after their session has timed out?

Add a sign-out experience (info)
Test your sign-in and sign-out flows work
Remember to test your apps are sending the correct flows

Validate federation is working (info)
<Related Topics Section>
Congratulations—your mobile app now successfully signs users in and out. The basic functionality you have implemented so far can be expanded and customized in many ways.

Enable a user consent dialog for your app to access certain resources (info)
Sign users in with Facebook or another social login (info)
Change your existing IdP to Okta
Secure your sign-in flow further with proof of possession (info)
Secure authentication with a Push Notification to your iOS device (info)
Require further authentication to access specific areas of your portal
Use your mobile app as an authenticator for your web client app

Go deeper into the protocols underlying the sign-in processes

Learn about OAuth and OIDC (info)
Learn about Single Sign-on (info)
Learn about Single Logout

This journey is part of the Secure your Portal pathway, which also contains:

Apply your brand to the Okta UX
Migrate / import users into your org 
Work with multiple brands in one org
Upgrade your org to Okta Identity Engine

