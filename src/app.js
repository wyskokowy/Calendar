import "./weather";
import "./clock";

import { Calendar } from "./calendar";
import { clickedDay } from "./clickedDay";
import { UICalendar } from "./uiCalendar";
import { Events } from "./events";
import { UIEvents } from "./uiEvent";
import { eventsSelectors, calendarSelectors } from "./selectors";
import { date } from "./date";
import { LSCtrl } from "./storage";

const App = (function() {
  function eventListeners() {
    /* Previous and Next month btns */
    calendarSelectors.prevMonth.addEventListener("click", previousMonth);
    calendarSelectors.nextMonth.addEventListener("click", nextMonth);
    /* Choose month and year */
    calendarSelectors.displayMonth.addEventListener(
      "click",
      UICalendar.changeMonthState
    );
    calendarSelectors.displayYear.addEventListener(
      "click",
      UICalendar.changeYearState
    );
    calendarSelectors.selectMonth.addEventListener("click", changeMonth);
    calendarSelectors.selectYear.addEventListener("click", changeYear);
    /* Set clicked day */
    calendarSelectors.tableBody.addEventListener("click", setClickedDay);
    /* Add/Edit event */
    eventsSelectors.saveBtn.addEventListener("click", submitAddEvent);
    eventsSelectors.addNewBtn.addEventListener("click", UIEvents.clickNewBtn);
    eventsSelectors.updateBtn.addEventListener("click", submitUpdateEvent);
    /* Single event buttons */
    eventsSelectors.dayEventsList.addEventListener("click", clickEditBtn);
    eventsSelectors.dayEventsList.addEventListener("click", removeEvent);
    /* Back to current date */
    calendarSelectors.monthAndYear.addEventListener("click", backToToday);
  }

  function render(month, year) {
    Calendar.renderCalendar(month, year);
    UIEvents.showEventsDate();
    UIEvents.showEvents();
  }

  function submitAddEvent() {
    const input = UIEvents.getInputsValue();
    Events.addEvent(input.title, input.text, input.date);
    UIEvents.showEvents();
  }

  function clickEditBtn(e) {
    if (e.target.classList.contains("btn-edit")) {
      const event = Events.eventsArr().find(
        event => event.id === e.target.id
      );
      UIEvents.btnEditEvent(event);
      Events.setCurrentItem(event);
    }
  }

  function submitUpdateEvent() {
    Events.updateEvent();
    UIEvents.showEvents();
  }

  function removeEvent(e) {
    if (e.target.classList.contains("btn-delete")) {
      const event = Events.eventsArr().find(
        event => event.id === e.target.id
      );
      Events.removeEvent(event.id);
      LSCtrl.set("events", Events.eventsArr());
    }
    if (clickedDay.cell !== null)
      clickedDay.cell.classList.remove("bg-info");
    UIEvents.showEvents();
  }

  function setClickedDay(e) {
    clickedDay.setClickedDay(e);
    UIEvents.showEventsDate();
    UIEvents.showEvents();
  }

  function previousMonth() {
    UICalendar.previousMonth();
    render(date.selectedMonth(), date.selectedYear());
  }
  function nextMonth() {
    UICalendar.nextMonth();
    render(date.selectedMonth(), date.selectedYear());
  }

  function changeMonth(e) {
    UICalendar.changeMonth(e);
    render(date.selectedMonth(), date.selectedYear());
  }
  function changeYear(e) {
    UICalendar.changeYear(e);
    render(date.selectedMonth(), date.selectedYear());
  }

  function backToToday(e) {
    if (e.target.classList.contains("back-to-today")) {
      date.setYear(date.currentYear());
      date.setMonth(date.currentMonth());
      render(date.currentMonth(), date.currentYear());

      if (document.querySelector(".back-to-today")) {
      document.querySelector(".back-to-today").remove()
      }
    }
  }

  function init() {
    eventListeners();
    render(date.currentMonth(), date.currentYear());
  }

  return init();
})();
