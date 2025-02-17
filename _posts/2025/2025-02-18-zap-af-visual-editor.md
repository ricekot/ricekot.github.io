---
layout: post
title: <div class="ants-border">A Visual Editor for the ZAP Automation Framework</div>
description: I built a drag-and-drop web-based editor for ZAP Automation Framework plans.
image: "/assets/images/zap-af-visual-editor.png"
tags: experiments
date: 2025-02-18 01:30 +0530
---

This is the first post in the [Deliberate Curiosity]({% post_url 2024/2024-12-16-deliberate-curiosity %}) series.
I built an [MIT Scratch](https://en.wikipedia.org/wiki/Scratch_(programming_language)) inspired drag-and-drop editor that can generate ZAP automation framework plans in YAML.

<center>

<style>
    .screenshot {
        table-layout: auto
        width: 100%;
    }
    @media (min-width: 1200px) {
        .screenshot {
            width: 150%;
            transform: translateX(-18%);
        }
    }
</style>

<table class="screenshot">
<tbody><tr><td align="center">
<img src = "/assets/images/zap-af-visual-editor.png" alt="A screenshot of a webpage that is split into two. One-fourth of the page on the left is a YAML code viewer, while the rest of the page has drag-and-drop components for visual programming.">
</td></tr><tr><td align="center">
A screenshot of the project page. Try it out yourself at <a href="/zap-af-visual-editor">/zap-af-visual-editor</a>.
</td></tr></tbody></table>
</center>

The heavy lifting of this project is being done by [Google Blockly](https://developers.google.com/blockly).
I found its API a little tricky to work with, maybe because it's my first time writing TypeScript, but I think the whole thing turned out pretty well overall.
A Blockly feature that I found cute is the sound played whenever two blocks click together or a block is deleted.

In addition to Blockly, I used [CodeMirror](https://codemirror.net/) for displaying and highlighting the generated YAML, [Tailwind CSS](https://tailwindcss.com/) for styling, and [Vite](https://vite.dev/) to package everything together.

For the purposes of this experiment I only added two custom blocks - one for the automation environment and one for contexts passed to the environment - and they're not fully complete either.
I don't expect anyone to actually use this but it was a [fun](https://justforfunnoreally.dev/) way to spend the weekend.

My initial plan was to create and render [Mermaid](https://mermaid.js.org/) diagrams using ZAP Automation Framework plans, which I got a working prototype ready for very quickly (thanks to LLMs), but I liked the Blockly idea more and spent more time on that.

<center><table><tbody><tr><td align="center">
<img src = "/assets/images/zap-af-diagram.png" alt="A screenshot of a webpage that is split into two. Half of the page on the left is a YAML code viewer, while the other half of the page has a rendered mermaid flowchart.">
</td></tr><tr><td align="center">
Rendering mermaid diagrams from automation framework plans.
</td></tr></tbody></table></center>

Something to note is that this idea of using a drag-and-drop editor to generate YAML is not restricted to ZAP automation framework plans.
For example, this could be used to generate GitHub workflows or even Kubernetes objects.
Maybe it's worth writing a more general-purpose YAML generator for Blockly and have an easy way to describe custom objects (e.g. using a subset of [JSON Schema](https://json-schema.org/)).

Anyway, that's all for now!
I really enjoyed working on this project.
The code is available at [`ricekot/zap-af-visual-editor` on GitHub](https://github.com/ricekot/zap-af-visual-editor/) and you can try the editor yourself at [/zap-af-visual-editor](/zap-af-visual-editor).
If you try it out and have any comments or suggestions, please write to me at `hello[at]ricekot[dot]com`.
