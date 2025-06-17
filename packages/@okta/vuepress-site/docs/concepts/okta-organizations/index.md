---
title: Okta organizations
---

# Okta organizations

An Okta organization (org) is a root object and a container for all other Okta objects. It contains resources such as users, groups, and app integrations (apps), as well as policy and configurations for your Okta environment.

Within every org, there are users and apps. These are the only mandatory items that must be configured for your org to use Okta. Users can be created in Okta, imported through directory integrations, or imported through app integrations. Apps are connections to public apps (such as Office 365) or connections to proprietary apps (such as your own apps).

## Org URLs

Okta orgs are hosted on subdomains and each org is assigned a URL. The typical org URL is the tenant name (the subdomain), and then the domain name.

Example domain: `companyname.okta.com`

Example EMEA domain: `companyname.okta-emea.com`

Example preview/sandbox domain: `companyname.oktapreview.com`

You can customize your Okta org URL by replacing the Okta domain name with your own domain name. Using this feature aliases your Okta organization's domain name to another subdomain that you own, like `login.companyname.com`.

Each organization also has an administrator URL to sign in to the administrator console. The admin URL is the subdomain plus `-admin` (for example, `companyname-admin.okta.com`). If you’ve [customized your domain](/docs/guides/custom-url-domain/), access the Admin Console using your un-customized domain.

### Preview and production orgs

Preview orgs and production orgs are the two main types of Okta orgs.

Preview orgs allow you to see the next release early and explore the Beta features. Preview orgs include [Beta](https://developer.okta.com/docs/api/openapi/okta-management/guides/release-lifecycle/#beta) and [Early Access](https://developer.okta.com/docs/api/openapi/okta-management/guides/release-lifecycle/#early-access-ea) (EA) features by invitation or enabled through self-service. These orgs include all features that are [Generally Available](https://developer.okta.com/docs/api/openapi/okta-management/guides/release-lifecycle/#general-availability-ga) (GA) based on your purchase agreement.

Production orgs are always a stable release, covered by our software license agreement, and don't include [Beta](https://developer.okta.com/docs/api/openapi/okta-management/guides/release-lifecycle/#beta) features. Production orgs include EA features by request or enabled through self-service, and include features that are GA based on your purchase agreement.

> **Tip:** To verify which type of org you have, look at the footer of any page of your Okta Admin. Preview org footers have the word `Preview` in the cell name (for example: `OP1 Preview Cell (US)`) and include `oktapreview` as part of the org URL (for example: `companyname.oktapreview.com`). Production orgs don't have production indicators in their URLs or cells.

### Integrator Free Plan and Free Trial orgs

Okta offers two free org types for feature review, development, and testing:

* Free trial orgs: Intended for admin users, these orgs have a 30-day limit and require a business email. You can sign up at [Free Trial](https://www.okta.com/free-trial/workforce-identity/). For details on limits and configurations, see [Okta free trial](https://help.okta.com/oie/en-us/content/topics/miscellaneous/okta-free-trial.htm).

* Integrator free plan orgs: Designed for developers and integrators building authentication and authorization solutions with Okta. These orgs also require a business email and are available at [Okta Integrator Free Plan](https://developer.okta.com/signup/). For more information on limits and configurations, see [Okta Integrator Free Plan org configurations](/docs/reference/org-defaults/).

Integrator free plan orgs are also required for developers submitting to the Okta Integration Network (OIN). For more details, see the [Okta Integration Network](/docs/guides/okta-integration-network/).

> **Note:** Free trial orgs and Integrator Free Plan orgs use example URLs such as `trial-1234567.okta.com`.

## Admin Console

The Admin Console is where you go to manage your Okta org. The first page that you see when you sign in as an Okta admin is the **Dashboard** tab. This landing page provides a summary of activity in Okta and in your apps. The page also lists notifications of any problems or outstanding work that you need to complete. The Admin Console also provides you with quick access to your app configuration and API Access Management features.

## Cells

Each Okta org exists in a specific segment (or cell) of Okta's infrastructure. A cell is a conceptual grouping of Okta's public-facing services and UI for a subset of orgs. Cells are independent of each other and feature redundancy to ensure availability.

> **Tip:** You can locate the cell that your org belongs to by looking at the footer of any page of your Okta Admin.

* `OK`: represents a production cell
* `EU`: represents a European production cell
* `OP`: represents a preview cell

## Across orgs

Orgs are hard boundaries, so objects can't be shared across orgs. Orgs can be federated to allow users to sign in across organizations, but the users still exist in each org separately.

## Multiple orgs

Usually, your company or project has only one Okta organization. Single orgs provide a point of truth for the entire user base, a single integration point for apps, and have less complexity.

However, in more complex situations, you might need multiple orgs. For example, an organization has external, non-transient workers that require access to Active Directory (AD). The org also has some internal, transient workers who don't require access to AD. Their accounts are created directly in Okta, and they’re sent an activation email to set up their password. This activation email is the same email that external users receive if using a single org. This presents challenges around wording and the branding of the email template.

Multiple orgs allow for the complete segregation of internal and external users, and apps and changes made to the internal or external org have no impact on one another. However, multiple orgs add complexity in terms of the number of environments to manage. See [Multi-tenant solutions](/docs/concepts/multi-tenancy/).

## Org features

Okta orgs have different features depending on your contract.

A generally available (GA) feature is new or enhanced functionality that is enabled by default for all customers based on your purchase agreement. Features in GA are supported by Okta Customer Support, and issues are addressed according to your Customer Agreement with Okta.

Early Access (EA) features are opt-in features that you can try out in your org by asking Okta Support to enable them. Also, the **Features** page in the Admin Console (**Settings** > **Features**) allows Super Admins to enable and disable some self-service EA features themselves (assuming your org is eligible for the feature).

You can disable the EA features that you've enabled by clearing the associated checkboxes on the **Features** page. EA features that you disable are re-enabled by Okta automatically when the feature becomes GA.

## Rate limits

Rate limiting controls the number of API requests that can be sent to an organization in a given amount of time. Rate limits are enforced for every Okta org.

It’s used to protect resources from accidental overuse and intentional attacks. For example, accidental overuse might be where a client's script heavily calls our APIs. An intentional or malicious attack might be trying thousands of password combinations for a user or sending millions of requests to an Okta org to prevent the users of that org from using Okta.

See [Rate Limits](/docs/reference/rate-limits/) for more information on the endpoints and operations that are subject to rate limits and what the limits are for your Okta org.
