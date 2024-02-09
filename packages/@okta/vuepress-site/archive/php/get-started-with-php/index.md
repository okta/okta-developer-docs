---
title: Add user authentication and Okta Resource Management to your PHP app
language: PHP
integration: back-end
icon: code-php
layout: Guides
meta:
  - name: description
    content: Use our PHP guide, SDK, and libraries to help you add user authentication to your PHP application.
  - name: robots
    content: noindex, nofollow
---

> **Info**: This topic was archived on February 9 2024 and is no longer updated. PHP is no longer a supported language at Okta.

## Get started with PHP + Okta

These resources walk you through adding user authentication to your PHP app in minutes.

<ul class='language-ctas'>
   <li>
      <a href='/archive/php/sign-into-web-app-redirect/' class='Button--blueDarkOutline' data-proofer-ignore>
         <span>Sign users in quickstart</span>
      </a>
   </li>
   <!-- <li>
    <a href='/archive/php/protect-your-api/' class='Button--blueDarkOutline' data-proofer-ignore>
      <span>Protect your API quickstart</span>
    </a>
  </li> -->
   <li>
      <a href='https://github.com/okta/samples-php' class='Button--blueDarkOutline' data-proofer-ignore>
         <span>Sample app</span>
      </a>
   </li>
</ul>

## Integrate with Okta using the Okta-hosted Sign-In Widget

These SDKs help you integrate with Okta by redirecting to the Okta Sign-In Widget using OpenID Connect (OIDC) client libraries.

[PHP redirect authentication sample app](https://github.com/okta/samples-php): See [Okta-hosted login](https://github.com/okta/samples-php/tree/develop/okta-hosted-login) for a redirect configuration.

## Okta Classic Engine PHP SDKs

* The [Okta PHP Management SDK](https://github.com/okta/okta-sdk-php) can be used in your server-side code to create and update users.
* [okta/sdk on Packagist](http://packagist.org/packages/okta/sdk)
* [Okta JWT Verifier for PHP](https://github.com/okta/okta-jwt-verifier-php)

## Recommended guides

Okta-hosted Sign-In Widget guide:

[Sign users in to your web app using the redirect model](/archive/php/sign-into-web-app-redirect/)

Other guides:

* [Implement the Authorization Code flow](/docs/guides/implement-grant-type/authcode/main/)
* [Add an identity provider (includes social login)](/docs/guides/identity-providers/)
* [Validate access tokens](/docs/guides/validate-access-tokens)
* [Validate ID tokens](/docs/guides/validate-id-tokens)
* [OAuth 2.0 from the Command Line](/blog/2018/07/16/oauth-2-command-line)

> **Note**: Browse our recent [PHP Developer Blog posts](https://developer.okta.com/blog/tags/php/) for further useful topics.
