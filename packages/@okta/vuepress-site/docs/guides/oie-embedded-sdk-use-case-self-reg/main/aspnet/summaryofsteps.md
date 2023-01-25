### Start the new user registration with the password factor

The following diagram illustrates the beginning of the registration process where the user initiates their sign-in and enters their password.

<div class="three-quarter">

![Displays a diagram that shows the beginning of self-service registration flow](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-self-serv-seq-start.png)

</div>

### Enroll and verify the email factor

The self-registration flow continues in this sequence.

<div class="three-quarter">

![Displays a diagram that continues from the last diagram and shows the self-service registration enrollment flow](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-self-serv-seq-enroll-verify.png)

</div>

### Enroll and verify the phone (SMS) factor

After the password and email are verified, the user has the option to
enroll in the phone factor.

> **Note:** Based on the steps described in [Set up your Okta org for a multifactor use case](/docs/guides/oie-embedded-common-org-setup/aspnet/main/#set-up-your-okta-org-for-a-multifactor-use-case), the Okta application is set up to require one possession factor (either email or phone). After the email factor is verified, the phone factor becomes optional.

The following flow describes the steps when the user enrolls in the optional phone SMS factor.

<div class="three-quarter">

![Displays a diagram that continues from the last diagram and shows the self-service registration enroll flow](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-self-serv-seq-phone.png)

</div>

### Skip the optional remaining factors

The user can also opt to skip the factors when all of the remaining
factors are optional. In this case, the user opts to skip the phone
(SMS) factor.

<div class="three-quarter">

![Displays a diagram that contineus from the last diagram and shows the self-service registration skip phone flow](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-self-serv-seq-skip-phone.png)

</div>
