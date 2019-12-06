---
title: Add a Groups claim
---
You can add a Groups claim to ID tokens for any combination of App Groups and User Groups to perform single sign-on (SSO) using the Okta Org Authorization Server. You can also add a Groups claim to ID tokens and access tokens to perform authentication and authorization using the Custom Authorization Server.

Additionally, you can create a dynamic or static whitelist when you need to set group whitelists on a per-application basis using both the Org Authorization Server and a Custom Authorization Server. For example, you have a large number of Groups and every time a group claim is created, you don't want to run through all of your Groups if only 20 Groups apply to your app. This process optionally uses Okta's flexible app profile, which accepts any JSON-compliant content, to create a whitelist of Groups that can then easily be referenced.

There are several ways to add a Groups claim with Okta:

* <GuideLink link="../add-groups-claim-org-as">Add a Groups claim for the Org Authorization Server</GuideLink>
* <GuideLink link="../add-groups-claim-dynamic">Add a Groups claim with a dynamic whitelist</GuideLink>
* <GuideLink link="../static-whitelist">Add a Groups claim with a static whitelist</GuideLink>

<NextSectionLink/>
