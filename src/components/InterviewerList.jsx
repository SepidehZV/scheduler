import React from "react";
import PropTypes from 'prop-types'

import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";


function InterviewerList(props) {

  const interviewersArray = props.interviewers.map(
    interviewer => <InterviewerListItem key={interviewer.id} name={interviewer.name} avatar={interviewer.avatar}
      setInterviewer={ event => props.onChange(interviewer.id)} 
      selected={props.value === interviewer.id}/>
  );

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewersArray} </ul>
    </section>
  );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList;
