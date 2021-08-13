---
title: Event Hooks with ngrok
excerpt: How to demonstrate Event Hooks using ngrok to expose a local app to the internet.
layout: Guides
---

Intro text

- process?
- process?
- process?

### Install ngrok

The ngrok utility exposes local web servers to the internet, and can facilitate the testing of Okta Event Hooks with a local application, rather than an internet-based production or test external service.

If you already have ngrok installed, move on to the next step! If not, follow the installation instructions at [https://ngrok.com/download](https://ngrok.com/download).

Some installation notes:

- You do not need to have an account to install and run ngrok, but creating an account provides more features as well as basic authentication.
- You can install ngrok directly in your project folder, as documented from the ngrok download page. Or you can install on your system's path directory to be able to run ngrok from any folder. Alternatively, you can install the executable in your favorite local folder, but you'll need the folder path when referencing the tool.

#### Run ngrok

After installing ngrok, ensure that it's running by creating a "tunnel" into a local port. If you installed directly into your project folder, run the following command in your terminal:

```terminal
> ./ngrok http 8082
```

If you see the following content in your terminal, ngrok is running successfully:

<div class="common-image-format">

![A screen shot of a terminal that displays an ngrok session status, with online in green. The session status contains urls that tunnel into the local port.](/img/ngrok-and-event-hooks-session-status.png")

</div>

See [ngrok](https://ngrok.com) or their [documentation](https://ngrok.com/docs) for further information.

### Create a local application

### Create an Okta Event Hook

### Preview, test, and review the Event Hook
