## Integrate different browser and device scenario with magic links

The magic links feature is made with security in mind and only works when there is complete assurance that the person who started the request is the same one who clicked the magic link. For example, a user who started signing in to your app in a web browser must be in the same browser when they click the magic link. If the browser or device is different, magic links is disabled, and they need to use OTP or be in the same browser to complete the email verification. The following flowchart illustrates this logic.

<div class="common-image-format">

![Diagram showing magic link flow for same and diff browsers](/img/authenticators/authenticators-email-magic-link-flowchart.png)

</div>
