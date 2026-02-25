---
title: "How to Browse Twitter at College"
description: "Using Tailscale and a Firefox PAC file to selectively proxy websites that are blocked by the firewall on my college network."
date: "Nov 08 2022"
---

In this post, I'm going to be sharing the setup I use for accessing blocked domains and doing other stuff like messaging friends on IRC over the firewalled network at my college.

At my home almost 200km away, there lies a dusty Dell Latitude 3440 which has seen better days.
With an Intel Core i3-4005U CPU and 12 GB of RAM, it's running Ubuntu 22.04 LTS.
It's always plugged into a power outlet and a modem, and is configured so that it can be reboot remotely over SSH.
I call it `luna`.

My primary computer at the moment is a Dell Latitude 5480 with an Intel Core i5-7200U CPU and 16 GB of RAM running Debian 11.
It's called `Mavros`.

## Enter Tailscale

Both `luna` and `Mavros` are nodes on a Tailscale network.
From [their website](https://tailscale.com), "Tailscale create[s] a secure WireGuard mesh network between your devices, virtual machines, and servers — even when they’re separated by firewalls or subnets."
You see where I'm going with this, right?

This basically means that I can SSH into `luna` from `Mavros` anytime I want, as long as both of these devices can connect to the internet.

![Output of the command `tailscale status`. Shows luna and Mavros with IP addresses assigned to them by tailscale.](/assets/images/tailscale-status.png)

## IRC
I use [WeeChat](https://weechat.org/) as my IRC client, which provides a terminal user interface.
I leave WeeChat running within a [GNU Screen](https://www.man7.org/linux/man-pages/man1/screen.1.html) session on `luna`.
Then, whenever I want to jump back into Weechat from `Mavros`, I run:

```shell
ssh -t luna screen -r
```

This setup allows me to always stay connected to IRC servers and I don't miss any messages as a result.

## Blocked Domains
I had initially tried setting up `luna` as a [Tailscale exit node](https://tailscale.com/kb/1103/exit-nodes/) but I couldn't get that to work reliably for me.
Plus, it did not make sense for me to route *all* of my traffic through `luna`, but only the portion of it directed to blocked domains.

SSH has an option that allows using it as a [SOCKS](https://en.wikipedia.org/wiki/SOCKS) proxy.
From the [SSH man page](https://linux.die.net/man/1/ssh),

```
-D [bind_address:]port
        Specifies a local “dynamic” application-level port forwarding.  This works by allocating a socket to listen to port on the local
        side, optionally bound to the specified bind_address.  Whenever a connection is made to this port, the connection is forwarded
        over the secure channel, and the application protocol is then used to determine where to connect to from the remote machine.
        Currently the SOCKS4 and SOCKS5 protocols are supported, and ssh will act as a SOCKS server.  Only root can forward privileged
        ports.  Dynamic port forwardings can also be specified in the configuration file.

-N      Do not execute a remote command.  This is useful for just forwarding ports.
```

Thus, the command I use to start a SOCKS proxy server with SSH is:

```shell
ssh -ND 31337 luna
```

This allows me to use `localhost:31337` to proxy the traffic of any application via `luna`.
Thankfully, Firefox supports SOCKS proxies, and also allows specifying a [Proxy Auto-Configuration (PAC) file](https://developer.mozilla.org/en-US/docs/Web/HTTP/Proxy_servers_and_tunneling/Proxy_Auto-Configuration_PAC_file) for fine-grained control over proxied traffic.
This is what my PAC file currently looks like:

```js
const proxiedDomains = [
    "pbs.twimg.com",
    "video.twimg.com",
    "mitmproxy.org",
    "interactsh.com",
]

function FindProxyForURL(url, host) {
    if (proxiedDomains.some(domain => dnsDomainIs(host, domain))) {
        return "SOCKS5 localhost:31337";
    }
}
```

Any content served from a domain in the `proxiedDomains` list will be proxied through `luna`.
How cool is that?
The first two items in the `proxiedDomains` list are domains used by Twitter to serve images and videos, and that's how the title of this blog post came to be.
