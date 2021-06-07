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

##### iOS

* [Swift Identity Engine SDK](https://github.com/okta/okta-idx-swift)
* [iOS sample app](https://github.com/okta/samples-ios)
	- see [Browser Sign In](https://github.com/okta/samples-ios/tree/master/browser-sign-in) for redirect sample configuration
	- see [Custom Sign In](https://github.com/okta/samples-ios/tree/master/custom-sign-in) for embedded sample configuration
* iOS Identity Engine SDK (??? is there another iOS SDK?)
* iOS Redirect/Embedded Sample App (??? sample app downloads are the same for redirect/embedded)
* More iOS resources (???)

##### Android

* [Android Identity Engine SDK](https://github.com/okta/okta-idx-android)
* [Android sample app](https://github.com/okta/samples-android)
	- see [Browser Sign In](https://github.com/okta/samples-android/tree/master/browser-sign-in) for redirect sample configuration
	- see [Custom Sign In](https://github.com/okta/samples-android/tree/master/custom-sign-in) for embedded sample configuration
* More Android resources (???)

##### React Native for iOS and Android

* [React Native sample app](https://github.com/okta/samples-js-react-native)
	- see [Browser Sign In](https://github.com/okta/samples-js-react-native/tree/master/browser-sign-in) for redirect sample configuration
	- see [Custom Sign In](https://github.com/okta/samples-js-react-native/tree/master/custom-sign-in) for embedded sample configuration

### Front End

##### Angular

* [Angular sample app](https://github.com/okta/samples-js-angular)
	- see [Okta-Hosted Login](https://github.com/okta/samples-js-angular/tree/master/okta-hosted-login) for redirect sample configuration
	- see [Custom Login Page](https://github.com/okta/samples-js-angular/tree/master/custom-login) for embedded sample configuration
* More Android resources (???)

##### JavaScript

* [Sign-In Widget](https://github.com/okta/okta-signin-widget)
* [JavaScript Identity Engine SDK](https://github.com/okta/okta-idx-js)
* More JavaScript resources (???)

##### React

* [React sample app](https://github.com/okta/samples-js-react)
	- see [Okta-Hosted Login](https://github.com/okta/samples-js-react/tree/master/okta-hosted-login) for redirect sample configuration
	- see [Custom Login Page](https://github.com/okta/samples-js-react/tree/master/custom-login) for embedded sample configuration
* More React resources (???)

##### Vue

* [Vue sample app](https://github.com/okta/samples-js-vue)
	- see [Okta-Hosted Login](https://github.com/okta/samples-js-vue/tree/master/okta-hosted-login) for redirect sample configuration
	- see [Custom Login Page](https://github.com/okta/samples-js-vue/tree/master/custom-login) for embedded sample configuration
* More Vue resources (???)

### Back End

##### Express JS

* [Node.js Express sample app](https://github.com/okta/samples-nodejs-express-4)
	- see [Okta-Hosted Login](https://github.com/okta/samples-nodejs-express-4/tree/master/okta-hosted-login) for redirect sample configuration
	- see [Custom Login Page](https://github.com/okta/samples-nodejs-express-4/tree/master/custom-login) for embedded sample configuration
* More Node.js resources (???)

##### Go

* [Golang Identity Engine SDK](https://github.com/okta/okta-idx-golang)
* [Golang sample app](https://github.com/okta/samples-golang)
	- see [Okta-Hosted Login](https://github.com/okta/samples-golang/tree/master/okta-hosted-login) for redirect sample configuration
	- see [Custom Login Page](https://github.com/okta/samples-golang/tree/master/custom-login) for embedded sample configuration
* More Go resources (???)

##### Java

* [Java Identity Engine SDK](https://github.com/okta/okta-idx-java)
* [Spring sample app](https://github.com/okta/samples-java-spring)
	- see [Okta-Hosted Login](https://github.com/okta/samples-java-spring/tree/master/okta-hosted-login) for redirect sample configuration
	- see [Custom Login Page](https://github.com/okta/samples-java-spring/tree/master/custom-login) for embedded sample configuration
* Java Redirect/Embedded Sample App (???)
* More Java resources (???)

##### .NET

* [.NET Identity Engine SDK](https://github.com/okta/okta-idx-dotnet)
* [ASP.NET MVC 4.x embedded Identity Engine sample app](https://github.com/okta/okta-idx-dotnet/tree/master/samples/samples-aspnet)
* [ASP.NET MVC 4.x sample app](https://github.com/okta/samples-aspnet) (??? Classic engine?)
* [ASP.NET Core 2.x and 3.x sample app](https://github.com/okta/samples-aspnetcore)
* [ASP.NET Web Forms redirect sample app](https://github.com/okta/samples-aspnet-webforms)
	- see [Okta-Hosted Login](https://github.com/okta/samples-aspnet-webforms/tree/master/okta-hosted-login) for redirect sample configuration
	- see [Self-Hosted Login](https://github.com/okta/samples-aspnet-webforms/tree/master/self-hosted-login) for embedded sample configuration (???)
* More .NET resources (???)

##### Other
* [Blazer redirect sample app](https://github.com/okta/samples-blazor) (only redirect sample available)
* [Flask sample app](https://github.com/okta/samples-python-flask) (Python Flask)
	- see [Okta-Hosted Login](https://github.com/okta/samples-python-flask/tree/master/okta-hosted-login) for redirect sample configuration
	- see [Custom Login Page](https://github.com/okta/samples-python-flask/tree/master/custom-login) for embedded sample configuration
* [PHP sample app](https://github.com/okta/samples-php)
	- see [Okta-Hosted Login](https://github.com/okta/samples-php/tree/develop/okta-hosted-login) for redirect sample configuration
	- see [Custom Login Page](https://github.com/okta/samples-php/tree/develop/custom-login) for embedded sample configuration
* [Micronaut redirect sample app](https://github.com/okta/samples-java-micronaut) (only redirect sample available)
