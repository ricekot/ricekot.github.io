---
title: "Beginning My Security Journey"
description: "How a love for taking things apart led me to open source and my Google Summer of Code project with OWASP ZAP."
date: "May 28 2020"
# category: zap-graphql
---

This post is the first in a series of posts related to my [Google Summer of Code '20 project](/projects/zap-graphql/).

I have a habit of opening stuff up.

<center>
<img src="/assets/images/gsoc-week1-open.jpg" width="50%">
</center>
<br>
Whenever I find something that needs repair, or when I'm just feeling curious, I get my tools out. It leaves me in awe every time I see the internals of a machine - it's so easy to take for granted all the engineering and planning that goes into making something. It's simply fascinating, the process of creating and fixing things. This is the reason why I love computers so much and why I was attracted to the open source community. People from all around the world collaborating to create cool software? Count me in!

This is also why I think working in Information Security is so cool. It's only when you're able to fully understand a technology that you can begin to find vulnerabilities in it. It is my opinion that if one wants to work in security, they have to dedicate their lives to learning - to be up to date with the latest technologies, to understand the ins and outs of how things work and be able to think out of the box.

I thought Google Summer of Code was a good reason to finally start contributing to open source, and when looking for suitable organisations, I stumbled upon [this blog post](https://www.zaproxy.org/blog/2014-03-10-hacking-zap-1-why-should-you/) about OWASP's [Zed Attack Proxy](https://zaproxy.org). I was convinced that ZAP was the right project for me.

<center>
<table style="table-layout: auto; width: 50%;">
<tbody>
<tr><td align="center">
<img src="/assets/images/gsoc-week1-zap-poster.png">
</td></tr>
</tbody>
</table>
</center>

The ZAP developer community is very friendly and helpful. Even with little prior experience I was able to set up my development environment and start contributing, and my proposal was accepted eventually. 

The title of my [Google Summer of Code 2020 project](https://summerofcode.withgoogle.com/projects/#5797622171828224) is "Adding Support for GraphQL Security Testing to ZAP". You can find my proposal [here](https://docs.google.com/document/d/1vQ7aXAVwkrioa2Dp73RaAIsMH0G5XD6w6cTn1QmNMyQ/). I have enabled comments on it so feel free to suggest anything.

<br>
<center> - - - </center>
<br>

<center>
<table style="table-layout: auto; width: 75%;">
<tbody>
<tr><td>
<img src="/assets/images/gsoc-week1-neofetch.png">
</td></tr>
</tbody>
</table>
</center>

I use Linux for development. OpenSUSE Tumbleweed is the distribution I'm on currently. For writing code, I use VS Code, and I build and run the ZAP source code with the provided [Gradle Wrapper](https://docs.gradle.org/current/userguide/gradle_wrapper.html). 

Some useful resources that helped me in authoring [last week's pull request](https://github.com/zaproxy/zap-extensions/pull/2396):
- The [simpleexample](https://github.com/zaproxy/zap-extensions/tree/master/addOns/simpleexample) add-on, and [this document](https://owasp.org/www-pdf-archive/GuidelineZAPExtensionsAddOns1.0.pdf).
- The [OpenAPI](https://github.com/zaproxy/zap-extensions/tree/master/addOns/openapi) add-on.

I'd like to give my mentors [Simon](https://twitter.com/psiinon), [Rick](https://twitter.com/kingthorin_rm), and [Ricardo](https://github.com/thc202) a quick shout-out and thank them for taking out time from their busy schedules to guide me. They're great people, and you'd love working with them too! Hop on over to #zaproxy on Freenode IRC and say hi when you're ready to contribute to ZAP :).
