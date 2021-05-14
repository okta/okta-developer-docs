---
title: Session management
meta:
  - name: description
    content: An overview of session management in Okta. Learn about sessions in Okta and what kind of session sign out to implement.
---

## Session management with Okta

An Identity Provider (IdP) is a service that stores and manages digital identities. Okta is an IdP service that stores and verifies user identities. Okta provides a federated sign-in service so that a user can access multiple applications with a single set of sign-in credentials. A session is a group of user interactions with a resource, such as an IdP service or an application (app), for a given amount of time. When you use Okta as your IdP, there are two types of sessions that you need to consider for managing the user experience&mdash;the IdP session and the application session.

### IdP session

The IdP session is created by Okta after the user is authenticated using their credentials and various MFA options. After authentication, the user is able to access apps within the managed identity organization (org) by using SSO, all within the scope of the IdP session. The session uses cookies to store user information to track and facilitate interactions between the user and the org. The IdP session is active until the user signs out of the org or when the session expires, based on the policies defined in the org.

### Application session

The application session (also known as a local session) is created by the app after the user is authenticated. This session uses cookies to store user app-specific information to track and facilitate interactions between the user and the app. The application session time frame depends on the nature of the app:

* A shorter and restrictive session is required for privileged access apps, such as an e-commerce site where users make payments.
* A longer and less restrictive session is typical for non-privileged access apps, such as a catalog site where users browse listed items. The session for these apps can remain active even when the user navigates away, closes the browser tab or website, or closes the mobile app.

Identity management admins and app developers need to collaborate on how to manage the IdP session with the application sessions to produce an optimal user experience with security, device, and app privileged access in mind. This implies balancing terminating sessions and redirecting the user to re-authenticate for security purposes, combined with extending the session or silently re-authenticating with a new session for a frictionless user experience.

### Examples of sign out experiences

#### Privileged access use case

For privileged access apps, such as an e-commerce payment app, securing sensitive user information is paramount and application sessions need to be tightly restricted. Application sessions are usually short lived and inactivity timeouts are in the minutes for these types of apps. Developers need to employ best practices and end sessions when they are no longer required. If the application session is terminated, the user must be redirected to the IdP to re-authenticate back into the app for a new session. If there is no active IdP session during the redirect, the user is prompted to sign in to the IdP and then use SSO to sign in to the app for a new session.

#### Non-privileged access use case

For non-privileged access apps, such as a loyalty program catalog, sessions can be active for a long period of time (even days) and app developers don't need to implement session timeouts to restrict access. This is especially true for mobile apps where you want your users to have a seamless and frictionless user experience. In this scenario, the application session can outlive the IdP session. Application sessions can still track user interactions without the IdP session. However, when the user signs out and ends the application session, without the IdP session, the user is redirected to the IdP sign-in page and must authenticate with the IdP to gain access to the app, as before.

### Terminate sessions

#### Local logout

Local logout is the act of signing the user out of the app and terminating the application session. The user IdP session is still active and other application sessions aren't affected by terminating a specific local application session. Local logout is managed by the app. If the user wants to access the app again, they are automatically authenticated through the active IdP session into the app and the app creates a new session for the user.

See [Sign users out of your app](/docs/guides/sign-users-out/-/sign-out-of-your-app/) for a guide to implement local logout with Okta.

#### Single logout

Single logout in Okta is the act of signing the user out of the app and the Okta IdP, ending both the application session and the IdP session. Currently, Okta supports app-initiated single logout and not IdP-initiated single logout. The result is that other active application sessions for the user can still persist depending on the restrictive nature of the other apps. For non-privileged access apps, the user can still access the app within the scope of the application session. For example, a user can still browse through a catalog of vacation experiences and add to their cart. When this user is ready to check out and make a payment, the app can enforce a privileged access workflow and redirect the user to re-authenticate with Okta to secure an IdP session as well as an application session. For privileged access apps, the user is typically redirected to re-authenticate with Okta to start a new IdP session and an application session.

See [Sign users out of Okta](/docs/guides/sign-users-out/-/sign-out-of-okta/) for a guide to implement Okta sign out. For Okta Admin console app-initiated single logout configuration, see [Single Logout in applications](https://help.okta.com/en/prod/Content/Topics/Apps/Apps_Single_Logout.htm).

Explore [Okta sample apps](/docs/guides/quickstart/cli/register-app/#start-from-a-sample-app) for sample code with non-privileged access implementations.
