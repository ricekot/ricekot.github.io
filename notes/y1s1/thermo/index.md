---
layout: page
---

{% for image in site.static_files %}
    {% if image.path contains 'y1s1/thermo' %}
        <img src="{{ site.baseurl }}{{ image.path }}" alt="image" />
    {% endif %}
{% endfor %}