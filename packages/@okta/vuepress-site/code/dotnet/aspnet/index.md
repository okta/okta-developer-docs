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

These resources walk you through adding user authentication to your ASP.NET app in minutes.

<ul class='language-ctas'>
  <!-- <li>
    <a href='/docs/guides/sign-into-web-app-redirect/aspnet/main/' class='Button--blueDarkOutline' data-proofer-ignore>
      <span>Sign users in quickstart</span>
    </a>
  </li>
  <li>
    <a href='/docs/guides/protect-your-api/aspnet/main/' class='Button--blueDarkOutline' data-proofer-ignore>
      <span>Protect your API quickstart</span>
    </a>
  </li>-->
  <li>
    <DropdownButton caption="Sample app">
      <DropdownButtonOption href='https://github.com/okta/samples-aspnet'>MVC & Web API</DropdownButtonOption>
      <DropdownButtonOption href='https://github.com/okta/samples-aspnet-webforms'>Web Forms</DropdownButtonOption>
    </DropdownButton>
  </li>
</ul>

## Integrate with Okta using the Okta-hosted Sign-In Widget

These SDKs help you integrate with Okta by redirecting to the Okta Sign-In Widget using OpenID Connect (OIDC) client libraries.

* [ASP.NET redirect authentication sample app](https://github.com/okta/samples-aspnet): See [Okta-Hosted Login](https://github.com/okta/samples-aspnet/tree/master/okta-hosted-login) for a redirect configuration.
* [ASP.NET Web Forms redirect authentication sample app](https://github.com/okta/samples-aspnet-webforms): See [Okta-Hosted Login](https://github.com/okta/samples-aspnet-webforms/tree/master/okta-hosted-login) for a redirect configuration.

## Integrate with Okta using embedded Sign-In Widget and SDKs

These SDKs help you integrate with Okta to build your own fully-branded authentication by embedding an Okta Sign-In Widget and/or SDK.

Okta Identity Engine:

* [Identity Engine .NET SDK](https://github.com/okta/okta-idx-dotnet)
* [ASP.NET embedded authentication with SDK sample app](https://github.com/okta/okta-idx-dotnet/tree/master/samples/samples-aspnet/embedded-auth-with-sdk)
* [ASP.NET embedded Sign-In Widget sample app](https://github.com/okta/okta-idx-dotnet/tree/master/samples/samples-aspnet/embedded-sign-in-widget)

Okta Classic Engine:

* The [Okta .NET Authentication SDK](https://github.com/okta/okta-auth-dotnet) is useful if you cann't use OIDC and need your server-side code to interact with the Authentication API for handling the sign-in flow.
* Okta's [Okta ASP.NET OIDC middleware Integration](https://github.com/okta/okta-aspnet) makes it easy to add sign-in to your ASP.NET Core applications and protect your Web APIs.
* [Okta ASP.NET OIDC integration on NuGet](https://www.nuget.org/packages/Okta.AspNet)

## Other Classic Engine .NET libraries

* The [Okta Management SDK for .NET](https://github.com/okta/okta-sdk-dotnet) uses .NET Standard and works with both .NET Framework and .NET Core. It's helpful to work with the Okta Management API to manage users, groups, apps, and so on, on the fly.
* The [Okta Xamarin SDK](https://github.com/okta/okta-oidc-xamarin) follows current best practice for native apps using OIDC and the Authorization Code flow + PKCE.

## Recommended guides

Okta-hosted Sign-In Widget guide:

Sign into your web app with redirect auth  (coming soon)

Embedded SDK and Sign-In Widget sign-in guide:

[Get set up with Identity Engine sample apps and embedded use cases](/docs/guides/oie-embedded-common-org-setup/aspnet/main/)

Other guides:

* [Manual JWT validation in .NET](/code/dotnet/jwt-validation/)
* [Add an identity provider (includes social login)](/docs/guides/identity-providers/)
* [Validate access tokens](/docs/guides/validate-access-tokens)
* [Validate ID tokens](/docs/guides/validate-id-tokens)

> **Note**: Browse our recent [ASP.NET Developer Blog posts](https://developer.okta.com/blog/tags/dotnet/) for further useful topics.
