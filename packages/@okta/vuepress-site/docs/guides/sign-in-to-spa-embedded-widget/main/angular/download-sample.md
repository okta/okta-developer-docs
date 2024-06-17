1. In your project folder, download the sample application from the GitHub repository and navigate to the custom-login folder.

    ```bash
    git clone https://github.com/okta/samples-js-angular.git
    cd samples-js-angular/custom-login
    ```

1. In the `custom-login` folder, install the dependencies:

    ```bash
    npm install
    ```

1. Ensure that you're using the angular version and node version designed for this sample application.

    ```bash
    node --version
    ```

    ```bash
    ng --version
    ```

1. Install the following version of `okta-auth-js` SDK:

    ```bash
    npm install @okta/okta-auth-js@5.9.1
    ```

1. Navigate to the `samples-js-angular` folder and create a configuration file called`testenv` (no extension).

    >**Note:** You may need to install the `dotenv` package if not already installed (`npm install dotenv`).

1. Populate the `testenv` file with the following parameters and values from your app integration created in the previous section:

    ```txt
    ISSUER=https:////{yourOktaDomain.com}/oauth2/default
    CLIENT_ID={Client ID value from app integration}
    USE_INTERACTION_CODE=true
    ```
