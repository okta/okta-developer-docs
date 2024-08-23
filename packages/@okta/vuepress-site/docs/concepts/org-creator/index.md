---
title: Okta org creator
---
## Org creator

> **Note:** You need to have the **Platform - Multi-org Deployment** product to enable the **Org Creator API** feature. Contact your Okta account team to enable this feature.

The Okta **Platform - Multi-org Deployment** product allows you to create orgs from your existing org (known as a parent org) using the Org Creator API. Orgs created through Org Creator API requests on the parent org are child orgs of that parent org. Feature changes made to the parent org are pushed to the child org. Features enabled on a child org aren’t pushed to the parent or any sibling orgs.

<div class="three-quarter">

![Org Creator Feature Push flow](/img/concepts/OrgCreatorFeaturePush.png)

</div>

There are three levels of Okta org configurations.

- **Products:** Okta-determined sets of features that correspond to an Okta product offering. Example products include SSO, AMFA, LCM. Products aren't pushed from parent to child org. Products are purchased and can't be configured.

- **Features:** Distinct pieces of functionality. Features are bundled within products but may also be offered separately, for example, Early Access features. Most features are pushed from parent to child org.

- **Okta Objects:** The policies, settings, apps, and groups that you can configure using either the Admin Console or the Okta objects in the API reference. Configured Okta objects aren't pushed from parent to child org.

> **Note:** Some features, such as Workflows, aren't pushed from parent to child orgs.

### Org Creator API

You need the following requirements before you use the Org Creator API:

 - A parent org that has all the products and features for the child orgs that you want to create
- A dedicated service account with super admin privileges in your parent org to create child orgs. Okta recommends that you have more than one admin account with super admin privileges.
- Access to the Org Creator API from your service account (using either an OAuth 2.0 bearer or API token)

See the [Org Creator API](https://preview.redoc.ly/oktadev/tbs-okta-639083-org-creator-api/openapi/okta-management/management/tag/OrgCreation/).