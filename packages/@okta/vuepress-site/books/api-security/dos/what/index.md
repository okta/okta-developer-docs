---
title: Types of Denial of Service Attacks - DOS Mitigation Strategies
---

<div style="font-size: 0.9em; margin-bottom: -20px;"><a href="/books/api-security/dos/">&larr; DOS Mitigation Strategies</a></div>

## Types of Denial of Service Attacks {#dos-what}

There are three main types of DoS attacks:

### 1. Application-layer Flood
In this attack type, an attacker simply floods the service with requests from a spoofed IP address in an attempt to slow or crash the service, illustrated in <a href="#fig_dos_flood" class="figref"></a>. This could take the form of millions of requests per second or a few thousand requests to a particularly resource-intensive service that eat up resources until the service is unable to continue processing the requests.

<figure id="fig_dos_flood">
  <img /assets/img/books/attack.png" alt=""/>
  <figcaption>An attacker floods the service from a single IP address</figcaption>
</figure>

Preventing application-layer DoS attacks can be tricky. The best way to help mitigate these types of attacks is to outsource pattern detection and IP filtering to a third party (discussed later).


### 2. Distributed Denial of Service Attacks (DDoS)
Distributed Denial of Service (DDoS) attacks occur in much the same way as DoS attacks except that requests are sent from many clients as opposed to just one, illustrated in <a href="#fig_dos_ddos" class="figref"></a>. DDoS attacks often involve many "zombie" machines (machines that have been previously compromised and are being controlled by attackers). These "zombie" machines then send massive amounts of requests to a service to disable it.

DDoS attacks are famously hard to mitigate, which is why outsourcing network filtering to a third party is the recommended approach. We'll cover this later on.


### 3. Unintended Denial of Service Attacks
Not all DoS attacks are nefarious. The third attack type is the "unintended" Denial of Service attack. The canonical example of an unintended DDoS is called "[The Slashdot Effect](https://hup.hu/old/stuff/slashdotted/SlashDotEffect.html)". Slashdot is an internet news site where anyone can post news stories and link to other sites. If a linked story becomes popular, it can cause millions of users to visit the site overloading the site with requests. If the site isn't built to handle that kind of load, the increased traffic can slow or even crash the linked site. Reddit and "[The Reddit Hug of Death](https://thenextweb.com/socialmedia/2012/01/17/how-reddit-turned-one-congressional-candidates-campaign-upside-down/)" is another excellent example of an unintentional DoS.

<figure id="fig_dos_ddos">
  <img /assets/img/books/ddos.png" alt=""/>
  <figcaption>An attacker uses zombie machines to launch a DDoS against the target</figcaption>
</figure>

The only way to prevent these types of unintended DoS attacks is to architect your application for scale. Use patterns like edge-caching with CDNs, HTTP caching headers, auto-scaling groups, and other methods to ensure that even when you receive a large amount of burst-traffic, your site will not go down.

Another type of unintentional DoS attack can occur when servicing low bandwidth areas. For instance, streaming content internationally means that people in certain areas of the world with slow or bad internet connections might cause problems. When your service attempts to send information to these low-bandwidth areas, packets drop. In an attempt to get the information to the destination, your service will attempt to resend all dropped packets. If the connection drops the packets again, your service may make another attempt. This cycle can cause your service's load to double or triple, causing your service to be slow or unreachable for everyone.
