import React, { useState, useEffect, useRef } from 'react';
import { CalendarHeader } from '../CalendarHeader';
import { Day } from '../Day';
import { NewEventModal } from '../NewEventModal';
import { DeleteEventModal } from '../DeleteEventModal';
import { useDate } from '../hooks/useDate';

export const App = () => {
  const [nav, setNav] = useState(0);
  const [clicked, setClicked] = useState();
  const [allEvents, setEvents] = useState(
    localStorage.getItem('allEvents') ? 
      JSON.parse(localStorage.getItem('allEvents')) : 
      []
  );

  const eventForDate = date => allEvents.filter(e => e.date === date);

  useEffect(() => {
    localStorage.setItem('allEvents', JSON.stringify(allEvents));
  }, [allEvents]);

  const { days, dateDisplay } = useDate(allEvents, nav);

  return(
    <>
      <div id="container">
        <CalendarHeader 
          dateDisplay={dateDisplay}
          onNext={() => setNav(nav + 1)}
          onBack={() => setNav(nav - 1)}
        />

        <div id="weekdays">
          <div>Sunday</div>
          <div>Monday</div>
          <div>Tuesday</div>
          <div>Wednesday</div>
          <div>Thursday</div>
          <div>Friday</div>
          <div>Saturday</div>
        </div>

        <div id="calendar">
          {days.map((d, index) => (
            <Day
              key={index}
              day={d}
              onClick={() => {
                if (d.value !== 'padding') {
                  setClicked(d.date);
                }
              }}
            />
          ))}
        </div>
      </div>

      {
        clicked &&
        <NewEventModal
          onClose={() => setClicked(null)}
          onSave={title => {
            setEvents([ ...allEvents, { title, date: clicked, time: "8AM"}]);
            setClicked(null);
          }}
        />
      }

      {/* {
        clicked && eventForDate(clicked) &&
        <DeleteEventModal 
          eventText={eventForDate(clicked).title}
          onClose={() => setClicked(null)}
          onDelete={() => {
            setEvents(allEvents.filter(e => e.date !== clicked));
            setClicked(null);
          }}
        />
      } */}
    </>
  );
};
