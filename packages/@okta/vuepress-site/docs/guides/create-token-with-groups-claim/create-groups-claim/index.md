---
title: Add a groups claim
---
You can add a groups claim to ID tokens for any combination of application groups and user groups to perform single sign-on (SSO) using the Okta Org Authorization Server. You can also add a groups claim to ID tokens and access tokens to perform authentication and authorization using the Custom Authorization Server.

Additionally, you can create a dynamic or static whitelist when you need to set group whitelists on a per-application basis using both the Org Authorization Server and a Custom Authorization Server. For example, you have a large number of groups and every time a group claim is created, you don't want to run through all of your groups if only 20 groups apply to your app. This process optionally uses Okta's flexible app profile, which accepts any JSON-compliant content, to create a whitelist of groups that can then easily be referenced.

There are several ways to add a groups claim with Okta:

* <GuideLink link="../add-groups-claim-org-as">Add a groups claim for the Org Authorization Server</GuideLink>
* <GuideLink link="../add-groups-claim-dynamic">Add a groups claim using a dynamic whitelist</GuideLink>
* <GuideLink link="../static-whitelist">Add a groups claim using a static whitelist</GuideLink>

<NextSectionLink/>
