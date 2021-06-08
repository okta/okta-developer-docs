---
title: Identity Engine SDKs & Samples
---

# Identity Engine SDKs & Samples

<ApiLifecycle access="ie" />

## What's new

[Identity Engine](/docs/concepts/ie-intro/) introduces new identity management capabilities with greater flexibility and customization. To take advantage of these new features and for a better development experience, use the Identity Engine SDKs to manage authentication in your apps. These new SDKs are recommended for orgs using Identity Engine.

Experiment with sample apps that showcase Identity Engine using the following [authentication approaches](/docs/concepts/redirect-vs-embedded/):

* **Redirect**: These sample apps demonstrate how to redirect users to an Okta-hosted sign-in page, and then receive users redirected back from Okta after users sign in. This approach is recommended for most developers, as it is easier to build and maintain.

* **Embedded**: These sample apps demonstrate how to embed the Okta Sign-In Widget in an app as a package dependency.

Learn how to implement each approach with these Identity Engine SDKs and sample apps in the [Redirect authentication guide](/docs/guides/sampleapp-oie-redirectauth/) and [Embedded authentication guide](/docs/guides/oie-embedded-sdk-start-with-use-case/).

Orgs using Identity Engine can also continue to use current SDKs and tools. You can find those SDKs for your stack from the [Languages & SDKs overview](/code/).

## Repository

### Mobile

##### Android

<!--* [Android Identity Engine SDK](https://github.com/okta/okta-idx-android)-->
* [Android redirect sample app](https://github.com/okta/samples-android) &mdash; see [Browser Sign In](https://github.com/okta/samples-android/tree/master/browser-sign-in) for redirect configuration

##### iOS

* [Swift Identity Engine SDK](https://github.com/okta/okta-idx-swift)
* [iOS embedded authentication with SDK sample app](https://github.com/okta/okta-idx-swift/tree/feat-dynamic-auth/Samples/EmbeddedAuthWithSDKs)
* [iOS redirect sample app](https://github.com/okta/samples-ios) &mdash; see [Browser Sign In](https://github.com/okta/samples-ios/tree/master/browser-sign-in) for redirect configuration

##### React Native

* [React Native redirect sample app](https://github.com/okta/samples-js-react-native) &mdash; see [Browser Sign In](https://github.com/okta/samples-js-react-native/tree/master/browser-sign-in) for redirect configuration

### Front End

##### Angular

* [Angular redirect sample app](https://github.com/okta/samples-js-angular) &mdash; see [Okta-Hosted Login](https://github.com/okta/samples-js-angular/tree/master/okta-hosted-login) for redirect configuration

<!--
#### JavaScript

* [JavaScript Identity Engine SDK](https://github.com/okta/okta-idx-js)
* [Sign-In Widget](https://github.com/okta/okta-signin-widget)
-->

##### React

* [React redirect sample app](https://github.com/okta/samples-js-react) &mdash; see [Okta-Hosted Login](https://github.com/okta/samples-js-react/tree/master/okta-hosted-login) for redirect configuration

##### Vue

* [Vue redirect sample app](https://github.com/okta/samples-js-vue) &mdash; see [Okta-Hosted Login](https://github.com/okta/samples-js-vue/tree/master/okta-hosted-login) for redirect configuration

### Back End

##### .NET

* [.NET Identity Engine SDK](https://github.com/okta/okta-idx-dotnet)
* [ASP.NET MVC embedded authentication with SDK sample app](https://github.com/okta/okta-idx-dotnet/tree/master/samples/samples-aspnet/embedded-auth-with-sdk)

* [ASP.NET MVC redirect sample app](https://github.com/okta/samples-aspnet) &mdash;  see [Okta-Hosted Login](https://github.com/okta/samples-aspnet/tree/master/okta-hosted-login) for redirect configuration
* [ASP.NET Web Forms redirect sample app](https://github.com/okta/samples-aspnet-webforms) &mdash;  see [Okta-Hosted Login](https://github.com/okta/samples-aspnet-webforms/tree/master/okta-hosted-login) for redirect configuration
* [Blazor redirect sample app](https://github.com/okta/samples-blazor) &mdash;  see [Blazor Server-Side Okta-Hosted Login](https://github.com/okta/samples-blazor/tree/master/server-side/okta-hosted-login) for redirect configuration
* [ASP.NET Core 2.x and 3.x redirect sample app](https://github.com/okta/samples-aspnetcore) &mdash;  see [Okta-Hosted Login](https://github.com/okta/samples-aspnetcore/tree/master/samples-aspnetcore-2x/okta-hosted-login) for redirect configuration

##### Express JS

* [Express JS SDK](https://github.com/okta/okta-auth-js) &mdash; see [Identity Engine README](https://github.com/okta/okta-auth-js/blob/master/docs/idx.md) for Identity Engine specific instructions
* [Express JS embedded authentication with SDK sample app](https://github.com/okta/okta-auth-js/tree/master/samples/generated/express-embedded-auth-with-sdk)
* [Express JS embedded Sign-In Widget sample app](https://github.com/okta/okta-auth-js/tree/master/samples/generated/express-embedded-sign-in-widget)
* [Express JS redirect sample app](https://github.com/okta/samples-nodejs-express-4) &mdash; see [Okta-Hosted Login](https://github.com/okta/samples-nodejs-express-4/tree/master/okta-hosted-login) for redirect configuration

##### Go

<!--* [Golang Identity Engine SDK](https://github.com/okta/okta-idx-golang)-->
* [Golang redirect sample app](https://github.com/okta/samples-golang) &mdash; see [Okta-Hosted Login](https://github.com/okta/samples-golang/tree/master/okta-hosted-login) for redirect configuration

##### Java

* [Java Identity Engine SDK](https://github.com/okta/okta-idx-java)
* [Java embedded authentication with SDK sample app](https://github.com/okta/okta-idx-java/tree/master/samples/embedded-auth-with-sdk)
* [Spring embedded Sign-In Widget sample app](https://github.com/okta/okta-idx-java/tree/master/samples/embedded-sign-in-widget)
* [Spring redirect sample app](https://github.com/okta/samples-java-spring) &mdash; see [Okta-Hosted Login](https://github.com/okta/samples-java-spring/tree/master/okta-hosted-login) for redirect configuration
* [Micronaut redirect sample app](https://github.com/okta/samples-java-micronaut) &mdash; see [Okta-Hosted Login](https://github.com/okta/samples-java-micronaut/tree/master/okta-hosted-login) for redirect configuration

##### PHP

* [PHP redirect sample app](https://github.com/okta/samples-php) &mdash; see [Okta-Hosted Login](https://github.com/okta/samples-php/tree/develop/okta-hosted-login) for redirect configuration

##### Python

* [Flask redirect sample app](https://github.com/okta/samples-python-flask) &mdash; see [Okta-Hosted Login](https://github.com/okta/samples-python-flask/tree/master/okta-hosted-login) for redirect configuration

