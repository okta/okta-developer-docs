---
title: Add user authentication and Okta Resource Management to your ASP.NET Core app
language: .NET
integration: back-end
icon: code-dotnet
meta:
  - name: description
    content: Our ASP.NET Core integration makes it easy to add sign in to your applications. Use our guide to add user authentication to your ASP.NET Core app.
---

<ul class='language-tabs'>
	<li>
		<RouterLink to='/code/dotnet/aspnetcore/'>
			<i class='icon code-dotnet-32'></i><span>ASP.NET Core</span>
		</RouterLink>
	</li>
	<li>
		<RouterLink to='/code/dotnet/aspnet/'>
			<i class='icon code-dotnet-32'></i><span>ASP.NET</span>
		</RouterLink>
	</li>
	<li>
		<RouterLink to='/code/dotnet/blazor/'>
			<i class='icon code-dotnet-32'></i><span>Blazor</span>
		</RouterLink>
	</li>
</ul>

## Get started with ASP.NET Core + Okta

New to Okta? Our resources will walk you through adding user authentication to your ASP.NET Core app in minutes.

<ul class='language-ctas'>
	<li>
		<a href='#' class='Button--blueDarkOutline' data-proofer-ignore>
			<span>Sign users in quickstart</span>
		</a>
	</li>
	<li>
		<a href='/docs/guides/protect-your-api/aspnetcore3/main/' class='Button--blueDarkOutline' data-proofer-ignore>
			<span>Protect your API quickstart</span>
		</a>
	</li>
	<li>
		<a href='https://github.com/okta/samples-aspnetcore' class='Button--blueDarkOutline' data-proofer-ignore>
			<span>Sample app</span>
		</a>
	</li>
</ul>

## Integrate with Okta using the hosted Okta Sign-In Widget

These SDKs will help you integrate with Okta by redirecting to the Okta Sign In Widget using OpenID Connect (OIDC) client libraries.

[ASP.NET Core redirect authentication sample app](https://github.com/okta/samples-aspnetcore) &mdash;  see [Okta-Hosted Login](https://github.com/okta/samples-aspnetcore/tree/master/samples-aspnetcore-3x/okta-hosted-login) for redirect configuration

## Integrate with Okta using embedded Sign-In Widget and SDKs

These SDKs will help you integrate with Okta to build your own fully-branded authentication by embedding an Okta Sign-In Widget and/or SDK.

Okta Identity Engine:

[Identity Engine .NET SDK](https://github.com/okta/okta-idx-dotnet)

Okta Classic:

* The [Okta .NET Authentication SDK](https://github.com/okta/okta-auth-dotnet) is useful if you cannot use OIDC and need your server-side code to interact with the Authentication API for handling the sign in flow.
* Okta's [Okta ASP.NET Core OIDC middleware integration](https://github.com/okta/okta-aspnet) makes it easy to add sign-in to your ASP.NET Core applications and protect your Web APIs.
* [Okta ASP.NET Core OIDC integration on NuGet](https://www.nuget.org/packages/Okta.AspNetCore)

## Other Classic .NET libraries

* The [Okta Management SDK for .NET](https://github.com/okta/okta-sdk-dotnet) uses .NET Standard and will work with both .NET Framework and .NET Core. It is helpful to work with the Okta Management API to manage users, groups, apps, etc. on the fly.
* The [Okta Xamarin SDK](https://github.com/okta/okta-oidc-xamarin) follows current best practice for native apps using OIDC, the Authorization Code flow + PKCE.

## Recommended guides

Okta-hosted Sign-In Widget guide:

[Sign into your web app with redirect auth](#) (WILL EVENTUALLY BE /docs/guides/sign-into-web-app-redirect/aspnetcore3/main/)

Embedded SDK and Sign-In Widget sign-in guide:

[Get set up with Identity Engine sample apps and embedded use cases](/docs/guides/oie-embedded-common-org-setup/aspnet/main/)

Other guides:

* [Protect your API endpoints](/docs/guides/protect-your-api/aspnetcore3/main/)
* [Manual JWT validation in .NET](/code/dotnet/jwt-validation/)
* [Add an identity provider (includes social login)](/docs/guides/identity-providers/)
* [Validate access tokens](/docs/guides/validate-access-tokens)
* [Validate ID tokens](/docs/guides/validate-id-tokens)

> **Note**: Browse our [ASP.NET Developer Blog posts](/search/#q=asp%20net&f:@commonoktasource=[Developer%20blog]) for further useful topics.