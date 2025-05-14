---
title: Registration inline hook
excerpt: Code an external service for a registration inline hook
layout: Guides
---

<ApiLifecycle access="ie" />

This guide provides examples of an Okta registration inline hook for profile enrollment (self-service registration) and progressive profile enrollments. It uses the web site [Glitch.com](https://glitch.com). Glitch acts as an external service to receive and respond to registration inline hook calls.

The sample project provides external code for three registration inline hook use cases:

* A simple profile enrollment (self-service registration)
* Progressive profile enrollment updates
* Profile enrollment and progressive profile enrollments together

> **Note:** This document is only for Identity Engine. If you're using Classic Engine, see [Registration inline hook for Classic Engine](/docs/guides/archive-registration-inline-hook/nodejs/main/). See [Identify your Okta solution](https://help.okta.com/okta_help.htm?type=oie&id=ext-oie-version) to determine your Okta version.

---

#### Learning outcomes

* Understand the Okta inline hook calls and responses for profile enrollment (SSR) and progressive profile enrollment.
* Implement examples of a registration inline hook with a Glitch.com project.
* Preview and test a registration inline hook for profile enrollment (SSR) and progressive profile enrollment.

#### What you need

* [Okta Integrator Free Plan organization](https://developer.okta.com/signup/)
* [Glitch.com](https://glitch.com) project or account
* [A user profile policy](https://help.okta.com/okta_help.htm?type=oie&id=ext-create-profile-enrollment)

#### Sample code

[Okta Registration Inline Hook Example](https://glitch.com/edit/#!/okta-inlinehook-registrationhook-oie)

---

## About registration inline hook implementation

In the following examples, the external service code parses requests from Okta and responds with commands that indicate the following:

* Whether the end user's email domain is valid and allowed to register (for profile enrollment)
* Whether the end user's employee number is valid and allowed to be added to their profile (for progressive profile enrollment)

In these examples, you set up your registration inline hook to handle either the simple profile enrollment (SSR) scenario, progressive profile enrollment scenario, or both.

You configure a user profile policy to define these scenarios and implement the registration hook. The registration hook customizes how to add users to your Okta org. The hook also customizes how to update the profiles of existing users.

The following is a high-level workflow for the profile enrollment (self-service registration) scenario:

1. An end user attempts to self-register with your Okta org.
1. A registration inline hook triggers during this process and sends a call to the external service with the end user's data.
1. The external service evaluates the Okta call to ensure that the end user is from the domain `okta.com`.
1. The external service responds to Okta with a command to allow or deny the registration based on the email domain.

The following is a high-level workflow for a progressive profile enrollment scenario:

1. An existing registered end user attempts to sign in to their profile.
1. A user profile policy presents a custom sign-in form that asks for extra data from the end user.
1. A registration inline hook triggers during this process and sends a call to the external service with the end user's data.
1. The external service responds to Okta with a command to allow or deny the addition of the new data to the end user's profile.

## Profile enrollment (self-service registration) requests

The following is an example of a JSON request received from Okta. The request properties contain data submitted by the end user who is trying to self-register.

See the [request properties](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/InlineHook/#tag/InlineHook/operation/create-registration-hook) of a registration inline hook for full details.

>**Note:** The `requestType` is `self.service.registration`.

```json
{
    "eventId": "04Dmt8BcT_aEgM",
    "eventTime": "2022-04-25T17:35:27.000Z",
    "eventType": "com.okta.user.pre-registration",
    "eventTypeVersion": "1.0",
    "contentType": "application/json",
    "cloudEventVersion": "0.1",
    "source": "regt4qeBKU29vSoPz0g3",
    "requestType": "self.service.registration",
    "data": {
        "context": {
            "request": {
                "method": "POST",
                "ipAddress": "127.0.0.1",
                "id": "123dummyId456",
                "url": {
                    "value": "/idp/idx/enroll/new"
                }
            }
        },
        "userProfile": {
            "firstName": "Rosario",
            "lastName": "Jones",
            "login": "rosario.jones@example.com",
            "email": "rosario.jones@example.com"
        },
        "action": "ALLOW"
    }
}
```

## Progressive profile enrollment requests

The following JSON example provides the end user's profile data to the external service for evaluation.

See the [request properties](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/InlineHook/#tag/InlineHook/operation/create-registration-hook) of a registration inline hook for full details.

>**Note:** The `requestType` is `progressive.profile`.

```json
{
    "eventId": "vzYp_zMwQu2htIWRbNJdfw",
    "eventTime": "2022-04-25T04:04:41.000Z",
    "eventType": "com.okta.user.pre-registration",
    "eventTypeVersion": "1.0",
    "contentType": "application/json",
    "cloudEventVersion": "0.1",
    "source": "regt4qeBKU29vS",
    "requestType": "progressive.profile",
    "data": {
        "context": {
            "request": {
                "method": "POST",
                "ipAddress": "127.0.0.1",
                "id": "123dummyId456",
                "url": {
                    "value": "/idp/idx/enroll/update"
                }
            },
            "user": {
                "passwordChanged": "2022-01-01T00:00:00.000Z",
                "_links": {
                    "groups": {
                        "href": "/api/v1/users/00u48gwcu01WxvNol0g7/groups"
                    },
                    "factors": {
                        "href": "/api/v1/users/00u48gwcu01WxvNol0g7/factors"
                    }
                },
                "profile": {
                    "firstName": "Rosario",
                    "lastName": "Jones",
                    "timeZone": "America/Los_Angeles",
                    "login": "rosario.jones@example.com",
                    "locale": "en_US"
                },
                "id": "00u48gwcu01WxvNo"
            }
        },
        "action": "ALLOW",
        "userProfileUpdate": {
            "employeeNumber": "1234"
        }
    }
}
```

## Set up for profile enrollment (SSR) scenario

This profile enrollment scenario (self-service registration) involves new users self-registering from the **Sign up** link. The users sign up with the default three sign-up fields (**Email**, **First name**, and **Last name**). With this use case, the registration inline hook triggers and evaluates the domain in the Email field. If the domain is from `okta.com`, the user can register. If not, the user is denied registration. Follow these steps to implement this scenario:

<StackSnippet snippet="introbullets"/><br>

<HookCommonSetupNote/>

<HookBasicAuthValuesNote/>

### Set up your external service code response for profile enrollment

Remix your own version of the Okta sample Glitch project and confirm that it's live.

1. Go to the [Okta Registration Inline Hook Example](https://glitch.com/edit/#!/okta-inlinehook-registrationhook-oie).
1. Click **Remix your own** and click **Share**.
1. Click the copy icon in the **Live site** field. This is your external service URL. Make a note of it as you need it later.
1. Click **Logs**. If you see the following message, "Your app is listening on port {XXXX}", the app is live and ready to receive Okta requests.

In the following code, the external service responds to Okta indicating whether to accept the end user's self-registration. The response returns a `commands` object in the body of the HTTPS response. This object contains specific syntax that indicates whether the user is allowed or denied self-registration.

<StackSnippet snippet="response-properties"/>

```javascript
app.post('/registrationHookSSR', async (request, response) => {
  console.log();
  console.log("Type of Okta registration hook request: " + request.body.requestType); // confirms the type of Okta request
  var returnValue = {};

  if (request.body.requestType === 'self.service.registration') {
    var emailRegistration = (request.body.data.userProfile['login']).split('@');
    if (emailRegistration[1].includes('okta.com')) {
      console.log(request.body.data.userProfile['firstName'] + " " + request.body.data.userProfile['lastName'] + " " + request.body.data.userProfile['email'] + " has registered!");
      returnValue = {
        'commands':[
          {
            type: 'com.okta.action.update',
            value: {
              'registration': 'ALLOW',
            }
          }
        ]
      };
    } else {
      console.log(request.body.data.userProfile['firstName'] + " " + request.body.data.userProfile['lastName'] + " " + request.body.data.userProfile['email'] + " denied registration!");
        returnValue = {
        'commands':[
          {
            type: 'com.okta.action.update',
            value: {
              'registration': 'DENY',
            },
          }
        ],
        'error': {
          'errorSummary':'Incorrect email address. Please contact your admin.',
          'errorCauses':[{
            'errorSummary':'Only okta.com emails can register.',
            'reason':'INVALID_EMAIL_DOMAIN',
            'locationType':'body',
            'location':'data.userProfile.email',
            'domain':'end-user'
          }]
        }
      };
    }
  }

 response.status(200).send(JSON.stringify(returnValue));
})
```

### Add your registration hook for profile enrollment

Configure your registration inline hook for your Okta org to use the Glitch project for profile enrollment (SSR).

1. In the Admin Console, go to **Workflow** > **Inline Hooks**.
1. Click **Add Inline Hook** and select **Registration** from the dropdown menu.
1. Add a name for the hook (in this example, use "Profile Enrollment SSR").
1. Add your external service URL (see [Set up your Glitch project](#set-up-your-glitch-project)), and append it with the endpoint. For example, use your Glitch project name with the endpoint (`registrationHookSSR`):

   `https://your-glitch-projectname.glitch.me/registrationHookSSR`

1. Include the authentication field and secret. In this example:

   * **Authentication Field** = `authorization`
   * **Authorization Secret** = `Basic YWRtaW46c3VwZXJzZWNyZXQ=`

   > **Note**: If you want to use OAuth 2.0 to secure your inline hooks, see the [Add Authentication method](/docs/guides/common-hook-set-up-steps/nodejs/main/#add-authentication-method).

1. Click **Save**.

<StackSnippet snippet="apisetup"/>

### Create an enrollment policy for profile enrollment (SSR)

<StackSnippet snippet="enrollment-policy"/>

To associate the registration inline hook with a user profile policy:

1. In the Admin Console, go to **Security** > **User Profile Policies**.
1. Click **Add user profile policy**, give your policy a name (in this example, use "SSR Inline Hook"), and then click **Save**.
1. Find your inline hook, "SSR Inline Hook", from the list of enrollment policies, and then click the pencil icon.
1. Click **Manage Apps**, and then click **Add Apps to this Policy**.
1. Locate the **Okta Dashboard**, click **Apply**, and then click **Close**.
1. Click **Back to User Profile Policy**, and then click **Edit** in **Profile Enrollment**.
1. Select **Allowed** for **Self-service registration**.
1. Select the hook that you set up and activated earlier from the **Inline hook** dropdown menu. See [Add your registration hook for profile enrollment](#add-your-registration-hook-for-profile-enrollment).

   > **Note:** You can associate only one inline hook at a time with your user profile policy.

1. Select **When a new user is created** in **Run this hook**, and then click **Save**.

Your registration inline hook is configured for profile enrollment (self-service registration). Go to the [Preview the registration inline hook](#preview-the-registration-inline-hook) or [Test your registration inline hook](#test-your-registration-inline-hook) to preview and run the sample.

## Set up for progressive profile enrollment scenario

The scenario of progressive profile enrollment involves existing users prompted for new information to add to their profile when they sign in. With this use case, the registration inline hook triggers and the external service code evaluates the employee number field. If the value is four digits, the user's profile is updated. Follow these steps to implement this scenario:

<StackSnippet snippet="introbullets"/><br>

<HookCommonSetupNote/>

<HookBasicAuthValuesNote/>

### Set up your external service code response for progressive profile enrollment

Remix your own version of the Okta sample Glitch project and confirm that it's live.

1. Go to the [Okta Registration Inline Hook Example](https://glitch.com/edit/#!/okta-inlinehook-registrationhook-oie).
1. Click **Remix your own**, and then click **Share**.
1. Click the copy icon in the **Live site** field. This is your external service URL. Make a note of it as you need it later.
1. Click **Logs**. If you see the following message, "Your app is listening on port {XXXX}", the app is live and ready to receive Okta requests.

Review the following project code with endpoint `/registrationHookPP`. The external service responds to Okta indicating whether to update the end user's profile with a valid employee number. The response returns a `commands` object in the body of the HTTPS response. This object contains specific syntax that indicates whether the user is allowed to update their Okta profile.

<StackSnippet snippet="response-properties"/>

```javascript
app.post('/registrationHookPP', async (request, response) => {
  console.log();
  console.log("Type of Okta registration hook request: " + request.body.requestType); // confirms the type of Okta request
  var returnValue = {};

  if (request.body.requestType === 'progressive.profile') {
    var employeeNumber = request.body.data.userProfileUpdate['employeeNumber'];
    if (employeeNumber && employeeNumber.length === 4) {
      console.log(request.body.data.context.user.profile['firstName'] + ' ' + request.body.data.context.user.profile['lastName']+ " " + request.body.data.context.user.profile['login'] + " has updated profile!");
      returnValue = {
        'commands':[
          {
            type: 'com.okta.user.progressive.profile.update',
            value: {
              'employeeNumber': employeeNumber,
              'mobilePhone': request.body.data.userProfileUpdate['mobilePhone']
            },
          }
        ]
      };
    } else {
      console.log(request.body.data.context.user.profile['firstName'] + ' ' + request.body.data.context.user.profile['lastName']+ " " + request.body.data.context.user.profile['login'] + " employee number is not the correct number of digits!");
      returnValue = {
        'commands':[
        ],
        'error': {
          'errorSummary':'Incorrect employee number. Enter an employee number with 4 digits.',
          'errorCauses':[{
            'errorSummary':'Employee numbers must have 4 digits.',
            'reason':'INVALID_EMPLOYEE_NUMBER',
            'locationType':'body',
            'location':'data.userProfile.employeeNumber',
            'domain':'end-user'
          }]
        }
      };
    }
  }

 response.status(200).send(JSON.stringify(returnValue));

})
```

### Add your registration hook for a progressive profile

Configure your registration inline hook for your Okta org to use the Glitch project for progressive profile enrollment.

1. In the Admin Console, go to **Workflow** > **Inline Hooks**.
1. Click **Add Inline Hook** and select **Registration** from the dropdown menu.
1. Add a name for the hook (in this example, use "Progressive Profile Enrollment").
1. Add your external service URL (see [Set up your Glitch project](#set-up-your-glitch-project)), and append it with the endpoint. For example, use your Glitch project name with the endpoint (`registrationHookPP`):

   `https://your-glitch-projectname.glitch.me/registrationHookPP`

1. Include the authentication field and secret. In this example:

   * **Authentication Field** = `authorization`
   * **Authorization Secret** = `Basic YWRtaW46c3VwZXJzZWNyZXQ=`

   > **Note**: If you want to use OAuth 2.0 to secure your inline hooks, see the [Add Authentication method](/docs/guides/common-hook-set-up-steps/nodejs/main/#add-authentication-method).

1. Click **Save**.

<StackSnippet snippet="apisetup"/>

### Create an enrollment policy for progressive profile enrollment

<StackSnippet snippet="enrollment-policy"/>

Before creating the enrollment policy, ensure the user profile attribute `employeeNumber` is set to a status of read-write. The `employeeNumber` attribute is read-only by default.

1. In the Admin Console, go to **Directory** > **Profile Editor**.
1. Select **User (default)**.
1. Under **Attributes**, find **Employee Number** and click the information icon.
1. In the **Employee Number** dialog, under **User permission**, select **Read-Write**.
1. Click **Save Attribute**.

To associate the registration inline hook with a user profile policy and add the employee number field:

1. In the Admin Console, go to **Security > User Profile Policies**.
1. Click **Add user profile policy**.
1. Give your policy a name (in this example, use "Progressive Inline Hook"), and then click **Save**.
1. Find your inline hook, "Progressive Inline Hook", from the list of enrollment policies, and then click the pencil icon.
1. Click **Manage Apps**, and then click **Add Apps to this Policy**.
1. Locate the **Okta Dashboard**, click **Apply**, and then click **Close**.
1. Click **Back to user profile policy**.
1. In **Profile enrollment**, click **Edit**.
1. For **Self-service registration**, select **Denied**.
1. For **Progressive Profiling**, select **Enabled**.
1. From the **Inline hook** dropdown menu, select the hook that you set up and activated earlier. See [Add your registration hook for progressive profile enrollment](#add-your-registration-hook-for-progressive-profile).

   > **Note:** You can associate only one inline hook at a time with your user profile policy.

1. Under **Profile Enrollment Form**, click **Add form input**.
1. From the dropdown menu, select the **Employee number**.
1. In the **Add form input** dialog, under **Customize form input**, set the **Input requirement** as **Required**.
1. Click **Save**

Your registration inline hook is configured for progressive profile enrollment. Go to [Preview the registration inline hook](#preview-the-registration-inline-hook) or [Test your registration inline hook](#test-your-registration-inline-hook) to preview and run the sample.

## Set up for profile enrollment (SSR) and progressive profile enrollment scenario

This scenario involves both profile enrollment (self-service registration) and progressive profile enrollment use cases. Existing users are prompted for new information (a four-digit employee number) to add to their profile when they sign in. New users self-registering from the **Sign up** link are required to include the default three sign-up fields (**Email**, **First name**, and **Last name**) and the employee number field. With this use case, the external code updates the profiles of existing users if the employee number is four digits. The external code adds new users if their email domain contains `okta.com` and their employee number is four digits, otherwise their registration is denied. Follow these steps to implement this scenario:

<StackSnippet snippet="introbullets"/><br>

<HookCommonSetupNote/>

<HookBasicAuthValuesNote/>

### Set up your external service code response for profile and progressive profile enrollment

Remix your own version of the Okta sample Glitch project and confirm that it's live.

1. Go to the [Okta Registration Inline Hook Example](https://glitch.com/edit/#!/okta-inlinehook-registrationhook-oie).
1. Click **Remix your own**, and then click **Share**.
1. Click the copy icon in the **Live site** field. This is your external service URL. Make a note of it as you need it later.
1. Click **Logs**. If you see the following message, "Your app is listening on port {XXXX}", the app is live and ready to receive Okta requests.

Review the following project code with endpoint `/registrationHookSSRandPP`. The external service responds to Okta indicating whether to update the user's profile with a valid employee number or allow self-registration of a new user. The response returns a `commands` object in the body of the HTTPS response. This object contains specific syntax that indicates whether the user is allowed or denied self-registration or can update their profile with Okta.

<StackSnippet snippet="response-properties"/>

```javascript
app.post('/registrationHookSSRandPP', async (request, response) => {
  console.log();
  console.log("Type of Okta registration hook request: " + request.body.requestType); // confirms the type of Okta request
  var returnValue = {};

  if (request.body.requestType === 'progressive.profile') {
    console.log('Employee number added to profile ' + request.body.data.context.user.profile['login'] + ': ' + request.body.data.userProfileUpdate['employeeNumber']);
    var employeeNumber = request.body.data.userProfileUpdate['employeeNumber'];
    if (employeeNumber && employeeNumber.length === 4) {
      returnValue = {
        'commands':[
          {
            type: 'com.okta.user.progressive.profile.update',
            value: {
              'employeeNumber': employeeNumber,
            }
          }
        ]
      };
    } else {
      returnValue = {
        'commands':[
          {
            type: 'com.okta.action.update',
            value: {
              'registration': 'DENY',
            },
          }
        ],
        'error': {
          'errorSummary':'Incorrect employee number. Enter an employee number with 4 digits.',
          'errorCauses':[{
            'errorSummary':'Only employee numbers with 4 digits can register.',
            'reason':'INVALID_EMPLOYEE_NUMBER',
            'locationType':'body',
            'location':'data.userProfile.employeeNumber',
            'domain':'end-user'
          }]
        }
      };
    }
  } else {
    var emailRegistration = (request.body.data.userProfile['email']).split('@');
    var employeeNumberSSR = (request.body.data.userProfile['employeeNumber']);
    if (emailRegistration[1].includes('okta.com') && (employeeNumberSSR && employeeNumberSSR.length === 4)){
      console.log(request.body.data.userProfile['firstName'] + " " + request.body.data.userProfile['lastName'] + " " + request.body.data.userProfile['email'] + " has registered!");
      returnValue = {
        'commands':[
          {
            type: 'com.okta.action.update',
            value: {
              'registration': 'ALLOW',
            }
          }
        ]
      };
    } else {
      console.log(request.body.data.userProfile['firstName'] + " " + request.body.data.userProfile['lastName'] + " " + request.body.data.userProfile['email'] + " denied registration!");
      returnValue = {
        'commands':[
          {
            type: 'com.okta.action.update',
            value: {
              'registration': 'DENY',
            },
          }
        ],
        'error': {
          'errorSummary':'Incorrect email address or employee number. Please contact your admin.',
          'errorCauses':[{
            'errorSummary':'To register, you must have an "okta" email and a 4-digit employee number.',
            'reason':'INVALID_EMAIL_DOMAIN',
            'locationType':'body',
            'location':'data.userProfile.email',
            'domain':'end-user'
          }]
        }
      };
    }
  }

  response.send(JSON.stringify(returnValue));
})
```

### Add your registration hook for profile and progressive profile enrollment

Configure your registration inline hook for your Okta org to use the glitch project for both profile enrollment (self-service registration) and progressive profile enrollment.

1. In the Admin Console, go to **Workflow** > **Inline Hooks**.
1. Click **Add Inline Hook** and select **Registration** from the dropdown menu.
1. Add a name for the hook (in this example, use "Profile and Progressive Profile Enrollment").
1. Add your external service URL (see [Set up your Glitch project](#set-up-your-glitch-project)), and append it with the endpoint. For example, use your Glitch project name with the endpoint (`registrationHookSSRandPP`):

   `https://your-glitch-projectname.glitch.me/registrationHookSSRandPP`

1. <HookBasicAuthStep/> <HookOAuthNote/>

1. Click **Save**.

<StackSnippet snippet="apisetup"/>

### Create an enrollment policy for profile and progressive profile enrollment

<StackSnippet snippet="enrollment-policy"/>

Before creating the enrollment policy, ensure the user profile attribute `employeeNumber` is set to a status of read-write. The `employeeNumber` attribute is read-only by default.

1. In the Admin Console, go to **Directory** > **Profile Editor**.
1. Select **User (default)**.
1. Find **Employee Number** under **Attributes**, and then click the information icon. The **Employee Number** dialog appears.
1. Select **Read-Write** in the **User permission** section.
1. Click **Save Attribute**.

To associate the registration inline hook with a user profile policy and add the employee number field:

1. In the Admin Console, go to **Security > User Profile Policies**.
1. Click **Add user profile policy**.
1. Give your policy a name (in this example, use "SSR + PP Inline Hook"), and then click **Save**.
1. Find your inline hook, "SSR + PP Inline Hook", from the list of enrollment policies, and then click the pencil icon.
1. Click **Manage Apps**, and then click **Add Apps to this Policy**.
1. Locate the **Okta Dashboard**, click **Apply**, and then click **Close**.
1. Click **Back to user profile policy**.
1. In **Profile enrollment**, click **Edit**.
1. For **Self-service registration**, select **Allowed**.
1. For **Progressive Profiling**, select **Enabled**.
1. From the **Inline hook** dropdown menu, select the hook that you set up and activated earlier. See [Add your registration hook for progressive profile enrollment](#add-your-registration-hook-for-progressive-profile).

   > **Note:** You can associate only one inline hook at a time with your user profile policy.

1. In **Run this hook**, select **Both**.
1. Under **Profile Enrollment Form**, click **Add form input**.
1. From the dropdown menu, select the **Employee number**.
1. In the **Add form input** dialog, under **Customize form input**, set the **Input requirement** as **Required**.
1. Click **Save**.

Your registration inline hook is configured for both profile and progressive profile enrollment. Go to [Preview the registration inline hook](#preview-the-registration-inline-hook) or [Test your registration inline hook](#test-your-registration-inline-hook) to preview and run the sample.

## Preview the registration inline hook

Your Okta org is set up to call the sample external service using a registration inline hook. The external service is ready to receive and respond to an Okta call.

In your Okta org, you can preview the request and response JSON in the Admin Console.

To preview a profile enrollment (self-service registration) request and response:

1. In the Admin Console, go to **Workflow** > **Inline Hooks**.
1. Select the registration inline hook name that you created, and then click **Preview**.
1. In the **Configure Inline Hook request** block, select an end user from your org in the **data.userProfile** field. That is, select a value from your `data.user.profile` object.
1. Under **requestType**, select **Self-Service Registration**.
1. From the **Preview example Inline Hook request** block, select **Generate Request**.
   The end user's request information in JSON format that is sent to the external service appears.
1. Optional: Click **Edit** to update your request before previewing the response. For this example, you can change the email domain to view a response that accepts or denies the registration. That is, a user registering with an `okta.com` email or not. Click **Save**.
1. From the **View service's response** block, click **View Response**.

The response from your external service in JSON format appears, which indicates that self-registration was either allowed or denied. You can also review the console output from your Glitch app's **Logs**.

To preview a progressive profile enrollment request and response:

1. In the Admin Console, go to **Workflow** > **Inline Hooks**.
1. Select the registration inline hook name that you created, and then click **Preview**.
1. In the **Configure Inline Hook request** block, select an end user from your org in the **data.userProfile** field. That is, select a value from your `data.user.profile` object.
1. Under **requestType**, select **Progressive Profile**.
1. From the **Preview example Inline Hook request** block, select **Generate Request**.
1. Click **Edit** to update `userProfileUpdate` and add a value for the `employeeNumber` attribute (either four digits or larger based on the use case you want to preview):

   ```javascript
   "userProfileUpdate": {
      "employeeNumber": "1234"
      }
   ```

   > **Note:** Make sure that your edits are valid JSON.

1. From the **View service's response** block, click **View Response**.

The response from your external service in JSON format appears, which indicates that the profile update was either allowed or denied.

## Test your registration inline hook

You can also test the code directly with self-registering or profile-updating end users.

### Test the profile enrollment (self-service registration) inline hook

To run a test of your profile enrollment (self-service registration) registration inline hook, go to the Okta sign-in page for your Okta org, click the **Sign Up** link, and attempt to self-register.

Possible registration scenarios:

* If you use an allowable email domain, such as `rosario.jones@okta.com`, the end user registration goes through the profile enrollment scenario.
* If you use an allowable email domain and employee number, the end user registration goes through the profile and progressive profile enrollment scenario.
* If you use an incorrect email domain or employee number (depending on the scenario), the end user registration is denied.

Review the error message that displays the error summary from the external service code and is passed back to the Okta sign-in page. See [error](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/InlineHook/#tag/InlineHook/operation/create-registration-hook!c=200&path=Error&t=response). You can also review the console output from your Glitch app's **Logs**.

### Test the progressive enrollment inline hook

To run a test of your progressive profile enrollment registration inline hook, [create](https://help.okta.com/okta_help.htm?type=oie&id=ext-usgp-add-users) or use an existing user in your org.

Possible outcomes:

* If you use valid sign-in credentials with an **Employee number** value of four digits, the user's profile is updated.
* If you enter an employee number in an invalid format, the profile update is denied.

Sign back in as your org admin to review the profile of the user. Also, confirm that the user's profile was updated and the employee number value exists.

For invalid employee numbers, review the error message that displays the error summary from the external service code and is passed back to the Okta sign-in page. See [error](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/InlineHook/#tag/InlineHook/operation/create-registration-hook!c=200&path=Error&t=response). You can also review the console output from your Glitch app's **Logs**.

> **Note:** Review [Troubleshooting hook implementations](/docs/guides/common-hook-set-up-steps/nodejs/main/#troubleshoot-hook-implementations) for help with any difficulties during setup or configuration.

## Next steps

Review the following guides to implement other inline or event hook examples:

* [Event hook](/docs/guides/event-hook-implementation/)
* [Password import inline hook](/docs/guides/password-import-inline-hook/)
* [Token inline hook](/docs/guides/token-inline-hook/)
* [SAML inline hook](/docs/guides/saml-inline-hook/)
* [Telephony inline hook](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/InlineHook/#tag/InlineHook/operation/createTelephonyInlineHook)

## See also

For a complete description of this inline hook type, see [Registration inline hook](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/InlineHook/#tag/InlineHook/operation/create-registration-hook).

