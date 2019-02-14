---
title: SAML Authentication with OIDC
redirect_from:
  - /docs/how-to/inbound-saml-with-oidc
---

# Authenticating Against an External SAML IdP

## Overview

Okta supports authentication with an external SAML Identity Provider (IdP). The SAML IdP redirects you to Okta or your application, also called Inbound SAML. You can also include an OpenID Connect ID token with this redirect. Thus, you can use Okta to proxy between SAML-only Identity Providers and OpenID Connect-only applications that normally are incompatible.

The SAML flow is initiated with the Service Provider (SP), in this case Okta, who then redirects the user to the IdP for authentication. On successful authentication, a user is created inside Okta, and the user is redirected back to the URL you specified along with an ID token.

## Prerequisites

* A SAML IdP that supports SP-initiated SAML
* Settings for the SAML IdP which you'll specify in Okta
* An Okta org
* An Okta OpenID Connect client application in the Okta org. If you don't have one already, you can add a client app using [the OpenID Connect Application Wizard](https://help.okta.com/en/prev/Content/Topics/Apps/Apps_App_Integration_Wizard.htm).

## Configuration Tasks

Perform the following two configuration tasks.

### Create and Configure the SAML IdP in Okta

The configuration information for an external IdP is stored in Okta. Create the external IdP and configure it from the Developer Console:

1. Hover over **Users** in the top navigation bar, and select **Social & Identity Providers**.
2. Select **Add Identity Provider** > **Add SAML 2.0 IdP**.
3. Fill in your SAML Identity Provider's settings. [Help](https://support.okta.com/help/Documentation/Knowledge_Article/40561903-Configuring-Inbound-SAML#Part1).

    > Hint: If you need a quick and easy SAML Identity Provider to use for testing purposes, you can try using <https://github.com/mcguinness/saml-idp>.
4. Save the IdP in Okta and note of the value at the end of the **Assertion Consumer Service URL** (ACS URL). The string after the last slash is the IdP's `id` value. For example: If your ACS URL is `https://{yourOktaDomain}/sso/saml2/0oab8rlfooi5Atqv60h7`, then your Okta IdP's `id` is `0oab8rlfooi5Atqv60h7`.

### Configure the OpenID Connect Client Application

Look in your Okta org for the OpenID Connect client app you identified or created in the Prerequisites section. Users that sign in for the first time are created in Okta and associated with this application.

1. Assign the app to everyone (the default on creation) or a particular group that you'd like your new SAML users to be associated with. If you want to change the default assignment from **Everyone**, modify the app assignment from the Developer Console:

    1. Select **Applications**.
    2. Select the application you wish to modify.
    3. Select **Assign** and choose  **Assign to Groups**.
    4. Search for the appropriate group name. If this app is already assigned to the group, the name doesn't appear in the search box.

2. Select **General** and copy the **Client ID** (`client_id`) of the application for use in the next step.

## Create the Authorization URL

In this step, create the authorization URL using the two elements you copied during configuration:

* The Okta SAML IdP `id` from your ACS URL
* The OpenID Connect client cpplication's client ID (`client_Id`)

Add these two values to an authorization URL to start the authentication flow.

For example:

`https://{yourOktaDomain}/oauth2/v1/authorize?idp=0oab8rlwfoo5Atqv60h7&client_id=0oab8om4bars6Y80Z0h7&response_type=id_token&response_mode=fragment&scope=openid&redirect_uri=http%3A%2F%2Flocalhost%3A8080&state=WM6D&nonce=YsG76j`

In this URL, replace `{yourOktaDomain}` with your org's base URL, and replace the following values:

* `idp`: the value of your SAML IdP's `id` from Step 1.
* `client_id`: the OpenID Connect client App's client ID (`client_id`) from Step 2.
* `redirect_uri`: the URL encoded redirect URI that you configured in your OpenID Connect application.
* `state` and `nonce`:  any value.

## Test the Authorization

To test your authorization, enter the complete authorization URL in a browser.
Do this in your browser's privacy or incognito mode to avoid false positive or negative results.

If everything has been configured properly:

1. The user is redirected to the IdP's sign-in page.
2. After successful authentication, the user is redirected to the redirect URI that you specified, along with an `#id_token=` fragment in the URL. The value of this parameter is your Okta OpenID Connect ID token.

If something is configured incorrectly, the authorization response contains error information to help you resolve the issue.

## For More Information

* [Understanding SP-initiated Login Flow](https://www.okta.com/integrate/documentation/saml/#understanding-sp-initiated-login-flow) explains the basics of SP-initiated login flows in Okta.
* [OAuth 2.0 Request parameters](/docs/api/resources/oidc#request-parameters-1) describes the parameters specified in Step 3.
