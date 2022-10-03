---
title: Configure profile enrollment policies
excerpt: How to configure profile enrollment policies, self-service registration (SSR), and progressive enrollment.
layout: Guides
---

<ApiLifecycle access="ie" /><br>

> **Note:** This document is only for Okta Identity Engine. If you’re using Okta Classic Engine, see [Set up self-service registration (archived)](/docs/guides/archive-set-up-self-service-registration/main/). See [Identify your Okta solution](https://help.okta.com/okta_help.htm?type=oie&id=ext-oie-version) to determine your Okta version.

This guide explains what profile enrollment policies are used for and how to add and configure them in your [Okta organization](/docs/concepts/okta-organizations/). As a result, you learn how to configure self-service registration (SSR) and progressive enrollment.

---

**Learning outcomes**

* Know the purpose of profile enrollment policies.
* Know the purpose of self-service registration (SSR) and progressive enrollment.
* Add and configure profile enrollment policies, including SSR and progressive enrollment.

**What you need**

* [Okta Developer Edition organization](https://developer.okta.com/signup)
* Group created in your org. See [Add group](/docs/reference/api/groups/#add-group) using the API or 
* An application that you want to assign to an enrollment policy

---

## About profile enrollment

End-user registration is a vital component of any Okta organization and is a particular concern when you implement customer identity and access management (CIAM) scenarios.

Your customers want a frictionless way to access and sign up for the services or products provided by your company. You also want to obtain more profile information about your end users but without asking them for an overwhelming amount of input when they sign up.

With the Okta Identity Engine, you have access to powerful features that give your end users a smooth entry and allow you to quickly expand their profiles for your internal business requirements.

The profile enrollment policy collects the attributes required to validate end users when they attempt to access your app. You can use your profile enrollment policy to:

- Allow end users to register and activate their profiles through the Sign-In Widget or a custom embedded authentication solution.

- Create a progressive enrollment flow that collects additional profile information about known end users before they can sign in.

- Assign end users to specific groups.

## About self-service registration (SSR)

The self-service registration (SSR) functionality enables end users to sign up for your services. You can configure the registration using either the Sign-In Widget hosted by Okta or with a custom embedded authentication solution. See [Sign users in](/docs/guides/sign-in-overview/main/) for details about implementing the sign-in authentication for your application.

When new end users click **Sign up** in the Sign-In Widget, they’re shown the enrollment form. This form is where they can fill out the fields you configured in the profile enrollment policy. Okta automatically uses the email address for the end user’s username and primary email address.

After end users complete the enrollment form, Okta sends them a link and a one-time password (OTP) to verify their email address and complete the registration process. The activation email satisfies possession assurance through the email authenticator. Other authentication prompts can appear, depending on the authentication settings in your sign-on policies. See [Authentication policies](/docs/guides/configure-signon-policy/main/#authentication-policies) and [Global session policies](/docs/guides/configure-signon-policy/main/#global-session-policies).

After end users satisfy all the authentication requirements, Okta automatically registers them in your org. They’re also provisioned to the appropriate groups defined by the profile enrollment policy. Okta then redirects the end users to your app or your org's Okta End-User Dashboard.

If your org doesn't use [password-optional authentication](https://help.okta.com/okta_help.htm?type=oie&id=ext-passwordless), you can still configure the email verification to be optional. After registration, Okta redirects end users to your custom application or your org's Okta End-User Dashboard. The end user still receives a verification email, but clicking the verification link isn't required for the user to complete the sign-in process.

However, if SSR is disabled for your app and the end user enters a username that doesn't exist in the org, they are prompted to enter a password but won't be able to sign in. In this scenario, the option to sign up for an account isn't shown on the Sign-In Widget. You must have an alternate method to create the accounts for new users. See [Add users manually](https://help.okta.com/okta_help.htm?type=oie&id=ext-usgp-add-users).

## About progressive enrollment

When companies want more data about their customers, they generally ask for details when customers first sign up for their application. However, asking for detailed information during a first interaction creates high friction and drop-off rates. Customers are wary of sharing personal information and need to build a trust relationship with a new website or application before adding account information to their profile.

With support for progressively building user profiles built into the Okta authentication process, companies can use profile enrollment policies to create custom forms for their sign-in flows. They can collect profile data incrementally as end users engage with the application.

Information is only requested when relevant to the end user’s activities. These new details are validated during the sign-in process to ensure that accurate information is added to the end user's Okta Universal Directory profile.

You can also integrate registration inline hooks into the sign-in process to trigger custom code interactions between Okta and your application. See [Registration Inline Hooks](/docs/guides/registration-inline-hook/nodejs/main/).

In a progressive enrollment scenario, existing registered end users can sign in using established credentials. Okta then evaluates the end user against the Authentication policies in place or, if applicable, the Global Session Policy. See [Authentication policies](/docs/guides/configure-signon-policy/main/#authentication-policies) and [Global session policies](/docs/guides/configure-signon-policy/main/#global-session-policies).

Okta evaluates the profile enrollment policy every time the end user attempts to sign in to an app. If you add required attributes to the enrollment form, Okta prompts the end user for this information during their next sign-in attempt. If an end user is already signed in when you change the policy, they may be prompted for additional data or assigned to a new group at their next sign-in attempt.

## About sign-in flows

The sequence of a sign-in flow depends on the authentication assurance requirements that you set in your policies. Okta Identity Engine requires that the authentication assurance specified in both the Global Session Policy and the authentication policies are satisfied before it allows the end user to access an app.

Sign-on policies supply the context necessary for the user to advance to the next step and specify the actions to take, such as allowing access, prompting for a challenge, or setting the time required before prompting for another challenge.

The Global Session Policy defines access globally, across all apps in your org. See [Global session policies](/docs/guides/configure-signon-policy/main/#global-session-policies).

The Authentication policies enforce end user authentication only in the context of the requested application. See [Authentication policies](/docs/guides/configure-signon-policy/main/#authentication-policies).

The user’s location and profile are verified using both policies' group membership and authentication criteria.

When an end user is allowed to sign in without a password, Okta attempts to optimize the sign-in experience. If the device is enrolled with Okta Verify and a biometric authenticator is enabled, the biometric authenticator is always the first factor used for user authentication.

If end users are required to sign in with a password, the password-first prompt is always displayed. This is true for any authentication policy configuration where the password authenticator is defined along with other authenticators.

### Password / IdP

If any Global Session Policy rule has the primary factor set to **Password / IdP**, end users see the password-first Sign-In Widget.
</br>
<div class="quarter">

![Password-first Sign-In Widget](/img/admin/siw-oie.png)

</div>
</br>

1. End users enter their full app **Username**, including the domain, and then their password in the **Password** field.
The **Keep me signed in** checkbox retains their identifier as well as authenticator verification information on their device for the amount of time designated by the policy rule. This replaces the Remember me option in Classic Engine orgs.
1. End users click **Sign in** to initiate the authentication process.
1. On the security method page, end users pick one of the primary authenticator options allowed by the combined global session and authentication policies.

</br>
<div class="quarter">

![Primary authenticator options](/img/admin/siw-authenticator-oie.png)

</div>
</br>

4. After clicking **Select** to choose an authenticator, end users move to the verification step where they supply the required authenticator and then click **Verify**.

### Password / IdP / any factor allowed by app sign-on rules

If any Global Session Policy rule has the primary factor set to **Password / IDP / any factor allowed by app sign on rules**, end users see the identifier-first Sign-In Widget as the first screen during their access flow.

</br>
<div class="quarter">

![Primary authenticator options](/img/admin/sign-in-widget-username-fp.png)

</div>
</br>

1. End users enter their full app Username, including the domain, and click Next.
   - The **Keep me signed in** checkbox retains their identifier as well as authenticator verification information on their device for the amount of time designated by the policy rule. This replaces the **Remember me** option in Classic Engine orgs.
   - If the username is unknown to the org, the Sign-In Widget displays a warning that there is no account with that username and returns an error that the user can't sign in.
1. On the security method page, end users pick one of the primary authenticator options allowed by the combined global session and authentication policies.

</br>
<div class="quarter">

![Primary authenticator options](/img/admin/siw-authenticator-oie.png)

</div>
</br>

3. After clicking **Select** to choose an authenticator, end users move to the verification step where they supply the required authenticator and then click **Verify**.

## Configure profile enrollment policies

> **Note:** Super admin access is required to create policies and configure profile enrollment policies.

A profile enrollment policy collects attributes from an end user when they attempt to access an app. The policy can be used for self-service registration or for progressive enrollment.

In self-service registration scenarios, end users click a **Sign-up** link in the Sign-In Widget, and when they authenticate into the app, Okta adds their profile and provisions them to the appropriate groups. The default profile enrollment policy has Sign-up enabled and it controls self-service registration for your entire org.

In progressive enrollment scenarios, the enrollment policy can collect additional data requested by an application. This collection happens through the profile enrollment form shown to the user when they sign in to your application. Progressive enrollment is useful if you want to have a user’s email address added to their profile before they access a sensitive application, or when visitors need to create a profile before they can view or download resources.

### Create a profile enrollment policy

1. In the Admin Console, go to **Security** > **Profile Enrollment**.
1. Select the Default Policy, or, to create a new one, click **Add Profile Enrollment Policy**.
1. Enter a new policy **Name**.
1. Click **Save**.

### Select a profile enrollment policy

You can change which app integrations use a policy for profile enrollment:

1. In the Admin Console, go to **Security** > **Profile Enrollment**.
1. Under the **Actions** column for the policy you want to update, select the **Edit** icon.
1. Click **Manage Apps**.
1. On the **Apps using (policy name)** page, click **Add an App to This Policy**.
1. Click **Apply** for each app integration that you want to add to this policy.
1. Click **Close**.
1. Optional. Under the **Actions** dropdown menu, you can click **Go to this app** to open the settings page for that app integration.
1. Optional. Under the **Actions** dropdown menu, you can click **Apply a different policy** to switch to a different policy that the app integration can use for profile enrollment. Click **Save** to confirm your change or **Cancel** to continue using the original policy.
1. Click **Back to Profile Enrollment Policy**.

### Collect profile information and register users

Okta can assist you in collecting profile data from end users before they can access any app integrations which use a specific policy. To configure what data Okta collects:

1. In the Admin Console, go to **Security** > **Profile Enrollment**.
2. Under the **Actions** column for the policy you want to update, select the **Edit** icon.
3. In the **Profile Enrollment** section, click **Edit** to modify the options:
   * **Self-service registration:** You can choose one of two options:
      * **Allowed:** Select this option if you want your end users to be able to self-register their Okta account in your org by clicking the **Sign up** link on the Sign-In Widget.
      * **Denied:** Select this option if you want your end users to create their Okta account through another method or if you want to create a progressive enrollment policy.
         * In progressive enrollment scenarios, self-service registration is denied but users are prompted for missing profile attributes the next time they sign in.
         * With the **Denied** option selected, the **Sign up** link is hidden on the Sign-In Widget.
      * If you want to allow users to self-register for an app integration but not to your entire org, select **Denied** in your Default Policy. Then create a new profile enrollment policy specifically for that app with **Self-service registration** set to **Allowed**.
   * **Email verification:** If this checkbox is selected, the end user must verify their account through an automated email sent to the address they provided. Until they complete this step, they can't access the app integrations that use this policy. If this checkbox isn't selected, email verification isn't required to sign in. Email verification is required if your org is using password-optional authentication.
   * **Add the user to group:** End users are automatically added to all groups listed here. If needed, click **Go to Groups** to open the Groups page in the Admin Console and manage the groups in your org.
   * **Inline hook:** To use an inline hook as part of your user registration process, first you must add the hook to your Okta workflow. See [Inline Hooks](https://help.okta.com/okta_help.htm?id=ext_inlinehooks). After the hook has been created, select it from the **Use the following inline hook** dropdown menu.
    After selecting an inline hook, you can **Run this hook**:
      * **When a new user is created:** This trigger occurs during a self-service registration request.
      * **When attributes are collected for an existing user:** This trigger occurs during a progressive enrollment sign-in request.
      * **Both:** This trigger occurs during a self-service registration request and also during a progressive enrollment sign-in request.
   * **Customize label:** The profile enrollment form shown to end users can be customized with a header at the top and a confirmation button at the bottom. Enter the text you want displayed to your end users:
      * **Form header:** The text at the top of the enrollment form. For example, `Sign in` or `Log in to your personal account`.
      * **Submit button:** The text displayed on the confirmation button. For example `Submit` or `Log in`.
4. Click **Save**.

### Create a custom profile enrollment form

You can create or edit a custom profile enrollment form for progressive enrollment scenarios. End users are prompted for input during their next sign-in attempt if a required attribute is missing from their profile.

Before you begin, keep the following in mind:

* The attributes added to the profile enrollment form must exist in the default user profile for Okta Universal Directory. Both base and custom attributes are permitted. See [About profile types](https://help.okta.com/okta_help.htm?type=oie&id=ext-usgp-about-profiles).
* The User permission for each attribute must be set to Read-Write before the end user can update the attribute using the profile enrollment form.
* See [Understand attribute rules for the profile enrollment form](#understand-attribute-rules-for-the-profile-enrollment-form) for a complete summary on adding, editing, and deleting profile attributes.
* Super admin access is required to modify the profile enrollment form.

#### Customize the form sign-in options

The profile enrollment form shown to end users can be customized with a header at the top and a confirmation button at the bottom.

Use the following procedure to change these labels:

1. In the Admin Console, go to **Security** > **Profile Enrollment form**.
2. Under the Actions column for the policy you want to update, select the **Edit** icon.
3. In the **Profile enrollment** section, click **Edit** to modify the options.
4. Scroll to **Customize label**, and then enter the text you want to show your end users:
   * **Form header:** The text at the top of the enrollment form. For example, `Sign in` or `Log in to your personal account`.
   * **Submit button:** The text displayed on the confirmation button. For example, `Submit` or `Log in`.

#### Create the custom profile enrollment form

When creating a custom profile enrollment form, keep in mind the following:

* If an attribute is defined in any of your Okta user profiles with any of the following conditions, it can't be added to the enrollment form:

   * A user permission set to Read-only or Hide
   * Marked as sensitive
   * Sourced from an external application
* You can't add an attribute more than once to the enrollment form.
* You should observe a limit of 10 attributes to the enrollment form to prevent overloading the interface displayed to the end user.

Use the following procedure to create the customized enrollment form that Okta will use to add end user information to their profiles:

1. In the Admin Console, go to **Security** > **Profile Enrollment**.
1. Under the **Actions** column for the policy you want to update, select the **Edit** icon.

   * The **Profile enrollment form** section shows the profile attributes that the enrollment form collects from end users. When you create the policy, these fields are populated using the attributes that are marked as required in the Universal Directory default profile.
   * Default fields show up first in the enrollment form. However, you can change the order of the attributes by clicking and dragging each attribute under the **Order** column. This changes the order shown on the enrollment form displayed to the end user.
   * Use the **Edit** or **Delete** actions to modify or remove any attributes from the enrollment form. If these actions are not present, those attributes can't be changed or removed from the profile enrollment form. See [Understand attribute rules for the profile enrollment form](#understand-attribute-rules-for-the-profile-enrollment-form).
1. Click **Add form input** to pick additional attributes from the Universal Directory.
1. Select the attribute from the dropdown menu. The **User permission** for the attribute must be set to **Read-Write** before the attribute can be added to the enrollment form.
1. In the **Add form input** dialog, verify that the **Data type** and **Attribute requirement** information match the settings from the Universal Directory default profile. To modify these settings, click **Go to Profile Editor**:
   a. Select the **User (default)** profile.
   b. Locate the attribute, and then click the information icon to edit the attribute properties.
   c. In the **User permission** section, select **Read - Write**. End users require write access to update any attribute information in their profile.
   d. Click **Save Attribute**.
   If your Okta org provides access to the Okta End-User Dashboard, registered end users can modify the value of this attribute through their personal settings page.
1. In the **Customize form input** section, you can modify the following fields for the attributes:
   * **Form label:** This is the text label for the attribute that is shown to the end user.
   * **Input requirement:** This indicates whether this attribute must be provided by the user for the form to proceed. See [Understand attribute rules for the profile enrollment form](#understand-attribute-rules-for-the-profile-enrollment-form). If the Okta user profile requires this attribute, you can't change this requirement to be Optional and the end user must provide a value.
   * **Input display type:** This determines what type of input form the enrollment form shows to the end user. For example, a text box, radio buttons, or a dropdown menu.
   * **Input form validation:** If the user must provide the input in a particular format, you can select an input validation method from the dropdown menu. Validation is available for phone numbers and calendar dates.
1. Click **Save**.

#### Remove attributes from the enrollment form

To remove an attribute from the enrollment form:

* Click **Delete** on that row of the form. If the delete action is unavailable, the attribute is either required by the default user profile, or there is an error condition that must be resolved.
* Click **Delete form input** to confirm the deletion or **Cancel** to keep the attribute.

You can't edit or delete the base attributes that are required in the default user profile: Primary email, Last name, or First name.

If you remove an attribute from the enrollment form, you can add it back at a later time.

### Understand attribute rules for the profile enrollment form

When working with the profile enrollment form, you should understand the requirements and user permission settings of the Okta Universal Directory (UD) attributes inherited by the form.

The goal of the profile enrollment form in a Progressive Enrollment scenario is to collect information about the end user and add it to their Okta user profile. Therefore, the attributes shown to the end user must already be defined in the default user profile of UD.

#### Base attributes

There are 31 predefined attributes in the Okta default user profile. See [About profile types](https://help.okta.com/okta_help.htm?type=oie&id=ext-usgp-about-profiles). You can add any of these base attributes to the profile enrollment form, but they must adhere to the following rules:

* Any UD attribute you want to use in the profile enrollment form must have a **User permission** setting of **Read-Write**. This is necessary to allow users to update the value of this attribute during the sign-in process.
   * If a UD attribute has a **User permission** of **Hide** or **Read Only**, the enrollment form is disabled. You can't add, edit, or delete any part of the form until you change the **User permission** level using the **Profile Editor**.
* If the **Attribute required** setting is enabled for the attribute in UD, it is automatically added to the profile enrollment form when you create the enrollment policy.
   * You can edit the **Form label** shown to the end user for this attribute.
   * You can't change the **Input requirement** for this attribute. It's set to **Required** because the end user must provide a value so Okta can add it to the user's UD profile and continue the sign-in process.
   * The profile enrollment form shows the value for this **Input requirement** field in the **Requirement** column.
   * You can't change the **Input display** type.
   * You can't delete this attribute from the form.
* If the **Attribute required** setting isn't enabled for the attribute in UD, then the attribute isn't automatically added to the form.
   * You can add or delete this attribute from the enrollment form later.
   * You can edit the **Form label** shown to the end user for this attribute.
   * You can change the **Input requirement** for this attribute to either **Required** or **Optional**.
      * **Required:** The end user must provide this input to continue the sign-in process.
      * **Optional:** The end user can skip this input and continue the sign-in process.
   * The profile enrollment form shows the value of this **Input requirement** field in the **Requirement** column.
   * You can delete this attribute from the enrollment form, as the attribute isn't required at the UD profile level.

The following table explains the required conditions and permitted actions for a few example base profile attributes.

| UD: Variable name | UD: Attribute | PE: Automatically added to the form | PE: Action permitted |
|----|--------------------------|----|--------------------------|
| `user.login` | Yes | Yes | <ul><li>Edit form label only</li></ul> |
| `user.firstName` | Yes | Yes | <ul><li>Edit form label only</li></ul> |
| `user.middleName` | No | No | <ul><li>Add</li><li>Edit form label</li><li>Edit input requirement</li><li>Delete</li></ul> |
| `user.title` | No | No | <ul><li>Add</li><li>Edit form label</li><li>Edit input requirement</li><li>Delete</li></ul> |

#### Custom attributes

Custom attributes are any attributes outside the base Okta UD attributes (for example, a favorite team for a sports fan or a vaccination status for a pharmacy customer). The custom attributes for which you want to collect data from the end user must be added to the UD profile before you can add them to the profile enrollment form.

Custom attributes follow the same restrictions as base attributes:

* You must set the attribute's **User permission** setting to **Read-Write** in UD so it can be added to the profile enrollment form.
* If it's marked as a required attribute in UD, you can edit the attribute's label for the profile enrollment form, but you can't delete it.
* If it is marked as an optional attribute in UD, then you can edit the attribute's label and input options (including specifying it as a required or optional step for the enrollment form) or delete it.
* You can change the **Input display type** to a value that best reflects the kind of information expected from the end user. Most fields have a string data type and use a text box as the input type, although the enumeration data type uses either a radio button or a dropdown menu. However, if you select fields with a data type such as country code or a Boolean the enrollment form changes to the corresponding input type.

The following table explains the required conditions and permitted actions for a few example custom profile attributes.

| UD: Variable name | UD: Attribute | PE: Automatically added to the form | PE: Action permitted |
|----|--------------------------|----|--------------------------|
| `favoriteTeam` | Yes | Yes | <ul><li>Edit form label only</li></ul> |
| `favoritePlayer` | No | No | <ul><li>Add</li><li>Edit form label</li><li>Edit input requirement</li><li>Edit input type</li><li>Delete</li></ul> |

### Reassign a profile enrollment policy

Okta applies a profile enrollment policy to every app integration in your org. When you add a new app integration to your org, Okta automatically assigns the default policy to the app integration. You can reassign the app integration to a different policy that meets your enrollment needs.

If you want to delete an existing profile enrollment policy, you must first reassign any app integrations currently using that policy.

1. In the Admin Console, go to **Security** > **Profile Enrollment**.
2. On the **Profile Enrollment** page, locate the currently assigned policy and click the **Edit** icon in the **Actions** column.
3. On the policy page, click the menu icon on the app integration tile, and select **Apply a different policy**.
4. In the **Change a Profile Enrollment Policy** dialog, use the dropdown list to pick the new enrollment policy for the app integration. You can click **View all profile enrollment policies** to see the full list of policies available on the **Profile Enrollment** page.
5. Click **Save** to complete the policy change.
6. Repeat these steps for each app integration you want to reassign.
7. Click **Back to all Profile Enrollment Policies**.

### Delete a profile enrollment policy

You can delete any profile enrollment policy that isn't currently in use or the default policy.

> **Note:** A deleted profile enrollment policy can't be recovered.

1. In the Admin Console, go to **Security** > **Profile Enrollment**.
2. On the **Profile Enrollment** page, locate the policy you want to remove.
3. Click the **Delete** icon in the **Actions** column. If the **Delete** icon isn't enabled, you must remove any app integrations currently using the policy. See [Reassign a profile enrollment policy](#reassign-a-profile-enrollment-policy).
4. Click **Delete Policy** to complete the process.

## Next steps

* [Registration Inline Hook](/docs/guides/registration-inline-hook/nodejs/main/)

## See also

* [Embedded SDK use cases - self-service registration](/docs/guides/oie-embedded-sdk-use-case-self-reg/nodejs/main)
