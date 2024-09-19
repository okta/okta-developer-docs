---
title: Alternate Sign-in SDKs
meta:
  - name: description
    content: Okta maintains the following SDKs for developers who don't want to use the recommended sign-in experience in their apps, which is redirecting users to sign in using the Okta-hosted Sign-In Widget.
---

<style>
   td > img { vertical-align : middle;}
</style>

# SDKs for alternate sign-in methods

Okta maintains the following SDKs for developers who don't want to use the recommended sign-in experience in their apps, which is redirecting users to sign in using the Okta-hosted Sign-In Widget. However, when using these solutions, you should know that some aspects of [Identity Threat Protection](https://www.okta.com/products/identity-threat-protection/) will not be as fully integrated with the sign-in process as the recommended experience.

Select the task that you want to perform to access more information on alternate ways to set up a sign-in experience in your app:

* Sign in to Identity Engine (OIE)
  * [From a single-page app](#sign-a-user-in-from-a-single-page-app-to-identity-engine)
  * [From a server-side web app](#sign-a-user-in-from-a-server-side-web-app-to-identity-engine)
  * [From a mobile app](#sign-a-user-in-from-a-mobile-app-to-identity-engine)
* Sign in to Classic Engine
  * [From a single-page app](#from-a-single-page-app)
  * [From a server-side web app](#from-a-server-side-web-app)
  * [From a mobile app](#from-a-mobile-app)

> **Tip:** See [Recommended SDKs](/code/) to find SDKs, samples, and documentation for the recommended sign-in experiences with Identity Engine, and other fully supported tasks.

## Sign a user in from a single-page app to Identity Engine

Instead of redirecting to the Okta-hosted Sign-In widget, you can create a custom sign-in page in your single-page app and implement [an appropriate authentication flow](/docs/concepts/oauth-openid/#what-kind-of-client-are-you-building) between the app and Identity Engine.

There are two ways to create a custom sign-in page. In both cases, enable the flow using auth.js or a framework-specific wrapper around it:

1. Embed the Okta Sign-In Widget in a web page.

   |   |         |         |         |   |
   |---|---------|---------|---------|---|
   | ![Javascript](/img/sdks/javascript.png)  | Any Javascript framework | [Auth Javascript SDK (Auth.js)](https://github.com/okta/okta-auth-js) |  |  |
   | ![React](/img/sdks/react.png) | React | [React SDK](https://github.com/okta/okta-react) | [Sample App](https://github.com/okta/samples-js-react/tree/master/custom-login) | [Guide](/docs/guides/sign-in-to-spa-embedded-widget/react/) |
   | ![Angular](/img/sdks/angular.png) | Angular | [Angular SDK](https://github.com/okta/okta-angular) | [Sample App](https://github.com/okta/samples-js-angular/tree/master/custom-login) | [Guide](/docs/guides/sign-in-to-spa-embedded-widget/angular/main/) |
   | ![Vue](/img/sdks/vue.png) | Vue | [Vue SDK](https://github.com/okta/okta-vue) | [Sample App](https://github.com/okta/samples-js-vue/tree/master/custom-login) | [Guide](/docs/guides/sign-in-to-spa-embedded-widget/vue/main/) |

1. [**Not recommended**] Create the custom sign-in form yourself.

   |   |         |         |         |   |
   |---|---------|---------|---------|---|
   | ![Javascript](/img/sdks/javascript.png) | Any Javascript framework | [Auth Javascript SDK (Auth.js)](https://github.com/okta/okta-auth-js) |  |  |
   | ![React](/img/sdks/react.png) | React | [React SDK](https://github.com/okta/okta-react) | [Sample App](https://github.com/okta/okta-auth-js/tree/master/samples/generated/react-embedded-auth-with-sdk) | [Guide](/docs/guides/sign-in-to-spa-authjs/react/main/) |
   | ![Angular](/img/sdks/angular.png) | Angular | [Angular SDK](https://github.com/okta/okta-angular) | [Sample App](https://github.com/okta-samples/okta-angular-oie-sample-quickstart) | [Guide](/docs/guides/sign-in-to-spa-authjs/angular/main/) |
   | ![Vue](/img/sdks/vue.png) | Vue | [Vue SDK](https://github.com/okta/okta-vue) | [Sample App](https://github.com/okta-samples/okta-vue-oie-sample-quickstart) | [Guide](/docs/guides/sign-in-to-spa-authjs/vue/main/) |

> **Note:** All Okta JS libraries are hosted on [npm](https://www.npmjs.com/search?q=%40okta).

## Sign a user in from a server-side web app to Identity Engine

Instead of redirecting to the Okta-hosted Sign-In Widget, you can create a custom sign-in page in your server-side web app and implement [an appropriate authentication flow](/docs/concepts/oauth-openid/#what-kind-of-client-are-you-building) between the app and Identity Engine.

> **Warning:** When a server-side app uses the embedded SDK as a proxy between client apps and Okta servers, a request context for the client apps (IP address, user agent, and device) is required. This feeds into the risk assessment made by Okta [Identity Threat Protection](https://www.okta.com/products/identity-threat-protection/) for any sign-in flow and enables policies based on these request context values. However, the proxy always passes in the app server's request context rather than the client context. Hence, ITP and some context-reliant authentication policies are not effective if you choose to use this custom sign-in experience.

There are two ways to create a custom sign-in page:

1. Embed the Okta Sign-In Widget in the page.

   |   |         |         |         |   |
   |---|---------|---------|---------|---|
   | ![ASP.NET Standard 2.0](/img/sdks/dotnet.png) | ASP.NET <br />Standard 2.0 | [Okta Identity Engine SDK for .NET](https://github.com/okta/okta-idx-dotnet) | [Sample App](https://github.com/okta/okta-idx-dotnet/tree/master/samples/samples-aspnet/embedded-sign-in-widget) | [Guide](/docs/guides/oie-embedded-widget-use-case-basic-sign-in/aspnet/main/) |
   | ![Python](/img/sdks/python.png) | Python | Flask | [Sample App](https://github.com/okta/samples-python-flask/blob/master/custom-login) |  |
   | ![Spring](/img/sdks/spring.png) | Spring | [Okta Spring Boot Starter](https://github.com/okta/okta-spring-boot) | [Sample App](https://github.com/okta/samples-java-spring/tree/master/custom-login) | [Guide](/docs/guides/oie-embedded-widget-use-case-basic-sign-in/java/main/) |
   | ![Node JS](/img/sdks/nodejs.png) | node.js | [Auth Javascript SDK (Auth.js)](https://github.com/okta/okta-auth-js) | [Sample App](https://github.com/okta/okta-auth-js/tree/master/samples/generated/express-embedded-sign-in-widget) | [Guide](/docs/guides/oie-embedded-widget-use-case-basic-sign-in/nodejs/main/) |
   | ![Java](/img/sdks/java.png) | Java | [Okta Identity Engine for Java](https://github.com/okta/okta-idx-java) | [Sample App](https://github.com/okta/okta-idx-java/tree/master/samples/embedded-sign-in-widget) | [Guide](/docs/guides/oie-embedded-widget-use-case-basic-sign-in/java/main/) |
   | ![Go](/img/sdks/go.png) | Go | [Okta Identity Engine SDK for Go](https://github.com/okta/okta-idx-golang) | [Sample App](https://github.com/okta/samples-golang/blob/master/identity-engine/embedded-sign-in-widget) | [Guide](/docs/guides/oie-embedded-widget-use-case-basic-sign-in/go/main/) |

1. [**Not recommended**] Create the custom sign-in form yourself.

   |   |         |         |         |   |
   |---|---------|---------|---------|---|
   | ![ASP.NET Standard 2.0](/img/sdks/dotnet.png) | ASP.NET <br />Standard 2.0 | [Okta Identity Engine SDK for .NET](https://github.com/okta/okta-idx-dotnet) | [Sample App](https://github.com/okta/okta-idx-dotnet/tree/master/samples/samples-aspnet/embedded-auth-with-sdk) | [Guide](/docs/guides/oie-embedded-sdk-use-case-sign-in-pwd-email/aspnet/main/) |
   | ![Node JS](/img/sdks/nodejs.png) | node.js | [Auth Javascript SDK (Auth.js)](https://github.com/okta/okta-auth-js) | [Sample App](https://github.com/okta/okta-auth-js/tree/master/samples/generated/express-embedded-auth-with-sdk) | [Guide](/docs/guides/oie-embedded-sdk-use-case-sign-in-pwd-email/nodejs/main/) |
   | ![ASP.NET Framework 4.8](/img/sdks/dotnet.png) | ASP.NET <br />Framework 4.8 | [Okta ASP.NET middleware](https://github.com/okta/okta-aspnet/tree/master) | [MVC Sample App](https://github.com/okta/samples-aspnet/blob/master/self-hosted-login) <br /> [Webforms Sample App](https://github.com/okta/samples-aspnet-webforms/blob/master/self-hosted-login) |  |
   | ![Java](/img/sdks/java.png) | Java | [Okta Identity Engine SDK for Java](https://github.com/okta/okta-idx-java) | [Sample App](https://github.com/okta/okta-idx-java/tree/master/samples/embedded-auth-with-sdk) | [Guide](/docs/guides/oie-embedded-sdk-use-case-sign-in-pwd-email/java/main/) |
   | ![Go](/img/sdks/go.png) | Go | [Okta Identity Engine SDK for Go](https://github.com/okta/okta-idx-golang) | [Sample App](https://github.com/okta/samples-golang/tree/master/identity-engine/embedded-auth-with-sdk) | [Guide](/docs/guides/oie-embedded-sdk-use-case-sign-in-pwd-email/go/main/) |

## Sign a user in from a mobile app to Identity Engine

Instead of redirecting to the Okta-hosted Sign-In widget, you can create a custom sign-in page for your mobile app and implement [an appropriate authentication flow](/docs/concepts/oauth-openid/#what-kind-of-client-are-you-building) between the app and Identity Engine. Android and iOS developers should use the Identity Engine SDK for their respective platforms.

   |   |         |         |         |   |
   |---|---------|---------|---------|---|
   | ![Android](/img/sdks/android.png) | Android | [Okta Identity Engine SDK for Kotlin](https://github.com/okta/okta-idx-android) | [Sample App](https://github.com/okta/okta-idx-android/tree/master/dynamic-app) | [Guide](/docs/guides/oie-embedded-sdk-use-case-sign-in-pwd-email/android/main/) |
   | ![iOS](/img/sdks/iOS.png) | iOS | [Okta Identity Engine SDK for Swift](https://github.com/okta/okta-idx-swift) | [Sample App](https://github.com/okta/okta-idx-swift/tree/master/Samples/EmbeddedAuthWithSDKs/EmbeddedAuth) | [Guide](/docs/guides/oie-embedded-sdk-use-case-sign-in-pwd-email/ios/main/) |

> **Note:** The Mobile and Identity Engine SDKs share a [modular architecture](https://developer.okta.com/blog/2022/08/30/introducing-the-new-okta-mobile-sdks#modularized-architecture).

## Sign a user in from an app to Classic Engine

Okta Identity Engine superseded Okta Classic Engine in 2021. Okta recommends upgrading your apps to Identity Engine to take advantage of its many new features. If an upgrade isn’t possible right now, use the following content to set up a sign-in experience for your users in Classic Engine.

### From a single-page app

The Okta Auth Javascript SDK (auth.js) supports custom sign-in page interactions with Classic Engine as well as Identity Engine.

There are two ways to create a custom sign-in page. In both cases, enable the flow using auth.js or a framework-specific wrapper around it.

1. Embed the Okta Sign-In Widget in a web page.

   |   |         |         |         |   |
   |---|---------|---------|---------|---|
   | ![Javascript](/img/sdks/javascript.png) | Any Javascript framework | [Auth Javascript SDK (Auth.js)](https://github.com/okta/okta-auth-js) |  | [Guide](/docs/guides/archive-embedded-siw/main) |
   | ![React](/img/sdks/react.png) | React | [React SDK](https://github.com/okta/okta-react) | [Sample App](https://github.com/okta/samples-js-react/tree/master/custom-login) | [Guide](/docs/guides/archive-embedded-siw/main) |
   | ![Angular](/img/sdks/angular.png) | Angular | [Angular SDK](https://github.com/okta/okta-angular) | [Sample App](https://github.com/okta/samples-js-angular/tree/master/custom-login)  | [Guide](/docs/guides/archive-embedded-siw/main) |
   | ![Vue](/img/sdks/vue.png) | Vue | [Vue SDK](https://github.com/okta/okta-vue) | [Sample App](https://github.com/okta/samples-js-vue/tree/master/custom-login) | [Guide](/docs/guides/archive-embedded-siw/main) |

1. Create a custom sign-in page.

   |   |         |         |         |   |
   |---|---------|---------|---------|---|
   | ![Javascript](/img/sdks/javascript.png) | Any Javascript framework | [Auth Javascript SDK (Auth.js)](https://github.com/okta/okta-auth-js) |  | [Guide](/docs/guides/auth-js-redirect/) |
   | ![React](/img/sdks/react.png) | React | [React SDK](https://github.com/okta/okta-react) |  | [Guide](/docs/guides/archive-sign-in-to-spa-authjs/react/main/) |
   | ![Angular](/img/sdks/angular.png) | Angular | [Angular SDK](https://github.com/okta/okta-angular) |  | [Guide](/docs/guides/archive-sign-in-to-spa-authjs/angular/main/) |
   | ![Vue](/img/sdks/vue.png) | Vue | [Vue SDK](https://github.com/okta/okta-vue) |  | [Guide](/docs/guides/archive-sign-in-to-spa-authjs/vue/main/) |

> **Note:** All Okta JS libraries are hosted on [npm](https://www.npmjs.com/search?q=%40okta).

### From a server-side web app

Classic Engine is fully OAuth 2.0/OIDC compatible. To initiate the OIDC exchange, use your preferred OIDC SDK or the Okta OIDC middleware SDK listed in the following table. If you can't use OIDC and need your server-side code to interact with the Authentication API to handle the sign-in flow, use an Okta Authentication SDK.

|   |         |         |         |
|---|---------|---------|---------|
| ![ASP.NET Standard 2.0](/img/sdks/dotnet.png) | ASP.NET <br />Standard 2.0 | [Okta ASP.NET middleware](https://github.com/okta/okta-aspnet) | [Okta .NET Authentication SDK](https://github.com/okta/okta-auth-dotnet) |
| ![Spring](/img/sdks/spring.png) | Spring | [Okta Spring Boot Starter](https://github.com/okta/okta-spring-boot) | [Okta Java Authentication SDK](https://github.com/okta/okta-auth-java) |
| ![node.js](/img/sdks/nodejs.png) | node.js | [Okta NodeJS OIDC Middleware](https://github.com/okta/okta-oidc-middleware) | [Auth Javascript SDK (auth.js)](https://github.com/okta/okta-auth-js) |
| ![ASP.NET Framework 4.8](/img/sdks/dotnet.png) | ASP.NET <br />Framework 4.8 | [Okta ASP.NET middleware](https://github.com/okta/okta-aspnet) | [Okta .NET Authentication SDK](https://github.com/okta/okta-auth-dotnet) |
| ![Java](/img/sdks/java.png) | Java | [Okta Spring Boot Starter](https://github.com/okta/okta-spring-boot) | [Okta Java Authentication SDK](https://github.com/okta/okta-auth-java) |

### From a mobile app

The Classic Auth SDKs for [Android](https://github.com/okta/okta-auth-java) (Java) and [iOS](https://github.com/okta/okta-auth-swift) (Swift) are now legacy Okta SDKs. The new Mobile SDKs replaced them and are compatible with Classic Engine by using the SessionTokenFlow class.

|  |   |   |   |  |
| -- | ------- | -------------------------- | -- | ---------------- |
| ![Android](/img/sdks/android.png) | Android | [Okta Mobile SDK for Kotlin](https://github.com/okta/okta-mobile-kotlin) |  | [SessionTokenFlow](https://github.com/okta/okta-mobile-kotlin/blob/master/oauth2/src/main/java/com/okta/oauth2/SessionTokenFlow.kt) |
| ![iOS](/img/sdks/ios.png) | iOS | [Okta Mobile SDK for Swift](https://github.com/okta/okta-mobile-swift) | [Sample App](https://github.com/okta/okta-mobile-swift/tree/master/Samples/ClassicNativeAuth) | [SessionTokenFlow](https://okta.github.io/okta-mobile-swift/development/oktaoauth2/documentation/oktaoauth2/sessiontokenflow/) |
