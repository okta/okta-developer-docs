---
title: Okta Organizations
---

# Okta Organizations
An Okta organization (org) is a root object and a container for all other Okta objects. It contains resources such as users, groups, and applications, as well as policy and configurations for your Okta environment.

Within every org, there are users and applications. These are the only mandatory items that must be configured for your org to use Okta. Users can be created in Okta, imported through directory integrations, or imported through application integrations. Applications are connections to public apps (such as Office 365) or proprietary applications (such as your own apps).

## Org URLs
Okta orgs host pages on subdomains and each org is assigned a URL. The typical org URL is the tenant name (the subdomain), and then the domain name.

**Example domain**
companyname.okta.com

**Example EMEA domain**
companyname.okta-emea.com

**Example preview/sandbox domain**
companyname.oktapreview.com

You can customize your Okta org URL by replacing the Okta domain name with your own domain name. Using this feature aliases your Okta organization's domain name to another subdomain that you own, like `login.companyname.com`.

Each organization also has an administrator URL to sign in to the administrator console. The admin URL is the subdomain plus `-admin` (for example, `companyname-admin.okta.com`). If you have [customized your org URL](/docs/guides/custom-url-domain/overview/), access the admin console using your un-customized URL.

## Administrator Console
The administrator console is where you go to manage your Okta org. The first page that you see when you sign in as an Okta admin is the Administrator Dashboard. The landing page provides a summary of activity in Okta and your apps. The page also lists notifications of any problems or outstanding work that you need to complete.

There are two views of the administrator console available in each org, the Classic UI and the Developer Console. The Developer Console provides you with quick access to your application configuration and API Access Management features. The Classic UI isn't developer-centric, so it presents all the menus and features in the original format. You can change between the Classic UI and the Developer Console using the drop-down menu in the upper-left corner of the page.

## Cells
Each Okta org exists in a specific segment (or "cell") of Okta's infrastructure. A cell is a conceptual grouping of Okta's public-facing services and UI for a subset of orgs. Cells are completely independent of each other, so failure in one cell doesn't affect a failure in another cell. You can locate which cell your org belongs in by looking at the footer of any page of your Okta administrator console.

* `OK` represents a production cell.
* `EU ` represents a European production cell.
* `OP` represents a preview cell.

## Across Orgs
Orgs are hard boundaries, so objects can't be shared across orgs. Orgs can be federated to allow users to sign in across organizations, but the users still exist in each org separately.

## Multiple Orgs
In most cases, your company or project has only one Okta organization. Single orgs provide a point of truth for the entire user base, a single integration point for applications, and have less complexity. 

However, in more complex situations, you might need multiple orgs. For example, an organization has external, non-transient workers that require access to Active Directory (AD). The org also has some internal, transient workers who don't require access to AD. Their accounts are created directly in Okta, and they are sent an activation email to set up their password. This activation email would be the same email that external users receive if using a single org. This presents challenges around wording and the branding of the email template. 

Multiple orgs allow for complete segregation of internal and external users, and applications and changes made to the internal or external org have no impact on one another. However, multiple orgs add complexity in terms of the number of environments to manage.

## Org Features
Okta orgs have different features depending on your contract.

A Generally Available (GA) feature is new or enhanced functionality that is enabled by default for all customers. Features in GA are supported by Okta Customer Support, and issues are addressed according to your Customer Agreement with Okta.

Early Access (EA) features are opt-in features that you can try out in your org by asking Okta Support to enable them. Additionally, the **Features** page in the Okta Admin Console (**Settings** > **Features**) allows Super Admins to enable and disable some EA features themselves (assuming your org is eligible for the feature). 

You can disable the EA features that you've enabled by deselecting them on the **Features** page. EA features that you disable are re-enabled by Okta automatically when the feature becomes GA.

> Note: You can track availability of EA features using the [Product Roadmap](https://support.okta.com/help/OktaProductRoadMap).

## Rate Limits
Rate limiting controls the number of API requests that can be sent to an organization in a given amount of time. Rate limits are enforced for every Okta org.

It is mainly used to protect resources from accidental overuse and intentional attacks. For example, accidental overuse might be where a client's script heavily calls our APIs. An intentional or malicious attack might be trying thousands of password combinations for a user or sending millions of requests to an Okta org to prevent the users of that org from using Okta. 

See [Rate Limits](/docs/reference/rate-limits/) for more information on the endpoints and operations that are subject to rate limits and what the limits are for your Okta org.