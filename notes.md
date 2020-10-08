---
layout: page
title: Notes
permalink: /notes/
---

<section>
{% assign subjects = site.tags | sort %}
{% for subject in subjects %}
    {% if subject[0] == "notes" %} {% continue %} {% endif %}
    <h3>
        {% if subject[0] == "math-f241" %} Mathematical Methods
        {% elsif subject[0] == "math-f244" %} Measure and Integration
        {% elsif subject[0] == "bits-f463" %} Cryptography
        {% elsif subject[0] == "math-f311" %} Introduction to Topology 
        {% endif %}
    </h3>
    <ul style="list-style-type:none; font-size:18px;">
        {% for post in subject[1] %}
            <li><a href="{{ post.url | relative_url }}">
                <span style="color:grey;">{{ post.date | date: "%B %-d, %Y" }}</span> - {{ post.title }}
            </a></li>
        {% endfor %}
    </ul>
{% endfor %}
</section>
