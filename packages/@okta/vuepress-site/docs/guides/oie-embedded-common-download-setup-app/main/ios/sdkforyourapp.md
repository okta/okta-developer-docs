> **Note:** [Run the embedded SDK sample app](/docs/guides/oie-embedded-common-run-samples/ios/main/#run-the-embedded-sdk-sample-app) and explore the available [iOS use cases](/docs/guides/oie-embedded-sdk-use-case-basic-sign-in/ios/main/) to get familiar with the SDK before you start to integrate your own embedded iOS app.

<EmbeddedBrowserWarning />

Begin to integrate the SDK into your own app by following these steps:

#### 1: Add the package dependency

Add the following code to the `dependencies` attribute defined in your `Package.swift` file.
You can select the version using the `majorVersion` and `minor` parameters. For example:

```swift
dependencies: [
    .Package(url: "https://github.com/okta/okta-idx-swift.git", majorVersion: <majorVersion>, minor: <minor>)
]
```

#### 2: Import the OktaIdx namespace

Import the `OktaIdx` framework.

```swift
import OktaIdx
```

#### 3: Initialize the IdxClient object

Initialize the `IDXClient` with the`start` static method.

```swift
IDXClient.start(with: configuration) { (client, error) in
    guard let client = client else {
        // Handle the error
        return
    }
}
```

Before running your app, ensure that you [set the configuration values](#set-the-configuration-values) for your embedded app.
