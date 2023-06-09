---
layout: post
title: "Leaked Build Arguments in Multi-stage Docker Builds via Build Attestations"
description: Stop using Docker build arguments for your secrets!
date: 2023-06-10 02:00 +0530
---

Stop using Docker build arguments for your secrets, even in multi-stage builds!

While it is widely recommended that build arguments should not be used for secrets, using them in transient stages of a [multi-stage](https://docs.docker.com/build/building/multi-stage/) build is commonly suggested as a remediation to avoid leaking them (e.g. [this blog post on snyk.io](https://snyk.io/blog/10-best-practices-to-containerize-nodejs-web-applications-with-docker/#:~:text=8.-,Use%20multi%2Dstage%20builds,-Multi%2Dstage%20builds)).

However, with the introduction of [Build Attestations](https://docs.docker.com/build/attestations/) in recent versions of Buildkit (`>=0.11`) and Buildx (`>=0.10`), it's now easier than ever to accidentally leak secrets injected via build arguments. In fact, the latest version of the `docker/build-push-action` GitHub action (`v4`) enables Provenance build attestations by default, and I learnt it the hard way to not use build-arguments for sensitive data.

## It's not a bug, it's a feature

The [documentation on provenance attestations](https://docs.docker.com/build/attestations/slsa-provenance/) clearly mentions the downsides of using the `max` mode:

> When possible, you should prefer `mode=max` as it contains significantly more detailed information for analysis. However, on some builds it may not be appropriate, as it includes the values of build arguments and metadata about secrets and SSH mounts.

Now, look at [this code snippet](https://github.com/docker/build-push-action/blob/44ea916f6c540f9302d50c2b1e5a8dc071f15cdf/src/context.ts#L144-L151) from the `docker/build-push-action` GitHub action that I find slightly problematic:

```ts
if (GitHub.context.payload.repository?.private ?? false) {
  // if this is a private repository, we set the default provenance
  // attributes being set in buildx: https://github.com/docker/buildx/blob/fb27e3f919dcbf614d7126b10c2bc2d0b1927eb6/build/build.go#L603
  args.push('--provenance', BuildxInputs.resolveProvenanceAttrs(`mode=min,inline-only=true`));
} else {
  // for a public repository, we set max provenance mode.
  args.push('--provenance', BuildxInputs.resolveProvenanceAttrs(`mode=max`));
}
```

*Provenance is set to `mode=max` by default for public repositories.*

This means that if:
1. you have a GitHub workflow in a public repository,
2. the workflow is using `v4` of the `docker/build-push-action` with default parameters, and
3. you're passing secrets using build arguments to the builder,

then you're leaking those secrets via provenance build attestations.

You should either update your workflow by setting `provenance` to `mode=min` explicitly (or `false` to disable it completely), or use a [Docker secret](https://docs.docker.com/engine/reference/commandline/buildx_build/#secret) for your secret, or both.

## Demo

Just for fun, I created a repository that satisfies the above conditions to demonstrate what I'm talking about.
See [ricekot/docker-provenance-attestations-demo](https://github.com/ricekot/docker-provenance-attestations-demo) on GitHub.

The `build-and-push.yml` workflow in the repository publishes a Docker image with the tag `ghcr.io/ricekot/docker-provenance-attestations-demo:latest`. A secret called `MY_PRECIOUS_SECRET` is passed to the build process.

```yml
- uses: docker/build-push-action@v4
  with:
    context: .
    push: true
    tags: ghcr.io/ricekot/docker-provenance-attestations-demo:latest
    build-args: |
      MY_PRECIOUS_SECRET={% raw %}${{ secrets.MY_PRECIOUS_SECRET }}{% endraw %}
```

The following command can be used to extract the secret from the published image:

```shell
docker buildx imagetools inspect \
  ghcr.io/ricekot/docker-provenance-attestations-demo:latest \
  --format {% raw %}"{{ json .Provenance.SLSA.invocation.parameters.args }}"{% endraw %}
```

```json
{
  "build-arg:MY_PRECIOUS_SECRET": "I love ice cream"
}
```
