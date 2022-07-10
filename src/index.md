---
layout: base.njk
title: Names
templateEngineOverride: njk,md
---

<ul>
  {%- for person in persons %}
  <li>{{ person.main.firstName }}{{ person.main.firstName }}</li>
  {% endfor -%}
</ul>
