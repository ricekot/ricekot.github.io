---
layout: page
title: Archive
permalink: /archive/
---

<section class="archive-post-list">
{%- for post in site.posts -%}
    {%- assign curPostYear = post.date | date: "%Y" -%}
    {%- if curPostYear != prevPostYear -%}
        {%- unless forloop.first -%}
    </table>
        {% endunless %}
    <h2> {{ curPostYear }} </h2>
    <table>
    {%- endif -%}
    {%- assign prevPostYear = curPostYear %}
    <tr>
        <td style="width: 100px; color: grey" nowrap>{{ post.date | date: "%B %-d" }}</td>
        <td><a href="{{ post.url | relative_url }}" style="color:black">{{ post.title }}</a></td>
    </tr>
{%- endfor %}
