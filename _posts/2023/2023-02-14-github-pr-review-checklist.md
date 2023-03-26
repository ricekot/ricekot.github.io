---
layout: post
title: "Adding a Review Checklist to GitHub PRs"
description: I wrote a tampermonkey script which adds a review checklist to GitHub PRs.
date: 2023-02-14 02:30 +0530
---

Doing good code reviews is difficult.  
Doing good code reviews *fast* even more so.

I feel overwhelmed when I think about reviewing large amounts of code written by other people.
They feel like a huge time drain and I would rather be spending that time doing something else.
However, when you work in a team, being able to provide good feedback on code written by others is an indispensable skill.

I think code is just a medium of expression for your ideas.
You need to be able to think clearly in order to write crisp, clean code.
In that sense, reading code written by other people is like peering into their mind.

In an attempt to make it slightly easier for me to do code reviews, I quickly hacked together a tampermonkey script which adds a review checklist to GitHub PRs. [tampermonkey](https://www.tampermonkey.net/) is a browser extension that lets you inject scripts into any webpage you want.

<center><table style="table-layout: auto; width: 75%">
<tbody><tr><td align="center">
<img src = "/assets/images/pr-review-checklist/demo.gif">
</td></tr><tr><td align="center">
Review Checklist on GitHub PRs
</td></tr></tbody></table></center>

The script is available as a [GitHub gist](https://gist.github.com/ricekot/a1331d4fd28bd6709f981b36d91cdb2e.js):

<script src="https://gist.github.com/ricekot/a1331d4fd28bd6709f981b36d91cdb2e.js"></script>
