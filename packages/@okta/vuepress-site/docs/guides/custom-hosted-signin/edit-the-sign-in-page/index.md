---
title: Edit the sign-in page
---
The **Customize Sign-In** page offers both basic and advanced customization options to create a completely transformed sign-in experience. To access this page, select **Customization**, and then **Signin Page**.

## Change the Okta Sign-In Widget version
The Okta-hosted sign-in page uses the [Sign-in Widget](https://github.com/okta/okta-signin-widget) component to interact with the user.

Changing the Okta Sign-in Widget version allows you to leverage or omit specific Sign-in Widget capabilities by specifying a particular version. If you are not familiar with the Okta Sign-In Widget, Okta recommends that you select the highest **Major Version** and the latest **Minor Version** (default). For details about the Okta Sign-in Widget capabilities supported by major and minor versions, see the [GitHub releases page](https://github.com/okta/okta-signin-widget/releases).

1. To make changes to the major and minor versions, select **Edit** in the **Okta Sign-In Widget Version** section header.
2. Make your changes, and then click **Save** at the bottom of the page.

## Change headings and labels
To change the heading and labels, and to customize help links on the sign-in page, make changes to the **Sign-In Page** section. 

1. Click **Edit** in the **Sign-In Page** section header.
2. Use the form fields on the left side of the page to customize links, labels, and headings. 

You can also customize the placeholder text that appears in recovery flows when end users click account recovery links (for example, Forgot password and Unlock account). If you leave a label field blank, Okta uses the default text. 

> **Note:** Although Okta displays default labels, links, and headings in the end user's display language or browser language, Okta doesn't display localized versions of customized text and links. Text that you change here is hard-coded. To specify multiple localized versions of headings and labels, use the [Sign-in Widget text configuration options](https://github.com/okta/okta-signin-widget/#language-and-text). 

## Use the embedded HTML editor
If you are familiar with using HTML and want to change the page layout, colors, button shapes, and other elements, use the embedded HTML editor in the middle of the page. You can modify the current HTML/CSS and JavaScript or paste your own code.

1. Make changes directly in the embedded editor. 
2. Click **Preview** to preview your changes before you publish.
3. Click **Reset to Default** if you need to remove all of your customizations and restore the default HTML/CSS and JavaScript code. 
4. Click **Save and Publish** when you finish.

> **Note:** See the <GuideLink link="../customization-examples">Customization examples</GuideLink> section for examples that you can alter and use on your hosted sign-in page.

## Bypass the Custom Sign-In Page
Use the `/login/default` backup sign-in URL to bypass the custom sign-in page. If, for example, something goes wrong with your customizations and your sign-in page won't load, add `/login/default` to the end of your Okta URL to bring up the default sign-in page and sign in:

`https://${yourOktaDomain}/login/default`

This URL only bypasses changes that you have made to the HTML in the HTML editor. It doesn't bypass changes that you made using the controls on the left side of the page.

<NextSectionLink/>
