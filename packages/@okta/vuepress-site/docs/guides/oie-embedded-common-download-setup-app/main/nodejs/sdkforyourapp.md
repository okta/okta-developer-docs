> **Note:** Try to [run the embedded SDK sample app](/docs/guides/oie-embedded-common-run-samples/nodejs/main/#run-the-embedded-sdk-sample-app) and explore the available [embedded authentication use cases](/docs/guides/oie-embedded-sdk-use-case-basic-sign-in/nodejs/main/) to get familiar with the SDK before you start to integrate your own embedded Node.js app.

Begin to integrate the SDK into your own app by following these steps:

#### 1: Install the SDK into your project application

Download and install the SDK into your Express application. See [Getting Started](https://github.com/okta/okta-auth-js#getting-started) in the Okta Auth JS repository.

#### 2: Install the @okta/okta-auth-js node dependency

Before using the SDK in your own app, you need to add the Okta Auth JS node dependency.

```shell
npm install --save @okta/okta-auth-js
```

See [Using the npm module](https://github.com/okta/okta-auth-js#using-the-npm-module) for more information.

#### Step 3: Review the Identity Engine SDK methods

Start integrating your app using the SDK by reviewing the Identity Engine Auth JS SDK methods. See [Usage](https://github.com/okta/okta-auth-js/blob/master/docs/idx.md#usage) for further information.

Before running your app, ensure that you [set the configuration values](#set-the-configuration-values) for your embedded app with one of the available options.
