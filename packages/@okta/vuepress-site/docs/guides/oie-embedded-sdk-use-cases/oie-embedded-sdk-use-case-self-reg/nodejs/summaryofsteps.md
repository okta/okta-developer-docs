# Summary of steps

The sequence of steps for self-service registration is described in the following three sequence diagrams:

### Diagram 1: Start new user registration with password factor

The following diagram illustrates the beginning of the registration process where the user initiates the sign-in process and enters their password.

<div class="common-image-format">

![Self-service registration start of flow diagram.](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-self-serv-seq-nodejs-start.png)

</div>

### Diagram 2: Enroll and verify email factor

The self-registration flow continues in this sequence.

<div class="common-image-format">

![Self-service registration enroll flow diagram.](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-self-serv-seq-nodejs-enroll-verify.png)

</div>

### Diagram 3, Option 1: Enroll and verify phone (SMS) factor

After the password and email are verified, the user has the option to
enroll in the phone factor.

> **Note:** Based on the steps described in [Set up your Okta org (for multifactor use cases)](/docs/guides/oie-embedded-common-org-setup/nodejs/main/#set-up-your-okta-org-for-multi-factor-use-cases), the Okta application is set up to require one possession factor (either email or phone). After the email factor is verified, the phone factor becomes optional.

The following flow describes the steps when the user enrolls in the optional phone SMS factor.

<div class="common-image-format">

![Self-service registration enroll flow diagram.](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-self-serv-seq-nodejs-phone.png)

</div>

### Diagram 4, Option 2: Skip optional remaining factors

The user can also opt to skip the factors when all of the remaining
factors are optional. In this case, the user opts to skip the phone
(SMS) factor.

<div class="common-image-format">

![Self-service registration skip phone flow diagram.](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-self-serv-seq-nodejs-skip-phone.png)

</div>
