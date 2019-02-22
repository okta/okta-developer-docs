---
title: Why are DoS Attacks So Prevalent? - DOS Mitigation Strategies
---

<div style="font-size: 0.9em; margin-bottom: -20px;"><a href="/books/api-security/dos/">&larr; DOS Mitigation Strategies</a></div>

## Why are DoS Attacks So Prevalent? {#dos-why}
There are several reasons why someone might perform a DoS attack on a network or service. Most frequently, DoS attacks are carried out for profit. There are several ways to make money by staging a DoS attack. For instance, competitors of Amazon might find it beneficial if Amazon's service were slow or offline. This form of industrial sabotage may encourage customers to search for alternatives, increasing profits for competing businesses who aren't suffering the effects of a DoS attack.

Another way attackers can profit from DoS attacks is by selling access to compromised computers (called "BotNets") that can perform large-scale Distributed Denial of Service (DDoS) attacks. There are many places online where people can contract BotNets to carry out DDoS attacks. They can typically be rented and charge based on the amount of time that they slow or disable the target service; costs range from a few dollars for a fifteen-minute attack, to a few hundred dollars for twenty-four hours. Portals known as "booter" portals offer the BotNets for hire.

Yet another way attackers can make money by performing an attack is by hijacking personal information like credit cards and social security numbers during a DoS attack. For instance, if attackers target a payment provider with a DoS attack, they might be able to take advantage of the broken system to exploit a vulnerability that isn't available under normal circumstances.

It may also be the case that instead of _making_ money from a DoS attack, attackers want to cause their targets monetary losses. For instance, if you write an API that sends SMS messages using a service, you might have to pay a few cents per message sent. If attackers flood your service with a hundred thousand API calls that trigger those SMS messages, the financial loss could be severe.

Also, if an attacker knows that a service provider pays for inbound bandwidth, it might just be a matter of sending the service far more (or larger) requests than normal to eat up available bandwidth resources, causing the victim's cloud provider to send them a hefty monthly bill. Even a few calls made to a particularly data-heavy service can increase a company's cloud-based bandwidth costs. For instance, if a website hosts many large video files, repeatedly downloading massive video files will quickly drive up the provider's bandwidth costs.

Finally, an attack might be carried out for political reasons. This type of attack is akin to a political protest where protesters might block the door of a business that offends their political sensibilities. In 2011, a group known as the [Syrian Electronic Army](https://www.cnn.com/2013/04/24/tech/syrian-electronic-army/index.html) worked to support the government of Syrian President Bashar al-Assad by targeting political opposition groups. In October of last year, the Czech Parliamentary election was the [target of an attack](https://sputniknews.com/europe/201710231058456317-czech-election-hit-cyberattack/) meant to disrupt the counting of votes. Given all these motivations, it's easy to see why so many API services come under attack.
