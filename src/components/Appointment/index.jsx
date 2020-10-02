import React from "react";


import "./styles.scss";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Form from "./Form";
import Status from "./Status";

//importing custom hook!
import useVisualMode from "../../hooks/useVisualMode";


export default function Appointment(props) {
  //defining diff modes 
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id,interview)
      .then(() => transition(SHOW));
    
  }
  return (
    <article className="appointment">
      <Header time={props.time} />
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
          />
        )}
        {mode === CREATE && <Form name={props.name} interviewers={props.interviewers}
          interviewer={3} onSave={ save } onCancel={() => back()}/>}
        {mode === SAVING && <Status message={"Saving"}/>}
    </article>
  );
}