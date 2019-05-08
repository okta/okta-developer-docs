---
title: Spring Security SAML
language: Java
excerpt: >-
  Guidance on how to SAML-enable your application using open source Spring
  Security library.
redirect_from:
  - /docs/examples/spring_security_saml.html
  - /docs/guides/spring_security_saml.html
component: Code
---

# <i class='icon-48 docsPage code-spring'></i> Overview

This guide describes how to use Spring Security SAML to add support
for Okta (via SAML) to Java applications that use the Spring framework.
In this guide, you will learn how to install and configure an Okta
SAML application.

This guide assumes that you are familiar
with the basics of Java software development: editing text files,
using the command line, and running Tomcat, Maven or Gradle.

If you're already familiar with Okta and Spring, you can skip to
the section titled "Configuring Spring Security SAML to work with Okta".


>Note: The Spring security SAML toolkit you download is not Okta's toolkit and is not supported by Okta.

## Requirements

Please make sure the following are installed before starting installation:

[Java 1.6+ SDK](http://www.oracle.com/technetwork/java/javase/overview/index.html)
	- Check using the command below

	java -version

[Apache Maven](https://maven.apache.org)
	- Check using the command  below

	mvn --version


## Installation

This section covers what you need to do to install and configure Tomcat from scratch on Mac OS X. If you already have Tomcat on your system, you can skip to Step 2 below.

How to install the Spring Security SAML sample Okta application on Mac OS X:

1. **Installing Tomcat**
	- If it's not already installed, install Tomcat with Homebrew using [these directions](https://github.com/mhulse/mhulse.github.io/wiki/Installing-Apache-Tomcat-using-Homebrew-on-OS-X-Yosemite)


2. **Downloading the Spring SAML Extension**

	- Use `git clone` to clone the extention locally

	  ```bash
	  git clone https://github.com/spring-projects/spring-security-saml.git
	  ```


3. **Downloading sample application**

	- Use `git clone` to clone this repository locally

	  ```bash
	  git clone https://github.com/nshobayo/okta-SpringSAML.git
	  ```

	- Use the command below to copy the sample Okta application into the Extension's "src" folder

	  ```bash
	  rm -rf spring-security-saml/sample/src/main
	  cp -r okta-SpringSAML/src/main spring-security-saml/sample/src
	  ```

4. **Compilation**

	- Make sure your working directory is the `sample` subdirectory of the `spring-security-saml` directory

	  ```bash
	  cd spring-security-saml/sample
	  ```

	- To compile

	  ```bash
	  ../gradlew build install
	  ```

	This task compiles, tests, and assembles the code into a `.war` file.

	Asuccessfulbuildshouldlooksomethinglikethis:![successful build](/img/spring-security-saml-build.png "successful build")

	- Your compiled war archive file, `spring-security-SAML2-sample.war`, can be found in directory `build/libs/`


5. **Deployment**

	- Assuming your current directory is `spring-security-saml/sample` Use the command below to copy the compiled `spring-security-SAML2-sample.war` file to the Tomcat directory you set up in step one

	  ```bash
	cp build/libs/spring-security-SAML2-sample.war /Library/Tomcat/webapps/
	  ```


6. **Starting Tomcat**

	- Use the command below to start Tomcat

	  ```bash
	/Library/Tomcat/bin/startup.sh
	  ```


7. **Starting Application**
	- Load the Spring SAML application by opening this Link: `http://localhost:8080/spring-security-saml2-sample/saml/discovery?entityID=http%3A%2F%2Flocalhost%3A8080%2Fspring-security-saml2-sample%2Fsaml%2Fmetadata&returnIDParam=idp`
	- **Note:** Links on app will not be functional as of yet because we have not yet configured any IDPs. Full app functionality  will be completed after the "Configuring Spring Security SAML to work with Okta" section.

	Here'swhatitshouldlooklike:![App Running](/img/spring-security-saml-intro.png "App Running")

## Configuring Okta to work with Spring Security SAML

Before we can configure Spring Security SAML we need to set up an
application in Okta that will connect to Spring Security SAML.

In SAML terminology, what we are doing here is configuring Okta, our
SAML Identity Provider (SAML IdP), with the details of Spring Security
SAML, the new SAML Service Provider (SAML SP) that you will be creating
next.

Here is how to configure Okta:

1.  Log in to your Okta organization as a user with administrative
	privileges.

	If you don't have an Okta organization, you can create a free Okta
	Developer Edition organization here:
	<https://developer.okta.com/signup/>

2.Clickontheblue"Admin"button![](/img/okta-admin-ui-button-admin.png "")

3.Clickonthe"AddApplications"shortcut![Add Applications](/img/okta-admin-ui-add-applications.png "Add Applications")

4.Clickonthegreen"CreateNewApp"button![Create New App](/img/okta-admin-ui-button-create-new-app.png "Create New App")

5.  In the dialog that opens, select the "SAML 2.0" option, then click
	thegreen"Create"button![Create a New Application Integration](/img/okta-admin-ui-create-new-application-integration.png "Create a New Application Integration")

6.  In Step 1 "General Settings", enter "Spring Security SAML" in the
	"Appname"field,thenclickthegreen"Next"button.![General Settings](/img/spring-security-saml-okta-general-settings.png "General Settings")

7.  In Step 2 "Configure SAML",
	Paste the URL below into the "Single sign on URL" field:

	```bash
	http://localhost:8080/spring-security-saml2-sample/saml/SSO
	```

	Then paste the URL below into the "Audience URI (SP Entity ID)"
	field:

	```bash
	http://localhost:8080/spring-security-saml2-sample/saml/metadata
	```

	Attributes of the user to be sent in each SAML assertion can be added under "Attribute Statements" during this step if desired. Theses attribute values can be derived and used from the SP side.

	Thenclickthegreen"Next"button![SAML Settings](/img/spring-security-saml-settings.png "SAML Settings")

8.  In Step 3 "Feedback", click the checkbox next to the text "This is
	an internal application that we created", then click the green
	"Finish"button.![App type](/img/okta-admin-ui-new-application-step-3-feedback.png "App type")

9.  You will now see the "Sign On" section of your newly created "Spring
	Security SAML" application.

10. Keep this page open it a separate tab or browser window. You will
	need to return to this page later in this guide and copy the
	"Identity Provider metadata" link. (To copy the that link, right
	clickonthe"IdentityProvidermetadata"linkandselect"Copy")![Sign on methods](/img/okta-admin-ui-identity-provider-metadata-link.png "Sign on methods")

11. Right-click on the "People" section of the "Spring Security SAML"
	application and select "Open Link In New Tab" (so that you can come
	back to the "Sign On" section later).

	Inthenewtabthatopens,clickonthe"AssignApplication"button![Assign Application](/img/spring-security-saml-okta-assign-people-to-application.png "Assign Application")

12. A dialog titled "Assign Spring Security SAML to up to 500 people"
	will open. Type your username into the search box, select the
	checkboxnexttoyourusername,thenclickthegreen"Next"button![People search box](/img/okta-admin-ui-confirm-assignments.png "People search box")

13. You will be prompted to "Enter user-specific attributes". Just click
	thegreen"ConfirmAssignments"buttontokeepthedefaults.![Enter user attributes](/img/spring-security-saml-okta-confirm-assignments.png "Enter user attributes")

14. You are now ready to proceed to the next section. Make sure that the
	link you copied in step \#9 is still in your clipboard, as you will
	need it in the next section.


## Configuring Spring Security SAML to work with Okta

Now that you have configured a "Spring Security SAML" application, you
are ready to configure Spring Security SAML to work with Okta. In this
section we will use the "Identity Provider metadata" link from the
section above to configure Spring Security SAML. Once you've completed
these steps, you'll have a working example of connecting Okta to Spring.


1.  Open the `securityContext.xml` file in your favorite text editor.
	If you followed the instructions above for "Installing the Spring
	Security SAML sample application" on Mac OS X, this file will be
	located here at
	`/Library/Tomcat/webapps/spring-security-saml2-sample/WEB-INF/securityContext.xml`
	(Normally, you would do this step *before* running Maven or Gradle
	to create the .war file you deploy to Tomcat. In this case, I'm
	having you edit the file in the Tomcat path directly, since it's
	easier to make small changes and test them this way).

2.  Once you've opened the `securityContext.xml` file, add the XML below
	to the end of the tag identified by this CSS selector syntax:
	`#metadata > constructor-arg > list`.

	``` xml
	<bean class="org.opensaml.saml2.metadata.provider.HTTPMetadataProvider">
	  <!-- URL containing the metadata -->
	  <constructor-arg>
		<!-- This URL should look something like this: https://{yourOktaDomain}/app/abc0defghijK1lmN23o4/sso/saml/metadata -->
		<value type="java.lang.String">{metadata-url}</value>
	  </constructor-arg>
	  <!-- Timeout for metadata loading in ms -->
	  <constructor-arg>
		<value type="int">5000</value>
	  </constructor-arg>
	  <property name="parserPool" ref="parserPool"/>
	</bean>
	```

3.  Make sure to replace the contents of `{metdata-url}` with the link
	that you copied in step \#9 of the "Configuring Okta to work with
	Spring Security SAML" instructions above!**


4.  Save the `securityContext.xml` file, then restart Tomcat

5.  If you are using Mac OS X, you can restart Tomcat using the commands
	below:

	```bash
	 /Library/Tomcat/bin/shutdown.sh
	 /Library/Tomcat/bin/startup.sh
	```


## Test the SAML integration

Now that you've set up an application in Okta and configured the Spring
Security SAML example application to use that application, you're ready
to test it out.

There are two ways to test a SAML application: Starting from the Spring
application ("SP initiated") and starting from Okta ("IdP initiated").
You will be testing both methods. In both cases, you will know of the
testworkedwhenyouseeascreenthatlooksliketheonebelow:![Authenticated user](/img/spring-security-saml-assert.png "Authenticated user")


1.  Login from the Spring Security SAML sample application (This is
	known as an "SP initiated" login)

	-   Open the sample application in your browser:
		`http://localhost:8080/spring-security-saml2-sample`

	-   Select the Okta IdP from the list
		It will be a URL that starts with "http://www.okta.com/"

	-Clickthe"Startsinglesign-on"button.![Start single sign-on](/img/spring-security-saml-selection.png "Start single sign-on")

2.  Login from Okta (This is known as an "IdP initiated" login)

	-   Log in to your Okta organization

	-   Click the button for the application you created in the
		"Configuring Okta to work with Spring Security SAML" section
		above:![Spring Security SAML](/img/spring-security-saml-okta-chiclet.png "Spring Security SAML")

If you're able to get to the "Authenticated User" page using both of the
methods above, then you're done.

Congratulations on getting Okta working with Spring!


## Next Steps

At this point you should be familiar with setting up SAML enabled application to work with an Okta organization and how to configure Spring Security SAML to work with Okta.

After you have Okta working with the example Spring Security SAML application, the next step is to take the example code and move it to your production application. The specifics of how this works is different depending on how your application is set up. Pay special attention to the `securityContext.xml` which allows you to add more IDPs to the app as well as control page redirects. Before any changes are made to the `securityContext.xml` file, you should consider reading the [Spring Security SAML reference documents](http://docs.spring.io/spring-security-saml/docs/1.0.x/reference/html/) which provides a detailed overview of all the components and features of Spring Security SAML.

If you want to learn more about configuring in SAML and what to consider when writing a SAML application, Okta's in-depth [SAML guidance](https://www.okta.com/integrate/documentation/saml/) is great place to learn more.
