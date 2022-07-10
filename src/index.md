---
layout: base.njk
title: Names
templateEngineOverride: njk,md
---

<ul>
  {%- for person in persons.persons %}
  <li>
    <a href="{{person.id}}.html">{{person.main.firstName}}<a/>
  </li>
  {% endfor -%}
</ul>
