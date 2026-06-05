---
title: Test your widget's existing customizations in a test environment
---

<ApiLifecycle access="ie" />

If your current Okta Sign-In Widget has customizations (CSS, JavaScript, i18n, branding, or custom sign-in pages), test those customizations in an Identity Engine (OIE) org before you upgrade your production org to Identity Engine. This guide explains what to test, how to set up your test, and how to fix common issues.

---

**Learning outcome**

Validate that your Sign-In Widget customizations work in Identity Engine, and resolve any issues before you upgrade your production org.

**What you need**

* A test environment ready for Identity Engine. Use a Preview org, a free trial Identity Engine org, or an [Integrator Free Plan org](/docs/reference/org-defaults/).
* Your current Sign-In Widget version.
* A record of your existing customizations: CSS overrides, JavaScript hooks, i18n properties, and branding.

**Sample code**

n/a

---

## Identify your widget deployment model

Your testing approach depends on how your Sign-In Widget is deployed.

| Deployment model | Description | Testing approach |
| --- | --- | --- |
| Okta-hosted (redirect) | Okta hosts the sign-in page. You customize it through the Admin Console or the code editor. | Test your customizations in a Preview org after you upgrade it to Identity Engine. |
| Embedded (self-hosted) | Your app hosts the Sign-In Widget directly. | Test in your app's development environment pointed at an Identity Engine org. |

See [Redirect vs. embedded deployment](/docs/concepts/redirect-vs-embedded/) for more details.

## Identify your customization types

Check which customizations you have and what the Identity Engine upgrade may affect.

| Customization type | What may change in newer widget versions and Identity Engine | Action |
| --- | --- | --- |
| CSS overrides | Unsupported CSS may break after a widget version update. The third generation (Gen3) of the Sign-In Widget doesn't support the CSS code editor. | Test styling after the upgrade. Migrate to design tokens if you're on Gen3. |
| JavaScript hooks (such as `afterRender` or `processCreds`) | Some events behave differently or are deprecated in Identity Engine. | Remove deprecated methods and validate hook behavior. |
| i18n translations | New Identity Engine-specific property keys are available. Some Classic Engine strings no longer apply. | Verify that translations display correctly and add new Identity Engine string overrides. |
| Branding (logo, colors, background) | Supported through the Admin Console in both Classic Engine and Identity Engine. No breaking change is expected. | Confirm that branding renders after the upgrade. |
| Custom sign-in page (hosted) | Classic Engine custom sign-in pages may not work after the upgrade. | Validate that the page loads and functions correctly. |
| Security image | Removed in Identity Engine. No security image is displayed. | Remove references. No replacement is needed. |
| Remember me checkbox | Replaced by **Keep me signed in** in Identity Engine. | Update your UI expectations. No code change is needed. |

See [Upgrade the Okta Sign-In Widget](/docs/guides/oie-upgrade-sign-in-widget/main/) for more details on Sign-In Widget changes after the upgrade.

## Test your customizations in a test environment

### Step 1: Set up the test environment

Use one of these environments:

* **Preview org (recommended):** Upgrade your Preview org to Identity Engine and test your customizations there.
* **Identity Engine free trial org:** Create a free trial org and apply your customizations manually.

For Okta-hosted widgets, apply your customizations in the Admin Console code editor of the test org. For embedded widgets, point your development app at the Identity Engine test org.

### Step 2: Check for deprecated JavaScript methods

Search your custom code for deprecated methods that don't work in later versions of the Sign-In Widget and Identity Engine. Check these common areas:

* Factor sequencing customizations
* `afterRender` event handlers
* The `useClassicEngine` configuration flag

See [Deprecated JavaScript methods in the Sign-In Widget](/docs/guides/oie-upgrade-sign-in-widget-deprecated-methods/main/) for the full list.

### Step 3: Test sign-in flows

Sign in as a test user and validate each customized flow:

* Standard sign-in (username and password)
* MFA enrollment and challenge
* Password recovery
* Self-service registration (if enabled)
* Social or external Identity Provider authentication (if configured)
* Identifier-first flow behavior (new in Identity Engine)

### Step 4: Test styling and branding

* Confirm that the logo, colors, and background render correctly.
* Check that your custom CSS overrides are applied.
* Verify the widget dimensions and layout.
* Test on both desktop and mobile screen sizes.

