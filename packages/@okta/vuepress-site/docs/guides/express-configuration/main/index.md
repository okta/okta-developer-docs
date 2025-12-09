---
title: Express Configuration overview
excerpt: Learn how Express Configuration automates the setup of SSO for Auth0-enabled OIDC integrations and SCIM integrations, its benefits, and guidance on enabling this feature.
---
<ApiLifecycle access="ie" />

# Express Configuration

Express Configuration is a feature designed to automate the setup of SSO and SCIM for instances of Auth0-enabled OIN SaaS integrations. You can use this feature to configure OIDC and SCIM integrations. It eliminates the need to copy and paste configuration values between Okta and Auth0-enabled apps.

**Notes**:

* Express Configuration is available for OIDC and SCIM integrations that use Auth0 as the Service Provider. This feature isn't available for apps that aren't Auth0-enabled.
* Express Configuration is available for OIN apps that support SSO (SAML and OIDC, or OIDC only) and SCIM.
* Okta admins can use Express Configuration to add instances of OIDC and SCIM integrations that are published in the OIN. To submit the app to the OIN catalog, see [Publish an OIN integration](https://developer.okta.com/docs/guides/submit-app-overview/).
* Express Configuration doesn't support apps with the login flow set to **Prompt with Credentials**.
* Ensure that your app is configured to pass the correct org to your Auth0 tenant, when the login flow is set to **No Prompt**.

To enable the Express Configuration feature, email to the Okta Express Configuration team at [expressconfig@okta.com](mailto:expressconfig@okta.com) with the following information:

* Your Okta Integrator Free Plan org
* The name of your app in the OIN
* Your Auth0 App client ID
* Auth0 tenant domain (include the custom domain, if applicable)

After confirming your app's eligibility, the Okta Express Configuration team provides a public key in PEM format. This key is required to enable Express Configuration.

For detailed setup and enablement instructions for Express Configuration, see the [Auth0 documentation portal](https://auth0.com/docs/authenticate/identity-providers/enterprise-identity-providers/okta/express-configuration).

## Benefits

Express Configuration allows an Okta admin to automate the setup of an OIN OIDC instance integration. This leads to faster, secure, and scalable SaaS deployments:

* **Faster configuration**: Reduces time required to set up an instance of OIN OIDC integration by automating the exchange of configuration information between Okta and Auth0. It supports OIDC capabilities through a single control panel, significantly speeding up the overall configuration process for OIN OIDC integration instances.
* **Secure data handling**: Uses OAuth 2.0 consent flows for secure and authorized sharing of sensitive configuration data. This approach also reduces potential errors related to credentials and configuration settings.
* **Scalable solution**: Simplifies and standardizes the integration deployment process, which makes it more scalable. The automated workflow allows for consistent and repeatable deployments of OIN OIDC integrations across multiple customers or environments, supporting a scalable app ecosystem.
* **Improved configuration experience**: Provides an intuitive and efficient configuration experience. The automation removes the complexity of manual setup, which allows Okta customer admins to quickly add instances of Auth0-enabled OIN integrations.
