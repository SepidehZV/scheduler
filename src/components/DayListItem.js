import React from "react";

import classnames from 'classnames';

import "components/DayListItem.scss";

export default function DayListItem(props) {
  const clickHandler = () => props.setDay(props.name);
  const dayClass = classnames("day-list__item", {"day-list__item--selected":props.selected, "day-list__item--full":props.spots === 0})
  const formatSpots = () => {
    if (!props.spots) {
      return "no spots remaining";
    } else if (props.spots === 1) {
      return "1 spot remaining";
    } else {
      return `${props.spots} spots remaining`;
    }
  };
  
  return (
    <li onClick={clickHandler} className={dayClass}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}