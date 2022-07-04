The sequence of steps for self-service registration is described in the following three sequence diagrams.

### Start a new user registration with the password authenticator

The following diagram illustrates the beginning of the registration process where the user initiates their sign-in and enters their password.

<div class="three-quarter">

![Displays the sequence diagram for starting self-registration with password flow for Java SDK](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-self-serv-seq-start-java.png)

</div>

### Enroll and verify the email authenticator

After being shown the list of available authenticators, the customer continues the self-registration flow by selecting the email authenticator.

<div class="three-quarter">

![Displays the sequence diagram for enrolling self-registration MFA flow with Java SDK](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-self-serv-seq-enroll-verify-java.png)

</div>

### Skip the optional remaining authenticators

After the password and email authenticators are verified, the user has the option to skip the phone authenticator.

<div class="three-quarter">

![Displays the sequence diagram for skipping an optional phone authenticator flow with the Java SDK Self-service](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-self-serv-seq-skip-phone-java.png)

</div>

### Enroll and verify the phone (SMS) authenticator

After the password and email authenticators are verified, the user has the option to enroll the phone authenticator.

> **Note:** Based on the configuration described in [Set up your Okta org for a multifactor use case](/docs/guides/oie-embedded-common-org-setup/java/main/#set-up-your-okta-org-for-a-multifactor-use-case), the Okta app is set up to require one possession factor (either email or phone). After the email authenticator is verified, the phone authenticator becomes optional.

The following flow describes the steps when the user enrolls the optional phone authenticator.

<div class="three-quarter">

![Displays the sequence diagram for enrolling an optional phone SMS authenticator flow with the Java SDK](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-self-serv-seq-phone-java.png)

</div>
