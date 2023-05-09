---
title: Add user authentication and Okta Resource Management to your Go app
language: Go
integration: back-end
icon: code-go
meta:
  - name: description
    content: Learn about user authentication with Okta and update users, groups, and applications with the Okta Management SDK for Go.
---

## Get started with Go + Okta

These resources walk you through adding user authentication to your Go app in minutes.

<ul class='language-ctas'>
   <li>
      <a href='/docs/guides/sign-into-web-app-redirect/go/main/' class='Button--blueDarkOutline' data-proofer-ignore>
         <span>Sign users in quickstart</span>
      </a>
   </li>
   <li>
    <a href='/docs/guides/protect-your-api/go/main/' class='Button--blueDarkOutline' data-proofer-ignore>
      <span>Protect your API quickstart</span>
    </a>
  </li>
   <li>
      <a href='https://github.com/okta/samples-golang' class='Button--blueDarkOutline' data-proofer-ignore>
         <span>Sample app</span>
      </a>
   </li>
</ul>

## Integrate with Okta using the Okta-hosted Sign-In Widget

These SDKs help you integrate with Okta by redirecting to the Okta Sign-In Widget using OpenID Connect (OIDC) client libraries.

[Golang redirect authentication sample app](https://github.com/okta/samples-golang): See [Okta-hosted login](https://github.com/okta/samples-golang/tree/master/okta-hosted-login) for a redirect configuration.

## Integrate with Okta using embedded Sign-In Widget and SDKs

These SDKs help you integrate with Okta to build your own fully-branded authentication by embedding an Okta Sign-In Widget and/or SDK.

* [Okta Identity Engine Golang SDK](https://github.com/okta/okta-idx-golang)
* [Golang embedded authentication with SDK sample app](https://github.com/okta/samples-golang/tree/master/identity-engine/embedded-auth-with-sdk)
* [Golang embedded Sign-In Widget sample app](https://github.com/okta/samples-golang/tree/master/identity-engine/embedded-sign-in-widget)

## Other Classic Engine SDKs

* The [Okta Management SDK for Go](https://github.com/okta/okta-sdk-golang) can be used in your server-side code to create and update users, groups, applications, and more.
* [Okta JWT Verifier for Go](https://github.com/okta/okta-jwt-verifier-golang)

## Recommended Guides

Okta-hosted Sign-In Widget guide:

[Sign users in to your web app using the redirect model](/docs/guides/sign-into-web-app-redirect/go/main/)

Embedded SDK and Sign-In Widget sign-in guide:

[Get set up with Identity Engine sample apps and embedded use cases](/docs/guides/oie-embedded-common-org-setup/go/main/)

Other guides:

* [Protect your API endpoints](/docs/guides/protect-your-api/go/main/)
* [Implement the Authorization Code flow](/docs/guides/implement-grant-type/authcode/main/)
* [Add an identity provider (includes social login)](/docs/guides/identity-providers/)
* [Validate access tokens](/docs/guides/validate-access-tokens)
* [Validate ID tokens](/docs/guides/validate-id-tokens)

> **Note**: Browse our recent [Go Developer Blog posts](https://developer.okta.com/blog/tags/go/) for further useful topics.
