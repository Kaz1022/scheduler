import React from "react";
import DayListItem from "./DayListItem";

function DayList({daysData, day, onChange}){

   const days = daysData.map(eachDay => {
    return (
      <DayListItem 
        key={eachDay.id}
        name={eachDay.name}
        spots={eachDay.spots}
        selected={eachDay.name === day}
        setDay={onChange}
        />
    
    );
  })

  return (
    <ul>{days}</ul>
  );
};

export default DayList;