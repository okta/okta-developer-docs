---
title: SAML Assertion inline hook
excerpt: Learn how to easily implement a SAML Assertion inline hook
layout: Guides
---

This guide provides a working example of an Okta SAML Assertion inline hook. It uses the website [Glitch.com](https://glitch.com) to act as an external service to receive and respond to SAML Assertion inline hook calls.

---

**Learning outcomes**

* Understand the Okta SAML Assertion inline hook calls and responses.
* Implement a simple working example of a SAML Assertion inline hook with a Glitch.com external service.
* Preview and test the SAML Assertion inline hook.

**What you need**

* [Okta Developer Edition organization](https://developer.okta.com/signup/)
* [Glitch.com](https://glitch.com) project or account
* A sample application that uses SAML to implement authentication. This guide works with the application in the Sample code section below.

**Sample code**

* [Okta SAML Assertion Inline Hook Example](https://glitch.com/edit/#!/okta-inlinehook-samlhook)
* [Spring Boot, SAML, and Okta](https://github.com/oktadev/okta-spring-boot-saml-example)

---

## About SAML assertion inline hook implementation

The SAML Assertion Inline Hook can be used to customize the authentication workflow that occurs between an application and the Okta org, which functions as the Identity Provider (IdP).

This guide provides an end-to-end scenario using a SAML-authenticated application and an Okta org, and includes example code for an external service to respond to calls from a SAML Assertion Inline Hook triggered during the authentication workflow.

### The scenario

In the following scenario, the external service code parses a request from Okta, evaluates the user name against a simple patient data store, and, if the user is part of the patient store, responds to Okta with a command to add a patient ID claim to the SAML assertion. If the user name is not part of the data store, no action is taken.

At a high-level, the following workflow occurs:

* A user logs into an application authenticated by SAML, which uses the Okta org as an Identity Provider (IdP).
* The Okta org authenticates the user.
* At this point in the workflow, the Okta SAML Assertion Inline Hook triggers and sends a request to an external service.
* The external service evaluates the request, and if the user is a patient, adds a patient ID claim to the SAML assertion.
* The user is logged in to the application with the additional claim in the SAML assertion.

## Set up the sample SAML-authenticated application

The Spring Boot, SAML, and Okta application is designed to implement signle sign-on (SSO) with Spring Security's SAML and Okta.

Access the Spring Book, SAML, and Okta code from the following Github repository:

[https://github.com/oktadev/okta-spring-boot-saml-example](https://github.com/oktadev/okta-spring-boot-saml-example)

See this developer advocate blog post by Matt Raible, [Get Started with Spring Book and SAML](https://developer.okta.com/blog/2022/08/05/spring-boot-saml) for background and instructions on setting up this application.

Or follow the [README](https://github.com/oktadev/okta-spring-boot-saml-example/blob/main/README.md) instructions to install and run the Spring Boot sample application with your Okta org.

Make sure to have this application running before proceeding with the SAML Assertion inline hook setup.

## Create your external service code

You can now create the external service code that resides on your third-party site (in this example, the Glitch.com site) that receives and responds to the SAML Assertion inline hook call from Okta. The responses to the SAML Assertion inline hook call can customize the SAML assertion in multiple ways, including adding or replacing elements of the assertion. In this example code, a new claim is added to the assertion. For further information on the SAML Assertion commands object and how you can modify the assertion, see the [SAML Assertion Inline Hook reference](/docs/reference/saml-hook) documentation.

The following sections detail the portion of external service code that parses the SAML Assertion inline hook call, checks the data store, and then, if applicable, responds to Okta with a SAML assertion update.

### Parse the SAML Assertion inline hook

The external service in this scenario requires code to handle the SAML Assertion inline hook request from the Okta org. Use the Glitch example to either build or copy the code (re-mix on Glitch) that parses the SAML Assertion inline hook call.

> **Note:** Make sure to have the required default code and packages in your Glitch project. See [Common Hook Set-up Steps](/docs/guides/commong-hook-set-up-steps).

From the SAML Assertion Inline Hook request, the code retrieves the name of the user who is authenticating from the `data.context.user` object.

The following Node.js code parses the Okta request body for the user name and email address, and stores the email address in the variable `patientName`.

```JavaScript
//Inline SAML Hook POST from Okta (endpoint: SAMLHook)

app.post("/SAMLHook", (request, response) => {

  console.log(" ");
  console.log("User email: " + request.body.data.context.user.profile["login"]);
  console.log("Name: " + request.body.data.context.user.profile["firstName"] + " " + request.body.data.context.user.profile["lastName"]);

  var patientName = request.body.data.context.user.profile["login"];

 ...

});
```

### Check against the data store

In this scenario, a pre-populated static array of patient names and patient IDs (patients) is used to simulate a real-world data store. The user email address included with the Okta request is checked against this array. If the user in the request matches a value in the patients array, the associated patient ID is stored as a variable, `patientID`.

> **Note:** Modify this data store to make sure it contains one or more names that are assigned to your application in your Okta org.

The following Node.js code checks the user name against the data store:

```JavaScript
// Example Patients Data Store

const patients = [
  {
    username: 'michelle.test@example.com',
    ExternalServicePatientID: '1235',
  },
  {
    username: 'bob.uncle@example.com',
     ExternalServicePatientID: '6789',
  },
    {
    username: 'mark.christie@example.com',
     ExternalServicePatientID: '4235',
  },

  ]

//Inline SAML Hook POST from Okta (endpoint: SAMLHook)

app.post("/SAMLHook", (request, response) => {

  console.log(" ");
  console.log("User email: " + request.body.data.context.user.profile["login"]);
  console.log("Name: " + request.body.data.context.user.profile["firstName"] + " " + request.body.data.context.user.profile["lastName"]);

  var patientName = request.body.data.context.user.profile["login"];

  if (patients.some(user => user.username == patientName)){

    const arrayPosition = patients.findIndex(user => user.username == patientName);
    const patientID = patients[arrayPosition].ExternalServicePatientID;

    ...

  }
});

```

### Send a response to Okta

The variable, `patientID`, can now be returned to Okta as an additional SAML assertion claim using the commands object. For further information on the SAML Assertion commands object, see the [SAML Assertion Inline Hook reference](/docs/reference/saml-hook) documentation.

The following Node.js code returns the response to Okta and completes the sample code:

```JavaScript
//Inline SAML Hook POST from Okta (endpoint: SAMLHook)

app.post("/SAMLHook", (request, response) => {

  console.log(" ");
  console.log("User email: " + request.body.data.context.user.profile["login"]);
  console.log("Name: " + request.body.data.context.user.profile["firstName"] + " " + request.body.data.context.user.profile["lastName"]);

  var patientName = request.body.data.context.user.profile["login"];

  if (patients.some(user => user.username == patientName)){

    const arrayPosition = patients.findIndex(user => user.username == patientName);
    const patientID = patients[arrayPosition].ExternalServicePatientID;

    var returnValue = { "commands":[
                          { "type":"com.okta.assertion.patch",
                            "value": [
                                {
                                  "op": "add",
                                  "path": "/claims/extPatientId",
                                  "value": {
                                      //"attributes": {
                                      //"NameFormat": "urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified"    
                                      //  },
                                       "attributeValues":[
                                       {
                                       //"attributes": {
                                       //  "xsi:type": "xs:integer"
                                       //},
                                        "value": patientID,
                                       }
                                       ]
                                  }
                                }
                            ]
                          }
                      ]
                    }

  console.log("Added patient ID claim to SAML assertion: " + returnValue.commands[0].value[0].value.attributeValues[0]["value"]);

  response.send(JSON.stringify(returnValue));
  }
  else {

  console.log("Not a patient. No change to SAML assertion.");
  response.status(204).send();
  }

}
);
```

## Activate and enable the SAML Assertion inline hook

The SAML Assertion inline hook must be activated and enabled within your Okta Admin Console.

Activating the SAML Assertion inline hook registers the hook with the Okta org and associates it with your external service. Enabling the SAML Assertion inline hook associates the hook with your SAML application.

To set up and activate the SAML Assertion Inline Hook:

1. Navigate to the **Workflow** > **Inline Hooks** page.

1. Click **Add Inline Hook** and select **SAML** from the dropdown menu.

1. Add a name for the hook (in this example, "Patient SAML Hook").

1. Add your external service URL, including the endpoint. For example, use your Glitch project name with the endpoint: `https://your-glitch-projectname.glitch.me/SAMLHook`.

1. Include authentication field and secret. In this example:

* **Authentication field** = `authorization`
* **Authentication secret** = `Basic YWRtaW46c3VwZXJzZWNyZXQ=`

1. Click Save.

The SAML Assertion Inline Hook is now set up with a status of active.

To enable the SAML Assertion Inline Hook:

1. Navigate to **Applications** and select your SAML application (in this example, "Spring Book SAML").

1. Click the **General** tab.

1. From the **SAML Settings** tile, click **Edit**.

1. Click **Next** to get to the **Configure SAML** tab.

1. From the **SAML Settings, General** heading, click **Show Advanced Settings**.

1. In the **Assertion Inline Hook** field, select your registered Inline Hook from the dropdown menu (in this example, "Patient SAML Hook").

The SAML Assertion Inline Hook is now ready for triggering when a user authenticates through the SAML application.

## Preview and test the SAML Assertion inline hook

The SAML Assertion Inline Hook is ready for preview and testing. You now have the following applications configured:

* The SAML application (okta-spring-boot-saml-example) is ready to sign in and authenticate users using your Okta org as an IdP.
* The external service (okta-inlinehook-samlhook) is ready with code to receive and respond to an Okta SAML Assertion Inline Hook call.
* The Okta org is setup to call the external service when a SAML Assertion Inline Hook is triggered by a user sign-in from the SAML application, and is ready to receive a response.

### Preview the SAML Assertion inline hook

1. Navigate to Inline Hooks (**Workflow** > **Inline Hooks**) in your Admin Console.

1. Click on the SAML Assertion Inline Hook name (in this example, "Patient SAML Hook").

1. Click the **Preview** tab.

1. Select a user assigned to your SAML application in the first block titled **Configure Inline Hook request**; that is, a value for the `data.userProfile` field.

1. Select your SAML Application by searching in the **Select a SAML app** field (in this example, "Spring Book SAML").

1. From the Preview example Inline Hook request" block, click Generate Request. You should see the user's request information in JSON format that is sent to the external service.

> **Note:** You can also Edit this call for development or testing purposes.

1. From the **View service's response** block, click **View Response**. You will see the response from your external service in JSON format, which either adds a claim to the SAML assertion or not.

### Test the SAML Assertion inline hook

1. Start your SAML Application by navigating to your project folder (`okta-spring-boo-saml-example >`) and then running the application (`> ./gradlew bootRun`).

1. Navigate to your sample application (`http:/localhost:8080`).

1. Navigate to your Glitch.com project to make sure it's listening for requests; open the Console Logs window (**Tools > Logs**).

1. Return to your SAML application and sign in with an Okta user who is NOT in the Patients data store.

The user should sign in as normal with first name, last name, and email attributes displaying on the sign-in page. In the Glitch log window a message that the user is not part of the data store appears.

1. Sign out of the sample application and now sign in with an Okta user who IS in the Patients data store.

The user should sign in as normal and also displays a patient ID attribute on the sign-in page, as well as first name, last name, and email address. In the Glitch log window a message displays the patient ID number added to the SAML assertion appears.

## Next steps

Review the following guides to implement other inline or event hook examples:

* [Event hook](/docs/guides/event-hook-implementation)
* [Password import inline hook](/docs/guides/password-import-inline-hook/)
* [Token inline hook](/docs/guides/token-inline-hook)
* [Telephony inline hook](/docs/guides/telephony-inline-hook)

## See also

For a complete description of this inline hook type, see [SAML Assertion inline hook](/docs/reference/saml-hook) reference.
