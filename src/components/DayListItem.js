import React from "react";

export default function DayListItem(props) {
  const clickHandler = () => props.setDay(props.name);
  return (
    <li onClick={clickHandler} >
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{props.spots}</h3>
    </li>
  );
}