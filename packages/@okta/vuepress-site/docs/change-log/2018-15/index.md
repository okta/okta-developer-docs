---
title: Okta API Products Change Log
---

## 2018.15

| Change | Expected in Preview Orgs | Rollout to Production Orgs Expected to Start |
| :---------- | :--------------------------------- | :----------------------------------------------------------- |
| [Enhanced Feature: API Support for Assigning App Instance to App Admins](#enhanced-feature-api-support-for-assigning-app-instance-to-app-admins) | April 11, 2018 | April 15, 2018 |
| [Bug Fixed in 2018.15](#bug-fixed-in-201815) | April 11, 2018 | April 16, 2018 |
| [Previously Released Early Access Features 2018.15 Update](#previously-released-early-access-features-201815-update) | Available now | Available now |

### Enhanced Feature: API Support for Assigning App Instance to App Admins

You can add an app instance target to an `APP_ADMIN` role assignment via the API. Previously an app instance target could be added to the role assignment using the Okta administrators UI only.

When you assign an app instance target to this role assignment, the scope of the role assignment changes from all app targets to just the specified target. Thus you can use this feature to create different `APP_ADMIN` role assignments for different apps in your org.

For details, visit the [Roles API documentation](/docs/api/resources/roles#add-app-target-to-app-administrator-role). <!-- OKTA-164900 -->

### Bug Fixed in 2018.15

This fix applies if the MFA soft lock for delegated authentication feature is enabled. When a user made multiple failed MFA attempts and was locked out, the user `status` was updated to `ACTIVE` instead of the correct value, `LOCKED_OUT`. (OKTA-164900)

### Previously Released Early Access Features 2018.15 Update

The following features have already been released as Early Access. To enable them, contact [Support](https://support.okta.com/help/open_case).

| Early Access Features Available Now
| :------------------------------------------------- |
| [Linked Objects API Is in Early Access (EA)](#linked-objects-api-in-early-access-ea) |
| [Token Management API Is in Early Access (EA)](#token-management-api-is-in-early-access-ea) |
| [System Log API Is in Early Access (EA)](#system-log-api-is-in-early-access-ea) |
| [User Consent for OAuth 2.0 and OpenID Connect Flows is in Early Access (EA)](#user-consent-for-oauth-20-and-openid-connect-flows-in-early-availability-ea) |
