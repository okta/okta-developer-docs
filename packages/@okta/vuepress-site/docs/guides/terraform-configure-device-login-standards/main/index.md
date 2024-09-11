---
title: Configure minimum standards for login devices using Terraform
excerpt: Require users to authenticate only with phones and computers that meet your organization’s requirements.
layout: Guides
---

Require users to authenticate only with phones and computers that meet your organization’s requirements.

---

#### Learning outcomes

* Improve device security, resource management, and consistency with Okta device assurance policies.

* Review device compliance in the Okta Admin Console.

* Create Okta device assurance policies in Terraform.

* Enforce device requirements during Okta user authentication.

#### What you need

* Familiarity with Terraform terms: configuration, resources, state, and commands. See the [Terraform overview](/docs/guides/terraform-overview).

* An Okta organization.

* A [Terraform configuration](/docs/guides/terraform-enable-org-access/main) that can access your Okta org.

* An Okta pricing plan that [enables Device Assurance in your organization](#confirm-your-org-supports-device-assurance).

* An Okta user account with the Super Administrator role.

* A list of your organization’s requirements for user devices.

## Overview

Using a device's attributes to control access to your organization requires configuring two sets of policies. Device assurance policies configure device requirements, such as a minimum OS version. Authentication policies include rules that use the assurance policies to authorize a connection.

You can manage both types of policies with Terraform.

The benefits of device assurance policies include:

* Improve security by checking that devices meet minimum standards, such as the latest OS updates.

* Improve device configuration consistency, which reduces support burden and vulnerability risks.

* Simplify resource management, policy adjustments, security audits, and policy enforcement by displaying device compliance on one dashboard.

Okta supports device assurance for Android, iOS, macOS, Windows, and ChromeOS platforms. Each platform requires a minimum OS to support the device assurance feature. For more information, see the [minimum supported OS versions](https://help.okta.com/oie/en-us/content/topics/identity-engine/devices/device-assurance.htm).

For user instructions on how to check device compliance, see the [main Okta article for device assurance](https://help.okta.com/oie/en-us/content/topics/identity-engine/devices/device-assurance.htm).

## Confirm your org supports Device Assurance

Some of the steps in this article require that your Okta org and pricing plan support Device Assurance.

1. Open your Okta organization **Admin Dashboard**.

2. In the left navigation, select **Security** and then **Authentication Policies**.

Note: Ignore the **Security > Device Assurance Policies** navigation item for this test.

3. Select a policy, whether it's default or one you’ve already created.

4. Select **Add a policy**.

5. Search for a field with the content:

      ```
      AND Device assurance policy is
      ```

6. If you found that field then you can create authentication policies that reference device assurance policies.

If it doesn't exist, contact Okta Support about feature availability.

7. Select **Cancel** to exit the policy editor.

## Grant API scopes to your API service application

To manage device assurance policies, your Terraform integration must have the following API scopes:

* `okta.deviceAssurance.manage`

* `okta.policies.manage`

For more information on granting scopes, see [Manage your list of API scopes](/docs/guides/terraform-organize-configuration/main/#manage-your-list-of-api-scopes).

## Add a device assurance policy

A different Okta Terraform provider resource represents each device platform as their attributes vary. For example, only mobile devices include an attribute to check for a jailbroken device.

Add code to your configuration for the desired devices and policies. Okta recommends grouping the files for your Terraform scripts into group-related resources. For example, use a file called `devices.tf` for all the code to configure the device assurance resources. For more information, see [Manage your list of API scopes](/docs/guides/terraform-organize-configuration/main/#manage-your-list-of-api-scopes).

Design your policies based on which attributes to *allow* and which to *deny*. For example, you can deny access to any jailbroken mobile device by setting the `jailbreak` attribute to `false`. Similarly, you can set the `os_version` attribute to `10.0` to allow all Windows devices running that version of the OS or higher.

The following code adds device assurance policies for each platform that checks for a minimum OS:

```hcl
resource okta_policy_device_assurance_android device_android{
  name = "Android minimum standards"
  os_version = "12"
}

resource okta_policy_device_assurance_ios device_ios {
   name = "iOS minimum standards"
   os_version = "17.4.1"
}

resource okta_policy_device_assurance_macos device_macos {
   name = "macOS minimum standards"
   os_version = "14.1.1"
}

resource okta_policy_device_assurance_windows device_windows {
   name = "Windows minimum standards"
   os_version = "11.0.0"
}

resource okta_policy_device_assurance_chromeos device_chromeos {
  name = "ChromeOS minimum standards"
  tpsp_os_version = "10.0.19041.1110"
}
```

Below are extended examples for each platform.

### Android

Create an Android device assurance policy:

1. Add the `okta_policy_device_assurance_android` resource to your configuration.

2. Set its `name` argument to a user-visible name for this policy.

3. Set arguments for different signals. The following are the most commonly checked signals. For the complete signal list, see this resource's [provider documentation](https://registry.terraform.io/providers/okta/okta/latest/docs/resources/device_assurance_policy_android).

* `os_version`: The minimum operating system for a device.

* `disk_encryption_type`: The set of required encryption settings for the device. The available options are `FULL` (full disk encryption) and `USER` (OS-level device-created key for profiles (user) encryption).

* `jailbreak`: Specifies if rooted (jailbroken) Android devices are allowed. To forbid rooted devices, set it to `false` and use it in an authentication rule that checks for this device assurance policy and *allows* authentication. Setting it to `true` means that this device assurance policy requires the device to be rooted, which you could use with an authentication rule that explicitly *denies* access in this case.

* `secure_hardware_present`: Specifies if hardware security is required. This refers to a hardware-based trusted execution environment (also called a *trusted processing module*) for storing sensitive key material.

* `screenlock_type`: Specifies the requirements for how to unlock the device. The supported options are `BIOMETRIC` (biometric locking), `PASSCODE` (passcode), and `NONE` (no requirements).

The following code shows typical Android device assurance policy:

```hcl
resource okta_policy_device_assurance_android example{
  name = "Android example"
  os_version = "12"
  disk_encryption_type = toset(["FULL", "USER"])
  jailbreak = false
  secure_hardware_present = true
  screenlock_type = toset(["BIOMETRIC"])
}
```

### iOS

Create an iOS device assurance policy:

1. Add the `okta_policy_device_assurance_ios` resource to your configuration.

2. Set its `name` argument to a user-visible name for this policy.

3. Set arguments for different signals. The following are the most commonly checked signals. For the complete list of signals, see the [Terraform provider documentation for this resource](https://registry.terraform.io/providers/okta/okta/latest/docs/resources/device_assurance_policy_ios)

    * `os_version`: The minimum operating system for a device.

    * `jailbreak`: Specifies if jailbreak devices are allowed. To forbid jailbroken devices, set this to `false` and use it in an authentication rule that checks for this device assurance policy. Set the rule to *allow* authentication. Setting it to `true` means that this device assurance policy requires jailbreaking, which you could use with an authentication rule that explicitly *denies* access.

    * `screenlock_type`: A set of required screen lock actions and behaviors.  The available options are `PASSCODE` (passcode locking) and `BIOMETRIC` (biometric locking).

The following code shows a typical iOS device assurance policy:

```hcl
resource okta_policy_device_assurance_ios ios_example {
  name = "iOS example"
  os_version = "12.4.5"
  jailbreak = false
  screenlock_type = toset(["BIOMETRIC"])
}
```

### macOS

Create a macOS device assurance policy:

1. Add the `okta_policy_device_assurance_macos` resource to your configuration and set its `name` argument to a user-visible name for this policy.

2. Set arguments for different signals. The following are the most commonly checked signals. For the complete list of signals, see the [Terraform provider documentation for this resource](https://registry.terraform.io/providers/okta/okta/latest/docs/resources/device_assurance_policy_macos).

    * `os_version`: Device’s minimum operating system version.

    * `disk_encryption_type`: The set of required encryption settings for the device. The only available option is `ALL_INTERNAL_VOLUMES` ( all internal volumes are encrypted).

    * `screenlock_type`: Specifies a set of required screen lock actions and behaviors. The options are `PASSCODE` (passcode locking) and `BIOMETRIC` (biometric locking).

Your policy can also check signals on devices from a supported third-party signal provider, such as the Google Chrome Device Trust Connector in the Chrome browser. Specify its device signals in your Terraform code with the fields with the prefix `tpsp``_`. For example, `tpsp_os_version` instead of `os_version`.  Okta for device assurance for ChromeOS requires using [Workforce Identity Adaptive Multi-factor Authentication (AMFA)](https://www.okta.com/learn/adaptive-mfa/). Developer Edition Okta orgs don’t support the Google Chrome Device Trust Connector by default. If you're a paying customer, contact Okta developer support to enable third-party signal support on a Developer Edition Okta org.

The following code shows a typical macOS device assurance policy:

```hcl
resource okta_policy_device_assurance_macos macos_example{
  name = "macOS example"
  os_version = "12.4.6"
  disk_encryption_type = toset(["ALL_INTERNAL_VOLUMES"])
  secure_hardware_present = true
  screenlock_type = toset(["BIOMETRIC", "PASSCODE"])
}
```

### Windows

Create a Windows device assurance policy:

1. Add the `okta_policy_device_assurance_windows` resource to your configuration.

2. Set its `name` argument to a user-visible name for this policy.

3. Set arguments for different signals. The following are the most commonly checked signals. For the complete signal list, see the [provider documentation for this resource](https://registry.terraform.io/providers/oktadeveloper/okta/latest/docs/resources/device_assurance_policy_windows).

    * `os_version`: The minimum operating system for a device.

    * `disk_encryption_type`: The set of required encryption settings for the device. The only available option is `ALL_INTERNAL_VOLUMES` ( all internal volumes are encrypted).

    * `screenlock_type`: Specifies a set of required screen lock actions and behaviors.  Options are only `BIOMETRIC` (biometric locking) and `PASSCODE` (passcode).

Your policy can also check signals on devices from a supported third-party signal provider, such as the Google Chrome Device Trust Connector in the Chrome browser. Specify its device signals in your Terraform code with the fields with the prefix `tpsp``_`. For example, `tpsp_os_version` instead of `os_version`.  Okta for device assurance for ChromeOS requires using [Workforce Identity Adaptive Multi-factor Authentication (AMFA)](https://www.okta.com/learn/adaptive-mfa/). Developer Edition Okta orgs don’t support the Google Chrome Device Trust Connector by default. If you're a paying customer, contact Okta developer support to enable third-party signal on a Developer Edition Okta org.



The following code shows a typical Windows device assurance policy:

```hcl
resource okta_policy_device_assurance_windows windows_example{
  name = "Windows example"
  os_version = "12.4.6"
  disk_encryption_type = toset(["ALL_INTERNAL_VOLUMES"])
  secure_hardware_present = true
  screenlock_type = toset(["BIOMETRIC", "PASSCODE"])
}
```

### ChromeOS

Some Okta device assurance policies support ChromeOS configurations. Okta for device assurance for ChromeOS requires using [Workforce Identity Adaptive Multi-factor Authentication (AMFA)](https://www.okta.com/learn/adaptive-mfa/). Developer Edition Okta orgs don’t support the Google Chrome Device Trust Connector by default. If you're a paying customer, contact Okta developer support to enable ChromeOS support on a Developer Edition Okta org.

1. Add the `okta_policy_device_assurance_chromeos` resource to your configuration.

2. Set its `name` argument to a user-visible name for this policy.

3. Set arguments for different signals. The following are the most commonly checked signals. For the complete signal list, see the [Terraform provider documentation for this resource](https://registry.terraform.io/providers/oktadeveloper/okta/latest/docs/resources/device_assurance_policy_chromeos). The fields for signals have the prefix `tpsp_`, which stands for third-party signal provider.

    * `tpsp_os_version`: The minimum operating system for a device.

    * `tpsp_disk_encrypted`: Checks if the disk is encrypted.

    * `tpsp_screen_lock_secured`: Specifies if the screen lock is secured.

The following code shows a typical ChromOS device assurance policy:

```hcl
resource okta_policy_device_assurance_chromeos example{
  name = "example chromeos"
  tpsp_allow_screen_lock = true
  tpsp_browser_version = "15393.27.0"
  tpsp_builtin_dns_client_enabled = true
  tpsp_chrome_remote_desktop_app_blocked = true
  tpsp_disk_encrypted = true
  tpsp_os_firewall = true
  tpsp_os_version = "10.0.19041.1110"
  tpsp_realtime_url_check_mode = true
  tpsp_screen_lock_secured = true
}
```

## Use device assurance for authentication

To use device assurance, add one or more device assurance policies to an authentication policy.

There are two approaches to defining an authentication policy:

* Use the built-in default authentication policy representing your Okta app, such as an OAuth web app. In this case, use a Terraform data source to find the ID for the default authentication policy and then add a rule referencing that policy. For an example, see this [policy rule example in the Terraform git repository](https://github.com/okta/terraform-provider-okta/blob/master/examples/resources/okta_app_signon_policy_rule/basic.tf).

* Create an authentication policy for your Okta app and set the policy ID in a field in your app resource in Terraform.

The high-level steps to enforce device minimum standards:

1. Create device assurance policies for your supported platforms.

2. If you don’t already have one, create an Okta application for which you want access control, such as an OAuth web app. See the provider for resources with the name `okta_app_<type_name>`.

3. Create an authentication policy resource of type [okta_app_signon_policy](https://registry.terraform.io/providers/okta/okta/latest/docs/resources/app_signon_policy).

4. Create an authentication policy rule of type [okta_app_signon_policy_rule](https://registry.terraform.io/providers/okta/okta/latest/docs/resources/app_signon_policy_rule) that specifies your device assurance policies. Each rule references its associated policy in its argument `policy_id`. One rule can reference multiple device assurance policies using a list of their IDs.

5. Attach the authentication policy to your Okta application by setting the app's policy ID in the `authentication_policy` field.

The following example creates an OAuth application using an `okta_app_oauth` resource and then adds an authentication policy (a sign-on policy) that contains two policy rules:

* One policy rule references the device assurance policy as a matching criterion for authentication.

* A second policy rule denies all connections that failed the first rule.

Some resource types have a `priority` field, which includes policies and rules. When your Terraform code includes more than one of these types of resources, you must define their creation order. This is done using a combination of two fields:

* Add a `priority` field and assign a number starting with `1` for the highest priority.

* Rules with lower priorities must use the Terraform special attribute `depends_on`. Set the value to the priority of the rules that must be created before the current one.

This example shows an authentication policy with two device assurance rules that use priority and `depends_on`. The rule with the lower priority, `my_signin_policy_denyall`, depends on the one with higher priority:

```hcl
resource "okta_app_oauth" "OAuthFakeApp" {
  label                      = "OAuthFakeApp"
  type                       = "web"

  authentication_policy      = okta_app_signon_policy.my_signin_policy.id

  # Your other app fields go here

}

# AUTHENTICATION POLICIES AND RULES

resource "okta_app_signon_policy" "my_signin_policy" {
  name        = "My App Sign-On Policy"
  description = "Authentication Policy to be used on my app."
}

resource "okta_app_signon_policy_rule" "my_signin_policy_deviceassurance" {
  policy_id  = okta_app_signon_policy.my_signin_policy.id
  name        = "my_signin_policy_deviceassurance"
  factor_mode = "1FA"
  priority = 1
  access = "ALLOW"  # the default

  device_assurances_included = [
    okta_policy_device_assurance_android.device_android.id,
    okta_policy_device_assurance_ios.device_ios.id,
    okta_policy_device_assurance_macos.device_macos.id,
    okta_policy_device_assurance_windows.device_windows.id
  ]
  constraints = [
    jsonencode({
      "knowledge" : {
        "types" : ["password"]
      },
    })
  ]
}

resource "okta_app_signon_policy_rule" "my_signin_policy_denyall" {
  policy_id  = okta_app_signon_policy.my_signin_policy.id
  name        = "my_signin_policy_denyall"
  factor_mode = "1FA"
  priority = 2
  access = "DENY"

  depends_on = [ okta_app_signon_policy_rule.my_signin_policy_deviceassurance ]
}
```

## Remove a device assurance policy or authentication rules

To remove a device assurance policy from your Terraform configuration:

* Remove the resource from your Terraform configuration file.

* Remove any references from authentication policies or elsewhere.

When you run `terraform apply`, Terraform removes the old policies from your Okta org.

