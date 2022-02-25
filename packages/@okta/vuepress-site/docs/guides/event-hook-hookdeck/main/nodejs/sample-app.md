Download the sample application, [nodejs-webhook-server-example](https://github.com/hookdeck/nodejs-webhook-server-example) from the Hookdeck GitHub repository. This sample app provides a basic Express Node.js application that responds to Okta Event Hook calls.

The Event Hook use case is to print the body of an Event Hook call to the application console, which is triggered with the addition of a new user in the Okta org.

You can also modify an existing local application. Make sure to note the server port number of your local server and ensure that there is an endpoint to receive event hooks.

### Clone the Hookdeck application

1. Run the following command to clone the Hookdeck repository.

    ```bash
    git clone https://github.com/hookdeck/nodejs-webhook-server-example.git
    ```

1. Navigate to the root of the project folder and install the required dependencies.

    ```bash
    cd nodejs-webhook-server-example
    npm install
    ```

1. Review the `routes.js` file. This file contains the endpoint that receives Okta's response, `/okta-webhooks-endpoint`, and prints the response body to the application console.

    ```JavaScript
    router.post("/okta-webhooks-endpoint", function(req, res) {
    console.log(req.body);
    res.send("Okta Event hook Successfully received");
    });
    ```

### Run the sample application

1. From the project directory:

    ```bash
    npm start
    ```

The console displays the message `Server running on localhost: 1337`.

>**Note:** The port number may be different based on your local configurations.
