---
title: Plan self-service registration flows
meta:
  - name: description
    content: A high-level overview of self-service registration flows.
---

# Plan self-service registration flows

Learn about self-service registration (SSR) and three key aspects that you can customize for your specific use-cases.

---

## Overview of self-service registration

Self-service registration allows users to register an account and sign in to an app by themselves. Instead of requiring manual administrative provisioning, you allow users to identify themselves and provide the necessary data to gain access to your app.

You choose which data to collect during registration, the authenticators available for enrollment, and the authentication requirements for enrolling those authenticators. You can also use inline hooks and custom code for further customization.

For more information about SSR, see the following resources:

* [Self-service registration overview](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-ssr)

### Default SSR state

Self-service registration is disabled by default. The default user profile policy, the catch-all user profile policy, doesn't allow self-service registration.

You can enable a basic SSR flow by creating a new user profile policy. These are the default settings for a new user profile policy that allows self-service registration:

* The [user profile policy](/docs/concepts/policies/#user-profile-policies) prompts users for their first name, family name, and email address. Those are the basic [Universal Directory (UD)](/docs/concepts/universal-directory/) attributes required to create a user profile and activate an Okta account.
* Users must verify that their email address before the account is activated.
* Progressive enrollment is enabled. If you add other UD attributes as optional, then users are prompted to provide that information when they sign in again, after their initial registration.
* There’s one default identifier that allows users to sign in with their username. You can add other identifiers. See [Multiple identifiers](https://help.okta.com/okta_help.htm?type=oie&id=ext-multiple-ids).
* The registration form has default text and labels. You can customize the text and labels to match your brand and use case.
* The user profile policy isn't assigned to any apps. You must assign the policy to an app for users to see the registration form when they try to sign in to that app.

See [Harini Doc]() to learn how to set up this basic SSR flow.

<!-- Insert diagram of default SSR state -->

### Secure SSR with OAuth 2.0 and OpenID Connect

If you use SSR with the redirect deployment model, the flow follows the standard OpenID Connect (OIDC) protocol. Users are first redirected to an Okta-hosted page where they complete the registration form. After they register, Okta redirects them back to your app with an authorization code, which your app then exchanges for tokens to sign the user in.

## Ways to customize your SSR flow

You can customize how Okta handles self-service registration through a combination of [policies](#use-policies-to-control-ssr-flows), [server-side logic](#use-an-inline-hook-to-customize-the-ssr-flow), and [client-side code](#use-custom-code-to-customize-the-ssr-flow).

### Use policies to control SSR flows

Policies allow you to change the registration logic directly in the Admin Console without updating your app's code. There are three primary policies that control the SSR experience:

* User profile policy
* Authenticator enrollment policy
* Okta account management policy

#### User profile policy

The [user profile policy](/docs/concepts/policies/#user-profile-policies) controls the attributes collected during registration. You can use this to map specific data from your UD to the registration form.

For example, if your app requires a business-specific attribute like a department name or a specific organization ID, you can set these as required fields in the user profile policy to ensure that they're captured when users register.

> **Tip:** Use progressive enrollment to avoid overwhelming users with too many fields during registration. Start with the most essential attributes and then prompt for additional information during subsequent sign-ins. See [Progressive enrollment](https://help.okta.com/okta_help.htm?type=oie&id=ext-pe-policies).

#### Authenticator enrollment policy

The [authenticator enrollment policy](/docs/concepts/policies/#authenticator-enrollment-policies) defines which authenticators are available for users to register and use. You can set certain authenticators as required or optional during registration, and you can specify which authenticators are available based on user attributes or other conditions.

For example, you can configure the policy to allow or require users to enroll a passkey when they create their account to ensure high-assurance authentication from day one.

#### Okta account management policy

The [Okta account management policy](/docs/concepts/policies/#okta-account-management-policy) controls the security requirements for enrolling authenticators. You can use this policy to require users to verify their email or phone number before they can enroll certain authenticators, or you can require them to authenticate with an existing authenticator before enrolling a new one.

For example, you can allow users to register a passkey by requiring them to authenticate with a password first.

#### SSR flow with policies

<!-- Insert diagram of SSR flow with policies -->

### Use an inline hook to customize the SSR flow

Registration inline hooks allow you to customize the SSR flow with your own business logic by inserting a call to an external service during the SSR process. You must set up an external service to host your code and then configure the registration inline hook in the Admin Console to call that service at the right point in the SSR flow.

The hook triggers after the user submits the registration form but before the user account is created in Okta.

[Domain validation](#domain-validation) and [input restrictions](#input-restrictions) are two examples for how you can use a registration inline hook in your SSR flow.

#### Domain validation

You can validate the domain of a user trying to register and deny requests from unauthorized or public email providers. See [Set up for profile enrollment (SSR) scenario](/docs/guides/registration-inline-hook/nodejs/main/#set-up-for-profile-enrollment-ssr-scenario) for an example of how to do this.

#### Input restrictions

You can use an inline hook to restrict certain inputs in the registration form. For example, the code sample below checks the `login` attribute for forbidden characters (like emojis or specific symbols) and denies access if a user attempts to register with them.

When the registration inline hook triggers, Okta sends a JSON payload containing the user's profile. Your external service must parse this data and respond with a `commands` object.

The following code example demonstrates how to block a registration if the username contains restricted special characters.

```javascript
app.post('/registration-hook', (req, res) => {
  const { userProfile } = req.body.data;
  const login = userProfile.login;

  // Define a regex for allowed characters (e.g., alphanumeric and standard email symbols)
  // This example disallows characters like !, #, $, or emojis
  const allowedChars = /^[a-zA-Z0-9@._+-]+$/;

  if (!allowedChars.test(login)) {
    // If validation fails, return a 'deny' command with a custom error message
    return res.status(200).json({
      "commands": [{
        "type": "com.okta.action.update",
        "value": {
          "registration": "DENY"
        }
      }],
      "error": {
        "errorSummary": "Invalid characters in username",
        "errorCauses": [{
          "errorSummary": "The username contains restricted symbols.",
          "reason": "INVALID_CHARACTER_DATA",
          "location": "data.userProfile.login"
        }]
      }
    });
  }

  res.status(200).json({
    "commands": [{
      "type": "com.okta.action.update",
      "value": {
        "registration": "ALLOW"
      }
    }]
  });
});
```

For implementation details for both examples, see:

* [Registration inline hook](/docs/guides/registration-inline-hook/nodejs/main/)
* [API reference for a registration inline hook](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/InlineHook/#tag/InlineHook/operation/create-registration-hook)
* [Hooks in the Okta Sign-In Widget](https://github.com/okta/okta-signin-widget?tab=readme-ov-file#hooks)

#### SSR flow with inline hooks

<!-- Insert diagram of SSR flow with inline hooks -->

### Use custom code to customize the SSR flow

At this point you've learned how to customize the SSR flow using different methods available in the Admin Console. The following section explains how to customize the SSR flow with custom code.

With custom code, you can extend the SSR flow with your own scripts and styles. This allows you to enhance the UI and add functional elements that aren't part of the standard Okta Sign-In Widget.

However, the process for adding custom code depends on your deployment model.

* **Redirect model:** When using the redirect model, the SSR flow uses the [Okta-hosted Sign-In Widget](/docs/concepts/sign-in-widget/#okta-hosted-sign-in-widget-recommended). You can add custom code to the page template using the code editor in the Admin Console. This allows you to inject scripts and styles directly into the Okta-hosted page while Okta continues to manage the core widget logic and security updates.
* **Embedded model:** When using the embedded model, the SSR flow uses the [self-hosted Sign-In Widget](/docs/concepts/sign-in-widget/#self-hosted-sign-in-widget). You manage the code within your app's own source files. You host the widget library yourself and attach lifecycle hooks to the widget instance directly within your app's logic before calling the `.showSignInToGetTokens()` or `.renderEl()` methods.

Okta recommends the redirect model for most use cases because it balances security with ease of use. The redirect model uses the Okta-hosted widget as its backend and frontend foundation, which offers a secure and customizable experience with minimal maintenance.

See:

* [Style the Sign-In Widget (third generation)](/docs/guides/custom-widget-gen3/main/)
* [Add design tokens to your code](/docs/guides/custom-widget-migration-gen3/main/#add-design-tokens-to-your-code)

#### How to insert custom code in the redirect model

You must have a [custom domain](/docs/guides/custom-url-domain/main/#about-okta-domain-customization) within the redirect model. After you configure a custom domain, you're able to insert your own scripts and styles into the registration page while Okta continues to manage the core widget logic and security updates.

[Use the code editor](/docs/guides/custom-widget/main/#use-the-code-editor) in the Admin Console to [add your own scripts](/docs/guides/custom-widget/main/#add-your-own-scripts) and styles to the page. You insert your custom logic by modifying the configuration before the widget renders.

When using custom code, ensure your custom CSS and third-party scripts are loaded in the `<head>` of the code editor before the widget runs.

Review the following examples for ideas on how to customize your SSR flow.

#### Use custom code to brand the SSR experience

Custom code is ideal for injecting brand-specific content or legal requirements. For example, you can use the `afterRender` lifecycle event to inject inline links for your **Terms of Service** or **Privacy Policy** directly into the footer of the Sign-In Widget.

The following code sample demonstrates how to use the `afterRender` event to add a custom link to the widget:

```javascript
// The 'config' object is globally available in the Okta-hosted editor
var oktaSignIn = new OktaSignIn(config);

oktaSignIn.on('afterRender', function (context) {
  // Example: Injecting a link into the widget footer
  var footer = document.querySelector('.auth-footer');
  if (footer) {
    footer.innerHTML += '<a href="https://example.com/terms">Terms of Service</a>';
  }
});

oktaSignIn.showSignInToGetTokens(config);
```

#### Use custom code to build interactive form elements

You can also use custom scripts to build more interactive form elements. This includes implementing custom style pickers, type-ahead components for address lookups, or dynamic help text that updates as a user interacts with specific fields. These extensions help users complete the registration form accurately and reduce drop-off rates.

##### Custom style pickers

For custom style pickers, you can create a dropdown that allows users to select their preferred theme for the registration page. When a user selects a theme, your script can dynamically update the widget's CSS classes to apply the new styles without requiring a page reload.

For example, the following code sample demonstrates how to implement a simple theme selector that toggles between light and dark modes:

```javascript
// In your HTML: <select id="theme-picker"><option value="light">Light</option><option value="dark">Dark</option></select>

document.getElementById('theme-picker').addEventListener('change', function(e) {
  var container = document.getElementById('okta-login-container');
  // Toggle classes to trigger your custom CSS rules
  container.classList.remove('theme-light', 'theme-dark');
  container.classList.add('theme-' + e.target.value);
});
```

##### Type-ahead components

For type-ahead components, you can integrate with third-party APIs to provide real-time suggestions as users fill out fields like their address or company name. This not only enhances the user experience but also improves data accuracy.

For example, the following code sample demonstrates how to integrate the Google Places API to provide address suggestions in the registration form:

```javascript
oktaSignIn.on('afterRender', function() {
  var addressField = document.querySelector('input[name="userProfile.streetAddress"]');
  if (addressField && !addressField.dataset.autocompleteLoaded) {
    // Initialize your chosen 3rd party library here
    new google.maps.places.Autocomplete(addressField);
    addressField.dataset.autocompleteLoaded = true;
  }
});
```

##### Dynamic help text

For dynamic help text, you can listen for events on input fields and display contextual tips or validation messages that guide users through the registration process. This can be helpful for fields that have strict formatting requirements.

For example, the following code sample demonstrates how to show dynamic help text when a user enters text in the last name field:

```javascript
oktaSignIn.on('afterRender', function() {
  var lastNameField = document.querySelector('input[name="userProfile.lastName"]');
  lastNameField.addEventListener('focus', function() {
    // Logic to show a tooltip or update a 'help' div
    console.log("Enter your legal last name as it appears on your ID.");
  });
});
```

#### SSR flow with custom code

<!-- Insert diagram of SSR flow with custom code -->

## See also

* [Use the Customizations APIs](/docs/concepts/brands/#use-the-customizations-apis)
* [Style the sign-in page](/docs/guides/custom-widget/main/)
