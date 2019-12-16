import { UICalendar } from "./uiCalendar";
import { Events } from "./events";
import { UIEvents } from "./uiEvent";
import { date } from "./date";
import { calendarSelectors } from "./selectors";

export const Calendar = (function() {
  return {
    renderCalendar: function(month, year) {
      /* Set First day of month */
      const firstDayOfMonth = new Date(year, month).getDay();

      /* Set number of days in month */
      function daysInMonth(month, year) {
        return 32 - new Date(year, month, 32).getDate();
      }

      /* Clear calendar before rendering new month */
      calendarSelectors.tableBody.innerHTML = "";

      /* Display current month over calendar */
      UICalendar.displayMonthAndYear(month, year);

      /* Display back to current month button */
      if (month !== date.currentMonth() || year !== date.currentYear()) {
        UICalendar.displayBackToDateBtn();
      } else {
        if (document.querySelector(".back-to-today")) {
          document.querySelector(".back-to-today").remove();
        }
      }

      /* Number of month with '0' if less than 10 to match input format */
      let twoDigitMonth =
        date.selectedMonth() + 1 < 10
          ? `0${date.selectedMonth() + 1}`
          : date.selectedMonth() + 1;
      /* Day number counter */
      let num = 1;
      for (let i = 0; i < 6; i++) {
        /* Create week */
        const weekRow = document.createElement("tr");
        for (let j = 0; j < 7; j++) {
          /* Day number counter with '0' if less than 10 to match input format */
          let dayOfMonth = num < 10 ? `0${num}` : num;
          /* Create day cell */
          const dayCell = document.createElement("td");
          /* Check first week and leave blank cells */
          if (i === 0 && j < firstDayOfMonth) {
            dayCell.textContent = "";
            weekRow.appendChild(dayCell);
          } else if (dayOfMonth > daysInMonth(month, year)) {
          /* Break loop after last day of month */
            break;
          } else {
          /* Fill day cell with data */
            dayCell.setAttribute(
              "data-date",
              `${date.selectedYear()}-${twoDigitMonth}-${dayOfMonth}`
            );
            dayCell.textContent = `${dayOfMonth}`;
            dayCell.classList.add("px-2", "dayCell");

            /* Check if day has got any event */
            Events.eventsArr()
              .filter(e => {
                return e.date === dayCell.dataset.date;
              })
              .forEach(event => {
                UIEvents.generateEvents(event);
                if (event)
                  dayCell.classList.add(
                    "bg-info",
                    "text-light",
                    "rounded"
                  );
              });

            /* Mark todays day */
            if (
              year === date.today().getFullYear() &&
              month === date.today().getMonth() &&
              dayOfMonth === date.today().getDate()
            ) {
              dayCell.classList.add("bg-success", "text-light", "rounded");
              dayCell.classList.remove("bg-info");
            }

            /* Append day to week */
            weekRow.appendChild(dayCell);
            /* Next day to generate */
            num++;
          }
        }

        /* Append week to calendar body */
        calendarSelectors.tableBody.appendChild(weekRow);
      }
    }
  };
})();
