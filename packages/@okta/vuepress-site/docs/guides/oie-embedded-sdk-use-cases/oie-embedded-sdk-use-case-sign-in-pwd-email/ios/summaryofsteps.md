## Working with the sample code

This guide is intended to walk you through a step by step integration
of the Swift SDK. It uses [sample code](#sample-code) that's designed with
a prescriptive and explicit flow purposely built to help facilitate understanding
of how to use the SDK. It is meant to be a learning tool and although you
can implement similar code in your app, you won't be able to reap the
benefits of a more dynamic approach as implemented by the
[sample application](/docs/guides/oie-embedded-sdk-run-sample/ios/main/).
This application, provided in the SDK's Git Repository, uses a more
dynamic model which allows its behavior to automatically respond to policy
changes. Specifically, it enables a pure policy driven design, that accepts new functionality,
such as adding additional sign in factors, without the need to update your application's
code. Such a feature becomes important for mobile clients. For more details about how to
download and run the sample, see
[Run the SDK sample app](/docs/guides/oie-embedded-sdk-run-sample/ios/main/).

If you're not ready to dive deep into the sample application's dynamic nature
and just want to learn the basics on how to call the SDk, follow the steps as detailed
in this guide.

## Summary of steps

The following sequence diagram illustrates the flow of an application using the
[sample code](#sample-code) to implement this use case.

<div class="common-image-format">

![A sequence diagram for the sign in with passowrd and email use case](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-swift-sign-in-pwd-email.png
 "Password and email diagram")

</div>
