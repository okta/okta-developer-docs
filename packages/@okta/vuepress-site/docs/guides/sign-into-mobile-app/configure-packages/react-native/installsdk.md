### Install npm package

```bash
$ npm install @okta/okta-react-native --save
```

### Install iOS OIDC SDK

[**CocoaPods**](https://guides.cocoapods.org/using/getting-started.html)

Run the `pod install` command to install dependencies:
```
cd ios
pod install
```

### Install Android OIDC SDK

1. Make sure that your `minSdkVersion` is `19` in `android/build.gradle`.

2. Add the redirect scheme in `android/app/build.gradle`, under `android` -> `defaultConfig`:
```
manifestPlaceholders = [
appAuthRedirectScheme: "{com.sampleapplication}"
]
```
