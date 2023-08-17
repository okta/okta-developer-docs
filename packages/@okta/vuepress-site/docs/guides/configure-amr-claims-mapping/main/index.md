---
title: Configure AMR claims mapping
excerpt: Learn how to configure an OpenID Connect Identity Provider to send AMR claims during SSO to your org
layout: Guides
---

<ApiLifecycle access="ea" />

This guide explains how to configure an OpenID Connect Identity Provider to send Authentication Method Reference (AMR) claims during Single Sign-On (SSO) to your org.

---

**Learning outcomes**

* Know the purpose of AMR claims
* Configure your OpenId Connect Identity Provider (IdP) to send AMR claims during Single Sign-On (SSO)

**What you need**

* [Okta Developer Edition organization](https://developer.okta.com/signup)
* An existing OpenID Connect Identity Provider (IdP) that’s able to send AMR claims to Okta. This can be another Okta org (org2org) or a third party IdP.
* The IdP AMR Claims Mapping feature enabled for your org. From the left navigation pane in the Admin Console, go to **Settings** > **Features**, locate **Trust AMR claims from external IdPs** and enable.

---

## Overview

Authentication Method Reference (AMR) claims mapping allows an admin to configure their Okta org to accept AMR claims from OpenID Connect IdPs during SSO. Mapping AMR claims from third-party IdPs allows Okta to interpret the authentication context from an IdP. This helps eliminate duplicate factor challenges during user authentication.

AMR claims provide important context to Okta during policy evaluation. For example, AMR claims give Okta a better understanding of which factors were used by the external IdP to verify the user's identity. This creates a more seamless and secure user experience, reduces friction, and boosts productivity.

## AMR claims mapping flow

<div class="three-quarter">

![Flow diagram that displays the back and forth between the user, user agent, authorization server, and the identity provider](/img/auth/step-up-authentication-acr-flow.png)

</div>

1. A user attempts to sign in to an OpenID Connect app through the browser (user agent).
2. The browser redirects the user to the Okta `/authorize` endpoint to authenticate.
3. Okta redirects the user to the external Identity Provider.
4. The Identity Provider authenticates the user.
5. The Identity Provider redirects the user to Okta. The Identity Provider response contains the supported AMR claims, for example: `sms`, `mfa`, and `pwd`.

    Note: The AMR claims are stored in an Okta session and considered during policy evaluation.

6. Okta redirects the user to the browser. The user isn't challenged for MFA if the policy requirements are met by the factors used by the Identity Provider.
7. The browser sends a request to the Okta `/token` endpoint.
8. Okta responds with the access token and the AMR claims in the ID token.
Configure the IdP for AMR claims
Before you configure Okta to accept AMR claims, it’s important to first configure the IdP to send the claims correctly. Every IdP is different. Okta expects the IdP to pass the AMR claims in a very specific way, depending on the supported federation protocol. 
SAML Identity Provider
At the SAML IdP, edit the attribute statement of the client application that you use for authenticating and authorizing your users.

Example SAML2 attribute statement

```xml
<saml2:AttributeStatement xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion">
  <saml2:Attribute Name="session.amr" NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified">
	<saml2:AttributeValue xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="xs:string">sms</saml2:AttributeValue>
	<saml2:AttributeValue xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="xs:string">mfa</saml2:AttributeValue>
	<saml2:AttributeValue xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="xs:string">pwd</saml2:AttributeValue>
  </saml2:Attribute>
</saml2:AttributeStatement>
```

Add an attribute statement called `session.amr`. This allows Okta to accept Authentication Method Reference (AMR) claims sent in the SAML IdP response.
Make sure that the `NameFormat` value is `unspecified`.

```xml
<saml2:Attribute Name="session.amr"     NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified">
```
Add each claim as an attribute value data type of `xs:string`.

```xml
<saml2:AttributeValue xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="xs:string">sms</saml2:AttributeValue>
```
OpenID Connect Identity Provider
At the OpenID Connect IdP, verify that the client app that you use for authenticating and authorizing users sends an `amr` array with the AMR claims in the OpenID Connect ID token (`id_token`).

The `amr` property is a JSON array of strings that are identifiers for [authentication methods](https://www.rfc-editor.org/rfc/rfc8176.html) used in the authentication. Supported values include "pwd", "mfa", "otp", "kba", "sms", "swk", and "hwk".

Example ID token with AMR claims

```json
{
  "ver": 1,
  "sub": "00uid4BxXw6I6TV4m0g3",
  "iss": "https://{yourOktaDomain}",
  "aud": "uAaunofWkaDJxukCFeBx",
  "iat": 1449624026,
  "exp": 1449627626,
  "amr": [
    "sms",
    "mfa",
    "pwd"
  ],
  "jti": "ID.4eAWJOCMB3SX8XewDfVR",
  "auth_time": 1449624026,
  "at_hash": "cpqKfdQA5eH891Ff5oJr_Q",
  "name" :"John Doe",
  "nickname":"Jimmy",
  "preferred_username": "john.doe@example.com",
  "updated_at":1311280970,
  "email":"john.doe@example.com",
  "email_verified":true,
  "address" : { "street_address": "123 Hollywood Blvd.",
      "locality": "Los Angeles",
      "region": "CA",
      "postal_code": "90210",
      "country": "US"
    },
  "phone_number":"+1 (425) 555-1212"
}
```
Okta-to-Okta
Okta-to-Okta (org2org), also known as hub and spoke, refers to a deployment model where the IdP and Service Provider (SP) are both Okta orgs. Use the [Add an External Identity Provider guide for Okta-to-Okta](/docs/guides/add-an-external-idp/oktatookta/main/) to configure your Okta-to-Okta orgs for AMR claims mapping.
Custom OpenID Connect apps
If you are using a custom OpenID Connect app in the Okta IdP org, `amr` claims are sent to the SP by default and no additional configuration is required. 
Custom SAML apps
You must configure a custom attribute statement for custom SAML apps and Okta Org2Org SAML apps from the OIN. Configure the app’s attribute statement to send the `session.amr` attribute.

Add an Attribute Statement to the app integration called session.amr and give it a value of session.amr. You can add the statement when you create a new app integration or when you edit an existing app integration. The following steps assume that you already have a custom SAML app or Okta Org2Org SAML app from the OIN.
Custom SAML
Open your custom SAML app and on the **General** tab, click **Edit** in the **SAML Settings** section.
Click **Next** and on the Configure SAML page and locate the **Attribute Statements (optional)** section.
Enter `session.amr` as the attribute statement **Name**.
Leave the default value for **Name format**.
Enter `session.amr` as the **Value**, click **Next**, and then **Finish**.
Okta Org2Org SAML
Open your Okta Org2Org SAML app and click the **Sign-On** tab.
Click **Edit** in the **Settings** section in the **SAML 2.0** section, expand **Attributes (Optional)**.
Enter `session.amr` as the attribute statement **Name**.
Leave **Unspecified** for **Name format**.
Enter `session.amr` as the **Value**, and then click **Save**.
Configure Okta
To configure an Okta org to receive AMR claims from an external IdP is similar across all IdP types. When you create an IdP in Okta, select Trust AMR claims from this identity provider to have Okta evaluate that AMR claims sent in the IdP response meet sign-on policy requirements.

Use one of the following enterprise Identity Provider guides to configure an external IdP:

OpenID Connect
SAML 2.0
Okta-to-Okta

> **Note:** Ensure that the IdP includes the correct AMR claims in the IdP response and that the claims match the requirements of your sign-on policies. If the claims don't satisfy the requirements, then users can't sign in to the application.
Troubleshoot
An **Access denied** error is caused by one of the following:
Improper policy configuration
Improperly formatted attribute/claim from the IdP
Improperly configured IdP (the IdP didn’t challenge a factor that’s required by the sign-on policy.) 
Limitations
Okta doesn’t pass auth requirements to the IdP.
Okta isn’t able to remediate when the IdP isn’t able to challenge the user for the required factors.

