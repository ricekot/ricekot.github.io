---
layout: default
permalink: /research/fvm-thesis/
---

<h2 style="color: grey; text-align: center">Maths Thesis - Numerical Methods in Kinetic Theory</h2>


This semester at BITS Pilani, I will be working under the guidance of
[Dr Anirudh Singh Rana](https://www.bits-pilani.ac.in/pilani/anirudhrana/profile)
and [Dr Aneesh AM](https://www.bits-pilani.ac.in/pilani/aneesham/profile)
on my thesis titled "Numerical Methods in Kinetic Theory".

According to [cfd-online.com](https://www.cfd-online.com/Wiki/Finite_volume),
*"The Finite Volume Method (FVM) is one of the most versatile discretization
techniques used in CFD"*, and I am looking forward to learn more about it.

<hr style="margin: 10px 0;">

### Posts

<table>
  {% for category in site.categories %} {% if category[0] == "fvm-thesis" %} {% for
  post in category[1] %}
  <tr>
    <td style="width: 100px; color: grey" nowrap>
      {{ post.date | date: "%b %-d, %Y" }}
    </td>
    <td>
      <a href="{{ post.url }}"> {{ post.title }} </a>
    </td>
  </tr>
  {% endfor %} {% endif %} {% endfor %}
</table>
