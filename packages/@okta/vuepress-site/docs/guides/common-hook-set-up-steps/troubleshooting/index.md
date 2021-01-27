---
title: Troubleshooting hook implementations
---

After setting up an external service and an Event Hook or Inline Hook, you may need to troubleshoot or review your configurations. Use the following options to confirm a successful implementation.

### Preview tab ###

An [Inline Hook Preview](https://help.okta.com/en/prod/Content/Topics/automation-hooks/preview-inline-hooks.htm)tab, accessible in the Admin Console, is available for the following two Inline Hooks:

* Registration Inline Hook
* SAML Inline  Hook

Before enabling the hook, the preview tab can run a sample Okta request call, and receive the external service response. Review the request and response formats to make sure responses are accurate.

An [Event Hook Preview](https://help.okta.com/en/prod/Content/Topics/automation-hooks/event-hooks-preview.htm) tab is also available for Event Hooks, and displays the JSON payload for the selected Event Type. The preview tab can confirm a successful delivery of the request.

### Developer Console System Log ###

Use the Developer Console System Log to review logs of the Event or Inline Hook triggers or errors encountered during testing from the Okta org. For further information on using the System Log, see [System Log](https://help.okta.com/en/prod/Content/Topics/Reports/Reports_SysLog.htm)

### Glitch logs ###

For implementations using the Glitch projects, use Glitch's log feature to review and troubleshoot your external service code:

1. In the Glitch project's left-hand folder navigation pane, click **Tools** at the bottom of the pane.
2. Click **Logs**.

A log pane appears that displays all `console.log()` output. Some console output code is available in the sample code.
