import React, { useEffect, useState } from 'react';

export const useDate = (allEvents, nav) => {
  const [dateDisplay, setDateDisplay] = useState('');
  const [days, setDays] = useState([]);

  // Finds the event for a date
  const eventForDate = date => allEvents.filter(e => e.date === date);

  // Tracks changes to events or nav and does the code inside
  useEffect(() => {
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dt = new Date();

    // Nav is a variable that tracks what month is being displayed. 0 is the current month.
    // 1 is the next. -1 is the previous
    if (nav !== 0) {
      // Changes the month of the date to be the current date + the nav (+/- month)
      dt.setMonth(new Date().getMonth() + nav);
    }

    // Otherwise, the current date are put towards day, month, and year
    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();

    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
      weekday: 'long',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });

    // Puts the date in state
    setDateDisplay(`${dt.toLocaleDateString('en-us', { month: 'long' })} ${year}`);
    const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

    const daysArr = [];

    for (let i = 1; i <= paddingDays + daysInMonth; i++) {
      const dayString = `${month + 1}/${i - paddingDays}/${year}`;

      // Check if we've processed all of the padding days. Pushes a day object with the properties 
      // value
      // event
      // isCurrentDay
      // date
      if (i > paddingDays) {
        daysArr.push({
          value: i - paddingDays,
          events: eventForDate(dayString),
          isCurrentDay: i - paddingDays === day && nav === 0,
          date: dayString,
        });
      } else {
        daysArr.push({
          value: 'padding',
          events: null,
          isCurrentDay: false,
          date: '',
        });
      }
    }

    // updates the days property in state
    setDays(daysArr);
  }, [allEvents, nav]);

  return {
    days,
    dateDisplay,
  };
};
