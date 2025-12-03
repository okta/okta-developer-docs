---
title: Multibrand architecture
meta:
  - name: description
    content: An overview of the concepts needed to set up a multibrand environment.
---

# Multibrand architecture

This document reviews core concepts and options available to set up the architecture for multiple brands in your environment.

**Note:** This document applies to the customization of Gen3 of the Sign-In Widget. For information about Gen2, see []

## Domain strategy decision flow

The right multibrand architecture requires that you answer the following questions:

* Do you need Single Sign-On (SSO)?
* How complex are your brand's visual needs?

The following diagram shows the decision flow you should follow when setting up your architectural approach:





## Do you need SSO across brands?

The first architectural decision determines whether you will use domain-level or app-level branding.

### No SSO required

If your brands operate independently and don’t require users to log in once to access all brand-specific apps, you can use domain-level branding within a single Okta org.

In this scenario, all brands share the same underlying Okta login experience (that is, a single Okta domain), and customizations are applied at the domain level.

This approach simplifies management by centralizing user identity and policy enforcement. However, the degree of visual customization across brands is limited to what the core Okta sign-in widget allows.

End-users would have a “Same Login Experience", with the ability to have the same user name, password, email, phone, even OTPs.

**Note:** If you plan to use passkeys, this approach limits you to five associated domains.


### SSO required

If users need a seamless experience&mdash;logging in once and gaining access to multiple distinct brands&mdash;you must implement cross-brand SSO. Cross-brand SSO requires app-level branding.

In this model, customization is applied at the app level (Client ID) rather than the entire Okta domain. The common sign-in session enables SSO across all configured apps, no matter the branding of each app.


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





### High complexity





### Context controls

Okta provides many different controls that you can use to set up multibranding in your environment.

#### Okta context (responsible party)

The following table lists controls that Okta is responsible for:




#### External context (responsible party)

The following table lists controls that you control externally: