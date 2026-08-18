(function () {
  "use strict";

  var lists = document.querySelectorAll("[data-checklist]");
  var progress = document.getElementById("check-progress");
  var printBtn = document.getElementById("check-print");

  function updateProgress() {
    if (!progress) return;
    var total = 0;
    var done = 0;
    document.querySelectorAll("[data-checklist] input[type=checkbox]").forEach(function (box) {
      total++;
      if (box.checked) done++;
    });
    progress.textContent = done + " / " + total + " complete";
  }

  lists.forEach(function (list) {
    list.addEventListener("change", function (e) {
      var box = e.target;
      if (box.type !== "checkbox") return;
      box.closest("li").classList.toggle("done", box.checked);
      updateProgress();
    });
  });

  if (printBtn) {
    printBtn.addEventListener("click", function () { window.print(); });
  }

  updateProgress();
})();