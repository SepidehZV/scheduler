import React from "react";

import classnames from 'classnames';

import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {

  const imgClass = classnames("interviewers__item-image",{"interviewers__item--selected-image":props.selected})
  const interviewerClass = classnames("interviewers__item", {"interviewers__item--selected": props.selected})
  
  return (
    <li onClick={props.setInterviewer} className={interviewerClass}>
      <img
        className={imgClass}
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}
