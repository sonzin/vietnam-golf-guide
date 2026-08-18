(function () {
  "use strict";

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  var finder = document.getElementById("course-finder");
  if (finder) {
    var region = finder.querySelector("#filter-region");
    var dest = finder.querySelector("#filter-destination");
    var grid = document.getElementById("course-grid");
    var count = document.getElementById("finder-count");
    var empty = document.getElementById("finder-empty");
    var cards = Array.prototype.slice.call(grid.querySelectorAll(".course-card"));

    var destOptions = {};

    function buildDestinationOptions() {
      var sel = finder.querySelector("#filter-destination");
      sel.innerHTML = '<option value="">All destinations</option>';
      var current = "all";
      Object.keys(destOptions).sort().forEach(function (d) {
        var opt = document.createElement("option");
        opt.value = d;
        opt.textContent = destOptions[d];
        sel.appendChild(opt);
      });
    }

    cards.forEach(function (card) {
      var d = card.getAttribute("data-destination");
      var label = card.querySelector(".course-loc").textContent.split("\u00b7")[0].trim();
      destOptions[d] = label;
    });

    buildDestinationOptions();

    function apply() {
      var r = region.value;
      var d = dest.value;
      var visible = 0;
      cards.forEach(function (card) {
        var show = (!r || card.getAttribute("data-region") === r) &&
                   (!d || card.getAttribute("data-destination") === d);
        card.style.display = show ? "" : "none";
        if (show) visible++;
      });
      if (count) count.textContent = visible + " course" + (visible === 1 ? "" : "s");
      if (empty) empty.classList.toggle("hidden", visible > 0);
    }

    region.addEventListener("change", apply);
    dest.addEventListener("change", apply);
    apply();
  }
})();