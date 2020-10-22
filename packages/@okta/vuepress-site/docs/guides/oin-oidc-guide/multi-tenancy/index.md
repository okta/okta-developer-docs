---
title: Multi-tenancy
---

Within the Okta framework, the concept of a ‘home’ or ‘tenant’ is instantiated as an Okta “org” -  In terms of creating a user store, handling connections, and mapping profile information from Okta to your application, the “org” is the home for all of the user identity and access management. To provide OIDC single sign-on for your application, your Okta org is what you will be using to authenticate your users.

Unlike the identity concept within Google Cloud products, where the user identity is established using their email address and that identity is globally unique across the entire identity namespace, in Okta the unique identity concept is specific to just within the tenant used to authenticate and authorize. Your application must be coded so that it is aware of what tenant is being used to authenticate that user.

For example, `alice.doe@example.com` may be a user in both the Company1 and Company2 tenants (hosted independently at `https://company1.example.com` and `https://company2.example.com`, respectively).

Your application needs to manage user credentials so that each combination of user+tenant is unique.

Okta orgs host their interfaces through individual subdomains and each org is assigned a separate URL. The typical org URL is the tenant name (the subdomain) followed by the domain name, however you can customize the domain name for your own domain and add individual aliases for each of your tenants. The process for specifying the variable app instance names in an OIDC application is explained in the [OIN Manager submission guide](https://developer.okta.com/docs/guides/submit-app/openidconnect/submission2-specific/).

<NextSectionLink/>
