### Download the sample React application

To view a simple example of a React application, clone the Auth JS repository and follow the setup procedure:

#### Clone the Auth JS repository

Clone the Auth JS repository and navigate to the top-level folder.

```bash
git clone https://github.com/okta/okta-auth-js.git
cd okta-auth-js
```

#### Install the dependencies

Install the dependencies in the `okta-auth-js` folder:

```bash
yarn install
```

#### Add a configuration file

Create and add a configuration file (`testenv`) to the `okta-auth-js` root folder. The `testenv` file contains the configuration values for your Okta app integration. See [Create an Okta app integration](#create-an-okta-app-integration) for details on these values.

```txt
ISSUER=https://{yourOktaDomain}/oauth2/default
CLIENT_ID={clientId}
USE_INTERACTION_CODE=true
```

#### Run the sample application

Navigate to the project folder and run the sample application. Click **Login** and sign in with a user from your Okta org. After a successful authentication, the user's access token appears on the page.

```bash
cd okta-auth-js/test/apps/react-oie
yarn start
```

### Create a React app (optional)

If you don't have an existing React app, you can quickly create an app by using [Create React App](https://create-react-app.dev/):

```bash
npx create-react-app okta-app
```

Go into your root app directory to view the created files:

```bash
cd okta-app
```

### Install dependencies

Add the following dependencies to your React app:

* The [latest version of Okta Auth JS](https://github.com/okta/okta-auth-js/releases), `@okta/okta-auth-js`

* The [latest version Okta React SDK](https://github.com/okta/okta-React/releases), `@okta/okta-react`

* The `react-router-dom` libraries.

And install the dependencies using a package manager in your root app directory:

```bash
npm install @okta/okta-auth-js@latest
npm install @okta/okta-react@latest
npm install react-router-dom@5
```

> **Note:** The sample code in this use case requires `react-router-dom` version 5.x. Certain objects used in the sample code don't exist in `reactor-router-dom` version 6.x.
