import { date } from "./date";
import { calendarSelectors } from "./selectors";

export const UICalendar = (function() {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  return {
    displayMonthAndYear: function(month, year) {
      calendarSelectors.displayMonth.innerHTML = `${months[month]}`;
      calendarSelectors.displayYear.innerHTML = `${year}`;
    },
    displayBackToDateBtn: function() {
      if (!document.querySelector(".back-to-today")) {
        const btn = document.createElement("button");
        btn.classList.add("back-to-today", "btn", "btn-outline-primary", "btn-sm", "mt-1");
        const icon = document.createElement("i");
        icon.classList.add("fas", "fa-undo-alt", "back-to-today");
        btn.appendChild(icon);
        calendarSelectors.monthAndYear.insertBefore(
          btn,
          calendarSelectors.displayMonth
        );
      }
    },
    changeState: function(type) {
      if (type === "table") {
        calendarSelectors.table.classList.remove("d-none");
        calendarSelectors.selectMonth.classList.remove("d-flex");
        calendarSelectors.divYear.classList.remove("d-block");
      }
      if (type === "month") {
        calendarSelectors.table.classList.add("d-none");
        calendarSelectors.selectMonth.classList.add("d-flex");
        calendarSelectors.divYear.classList.remove("d-block");
      }
      if (type === "year") {
        calendarSelectors.table.classList.add("d-none");
        calendarSelectors.selectMonth.classList.remove("d-flex");
        calendarSelectors.divYear.classList.add("d-block");
      }
    },
    changeMonthState: function() {
      calendarSelectors.selectMonth.innerHTML = "";
      UICalendar.changeState("month");
      months.forEach(month => {
        const btn = document.createElement("button");
        btn.textContent = month;
        btn.classList.add("btn", "btn-outline-primary", "btn-month");
        btn.setAttribute("data-month", month);
        calendarSelectors.selectMonth.appendChild(btn);
      });
    },
    changeMonth: function(e) {
      if (e.target.classList.contains("btn-month")) {
        date.setMonth(months.indexOf(e.target.dataset.month));
        UICalendar.changeState("table");
      }
    },
    changeYearState: function() {
      UICalendar.changeState("year");
      for (let i = 1970; i < 2071; i++) {
        const option = document.createElement("option");
        option.setAttribute("value", i);
        option.classList.add("select");
        if (parseInt(option.value) === date.selectedYear()) {
          option.setAttribute("selected", true);
        }
        option.textContent = i;
        calendarSelectors.selectYear.appendChild(option);
      }
    },
    changeYear: function(e) {
      if (e.target.classList.contains("select")) {
        date.setYear(parseInt(selectYear.value));
        UICalendar.changeState("table");
      }
    },
    previousMonth: function() {
      const newYear =
        date.selectedMonth() === 0
          ? date.selectedYear() - 1
          : date.selectedYear();
      const newMonth =
        date.selectedMonth() === 0 ? 11 : date.selectedMonth() - 1;
      date.setYear(newYear);
      date.setMonth(newMonth);
    },
    nextMonth: function() {
      const newYear =
        date.selectedMonth() === 11
          ? date.selectedYear() + 1
          : date.selectedYear();
      const newMonth =
        date.selectedMonth() === 11 ? 0 : date.selectedMonth() + 1;
      date.setYear(newYear);
      date.setMonth(newMonth);
    }
  };
})();
