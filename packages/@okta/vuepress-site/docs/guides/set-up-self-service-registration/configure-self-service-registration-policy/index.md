---
title: Enable and configure a self-service registration policy
---

Use a self-service registration policy to let users self register for application access. When you create the policy, you can choose the fields that you want to include on the Create Account registration form, specify how those fields are ordered, and mark which of the fields are required.

When you enable a self-service registration policy, Okta enforces uniqueness for all primary email addresses. When registering, users need to provide their email address. Okta automatically uses the email address for the username and primary email address.

> **Note:** The self-service registration password policy doesn't support "does not contain first name" and "does not contain last name" complexity requirements.

1. In the Admin Console, go to **Directory** and then **Self-Service Registration**.

2. If this is your first time on this page, click **Enable Registration**. Otherwise, click **Edit**.

3. In the **ACCOUNT** section, you have the option to add a sign-up link and to assign the user to an existing group automatically:

    * **Add to Sign-In widget:** (Optional) Select if you want to add a sign-up link to your Okta-hosted sign-in page. Adding a sign-up link to the Widget eliminates the need to configure a link using JavaScript in the Customize Sign-In Page editor.

    * **Assign to group:** (Optional) Enter the existing group name that users are automatically added to when they self register. Group membership determines which password policy is applied during registration. If no group is specified, Okta applies the Default password policy.

4. In the **REGISTRATION FORM** section, you have the option to add a customized label for the Email and Password fields and to define which fields are required. The fields in this section are what the user sees when they register.

    * **Login field form label:** (Optional) Enter a label for the **Email** field on the Create Account registration form.

    * **Password field form label:** (Optional) Enter a label for the **Password** field on the Create Account registration form.

    * **Registration form fields:** (Optional) The `firstName` and `lastName` fields are required and can't be removed. You can accept the default **Form label** value or optionally enter a different field name.

        * To include more fields: click **Add Field** and then select an existing profile attribute from the list.

          > **Note:** If you want to add new profile attributes, click **Configure the Okta user profile** to add them to the Okta user profile. They are then available in the list on this page. Be sure to set the **User permission** drop-down box to **Read - Write** if you want your users to be able to modify the new attributes after registration.

        * To make a field mandatory: select the **Required** check box.
        * To change the order of the fields on the form: grab the dotted vertical bar on the left to drag a field to a new location.
        * To remove a field: click **X**.

    The registration form supports the following data types:
    * string
    * number
    * boolean
    * integer

    > **Note:** The form also supports `enum` data types for strings, numbers, and integers.

5. In the **POST REGISTRATION** section, complete these fields:

    * **Activation requirements:** (Optional) Select the check box to automatically send users a register activation email. If you don't select the check box, and users aren't required to verify their email address for activation, a Registration Verification email using the Okta email template is sent.

    * **Default redirect:** After registration, users are redirected to the app that sent them to the registration form. In the event that no app context is provided, they are redirected to the location that you select here.

        * **User dashboard:** Select to redirect users to your org's Okta homepage.
        * **Custom URL** Select and then enter the URL where you want the authorization server to redirect your users, such as to your custom app or portal.

    > **Note:** Ensure the domain for the custom URL that you've configured for the **Default redirect** is added as a [Trusted Origin](/docs/guides/enable-cors/overview/) for redirects.

6. Click **Save**.

7. (Optional) If you added more fields (existing Okta user profile attributes) from the attribute list to the registration form during step 4, and you want your users to be able to modify those fields after registration on their **Settings** page, do the following:

    * Go to **Directory** and then **Profile Editor**.
    * Click **Profile** for the **Okta User (default)** profile.
    * Find the attribute that you added, and then click its information icon.
    * Change the **User permission** drop-down box to **Read - Write**.
    * Click **Save Attribute**.

<NextSectionLink/>
