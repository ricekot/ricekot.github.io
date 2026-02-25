---
title: "Setting Up a Personal ActivityPub Microblog"
description: "I share why and how I set up my new microblog that's accessible at til.ricekot.com."
date: "Jan 18 2023"
---

**UPDATE [Mar 26, 2023]**: I wasn't using the microblog at all, so I went ahead and deleted the VM being used to host it.

My microblog is now available at [til.ricekot.com](https://til.ricekot.com) and you should be able to follow me from any ActivityPub service (e.g. Mastodon) using my handle `@ricekot@ricekot.com`.

I recently read a blog post titled [What to Blog About](https://simonwillison.net/2022/Nov/6/what-to-blog-about/) by Simon Willison.
It suggested the idea of posting *TIL*s which stands for "Today I Learned".

> Did you just learn how to do something? Write about that.

I love blogging, but I don't like writing about things that one can easily find in other places online (e.g. documentation) or that other people have already written about.
For example, I once wrote about [Managing Services on Google Cloud Run with its Admin API Client in Java](https://github.com/ricekot/ricekot.github.io/commit/2dfa6ebfa6bbac517a66943cc0ad35052ffdadc5) but removed it later because I felt that the actual docs on the topic were sufficient.

However, I still want to share small hacks or stuff that I find interesting more often.
Besides, I thought that hosting my own microblog would be a fun project and hosting it myself means that my content truly belongs to me.

A lot of folks I know have been creating accounts on various Mastodon instances.
Initially, I was planning to host my own Mastodon instance on my old laptop server using Tailscale Funnel.
However, Tailscale Funnel doesn't support custom domains at the moment so that was out of the question.

I started reading about the minimum system requirements for hosting Mastodon in the cloud.
From there, I stumbled upon [ActivityPub](https://activitypub.rocks/), which is a W3C protocol that Mastodon implements.
I also realised that Mastodon may be too heavy for my needs, since I was going to be the only user on my server, and started to look for lighter alternatives.
That is when I discovered [microblog.pub](https://docs.microblog.pub/).

I decided to get started with a regular $6/month Debian 11 droplet on DigitalOcean with some credits I had in my account (thanks to the [GitHub Student Developer Pack](https://education.github.com/pack)).
I SSH'd into the droplet, created a new user, added the server as a node on my [tailnet](https://tailscale.com/kb/1136/tailnet/), and set up [relevant firewall rules](https://tailscale.com/kb/1077/secure-server-ubuntu-18-04/) using UFW.

```shell
$ sudo ufw status verbose
Status: active
Logging: on (low)
Default: deny (incoming), allow (outgoing), deny (routed)
New profiles: skip

To                          Action      From
--                          ------      ----
Anywhere on tailscale0      ALLOW IN    Anywhere
80/tcp                      ALLOW IN    Anywhere
443                         ALLOW IN    Anywhere
Anywhere (v6) on tailscale0 ALLOW IN    Anywhere (v6)
80/tcp (v6)                 ALLOW IN    Anywhere (v6)
443 (v6)                    ALLOW IN    Anywhere (v6)
```

Next, I set up [NGINX with certbot](https://www.nginx.com/blog/using-free-ssltls-certificates-from-lets-encrypt-with-nginx/) and updated my domain's DNS settings to point the `til` subdomain to the IP address of the droplet.

I cloned the `microblog.pub` [repository](https://sr.ht/~tsileo/microblog.pub/) on the droplet and built a docker image for the service.
After updating the default profile values for the service, I started a container with docker compose.
Finally, I configured NGINX to route traffic to the docker container.

However, the work wasn't done yet.
I wanted my handle to be `@ricekot@ricekot.com`, not `@ricekot@til.ricekot.com`.

The docs [recommend](https://docs.microblog.pub/installing.html#(advanced)-running-on-a-subdomain) creating a 301 redirect from `ricekot.com/.well-known/webfinger` to `til.ricekot.com/.well-known/webfinger`.
The problem is, `ricekot.com` is a static site hosted on GitHub pages, which means that redirecting with a 301 HTTP response status code is not possible.

Since I'm using Cloudflare DNS for my domain, I thought of creating a redirect rule for this situation.
Cloudflare DNS supports proxying incoming traffic and transforming it with custom rules before it reaches a domain.

<figure class="mx-auto my-8 max-w-3xl text-center w-full">
  <img
    src="/assets/images/activitypub-microblog/cloudflare-redirect-rule.png"
    alt="Screenshot of the redirect rule on Cloudflare dashboard"
    class="mx-auto rounded-lg shadow-md"
  />
  <figcaption class="mt-3 text-sm text-gray-500 dark:text-gray-400">
    Cloudflare redirect rule
  </figcaption>
</figure>

All I had to do next was, add `webfinger_domain = "ricekot.com"` to `data/profile.toml`, and restart the container.
That's it!
My microblog instance was now ready to be connected to the wider Fediverse.
I confirmed that my account was accessible via other Mastodon services by searching for `@ricekot@ricekot.com` on [infosec.exchange](https://infosec.exchange).

Just in case, I also decided to backup the `data` folder within the cloned `microblog.pub` repository.
This folder is mounted inside the container and contains all the data specific to my microblog instance.
I set up [Syncthing](https://syncthing.net/) over Tailscale (which was required because of the UFW rules) and shared the folder with the other nodes on the tailnet.

<figure class="mx-auto my-8 max-w-3xl text-center w-3/4">
  <img
    src="/assets/images/activitypub-microblog/syncthing-folder.png"
    alt="Screenshot of Syncthing folder metadata"
    class="mx-auto rounded-lg shadow-md"
  />
  <figcaption class="mt-3 text-sm text-gray-500 dark:text-gray-400">
    Syncthing folder metadata
  </figcaption>
</figure>

## What's next?
While setting up my microblog was a lot of fun, I'm not fully convinced if this is any better than a regular static site for my purposes.
I'm not a huge fan of social media, and I'm not sure if I want to pay $6/month for sustaining this when my credits run out.
For now, however, I think I'm going to start posting stuff I find interesting to my microblog, and we'll see how it goes from there.
