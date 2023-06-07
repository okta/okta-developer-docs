---
title: Add user authentication and Okta Resource Management to your Java app
language: Java
integration: back-end
icon: code-java
meta:
  - name: description
    content: Read our guide to add user authentication to your Java app and see related guides to help complete your project.
---

<ul class='language-tabs'>
   <li>
      <RouterLink to='/code/java/'>
         <i class='icon code-java-32'></i><span>Java</span>
      </RouterLink>
   </li>
   <li >
      <RouterLink to='/code/java/spring/'>
         <i class='icon code-spring-32'></i><span>Spring</span>
      </RouterLink>
   </li>
</ul>

## Get started with Java + Okta

These resources help you add user authentication to your Java app.

## Integrate with Okta using the Okta-hosted Sign-In Widget

SDKs help you integrate with Okta by redirecting apps to the Okta Sign-In Widget using OpenID Connect (OIDC) client libraries.

* [Okta Spring Boot Starter](https://github.com/okta/okta-spring-boot)
* [Micronaut redirect authentication sample app](https://github.com/okta/samples-java-micronaut/tree/master/okta-hosted-login)

## Integrate with Okta using embedded Sign-In Widget and SDKs

These SDKs help you integrate with Okta to build your own fully-branded authentication by embedding an Okta Sign-In Widget and/or SDK.

Okta Identity Engine:

* [Identity Engine Java SDK](https://github.com/okta/okta-idx-java)
* [Java embedded authentication with SDK sample app](https://github.com/okta/okta-idx-java/tree/master/samples/embedded-auth-with-sdk)

Okta Classic Engine:

* The [Okta Authentication SDK](https://github.com/okta/okta-auth-java) can be used in scenarios where using OAuth 2.0 isn't possible.
* [Okta Authentication SDK reference (Javadoc)](https://developer.okta.com/okta-auth-java/apidocs/)

## Other Classic Engine SDKs

* The [Okta Java Management SDK](https://github.com/okta/okta-sdk-java) can be used in your server-side code to create and update users, groups, and more.
  * [Okta Java Management SDK Reference (Javadoc)](https://developer.okta.com/okta-sdk-java/apidocs/)
* The [Okta Hooks SDK](https://github.com/okta/okta-hooks-sdk-java) can be used to respond to [Okta's Inline Hooks](https://developer.okta.com/docs/concepts/inline-hooks/) from custom applications.
  * [Okta Hooks reference (Javadoc)](https://developer.okta.com/okta-hooks-sdk-java/apidocs/)
* The [Okta JWT Verifier](https://github.com/okta/okta-jwt-verifier-java) can be used in products that don't have existing OAuth 2.0 support. This library supports validating Okta's OAuth access tokens and ID tokens.
  * [Okta JWT Verifier reference (Javadoc)](https://developer.okta.com/okta-jwt-verifier-java/apidocs/)

## Java Servlet sample

[Java Servlet Sample](https://github.com/okta/samples-java-servlet)

## Recommended Guides

* [Implement the Authorization Code flow](/docs/guides/implement-grant-type/authcode/main/)
* [Add an identity provider (includes social login)](/docs/guides/identity-providers/)
* [Validate access tokens](/docs/guides/validate-access-tokens)
* [Validate ID tokens](/docs/guides/validate-id-tokens)

> **Note**: Browse our recent [Java Developer Blog posts](https://developer.okta.com/blog/tags/java/) for further useful topics.
