---
layout: page
title: Archive
permalink: /archive/
---

<h2> Atom Feed </h2>
A feed for the blog can be found [here](/feed.xml).

<h2> By Year </h2>
<section class="archive-post-list">
<ul>
{% assign counter = 0 %}
{% for post in site.posts %}
    {% assign curPostYear = post.date | date: "%Y" %}
    {% if curPostYear != prevPostYear %}
        {% unless forloop.first %}
            <li> <a href="{{ prevPostYear }}/">
                {{ prevPostYear }} ({{ counter }})
            </a></li>
        {% endunless %}
        {% assign prevPostYear = curPostYear %}
        {% assign counter = 0 %}
    {% endif %}
    {% assign counter = counter | plus: 1 %}
    {% if forloop.last %}
        <li> <a href="{{ prevPostYear }}/">
            {{ prevPostYear }} ({{ counter }})
        </a></li>
    {% endif %}
{% endfor %}
</ul>
</section>
