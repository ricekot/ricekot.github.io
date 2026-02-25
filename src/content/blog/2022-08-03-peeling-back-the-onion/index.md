---
title: "Peeling Back The Onion"
description: "Why I think it is important to understand how your tools work."
date: "Aug 03 2022"
---

I am conflicted between spending time on learning CS fundamentals or tinkering with new tools.
I find reading and working through problems in books like [SICP](https://mitpress.mit.edu/sites/default/files/sicp/index.html) mentally stimulating.
However, it is so damn fun to get lost in rabbitholes doing things like setting up your own Kubernetes cluster, or using [Tailscale](https://tailscale.com/) to get around your school's firewall, or using [Syncthing](https://syncthing.net/) to sync files between your devices.
While it is gratifying to use these tools, is it worthwhile to spend time on them?

I have had the pleasure and privilege of working with several new technologies since I joined [Levo](https://levo.ai).
In the beginning, I was thrown into a Python codebase, where I learnt about Python generators and coroutines.
Then, I was asked to write a [gRPC](https://grpc.io/) service in Java to start Google CloudRun apps on demand.
I briefly worked with Golang to write custom components for the [OpenTelemetry Collector](https://github.com/open-telemetry/opentelemetry-collector).
I became more comfortable with Linux, scripting, GitHub actions, and more recently, Kubernetes and Helm.
I am grateful for all the experience I've garnered over the past year.

It feels awesome to be able to use all these technologies to build cool new stuff.
However, I think it's really important for me to understand the inner workings of the tools I'm using.
Technologies and tools like these are going to come and go.
What is really important is to grasp the ideas they bring with them.
That is why I think it is imperative that I work through all the books recommended in the [TYCS](https://teachyourselfcs.com/) guide, understand design patterns, and peel back the onion on the tools I work with.

To answer the question I posed at the beginning of this blog post - it is all about balance.
Yes, it is worth spending time on trying out new tools.
That exercises the curiosity muscle and the tool becomes an arsenal at your disposal when you solve problems.
However, I think it is just as important to pause to understand and appreciate how your tools work so you can extend them or use them in ways they weren't originally intended to be used.
