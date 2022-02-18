### Download the sample React application

To view a simple example of a React application, clone the Auth JS and follow the simple set up procedures:

#### Clone the Auth JS repo

Clone the Auth JS repository and navigate to the React application folder.

```bash
git clone https://github.com/okta/okta-auth-js.git
cd okta-auth-js/test/apps/react-oie
```

#### Install the dependencies

Install the dependencies in the project folder:

```bash
npm install
```

#### Add  a configuration file

Create and add a configuration file, `testenv`, to the `test` root folder, which contains the configuration values for your Okta app integration. See [Create an app integration](#create-an-app-integration) for details on these values.

```txt
ISSUER=https://${Okta-Domain}/oauth2/default
CLIENT_ID=0oa3uruw74K8gQclT5d7
USE_INTERACTION_CODE=true
```

#### Run the sample application

Run the sample application and sign in with a user from your Okta org. After a successful authentication, the user's access token appears on the page



### Create a new React app (optional)

If you don't have an existing React app, you can quickly create a new app by using [Create React App](https://create-react-app.dev/):

```bash
npx create-react-app okta-app
```

Go into your root app directory to view the created files:

```bash
cd okta-app
```

### Install dependencies

Add the [latest version of Okta Auth JS](https://github.com/okta/okta-auth-js/releases) (`@okta/okta-auth-js`), the [latest version Okta React SDK](https://github.com/okta/okta-React/releases)(`@okta/okta-react`), and the `react-router-dom` libraries to your React app. You can install them by using `npm` from your root app directory:

```bash
npm install @okta/okta-auth-js@latest
npm install @okta/okta-react@latest
npm install react-router-dom@v5.2.0 
```
