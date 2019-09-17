### Install npm package

```bash
$ npm install @okta/okta-react-native --save
$ react-native link @okta/okta-react-native
```

### Install iOS OIDC SDK

1. [**CocoaPods**](https://guides.cocoapods.org/using/getting-started.html)

***React Native >= 0.60***: With React Native 0.60 pods are added to podfile automatically. Run `pod install` command to install dependecies:
```
cd ios
pod install
```
***React Native < 0.60***: Make sure your `Podfile` looks like this:
```   
platform :ios, '11.0'

target '{YourTargetName}' do

pod 'OktaOidc', '~> 3.0'

end
```
Then run `pod install`.

2. [**Carthage**](https://github.com/Carthage/Carthage)
```
github "okta/okta-oidc-ios" ~> 3.5.0
```
Then run `carthage update --platform iOS`.

Open project settings and choose your application target. Then open `Build Phases` and add `OktaOidc.framework` from `ios/Carthage/Build/iOS` into `Embed Frameworks` section

### Install Android OIDC SDK

1. Add this line to `android/build.gradle`, under `allprojects` -> `repositories`.
```
maven {
url  "https://dl.bintray.com/okta/com.okta.android"
}
```

2. Make sure your `minSdkVersion` is `19` in `android/build.gradle`.

3. Add redirect scheme in `android/app/build.gradle`, under `android` -> `defaultConfig`:
```
manifestPlaceholders = [
appAuthRedirectScheme: 'com.sampleapplication'
]
```
