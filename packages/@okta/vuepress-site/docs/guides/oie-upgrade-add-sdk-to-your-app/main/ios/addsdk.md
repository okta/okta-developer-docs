After you upgrade your app to the minimum requirements, use one of the following methods to add the SDK to your app:

### Install using Swift Package Manager

Add the following dependency to your `Package.swift` file. You can select the version using the `majorVersion` and `minor` parameters. For example:

 ```swift
dependencies: [
    .Package(url: "https://github.com/okta/okta-idx-swift.git", majorVersion: <majorVersion>, minor: <minor>)
```

### Install dependency using CocoaPods

Set up the Podfile with the Okta IDX SDK dependency and run `pod install`.
