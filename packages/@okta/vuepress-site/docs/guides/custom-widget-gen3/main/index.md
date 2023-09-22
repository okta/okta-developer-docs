---
title: Style the Sign-In Widget (third generation)
excerpt: Learn how to customize the Sign-In Widget (third generation).
layout: Guides
---

This guide explains how to customize the Sign-In Widget (third generation) for the redirect authentication model.

---

**Learning outcomes**

* Enable the third generation widget.
* Learn about design tokens.
* Call the JS API using design tokens.

**What you need**

* [Okta Developer Edition organization](https://developer.okta.com/signup)
* [Custom URL domain](/docs/guides/custom-url-domain/main/)

**Sample code**

[Customization examples](#customization-examples)

---

## About the Sign-In Widget (third generation)

The Sign-In Widget enables registration, enrollment, verification, and recovery experiences for your users. It's where everyone in your org starts their Okta session.

The third generation of the Sign-In Widget offers the same user experience as the second generation, and adds accessibility improvements in color contrast, focus management, and screen reader behavior.

See [Style the sign-in page](/docs/guides/custom-widget/main/) for details about customizing the second generation widget.


## Upgrade to the third generation

<!-- togglin' -->



## Use the code editor

<!-- repeating this content from the other guide... want to have a fresh start on the 3rd gen page. i'll probably tweak it to focus on the JS API -->

Use the code editor to modify any HTML, CSS, or JavaScript on the sign-in page.

> **Note:** You can only enable the code editor if you configure a [custom domain](/docs/guides/custom-url-domain/).

See [Customization examples](#customization-examples) for snippets that you can update and use.

1. In the Admin Console, go to **Customizations** > **Brands**, and then select the brand you want.
2. In the **Pages** tab, click **Configure** in the **Sign-in page** panel.
3. To open the code editor, turn on the toggle next to **Code editor**.
4. Make changes directly in the editor. If you enter `{`, `(`, or `.` you see a list of available variables that you can use. See [Use variables](#use-variables).
   * Click **Save to draft**, then **Preview**, **Revert**, or **Publish**.
   * Select **Compare with published version** to see the difference between your edited version and the published version. You can choose between a split view and a unified view.

   > **Note:** To discard your changes without publishing them, click **Revert changes** or turn off the toggle next to **Code editor**. Turning off the code editor restores the default HTML/CSS and JavaScript code.

See [Customization examples](#customization-examples) for ways to use design tokens with the third generation widget.


## Use design tokens

<!-- cribbing conceptual content from the odyssey docs about design tokens -->


## Customization examples

<!-- 3-4 basic uses cases with screen shots -->

## Test your customizations

<!-- Lester: do you think we can add any quick tips here? or is it a visual, trial and error thing in the console? -->


## List of design tokens

<!-- The table of available tokens goes here -->

## 

