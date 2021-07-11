---
layout: post
title: "ZAP OAST: Basic Design Decisions"
date: 2021-07-11 23:15:00 +0530
category: zap-oast
tags: zap notes
---

This post is a part of a series of posts related to my [Google Summer of Code '21 project](/projects/zap-oast/).

As part of the project, I am working on creating a new add-on (called OAST) for ZAP. This add-on will allow users to exploit out-of-band vulnerabilities on target servers.

In this post I'm going to share what I've been working on and what my next steps are going to be.

## The First Commit

I started off with creating a new add-on in the [_zap-extensions_ GitHub repository](https://github.com/zaproxy/zap-extensions).

<center>
<table style="table-layout: auto; width: 75%;">
<tbody>
<tr><td align="center">
<a href="https://github.com/zaproxy/zap-extensions/pull/2996">
<img src="/assets/images/zap-extensions-oast-init-pr.png" alt="GitHub Pull Request in zap-extensions: oast: Initial Commit">
</a>
</td></tr>
<tr><td align="center">
Pull Request on GitHub
</td></tr>
</tbody>
</table>
</center>

If you also have an idea for an add-on and want to contribute it to zap-extensions, you can take a look at [this PR](https://github.com/zaproxy/zap-extensions/pull/2996) or follow the [official guide at zaproxy.org](https://www.zaproxy.org/docs/developer/creating-new-addon-in-zap-extensions/).

## The Add-On File Structure

The aim is to design the OAST add-on in such a way that users are able to use any service for receiving outbound requests from the target server.

This means that we should also try to make it easy for developers to extend the add-on to work with different OAST services like [BOAST](https://github.com/marcoagner/boast) or [TukTuk](https://github.com/ArturSS7/TukTuk).

With this in mind, I proposed the following two directory structures for the add-on in our IRC channel:

<div style="overflow-x: auto;">
<table>
  <tr>
    <th> Option 1 </th>
    <th> Option 2 </th>
  </tr>
  <tr>
    <td>
      <pre>
oast
├── api
│   ├── AbstractOastApi.java
│   ├── BoastApi.java
│   └── CallbackApi.java
├── automation
│   ├── AbstractAutomationOastJob.java
│   ├── AutomationBoastJob.java
│   └── AutomationCallbackJob.java
├── other
│   ├── BoastRegistrar.java
│   └── CallbackImplementor.java
├── param
│   ├── AbstractParam.java
│   ├── BoastParam.java
│   └── CallbackParam.java
└── ui
    ├── AbstractPanel.java
    ├── BoastPanel.java
    └── OptionsCallbackPanel.java
      </pre>
    </td>
    <td>
      <pre>
oast
├── AbstractAutomationOastJob.java
├── AbstractOastApi.java
├── AbstractPanel.java
├── AbstractParam.java
├── boast
│   ├── AutomationBoastJob.java
│   ├── BoastApi.java
│   ├── BoastPanel.java
│   ├── BoastParam.java
│   └── BoastRegistrar.java
└── callback
    ├── AutomationCallbackJob.java
    ├── CallbackApi.java
    ├── CallbackImplementor.java
    ├── CallbackParam.java
    └── OptionsCallbackPanel.java
      </pre>
    </td>
  </tr>
</table>
</div>

> &lt;ricekot&gt; which of these two directory structures for the oast add-on would you suggest? (Note that the classes are just there for the example) <br>
> &lt;ricekot&gt; (of course if you have any other suggestions those would work too) <br>
> &lt;psiinon&gt; I like the separate `boast` package - we can then have another `tuktuk` one and other ones for any other servers we want to support in the future <br>
> &lt;psiinon&gt; but other than that I dont have a strong preference <br>
> &lt;thc202&gt; +1 to that <br>

So we decided to go with Option 2.

## Moving the Callback Extension to OAST

Before beginning work on implementing interactions with the BOAST service, I decided on moving the existing [callback extension](https://github.com/zaproxy/zaproxy/tree/main/zap/src/main/java/org/zaproxy/zap/extension/callback) from the ZAP core to the OAST add-on.

This would allow me to

- make use of and adapt some of the existing classes from the callback extension, and
- focus on extensibility from the very beginning, because I would have two implementations (callback and BOAST) in the first version of the add-on.

## Designing the GUI

I wanted a drop down menu that contained the OAST services as options. When the user selects a service, the options in the panel should update accordingly.

[This answer on StackOverflow](https://stackoverflow.com/a/6432291/5511659) led me to using a [CardLayout](https://docs.oracle.com/javase/8/docs/api/java/awt/CardLayout.html) with an [ActionListener](https://docs.oracle.com/javase/8/docs/api/java/awt/event/ActionListener.html) attached to a [JComboBox](https://docs.oracle.com/javase/8/docs/api/javax/swing/JComboBox.html).

<center>
<table style="table-layout: auto;">
<tbody>
<tr><td align="center">
<img src="/assets/images/zap-oast-gui.gif" alt="An animated GIF of the ZAP OAST Options Panel showing how the options for the selected OAST servers are displayed dynamically."/>
</td></tr>
<tr><td align="center">
ZAP OAST Options Panel
</td></tr>
</tbody>
</table>
</center>

## Other Updates

- I [added a new constant](https://github.com/zaproxy/zaproxy/pull/6675) to the [HistoryReference](https://github.com/zaproxy/zaproxy/blob/9f5b48039ad17600165c615fed7b60d38edc3383/zap/src/main/java/org/parosproxy/paros/model/HistoryReference.java) class that will be used when persisting HTTP messages received by OAST services in the ZAP database.
- Added support for registering with a BOAST service. This is still in early stages - I still have to think about and handle possible points of failure (e.g. incorrect BOAST service URI supplied) and write unit tests.

## Next Actions

- Further integrate the BOAST service with ZAP - poll the server for events and display relevant information in the ZAP GUI.
- Completely move the callback extension to the OAST add-on and then deprecate it in the ZAP core.

## Notes

This section contains notes that may benefit my future self.

- In order to make use of an updated ZAP core feature in add-ons,

    1. Publish a SNAPSHOT version of ZAP to the Maven local repository by running 
        
        ```bash  
        ./gradlew publishZapPublicationToMavenLocal -D"maven.javadoc.skip=true"
        ```

        inside the cloned `zaproxy` folder on your system.
  
    2. Add the following lines to the gradle build script of your add-on (e.g. `oast.gradle.kts`):

        ```kotlin
        repositories {
            mavenLocal()
            mavenCentral()
        }

        dependencies {
            compileOnly("org.zaproxy:zap:2.11.0-SNAPSHOT")
        }
        ```
    
    3. This is only a temporary solution - use reflection if pushing to remote repositories or publish a SNAPSHOT to the Maven central repository.
