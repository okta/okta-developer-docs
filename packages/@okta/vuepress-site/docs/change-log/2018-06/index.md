---
title: Okta API Products Change Log
---

## 2018.06

### Feature Enhancements

| Feature Enhancement        | Expected in Preview Orgs | Expected in Production Orgs |
|:------------------------------------|:------------------------------------|:---------------------------------------|
| [API Access Management is Generally Available in Preview](#api-access-management-is-generally-available-in-preview) | February 7, 2018               | starting March 12, 2018                  |
| [New Administrator Role for API Access Management](#new-administrator-role-for-api-access-management) | February 7, 2018 | starting February 12, 2018 |
| [New and Changed Messages for the System Log](#new-and-changed-messages-for-the-system-log) | February 7, 2018 | starting February 12, 2018 |

#### API Access Management is Generally Available in Preview

Secure your APIs with API Access Management, Okta's implementation of the OAuth 2.0 authorization framework. API Access Management uses the Okta Identity platform to enable powerful control over access to your APIs. API Access Management can be controlled through the administrator UI as well as a rich set of APIs for client, user, and policy management.

For more information, see [OAuth 2.0 and Okta](/docs/api/resources/oidc). <!--OKTA-153127-->

#### New Administrator Role for API Access Management

If you have API Access Management enabled, you can use a dedicated administrator's role for API Access Management: the **API Access Management Admin** role. Use this role to manage custom authorization servers and related tasks:

* Create and edit authorization servers, scopes, custom claims, and access policies
* Create and edit  OAuth 2.0 and OpenID Connect client apps
* Assign users and groups to OAuth 2.0 and OpenID Connect client apps

To change the role assigned to a user, use [the Administrator Roles API](/docs/api/resources/roles) or visit **Security > Administrators** in the administrator UI. <!--OKTA-107617-->

#### New and Changed Messages for the System Log

We've added a new message and improved an existing one in the System Log (`/api/v1/logs`):

* A message is now written to the System Log when password credentials fail. Previously this message was written only to `/api/v1/events`. <!--OKTA-153603-->
* The System Log message `policy.rule.deactivated` specifies in the Debug Context when the cause of a rule being disabled is that all the network zones for that rule have been deleted. <!-- OKTA-156445 -->

### Bug Fixed

The following bug has been fixed and is expected in preview orgs February 7, 2018 and production orgs starting February 12, 2018.

* A spurious `next` link from the response headers was returned by a policy get operation (`GET {url}
/api/v1/policies`). (OKTA-152522)
