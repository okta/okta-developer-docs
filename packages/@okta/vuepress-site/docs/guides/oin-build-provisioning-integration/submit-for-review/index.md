---
title: Submit your app to Okta for review and test
---

Once you have a functioning SCIM app integration in your developer org, there are a few steps to submit it for Okta review via the OIN Manager.

Your submission provides Okta with all the metadata needed to create a customized app for publication in [the Okta Integration Network](https://www.okta.com/resources/find-your-apps/). Okta will review the submission, create the customized app, run it through our internal QA, and then make it available in your developer org for your own testing.

We recommend completing these five steps before actual submission, with detailed instructions in the next section:

1. Check the Profile Attributes for your application.
2. Check the Attribute Mappings for your application.
3. Run the second set of Runscope tests: Okta SCIM 2.0 CRUD Test.
4. Prepare the customer-facing configuration guide.
5. Create a demo video showing working integration (optional)

After performing these steps, navigate to the OIN Manager at [https://oinmanager.okta.com/](https://oinmanager.okta.com/) to complete the submission form and track review status.

### Check the Profile Attributes for your Application

Before submitting your application to Okta, you should check the
User Attributes to make sure that the attributes are set to what
you would want your users to see.

Check your Profile Attributes as follows:

* From the "Admin" section in Okta, open the settings page for your application.
* In the "Provisioning" tab, scroll to the bottom and click the "Edit Attributes" button in the "User Attributes" section.
* A "Profile Editor" screen will open, check the following settings:
  * The "Display name" for the application
  * The "Description"
  * In the "Attributes" section, remove all attributes that are not supported by your application.

    This is an important step! Your users will get confused if your application appears to support attributes that are not supported by your SCIM API.

    You can delete an attribute by selecting it, then clicking the "Delete" button located in right hand attribute details pane. Before removing, check the mapping between Okta and Application and **remove the mappings** for the attribute(s) to be deleted.

### Check the Attribute Mappings for Your Application

The last step for you to complete before submitting your
application to Okta is to check the User Profile Mappings for your
application. These mappings are what determine how profile
attributes are mapped to and from your application to an Okta
user's Universal Directory profile.

To check the User Profile Mappings for your application, do the
following:

* From the "Admin" section in Okta, open the settings page for your application.
* In the "Provisioning" tab, scroll to the bottom and click the "Edit Mappings" button in the "Attribute Mappings" section.
* Check that each mapping is what you would expect it to be. Be sure to check both of the following:
  1. From your application to Okta.
  2. From Okta to your application.

### Run the Second Set of Runscope Tests: Okta SCIM 2.0 CRUD Test

This is an important test that needs to be run in order to check if the Application
can handle the **CR**eate, **U**pdate and **D**eactivate (CRUD) users functionality from Okta.
This allows the Application to be tested with actual Okta integration so thereby achieving end to end testing.

The test follows this pattern:

1. Check the Application added to the Okta org (Preview org or Developer account org)
2. Adds a new user in Okta.
3. Assign the user to the application.
4. Validates in the Application if the user has been created.
5. Update the user firstName attribute in Okta.
6. Validates in the Application if the user attribute has been updated.
7. Deactivate the user in Okta.
8. Validates in the Application if the user has been deactivated.
9. Reactivate the user in Okta
10. Re assign the Application to the user.
11. Validates the user creation/update in Application.

If you are already familiar with Runscope, then import the [OKTA SCIM 2.0 CRUD](/standards/SCIM/SCIMFiles/Initial_Script_CRUD.txt) Test and configure the `SCIM Base URL` variable to point at the base URL for your SCIM server, for example: `https://example.com/scim/v2`.

* [Okta SCIM 2.0 CRUD Test JSON](/standards/SCIM/SCIMFiles/Okta-SCIM-CRUD-Test.json)

If you are not familiar with Runscope, follow [the detailed instructions](#set-up-runscope) to get started with using Runscope to test your SCIM server.

#### Prepare the Customer-Facing Configuration Guide

We recommend preparing the customer-facing configuration guide before beginning to work through the submission document. This guide will be exposed externally in the administrator UI to end customers. For more details, see the [configuration guide guidelines](http://saml-doc.okta.com/Provisioning_Docs/SCIM_Configuration_Guide_Instructions.pdf).

Note: When you are ready, use [this form](https://oinmanager.okta.com/) to submit for Okta review.

<NextSectionLink/>
