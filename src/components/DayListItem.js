import React from "react";

import "components/DayListItem.scss";
import classNames from "classnames";

function DayListItem({selected, spots, name, setDay}) {
  
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": spots === 0
  });

  const formatSpots = () => {
    if (spots === 0) {
      return "no spots remaining";
    }
    if (spots === 1) {
      return "1 spot remaining";
    }
    if (spots > 1){
      return `${spots} spots remaining`;
    }
  }

  return (
    <li data-testid="day" className={dayClass} onClick={() => setDay(name)}>
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
};

export default DayListItem;
