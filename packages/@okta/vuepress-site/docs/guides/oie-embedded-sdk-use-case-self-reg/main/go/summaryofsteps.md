### Start the new user registration with the password factor

The following diagram illustrates the beginning of the registration process where the user initiates their sign-in flow and enrolls their password.

<div class="full">

![A sequence diagram that shows the beginning of the self-service registration flow, from the user clicking Create Account to their enrolling a password](/img/oie-embedded-sdk/oie-embedded-go-selfservice-pwd-flow-diagram.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?type=design&node-id=4608-24529&mode=design&t=Hn5PosgJQQI5avQ8-11  oie-embedded-go-selfservice-pwd-flow-diagram

 -->

</div>

### Enroll and verify the email factor

The self-registration flow continues by enrolling the user's email address.

<div class="full">

![A sequence diagram that shows the email factor enrollment part of the self-service registration flow](/img/oie-embedded-sdk/oie-embedded-go-selfservice-email-flow-diagram.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?type=design&node-id=4612-24600&mode=design&t=Hn5PosgJQQI5avQ8-11  oie-embedded-go-selfservice-email-flow-diagram

 -->

</div>

### Skip the optional remaining factors

The user skips enrolling more factors when the remaining unenrolled factors are optional. In this case, the user skips the phone factor.

<div class="full">

![A sequence diagram that shows the phone factor being skipped as part of the self-service registration skip phone flow](/img/oie-embedded-sdk/oie-embedded-go-selfservice-skip-flow-diagram.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?type=design&node-id=4612-24602&mode=design&t=Hn5PosgJQQI5avQ8-11 oie-embedded-go-selfservice-skip-flow-diagram

 -->

</div>
