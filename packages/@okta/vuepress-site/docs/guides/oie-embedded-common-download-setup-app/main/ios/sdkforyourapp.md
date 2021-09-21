After you run the sample app and explore its available use cases, you can begin to integrate the SDK and/or the widget into your own app. To get started, follow these steps:

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
