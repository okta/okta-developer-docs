#### Step 1: Add package dependency

Add the following code to the `dependencies` attribute defined in your `Package.swift` file.
You can select the version using the `majorVersion` and `minor` parameters. For example:

```swift
dependencies: [
    .Package(url: "https://github.com/okta/okta-idx-swift.git", majorVersion: <majorVersion>, minor: <minor>)
]
```

#### Step 2: Import OktaIdx namespace

Import the `OktaIdx` namespace.

```swift
import OktaIdx
```

#### Step 3: Initialize IdxClient

Initialize the `IDXClient` with the`start` static method.

```swift
IDXClient.start(with: configuration) { (client, error) in
    guard let client = client else {
        // Handle the error
        return
    }
}
```
