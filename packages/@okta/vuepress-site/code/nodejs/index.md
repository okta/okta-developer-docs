---
title: Add user authentication to your Node.js Express app
language: Node.js
integration: back-end
icon: code-nodejs
meta:
  - name: description
    content: Use our Node.js guide to add authentication to your app and our Node.js SDK to create and update users and groups.
---

## Get started with Node.js Express + Okta

These resources walk you through adding user authentication to your Node.js Express app in minutes.

<ul class='language-ctas'>
   <li>
      <a href='/docs/guides/sign-into-web-app-redirect/node-express/main/' class='Button--blueDarkOutline' data-proofer-ignore>
         <span>Sign users in quickstart</span>
      </a>
   </li>
   <li>
        <a href='/docs/guides/protect-your-api/nodeexpress/main/' class='Button--blueDarkOutline' data-proofer-ignore>
            <span>Protect your API quickstart</span>
        </a>
  </li>
   <li>
      <a href='https://github.com/okta/samples-nodejs-express-4' class='Button--blueDarkOutline' data-proofer-ignore>
         <span>Sample app</span>
      </a>
   </li>
</ul>

## Integrate with Okta using the Okta-hosted Sign-In Widget

These SDKs help you integrate with Okta by redirecting to the Okta Sign-In Widget using OpenID Connect (OIDC) client libraries.

[Express JS redirect authentication sample app](https://github.com/okta/samples-nodejs-express-4): See [Okta-hosted login](https://github.com/okta/samples-nodejs-express-4/tree/master/okta-hosted-login) for a redirect configuration.

## Integrate with Okta using embedded Sign-In Widget and SDKs

These SDKs help you integrate with Okta to build your own fully-branded authentication by embedding an Okta Sign-In Widget and/or SDK.

* [Okta JavaScript SDK](https://github.com/okta/okta-auth-js): See the [Okta Identity Engine README](https://github.com/okta/okta-auth-js/blob/master/docs/idx.md) for the Identity Engine specific instructions.
* [Express JS embedded authentication with SDK sample app](https://github.com/okta/okta-auth-js/tree/master/samples/generated/express-embedded-auth-with-sdk)
* [Express JS embedded Sign-In Widget sample app](https://github.com/okta/okta-auth-js/tree/master/samples/generated/express-embedded-sign-in-widget)

## Okta Classic Engine Node.js SDKs

* The [Okta Node.js SDK](https://github.com/okta/okta-sdk-nodejs) can be used in your server-side code to create and update users and groups.
* [okta-sdk-nodejs on npm](https://www.npmjs.com/package/@okta/okta-sdk-nodejs)
* [Node.js SDK reference (JSDoc)](https://developer.okta.com/okta-sdk-nodejs/jsdocs/)
* [Okta JWT Verifier for Node.js](https://github.com/okta/okta-jwt-verifier-js)
* [Okta OIDC Middleware for Node.js](https://github.com/okta/okta-oidc-middleware)

## Recommended guides

Okta-hosted Sign-In Widget guide:

[Sign users in to your web app using the redirect model](/docs/guides/sign-into-web-app-redirect/node-express/main/)

Embedded SDK and Sign-In Widget sign-in guide:

[Get set up with Identity Engine sample apps and embedded use cases](/docs/guides/oie-embedded-common-org-setup/nodejs/main/)

Other guides:

* [Protect your API endpoints](/docs/guides/protect-your-api/nodeexpress/main/)
* [Implement the Authorization Code flow](/docs/guides/implement-grant-type/authcode/main/)
* [Add an identity provider (includes social login)](/docs/guides/identity-providers/)
* [Validate access tokens](/docs/guides/validate-access-tokens)
* [Validate ID tokens](/docs/guides/validate-id-tokens)

> **Note**: Browse our recent [Node.js Developer Blog posts](https://developer.okta.com/blog/tags/node/) for further useful topics.