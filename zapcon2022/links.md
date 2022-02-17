---
layout: default
title: ZAPCon 2022 - OAST with ZAP
description: "Resources related to my presentation on \"OAST with ZAP\" at ZAPCon 2022."
image: "/assets/images/zapcon2022-social.png"
---

<style>
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
  <li><a href="/zapcon2022/demos">Demos</a></li>
  <li><a class="active" href="/zapcon2022/links">Links</a></li>
</ul>

<br>

## Blog Posts about ZAP and OAST

| Name / Link | Description |
| --- | --- |
| [Levelling up ZAP with OAST]({% post_url 2021/2021-06-25-levelling-up-zap-with-oast %}) | Introductory post about OAST and ZAP. |
| [ZAP OAST: Basic Design Decisions]({% post_url 2021/2021-07-11-zap-oast-basic-design-decisions %}) | Design decisions taken at the time of development of the OAST add-on. |
| [OAST with OWASP ZAP](https://www.zaproxy.org/blog/2021-08-23-oast-with-owasp-zap/) | The OAST Add-on GUI and Scripting APIs. |
| [Log4Shell Detection with ZAP](https://www.zaproxy.org/blog/2021-12-14-log4shell-detection-with-zap/) | Detecting Log4Shell Vulnerabilities with the OAST add-on. |
| [ZAP SSRF Setup](https://www.zaproxy.org/blog/2020-03-09-zap-ssrf-setup/) | Configuring the Callback Service for SSRF Attacks. |

## Documentation

| [ZAP OAST Add-on Desktop User Guide](https://www.zaproxy.org/docs/desktop/addons/oast-support/) |
| [Interactsh GitHub Repository](https://github.com/projectdiscovery/interactsh) |
| [BOAST GitHub Repository](https://github.com/marcoagner/boast) |

## ZAP Scan Rules that use OAST

| [Log4Shell Scan Rule](https://github.com/zaproxy/zap-extensions/blob/main/addOns/ascanrulesAlpha/src/main/java/org/zaproxy/zap/extension/ascanrulesAlpha/Log4ShellScanRule.java) |
| [XML External Entity Scan Rule](https://github.com/zaproxy/zap-extensions/blob/main/addOns/ascanrulesBeta/src/main/java/org/zaproxy/zap/extension/ascanrulesBeta/XxeScanRule.java) |
| [Out-of-band XSS Scan Rule](https://github.com/zaproxy/zap-extensions/blob/main/addOns/ascanrulesAlpha/src/main/java/org/zaproxy/zap/extension/ascanrulesAlpha/OutOfBandXssScanRule.java) |

## More Reading Resources

| [OAST (Out-of-band Application Security Testing) \| Blog - PortSwigger](https://portswigger.net/blog/oast-out-of-band-application-security-testing) |
| [Introducing Burp Collaborator \| Blog - PortSwigger](https://portswigger.net/blog/introducing-burp-collaborator) |
