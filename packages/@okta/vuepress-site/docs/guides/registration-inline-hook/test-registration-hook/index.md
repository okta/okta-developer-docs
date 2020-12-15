---
title: Preview, test, and troubleshoot
---
The external service example is now ready with code to receive and respond to an Okta call. The Okta org is now set up to call the external service using a Registration Inline Hook.

In your Okta org, you can preview the request and response JSON right from the Developer Console. You can also test the code directly with self-registering users.

### Preview

To preview the Registration Inline Hook:

1. Navigate to Inline Hooks (**Workflow** > **Inline Hooks**) in your Developer Console.
2. Click on the Registration Inline Hook name (in this example, "Guide Registration Hook Code").
3. Click the **Preview** tab.
4. Select a user from your org in the first block titled "Configure Inline Hook request"; that is, a value for the  `data.userProfile` value.
5. From the "Preview example Inline Hook request" block, click **Generate Request**.
    You should see the user's request information in JSON format that is sent to the external service.
6. From the "View service's response" block, click **View Response**.
    You will see the response from your external service in JSON format, which either allows or denies the self-registration.

### Test

To run a test of your Registration Inline Hook, go to the Okta sign-in page for your Okta org, click the "Sign Up" link, and attempt to self-register.

- If you use an allowable email domain, such as `john@example.com`, the user registration goes through.
- If you use an incorrect email domain, the user registration is denied; review the error message, which displays the error summary from the external service code and is passed back to Okta.

> **Note:** Review [Troubleshooting hook implementations](/docs/guides/overview-and-considerations/troubleshooting) for information if encountering any setup or configuration difficulties.
