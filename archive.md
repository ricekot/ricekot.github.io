---
layout: page
title: Archive
permalink: /archive/
---

<section class="archive-post-list">

   {% for post in site.posts %}
       {% assign currentDate = post.date | date: "%Y" %}
       {% if currentDate != myDate %}
           {% unless forloop.first %}</ul>{% endunless %}
           <h3>{{ currentDate }}</h3>
           <ul style="list-style-type:none; font-size:18px;">
           {% assign myDate = currentDate %}
       {% endif %}
       <li><a href="{{ post.url }}"><span style="color:grey;">{{ post.date | date: "%B %-d, %Y" }}</span> - {{ post.title }}</a></li>
       {% if forloop.last %}</ul>{% endif %}
   {% endfor %}

</section>
 