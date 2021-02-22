---
title: Create access policies
---

Access policies are containers for rules. Each [access policy](/docs/guides/configure-access-policy/overview/) applies to a particular OpenID Connect application, and the rules that it contains define different access and refresh token lifetimes depending on the nature of the token request.

1. From the Admin Console side navigation, select **Security** and then **API**.
1. From the **Authorization Servers** tab, select the name of an authorization server.
1. Select **Access Policies**, and then **Add Policy**.
1. Enter a **Name** and a **Description** for the policy.
1. Assign the policy to **All clients** or select **The following clients:** and enter the name of the Okta OpenID Connect applications that are covered by this access policy. This field auto-completes the names of your OpenID Connect applications as you type.
1. Click **Create Policy** when you finish.

Policies are evaluated in priority order, as are the rules in a policy.
The first policy and rule that matches the client request is applied and no further rule or policy processing occurs. If a client matches no policies, the authentication attempt fails and an error is returned.

> **Note:** If you need to change the order of your policies, reorder the policies using drag and drop.

<NextSectionLink/>
