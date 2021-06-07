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

<h2 style="margin-top:15px"> By Subject (Non-exhaustive) </h2>
<section class="archive-post-list">
{% assign subjects = site.tags | sort %}
{% for subject in subjects %}
    {% if subject[0] == "notes" %} {% continue %} {% endif %}
    <details>
        <summary>
            {% if subject[0] == "bits-f463" %} Cryptography
            {% elsif subject[0] == "math-f241" %} Mathematical Methods
            {% elsif subject[0] == "math-f244" %} Measure and Integration
            {% elsif subject[0] == "math-f311" %} Introduction to Topology 
            {% elsif subject[0] == "me-f211" %} Mechanics of Solids
            {% elsif subject[0] == "me-f220" %} Heat Transfer
            {% elsif subject[0] == "sicp" %} Structure and Interpretation of Computer Programs
            {% else %} {{ subject[0] }}
            {% endif %}
        </summary>
        <table>
            {% for post in subject[1] %}
                <tr>
                  <td style="width: 100px; color: grey;" nowrap>{{ post.date | date: "%b %-d, %Y" }}</td>
                  <td>
                    <a href="{{ post.url | relative_url }}" style="color:black">
                      {{ post.title }}
                    </a>
                  </td>
                </tr>
            {% endfor %}
        </table>
    </details>
{% endfor %}
</section>
