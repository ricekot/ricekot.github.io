---
layout: post
title: Self-hosted Future Mail Service with n8n
description: Using n8n to create a future email delivery workflow.
date: 2025-12-20 17:00 +0530
---

I have a close friend who's a big fan of sending future emails to themselves.
They schedule emails to themselves on every birthday and on special milestones (e.g. turning 30, 35, etc).

I think it's pretty interesting and I've done it myself a couple of times too.
It feels nice to receive an email from yourself in the past.
It helps you realise how far you've come and how much can change in just a year, for example.

My friend used to schedule these future emails with a service called [FutureMe](https://www.futureme.org/).
FutureMe used to be a free service, but they recently started charging a yearly subscription fee (or alternatively, a per-email cost) for sending emails.
This move did not surprise me, because there's [no such thing as a free lunch](https://en.wikipedia.org/wiki/No_such_thing_as_a_free_lunch).
*Someone* has to pay for the infrastructure and management of the service.

My friend was willing to pay the fee, but asked me if I knew of any alternatives just in case.
They were also considering switching to [Gmail's scheduled email](https://support.google.com/mail/answer/9214606) feature, but the downside of that is that you can always peek at the emails you've scheduled.

I had recently set up [n8n](https://n8n.io/) in my homelab and it got me wondering if I could use that to quickly set up a workflow that would work for my friend.
After briefly brainstorming with an LLM about the possibility of doing so - I discovered [n8n forms](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.form/) and [data tables](https://docs.n8n.io/data/data-tables/).

It was pretty easy then to bootstrap the future mail service with n8n. It could be done with two workflows:
- The first workflow accepts the email address of the sender, the contents of their email, and the schedule date via an n8n form. These details are persisted in a data table.
- The second workflow runs periodically (e.g. every 6 hours). It queries the data table to get any unsent emails with a schedule date that's equal to or older than the current date and then sends those emails.

I've embedded these workflows below using the [n8n-demo](https://n8n-io.github.io/n8n-demo-webcomponent/) web component.
You should be able to explore these workflows by clicking into them.

<script src="https://cdn.jsdelivr.net/npm/@webcomponents/webcomponentsjs@2.0.0/webcomponents-loader.js"></script>
<script src="https://www.unpkg.com/lit@2.0.0-rc.2/polyfill-support.js"></script>
<script type="module" src="https://cdn.jsdelivr.net/npm/@n8n_io/n8n-demo-component/n8n-demo.bundled.js"></script>
<script>
  [
    ['n8n-future-email-form', '/assets/misc/n8n-future-email-form.json'],
    ['n8n-future-email-trigger', '/assets/misc/n8n-future-email-trigger.json']
  ].forEach(([id, url]) =>
    fetch(url).then(r => r.text())
      .then(j => document.getElementById(id).setAttribute('workflow', j))
  );
</script>

<n8n-demo id='n8n-future-email-form' frame="true" theme="light" collapseformobile="false"></n8n-demo>
<br />
<n8n-demo id='n8n-future-email-trigger' frame="true" theme="light" collapseformobile="false"></n8n-demo>
<br />


To send the emails, I created a new no-reply email address via [Migadu](https://migadu.com/), the email service I use for my domain and configured its credentials in n8n.

All my homelab services are currently running via Docker compose on a 10+ year old Dell laptop that's permanently plugged in.
All these services are behind nginx and the machine is exposed as a node in my Tailscale network.

I shared this Tailscale node with my friend which allowed them to access the n8n form to schedule emails to themselves in the future.

The setup is pretty simple and works as expected.
The obvious downside is reliability.
If my homelab server (the 10+ year old laptop) were ever to break in any way, then my friend can say goodbye to their future emails.

The other downside is privacy. While a self-hosted service is better for privacy than a random online service, it still requires the person using the email service to trust the n8n administrator.
That's because the email contents aren't currently encrypted before being persisted.
Of course, the person using the email service can simply encrypt the email contents before submitting them in the form, but that may not be straightforward to do for someone who isn't super technical.

Maybe the form can accept a secret passphrase that can be used to encrypt the contents on the client side before they're sent to the n8n server.
Then, instead of sending an email with the contents, users will be emailed a link that would allow them to decrypt the contents of their email with their passphrase.
But that's a project for another day.

One more drawback is potential abuse of the workflow.
Anyone with access to the n8n form could schedule thousands of emails to any email address.
I currently do not have any sort of access control setup for my Tailscale network or even just for the form.
I don't think this is a problem at the moment, because only people I trust have access to my network.
However, as someone who's deeply interested in security perhaps I should be more vigilant.

Anyway, that's all for now.
I was pleasantly surprised with how easy it was to use n8n to set up these workflows and wanted to share them here.

If you have any comments, suggestions, or ideas, feel free to reach me at the email on my [about page](/about/).
I recently had a reader email me about my [hledger finance workflow]({% post_url 2023/2023-09-03-finance-workflow %}) and that made me really happy.
Until next time.
