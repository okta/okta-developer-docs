---
title: Session management
meta:
  - name: description
    content: An overview of session management in Okta. Learn about sessions in Okta and what kind of session logout to implement.
---

## Session management with Okta

An Identity Provider (IdP) is a service that stores and manages digital identities. Okta is an IdP service that stores and verifies user identities, and is able to provide a user with a single set of sign-in credentials, allowing the user to access multiple applications. A session is a group of user interactions with a resource, such as a IdP service or an application (app), for a given amount of time. Using Okta as your IdP, there are two types of sessions that you need to consider for managing the user experience&mdash;the IdP session and the application session.

### IdP session

The IdP session is created by Okta after the user is authenticated using their credentials and various MFA options. Once authenticated, the user is able to access apps within the managed identity organization (org) using SSO, all within the scope of the IdP session. The session uses cookies to store user information to track and facilitate interactions between the user and the org. The IdP session is active until the user signs out of the org or when the session expires, based on the policies defined in the org.

### Application session

The application session (also known as a local session) is created by the app after the user is authenticated. This session uses cookies to store user app-specific information to track and facilitate interactions between the user and the app. The application session time frame depends on the nature of the app:
* for privileged access apps, such as an e-commerce site where users make payments, a shorter and restrictive session is required
* for non-privileged access apps, such as a catalog site where users browse listed items, the session can live longer and remain active even when the user navigates away, closes the browser tab or website, or closes the mobile app

Identity management admins and app developers need to collaborate on how to manage the IdP session with the application sessions to produce an optimal user experience with security, device, and app privileged access in mind. This implies balancing terminating sessions and redirecting the user to re-authenticate for security purposes, in concert with extending the session or silently re-authenticating with a new session for a frictionless user experience.

### Examples of logout experiences

#### Privileged access use case

For privileged access apps, such as an e-commerce payment app, securing sensitive user information is paramount and application sessions need to be tightly restricted. Application sessions are usually short lived and inactivity timeouts are in the minutes for these types of apps. Developers need to employ best practices and end sessions when they are no longer required. If the application session is terminated, the user must be redirected to the IdP to re-authenticate back into the app for a new session. If there is no active IdP session during the redirect, the user is prompted to sign in to the IdP and then using SSO to sign in to the app for a new session.

#### Non-privileged access use case

For non-privileged access apps, such as a loyalty program catalog, sessions can be active for a long period of time (even days) and app developers don't need to implement session timeouts to restrict access. This is especially true for mobile apps where you want your users to have a seamless and frictionless user experience. In this scenario, the application session can outlive the IdP session. Application sessions can still track user interactions without the IdP session. However, when the user signs out and ends the application session, without the IdP session, the user is redirected to the IdP sign-in page and must authenticate with the IdP to gain access to the app, as before.

### Terminating sessions

#### Local logout

Local logout is the act of signing the user out of the app and terminating the application session. The user IdP session is still active and other application sessions are not affected by terminating a specific local application session. This type of logout is managed by the app. If the user wants to access the app again, they are automatically authenticated through the active IdP session into the app and the app creates a new session for the user.

See [Sign users out of your app](/docs/guides/sign-users-out/-/sign-out-of-your-app/) for an example of a local logout implementation with Okta.

#### Single logout

Single logout is the act of signing the user out of the Okta IdP and ending the IdP session. Typically, the user is redirected to re-authenticate into Okta to start a new IdP session. Active application sessions for the user can still persist depending on the restrictive nature of the app. For non-privileged access apps, the user can still access the app within the scope of the application session. For example, a user can still browse through a catalog of vacation experiences and add to their cart. When this user is ready to checkout and make a payment, the app can enforce a privileged access workflow and redirect the user to re-authenticate with the IdP to secure an IdP session as well as an application session.

Apps within the Okta org can trigger a Single logout. See [Single Logout in applications](https://help.okta.com/en/prod/Content/Topics/Apps/Apps_Single_Logout.htm) for instructions on how to set up Single logout in Okta.

<!--Refer to [https://docs.google.com/document/d/1BzWqBlR5s-n9Y5ieoBzuOBybqI7fecnxkXxO_Qp5k-c/edit#heading=h.9uxt38ijqwh] for logout implementations with the Okta Identity Engine.-->

Explore [Okta sample apps](/docs/guides/quickstart/cli/register-app/#start-from-a-sample-app) for non-privileged access implementations of logout.
