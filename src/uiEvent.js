import { eventsSelectors } from "./selectors";
import { Events } from "./events";
import { clickedDay } from "./clickedDay";
import { date } from "./date";

export const UIEvents = (function() {
  return {
    /* Display clicked day below 'Events' header */

    showEventsDate: function() {
      eventsSelectors.eventDay.innerHTML = clickedDay.date.toLocaleString(
        "en-GB",
        {
          weekday: "long",
          day: "2-digit"
        }
      );
    },
    /* Display list of events in clicked day */

    showEvents: function() {
      /* Clear events list */
      eventsSelectors.dayEventsList.innerHTML = "";

      /* Find and display events for clicked day */
      Events.eventsArr()
        .filter(e => {
          return (
            e.date ===
            `${date.selectedYear()}-${clickedDay.month()}-${clickedDay.day()}`
          );
        })
        .forEach(event => {
          UIEvents.generateEvents(event);
          if (
            event &&
            clickedDay.cell !== null &&
            !clickedDay.cell.classList.contains("bg-success")
          )
            clickedDay.cell.classList.add("bg-info");
        });
    },
    clickNewBtn: function() {
      /* Set modal to ADD NEW event */
      eventsSelectors.saveBtn.classList.remove("d-none");
      eventsSelectors.updateBtn.classList.remove("d-inline");
      eventsSelectors.eventTitle.value = "";
      eventsSelectors.eventText.value = "";

      /* Set date in form */
      eventsSelectors.eventDate.value = `${date.selectedYear()}-${clickedDay.month()}-${clickedDay.day()}`;
    },
    getInputsValue: function() {
      return {
        title: eventsSelectors.eventTitle.value,
        text: eventsSelectors.eventText.value,
        date: eventsSelectors.eventDate.value
      };
    },
    btnEditEvent: function(event) {
      /* Set modal to EDIT event */
      eventsSelectors.eventTitle.value = event.name;
      eventsSelectors.eventDate.value = event.date;
      eventsSelectors.eventText.value = event.text;
      eventsSelectors.saveBtn.classList.add("d-none");
      eventsSelectors.updateBtn.classList.add("d-inline");
    },
    generateEvents: function(event) {
      /* Create list item and append to DOM */
      const li = document.createElement("li");
      li.classList.add(
        "list-group-item",
        "list-group-item-action",
        "bg-dark",
        "text-info"
      );
      /* Header & buttons content wrapper */
      const div = document.createElement("div");
      div.classList.add("d-flex", "w-100", "justify-content-between");
      /* Event header */
      const h5 = document.createElement("h5");
      h5.classList.add("mb-1", "text-uppercase");
      h5.textContent = event.name;
      /* Buttons wrapper */
      const btnWrapper = document.createElement("div");
      /* Edit button */
      const editBtn = document.createElement("button");
      editBtn.classList.add(
        "btn-edit",
        "btn",
        "btn-sm",
        "btn-outline-success",
        "mr-1",
        "fas",
        "fa-edit"
      );
      editBtn.setAttribute("data-toggle", "modal");
      editBtn.setAttribute("data-target", "#eventModal");
      editBtn.setAttribute("id", event.id);
      /* Remove Button */
      const delBtn = document.createElement("button");
      delBtn.setAttribute("id", event.id);
      delBtn.classList.add(
        "btn-delete",
        "btn",
        "btn-sm",
        "btn-outline-danger",
        "fas",
        "fa-trash"
      );
      /* Append buttons to buttons wrapper */
      btnWrapper.appendChild(editBtn);
      btnWrapper.appendChild(delBtn);
      /* Append header & buttons to wrapper */
      div.appendChild(h5);
      div.appendChild(btnWrapper);
      /* Event text content */
      const p = document.createElement("p");
      p.classList.add("mb-1", "pl-2", "text-break", "text-wrap");
      p.textContent = event.text;
      /* Append all to item */
      li.appendChild(div);
      li.appendChild(p);
      /* Append item to list */
      document.querySelector(".list").appendChild(li);
    }
  };
})();
