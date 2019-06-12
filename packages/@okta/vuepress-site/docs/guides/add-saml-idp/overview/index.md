---
title: Overview
---

Okta supports authentication with an external SAML Identity Provider (IdP). The SAML IdP redirects you to Okta or your application, also called Inbound SAML. You can also include an OpenID Connect ID token with this redirect. Thus, you can use Okta to proxy between SAML-only Identity Providers and OpenID Connect-only applications that normally are incompatible.

The SAML flow is initiated with the Service Provider (SP), in this case Okta, who then redirects the user to the IdP for authentication. On successful authentication, a user is created inside Okta, and the user is redirected back to the URL you specified along with an ID token.

## Prerequisites

* A SAML IdP that supports SP-initiated SAML
* Settings for the SAML IdP which you'll specify in Okta
* An Okta org
* An Okta OpenID Connect client application in the Okta org. If you don't have one already, you can add a client app using [the OpenID Connect Application Wizard](https://help.okta.com/en/prev/Content/Topics/Apps/Apps_App_Integration_Wizard.htm).

<NextSectionLink/>
