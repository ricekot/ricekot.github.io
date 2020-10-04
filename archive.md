---
layout: page
title: Archive
permalink: /archive/
---

<section class="archive-post-list">
<details><summary style="font-size:20px;"> All Posts </summary>
   {% for post in site.posts %}
       {% assign currentDate = post.date | date: "%Y" %}
       {% if currentDate != myDate %}
           {% unless forloop.first %}</ul>{% endunless %}
           <h3>{{ currentDate }}</h3>
           <ul style="list-style-type:none; font-size:18px;">
           {% assign myDate = currentDate %}
       {% endif %}
       <li><a href="{{ post.url }}"><span style="color:grey;">{{ post.date | date: "%B %-d" }}</span> - {{ post.title }}</a></li>
       {% if forloop.last %}</ul>{% endif %}
   {% endfor %}
</details>

<details><summary style="font-size:20px;"> Notes </summary>
{% assign subjects = site.tags | sort %}
{% for subject in subjects %}
    {% if subject[0] == "notes" %} {% continue %} {% endif %}
<details style="margin:5px 0  0 15px">
    <summary style="font-size:18px;">
        {% if subject[0] == "math-f241" %} Mathematical Methods
        {% elsif subject[0] == "math-f244" %} Measure and Integration
        {% elsif subject[0] == "bits-f463" %} Cryptography
        {% elsif subject[0] == "math-f311" %} Introduction to Topology 
        {% endif %}
    </summary>
    <ul style="list-style-type:none; font-size:18px;">
        {% for post in subject[1] %}
            <li><a href="{{ post.url | relative_url }}">
                <span style="color:grey;">{{ post.date | date: "%B %-d, %Y" }}</span> - {{ post.title }}
            </a></li>
        {% endfor %}
    </ul>
</details>
{% endfor %}
</details>

</section>
