## Integrate different browser and device scenario with magic links

Magic links is made with security in mind and only works when there is complete assurance that the person who started the request is the same one who clicked on the magic link. For example, a user who started a sign-in in your app in one browser must be on the same browser when clicking on the magic link. If the browser or device is different, magic links is disabled, and they need to use OTP or be in the same browser to complete the email verification. See the following flowchart that illustrates this logic.

<div class="common-image-format">

![Diagram showing nagic link flow for same and diff browsers](/img/authenticators/authenticators-email-magic-link-flowchart.png)

</div>

The following step-by-step instructions detail integrating the different browser scenario using the email challenge.

</br>
