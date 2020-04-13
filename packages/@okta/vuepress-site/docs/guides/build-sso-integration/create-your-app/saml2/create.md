### Create a SAML integration

If you don't have an Okta developer account, begin by signing up for one at <https://developer.okta.com/signup/>.

1. After you request the developer account and have received the initialization email, click the link to go to your developer org. Sign in as a user with administrative privileges.
1. Navigate to the Admin Console in your Okta org by clicking **Admin**.
  ![Admin Button](/img/oin/scim_end-user-ui.png "Admin Button")
1. If you are in the Developer Console, click **Developer Console** and then **Classic UI** to switch over to the Admin Console in your Okta org.
  ![Switch to Admin Console](/img/oin/scim_switch-ui.png "Switch to Admin UI")
1. Click **Applications** > **Applications**.
  ![Open Applications](/img/oin/scim_open-apps.png "Open Applications")
1. Click **Add Application**.
  ![Create Application](/img/oin/scim_create-app.png "Add App button")
1. Click **Create New App** to start the Application Integration Wizard.
  ![Create New Application](/img/oin/scim_create-app-new.png "Create App button")
1. Choose **Web** as the platform for your app. Web is the only supported platform for SAML 2.0 apps in the OIN.
1. Select **SAML 2.0** in the **Sign on method** section.
1. Click **Create**.
1. On the **General Settings** tab, enter a name for your app and optionally upload a logo. You can also hide the app from your end-user's dashboard and mobile app.
1. On the **Configure SAML** tab, use the SAML information that you gathered in the <GuideLink link="../before-you-begin">first step</GuideLink> to configure the settings of your app in Okta. These steps are also detailed in the SAML App Wizard section of [Using the App Integration Wizard](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Apps_App_Integration_Wizard) in the Okta product documentation.
      1. Enter the Assertion Consumer Service (ACS) URL into the **Single sign on URL** field.
      1. Enter the Audience URI into the **Audience URI (SP Entity ID)** field.  
      If you are just testing your setup and are using a SAML SP such as this [SAML Service Provider on GitHub](https://github.com/mcguinness/saml-sp), enter this test URL into the **Single sign on URL** and **Audience URI (SP Entity ID)** fields: `http://example.com/saml/sso/example-okta-com`.
      1. Choose the **Name ID format** and **Application username** that your application requires (for example, `EmailAddress` and `Email`) or leave the defaults. These are the username format and value that you are sending in the SAML Response.
      1. In the **ATTRIBUTE STATEMENTS (OPTIONAL)** section, enter the required SAML attributes for your app.
      For example:
            | Name (in SAML app)         | Value (in Okta profile)              |
            | ----------------------- | ------------------------- |
            | `FirstName`             | `user.firstName`          |
            | `LastName`              | `user.lastName`           |
            | `Email`                 | `user.email`              |
      1. In the **GROUP ATTRIBUTE STATEMENTS (OPTIONAL)** section, add the required group attributes, if they are used by your app.
      For example:
          * **Name** &mdash; `groups`
          * **Filter** &mdash; `Matches regex`
          * **Value** &mdash; `.*`
      1. Click **Next**.
1. In the final app creation step, the **Feedback** tab helps Okta to understand how you want to position this application.
      * For ISVs that are creating a SAML app for the OIN:
         1. Select **I'm a software vendor. I'd like to integrate my app with Okta**.
         1. Click **Finish**.
      * If you are an Okta customer creating an internal SAML app:
          1. Select **I'm an Okta customer adding an internal app**.
          1. For the check boxes that appear, select the **App type** check box if your company created the app and this app will never be publicly released. If you check this box, you don't need to enter any further information.
          1. Select the **Contact app vendor** check box if Okta needs to contact you to enable SAML for the app. If you select this check box, you need to provide further general information about your app to our app analyst team.

* In the new application window, you can specify **General Settings** and **Sign On** options, as well as assign the app to users in your org. Click **Edit** if you need to change any of the options, and **Save** when you have made your changes.

You are now ready to configure and test your SAML app. You will need to obtain the Identity Provider metadata from within the app that you just created.

1. Inside your application's settings on the Okta Admin Console, select the **Sign On** tab.
1. In the **SIGN ON METHODS** section, locate the **Identity Provider metadata** link in the note above the **CREDENTIALS DETAILS** section.
1. Right-click the **Identity Provider metadata** link and select **Copy Link Address**. This metadata link contains the information that you need to configure SAML in your SAML SP application.
1. Follow the SAML SP app instructions on how to configure the Identity Provider metadata. We recommend using the Identity Provider metadata link to dynamically configure the metadata. If your SP doesn't support dynamic configuration, click **View Setup Instructions**. A new browser tab launches with the information that you need:
    * Identity Provider Single Sign-On URL
    * Identity Provider Issuer
    * X.509 Certificate

Copy this information and use it to configure the Identity Provider metadata in your SAML SP app.

## Use SAML tool-kits

If you have an existing SAML app where you want to add SSO, the following open source tool kits are another way to help you implement the SAML 2.0 specification for the WebSSO Profile for Service Providers using different programming languages:

* [.NET Framework](https://en.wikipedia.org/wiki/.NET_Framework_version_history) 4.5 or later: [Kentor Authentication Services](https://github.com/KentorIT/authservices#kentor-authentication-services)
* .NET Framework 4.0 or earlier: [ComponentSpace SAML 2.0 for ASP.NET and ASP.NET Core](https://www.componentspace.com/) - Paid software, single developer licenses start at $99
* Java: [OpenSAML](https://wiki.shibboleth.net/confluence/display/OS30/Home), which is part of the [Shibboleth Development Project](https://www.shibboleth.net/)
* Java: [Spring Security SAML](/code/java/spring_security_saml)
* PHP: [SimpleSAMLphp](/code/php/simplesamlphp)
* Python: [PySAML2](/code/python/pysaml2)
* Ruby: [Ruby-SAML](https://rubygems.org/gems/ruby-saml)

>**Note:** Okta doesn't own or maintain these tool-kits, though we do provide documentation to help you use them with Okta.
