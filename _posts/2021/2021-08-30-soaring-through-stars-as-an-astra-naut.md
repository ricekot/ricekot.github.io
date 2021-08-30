---
layout: post
title: "Soaring Through the Stars as an Astra-Naut"
description: "My Experience as an SDE Intern at Astra Security"
image: "/assets/images/astra-naut-stars.png"
date: 2021-08-30 13:30:00 +0530
---

<center>
<table style="table-layout: auto; width: 75%;">
<tbody>
<tr><td align="center">
<img src="/assets/images/astra-naut-stars.png" alt="A cartoon astronaut is sitting on a rocket with the Astra logo on it. The background is filled with stars as the astronaut is flying through space.">
</td></tr>
<tr><td>
<details style="font-size:12px">
<summary align="right">Attribution</summary>
<table>
<tr><td>1.</td><td><a href="https://www.getastra.com">Astra Logo Trademark of ASTRA IT, Inc.</a></td></tr>
<tr><td>2.</td><td><a href="https://www.freepik.com/vectors/logo">Logo vector created by catalyststuff - www.freepik.com</a></td></tr>
<tr><td>3.</td><td><a href="https://www.freepik.com/photos/star">Star photo created by kjpargeter - www.freepik.com</a></td></tr>
<tr><td>4.</td><td>Edited by me.</td></tr></table>
</details>
</td></tr>
</tbody>
</table>
</center>

This is a post about my internship experience at [Astra Security](https://www.getastra.com/), where I interned for 4 months from May 2021 to August 2021 as a Software Development Engineer Intern.

I'm going to talk about all the cool stuff I got to work on, the fun times I had, and my general views on working remotely.

I primarily worked on setting up a microservice for automated penetration testing. A rough architecture of all the components of the automated scanner was already planned out when I started my internship. The idea, in a nutshell, was to create a wrapper around [OWASP ZAP](https://www.zaproxy.org/) as the core of the service. The microservice would expose APIs that would allow customers to start or stop automated scans from the front-end.

ZAP has a very extensive API, plus it's open source and actively maintained since the last 10 years, which made it an easy pick for our microservice even over other commercial alternatives.

Initially, we wrote the service in PHP. We used process control extensions in PHP to spawn a new instance of ZAP when a scan was started and the Slim Framework to expose an API. The plan was to send the alerts to the frontend when the automated scan was complete. However, scans can take a long time (10+ hours) to complete for big web applications. Wouldn't it be weird if you clicked on a button called "Start Scan" now and only got to see the results until later?

So, we decided to forward the issues to a webhook as soon as they were flagged by ZAP. I wrote a new add-on for ZAP called *Chowkidar* (it means "gatekeeper" in Hindi), which was responsible for this process. *Chowkidar* makes use of ZAP's event bus to listen for *alert added* events and forwards the flagged issues to the webhook.

One problem we faced was trying to work around the lack of good multithreading support in vanilla PHP. We wanted to respond to API requests immediately and process them asynchronously. We considered using queues and tried switching to a version of PHP with Zend Thread Safety, but we felt it would be much easier to just switch to Python. So we scrapped the PHP service and started rewriting it in Python.

It had taken us over a month to get a first version of the PHP microservice ready. I learnt about setting up my own API, interacting with and managing databases, the concept of staging and production environments, all for the first time. With some guidance from my seniors at Astra, rewriting the service in Python only took a week.

<center>
<table style="table-layout: auto;">
<tbody>
<tr><td align="center">
<img src="/assets/images/astra-scanner.png" alt="A software diagram with four components - the scanner microservice, the Chowkidar ZAP add-on, the Scanner Rules ZAP add-on and the frontend. Chowkidar sits between the scanner service and the frontend. The Scanner Rules add-on is a branch to the side.">
</td></tr>
<tr><td align="center">
The Scanner Microservice
</td></tr>
</tbody>
</table>
</center>

Other than being written in Python, the service uses Docker for containerization, Kubernetes for orchestration, PostgreSQL for the database, and DigitalOcean for hosting. The Scanner Rules add-on for ZAP is a major component of the service that consists of custom scan rules and metadata about vulnerabilities. *Chowkidar* is written in Java, and most rules in Scanner Rules are written in JavaScript. We created a deliberately-vulnerable application called [HypeJab](https://github.com/ricekot/hypejab) to test some of these rules.

In the last few weeks of my internship, I worked on a browser extension (a fork of [Selenium IDE](https://github.com/SeleniumHQ/selenium-ide)) that would allow customers to record actions on their website using selenium and export them in a format that ZAP can understand.

I did all my work remotely and I didn't find it to be a problem at all. We used Slack for textual discussions and Discord voice channels for daily stand-up meetings; Ora for managing tasks and a self-hosted GitLab instance for version control. We had a "convivial meet" at the end of every month where we played online games like skribbl.io to break the ice and got to know each other better.

I worked on many challenging problems and learnt a lot along the way. I am deeply grateful for being able to work at Astra and it's an experience I'll always cherish.

<center>
<table style="table-layout: auto;">
<tbody>
<tr><td align="center">
<img src="/assets/images/astra-notebook.jpg" alt='A notebook with a cartoon astronaut holding a laptop and the following words on the cover: "Happiness is... being an Astra-naut!"'>
</td></tr>
</tbody>
</table>
</center>