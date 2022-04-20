After you satisfy the software requirements, clone the [Okta Auth JavaScript SDK](https://github.com/okta/okta-auth-js) repository to your local directory.

```shell
git clone https://github.com/okta/okta-auth-js.git
cd okta-auth-js/samples/generated/express-embedded-sign-in-widget
```

The source code from the sample app and SDK are located in the `.../okta-auth-js/` repository directory. The project structure consists of:

* `okta-auth-js/docs/idx.md`&mdash; Identity Engine introduction and reference
* `okta-auth-js/samples/generated` &mdash; samples directory
* `okta-auth-js/samples/generated/express-embedded-auth-with-sdk` &mdash; embedded SDK sample
* `okta-auth-js/samples/generated/express-embedded-sign-in-widget` &mdash; embedded Sign-In Widget sample

### Install the module dependencies

The sample applications require the installation of the module dependencies listed in the `package.json` at the sample root.

1. Navigate to a sample application root folder. For example, `okta-auth-js/samples/generated/express-embedded-sign-in-widget`.

2. Install the dependencies: `npm install`.
