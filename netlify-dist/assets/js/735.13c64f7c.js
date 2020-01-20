(window.webpackJsonp=window.webpackJsonp||[]).push([[735],{428:function(e,t,s){"use strict";s.r(t);var o=s(8),i=Object(o.a)({},(function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[s("p",[e._v("This second suite of "),s("a",{attrs:{href:"https://www.runscope.com",target:"_blank",rel:"noopener noreferrer"}},[e._v("Runscope"),s("OutboundLink")],1),e._v(" tests checks that your SCIM app can handle actual requests to "),s("strong",[e._v("C")]),e._v("reate, "),s("strong",[e._v("R")]),e._v("ead, "),s("strong",[e._v("U")]),e._v("pdate and "),s("strong",[e._v("D")]),e._v("elete (CRUD) user profile information.")]),e._v(" "),s("blockquote",[s("p",[s("strong",[e._v("Note:")]),e._v(" Okta does not delete user profiles, but instead marks them as "),s("code",[e._v("active=false")]),e._v(" to deactivate them.")])]),e._v(" "),s("p",[e._v("If you are not familiar with Runscope, follow the detailed instructions in the "),s("router-link",{attrs:{to:"/docs/guides/build-provisioning-integration/test-scim-api/"}},[e._v("test your SCIM API")]),e._v(" topic to get started.")],1),e._v(" "),s("p",[e._v("This suite runs the following tests:")]),e._v(" "),s("ol",[s("li",[e._v("Checks that the app exists in your Okta org.")]),e._v(" "),s("li",[e._v("Adds a new random user in Okta.")]),e._v(" "),s("li",[e._v("Assigns that user to the app in Okta.")]),e._v(" "),s("li",[e._v("Verifies that the user was created on your SCIM server.")]),e._v(" "),s("li",[e._v("Updates the user "),s("code",[e._v("firstName")]),e._v(" attribute in Okta.")]),e._v(" "),s("li",[e._v("Verifies that the user attribute was updated on your SCIM server.")]),e._v(" "),s("li",[e._v("Deactivates the user in Okta.")]),e._v(" "),s("li",[e._v("Verifies that the user was deactivated on your SCIM server.")]),e._v(" "),s("li",[e._v("Reactivates the user in Okta.")]),e._v(" "),s("li",[e._v("Reassigns your app to the user in Okta.")]),e._v(" "),s("li",[e._v("Verifies the user was reactivated and assigned on your SCIM server.")]),e._v(" "),s("li",[e._v("Removes your app from the user in Okta.")]),e._v(" "),s("li",[e._v("Verifies that user is deactivated on your SCIM server.")])]),e._v(" "),s("p",[e._v("To configure and run the SCIM CRUD tests:")]),e._v(" "),s("ol",[s("li",[s("p",[e._v("Download the Okta SCIM CRUD test file.")]),e._v(" "),s("ul",[s("li",[e._v("If you are using SCIM 2.0 for your app: "),s("a",{attrs:{href:"/standards/SCIM/SCIMFiles/Okta-SCIM-20-CRUD-Test.json"}},[e._v("Okta SCIM 2.0 CRUD test file")])]),e._v(" "),s("li",[e._v("If you are using SCIM 1.1 for your app: "),s("a",{attrs:{href:"/standards/SCIM/SCIMFiles/Okta-SCIM-11-CRUD-Test.json"}},[e._v("Okta SCIM 1.1 CRUD test file")])])])]),e._v(" "),s("li",[s("p",[e._v("In Runscope, click "),s("strong",[e._v("Import Test")]),e._v(".")])]),e._v(" "),s("li",[s("p",[e._v("Select "),s("strong",[e._v("Runscope API Tests")]),e._v(" as the import format.")])]),e._v(" "),s("li",[s("p",[e._v("Click "),s("strong",[e._v("Choose File")]),e._v(" and select the Okta SCIM 2.0 CRUD JSON test file.")])]),e._v(" "),s("li",[s("p",[e._v("Click "),s("strong",[e._v("Import API Test")]),e._v(".")])]),e._v(" "),s("li",[s("p",[e._v("In this new test bucket, click "),s("strong",[e._v("Editor")]),e._v(" from the left hand navigation menu.")])]),e._v(" "),s("li",[s("p",[e._v("Click "),s("strong",[e._v("Test Settings")]),e._v(" and then click "),s("strong",[e._v("Initial Variables")]),e._v(".")])]),e._v(" "),s("li",[s("p",[e._v("Add the following variables with values that match your SCIM app:")]),e._v(" "),s("ul",[s("li",[s("code",[e._v("oktaAppId")]),e._v(" - the unique identifier randomly assigned to your Okta app. You can see this value in the "),s("strong",[e._v("App Embed Link")]),e._v(" panel under the "),s("strong",[e._v("General")]),e._v(" tab for your Okta app.")]),e._v(" "),s("li",[s("code",[e._v("oktaOrgUrl")]),e._v(" - the base URL for your Okta org. Include the "),s("code",[e._v("https://")]),e._v(" prefix.\n"),s("img",{attrs:{src:"/img/oin/scim_crud-test-identifiers.png",alt:"Dev Window",title:"Browser bar showing the oktaOrgUrl location"}})]),e._v(" "),s("li",[s("code",[e._v("oktaToken")]),e._v(" - the security token used to connect to your Okta app API. You can generate a token for your app inside your Okta org:\n"),s("ul",[s("li",[e._v("Click "),s("strong",[e._v("Security")]),e._v(" > "),s("strong",[e._v("API")]),e._v(".")]),e._v(" "),s("li",[e._v("Click on "),s("strong",[e._v("Tokens")]),e._v(" and "),s("strong",[e._v("Create Token")]),e._v(".")]),e._v(" "),s("li",[e._v("Give the token a name click "),s("strong",[e._v("Create Token")]),e._v(".")]),e._v(" "),s("li",[e._v("Copy the resulting token value over to this Runscope variable.")])])]),e._v(" "),s("li",[s("code",[e._v("SCIMUrl")]),e._v(" - the Base URL of the SCIM implementation on your server. For example: "),s("code",[e._v("https://example.com/scim/v2")])]),e._v(" "),s("li",[s("code",[e._v("SCIMAuth")]),e._v(" - the Basic or OAuth authorization token used to access your SCIM API.")])]),e._v(" "),s("p",[e._v("The final Runscope values should look similar to the following:\n"),s("img",{attrs:{src:"/img/oin/scim_crud-variables.png",alt:"Runscope Initial Variables",title:"Sample values for CRUD test variables"}})])]),e._v(" "),s("li",[s("p",[e._v("Click "),s("strong",[e._v("Test Settings")]),e._v(" and then click "),s("strong",[e._v("Initial Script")]),e._v(".")])]),e._v(" "),s("li",[s("p",[e._v("Copy the contents of the "),s("a",{attrs:{href:"/standards/SCIM/SCIMFiles/Initial_Script_CRUD.txt"}},[e._v("Okta CRUD Initial Script")]),e._v(" text file and paste into this Runscope console.")])]),e._v(" "),s("li",[s("p",[e._v("Click "),s("strong",[e._v("Save & Run")]),e._v(".")])])]),e._v(" "),s("p",[e._v("On the left side of your screen, the test appears in the "),s("strong",[e._v("Recent Test Runs")]),e._v(" section.")]),e._v(" "),s("ol",[s("li",[e._v("Click "),s("strong",[e._v("View Progress")]),e._v(" inside the "),s("strong",[e._v("Recent Test Runs")]),e._v(" section.")]),e._v(" "),s("li",[e._v("As the test suite runs, Runscope displays live updates of the test in progress. After the test is complete, the main panel displays the results of your test.")]),e._v(" "),s("li",[e._v("To see the details of tests, click the name of each particular test case to expand the section. The details show you the "),s("strong",[e._v("Request")]),e._v(", "),s("strong",[e._v("Response")]),e._v(", and "),s("strong",[e._v("Connection")]),e._v(" information for each test.")])]),e._v(" "),s("p",[e._v("After the tests complete successfully, you can move on to creating the configuration guide for your customers to use your app once it is available on the OIN.")]),e._v(" "),s("p",[e._v("For comparison and reference, here is an example of "),s("a",{attrs:{href:"https://www.runscope.com/radar/rho3mr74kof3/05da739b-a2b2-49ce-91a0-656320deab17/history/b49431ec-662f-49b5-b382-7149eec85091",target:"_blank",rel:"noopener noreferrer"}},[e._v("a successful Runscope test run"),s("OutboundLink")],1),e._v(" for the SCIM 2.0 CRUD test suite.")]),e._v(" "),s("NextSectionLink")],1)}),[],!1,null,null,null);t.default=i.exports}}]);