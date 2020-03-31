---
title: Configure general settings
---

To start your app integration submission, open the [OIN Manager](https://oinmanager.okta.com) and click **Start Submission Form**.

Sign in using your development org credentials and click **Add New Submission** to create a new submission instance for your app integration.

If you want to review an in-progress app submission, click **View** beside the app name.

If you need to update an app, see [Update your published app](/docs/guides/submit-app/update-submission).

In the General Settings page, you need to fill in the basic information about your app:

## App information

* **Does your app exist in the OIN?** - If your app already exists in the OIN, provide the existing name so the App Analyst can locate it.

* **App name** - Provide a name for your app integration. This is the main title for your app in the OIN.

* **App website** - Provide a link to your product or service homepage, or a specific location on your website where users can learn more about your app integration.

* **App category** - Specify a category for Okta to categorize your app in the OIN catalog.

* **App description** - Give a general description of your app and what the Okta integration does. For examples, see the overview section for any of the app integrations listed on the [OIN](https://www.okta.com/integrations/).

* **App icon** - Upload a .png, .jpg, or .gif file of your company logo to accompany the app in the catalog. The image should be less than 100k in size, and have dimensions less than 104 x 37 pixels to prevent resizing.

## Customer support

* **Public support contact** - Include a public point of contact (support email or phone number) for users who need assistance with your app. You can also include a link to a FAQ or troubleshooting guide to help with common issues. This information is shared with the customers in the OIN catalog description.

* **Escalation support contact** - This should be an email distribution list for Okta to use when contacting your company about your app. It can be a phone number, but ideally when there is an issue with your app, Okta wants to reach as many people as possible without creating any bottlenecks. Make sure that the contact provided here is not a generic contact such as `support@example.com` or a 1-800 number. The escalation contact should be a contact list that Okta can reach out to in any emergencies. This contact information is not shared with customers.


## Test account

OKTA App Analysts require a dedicated account on your app to run their tests. This account needs to be kept active beyond the submission period, in case Okta needs to update or troubleshoot a submission.

* **Test account URL** - This is a static URL for Okta to sign on to your app. The account credentials you provide below must work for this URL.

* **Test account username or email** - The account name for Okta to use to sign on to your app. Our preferred account name is `isvtest@okta.com`

* **Test account password** - Password for the test account.

* **Additional instructions** - Include any other information that you think the App Analysts need to know about your app, the test account, or the testing configuration.

<NextSectionLink/>
