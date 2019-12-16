import { date } from './date';

export const clickedDay = {
  /* Start with todays day */
  date: new Date(date.selectedYear(), date.selectedMonth(), date.today().getDate()),
  /* Container for clicked day */
  cell: null,
/* Convert number to 2-digit to match input value */
  month: function() {
    return this.date.getMonth() + 1 < 10
      ? `0${this.date.getMonth() + 1}`
      : this.date.getMonth() + 1;
  },
  day: function() {
    return this.date.getDate() < 10
      ? `0${this.date.getDate()}`
      : this.date.getDate();
  },
  setClickedDay: function(e) {
    const dayCell = e.target;

    if (dayCell.classList.contains("dayCell")) {
      clickedDay.date = new Date(
        date.selectedYear(),
        date.selectedMonth(),
        parseInt(dayCell.textContent)
      );

      if (dayCell.textContent != date.today().getDate())
        dayCell.classList.add("bg-light", "rounded", "text-dark");

      if (clickedDay.cell !== null)
        clickedDay.cell.classList.remove("bg-light", "text-dark");

      clickedDay.cell = dayCell;
    }
  }
};
