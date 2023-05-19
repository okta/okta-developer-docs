---
title: Add user authentication and Okta Resource Management to your Blazor app
language: .NET
integration: back-end
icon: code-dotnet
meta:
  - name: description
    content: Our ASP.NET Core Blazor integration makes it easy to add a sign-in flow to your applications. Use our guide to add user authentication to your ASP.NET Core app.
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

## Get started with Blazor + Okta

These resources walk you through adding user authentication to your ASP.NET Core app in minutes.

<ul class='language-ctas'>
   <!-- <li>
      <a href='#' class='Button--blueDarkOutline' data-proofer-ignore>
         <span>Sign users in quickstart</span>
      </a>
   </li> -->
  <li>
    <DropdownButton caption="Sample app">
      <DropdownButtonOption href='https://github.com/okta/samples-blazor/tree/master/server-side/okta-hosted-login'>Blazor Server-Side</DropdownButtonOption>
      <DropdownButtonOption href='https://github.com/okta/samples-blazor/tree/master/web-assembly/okta-hosted-login'>Blazor WebAssembly (WASM)</DropdownButtonOption>
    </DropdownButton>
  </li>
</ul>

## Integrate with Okta using the Okta-hosted Sign-In Widget

These SDKs help you integrate with Okta by redirecting to the Okta Sign-In Widget using OpenID Connect (OIDC) client libraries.

[Blazor redirect authentication sample app](https://github.com/okta/samples-blazor): See [Blazor server-side Okta-hosted Login](https://github.com/okta/samples-blazor/tree/master/server-side/okta-hosted-login) for a redirect configuration.

## Integrate with Okta using embedded Sign-In Widget and SDKs

These SDKs help you integrate with Okta to build your own fully-branded authentication by embedding an Okta Sign-In Widget and/or SDK.

* [Okta Identity Engine .NET SDK](https://github.com/okta/okta-idx-dotnet)
* [Okta Classic Engine Management SDK for .NET](https://github.com/okta/okta-sdk-dotnet)

## Recommended guides

* [Manual JWT validation in .NET](/code/dotnet/jwt-validation/)
* [Add an identity provider (includes social login)](/docs/guides/identity-providers/)
* [Validate access tokens](/docs/guides/validate-access-tokens)
* [Validate ID tokens](/docs/guides/validate-id-tokens)

> **Note**: Browse our recent [Blazor Developer Blog posts](https://developer.okta.com/blog/tags/blazor/) for further useful topics.
