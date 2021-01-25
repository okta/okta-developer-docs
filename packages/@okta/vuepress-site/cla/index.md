---
# This file controls the links and content shown on the /cla page.

component: Terms
title: CLA

showBreadcrumb: False

heading: Okta Individual Contributor License Agreement

terms:
  - paragraphs:
    - "Thank you for your interest in contributing to Okta’s open source projects! We have developed an Individual Contributor License Agreement (CLA) for developers to sign when submitting code to Okta on our public repositories through PRs on GitHub (or other methods). This CLA allows us to merge in code (or build upon suggested code) in our sample apps and SDKs, giving us the ability to utilize that code in the course of our business. A CLA is vital to building up public code repositories that can be used by a business. The use of CLAs is common in the development of software, especially open source software. Examples of other entities that use CLAs are <a href='https://www.apache.org/licenses/icla.txt'>The Apache Software Foundation</a>, the <a href='https://eclipse.org/legal/ECA.php'>Eclipse Foundation</a>, and <a href='https://cla.developers.google.com/about/google-individual?csw=1'>Google</a>."
    - The CLA is used to protect the rights of you the Contributor, Okta, and Okta’s users. The CLA does not take away any right, title, or interest you have in your contribution and only assigns the rights specified in the CLA to Okta in order to allow Okta and Okta’s users to use your contribution.
    - "You can download our CLA here: <a href='https://developer.okta.com/sites/all/themes/developer/pdf/okta_individual_contributor_license_agreement_2016-11.pdf'>Okta Individual Contributor License Agreement</a>"
    - "After you download the Okta Individual Contributor License Agreement, please read and sign it, and then email the signed copy to <a href='mailto:CLA@okta.com'>CLA@okta.com</a>."

  - heading: "Obvious Fixes: Do I have to sign this?"
    paragraphs:
      - In certain cases described below, a Contributor License Agreement may not be required if the contribution(s) are minor enough not to be considered intellectual property protectable by copyright or patent law (an “Obvious Fix”). This allows you to make contributions to Okta for Obvious Fixes without signing anything.

  - heading: What Is Considered an Obvious Fix?
    tag: h3
    paragraphs:
    - "An obvious fix is any contribution that is not protectable by intellectual property law. We generally consider Obvious Fixes to be changes that do not introduce any new functionality or creativity, for example:"
    - - Spelling or grammar mistakes
      - Typos
      - Comments clean-up
      - White-space or formatting changes
      - Logging messages or debug output
      - Changes to “metadata” files that do not impact existing external dependencies such as the .gitignore file
      - Build script errors
      - Example configuration files
      - Project structure changes like renaming a build directory or changing a constant
      - Re-ordering of objects, variables or methods within a source file
      - Moving source files from one directory to another without code changes
      - Refactoring a source file into multiple source files or consolidating multiple source files a single source file without changing functionality
    - "A Contributor License Agreement would be required for the following as they are not Obvious Fixes:"
    - - Anything that results in a change in functionality
      - A new feature
      - A translation, or a refactor that changes functionality
      - Extensive or creative comments, changes to README files or documentation

  - heading: How Do I Submit an Obvious Fix?
    tag: h3
    paragraphs:
    - "If you believe your contribution is an Obvious Fix, please add “Obvious Fix” to the pull request description. If Okta believes it is not an Obvious Fix we may request that you <a href='https://developer.okta.com/cla/okta_individual_contributor_license_agreement_2016-11.pdf'>sign a CLA</a> before we merge your pull request."

---
