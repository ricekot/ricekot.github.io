---
title: "ZAP OAST: Basic Design Decisions"
description: "Design choices behind the ZAP OAST add-on: file structure for extensibility, GUI design, and moving the callback extension into OAST."
date: "Jul 11 2021"
# category: zap-oast
# tags: zap notes
---

This post is a part of a series of posts related to my [Google Summer of Code '21 project](/projects/zap-oast/).

As part of the project, I am working on creating a new add-on (called OAST) for ZAP. This add-on will allow users to exploit out-of-band vulnerabilities on target web applications.

In this post I'm going to share what I've been working on and what my next steps are going to be.

## The First Commit

I started off with creating a new add-on in the [_zap-extensions_ GitHub repository](https://github.com/zaproxy/zap-extensions).

<figure class="mx-auto my-8 max-w-3xl text-center w-3/4">
  <a href="https://github.com/zaproxy/zap-extensions/pull/2996">
    <img
      src="/assets/images/zap-extensions-oast-init-pr.png"
      alt="GitHub Pull Request in zap-extensions: oast: Initial Commit"
      class="mx-auto rounded-lg shadow-md"
    />
  </a>
  <figcaption class="mt-3 text-sm text-gray-500 dark:text-gray-400">
    Pull Request on GitHub
  </figcaption>
</figure>

## The Add-On File Structure

Then, I looked at how classes in the add-on package should be organised. This is because we want to design the OAST add-on in such a way such that it is easy for users to use any OAST service (like [BOAST](https://github.com/marcoagner/boast) or [TukTuk](https://github.com/ArturSS7/TukTuk)) for receiving outbound requests.

This means that if someone wants to use an OAST service that isn't supported by ZAP, we want them to be able to look at the existing code and figure out how to add support for that service without any major challenges.

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

...and here are the comments I received:

> &lt;psiinon&gt; I like the separate `boast` package - we can then have another `tuktuk` one and other ones for any other servers we want to support in the future <br>
> &lt;psiinon&gt; but other than that I dont have a strong preference <br>
> &lt;thc202&gt; +1 to that <br>

So we decided to go with Option 2.

## Moving the Callback Extension to OAST

Before integrating the BOAST service, I decided to move the [callback extension](https://github.com/zaproxy/zaproxy/tree/main/zap/src/main/java/org/zaproxy/zap/extension/callback) from the ZAP core to the OAST add-on. There were two reasons for doing so, as this would enable me to:

- make use of the existing classes from the callback extension, and
- focus on extensibility from the very beginning, because there would be two implementations (callback and BOAST) in the very first version of the add-on.

## Designing the GUI

For the GUI, I went with a drop down menu that contained the OAST services as options, and the settings in the panel updated based on the selected service.

With some [help from StackOverflow](https://stackoverflow.com/a/6432291/5511659), I was able to achieve some decent results.

<figure class="mx-auto my-8 max-w-3xl text-center w-full">
  <img
    src="/assets/images/zap-oast-gui.gif"
    alt="An animated GIF of the ZAP OAST Options Panel showing how the options for the selected OAST servers are displayed dynamically."
    class="mx-auto rounded-md shadow-md"
  />
  <figcaption class="mt-3 text-sm text-gray-500 dark:text-gray-400">
    ZAP OAST Options Panel
  </figcaption>
</figure>

## Other Updates

- I [added a new constant](https://github.com/zaproxy/zaproxy/pull/6675) to the [HistoryReference](https://github.com/zaproxy/zaproxy/blob/9f5b48039ad17600165c615fed7b60d38edc3383/zap/src/main/java/org/parosproxy/paros/model/HistoryReference.java) class that will be used with HTTP messages received by OAST services in the ZAP database.
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
