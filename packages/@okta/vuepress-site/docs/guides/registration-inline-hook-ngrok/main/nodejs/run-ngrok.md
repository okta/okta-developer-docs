After installing ngrok, ensure that it's running by creating a "tunnel" into a local port (`8082` in this example). If you installed directly into your project directory (for example, `sample-app`), run the following command in your terminal:

```shell
sample-app > ./ngrok http 8082
```

If you see the following content in your terminal, ngrok is running successfully:

<div class="three-quarter">

![An image of a terminal that displays an ngrok session status, with online in green. The session status contains urls that tunnel into the local port.](/img/hooks/ngrok-and-event-hooks-session-status.png)

</div>

> **Note:** Copy the forwarding URL that’s available from the ngrok terminal session. For example: `https://2d20-142-126-163-77.ngrok.io`. Use this URL when setting up your Okta event hook.

See [ngrok](https://ngrok.com) or their [documentation](https://ngrok.com/docs/start).
