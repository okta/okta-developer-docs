The sequence of steps for self-service registration is described in the following three sequence diagrams.

### Start a new user registration with the password authenticator

The following diagram illustrates the beginning of the registration process where the user initiates their sign-in flow and enrolls their password.

<div class="full">

![A sequence diagram that shows the beginning of the self-service registration flow, from the user clicking Create Account to their enrolling a password](/img/oie-embedded-sdk/oie-embedded-android-selfservice-pwd-flow-diagram.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?type=design&node-id=4579-22804&mode=design&t=aNZwypVsE0zfHlUi-11  oie-embedded-android-selfservice-pwd-flow-diagram

 -->

</div>

### Enroll and verify the email authenticator

After being shown the list of available authenticators, the customer continues the self-registration flow by selecting the email authenticator.

<div class="full">

![A sequence diagram that shows the email factor enrollment part of the self-service registration flow](/img/oie-embedded-sdk/oie-embedded-android-selfservice-email-flow-diagram.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?type=design&node-id=4579-22841&mode=design&t=aNZwypVsE0zfHlUi-11  oie-embedded-android-selfservice-email-flow-diagram

 -->

</div>

### Skip the optional remaining authenticators

After the password and email authenticators are verified, the user has the option to skip the phone authenticator.

<div class="full">

![A sequence diagram that shows the phone factor being skipped as part of the self-service registration skip phone flow](/img/oie-embedded-sdk/oie-embedded-android-selfservice-skip-flow-diagram.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?type=design&node-id=4579-22901&mode=design&t=aNZwypVsE0zfHlUi-11 oie-embedded-android-selfservice-skip-flow-diagram

 -->

</div>

### Enroll and verify the phone (SMS) authenticator

After the password and email authenticators are verified, the user has the option to enroll the phone authenticator.

> **Note:** Based on the configuration described in [Set up your Okta org for a multifactor use case](/docs/guides/oie-embedded-common-org-setup/java/main/#set-up-your-okta-org-for-a-multifactor-use-case), the Okta app is set up to require one possession factor (either email or phone). After the email authenticator is verified, the phone authenticator becomes optional.

The following flow describes the steps when the user enrolls the optional phone authenticator.

<div class="full">

![A sequence diagram that shows the phone factor enrollment part of the self-service registration flow](/img/oie-embedded-sdk/oie-embedded-android-selfservice-phone-flow-diagram.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?type=design&node-id=4579-22867&mode=design&t=aNZwypVsE0zfHlUi-11  oie-embedded-android-selfservice-phone-flow-diagram

 -->

</div>
