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

* [Android Identity Engine SDK](https://github.com/okta/okta-idx-android)
* [Android sample app](https://github.com/okta/samples-android)
	- see [Browser Sign In](https://github.com/okta/samples-android/tree/master/browser-sign-in) for redirect sample configuration
	- see [Custom Sign In](https://github.com/okta/samples-android/tree/master/custom-sign-in) for embedded sample configuration
* [More Android resources](/code/android/)

##### iOS

* [Swift Identity Engine SDK](https://github.com/okta/okta-idx-swift)
* [iOS sample app](https://github.com/okta/samples-ios)
	- see [Browser Sign In](https://github.com/okta/samples-ios/tree/master/browser-sign-in) for redirect sample configuration
	- see [Custom Sign In](https://github.com/okta/samples-ios/tree/master/custom-sign-in) for embedded sample configuration
* [More iOS resources](/code/ios/)

##### React Native

* [React Native for iOS and Android sample app](https://github.com/okta/samples-js-react-native)
	- see [Browser Sign In](https://github.com/okta/samples-js-react-native/tree/master/browser-sign-in) for redirect sample configuration
	- see [Custom Sign In](https://github.com/okta/samples-js-react-native/tree/master/custom-sign-in) for embedded sample configuration
* [More React Native resources](/code/react-native/)

### Front End

##### Angular

* [Angular sample app](https://github.com/okta/samples-js-angular)
	- see [Okta-Hosted Login](https://github.com/okta/samples-js-angular/tree/master/okta-hosted-login) for redirect sample configuration
	- see [Custom Login Page](https://github.com/okta/samples-js-angular/tree/master/custom-login) for embedded sample configuration
* [More Angular resources](/code/angular)

##### JavaScript

* [JavaScript Identity Engine SDK](https://github.com/okta/okta-idx-js)
* [Sign-In Widget](https://github.com/okta/okta-signin-widget)
* [More JavaScript resources](/code/javascript/)

##### React

* [React sample app](https://github.com/okta/samples-js-react)
	- see [Okta-Hosted Login](https://github.com/okta/samples-js-react/tree/master/okta-hosted-login) for redirect sample configuration
	- see [Custom Login Page](https://github.com/okta/samples-js-react/tree/master/custom-login) for embedded sample configuration
* [More React resources](/code/react/)

##### Vue

* [Vue sample app](https://github.com/okta/samples-js-vue)
	- see [Okta-Hosted Login](https://github.com/okta/samples-js-vue/tree/master/okta-hosted-login) for redirect sample configuration
	- see [Custom Login Page](https://github.com/okta/samples-js-vue/tree/master/custom-login) for embedded sample configuration
* [More Vue resources](/code/vue/)

### Back End

##### .NET

* [.NET Identity Engine SDK](https://github.com/okta/okta-idx-dotnet)
* [ASP.NET MVC 4.x embedded Identity Engine sample app](https://github.com/okta/okta-idx-dotnet/tree/master/samples/samples-aspnet) (??? should this link be listed?)
* [ASP.NET MVC 4.x sample app](https://github.com/okta/samples-aspnet) (??? Classic engine?)
* [ASP.NET Web Forms sample app](https://github.com/okta/samples-aspnet-webforms)
* [More ASP.NET resources](/code/dotnet/aspnet)
* [Blazor sample app](https://github.com/okta/samples-blazor)
* [More Blazor resources](/code/dotnet/blazor/)
* [ASP.NET Core 2.x and 3.x sample app](https://github.com/okta/samples-aspnetcore)
* [More ASP.NET Core resources](/code/dotnet/aspnetcore/)

##### Express JS

* [Node.js Express sample app](https://github.com/okta/samples-nodejs-express-4)
	- see [Okta-Hosted Login](https://github.com/okta/samples-nodejs-express-4/tree/master/okta-hosted-login) for redirect sample configuration
	- see [Custom Login Page](https://github.com/okta/samples-nodejs-express-4/tree/master/custom-login) for embedded sample configuration
* [More Node.js resources](/code/nodejs/)

##### Go

* [Golang Identity Engine SDK](https://github.com/okta/okta-idx-golang)
* [Golang sample app](https://github.com/okta/samples-golang)
	- see [Okta-Hosted Login](https://github.com/okta/samples-golang/tree/master/okta-hosted-login) for redirect sample configuration
	- see [Custom Login Page](https://github.com/okta/samples-golang/tree/master/custom-login) for embedded sample configuration
* [More Go resources](/code/go/)

##### Java

* [Java Identity Engine SDK](https://github.com/okta/okta-idx-java)
* [Spring sample app](https://github.com/okta/samples-java-spring)
	- see [Okta-Hosted Login](https://github.com/okta/samples-java-spring/tree/master/okta-hosted-login) for redirect sample configuration
	- see [Custom Login Page](https://github.com/okta/samples-java-spring/tree/master/custom-login) for embedded sample configuration
* [More Spring resources](/code/java/spring/)
* [Micronaut sample app](https://github.com/okta/samples-java-micronaut)
* [More Java resources](/code/java)

##### PHP

* [PHP sample app](https://github.com/okta/samples-php)
	- see [Okta-Hosted Login](https://github.com/okta/samples-php/tree/develop/okta-hosted-login) for redirect sample configuration
	- see [Custom Login Page](https://github.com/okta/samples-php/tree/develop/custom-login) for embedded sample configuration
* [More PHP resources](/code/php/)

##### Python

* [Flask sample app](https://github.com/okta/samples-python-flask)
	- see [Okta-Hosted Login](https://github.com/okta/samples-python-flask/tree/master/okta-hosted-login) for redirect sample configuration
	- see [Custom Login Page](https://github.com/okta/samples-python-flask/tree/master/custom-login) for embedded sample configuration
* [More Python resources](/code/python/)