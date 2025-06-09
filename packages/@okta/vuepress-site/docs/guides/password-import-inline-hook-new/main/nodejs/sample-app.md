
1. Create a local folder to hold your sample application and open it. In this example, `sample-app`.

    ```bash
    >sample-app
    ```

1. Initialize a default `package.json` file. Accept the default values for all questions after running the command.

    ```bash
    >npm init --yes
    ```

1. Install the package dependencies, `express`, `express-basic-auth`, and `dotenv`.

    ```bash
    >npm install express
    >npm install express-basic-auth
    >npm install dotenv
    ```

1. In your `sample-app` folder, add a `.env` file to store the username and password used by the Okta hook call for Basic authentication. Add the following variables and values:

``bash
BASIC_AUTH_USER=admin
BASIC_AUTH_PASSWORD=supersecret
``
