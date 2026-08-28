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
    selectedIndex: -1,
    selectedSlot: null,
    view: { y: 1970, m: 1 },
    viewAnchor: Date.now(),
  };

  var BOOKINGS_LIMIT = 2;
  var BOOKINGS_KEY_MAP = "amatis_booked_map";

  function getBookingsMap() {
    try {
      return JSON.parse(window.localStorage.getItem(BOOKINGS_KEY_MAP) || "{}");
    } catch (e) {
      return {};
    }
  }

  function localBookCount(email) {
    var key = String(email || "").trim().toLowerCase();
    if (!key) return 0;
    var m = getBookingsMap();
    return m[key] ? m[key] : 0;
  }

  function recordLocalBooking(email) {
    var key = String(email || "").trim().toLowerCase();
    if (!key) return;
    var m = getBookingsMap();
    m[key] = (m[key] || 0) + 1;
    try {
      window.localStorage.setItem(BOOKINGS_KEY_MAP, JSON.stringify(m));
    } catch (e) {}
  }

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

  // ---- Calendar: locale/calendar aware month view ----
  var CAL_CODE = { en: "gregory", de: "gregory", fa: "persian", ar: "islamic-civil" };
  var CAL_LOCALE = { en: "en", de: "de-DE", fa: "fa-IR", ar: "ar-SA" };
  var WEEK_START = { en: 0, de: 1, fa: 6, ar: 6 }; // 0=Sun .. 6=Sat

  function calCode() {
    return CAL_CODE[i18n.current()] || "gregory";
  }
  function calLocale() {
    return CAL_LOCALE[i18n.current()] || "en";
  }
  function weekStart() {
    var v = WEEK_START[i18n.current()];
    return typeof v === "number" ? v : 0;
  }
  function calParts(date) {
    var fmt = new Intl.DateTimeFormat(calLocale(), {
      calendar: calCode(),
      numberingSystem: "latn",
      timeZone: "UTC",
      year: "numeric",
      month: "numeric",
      day: "numeric",
      weekday: "short",
    });
    var p = {};
    fmt.formatToParts(date).forEach(function (x) {
      p[x.type] = x.value;
    });
    return { y: Number(p.year), m: Number(p.month), d: Number(p.day), w: p.weekday };
  }
  function localizedDay(date) {
    return new Intl.DateTimeFormat(calLocale(), {
      calendar: calCode(),
      timeZone: "UTC",
      day: "numeric",
    }).format(date);
  }
  function calMonthKey(date) {
    var p = calParts(date);
    return p.y * 100 + p.m;
  }
  function shiftMonth(y, m, delta) {
    var t = y * 12 + (m - 1) + delta;
    return { y: Math.floor(t / 12), m: (t % 12) + 1 };
  }
  // Return gregorian timestamp (ms) of the first instant of calendar month (y,m).
  function monthStartGregorian(y, m, anchorMs) {
    var DAY = 86400000;
    var key = y * 100 + m;
    function k(ts) {
      return calMonthKey(new Date(ts));
    }
    var lo = anchorMs - 500 * DAY;
    var hi = anchorMs + 500 * DAY;
    while (k(lo) >= key) {
      hi = lo;
      lo -= 1000 * DAY;
    }
    while (k(hi) <= key) {
      hi += 1000 * DAY;
    }
    var a = lo,
      b = hi;
    while (a < b) {
      var mid = Math.floor((a + b) / 2);
      if (k(mid) >= key) b = mid;
      else a = mid + 1;
    }
    return a;
  }
  function weekdayNames(ws) {
    var base = Date.UTC(2026, 0, 4); // a Sunday
    var names = new Array(7);
    for (var i = 0; i < 7; i++) {
      var ts = new Date(base + i * 86400000);
      names[ts.getUTCDay()] = calParts(ts).w;
    }
    var ordered = [];
    for (var i = 0; i < 7; i++) ordered.push(names[(ws + i) % 7] || "");
    return ordered;
  }
  function monthYearTitle(date) {
    return new Intl.DateTimeFormat(calLocale(), {
      calendar: calCode(),
      timeZone: "UTC",
      year: "numeric",
      month: "long",
    }).format(date);
  }
  function gregKey(date) {
    return date.toISOString().slice(0, 10);
  }
  function renderCalendar() {
    var ws = weekStart();
    var key = state.view.y * 100 + state.view.m;
    var start = new Date(monthStartGregorian(state.view.y, state.view.m, state.viewAnchor));
    state.viewAnchor = start.getTime();
    var lead = (start.getUTCDay() - ws + 7) % 7;
    var count = 0;
    var cur = new Date(start.getTime());
    while (calMonthKey(cur) === key) {
      count++;
      cur = new Date(cur.getTime() + 86400000);
    }
    var dayIndex = {};
    for (var i = 0; i < state.days.length; i++) dayIndex[state.days[i].date] = i;

    var html =
      '<div class="bk-cal-head">' +
      '<button type="button" class="bk-cal-nav" data-nav="-1" aria-label="prev">\u2039</button>' +
      '<span class="bk-cal-title">' + esc(monthYearTitle(start)) + "</span>" +
      '<button type="button" class="bk-cal-nav" data-nav="1" aria-label="next">\u203a</button>' +
      "</div>";
    html +=
      '<div class="bk-cal-wdays">' +
      weekdayNames(ws)
        .map(function (n) {
          return "<span>" + esc(n) + "</span>";
        })
        .join("") +
      "</div>";
    html += '<div class="bk-cal-grid">';
    for (var k = 0; k < lead; k++) html += '<span class="bk-cal-blank"></span>';
    cur = new Date(start.getTime());
    for (var day = 0; day < count; day++) {
      var gk = gregKey(cur);
      if (Object.prototype.hasOwnProperty.call(dayIndex, gk)) {
        var idx = dayIndex[gk];
        var sel = idx === state.selectedIndex;
        html +=
          '<button type="button" class="bk-cal-day has-slot' + (sel ? " active" : "") + '" data-idx="' + idx + '">' +
          esc(localizedDay(cur)) +
          "</button>";
      } else {
        html +=
          '<span class="bk-cal-day muted"' + (cur.getTime() < Date.now() ? " data-past=\"1\"" : "") + ">" +
          esc(localizedDay(cur)) +
          "</span>";
      }
      cur = new Date(cur.getTime() + 86400000);
    }
    html += "</div>";
    return html;
  }

  // When navigating months, keep the selected day inside the visible month when possible.
  function keepSelectionInView() {
    var selDay = state.selectedIndex >= 0 ? state.days[state.selectedIndex] : null;
    if (selDay) {
      var sp = calParts(new Date(selDay.date + "T00:00:00Z"));
      if (sp.y === state.view.y && sp.m === state.view.m) return;
    }
    for (var i = 0; i < state.days.length; i++) {
      var dp = calParts(new Date(state.days[i].date + "T00:00:00Z"));
      if (dp.y === state.view.y && dp.m === state.view.m) {
        state.selectedIndex = i;
        state.selectedSlot = null;
        return;
      }
    }
    state.selectedIndex = -1;
    state.selectedSlot = null;
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
            return s.status === "available" || s.status === "booked";
          });
        });
        state.selectedSlot = null;
        if (state.days.length) {
          var first = new Date(state.days[0].date + "T00:00:00Z");
          var fp = calParts(first);
          state.view = { y: fp.y, m: fp.m };
          state.viewAnchor = first.getTime();
          state.selectedIndex = 0;
        } else {
          var now = new Date();
          var np = calParts(now);
          state.view = { y: np.y, m: np.m };
          state.viewAnchor = now.getTime();
          state.selectedIndex = -1;
        }
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

    var day = state.selectedIndex >= 0 ? state.days[state.selectedIndex] : null;
    var datesHtml = renderCalendar();

    var daySlots = (day ? day.slots : []).filter(function (s) {
      return s.status === "available" || s.status === "booked";
    });
    var hasAvail = daySlots.some(function (s) {
      return s.status === "available";
    });
    var timesHtml;
    if (!daySlots.length) {
      timesHtml = '<p class="booking-none">' + esc(t("noTimes")) + "</p>";
    } else if (!hasAvail) {
      timesHtml = daySlots
        .map(function (s) {
          return (
            '<button type="button" class="bk-time booked" disabled>' +
            esc(s.time) +
            '<span class="bk-booked-tag">' +
            esc(t("booked")) +
            "</span></button>"
          );
        })
        .join("");
    } else {
      timesHtml = daySlots
        .map(function (s) {
          if (s.status === "booked" || s.booked) {
            return (
              '<button type="button" class="bk-time booked" disabled title="' +
              esc(t("booked")) +
              '">' +
              esc(s.time) +
              '<span class="bk-booked-tag">' +
              esc(t("booked")) +
              "</span></button>"
            );
          }
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
      '<div class="bk-cal">' + datesHtml + "</div>" +
      "</div>" +
      timePanel +
      "</div>";
    root.appendChild(wrapper);

    root.querySelectorAll(".bk-cal-nav").forEach(function (b) {
      b.addEventListener("click", function () {
        var delta = Number(b.getAttribute("data-nav"));
        state.view = shiftMonth(state.view.y, state.view.m, delta);
        state.viewAnchor = state.viewAnchor;
        keepSelectionInView();
        renderPicker();
      });
    });
    root.querySelectorAll(".bk-cal-day.has-slot").forEach(function (b) {
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
      '<p class="bk-limit" id="bk-limit"></p>' +
      '<div class="field"><label for="bk-notes">' + esc(t("formNotes")) + "</label>" +
      '<textarea id="bk-notes" rows="3" maxlength="2000"></textarea></div>' +
      '<p class="bk-error" id="bk-error"></p>' +
      '<button class="btn-primary lg" type="submit" id="bk-submit">' + esc(t("submit")) + "</button>" +
      "</form>" +
      "</div>";

    var emailInput = document.getElementById("bk-email");
    emailInput.addEventListener("input", function () {
      checkLocalLimit();
    });

    document.getElementById("bk-form").addEventListener("submit", function (e) {
      e.preventDefault();
      submitBooking();
    });
  }

  function checkLocalLimit() {
    var limit = document.getElementById("bk-limit");
    var submit = document.getElementById("bk-submit");
    var email = document.getElementById("bk-email");
    if (!limit || !email) return;
    var count = localBookCount(email.value);
    var remaining = BOOKINGS_LIMIT - count;
    if (count >= BOOKINGS_LIMIT) {
      limit.textContent = t("limitReached");
      limit.classList.add("show");
      if (submit) submit.disabled = true;
    } else {
      limit.textContent = "";
      limit.classList.remove("show");
      if (submit) submit.disabled = false;
    }
    return count;
  }

  function submitBooking() {
    var errEl = document.getElementById("bk-error");
    var btn = document.getElementById("bk-submit");
    var name = document.getElementById("bk-name").value;
    var email = document.getElementById("bk-email").value;
    var notes = document.getElementById("bk-notes").value;
    errEl.textContent = "";

    var localCount = localBookCount(email);
    if (localCount >= BOOKINGS_LIMIT) {
      errEl.textContent = t("limitReached");
      return;
    }

    btn.disabled = true;
    btn.textContent = t("submitting");

    fetch("/api/booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slotId: state.selectedSlot.id,
        name: name,
        email: email,
        notes: notes,
      }),
    })
      .then(function (r) {
        return r.json().catch(function () {
          return {};
        });
      })
      .then(function (json) {
        if (json && json.ok) {
          recordLocalBooking(email);
          state.last = json.data;
          renderSuccess();
        } else if (json && json.error === "booking_limit") {
          errEl.textContent = t("limitReached");
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
    root.innerHTML =
      '<div class="booking-head booked-succ"><span class="bk-check">✓</span>' +
      "<h3>" + esc(t("successTitle")) + "</h3>" +
      "<p>" + esc(t("successText")) + " <strong>" + esc(d.email || "") + "</strong></p></div>" +
      '<div class="booking-panel success">' +
      '<div class="bk-slot-summary">' +
      (d.localTime && d.localDate ? "<strong>" + esc(fmtDate(d.localDate) + " — " + d.localTime) + "</strong>" : "") +
      "</div>" +
      '<p class="bk-hint">' + esc(t("addToCalendar")) + "</p>" +
      "</div>";
  }

  document.addEventListener("i18n:applied", function () {
    loadSlots();
  });

  loadSlots();
})();
