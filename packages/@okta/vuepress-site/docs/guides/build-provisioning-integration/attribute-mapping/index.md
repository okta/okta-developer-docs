---
title: Check the attributes and corresponding mappings
---

When you add a SCIM template integration to your development org, it comes with base attributes set by default. The user schema in your SCIM application might not support all of these attributes. It is important that you go through the steps below to ensure that the integration you're submitting to Okta for review reflects the attributes supported by your application.

>**Note:** Confirm your attributes and mappings before you submit your integration for review, or your submission will be returned by the Okta OIN team with a request to update your attributes.

## Delete attributes

Before you can delete an attribute, you first need to remove the mapping for that attribute.

A. Remove the mapping

  1. From the Admin Console, open your SCIM integration.

  1. Go to the **Provisioning** tab. Under the **SETTINGS** section, click **To App**.
    ![Provisioning to App tab](/img/oin/scim_check-attributes-1.png "Provisioning Tab: Provisioning to App")

  1. Scroll to the **Attribute Mappings** section. Look for the attribute that you want to delete and then click **X**.
    ![Attribute Mappings](/img/oin/scim_check-attributes-2.png "Attribute Mappings")

  1. Click **OK** to confirm that you want to remove the mapping for the attribute you selected.
    ![Remove Mapping](/img/oin/scim_check-attributes-3.png "Remove Mapping")

  1. After removing the mapping for the unwanted attributes, click **To Okta** under the settings section.
    ![Provisioning to Okta tab](/img/oin/scim_check-attributes-4.png "Provisioning Tab: Provisioning to Okta")

  Repeat Step 3 and 4 until you remove all the mappings for the attributes you want to delete.

B. Delete attributes from your attribute list

  1. After removing all the mappings for the attribute you want to delete, Click **To App**.
    ![Provisioning to App tab](/img/oin/scim_check-attributes-1.png "Provisioning Tab: Provisioning to App")

  1. Scroll to the **Attribute Mappings** section. Click **Go to Profile Editor**.
    ![Attribute Mappings - Profile Editor](/img/oin/scim_check-attributes-6.png "Attribute Mappings - Profile Editor")

  1. In the Profile Editor, scroll down to the attribute list.
  
  1. Look for the attribute that you want to delete, and click **X**.
    ![Profile Editor - Remove Attribute](/img/oin/scim_check-attributes-7.png "Profile Editor - Remove Attribute")

  1. Click **Delete Attribute** to confirm that you want to remove the attribute.
    ![Profile Editor - Delete Attribute](/img/oin/scim_check-attributes-8.png "Profile Editor - Delete Attribute")

## Add attributes

1. From the Admin Console, open your SCIM integration.

1. Go to the **Provisioning** tab. Under the **SETTINGS** section, click **To App**.
  ![Provisioning to App tab](/img/oin/scim_check-attributes-1.png "Provisioning Tab: Provisioning to App")

1. Scroll to the **Attribute Mappings** section. Click **Go to Profile Editor**.
  ![Attribute Mappings - Profile Editor](/img/oin/scim_check-attributes-6.png "Attribute Mappings - Profile Editor")

1. In the Profile Editor, click **Add Attribute**.
  ![Profile Editor - Add Attribute](/img/oin/scim_check-attributes-10.png "Profile Editor - Add Attribute")
  Enter the information for the new attribute that you’re adding and then click Save. For example:
  ![Profile Editor - Add Attribute Dialog](/img/oin/scim_check-attributes-11.png "Profile Editor - Add Attribute Dialog")

   >**Note:** The Scope property determines whether the attribute you are adding can be assigned at a group level or just per user. If you would like your admins to be able to assign a value for this attribute at a group level, don't check the **User personal** checkbox.

1. After adding an attribute, you can add a mapping for that new attribute.

## Map attributes

1. From the Admin Console, open your SCIM integration.

1. Go to the **Provisioning** tab. Under the **SETTINGS** section, click **To App**.
  ![Provisioning to App tab](/img/oin/scim_check-attributes-1.png "Provisioning Tab: Provisioning to App")

1. Scroll to the **Attribute Mappings** section. Look for the attribute that you want to update and click **Edit**.
  ![Attribute Mappings - Edit Attribute](/img/oin/scim_check-attributes-13.png "Attribute Mappings - Edit Attribute")

1. In the dialog that appears, there are two drop-down fields. In the first drop-down menu, select **Map from Okta Profile**. In the second drop-down menu, choose the Okta profile attribute that you would like to map the SCIM attribute from. Click **Save**.
  ![Attributes - Map Attribute](/img/oin/scim_check-attributes-14.png "Attributes - Map Attribute")

1. Repeat for all other SCIM attributes where you would like to modify the mapping (from Okta to your application).

1. After updating the mappings from Okta to your application, click **To Okta** under the settings section.
  ![Provisioning to Okta tab](/img/oin/scim_check-attributes-4.png "Provisioning Tab: Provisioning to Okta")

1. Scroll to the **Attribute Mappings** section. Look for the attribute that you want to update and click **Edit**.
  ![Attributes - Edit Attribute](/img/oin/scim_check-attributes-16.png "Attributes - Edit Attribute")

1. In the dialog that appears, there are two drop-down fields. In the first drop-down menu, select **Map from {App Name} App Profile**. In the second drop-down menu, choose the Okta profile attribute you would like to map the SCIM attribute to. Click **Save**.
  ![Attribute Dialog - Map Attribute](/img/oin/scim_check-attributes-17.png "Attribute Dialog - Map Attribute")

1. Repeat for all other SCIM attributes that you would like to modify the mapping (from your application to Okta).

## Attribute support

You only want to include the attributes that you support in your current user schema. To ensure that the attributes are being sent properly to and from Okta:

1. When assigning a user to the SCIM integration that you added in your dev org, ensure that all expected attributes are populated for that user.

1. After the user is pushed to your SCIM application, check that all attributes are populated in your SCIM repository.

1. If your integration supports User Imports, try importing one user from your application. Check the imported user and ensure that the values for supported attributes are reflected in that imported user's account in Okta.

    1. Go to your Admin Console.
    1. Click **Directory** > **People**.
    ![Admin Dashboard - Directory - People](/img/oin/scim_check-attributes-18.png "Dashboard showing Directory to People menu item")
    1. You should see the list of Okta users for your org. Find the user you just imported and click that user's name.
    1. Once the user account is opened, click **Profile**. The Profile screen shows you that user's attributes. Check whether the values for the attributes you support were imported properly for this user.
    ![User Profile Attributes](/img/oin/scim_check-attributes-19.png "User attributes dialog")
  
        Your Profile Mapping template can always be updated in the future.

        As mentioned in the adding and deleting attributes sections, you can set whether the attribute you are adding is set per user, or for both per user and group. This is set using the Scope attribute. If you want the attribute you are adding to be set strictly  per user, you need to check the **User personal** checkbox for the Scope attribute. If you want to give admins the ability to set the attribute both per user or per group, leave this check box empty.

<NextSectionLink/>
