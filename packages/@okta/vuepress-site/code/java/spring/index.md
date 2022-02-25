---
title: Add user authentication to your Spring app
language: Java
integration: back-end
icon: code-spring
meta:
  - name: description
    content: Our guide details how to add user authentication to your Java Spring app.
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

## Get started with Spring + Okta

New to Okta? Our resources walks you through adding user authentication to your Spring app in minutes.

<ul class='language-ctas'>
	<li>
		<a href='#' class='Button--blueDarkOutline' data-proofer-ignore>
			<span>Sign users in quickstart</span>
		</a>
	</li>
	<li>
    <a href='/docs/guides/protect-your-api/springboot/main/' class='Button--blueDarkOutline' data-proofer-ignore>
      <span>Protect your API quickstart</span>
    </a>
  </li>
	<li>
		<a href='https://github.com/okta-samples/okta-spring-boot-sample' class='Button--blueDarkOutline' data-proofer-ignore>
			<span>Sample app</span>
		</a>
	</li>
</ul>

## Integrate with Okta using the Okta-hosted Sign-In Widget

These SDKs help you integrate with Okta by redirecting to the Okta Sign-In Widget using OpenID Connect (OIDC) client libraries.

[Spring redirect authentication sample app](https://github.com/okta/samples-java-spring): See [Okta-Hosted Login](https://github.com/okta/samples-java-spring/tree/master/okta-hosted-login) for a redirect configuration.

## Integrate with Okta using embedded Sign-In Widget and SDKs

These SDKs help you integrate with Okta to build your own fully-branded authentication by embedding an Okta Sign-In Widget and/or SDK.

* [Okta Identity Engine Java SDK](https://github.com/okta/okta-idx-java)
* [Spring embedded Sign-In Widget sample app](https://github.com/okta/okta-idx-java/tree/master/samples/embedded-sign-in-widget)

## Spring libraries and samples

* The [Okta Spring Boot Starter](https://github.com/okta/okta-spring-boot) can be used to add OAuth 2.0 authorization to Spring Boot applications.
* [Spring Security OAuth Sample Applications for Okta](https://github.com/okta/samples-java-spring)

## Recommended guides

Okta-hosted Sign-In Widget guide:

[Sign into your web app with redirect auth](#) (WILL EVENTUALLY BE /docs/guides/sign-into-web-app-redirect/spring-boot/main/)

Embedded SDK and Sign-In Widget sign-in guide:

[Get set up with Identity Engine sample apps and embedded use cases](/docs/guides/oie-embedded-common-org-setup/java/main/)

Other guides:

* [Protect your API endpoints](/docs/guides/protect-your-api/nodeexpress/main/)
* [Add an identity provider (includes social login)](/docs/guides/identity-providers/)
* [Validate access tokens](/docs/guides/validate-access-tokens)
* [Validate ID tokens](/docs/guides/validate-id-tokens)
* [Spring Security SAML](/code/java/spring_security_saml/)

> **Note**: Browse our [Spring Developer Blog posts](/search/#q=spring&f:@commonoktasource=[Developer%20blog]) for further useful topics.
