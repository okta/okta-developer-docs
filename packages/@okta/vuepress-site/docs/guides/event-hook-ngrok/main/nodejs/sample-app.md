
To get you up-and-running quickly, follow the steps below to build a very basic Express Node.js application. This application serves up a web page and responds to Okta Event Hook calls.

The Event Hook use case is a simple local application response to the addition of a new Okta user.

### Create a folder and initialize the project

1. Create a local folder to hold your sample application and open it. In this example, `sample-app`.

    ```bash
    >sample-app
    ```

1. Initialize a default `package.json` file. Accept the default values for all questions after running the command.

    ```bash
    >npm init --yes
    ```

1. Install the package dependencies, `express`, `express-basic-auth`, and `body-parser`.

    ```bash
    >npm install express
    >npm install express-basic-auth
    >npm install body-parser
    ```

### Create the index and web server code

1. In the same `sample-app` directory, create an index page, `index.html`, as follows, which launches when running the application:

    ```HTML
    <html>
    <head>
    <meta charset="utf-8" />
    <title>Simple Test Application</title>
    </head>
    <body>
    <h1>Congratulations, your simple test application is working.</h1>
    <p>See the following links for more information:
    <ul>
        <li><a href="https://developer.okta.com/docs/concepts/event-hooks">
        Event Hook Concepts</a></li>
        <li><a href="https://developer.okta.com/docs/guides/event-hook-implementation/">
        Event Hook Guides</a></li>
    </ul>
    </p>
    </body>
    </html>
    ```

2. Add the server page, `server.js`, that contains the simple application code and an
   endpoint for the Okta Event Hook:

    ```JavaScript
    var express = require('express');
    var app = express();

    var bodyParser = require("body-parser");
    app.use(bodyParser.json());


    app.get('/', function (request, response) {
        response.sendFile(__dirname + '/index.html');
    });

    //Basic Auth
    var basicAuth = require('express-basic-auth');
    app.use(basicAuth({
    users: { 'admin': 'supersecret' },
    unauthorizedResponse: req => 'Unauthorized'
    }));


    // Event Hook Initial Verification
    // Extract header 'x-okta-verification-challenge' from Okta request
    // Return value as JSON object verification
    app.get("/userCreated", (request, response) => {
        var returnValue = {
        "verification": request.headers['x-okta-verification-challenge'],
        };
        response.json(returnValue);
    });

    //userCreated Event request, POST from Okta

    app.post("/userCreated", (request, response) => {
        console.log(" ");
        console.log('The user ' + request.body.data.events[0].target[0]["alternateId"] +
        " has been added to the Okta org!");
        response.sendStatus(200);
        }
    );

    var server = app.listen(8082, function () {
        console.log('Node server is running on http://localhost:8082');
    });
    ```

### Run the sample application

1. From the project directory:

    ```bash
    >node server.js
    ```

1. From your browser, navigate to your local port, in this example `8082`, to see the `index.html` page:

    `http://localhost:8082`

If your web page deploys, the simple application is working, and ready for your Event Hook set up.

![A screen shot of the simple application web page that includes a welcome message and links to the Okta Developer documentation.](/img/ngrok-and-event-hooks-simple-app.png)