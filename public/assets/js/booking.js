/* ============================================================
   Amatis — meeting booking calendar
   Fetches free time slots (/api/booking/slots), renders a date +
   time picker, and submits a booking (/api/booking) that returns a
   Google Meet link and emails an .ics invite.
   ============================================================ */
(function () {
  "use strict";

  var i18n = window.AMATIS_I18N;
  var root = document.getElementById("booking");
  if (!root) return;

  var state = {
    tz: "Asia/Tehran",
    durationMin: 60,
    days: [],
    selectedIndex: 0,
    selectedSlot: null,
  };

  function t(path) {
    var v = i18n && i18n.get ? i18n.get(i18n.current(), "connect.booking." + path) : null;
    return v != null ? v : path;
  }

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function fmtDate(dateStr) {
    var parts = dateStr.split("-");
    var d = new Date(Date.UTC(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2])));
    try {
      return d.toLocaleDateString(i18n.current() === "fa" ? "fa-IR" : i18n.current(), {
        weekday: "short",
        month: "short",
        day: "numeric",
        timeZone: "UTC",
      });
    } catch (e) {
      return dateStr;
    }
  }

  function loadSlots() {
    root.innerHTML =
      '<div class="booking-loading">' +
      '<div class="spinner"></div>' +
      '<p>' + esc(t("subtitle")) + "</p></div>";
    return fetch("/api/booking/slots", { cache: "no-store" })
      .then(function (r) {
        return r.json();
      })
      .then(function (json) {
        if (!json || !json.ok) throw new Error("bad");
        state.tz = json.data.tz;
        state.durationMin = json.data.durationMin;
        state.days = (json.data.days || []).filter(function (d) {
          return d.slots.some(function (s) {
            return s.status === "available";
          });
        });
        state.selectedIndex = 0;
        state.selectedSlot = null;
        renderStep("pick");
      })
      .catch(function () {
        root.innerHTML =
          '<div class="booking-error"><p>' + esc(t("noDates")) + "</p></div>";
      });
  }

  function renderStep(step) {
    if (step === "pick") renderPicker();
    else if (step === "confirm") renderConfirm();
    else if (step === "success") renderSuccess();
  }

  function renderPicker() {
    root.innerHTML =
      '<div class="booking-head"><h3>' + esc(t("title")) + "</h3>" +
      '<p>' + esc(t("subtitle")) + "</p></div>";
    if (!state.days.length) {
      root.innerHTML += '<p class="booking-none">' + esc(t("noDates")) + "</p>";
      return;
    }

    var day = state.days[state.selectedIndex];
    var datesHtml = state.days
      .map(function (d, i) {
        return (
          '<button type="button" class="bk-date' + (i === state.selectedIndex ? " active" : "") + '" data-idx="' + i + '">' +
          esc(fmtDate(d.date)) +
          "</button>"
        );
      })
      .join("");

    var avail = (day.slots || []).filter(function (s) {
      return s.status === "available";
    });
    var timesHtml;
    if (!avail.length) {
      timesHtml = '<p class="booking-none">' + esc(t("noTimes")) + "</p>";
    } else {
      timesHtml = avail
        .map(function (s) {
          return (
            '<button type="button" class="bk-time' + (state.selectedSlot && state.selectedSlot.id === s.id ? " active" : "") + '" data-id="' + esc(s.id) + '">' +
            esc(s.time) +
            "</button>"
          );
        })
        .join("");
    }

    var timePanel =
      '<div class="bk-col bk-times">' +
      '<span class="bk-label">' + esc(t("pickTime")) + "</span>" +
      '<div class="bk-times-grid">' + timesHtml + "</div>" +
      '<button type="button" class="btn-primary lg bk-continue" disabled>' + esc(t("bookBtn")) + "</button>" +
      "</div>";

    var wrapper = document.createElement("div");
    wrapper.className = "booking-panel";
    wrapper.innerHTML =
      '<div class="bk-row">' +
      '<div class="bk-col bk-dates">' +
      '<span class="bk-label">' + esc(t("pickDate")) + "</span>" +
      '<div class="bk-dates-list">' + datesHtml + "</div>" +
      "</div>" +
      timePanel +
      "</div>";
    root.appendChild(wrapper);

    root.querySelectorAll(".bk-date").forEach(function (b) {
      b.addEventListener("click", function () {
        state.selectedIndex = Number(b.getAttribute("data-idx"));
        state.selectedSlot = null;
        renderPicker();
      });
    });
    bindTimeButtons(root);
  }

  function bindTimeButtons(scope) {
    scope.querySelectorAll(".bk-time").forEach(function (b) {
      b.addEventListener("click", function () {
        var day = state.days[state.selectedIndex];
        var id = b.getAttribute("data-id");
        var found = (day.slots || []).find(function (s) {
          return s.id === id;
        });
        if (!found) return;
        state.selectedSlot = found;
        var btns = scope.querySelectorAll(".bk-time");
        btns.forEach(function (x) {
          x.classList.remove("active");
        });
        b.classList.add("active");
        var cont = scope.querySelector(".bk-continue");
        if (cont) cont.disabled = false;
      });
    });
    var cont = scope.querySelector(".bk-continue");
    if (cont) {
      cont.addEventListener("click", function () {
        if (state.selectedSlot) renderConfirm();
      });
    }
  }

  function renderConfirm() {
    var slot = state.selectedSlot;
    if (!slot) return renderPicker();
    var day = state.days[state.selectedIndex];
    var label = (day ? fmtDate(day.date) + " — " + slot.time : slot.time);
    root.innerHTML =
      '<div class="booking-head"><h3>' + esc(t("confirmTitle")) + "</h3></div>" +
      '<div class="booking-panel confirm">' +
      '<div class="bk-slot-summary">' +
      '<span class="bk-kicker">' + esc(t("confirmStep")) + "</span>" +
      '<strong>' + esc(label) + "</strong>" +
      "</div>" +
      '<form id="bk-form" class="bk-form">' +
      '<div class="field"><label for="bk-name">' + esc(t("formName")) + "</label>" +
      '<input id="bk-name" type="text" required maxlength="200"></div>' +
      '<div class="field"><label for="bk-email">' + esc(t("formEmail")) + "</label>" +
      '<input id="bk-email" type="email" required maxlength="200"></div>' +
      '<div class="field"><label for="bk-notes">' + esc(t("formNotes")) + "</label>" +
      '<textarea id="bk-notes" rows="3" maxlength="2000"></textarea></div>' +
      '<p class="bk-error" id="bk-error"></p>' +
      '<button class="btn-primary lg" type="submit" id="bk-submit">' + esc(t("submit")) + "</button>" +
      "</form>" +
      "</div>";

    document.getElementById("bk-form").addEventListener("submit", function (e) {
      e.preventDefault();
      submitBooking();
    });
  }

  function submitBooking() {
    var errEl = document.getElementById("bk-error");
    var btn = document.getElementById("bk-submit");
    errEl.textContent = "";
    btn.disabled = true;
    btn.textContent = t("submitting");

    fetch("/api/booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slotId: state.selectedSlot.id,
        name: document.getElementById("bk-name").value,
        email: document.getElementById("bk-email").value,
        notes: document.getElementById("bk-notes").value,
      }),
    })
      .then(function (r) {
        return r.json().catch(function () {
          return {};
        });
      })
      .then(function (json) {
        if (json && json.ok) {
          state.last = json.data;
          renderSuccess();
        } else {
          errEl.textContent = t(json && json.error === "slot_unavailable" ? "error" : "error");
        }
      })
      .catch(function () {
        errEl.textContent = t("error");
      })
      .finally(function () {
        btn.disabled = false;
        btn.textContent = t("submit");
      });
  }

  function renderSuccess() {
    var d = state.last;
    var link = d.meetLink;
    root.innerHTML =
      '<div class="booking-head booked-succ"><span class="bk-check">✓</span>' +
      "<h3>" + esc(t("successTitle")) + "</h3>" +
      "<p>" + esc(t("successText")) + " <strong>" + esc(d.email || "") + "</strong></p></div>" +
      '<div class="booking-panel success">' +
      '<div class="bk-slot-summary">' +
      (d.localTime && d.localDate ? "<strong>" + esc(fmtDate(d.localDate) + " — " + d.localTime) + "</strong>" : "") +
      "</div>" +
      '<div class="bk-meet"><span class="bk-label">' + esc(t("meetLink")) + "</span>" +
      '<a class="bk-meet-link" href="' + esc(link) + '" target="_blank" rel="noopener">' + esc(link) + "</a></div>" +
      '<p class="bk-hint">' + esc(t("addToCalendar")) + "</p>" +
      '<button type="button" class="btn-primary lg" id="bk-another">' + esc(t("bookBtn")) + "</button>" +
      "</div>";

    document.getElementById("bk-another").addEventListener("click", function () {
      state.selectedSlot = null;
      loadSlots();
    });
  }

  document.addEventListener("i18n:applied", function () {
    loadSlots();
  });

  loadSlots();
})();
