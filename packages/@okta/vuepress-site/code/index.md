---
title: SDKs
meta:
  - name: description
    content: Okta maintains the following recommended SDKs for developers.
excerpt: Okta maintains the following recommended SDKs for developers.
---

# Recommended Okta SDKs

Okta provides SDKs for many languages and frameworks to add an Okta sign-in experience to your application, manage your users and groups, and more.

Select the task that you want to perform to access more information on the **Okta-recommended** method, documentation, sample code, and SDK:

* [Sign a user in from a web app](#sign-a-user-in-from-a-web-app)
* [Sign a user in from a mobile app](#sign-a-user-in-from-a-mobile-app)
* [Validate Okta's OAuth access tokens and ID tokens locally](#validate-tokens-locally)
* [Enable machine-to-machine authentication between APIs and apps](#enable-machine-to-machine-authentication-between-apis-and-apps)
* [Enable your mobile apps to act as a custom Okta authenticator](#enable-your-mobile-apps-to-act-as-a-custom-okta-authenticator)
* [Manage your users, groups, apps, and other administrative tasks](#manage-your-users-groups-and-apps)

> **Tip:** All recommended methods assume the use of **Okta Identity Engine**.

See [Alternate Sign-In SDKs](/code/alternate-sign-in-sdks/) to discover which SDKs support alternate, unrecommended sign-in experiences with Identity Engine and which support sign-in experiences with Classic Engine.

## Sign a user in from a web app

Okta's recommended way to authenticate users from a web app is to redirect them to an Okta-hosted sign-in page.

### For single-page apps (SPA)

You can use the Okta Auth Javascript SDK (auth.js) to handle the sign-in experience for any Javascript-based SPA. Okta also maintains SDKs for React, Angular, and Vue developers that wrap auth.js for ease of use.

|   |         |         |         |   |
|---|---------|---------|---------|---|
| ![Javascript](/img/sdks/javascript.png) | Any Javascript framework | [Auth Javascript SDK (Auth.js)](https://github.com/okta/okta-auth-js) |  | [Guide](/docs/guides/auth-js-redirect/) |
| ![React](/img/sdks/react.png) | React | [React SDK](https://github.com/okta/okta-react) | [Sample App](https://github.com/okta/samples-js-react/tree/master/okta-hosted-login) | [Guide](/docs/guides/sign-into-spa-redirect/react/main/) |
| ![Angular](/img/sdks/angular.png) | Angular | [Angular SDK](https://github.com/okta/okta-angular) | [Sample App](https://github.com/okta/samples-js-angular/tree/master/okta-hosted-login) | [Guide](/docs/guides/sign-into-spa-redirect/angular/main/) |
| ![Vue](/img/sdks/vue.png) | Vue | [Vue SDK](https://github.com/okta/okta-vue) | [Sample App](https://github.com/okta/samples-js-vue/tree/master/okta-hosted-login) | [Guide](/docs/guides/sign-into-spa-redirect/vue/main/) |
| ![Blazor](/img/sdks/dotnet.png) | Blazor WebAssembly |  | [Sample App](https://github.com/okta/samples-blazor/tree/master/web-assembly/okta-hosted-login) |  |

> **Note:** All Okta JS libraries are hosted on [npm](https://www.npmjs.com/search?q=%40okta).

### For server-side web apps

When you redirect users to an Okta-hosted sign-in page from a server-side web app, you need an SDK for two tasks:

* To execute an OIDC exchange with Identity Engine that checks if the user signed in successfully.
* To validate user ID and access tokens locally after they are retrieved from Okta. See [Validate tokens locally](#validate-tokens-locally).

To initiate the OIDC exchange, use your preferred OIDC library. The following table identifies the SDK used in the sample app and guide.

|   |         |         |         |   |
|---|---------|---------|---------|---|
| ![ASP.NET Standard](/img/sdks/dotnet.png) | ASP.NET Standard 2.0 | [Okta ASP.NET middleware](https://github.com/okta/okta-aspnet) | [Sample App](https://github.com/okta/samples-aspnetcore) | [Guide](/docs/guides/sign-into-web-app-redirect/asp-net-core-3/main/) |
| ![Python](/img/sdks/python.png) | Python | Flask-login | [Sample App](https://github.com/okta-samples/okta-flask-sample) | [Guide](/docs/guides/sign-into-web-app-redirect/python/main/) |
| ![Spring](/img/sdks/spring.png) | Spring | [Okta Spring Boot Starter](https://github.com/okta/okta-spring-boot) | [Sample App](https://github.com/okta/samples-java-spring/tree/master/okta-hosted-login) | [Guide](/docs/guides/sign-into-web-app-redirect/spring-boot/main/) |
| ![node.js](/img/sdks/nodejs.png) | node.js | passport-openidconnect | [Sample App](https://github.com/okta-samples/okta-express-sample) <br />[Sample App 2](https://github.com/okta/samples-nodejs-express-4/tree/master/okta-hosted-login) | [Guide](/docs/guides/sign-into-web-app-redirect/node-express/main/) |
| ![ASP.NET Framework](/img/sdks/dotnet.png) | ASP.NET Framework 4.8 | [Okta ASP.NET middleware](https://github.com/okta/okta-aspnet) | [MVC Sample App](https://github.com/okta/samples-aspnet/tree/master/okta-hosted-login)<br />[Webforms Sample App](https://github.com/okta/samples-aspnet-webforms/tree/master/okta-hosted-login) |  |
| ![Java](/img/sdks/java.png) | Java | Micronaut | [Sample App](https://github.com/okta/samples-java-micronaut/tree/master/okta-hosted-login)  |  |
| ![Blazor](/img/sdks/dotnet.png) | Blazor | [Okta ASP.NET middleware](https://github.com/okta/okta-aspnet) | [Sample App](https://github.com/okta/samples-blazor/tree/master/server-side/okta-hosted-login) |  |
| ![Go](/img/sdks/go.png) | Go | Gorilla | [Sample App](https://github.com/okta/samples-golang/tree/master/okta-hosted-login) | [Guide](/docs/guides/sign-into-web-app-redirect/go/main/) |

> **Note:** [Okta ASP.NET Middleware](ASP.NET) is available for .NET Framework, .NET Core, and .NET 5+. The [samples-aspnetcore](https://github.com/okta/samples-aspnetcore) repo contains sample apps for .NET Core 3.1, .NET 6.0, and .NET 7.0.

### Validate tokens locally

Okta provides token (JWT) verification libraries for server-side web apps to validate ID and access tokens locally after they are retrieved from Okta. You can use the Okta JWT Verifiers in products that don't have existing OAuth 2.0 support. These libraries support validating Okta's OAuth 2.0 access and ID tokens.

|   |         |         |         |
|---|---------|---------|---------|
| ![.NET](/img/sdks/dotnet.png) | .NET | Part of .NET <br />[See Validate your JWTs Locally](/code/dotnet/jwt-validation/) | [Validate ID tokens](/docs/guides/validate-id-tokens/main/)<br />[Validate access tokens](/docs/guides/validate-access-tokens/dotnet/main/) |
| ![Python](/img/sdks/python.png) | Python | [Okta JWT verifier for Python](https://github.com/okta/okta-jwt-verifier-python) | [Validate ID tokens](/docs/guides/validate-id-tokens/main/)<br />[Validate access tokens](/docs/guides/validate-access-tokens/python/main/) |
| ![Javascript](/img/sdks/javascript.png) | Javascript | [Okta JWT verifier for node.js](https://github.com/okta/okta-jwt-verifier-js) | [Validate ID tokens](/docs/guides/validate-id-tokens/main/)<br />[Validate access tokens](/docs/guides/validate-access-tokens/nodejs/main/) |
| ![Java](/img/sdks/java.png) | Java | [Okta JWT verifier for Java](https://github.com/okta/okta-jwt-verifier-java) | [Validate ID tokens](/docs/guides/validate-id-tokens/main/)<br />[Validate access tokens](/docs/guides/validate-access-tokens/java/main/) |
| ![Go](/img/sdks/go.png) | Go | [Okta JWT verifier for Go](https://github.com/okta/okta-jwt-verifier-golang) | [Validate ID tokens](/docs/guides/validate-id-tokens/main/)<br />[Validate access tokens](/docs/guides/validate-access-tokens/go/main/) |

## Sign a user in from a mobile app

To authenticate users from a mobile app, Okta recommends doing one of the following:

* Redirect them to an Okta-hosted sign-in page.
* Build a custom sign-in form in your app that interacts with Identity Engine directly.

To authenticate users, Android and iOS developers should use the latest Okta Mobile SDKs.

|   |         |         |         |   |
|---|---------|---------|---------|---|
| ![Android](/img/sdks/android.png) | Android | [Okta Mobile SDK for Kotlin](https://github.com/okta/okta-mobile-kotlin) | [Sample App](https://github.com/okta-samples/okta-android-kotlin-sample) | [Guide](/docs/guides/sign-into-mobile-app-redirect/android/main/) |
| ![iOS](/img/sdks/ios.png) | iOS | [Okta Mobile SDK for Swift](https://github.com/okta/okta-mobile-swift) | [Sample App](https://github.com/okta/okta-mobile-swift/tree/master/Samples) | [Guide](/docs/guides/sign-into-mobile-app-redirect/ios/main/) |

To authenticate users with **native forms in your app that call Okta directly**, Android and iOS developers should use the Identity Engine SDK for their respective platforms.

|   |         |         |         |   |
|---|---------|---------|---------|---|
| ![Android](/img/sdks/android.png) | Android | [Okta Identity Engine SDK for Kotlin](https://github.com/okta/okta-idx-android) | [Sample App](https://github.com/okta/okta-idx-android/tree/master/dynamic-app) | [Guide](/docs/guides/mobile-idx-sdk-overview/android/main/) |
| ![iOS](/img/sdks/ios.png) | iOS | [Okta Identity Engine SDK for Swift](https://github.com/okta/okta-idx-swift) | [Sample App](https://github.com/okta/okta-idx-swift/tree/master/Samples/EmbeddedAuthWithSDKs) | [Guide](/docs/guides/mobile-idx-sdk-overview/ios/main/) |

> **Note:** The Mobile and Identity Engine SDKs share a [modular architecture](https://developer.okta.com/blog/2022/08/30/introducing-the-new-okta-mobile-sdks#modularized-architecture).
>
> **Note:** React Native developers may use [Okta React Native](https://github.com/okta/okta-react-native). However, it supports only a subset of the dedicated Android and iOS SDKs.

## Enable machine-to-machine authentication between APIs and apps

Background services and third-party APIs that access your APIs require the same levels of authentication and authorization as users who access your web apps. However, a machine-to-machine sign-in flow is silent and requires no user interaction. In this situation, you need an SDK to perform two tasks:

* Execute an [OIDC Client Credentials](/docs/guides/implement-grant-type/clientcreds/main/) exchange with Identity Engine and perform the authentication.
* Validate access tokens locally once they are retrieved from Okta. See [Validate Tokens Locally](#validate-tokens-locally).

To initiate the OIDC exchange, use your preferred OIDC SDK. The following table names the SDK used in the sample app and guide.

|   |         |         |         |   |
|---|---------|---------|---------|---|
| ![ASP.NET Standard 2.0](/img/sdks/dotnet.png) | ASP.NET Standard 2.0 | [Okta Identity Engine SDK for .NET](https://github.com/okta/okta-idx-dotnet) | [Sample App](https://github.com/okta-samples/okta-dotnetcore3-api-quickstart) | [Guide](/docs/guides/protect-your-api/aspnetcore3/main/) |
| ![Python](/img/sdks/python.png) | Python | Flask-login | [Sample App](https://github.com/okta-samples/okta-flask-api-sample) | [Guide](/docs/guides/protect-your-api/python/main/) |
| ![Spring](/img/sdks/spring.png) | Spring Boot | [Okta Spring Boot Starter](https://github.com/okta/okta-spring-boot) | [Sample App](https://github.com/oktadev/okta-spring-boot-client-credentials-example) | [Guide](/docs/guides/protect-your-api/springboot/main/) |
| ![Express](/img/sdks/javascript.png) | Express | Express | [Sample App](https://github.com/okta-samples/okta-express-js-api-quickstart)<br />[Sample App 2](https://github.com/okta/samples-nodejs-express-4/tree/master/resource-server) | [Guide](/docs/guides/protect-your-api/nodeexpress/main/) |
| ![ASP.NET Framework 4.8](/img/sdks/dotnet.png) | ASP.NET Framework 4.8 | [Okta ASP.NET middleware](https://github.com/okta/okta-aspnet) | [Sample App](https://github.com/okta/samples-aspnet/blob/master/resource-server) |  |
| ![Go](/img/sdks/go.png) | Go | Gin | [Sample App](https://github.com/okta-samples/okta-go-api-sample)<br />[Sample App 2](https://github.com/okta/samples-golang/blob/master/resource-server) | [Guide](/docs/guides/protect-your-api/go/main/) |

> **Note:** [Okta ASP.NET Middleware](https://github.com/okta/okta-aspnet) is available for .NET Framework, .NET Core, and .NET 5+. The [samples-aspnetcore](https://github.com/okta/samples-aspnetcore) repo contains additional sample apps for .NET Core 3.1, .NET 6.0, and .NET 7.0.

## Enable your mobile apps to act as a custom Okta authenticator

The Okta Devices SDK allows you to embed push notifications and biometrics directly into your mobile app. As a result, your mobile app can also be used as a factor in the authentication process.

|   |         |         |         |   |
|---|---------|---------|---------|---|
| ![Android](/img/sdks/android.png) | Android | [Okta Devices SDK for Kotlin](https://github.com/okta/okta-devices-kotlin/tree/master) | [Sample App](https://github.com/okta/okta-devices-kotlin/tree/master/push-sample-app) | [Guide](/docs/guides/authenticators-custom-authenticator/android/main/) |
| ![iOS](/img/sdks/ios.png) | iOS | [Okta Devices SDK for Swift](https://github.com/okta/okta-devices-swift/tree/master) | [Sample App](https://github.com/okta/okta-devices-swift/tree/master/Examples/PushSampleApp) | [Guide](/docs/guides/authenticators-custom-authenticator/ios/main/) |

## Manage your users, groups, and apps

The [Okta Core Management APIs](/docs/reference/core-okta-api/) allow you to manage your Okta objects: users, apps, sessions, policies, factors, devices, and more. Use the Okta Management SDK for your language to make interaction with the APIs easier.

|   |         |         |         |
|---|---------|---------|---------|
| ![ASP.NET Standard 2.0](/img/sdks/dotnet.png) | ASP.NET Standard 2.0 | [Okta Management SDK for .NET](https://github.com/okta/okta-sdk-dotnet) | [Guide](https://github.com/okta/okta-sdk-dotnet#getting-started) |
| ![Python](/img/sdks/python.png) | Python | [Okta Management SDK for Python](https://github.com/okta/okta-sdk-python) | [Guide](https://github.com/okta/okta-sdk-python#getting-started) |
| ![Java](/img/sdks/java.png) | Java | [Okta Management SDK for Java](https://github.com/okta/okta-sdk-java) | [Guide](https://github.com/okta/okta-sdk-java#getting-started) |
| ![node.js](/img/sdks/nodejs.png) | node.js | [Okta Management SDK for node.js](https://github.com/okta/okta-sdk-nodejs) | [Guide](https://github.com/okta/okta-sdk-nodejs#getting-started) |
| ![Go](/img/sdks/go.png) | Go | [Okta Management SDK for Go](https://github.com/okta/okta-sdk-golang) | [Guide](https://github.com/okta/okta-sdk-golang#getting-started) |
