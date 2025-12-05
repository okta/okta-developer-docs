---
title: Multibrand architecture
meta:
  - name: description
    content: An overview of the concepts needed to set up a multibrand environment.
---

# Multibrand architecture

This document reviews the core concepts and options available to set up the architecture for multiple brands in your environment.

**Note:** This document applies to the customization of Gen3 of the Sign-In Widget. For information about Gen2, see [Style the sign-in page](/docs/guides/custom-widget/main/).

## Domain strategy decision flow

The right multibrand architecture requires that you answer the following questions:

* Do you need Single Sign-On (SSO)?
* How complex are your brand's visual needs?

The following diagram shows the decision flow that you should follow when setting up your architectural approach:

<div class="three-quarter">

![A decision flow diagram to help you set up your multibrand architecture](/img/concepts/multibrand-architecture.png)

  <!--
    Source image: https://www.figma.com/design/z1MlMg2HBdJtgtvW9cxjZf/Dev-Docs-Diagrams?node-id=6-8&t=ViaDcJGs6y3TaPuE-0
  -->
</div>

## SSO requirements across brands

The first architectural decision determines whether you need to use domain-level or app-level branding.

### No SSO required

Your brands operate independently and don’t require users to log in once to access all brand-specific apps. In that case, you can use domain-level branding within a single Okta org.

In this scenario, all brands share underlying Okta login experience (that is, a single Okta domain), and customizations are applied at the domain level.

This approach simplifies management by centralizing user identity and policy enforcement. However, the degree of visual customization across brands is limited to what the core Okta sign-in widget allows.

End-users have a “same login experience", and can have the same username, password, email, phone, and even one-time passwords (OTPs).

See [About Okta domain customization](/docs/guides/custom-url-domain/main/#about-okta-domain-customization).

**Note:** If you plan to use passkeys, this approach limits you to five associated domains. See [Passkeys and custom domains](/docs/guides/custom-passkeys/main/).

### SSO required

If users need a seamless experience&mdash;logging in once and gaining access to multiple distinct brands&mdash;you must implement cross-brand SSO. Cross-brand SSO requires app-level branding.

In this model, you apply customization at the app level (`clientId`) rather than to the entire Okta domain. The common sign-in session enables SSO across all configured apps. It doesn't matter how you brand each app.

## Assess brand complexity

If you choose Cross-Brand SSO, the next step is to evaluate the visual complexity of your multibrand ecosystem.

### Low complexity

Low complexity applies when branding requirements are basic and involve minimal code modification. For example, a single logo per brand, basic color shifts, and standard layout reuse.

You can often handle the branding using built-in theme editors, profile customizations, or minimal configuration within the app itself.

This approach is highly scalable and can theoretically support an infinite number of different brands. The complexity overhead remains low for each addition.

Using the function `OktaUtil.getRequestContext();` returns an object like the following example:

```javascript
app:{
  type: "object"
  value:{
    id: "0oa1wzp8ilsi2M9pk1d8"
    label: "Blue Application|brand_xyz"
    name: "oidc_client"
```

Use the pipe character (`|`) as a delimiter to parse the `label` string. This retrieves the second value, such as "brand_xyz", which you can use to select the appropriate look and feel.

### High complexity

High complexity applies when your brands are visually diverse and need extensive code customization. The following are examples of complex branding:

* Significant custom CSS
* Unique layout requirements
* Complex responsive design rules
* Highly customized user flows that go beyond basic widget configuration

## Number of brands

If your brand customizations are complex, the next step is to assess the number of brands you want to include in your architecture.

### Fewer than five brands

If you have a small, manageable number of highly customized brands (fewer than five), you can use internal, inline code for implementation.

The branding logic resides directly within the Okta Sign-In Widget's customizable code blocks.

A JavaScript `switch` statement, or a series of `if/else` checks within the sign-in code, determines the active brand. The active brand is based on the unique app ID (app ID or client ID) passed to the Sign-In Widget. Inject the corresponding custom CSS or HTML inline.

The following example shows how to use app ID as a control:

```javascript
//console.log(oktaData);
function getApp() {
    if (!OktaUtil) return undefined;

    var requestContext = OktaUtil.getRequestContext();
    if (requestContext && requestContext.app && requestContext.app.value) {
        return requestContext.app.value;
    }else{
        return "unknown"
    }
}
```

See [Okta context (responsible party)](#okta-context-responsible-party).

### Five brands or more



## Common multibrand use cases

This section details common branding requirements and the recommended controls for implementing them within a multi-brand architecture. These patterns leverage the controls discussed in [Context controls](#context-controls).

### Brand families (product lines)

For enterprise-scale deployments, you may group multiple apps (for example, a product line or SKU) into a distinct brand family. This grouping often requires a consistent look and feel for all apps within that family.

Since consuming users or customers could have access across different product lines, a domain-centric approach is often not sufficient. It could break single sign-on (SSO).

Consider the following controls:

* **App label:** Parsing a custom string within the label. Optimal for dynamic and managed branding. You can easily manage the label within Okta. You can also carry branding metadata parsed by the client app.

* **App ID:** Used with an external lookup service. Supports the greatest variation. Useful when a brand requires significant customization or when a single application is used by multiple brands. The ID serves as a key for a service that retrieves the specific brand assets.

See [Okta context (responsible party)](#okta-context-responsible-party).

### Market-aware branding (regional or regulatory requirements)

Some brand requirements extend beyond standard application and domain boundaries, often intersecting with localization, data residency, or regional regulatory frameworks.

In these scenarios, you cannot solely rely on the user's browser language or basic geolocation. For example, a specific regulatory framework might mandate the use of unique Regional Authenticators/Identity Providers (IdPs) that are applicable only to a specific market, such as APAC, but not to the global audience.

Consider the following controls:



### Context controls

Okta provides many different controls that you can use to set up multiple brands in your environment.

#### Okta context (responsible party)

The following table lists the controls that Okta is responsible for:

| Control | Type | Description |
|---------|------|-------------|
| Tenant (Org) | Fixed (origin) | Okta default/built-in. The origin app determines the binding based on the federation model. Note: Tenant control could be necessary for data residency (for example, GDPR). |
| Domain             | Fixed (origin)              | Okta default/out-of-the-box admin control. The origin app determines the binding based on the federation model. |
| App ID     | Code-based + context        | Okta provides the unique app ID (`app.value.id`). Use client-side code (JS/HTML) at page load to switch branding. Function: `OktaUtil.getRequestContext()`. |
| App label  | Code-based + context        | Okta provides the unique app label (`app.value.label`). Use client-side code (JS/HTML) on the page load to parse the label and switch branding. Function: `OktaUtil`.getRequestContext(). |
| Browser telemetry  | Code-based + browser agent  | The browser provides language settings (`navigator.language` or `navigator.languages`). Use client-side code (JS/HTML) at page load to switch branding. |
| Self-declaration   | Code-based + end-user/local | Prompt the end user to select preferences and store the selection in a cookie or local storage. <br> **Warning:** Doesn't persist across different browser sessions. |

#### External context (responsible party)

The following table lists controls that you control externally:

| Control | Type | Description |
|--------|-------|-------------|
| Cookie or local storage | Origin app + code-based | Store the branding selection in a cookie or local storage before going to the Okta Identity Provider. <br> **Warning:** Doesn't persist across sessions and has domain/HTTP restrictions. |
| QueryString | Origin app + code-based | A custom implementation can append parameters to the URL to invoke the branding logic. <br> **Warning:** Parameters could conflict or be dropped as they’re outside federation specifications. Some use state or nonce to transfer context. |

## See also

