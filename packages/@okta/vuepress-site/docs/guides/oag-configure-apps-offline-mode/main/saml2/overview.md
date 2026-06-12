When the connection to Okta is unavailable, users can still sign in through Access Gateway and access SAML apps. Access Gateway uses the authentication service to authenticate users against your offline directory and issues a SAML assertion to the SP. For background on SAML, see [Understanding SAML](/docs/concepts/saml/).

Configuring a SAML app involves establishing a mutual trust between Access Gateway, which acts as the IdP, and your client application, which acts as the SP. This is the typical flow when you configure a SAML app in Access Gateway:

1. You provide the SP's entity ID and certificate to Access Gateway when you create the app. See [Create the app](#create-the-app).
1. You define attributes to specify what user data Access Gateway includes in the SAML assertion it sends to the SP. See [Create attributes and configure the client app](#create-attributes-and-configure-the-client-app).
1. Access Gateway returns its own IdP metadata for you to configure in the SP. See [Configure your client app with Access Gateway IdP metadata](#configure-your-client-app-with-access-gateway-idp-metadata).

SAML apps in Access Gateway can only be created and configured using the Access Gateway API. You can view SAML apps in the Access Gateway UI console, but you can't add or edit them there.
