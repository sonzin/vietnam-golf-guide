---
title: "Vietnam Golf Courses"
description: "A directory of Vietnam's best golf courses by region — Northern, Central and Southern Vietnam. Course details, locations, designers and tee-time booking via Wingolf."
nav_active: courses
breadcrumb_1:
  name: "Golf Courses"
  url: "/golf-courses/"
schema_type: CollectionPage
---
<div class="container">
  <div class="page-hero">
    <nav class="breadcrumbs" aria-label="Breadcrumb"><a href="{{ '/' | relative_url }}">Home</a><span class="sep">/</span>Golf Courses</nav>
    <h1>Vietnam Golf Courses</h1>
    <p>More than 90 courses now operate across Vietnam. This directory focuses on the courses most practical for travellers — the ones served by international airports, near the country's main hotel hubs, and easy to combine into a golf itinerary.</p>
  </div>
</div>

{% assign regions = "north|central|south" | split: "|" %}
{% assign region_meta = "Northern Vietnam|Central Vietnam|Southern Vietnam" | split: "|" %}

<div class="container">
  {% for region in regions %}
    {% assign idx = forloop.index0 %}
    {% assign label = region_meta[idx] %}
    <section class="section" id="region-{{ region }}">
      <div class="section-head">
        <span class="region-tag {{ region }}">{{ label }}</span>
        <h2>{{ label }} courses</h2>
        <p>
          {% if region == 'north' %}Golf in the north clusters around Hanoi — lakeside resorts on the western edge of the city, mountain layouts in Vinh Phuc and Bac Giang, and two championship options in Ninh Binh.
          {% elsif region == 'central' %}Central Vietnam is the country's golf heartland: five world-class layouts within an hour of Da Nang airport, plus links golf on the Nha Trang coast.
          {% else %}Southern golf is built for convenience — 36-hole parkland courses close to Ho Chi Minh City, coastal getaways on the Vung Tau peninsula and island resorts at Nha Trang, Da Lat and Phu Quoc.{% endif %}
        </p>
      </div>
      <div class="grid grid-3">
        {% for course in site.data.golf-courses %}
          {% if course.region == region %}
            {% include course-card.html course=course %}
          {% endif %}
        {% endfor %}
      </div>
    </section>
  {% endfor %}

  <section class="section">
    <div class="cta-band">
      <div>
        <h2>Compare live tee times</h2>
        <p>Green fees and availability change daily. Wingolf shows current tee-time options for these courses with 15-minute confirmation.</p>
      </div>
      <a class="btn btn-gold" href="{{ site.wingolf.courses }}">Browse courses on Wingolf</a>
    </div>
  </section>
</div>