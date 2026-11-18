<div class="full">

!["A diagram that shows the main objects associated with each step in the sign-in flow."](/img/mobile-sdk/mobile-idx-objects-and-flow-kotlin.png)

</div>

The main objects associated with each step in the flow are:

| Sign-in step                       | Objects                          |
| :--------------------------------- |:---------------------------------|
| Initialize SDK                     | InteractionCodeFlow              |
| Request initial step               | InteractionCodeFlow              |
| Receive step                       | IdxResponse                      |
| Check completion, cancel, or error | IdxResponse <br/> IdxRemediation |
| Gather user input                  | IdxRemediation <br/> Capability  |
| Send input                         | InteractionCodeFlow              |
| Done                               | IdxResponse                      |
