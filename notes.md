---
layout: page
title: Notes
permalink: /notes/
---

<section>
{% assign subjects = site.tags | sort %}
{% for subject in subjects %}
    {% if subject[0] == "notes" %} {% continue %} {% endif %}
    <details>
        <summary style="font-size:20px;">
            {% if subject[0] == "math-f241" %} Mathematical Methods
            {% elsif subject[0] == "math-f244" %} Measure and Integration
            {% elsif subject[0] == "bits-f463" %} Cryptography
            {% elsif subject[0] == "math-f311" %} Introduction to Topology 
            {% elsif subject[0] == "me-f211" %} Mechanics of Solids
            {% elsif subject[0] == "sicp" %} Structure and Interpretation of Computer Programs
            {% endif %}
        </summary>
        <ul style="list-style-type:none; font-size:18px; margin-top: 5px">
            {% for post in subject[1] %}
                <li><a href="{{ post.url | relative_url }}">
                    <span style="color:grey;">{{ post.date | date: "%B %-d, %Y" }}</span> - {{ post.title }}
                </a></li>
            {% endfor %}
        </ul>
    </details>
{% endfor %}
</section>
