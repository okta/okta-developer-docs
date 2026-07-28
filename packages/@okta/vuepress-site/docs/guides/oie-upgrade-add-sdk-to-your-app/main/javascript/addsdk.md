You install or upgrade the Identity Engine SDK to your application by downloading the latest version of the Okta Authentication JavaScript SDK (`okta-auth-js`). The latest SDK contains libraries for both Classic Engine Authentication and Identity Engine.

Use a package manager (npm or yarn) to install the latest version of the Auth JS SDK for your applications:

```bash
npm install @okta/okta-auth-js@latest
```

Because a browser-based app calls your Okta org directly, register your app's origin as a trusted origin in your org. See [Grant cross-origin access to websites](/docs/guides/enable-cors/main/#grant-cross-origin-access-to-websites).
