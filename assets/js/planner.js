(function () {
  "use strict";

  var DATA = {
    "Hanoi": {
      label: "Hanoi & Northern Vietnam",
      courses: [
        { name: "Long Bien Golf Course", dist: "15–20 min from the city", style: "Parkland" },
        { name: "BRG Kings Island Golf Resort", dist: "45–55 min from the city", style: "Lakeside & parkland" },
        { name: "Sky Lake Golf & Resort", dist: "45–60 min from the city", style: "Lake resort" },
        { name: "Stone Highland Golf & Resort", dist: "80–90 min from the city", style: "Mountain" },
        { name: "Thanh Lanh Valley Golf & Resort", dist: "75–90 min from the city", style: "Valley championship" }
      ],
      airport: "Noi Bai International (HAN)",
      hotels: { "3 star": 45, "4 star": 75, "5 star": 120 },
      pace: "Hanoi courses can book out on weekends — lock tee times before you book hotels."
    },
    "Da Nang": {
      label: "Da Nang & Central Coast",
      courses: [
        { name: "Montgomerie Links Vietnam", dist: "15–20 min from airport", style: "Coastal links" },
        { name: "Ba Na Hills Golf Club", dist: "25–30 min from airport", style: "Mountain" },
        { name: "BRG Legend Da Nang Golf Resort", dist: "20 min from airport", style: "Dunes links" },
        { name: "Hoiana Shores Golf Club", dist: "45 min from airport", style: "Coastal links" },
        { name: "Laguna Lang Co Golf Course", dist: "60 min from airport", style: "Resort (Faldo)" }
      ],
      airport: "Da Nang International (DAD)",
      hotels: { "3 star": 55, "4 star": 90, "5 star": 150 },
      pace: "Central coast courses pair well — Montgomerie + BRG Legend are 2 minutes apart for a 36-hole day."
    },
    "Ho Chi Minh City": {
      label: "Ho Chi Minh City & South",
      courses: [
        { name: "Tan Son Nhat Golf Course", dist: "15–25 min from District 1", style: "Parkland" },
        { name: "Vietnam Golf & Country Club", dist: "30–45 min from District 1", style: "36-hole parkland" },
        { name: "Long Thanh Golf Resort", dist: "45–60 min from District 1", style: "Valley & lake" },
        { name: "Song Be Golf Resort", dist: "40–55 min from District 1", style: "Riverside parkland" },
        { name: "Twin Doves Golf Club", dist: "45–60 min from District 1", style: "Parkland" }
      ],
      airport: "Tan Son Nhat International (SGN)",
      hotels: { "3 star": 40, "4 star": 70, "5 star": 130 },
      pace: "Leave before 07:00 for morning tee times — traffic to southern courses builds quickly."
    },
    "Nha Trang": {
      label: "Nha Trang & Cam Ranh",
      courses: [
        { name: "KN Golf Links Cam Ranh", dist: "25 min from Cam Ranh airport", style: "Links (Top 100)" },
        { name: "Diamond Bay Golf Club", dist: "30 min from Nha Trang", style: "Coastal resort" }
      ],
      airport: "Cam Ranh International (CXR)",
      hotels: { "3 star": 45, "4 star": 80, "5 star": 140 },
      pace: "Combine golf with beach days — Cam Ranh courses are 30–40 minutes from most beachfront resorts."
    },
    "Phu Quoc": {
      label: "Phu Quoc",
      courses: [
        { name: "Eschuri Vung Bau Golf Course", dist: "On the island", style: "Coastal jungle" }
      ],
      airport: "Phu Quoc International (PQC)",
      hotels: { "3 star": 70, "4 star": 110, "5 star": 200 },
      pace: "A single 18-hole layout — Phu Quoc is better as a stay-and-play break than a multi-round golf week."
    }
  };

  var els = {
    dest: document.getElementById("pl-dest"),
    players: document.getElementById("pl-players"),
    days: document.getElementById("pl-days"),
    rounds: document.getElementById("pl-rounds"),
    hotel: document.getElementById("pl-hotel"),
    build: document.getElementById("pl-build"),
    output: document.getElementById("pl-output"),
    itinerary: document.getElementById("pl-itinerary"),
    stats: document.getElementById("pl-stats"),
    summary: document.getElementById("pl-summary")
  };

  function roundName(i) {
    return "Round " + (i + 1);
  }

  function build() {
    var d = DATA[els.dest.value];
    if (!d) return;

    var players = parseInt(els.players.value, 10) || 2;
    var days = parseInt(els.days.value, 10) || 3;
    var rounds = parseInt(els.rounds.value, 10) || 2;
    var hotel = els.hotel.value;
    var perNight = d.hotels[hotel] || 0;
    var nights = days - 1;

    var items = [];
    items.push({ day: 1, text: "Arrival — " + d.airport + ", transfer to hotel, evening practice or city time" });

    var roundIdx = 0;
    var courseIdx = 0;
    for (var day = 2; day <= days; day++) {
      var dayItems = [];
      var remaining = rounds - roundIdx;
      if (remaining > 0) {
        var c = d.courses[courseIdx % d.courses.length];
        dayItems.push("Golf — " + c.name + " (" + c.style + " · " + c.dist + ")");
        roundIdx++;
        courseIdx++;
        if (remaining > 1 && day < days) {
          var c2 = d.courses[courseIdx % d.courses.length];
          dayItems.push("Golf — " + c2.name + " (" + c2.style + ")");
          roundIdx++;
          courseIdx++;
        }
      } else {
        dayItems.push("Free day — sightseeing, beach, or a second course of your choice");
      }
      items.push({ day: day, text: dayItems.join(" · ") });
    }

    if (rounds > roundIdx) {
      items[items.length - 1].text += " · " + roundName(roundIdx) + " (weather buffer)";
    }

    els.itinerary.innerHTML = items.map(function (it) {
      return '<li><span class="day">Day ' + it.day + '</span><span class="detail">' + it.text + "</span></li>";
    }).join("");

    var totalRounds = Math.min(rounds, roundIdx);
    els.stats.innerHTML =
      '<span class="stat">' + totalRounds + " rounds</span>" +
      '<span class="stat">' + players + " golfers</span>" +
      '<span class="stat">' + nights + " nights · " + hotel + "</span>" +
      '<span class="stat">est. hotel from $' + (perNight * nights) + "</span>";

    els.summary.textContent =
      d.label + " — " + days + " days, " + totalRounds + " rounds. " + d.pace;
    els.output.classList.remove("hidden");
  }

  if (els.build) {
    els.build.addEventListener("click", build);
  }
})();