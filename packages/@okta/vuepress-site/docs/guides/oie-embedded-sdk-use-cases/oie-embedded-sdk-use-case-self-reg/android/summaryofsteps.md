## Summary of steps

The sequence of steps for self-service registration is described in the following three sequence diagrams:

### Diagram 1: Start new user registration with password factor

The following diagram illustrates the beginning of the registration process where the user initiates their sign-in and enters their password.

<div class="common-image-format">

![Displays the sequence diagram for starting self-registration with password flow for Java SDK](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-self-serv-seq-start-java.png)

</div>

### Diagram 2: Enroll and verify email factor

The self-registration flow continues with email and phone factors in this sequence.

<div class="common-image-format">

![Displays sequence diagram for enrolling self-registration MFA flow with Java SDK](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-self-serv-seq-enroll-verify-java.png)

</div>

### Diagram 3, Option 1: Enroll and verify phone (SMS) factor

After the password and email factors are verified, the user has the option to enroll the phone factor.

> **Note:** Based on the configuration described in [Set up your Okta org for multifactor use cases](/docs/guides/oie-embedded-common-org-setup/java/main/#set-up-your-okta-org-for-multifactor-use-cases), the Okta app is set up to require one possession factor (either email or phone). After the email factor is verified, the phone factor becomes optional.

The following flow describes the steps when the user enrolls the optional phone SMS factor.

<div class="common-image-format">

![Displays the sequence diagram for enrolling an optional phone SMS factor flow with the Java SDK](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-self-serv-seq-phone-java.png)

</div>

### Diagram 4, Option 2: Skip optional remaining factors

The user can choose to skip the remaining factors if they are optional. In this flow, the user chooses to skip the phone factor.

<div class="common-image-format">

![Displays the sequence diagram for skipping an optional phone factor flow with the Java SDK Self-service](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-self-serv-seq-skip-phone-java.png)

</div>
