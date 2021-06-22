#### Step 1: Set up your app for .Net 4.8 or greater

The SDK and samples are built using .Net 4.8.

#### Step 2: Add the Okta SDK Nuget Packages

Before using the SDK into your own app, you need to add the following
Nuget Packages to your project:

* Okta.Idx.Sdk
* Okta.Sdk.Abstractions

> **Note:** Nuget packages are pre-release.  When you search for Nuget
packages in Visual Studio, ensure that the pre-release checkbox is selected.

#### Step 3: Initialize IdxClient

All functionality in the SDK is accessed via the methods of the
`IdxClient` object. Once you add the Nuget Packages, the next step
is to initialize the IdxClient.  There are two steps to initialize
the client:

1. Add the following namespaces:
   1. **Okta.Idx.Sdk**
   1. **Okta.Sdk.Abstractions**
1. Initialize the IdxClient

See sample code below for more details:

```csharp
using Okta.Idx.Sdk;
using Okta.Sdk.Abstractions;

var idxAuthClient = new IdxClient();
```

Note that configuration values can be passed into the object’s constructor.
See
[Option 3: Add parameter to the SDK’s client constructor](/docs/guides/oie-embedded-common-download-setup-app/aspnet/main/#option-3-add-parameter-to-the-sdk-s-client-constructor)
for more information.
