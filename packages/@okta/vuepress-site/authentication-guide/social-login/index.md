---
title: Social Login Overview
redirect_from:
  - /docs/api/resources/social_authentication
---

# Social Login

Okta allows your users to sign in to your app using credentials from external social login providers. Once the user has successfully authenticated, they are returned to your app, and their social profile information is pulled into your Okta directory.

Currently Okta supports the following social login providers:

- [Facebook](facebook)
- [Google](google)
- [LinkedIn](linkedin)
- [Microsoft](microsoft)

### Features

Configuring social login with Okta allows you to use the following features:

* **User Registration:** Capture the Profile attributes from a Social Identity Provider user and store those attributes in Okta's Universal Directory.

* **User Authentication:** After a user is registered, continue to use that Social Identity Provider for user authentication, thus eliminating the need to store an additional username and password for that user.

* **Social Profile Sync:** If a user updates their Social Profile, those changes can be reflected inside Okta the next time they use social login.

* **Support for Multiple Social Profiles** Multiple Social Profiles can all be linked to one Okta user.

* **OAuth 2.0 Scope Configuration:** Specify OAuth 2.0 scopes to fully control which Social Profile attributes are linked to Okta.

### The Social Login Process

The social login process starts at the [authentication endpoint](/docs/api/resources/oidc#authorize), then goes out to the provider and back:

1. The user who wishes to authenticate clicks a "Log in with x" link.
2. The user authenticates and is asked by the Provider to accept the permissions required by your app.
3. Once the user accepts the permissions, Okta handles the authentication and redirects the user back to your specified redirect URI.

![Social Login Flow width:](/assets/img/social_login_flow.png "Social Login Flow width:")

<!-- Source for image. Generated using http://www.plantuml.com/plantuml/uml/

@startuml
skinparam monochrome true

participant "Okta" as ok
participant "User Agent" as ua
participant "Social Identity Provider" as idp

ua -> ok: Get /oauth2/v1/authorize
ok -> ua: 302 to IdP's Authorize Endpoint + state
ua -> idp: GET IdP's Authorize Endpoint + state
ua <-> idp: User authenticates
idp -> ua: 302 to /oauth2/v1/authorize/callback + state  + code
ua -> ok: GET /oauth2/v1/authorize/callback + state  + code
ok -> ua: 302 to redirect_uri
@enduml
-->

Social authentication requests are canceled if not completed within fifteen minutes.

### The Set-up Process

To set up social login, configure the following:

1. An OAuth 2.0 client in your social provider
2. An Identity Provider in Okta
3. An OpenID Connect Application in Okta

Every Identity Provider in Okta is linked to an Application, and every time a user signs in with a Social Identity Provider for the first time, an Application User is created for them. The Application User represents the external user at the Social Identity Provider and can be used to map attributes to the Okta User. For more information about how to configure this behavior see [Social Identity Provider Settings](social-settings).
