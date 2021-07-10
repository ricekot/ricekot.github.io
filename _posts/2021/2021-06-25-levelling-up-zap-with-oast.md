---
layout: post
title: "Levelling Up ZAP with OAST"
date: 2021-06-25 08:00:00 +0530
category: zap-oast
tags: notes zap
---

This post is a part of a series of posts related to my [Google Summer of Code '21 project](/projects/zap-oast/).

A little background for readers unfamiliar with ZAP or OAST:

## What is ZAP?
Zed Attack Proxy (ZAP) is a fully open-source web application penetration testing suite. It is an OWASP flagship project and is widely used by developers and bug bounty hunters alike. It offers excellent Dynamic Application Security Testing (DAST) functionalities and there are several ways to automate and integrate it in your workflow. Find out more about ZAP at [zaproxy.org](https://www.zaproxy.org/).

## What is OAST?
Out-of-band Application Security Testing (OAST) involves sending payloads that trick the target into connecting with a second computer that is also controlled by the attacker. [This article by PortSwigger](https://portswigger.net/burp/application-security-testing/oast) is a good read on the topic. 

<center>
<table style="table-layout: auto">
<tbody>
<tr><td align="center">
<img src="/assets/images/zap-oast-graphic.png" alt="ZAP OAST Graphic that has logos of ZAP, the target and OAST with arrows between them.">
</td></tr>
<tr><td align="center">
ZAP and OAST
</td></tr>
</tbody>
</table>
</center>

## The OAST add-on for ZAP

The OAST functionality for ZAP will be made available as a ZAP add-on.

The add-on will provide an interface in ZAP to connect to an OAST server, much like the existing Callback Functionality. The user is expected to host their own OAST server and provide connection details to ZAP.

<center>
<table style="table-layout: auto">
<tbody>
<tr><td align="center">
<img src="/assets/images/zap-oast-options.png" alt="ZAP OAST Options Window">
</td></tr>
<tr><td align="center">
ZAP OAST Options (Preview)
</td></tr>
</tbody>
</table>
</center>

Then, at an interval that can be set by the user, ZAP will poll the OAST server for any interactions that it received and display them in a separate tab in the bottom panel.

<!-- ZAP bottom panel OAST tab image -->

Note that the OAST server must serve responses in a format that ZAP is able to understand. This will be documented and available soon. This add-on is going to be written in a way that will allow you to use any service with it. I'm going to be using [BOAST](https://github.com/marcoagner/boast) to test and develop the add-on.

The OAST add-on will also be configurable via the ZAP Automation Framework, API and the CLI.

## Attack Vectors

The OAST add-on will be bundled with many active scan rules that will make use of the service if enabled. These scan rules haven't been decided yet, but many existing scan rules will be updated and new ones will be introduced.

<center>
<table style="table-layout: auto">
<tbody>
<tr><td align="center">
<img src="/assets/images/zap-oast-blind-sqli.png" alt="ZAP OAST Graphic that shows an example of a blind SQL injection payload.">
</td></tr>
<tr><td align="center">
An example of Blind SQLi with ZAP and OAST
</td></tr>
</tbody>
</table>
</center>

## How can I get the add-on?

The add-on is still in development and will be available soon in the ZAP Marketplace :). For more updates keep an eye on the ZAP developer group or the ZAP GitHub repositories.

## Further information

You can find my proposal [here](https://docs.google.com/document/d/1LeiO3MWF_uUcBLkOIbzErOAZeVEtfBnU8fQnyO7D8P8/edit?usp=sharing) for more information about the implementation of the OAST add-on. All feedback / comments / requests for features appreciated!

I am very excited about this project and will be sharing more soon! ✨
