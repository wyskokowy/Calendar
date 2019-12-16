export const date = (function() {
    const today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();
    let selectedMonth = currentMonth;
    let selectedYear = currentYear;
    
    return {
      today: () => today,
      currentMonth: () => currentMonth,
      currentYear: () => currentYear,
      selectedMonth: () => selectedMonth,
      selectedYear: () => selectedYear,
      setYear: (newYear) => selectedYear = newYear,
      setMonth: (newMonth) => selectedMonth = newMonth,
    }
  })();