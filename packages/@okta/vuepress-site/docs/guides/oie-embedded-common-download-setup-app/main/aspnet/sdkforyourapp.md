After you run the sample app and explore its available use cases, you can begin to integrate the SDK and/or the widget into your own app. To get started follow these steps:

#### 1: Set up your app for .Net 4.8 or greater

The SDK and samples are built using .Net 4.8.

#### 2: Add the Okta SDK Nuget packages

Before using the SDK in your own app, you need to add the following
Nuget packages to your project:

* `Okta.Idx.Sdk`
* `Okta.Sdk.Abstractions`

> **Note:** Nuget packages are pre-release. When you search for Nuget
packages in Visual Studio, ensure that the pre-release check box is selected.

#### 3: Initialize the IdxClient object

All functionality in the SDK is accessed through the methods of the
`IdxClient` object. After you add the Nuget packages, the next step
is to initialize the `IdxClient`. There are two steps to initialize
the client:

1. Add the following namespaces:
   * `Okta.Idx.Sdk`
   * `Okta.Sdk.Abstractions`
1. Initialize the `IdxClient`

See the following sample code for more details:

```csharp
using Okta.Idx.Sdk;
using Okta.Sdk.Abstractions;

var idxAuthClient = new IdxClient();
```

> **Note:** You can pass configuration values into the object's constructor.
See
[Option 3: Add the values as parameters to the SDK's client constructor](/docs/guides/oie-embedded-common-download-setup-app/aspnet/main/#option-3-add-the-values-as-parameters-to-the-sdk-s-client-constructor).
