>**Note:** Before you start to integrate your own embedded React app, [run the embedded SDK sample app](/docs/guides/oie-embedded-common-run-samples/react/main/#run-the-embedded-sdk-sample-app) and explore the available [embedded authentication use cases](/docs/guides/pwd-optional-new-sign-up-email/react/main/) to get familiar with the SDK.

Integrate the SDK into your own app by following these steps:

#### 1: Install Okta Auth JS

Install the SDK in your application by using npm or yarn.

```shell
# Run this command in your project root folder.
# yarn
yarn add @okta/okta-auth-js

# npm
npm install --save @okta/okta-auth-js
```

#### 2: Set the configuration settings

Set the SDK's configurations values described in [Set the configuration values](#set-the-configuration-values).

#### 3: Initialize the SDK

```javascript
const oktaAuth = new OktaAuth({
  // config
})
```

#### 4: Review the SDK methods

Start integrating your app using the SDK by reviewing the Identity Engine Auth JS SDK methods. See [Usage](https://github.com/okta/okta-auth-js/blob/master/docs/idx.md#usage) for further information.

>**Note:** For additional details setting up the SDK, see the [npm Get Started guide](https://www.npmjs.com/package/@okta/okta-auth-js#getting-started) and the SDK's yarn [site](https://yarnpkg.com/package/@okta/okta-auth-js).
