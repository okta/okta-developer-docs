---
title: Set up self-service registration
excerpt: (Archived content) Okta's self-service registration lets you configure a custom app or the Okta homepage for use when users self-register.
layout: Guides
---

> **Note**: Self-service registration for Okta Classic Engine is deprecated. If you are using Okta Identity Engine, see [Configure profile enrollment policies](/docs/guides/configure-profile-enrollment-policies/main/) for relevant guidance. See [Identify your Okta solution](https://help.okta.com/okta_help.htm?type=oie&id=ext-oie-version) to determine your Okta version.

This guide explains how to set up Okta's self-service registration (SSR) functionality with Okta Classic Engine so that you can configure a custom app or the Okta homepage that allows users to self-register.

---

**Learning outcomes**

* Use policies to govern SSR behavior.
* Enable and disable SSR recovery options.
* Configure SSR options in the Okta Sign-In Widget.

**What you need**

* SSR enabled in your Okta org
* [Super admin permissions](https://help.okta.com/okta_help.htm?id=ext_superadmin) (required to enable SSR)
* Sign-In Widget version 2.9 or later if you are hosting a customized [widget](/docs/guides/archive-embedded-siw/main/)

---

## About Okta's self-service registration

A new user's first impression starts with the registration process, which makes it critical to get right. Since you're asking a user to provide information for the first time, you need to personalize and streamline the experience.

Okta's self-service registration lets you configure a custom app or the Okta Homepage for use when users self-register. After you configure and enable your self-service registration policy, a sign-up link appears in the [Okta Sign-In Widget](/docs/guides/archive-embedded-siw/main/). Users who click this link are directed to a Create Account registration form that is based on your registration policy.

Self-service registration supports these registration workflows:

* **Make email verification mandatory.** After registering their information, users are immediately sent an email to verify their email address. They must click the link in the email to complete the registration process. They are then redirected to their app or to their org's Okta homepage.

> **Note:** The lifetime of the emailed link is dictated by the **Activation emails are valid for** setting on the **Security** > **General** page of the Admin Console.

* **Make email verification optional.** After registration, users are immediately redirected to their custom app/portal or to their org's Okta homepage. Okta then sends the user an email to request verification of their email address.

## Enable and configure a self-service registration policy

Use a self-service registration policy to let users self register for application access. When you create the policy, you can choose the fields that you want to include on the Create Account registration form, specify how those fields are ordered, and mark which of the fields are required.

When you enable a self-service registration policy, Okta enforces uniqueness for all primary email addresses. When registering, users need to provide their email address. Okta automatically uses the email address for the username and primary email address.

> **Note:** The self-service registration password policy doesn't support "does not contain first name" and "does not contain last name" complexity requirements.

1. In the Admin Console, go to **Directory** > **Self-Service Registration**.

2. If this is your first time on this page, click **Enable Registration**. Otherwise, click **Edit**.

3. In the **ACCOUNT** section, you have the option to add a sign-up link and to assign the user to an existing group automatically:

    * **Add to Sign-In Widget:** Optional. Select this option if you want to add a sign-up link to your Okta-hosted sign-in page. By adding a sign-up link to the widget, you eliminate the need to configure a link that uses JavaScript in the Customize Sign-In Page editor.

    * **Assign to group:** Optional. Enter the existing group name that users are automatically added to when they self register. Group membership determines which password policy is applied during registration. If no group is specified, Okta applies the Default password policy.

4. In the **REGISTRATION FORM** section, you have the option to add a customized label for the **Email** and **Password** fields and to define which fields are required. The fields in this section are what the user sees when they register.

    * **Login field form label:** Optional. Enter a label for the **Email** field on the Create Account registration form.

    * **Password field form label:** Optional. Enter a label for the **Password** field on the Create Account registration form.

    * **Registration form fields:** Optional. The `firstName` and `lastName` fields are required and can't be removed. You can accept the default **Form label** value or optionally enter a different field name.

        * To include more fields: click **Add Field** and select an existing profile attribute from the list.

          > **Note:** If you want to add new profile attributes, click **Configure the Okta user profile** to add them to the Okta user profile. They are then available in the list on this page. Be sure to set the **User permission** dropdown menu to **Read - Write** if you want your users to be able to modify the new attributes after registration.

        * To make a field mandatory: Select the **Required** checkbox.
        * To change the order of the fields on the form: Grab the dotted vertical bar on the left to drag a field to a new location.
        * To remove a field: Click **X**.

    The registration form supports the following data types:
    * String
    * Number
    * Boolean
    * Integer

    > **Note:** The form also supports `enum` data types for strings, numbers, and integers.

5. In the **POST REGISTRATION** section, complete these fields:

    * **Activation requirements:** Optional. Select the checkbox to automatically send users a register activation email. If you don't select the checkbox, and users aren't required to verify their email address for activation, a Registration Verification email that uses the Okta email template is sent.

    * **Default redirect:** After registration, users are redirected to the app that sent them to the registration form. In the event that no app context is provided, they are redirected to the location that you select here.

        * **User dashboard:** Select to redirect users to their Okta homepage.
        * **Custom URL** Select and then enter the URL where you want the authorization server to redirect your users, such as to your custom app or portal.

    > **Note:** Ensure that the domain for the custom URL that you've configured for the **Default redirect** is added as a [Trusted Origin](/docs/guides/enable-cors/) for redirects.

6. Click **Save**.

7. Optional. If you added more fields (existing Okta user profile attributes) from the attribute list to the registration form during step 4, and you want to allow your users to modify those fields after registration on their **Settings** page, do the following:

    * Go to **Directory** and then **Profile Editor**.
    * Click **Profile** for the **Okta User (default)** profile.
    * Find the attribute that you added, and then click its information icon.
    * Change the **User permission** dropdown menu to **Read - Write**.
    * Click **Save Attribute**.

## Disable the security image and additional self-service recovery options

With Okta, new users are prompted to choose a security image and optionally an additional security question prompt when they first sign in. To provide your users with a seamless and smooth sign-in experience, you may need to disable these options.

1. In the Admin Console, go to **Settings** > **Customization**.

2. In the **Optional User Account Fields** section, click **Edit**.

3. Select **Disabled** from the **Security image** dropdown menu, and then click **Save**.

If you don't have any policies configured or your org doesn't allow you to disable additional self-service recovery options, you can skip the following steps. Disabling additional self-service recovery options is an Early Access feature. To enable it, contact [Okta Support](https://support.okta.com/help/s/?_ga=2.17747641.1660906902.1597076228-1076744453.1575496867).

1. Go to **Security** > **Authentication**.

2. Select a policy from the left, click **Edit**, and scroll down to **ACCOUNT RECOVERY**.

3. Clear the **Security question** checkbox in the **Additional self-service recovery** section.

4. Click **Update Policy**.

5. Repeat steps 3 to 4 for any other policies that you configure.

## Configure registration in the Okta Sign-In Widget

### Configure registration in a custom sign-in page in the Okta-hosted widget

If you left the [**Add to Sign-In Widget**](#enable-and-configure-a-self-service-registration-policy) checkbox clear when you configured the registration policy, then you need to configure a link using JavaScript in the **Customize Sign-In Page** HTML editor.

> **Note:** To enable the Custom Sign-In Page HTML editor, you must have a [custom URL domain](/docs/guides/custom-url-domain/) configured.

1. In the Admin Console, go to **Settings** > **Customization**.
2. Click the **Custom Sign In** tab.
3. In the HTML editor, add the following configuration parameters directly under the `var config = OktaUtil.getSignInWidgetConfig();` line:

```javascript
config['features.registration'] = true;
config['authScheme'] = 'SESSION';
```

4. Click **Save and Publish**.

### Configure self-service registration in an embedded or self-hosted widget

Before you can configure self-service registration in your embedded or self-hosted widget, ensure that you first enable [self-service registration](#enable-and-configure-a-self-service-registration-policy). Then you can set `feature.registration` in the widget to `true`.

```json
      },
      features: {
         registration: true
      }
```

> **Note**: This [feature flag](https://github.com/okta/okta-signin-widget#feature-flags) is used to enable the registration feature on the widget.

## Next steps

Now that you understand how to set up self-service registration, you can learn how to implement various [OAuth 2.0 and OpenID Connect](/docs/concepts/oauth-openid/) flows, configure policies for role-based access, and use tokens to provide API authorization.

* [Implement the Authorization Code flow](/docs/guides/implement-grant-type/authcode/main/)
* [Implement the Authorization Code flow with PKCE](/docs/guides/implement-grant-type/authcodepkce/main/)
* [Implement the Client Credentials flow](/docs/guides/implement-grant-type/clientcreds/main/)
* [Customize tokens returned from Okta](/docs/guides/customize-tokens-returned-from-okta/main/)
* [Refresh tokens](/docs/guides/refresh-tokens/)
* [Configure access policies](/docs/guides/configure-access-policy/)

## See also

* [Embedded Okta Sign-In Widget fundamentals](/docs/guides/archive-embedded-siw/main/)
* [Identity Engine upgrade overview](/docs/guides/oie-upgrade-overview/)
