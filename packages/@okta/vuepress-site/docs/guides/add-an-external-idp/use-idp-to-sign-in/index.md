---
title: Use the Identity Provider to sign in
---
To test your authorization URL, enter the complete authorization URL in a browser. Do this in your browser's privacy or incognito mode to avoid false positive or negative results.

If everything is configured properly:

* The user is redirected to the Identity Provider's sign-in page.
* After successful authentication, the user is redirected to the redirect URI that you specified, along with an `#id_token=` fragment in the URL. The value of this parameter is your Okta OpenID Connect ID token. 

If something is configured incorrectly, the authorization response contains error information to help you resolve the issue.

> **Note:** With Sign In with Apple, when a user signs in, Apple offers the user the option to either share their email address or hide it. If the user chooses to hide their email address, Apple generates a random email address and sends that to Okta. However, Apple maintains the mapping between this random email address and the user's original email address. The user must choose the **Share My Email** option if you want to link the user's Apple account to an existing account in Okta. A user can choose this option only when the user is signing in with Apple to Okta for the first time.

There are four primary ways to kick off the sign-in flow.

## HTML Link

Create a link that the user clicks to sign in. The HREF for that link is the authorize URL that you created in the <GuideLink link="../create-authz-url">previous section</GuideLink>:

`<a href="https://${yourOktaDomain}/oauth2/v1/authorize?idp=0oaaq9pjc2ujmFZexample&client_id=GkGw4K49N4UEE1example&response_type=id_token&response_mode=fragment&scope=openid&redirect_uri=https%3A%2F%2FyourAppUrlHere.com%2F&state=WM6D&nonce=YsG76jo">Sign in with Identity Provider</a>`

After the user clicks the link, they are prompted to sign in with the Identity Provider. After successful sign in, the user is returned to the specified `redirect_uri` along with an ID token in JWT format.

## Okta Sign-in Widget

Okta also offers an easily embeddable JavaScript widget that reproduces the look and behavior of the standard Okta sign-in page. You can add a **Sign in with {IdentityProviderName}** button by adding the following code to your Okta Sign-in Widget configuration:

```js
config.idps= [
        {type: 'IdentityProviderName', id: 'Your_IDP_ID_Here'}
        ];
	config.idpDisplay ="SECONDARY";
```

You can find out more about the Okta Sign-in Widget [on GitHub](https://github.com/okta/okta-signin-widget#okta-sign-in-widget). Implementing sign in with an Identity Provider uses the Widget's [OpenID Connect authentication flow](https://github.com/okta/okta-signin-widget#openid-connect).

## Custom Okta-hosted Sign-in Page

If you configured a [Custom Okta-hosted Sign-in Page](/docs/guides/custom-hosted-signin/overview/), you can add a **Sign in with {IdentityProviderName}** button by adding the following code beneath the `var config = OktaUtil.getSignInWidgetConfig();` line:

```js
config.idps= [
        {type: 'IdentityProviderName', id: 'Your_IDP_ID_Here'}
        ]; 
	config.idpDisplay ="SECONDARY";
```

## AuthJS

If you don't want pre-built views, or need deeper levels of customization, then you can use the same AuthJS SDK that the Sign-in Widget is built with. For further information see [the AuthJS GitHub repo](https://github.com/okta/okta-auth-js#install). Implementing sign in with an Identity Provider uses the SDK's [OpenID Connect authentication flow](https://github.com/okta/okta-auth-js#openid-connect-options).

<NextSectionLink>Next steps</NextSectionLink>