> **Note:** Unsupported CSS customizations beyond the documented styles may break after a widget version update.

See [Updates to Sign-In Widget styling](/docs/guides/oie-upgrade-sign-in-widget-styling/main/) for more details.

### Step 5: Test i18n translations

* Verify that your custom translations display in all supported languages.
* Check that new Identity Engine-specific strings (for example, `oie.password.challenge.title`) show default or custom values.
* Confirm that removed Classic Engine strings don't cause errors.

See [Updates to Sign-In Widget i18n properties](/docs/guides/oie-upgrade-sign-in-widget-i18n/main/) for more details.

### Step 6: Test custom sign-in page behavior

If you use a custom Okta-hosted sign-in page:

* Confirm that the page loads without errors.
* Check for `target is undefined` errors, which are common after an Identity Engine upgrade.
* Validate that your redirect URIs work correctly.
* Test that the Admin Console sign-in still works when **Default App for Sign-In Widget** is enabled.

## Fix issues found during testing

| Issue | Likely cause | Resolution |
| --- | --- | --- |
| Widget doesn't load | Deprecated JavaScript or missing configuration | Remove deprecated methods and verify that your widget version is 5.11.0 or later. |
| `target is undefined` error | Custom sign-in page code references a removed object | Update your custom page code. |
| Styling is missing or broken | CSS overrides are no longer applied in Gen3 | Migrate to design tokens or a supported styling API. |
| i18n strings show raw keys | Classic Engine property keys are removed in Identity Engine | Map them to the new Identity Engine property keys. |
| Sign-in page looks different | Identity Engine introduces the identifier-first flow and removes the security image | This is expected behavior. Update your user communications. |
| Factor sequencing isn't working | Factor sequencing rules aren't supported in Identity Engine | Remove factor sequencing customizations. |
| Redirect URI issue | Redirect configuration changed in Identity Engine | Update your redirect URI configuration. |

See [Identity Engine limitations](/docs/guides/ie-limitations/main/) to learn more about feature changes in Identity Engine.

## Gen2 vs. Gen3 widget considerations

If you're moving to the third generation (Gen3) of the Sign-In Widget as part of your Identity Engine upgrade, be aware of additional testing needs.

| Feature | Gen2 | Gen3 |
| --- | --- | --- |
| Deployment | Redirect and embedded | Redirect (Okta-hosted) only |
| CSS editor | Supported | Not supported. Use design tokens. |
| JavaScript events | Full event support | Reduced event support. `afterRender` may behave differently. |
| Customization migration | n/a | Gen2 customizations don't carry over to Gen3. |
| Accessibility | Standard | Improved color contrast, focus management, and screen reader support |

> **Important:** Customizations that you made in Gen2 don't appear if you move to Gen3. You must reconfigure them.

See [Migrate to the third generation (Gen3) Sign-In Widget](/docs/guides/custom-widget-migration-gen3/main/) and [Style the Sign-In Widget (third generation)](/docs/guides/custom-widget-gen3/main/) for more details.

## Validation checklist before upgrading production

After you test in your test environment, confirm that all the following items pass before you schedule the production upgrade:

* All sign-in flows work (sign-in, MFA, recovery, and registration).
* Custom CSS renders correctly.
* Custom JavaScript has no deprecated methods.
* i18n translations display in all languages.
* Custom sign-in pages load without errors.
* Redirect URIs resolve correctly.
* No console errors appear in browser developer tools.
* Mobile and desktop layouts render correctly.

## See also

* [Upgrade the Okta Sign-In Widget](/docs/guides/oie-upgrade-sign-in-widget/main/)
* [Updates to Sign-In Widget styling](/docs/guides/oie-upgrade-sign-in-widget-styling/main/)
* [Updates to Sign-In Widget i18n properties](/docs/guides/oie-upgrade-sign-in-widget-i18n/main/)
* [Deprecated JavaScript methods in the Sign-In Widget](/docs/guides/oie-upgrade-sign-in-widget-deprecated-methods/main/)
* [Identity Engine limitations](/docs/guides/ie-limitations/main/)
* [Identity Engine upgrade overview](/docs/guides/oie-upgrade-overview/main/)
* [Style the Sign-In Widget (third generation)](/docs/guides/custom-widget-gen3/main/)
