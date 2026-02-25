---
title: "Running a Kubernetes Cluster at Home for Fun"
description: "An overview of the things I did to setup a Kubernetes cluster at home with old laptops."
date: "Jun 02 2024"
# image: "/assets/images/homelab-2024.jpg"
---

This weekend, I set up a Kubernetes cluster at home with some old laptops [just for fun](https://justforfunnoreally.dev/).

<figure class="mx-auto my-8 max-w-3xl text-center w-4/5">
  <img
    src="/assets/images/homelab-2024.jpg"
    alt="Image of a few laptops standing on their edge, inside plastic desk organizers intended for paper sheets"
    class="mx-auto rounded-lg shadow-md"
  />
  <figcaption class="mt-3 text-sm text-gray-500 dark:text-gray-400">
    <a href="https://en.wikipedia.org/wiki/Jugaad">जुगाड़</a> until I buy or build a proper vertical stand for these laptops
  </figcaption>
</figure>

I used:
- [Tailscale](https://tailscale.com/) to enable the nodes to talk to each other
- [K3s](https://k3s.io/) for setting up a K8s cluster
- [Longhorn](https://longhorn.io/) for replicated persistent storage
- The [Tailscale Kubernetes operator](https://tailscale.com/kb/1236/kubernetes-operator) to expose K8s services on my tailnet
- [Helm charts](https://helm.sh/) to manage all deployments.


## Some random details
- The cluster only has two nodes for now ([`mavros` and `luna`](/2022/browse-twitter-at-college)), both running Linux.
    <figure class="mx-auto my-8 max-w-3xl text-center">
      <img
        src="/assets/images/homelab-2024-nodes.png"
        alt="Image of the output of the 'kubectl get nodes' command"
        class="mx-auto rounded-lg shadow-md"
      />
      <figcaption class="mt-3 text-sm text-gray-500 dark:text-gray-400">
        Output of the <code>kubectl get nodes</code> command
      </figcaption>
    </figure>
- I reduced the default replica count from `3` to `1` for the Longhorn storage class.
  I don't really need high availability for most data at this point and I will manually increase the number of replicas for any volume that's important to me.
    <figure class="mx-auto my-8 max-w-3xl text-center">
      <img
        src="/assets/images/homelab-2024-longhorn-ui.png"
        alt="A screenshot of the Longhorn Dashboard, containing an overview of the nodes and volumes in the cluster."
        class="mx-auto rounded-lg shadow-md"
      />
      <figcaption class="mt-3 text-sm text-gray-500 dark:text-gray-400">
        A screenshot of the Longhorn dashboard
      </figcaption>
    </figure>
- As of writing this post, I've only deployed [Gitea](https://gitea.kitty-paradise.ts.net/) (an open-source git-based code-hosting server) to the cluster.
  I've pushed my [ledger](/2023/finance-workflow) repository and a repository containing helm charts and values for this homelab project to the instance.
    <figure class="mx-auto my-8 max-w-3xl text-center">
      <img
        src="/assets/images/homelab-2024-gitea-explore.png"
        alt="A screenshot of the Gitea 'Explore' page, containing a list of all repositories in the instance."
        class="mx-auto rounded-lg shadow-md"
      />
      <figcaption class="mt-3 text-sm text-gray-500 dark:text-gray-400">
        A screenshot of the Gitea "Explore" page
      </figcaption>
    </figure>
- I'm trying to not make any changes to the templates of the helm charts that I'm using to keep the upgrade process as painless as possible.  
  For example: one way of exposing K8s services as devices on your tailnet is to change the service type to `LoadBalancer` and set the `loadBalancerClass` to `tailscale`.
  While most helm charts allow setting the service type to `LoadBalancer` via helm values, they do not allow setting a `loadBalancerClass` for these services.
  I was initially patching the service templates in these charts to allow specifying a `loadBalancerClass`.  
  However, I later learned that the Tailscale Kubernetes operator also supports exposing services by setting a value for the `ingressClassName` on `Ingress` resources.
  Most charts that create services usually also contain templates to create `Ingress` resources for these services, and setting a value for the `ingressClassName` is much more common than setting a `loadBalancerClass`.  
  Hence, so far, exposing services using `Ingress` instead of a tailscale `LoadBalancer` has allowed me to keep using upstream charts with custom values files.

## Some things I'll think about later
- I want to measure the electricity consumption of the laptops, to get a rough estimate of how much this setup costs in terms of energy usage.
- Both the nodes are currently using their 500GB internal drives for storage. While I don't think I'm going to need a lot of space in this cluster anytime soon, it would be good to think about a plan to add storage to this cluster easily.
