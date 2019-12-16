const { uuid } = require("uuidv4");
import { closeAllModals } from "./hideModal";
import { LSCtrl } from "./storage";
import { eventsSelectors } from "./selectors";

export const Events = (function() {
  /* Event skeleton */
  const Event = function(name, text, date) {
    this.id = uuid();
    this.name = name;
    this.date = date;
    this.text = text;
  };
  /* Load events from LocalStorage/DataBase */
  const allEvents = LSCtrl.get("events");

  /* Container for edited/removed event */
  let currentEvent = null;

  return {
    addEvent: function(title, text, date) {
      if (eventsSelectors.eventTitle.value === "") {
        alert("Please fill in Title field");
      } else {
        const first = new Event(title, text, date);
        allEvents.push(first);
        LSCtrl.set("events", allEvents);
        closeAllModals();
      }
    },
    removeEvent: function(id) {
      const index = allEvents.findIndex(event => event.id === id);
      if (index > -1) {
        allEvents.splice(index, 1);
      }
    },
    updateEvent: function() {
      const toUpdate = allEvents.find(e => e.id === currentEvent.id);

      toUpdate.name = eventsSelectors.eventTitle.value;
      toUpdate.date = eventsSelectors.eventDate.value;
      toUpdate.text = eventsSelectors.eventText.value;

      LSCtrl.set("events", allEvents);

      closeAllModals();
    },
    setCurrentItem: function(event) {
      currentEvent = event;
    },
    eventsArr: function() {
      return allEvents;
    }
  };
})();
