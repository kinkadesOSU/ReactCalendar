import React, { useRef } from 'react';
import { Events } from '../Events';

export const Day = ({ day, onClick }) => {
  const className = `day ${day.value === 'padding' ? 'padding' : ''} ${day.isCurrentDay ? 'currentDay' : ''}`;
  
  const dragItem = useRef();
  const dragOverItem = useRef();

  const dragStart = (e, position) => {
      dragItem.current = position;
      console.log(e.target.innerHTML);
    };
  
    const dragEnter = (e, position) => {
      dragOverItem.current = position;
      console.log(e.target.innerHTML);
    };

  const drop = (e) => {
      const copyListItems = [...list];
      const dragItemContent = copyListItems[dragItem.current];
      copyListItems.splice(dragItem.current, 1);
      copyListItems.splice(dragOverItem.current, 0, dragItemContent);
      dragItem.current = null;
      dragOverItem.current = null;
      setList(copyListItems);
    };
  
  return (
    <div onClick={onClick} className={className}>

      {/* Adds the date to real days, but ignores the padding days */}
      {day.value === 'padding' ? '' : day.value}

      {/* Adds a div with the event name to a day if an event exists */}
      {/* {day.event && <Event
        eventDetail = {day.event}
        draggable
        onDragStart={(e) => dragStart(e, index)}
        onDragEnter={(e) => dragEnter(e, index)}
        onClick={() => {
          alert("CLICKED");
          }
        }
      />} */}

      {day.events && <Events
        eventInfo = { day.events }
      
      />}


    </div>
  );
};