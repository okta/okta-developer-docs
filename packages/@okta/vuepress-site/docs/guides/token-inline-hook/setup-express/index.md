---
title: Set up the sample Express app
---

The sample Node.js Express application is designed to demonstrate the [Authorization Code flow](/docs/guides/implement-auth-code/overview), and includes an Okta-Hosted-Login server option used in this Token Inline Hook example. Access the code from the following Github repository:

* [https://github.com/okta/samples-nodejs-express-4](https://github.com/okta/samples-nodejs-express-4)

Follow the [README.md](https://github.com/okta/samples-nodejs-express-4/tree/master/okta-hosted-login) instructions to install and run the Okta-Hosted-Login sample application with your Okta org. Make sure to have this application running before proceeding with the Token Inline Hook setup.

To run the sample application:

1. Navigate to your project folder (`samples-nodejs-express-4`).

2. Start your Okta-Hosted-Login server (`npm run Okta-Hosted-Login-Server`).

3. Navigate to your sample application (`http:/localhost:8080`).

Make sure you can sign in to your application with one or more users assigned to your application.

<NextSectionLink/>