---
layout: post
title: "Getting Kubernetes Metadata on Linux Nodes"
description: How to get Kubernetes Pod metadata for processes on Linux nodes in Kubernetes clusters
date: 2024-02-20 01:00 +0530
canonical_url: https://www.levo.ai/post/getting-kubernetes-metadata-on-linux-nodes
image: "/assets/images/levo-dashboard-k8s-context.png"
---

This post will discuss how you can get Kubernetes Pod metadata for a process on a Linux node in a Kubernetes cluster.

Note: This blog post was originally published on the [Levo blog](https://www.levo.ai/post/getting-kubernetes-metadata-on-linux-nodes) which has been added as a canonical URL for this post.

## PID to Container ID

First, we can check the `/proc/[pid]/cgroup` file for the PID we're interested in to know if it belongs to a process running within a Kubernetes Pod.
This file also gets us the container ID for the process.

The `/proc/[pid]/cgroup` file should contain a line that matches the following regular expression:

```text
(.*kubepods.*(?<containerId>[0-9a-f]{64})(?:\.scope)?$)
```

Some examples from our unit tests:

```c++
// minikube+docker kubernetes cluster
line = "0::/system.slice/docker-2d0bdb07d9875685a9444722fb0c9a5a602c7c0fb43df67bc15298d65f55d7ca.scope/kubepods.slice/kubepods-besteffort.slice/kubepods-besteffort-podccb388c7_7a47_44fe_8a22_c4ba2e3cb768.slice/docker-878d41c03caa1b1033c1e7cb6c5ed75aafa2673d8aaaae5025e959a7b5c5dc38.scope"
containerId = "878d41c03caa1b1033c1e7cb6c5ed75aafa2673d8aaaae5025e959a7b5c5dc38"

// regular kubernetes clusters
line = "10:pids:/kubepods.slice/kubepods-burstable.slice/kubepods-burstable-podade50c4e_141d_4b61_a154_c835f04f0d73.slice/cri-containerd-bdc11dc1d24720bfac0c05040d3d54f0525c64e0275f4e7d9028711504b4fac7.scope"
containerId = "bdc11dc1d24720bfac0c05040d3d54f0525c64e0275f4e7d9028711504b4fac7"

line = "0::/kubepods.slice/kubepods-besteffort.slice/kubepods-besteffort-pod3d1b4f66_e156_4950_a838_c4d71c423e81.slice/docker-2bb91674d621cab821417b69dc96b12de89daeed340852e7dd48c82ed45efcf5.scope"
container_id = "2bb91674d621cab821417b69dc96b12de89daeed340852e7dd48c82ed45efcf5"

line = "12:hugetlb:/kubepods/burstable/pod1a32b976-4e23-459d-8925-b71621b1c339/2cfe3b181e6065cf064f546ae953d0a639113cea821ca770abf266db5c508fa8"
container_id = "2cfe3b181e6065cf064f546ae953d0a639113cea821ca770abf266db5c508fa8"
```

## Container ID to Kubernetes Pod

Next, we can use the `/api/v1/pods` endpoint of the Kubernetes API to determine which pod a container belongs to on the Linux node.

While we can run `kubectl proxy --port=8080` and use `curl` to make a request to the API, you may find it interesting to know that we can also use the `kubectl` command to make the request for us.

The `kubectl get pods --all-namespaces` command also uses the `/api/v1/pods` API endpoint, and you can see the full, untruncated HTTP calls it makes by running `kubectl get pods --all-namespaces -v=10`.

However, that can get overwhelming for large clusters (our humble dev cluster returned a 400+ KiB response!).

The `kubectl` command has another neat flag that we can use, `--output jsonpath`, which allows us to extract only the information we need from the response. For example, to get the container IDs of all the pods in the cluster, we can use the following command:

```shell
kubectl get pods --all-namespaces --output jsonpath='{.items[*].status.containerStatuses[*].containerID}' | sed 's/ /\n/g'
```

```text
containerd://fe5f8b9083bdf5527ecc1584e1cb8a8709e463da2fb00d101854a9b34e9318fa
containerd://86acf109ce6e62f6df52b16258fbad1f7ead33106144068fb266f7164443b5c3
containerd://27b63c84ff42a2ac9da32bf1a96873aac4adeae2f382652478d3352a36a96b7b
containerd://5c743d78f5c1780d660963939d78c7059aa30191ea7cb70f631be75def5f5a01
containerd://66d6e92ac50ead8fee0454cf7bce16e4bb84c9e0e15a106d60cc32a814630f6b
containerd://4984e1b4914a224163c6f267f053c91653b6eee212e38b8d9b4c36095277074a
```

## PID to Kubernetes Pod

With the information we have now, it's simply a matter of mapping the container ID discovered in the `/proc/[pid]/cgroup` file for a PID to the container ID in the response of the `/api/v1/pods` endpoint.

Levo's eBPF Sensor uses some of the ideas discussed in this blog post and some eBPF magic to get the full Kubernetes context for every single API call made by a process running inside a Kubernetes Pod.

<center><table style="table-layout: auto; width: 100%">
<tbody><tr><td align="center">
<img src = "/assets/images/levo-dashboard-k8s-context.png">
</td></tr><tr><td align="center">
Kubernetes Context for an Endpoint in the Levo Dashboard
</td></tr></tbody></table></center>

The eBPF sensor uses a custom Kubernetes API Client written in C++ and does some fun stuff like caching the Kubernetes API responses, using field selectors for optimized calls, using pod owner references to get metadata about deployments, and more, but maybe we can save those for another day.
