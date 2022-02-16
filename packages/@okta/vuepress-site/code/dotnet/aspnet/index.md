---
title: Add user authentication and Okta Resource Management to your ASP.NET app
language: .NET
integration: back-end
icon: code-dotnet
meta:
  - name: description
    content: Get started with ASP.NET and Okta by using our guide to help you add user authentication to your ASP.NET app.
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

## Get started with ASP.NET + Okta

New to Okta? Our resources will walk you through adding user authentication to your ASP.NET app in minutes.

<ul class='language-ctas'>
  <li>
    <a href='#' class='Button--blueDarkOutline' data-proofer-ignore>
      <span>Sign users in quickstart</span>
    </a>
  </li>
  <li>
    <a href='/docs/guides/protect-your-api/aspnet/main/' class='Button--blueDarkOutline' data-proofer-ignore>
      <span>Protect your API quickstart</span>
    </a>
  </li>
  <li>
    <DropdownButton caption="Sample app">
      <DropdownButtonOption href='https://github.com/okta/samples-aspnet'>MVC & Web API</DropdownButtonOption>
      <DropdownButtonOption href='https://github.com/okta/samples-aspnet-webforms'>Web Forms</DropdownButtonOption>
    </DropdownButton>
  </li>
</ul>

## Okta Identity Engine sample apps and SDK

* [Identity Engine .NET SDK](https://github.com/okta/okta-idx-dotnet)
* [ASP.NET embedded authentication with SDK sample app](https://github.com/okta/okta-idx-dotnet/tree/master/samples/samples-aspnet/embedded-auth-with-sdk)
* [ASP.NET embedded Sign-In Widget sample app](https://github.com/okta/okta-idx-dotnet/tree/master/samples/samples-aspnet/embedded-sign-in-widget)
* [ASP.NET redirect authentication sample app](https://github.com/okta/samples-aspnet) &mdash;  see [Okta-Hosted Login](https://github.com/okta/samples-aspnet/tree/master/okta-hosted-login) for redirect configuration
* [ASP.NET Web Forms redirect authentication sample app](https://github.com/okta/samples-aspnet-webforms) &mdash;  see [Okta-Hosted Login](https://github.com/okta/samples-aspnet-webforms/tree/master/okta-hosted-login) for redirect configuration

## Okta ASP.NET integration

Okta's OIDC middleware integration with ASP.NET makes it easy to add sign-in to your ASP.NET Core applications and protect your Web APIs.

* [Okta ASP.NET OIDC integration on NuGet](https://www.nuget.org/packages/Okta.AspNet)
* [Okta ASP.NET OIDC Integration Source](https://github.com/okta/okta-aspnet)

## Other .NET libraries

The Okta Management SDK for .NET uses .NET Standard and will work with both .NET Framework and .NET Core. It is helpful to work with the Okta Managemenet API to manage users, groups, apps, etc. on the fly.

[Okta Management SDK for .NET](https://github.com/okta/okta-sdk-dotnet)

The Okta Authentication SDK for .NET is useful if you cannot use OIDC and need your server-side code to interact with the Authentication API for handling the sign in flow.

[Okta .NET Authentication SDK](https://github.com/okta/okta-auth-dotnet)

The Okta SDK for Xamarin follows current best practice for native apps using OIDC, the Authorization Code flow + PKCE.

[Okta Xamarin SDK (beta)](https://github.com/okta/okta-oidc-xamarin)

## Recommended guides

* [Sign into your web app with redirect auth](#) (WILL EVENTUALLY BE /docs/guides/sign-into-web-app-redirect/aspnet/main/)
* [Get set up with Identity Engine sample apps and embedded use cases](/docs/guides/oie-embedded-common-org-setup/aspnet/main/) 
* [Protect your API endpoints](/docs/guides/protect-your-api/aspnet/main/)
* [Authenticator guides](#) (WILL EVENTUALLY BE /docs/guides/authenticators-overview/main/)
* [Manual JWT validation in .NET](/code/dotnet/jwt-validation/)
* [Add an identity provider (includes social login)](/docs/guides/identity-providers/)
* [Validate access tokens](/docs/guides/validate-access-tokens)
* [Validate ID tokens](/docs/guides/validate-id-tokens)

> **Note**: Browse our [ASP.NET Developer Blog posts](/search/#q=asp%20net&f:@commonoktasource=[Developer%20blog]) for further useful topics.