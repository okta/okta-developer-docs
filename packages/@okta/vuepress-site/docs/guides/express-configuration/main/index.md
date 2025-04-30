---
title: Express Configuration overview
excerpt: An overview of Express Configuration.
---
<ApiLifecycle access="ie" />

# Express Configuration

Express Configuration lets enterprise customers quickly add an instance of Auth0-enabled OIDC apps published in the Okta Integration Network (OIN) catalog to their Okta org. This process uses automated data sharing between Okta and Auth0, reducing manual steps and minimizing errors when sharing configuration information.

**Notes**:

* Express Configuration is available only for OIDC integrations that use Auth0 as the Service Provider. This feature isn't available for apps that aren't powered by Auth0.
* Express Configuration supports OIN apps use only SSO (SAML and OIDC, or OIDC only). Any apps that support SCIM aren't eligible currently.
* Okta admins can use Express Configuration to add instances of integrations that are published in the OIN. To submit the app to the OIN catalog, see [Publish an OIN integration](https://developer.okta.com/docs/guides/submit-app-overview/)
* Express Configuration doesn't support apps with the Login Flow set to **Prompt with Credentials**.
* If the Login Flow is set to **No Prompt**, ensure that your app is configured to pass the correct org to your Auth0 tenant.

To enable the Express Configuration feature, contact the Okta Express Configuration team by emailing them at [expressconfig@okta.com](mailto:expressconfig@okta.com) and provide the following information:

* Okta Developer Edition org
* Your app name in the OIN
* Auth0 tenant domain (include the custom domain, if applicable)

After confirming your app's eligibility, the Okta Express Configuration team provides a public key in PEM format. This key is required to enable Express Configuration. Follow the steps in [Enable Express Configuration](/docs/guides/enable-express-configuration/main/) after receiving the public key.

## Benefits

Express Configuration allows Okta admin to automate the setup of an instance of OIN OIDC integration, leading to faster, more secure, and scalable SaaS deployment:

* **Faster configuration**: Reduces time required to set up an instance of OIN OIDC integration by automating the exchange of configuration information between Okta and Auth0. It supports OIDC capabilities through a single control panel, significantly speeding up the overall configuration process for OIN OIDC integration instances.
* **Secure data handling**: Uses OAuth 2.0 consent flows for secure and authorized sharing of sensitive configuration data. This approach ensures secure and authorized data sharing and reduces potential errors related to credentials and configuration settings.
* **Scalable solution**: Simplifies and standardizes the integration deployment process, which makes it more scalable. The automated workflow allows for consistent and repeatable deployments of OIN OIDC integrations across multiple customers or environments, supporting a scalable app ecosystem.
* **Improved configuration experience**: Provides an intuitive and efficient configuration experience. The automation removes the complexity of manual setup, which allows Okta customer admins to quickly add instances of Auth0-enabled OIN integrations.
