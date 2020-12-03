---
title: Set up and extend the sample Express app
---

The sample Node.js Express application is designed to demonstrate the [Authorization Code flow](/docs/guides/implement-auth-code/overview), and includes an Okta-Hosted-Login server option used in this Token Inline Hook example. Access the code from the following Github repository:

* [https://github.com/okta/samples-nodejs-express-4](https://github.com/okta/samples-nodejs-express-4)

Follow the [README.md](https://github.com/okta/samples-nodejs-express-4/tree/master/okta-hosted-login) instructions to install and run the Okta-Hosted-Login sample application with your Okta org. Make sure to have this application running before proceeding with the Token Inline Hook setup.

Optionally, you can extend the Okta-Hosted Login sample application to display the results of the Token Inline Hook in the application with the following code:

<StackSelector snippet="extend-express"/>

<NextSectionLink/>