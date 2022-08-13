import React from 'react';
import { Event } from '../Event';

export const Day = ({ day, onClick }) => {
  const className = `day ${day.value === 'padding' ? 'padding' : ''} ${day.isCurrentDay ? 'currentDay' : ''}`;
  
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

      {day.event && <Event
        
        
        
      />}


    </div>
  );
};
