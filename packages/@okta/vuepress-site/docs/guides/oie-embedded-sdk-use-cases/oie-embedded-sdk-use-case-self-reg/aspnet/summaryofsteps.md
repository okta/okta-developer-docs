#### Diagram 1: Start new user registration with password factor
The diagram below illustrates the beginning of the registration process
where the user initiates the sign in and enters their password.

<div class="common-image-format">

![Self serv registration start](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-self-serv-seq-start.png
 "Self serv registration start")

</div>

#### Diagram 2: Enroll and verify email factor

The self registration flow continues in this sequence.

<div class="common-image-format">

![Self serv registration enroll](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-self-serv-seq-enroll-verify.png
 "Self serv registration enroll")

</div>

#### Diagram 3: Option 1: Enroll and verify phone (SMS) factor
After the password and email is verified, the user has the option to
enroll in the phone factor.

> **Note**: Based on the steps described in
  [Set up your Okta org (for multi-factor use cases)](/docs/guides/oie-embedded-sdk-setup/aspnet/oie-embedded-sdk-org-setup/) the Okta application is setup to require one possession factor
  (either email or phone). Once the email factor has been verified the phone
  factor becomes optional.

  The flow below describes the steps when the user enrolls in the optional
  phone SMS factor.

<div class="common-image-format">

![Self serv registration enroll](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-self-serv-seq-phone.png
 "Self serv registration enroll")

</div>

#### Diagram 4: Option 2: Skip optional phone (SMS) factor

The user can also opt to skip the factors when all the remaining
factors are optional. In this case, the user opts to skip the phone
(SMS) factor.

<div class="common-image-format">

![Self serv registration skip phone](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-self-serv-seq-skip-phone.png
 "Self serv registration skip phone")

</div>
