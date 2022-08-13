import React, { useState, useEffect, useRef } from 'react';

export const Event = ({ eventDetail, onClick }) => {
    const [list, setList] = useState(['Item 1','Item 2','Item 3']);
    
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
      <div onClick={onClick} >

        {
            list && list.map((item, index) => (
            <div className = "Event"
                onDragStart={(e) => dragStart(e, index)}
                onDragEnter={(e) => dragEnter(e, index)}
                onDragEnd={drop}
                key={index}
                draggable>
                {item}
            </div>
            ))}

      </div>
    );
  };