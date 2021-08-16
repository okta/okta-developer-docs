---
title: Event Hooks with ngrok
excerpt: How to demonstrate Event Hooks using ngrok to expose a local app to the internet.
layout: Guides
---

Intro text

- process?
- process?
- process?

### Install ngrok

The ngrok utility exposes local web servers to the internet, and enables the testing of Okta Event Hooks using a local application, rather than an internet-based production or test external service.

If you already have ngrok installed, move on to the next step! If not, follow the installation instructions at [https://ngrok.com/download](https://ngrok.com/download).

Some installation notes:

- You do not need to have an account to install and run ngrok, but creating a free account provides more features as well as basic authentication.
- You can install ngrok directly in your project folder, as documented from the ngrok download page. Or you can install on your system's path directory to be able to run ngrok from any folder. Alternatively, you can install the executable in your favorite local folder, but you'll need the folder path when referencing the tool.

#### Run ngrok

After installing ngrok, ensure that it's running by creating a "tunnel" into a local port. If you installed directly into your project folder, run the following command in your terminal:

```terminal
> ./ngrok http 8082
```

or if you installed in your system path:

```terminal
> ngrok http 8082
```

or if you used your favorite folder:

```terminal
> ~/applications/ngrok http 8082
```

If you see the following content in your terminal, ngrok is running successfully:

![A screen shot of a terminal that displays an ngrok session status, with online in green. The session status contains urls that tunnel into the local port.](/img/ngrok-and-event-hooks-session-status.png)

See [ngrok](https://ngrok.com) or their [documentation](https://ngrok.com/docs) for further information.

### Create a local application

With ngrok installed, a local application can now function as an external service, and demonstrate the Okta Event Hook (or any Okta Inline Hook). To get you up-and-running quickly, follow the steps below to build a very basic Express Node.js application. This application simply serves up a web page and responds to an Okta Event Hook.

The Event Hook use-case is a simple response to the deactivation of an Okta user, which is also presented in [Event Hook Guide](/docs/guides/event-hook-implementation/overview).

#### Create a folder and initialize the project

1. Create a local folder to hold your sample application and open it. In this example, `sample-app`.

    ```bash
    >sample-app
    ```

1. Initialize a default package to create a `package.json` file.

    ```bash
    >node init --yes
    ```

1. Install the package dependencies, `express`, `express-basic-auth`, and `body-parser`.

    ```bash
    >npm install express
    >npm install express-basic-auth
    >npm install body-parser
    ```

#### Create the index and web server code

1. In the same `sample-app` directory, create an index page as follows, `index.html`, which will be served when running the application:

    ```HTML
    <head>
    <meta charset="utf-8" />
    <title>Simple Test Application</title>
    </head>
    <body>
    <h1>Congratulations, your simple test application is working.</h1>
    <p>See the following links for more information:
    <ul>
        <li><a href="https://developer.okta.com/docs/concepts/event-hooks">Event Hook Concepts</a></li>
        <li><a href="https://developer.okta.com/docs/guides/event-hook-implementation/nodejs/overview/">Event Hook Guides</a></li>
    </ul>
    </p>
    </body>
    </html>
    ```

2. Add the server page, `server.js`, that contains the simple application code and an endpoint for the Okta Event Hook:

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
    app.get("/userDeactivated", (request, response) => {
        var returnValue = {
        "verification": request.headers['x-okta-verification-challenge'],
        };
        response.json(returnValue);
    });

    //userDeactivated Event request, POST from Okta

    app.post("/userDeactivated", (request, response) => {
        console.log(" ");
        console.log('The user ' + request.body.data.events[0].target[0]["displayName"] + " has been deactivated on the Okta org!");
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

1. Navigate to your local port to see the `index.html` page. In this example, `8082`:

    `http://localhost:8082`

If your web page deploys, the simple application is working, and ready for your Event Hook set up.

![A screen shot of the simple application web page that includes a welcome message and links to the Okta Developer documentation.](/img/ngrok-and-event-hooks-simple-app.png)

### Create an Okta Event Hook

Create the Okta Event Hook to work with your local application, which can now be exposed externally. The Event Hook must be set up and verified within your Okta Admin Console.

#### Set up the Event Hook

1. Sign in to your [Okta org](https://login.okta.com/).

2. From the Admin Console, go to **Workflow** > **Event Hooks**.

3. Click **Create Event Hook**. The **Add Event Hook Endpoint** dialog box opens.

4. In the **Name** field, add a unique name for the Hook (in this example, "Deactivated User Event Hook").

5. In the **URL** field, add your external service URL, including endpoint. For this example, use the code endpoint, `/userDeactivated` with the `https://` URL from the ngrok session. For example, your URL should appear similar to: `https://28333dd3ddf3.ngrok.io/userDeactivated`.

6. Include authentication field and secret. In this example, our code uses Basic Authentication:

    - **Authentication field** = `authorization`

    - **Authentication secret** = `Basic YWRtaW46c3VwZXJzZWNyZXQ=`

7. In the **REQUESTS** section of the dialog box, subscribe to the Event Type you want to monitor. In this example, a user deactivated in the Okta org: `User deactivated`.

8. Click **Save & Continue**.

9. You can complete the one-time verification Okta call at this time or verify the Event Hook later. You need to have both your ngrok session and local application running to verify the initial Okta call.

#### Verify the Event Hook

You must verify the Event Hook to prove that your external service controls the endpoint. See [One-Time Verification Request](/docs/concepts/event-hooks/#one-time-verification-request) for further information on this process.

To complete the one-time verification of the Event Hook:

- After creating the Event Hook, and if your ngrok session and local application are ready to handle the request, click **Verify** to complete the one-time verification step.

or

- After making sure that your  ngrok session and local application are ready for the external verification call, go to the Event Hooks table, click the **Actions** drop-down menu of any **UNVERIFIED** Event Hook, and select **Verify**.

The Event Hook is now set up with a status of **VERIFIED** and is ready to send Event Hook calls to your external service.

>**Note:** A successful Event Hook verification also indicates your local application is working with the ngrok session! Review the ngrok terminal for details on the the first `GET` call to your local application.

### Preview, test, and review the Event Hook
