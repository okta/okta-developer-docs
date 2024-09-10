### Download the sample Angular application

To view a simple example of an Angular application, clone the Okta Angular Identity Engine sample app and follow the setup procedure:

#### Clone the Angular sample repository

Clone the Okta Angular sample app repository and navigate to the top-level folder.

```bash
git clone git@github.com:okta-samples/okta-angular-oie-sample-quickstart.git
cd okta-angular-oie-sample-quickstart
```

#### Install the dependencies

Install the dependencies in the `okta-angular-oie-sample-quickstart` folder:

```bash
npm ci
```

#### Update the application configuration file

Update the configuration file of the Okta sample application (`src/app/okta-config.ts `) in the project root folder. The `okta-config.ts` file contains the configuration values for your Okta app integration. See [Create an app integration](#create-an-app-integration) for details on these values.

```javascript
const oidcConfig = {
  clientId: '{clientId}',
  issuer: 'https://{yourOktaDomain}/oauth2/default',
  scopes: ['openid', 'profile', 'email'],
  pkce: true
};
```

#### Run the sample application

Navigate to the project folder and run the sample application.

```bash
cd okta-angular-oie-sample-quickstart
npm start
```

Open a new browser and navigate to the default local host port (`http://localhost:4200`). Click **Login** and sign in with a user from your Okta org. After a successful authentication, the user's ID token appears on the page.

### Create an Angular app (optional)

To create an Angular app, open a terminal and install the Angular CLI:

```bash
npm install -g @angular/cli
```

Now, create an app using the Angular CLI:

```bash
ng new okta-app
```

When asked `Would you like to add Angular routing?`, press **y**.

After all prompts are answered, the Angular CLI creates a project in a folder named `okta-app` and installs all required dependencies.

```bash
cd okta-app
```

Install the [Okta Auth SDK](https://github.com/okta/okta-auth-js) using `npm`:

```bash
npm install @okta/okta-auth-js
