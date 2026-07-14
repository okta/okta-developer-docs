<div class="full">

!["A diagram that shows the main objects associated with each step in the sign-in flow."](/img/mobile-sdk/mobile-idx-objects-and-flow-swift.png)

</div>

The main objects associated with each step in the flow are:

| Sign-in step                       | Objects                         |
| :--------------------------------- | :------------------------------ |
| Initialize SDK                     | InteractionCodeFlow             |
| Request initial step               | InteractionCodeFlow             |
| Receive step                       | Response                        |
| Check completion, cancel, or error | Response <br/> Remediation      |
| Gather user input                  | Remediation <br/> Authenticator |
| Send input                         | Remediation                     |
| Done                               | Response                        |
