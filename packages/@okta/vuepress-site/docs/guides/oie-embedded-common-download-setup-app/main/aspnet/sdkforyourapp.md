> **Note:** Try to [run the embedded SDK sample app](/docs/guides/oie-embedded-common-run-samples/aspnet/main/#run-the-embedded-sdk-sample-app) and explore the available [embedded authentication use cases](/docs/guides/oie-embedded-sdk-use-case-basic-sign-in/aspnet/main/) to get familiar with the SDK before you start to integrate your own embedded .NET app.

Begin to integrate the SDK into your own app by following these steps:

#### 1: Set up your app for .Net 4.8 or greater

The SDK and sample apps are built using .Net 4.8.

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
is to initialize the `IdxClient`. There are two steps to initialize the client:

1. Add the following namespaces:
   * `Okta.Idx.Sdk`
   * `Okta.Sdk.Abstractions`
1. Initialize the `IdxClient`.

See the following sample code for more details:

```csharp
using Okta.Idx.Sdk;
using Okta.Sdk.Abstractions;

var idxAuthClient = new IdxClient();
```

> **Note:** You can pass configuration values into the object's constructor. See [Option 3: Add the values as parameters to the SDK's client constructor](#option-3-add-the-values-as-parameters-to-the-sdk-s-client-constructor).
