---
title: Set up self-service registration
---

This guide explains how to set up the self-service registration (SSR) feature with Okta Classic Engine. You can configure a custom app or the Okta page that allow users to self-register.

> **Notes:**
> * If you have an existing org in Classic Engine with SSR already enabled, you can use this guide.
> * If you have a new org in Classic Engine, you can't enable this feature.
> * If you have an org in Okta Identity Engine, see [Self-service registration](/docs/guides/oie-embedded-sdk-use-case-self-reg/android/main/). See [Identify your Okta solution](https://help.okta.com/okta_help.htm?type=oie&id=ext-oie-version) to determine your Okta version.

---

#### Learning outcomes

* Use policies to govern SSR behavior.
* Enable and disable SSR recovery options.
* Configure SSR options in the Okta Sign-In Widget.

#### What you need

* SSR enabled in your Okta org
* [Super admin permissions](https://help.okta.com/okta_help.htm?id=ext_superadmin) (required to enable SSR)
* Okta Sign-In Widget version 2.9 or later if you’re hosting a customized [widget](/docs/guides/archive-embedded-siw/)

---

## About self-service registration (SSR)

A new user's first impression starts with registration. Since you're asking a user to provide information for the first time, you need to personalize and streamline the experience.

SSR lets you configure a custom app or the Okta homepage to let new users register. After you configure and enable your SSR policy, a sign-up link appears in the [Okta Sign-In Widget](/docs/guides/archive-embedded-siw/). Users who click this link go to a Create Account registration form. The form is based on your registration policy.

Self-service registration supports these registration workflows:

* **Make email verification mandatory.** Users are sent an email to verify their email address immediately after registering their information. They must click the link in the email to complete the registration process. They’re then redirected to their app or to their org's Okta homepage.

   > **Note:** The **Activation emails are valid for** element sets the lifetime of the emailed link. Find it on the **Security** > **General** page of the Admin Console.

* **Make email verification optional.** After registration, users are immediately redirected to their custom app/portal or to their org's Okta homepage. Okta then sends the user an email to request verification of their email address.

## Enable and configure a self-service registration policy

Use a self-service registration policy to let users self-register for app access. When you create the policy, you can choose the fields that you want to include on the Create Account registration form. You can also specify the order of the fields, and the fields that are required.

When you enable a self-service registration policy, Okta enforces uniqueness for all primary email addresses. When registering, users need to provide their email address. Okta automatically uses the email address for the username and primary email address.

> **Note:** The self-service registration password policy doesn't support "does not contain first name" and "does not contain last name" complexity requirements.

1. In the Admin Console, go to **Directory** > **Self-Service Registration**.
1. If this is your first time on this page, click **Enable Registration**. Otherwise, click **Edit**.
1. In the **ACCOUNT** section, you can add a sign-up link and assign the user to an existing group automatically:

   * **Add to Sign-In Widget:** Optional. Select this option if you want to add a sign-up link to your Okta-hosted sign-in page. By adding a sign-up link to the Okta Sign-In Widget, you don't need to configure a link that uses JavaScript in the editor.
   * **Assign to group:** Optional. Enter the group name that users are automatically added to when they self-register. Group membership determines which password policy is applied during registration. If no group is specified, Okta applies the default password policy even if that policy is applied for non-Okta-sourced users.

   > **Note:** If you're using Identity Engine, Okta doesn't apply the default password policy to non-Okta-sourced users. See [Self-service registration](/docs/guides/oie-embedded-sdk-use-case-self-reg/android/main/).

1. In the **REGISTRATION FORM** section, you can add a customized label for the **Email** and **Password** fields and define which fields are required. The fields in this section are what the user sees when they register.

   * **Login field form label:** Optional. Enter a label for the **Email** field on the Create Account registration form.
   * **Password field form label:** Optional. Enter a label for the **Password** field on the Create Account registration form.
   * **Registration form fields:** Optional. The `firstName` and `lastName` fields are required and can't be removed. You can accept the default **Form label** value or optionally enter a different field name.

      * To include more fields: click **Add Field** and select an existing profile attribute from the list.

         > **Note:** If you want to add new profile attributes, click **Configure the Okta user profile** to add them to the Okta user profile. They’re then available in the list on this page. Set the **User permission** dropdown menu to **Read - Write** to ensure your users can modify the new attributes after registration.

      * To make a field mandatory: Select the **Required** checkbox.
      * To change the order of the fields on the form: Grab the dotted vertical bar on the left to drag a field to a new location.
      * To remove a field: Click **X**.

    The registration form supports the following data types:

    * String
    * Number
    * Boolean
    * Integer

   > **Note:** The form also supports `enum` data types for strings, numbers, and integers.

1. In the **POST REGISTRATION** section, complete these fields:

    * **Activation requirements:** Optional. Select the checkbox to automatically send users a register activation email. A registration verification email is sent, using the Okta email template, given the following:
      * You don't select the checkbox
      * Users aren't required to verify their email address for activation

    * **Default redirect:** After registration, users are redirected to the app that sent them to the registration form. If no app context is provided, they’re redirected to the location that you select here.

      * **User dashboard:** Select to redirect users to their Okta homepage.
      * **Custom URL:** Select and then enter the URL where you want the authorization server to redirect your users, such as to your custom app or portal.

   > **Note:** Ensure that the domain for the custom URL that you've configured for the **Default redirect** is added as a [Trusted Origin](/docs/guides/enable-cors/) for redirects.

1. Click **Save**.
1. Optional. Follow these steps given the following:

  * You can add more fields (existing Okta user profile attributes) from the attribute list to the registration form
  * You want to allow users to modify those fields after registration on their **Settings** page

    1. Go to **Directory** and then **Profile Editor**.
    1. Click **Profile** for the **Okta User (default)** profile.
    1. Find the attribute that you added, and then click its information icon.
    1. Change the **User permission** dropdown menu to **Read - Write**.
    1. Click **Save Attribute**.
    {style="list-style-type:lower-alpha"}

## Disable the security image and other self-service recovery options

When new users first sign in, they’re prompted with the following:

* Choose a security image
* Choose an additional security question (optional)

To disable these options:

1. In the Admin Console, go to **Settings** > **Customization**.
1. In the **Optional User Account Fields** section, click **Edit**.
1. From the **Security image** dropdown menu, select **Disabled**, and then click **Save**.

You can skip the steps to disable other self-service recovery options given the following:

* Your org doesn't have any configured policies
* Your org doesn't allow you to disable other self-service recovery options

To disable other self-service recovery options:

1. Go to **Security** > **Authentication**.
1. Select a policy from the left, click **Edit**, and scroll down to **ACCOUNT RECOVERY**.
1. Clear the **Security question** checkbox in the **Additional self-service recovery** section.
1. Click **Update Policy**.
1. Repeat steps 3–4 for any other policies that you configure.

## Configure SSR in the Okta Sign-In Widget

### Configure SSR in the Okta-hosted widget

You can leave the [**Add to Sign-In Widget**](#enable-and-configure-a-self-service-registration-policy) checkbox clear when you configure the registration policy. However, you need to configure a link using JavaScript in the **Customize Sign-In Page** HTML editor.

> **Note:** To enable the Custom Sign-In Page HTML editor, you must have a [custom domain](/docs/guides/custom-url-domain/) configured.

1. In the Admin Console, go to **Settings** > **Customization**.
1. Click the **Custom Sign In** tab.
1. In the HTML editor, add the following configuration parameters directly under the `var config = OktaUtil.getSignInWidgetConfig();` line:

   ```javascript
   config['features.registration'] = true;
   config['authScheme'] = 'SESSION';
   ```

1. Click **Save and Publish**.

### Configure SSR in an embedded or self-hosted widget

Before you can configure self-service registration in your embedded or self-hosted widget, ensure that you first enable [self-service registration](#enable-and-configure-a-self-service-registration-policy). Then you can set `feature.registration` in Sign-In Widget to `true`.

```json
      features: {
         registration: true
      }
```

> **Note**: This [feature flag](https://github.com/okta/okta-signin-widget#feature-flags) is used to enable the registration feature on the Sign-In Widget.

## Next steps

* [Implement the Authorization Code flow](/docs/guides/implement-grant-type/authcode/main/)
* [Implement the Authorization Code flow with PKCE](/docs/guides/implement-grant-type/authcodepkce/main/)
* [Implement the Client Credentials flow](/docs/guides/implement-grant-type/clientcreds/main/)
* [Customize tokens returned from Okta](/docs/guides/customize-tokens-returned-from-okta/main/)
* [Refresh tokens](/docs/guides/refresh-tokens/)
* [Configure access policies](/docs/guides/configure-access-policy/)

## See also

* [Embedded Okta Sign-In Widget fundamentals](/docs/guides/archive-embedded-siw/)
* [Identity Engine upgrade overview](/docs/guides/oie-upgrade-overview/)
