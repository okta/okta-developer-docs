---
title: Create Access Policies
---

Access policies are containers for rules. Each access policy applies to a particular OpenID Connect application, and the rules it contains define different access and refresh token lifetimes depending on the nature of the token request.

1. In the administration UI, navigate to **API > Authorization Servers**.
2. Choose the name of an Authorization Server.
3. Choose **Access Policies > Add Policy**
![Add Access Policy width:](/img/access_policy1.png "Add Access Policy width:")
4. Provide the requested information:
    * **Name**
    * **Description**
    * Assign to **All clients**, or select **The following clients:** and enter the name of the Okta OpenID Connect applications covered by this access policy. This field will auto-complete the names of your OpenID Connect applications as you type.
![Access Policy Configuration width:](/img/access_policy2.png "Access Policy Configuration width:")

While in the Access Policy list, you can:
* Set access policies to be active or deactivate them for testing or debugging purposes.
* Reorder any policies you create using drag-n-drop.
![Access Policy List width:](/img/access_policy3.png "Access Policy List width:")

Polices are evaluated in priority order, as are the rules in a policy.
The first policy and rule that matches the client request is applied and no further rule or policy processing occurs. If a client matches no policies, the authentication attempt will fail and an error will be returned.

<NextSectionLink/>