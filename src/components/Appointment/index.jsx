import React from "react";


import "./styles.scss";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";

//importing custom hook!
import useVisualMode from "../../hooks/useVisualMode";


export default function Appointment(props) {
  //defining diff modes 
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
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
  function deleteAppointment () {
    transition(DELETING);
    //transition(EMPTY)
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
  }
  return (
    <article className="appointment">
      <Header time={props.time} />
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            id={props.id}
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onDelete={() => transition(CONFIRM)}
            onEdit={() => transition(EDIT)}
          />
        )}
        {mode === CREATE && <Form name={props.name} interviewers={props.interviewers}
          onSave={ save } onCancel={() => back()}/>}
        {mode === SAVING && <Status message={"Saving"}/>}
        {mode === DELETING && <Status message={"Deleting"}/>}
        {mode === CONFIRM && <Confirm message={"Are you sure you would like to delete?"}
          id={props.id}
          onCancel={() => back()}
          onConfirm={deleteAppointment}
        />}
        {mode === EDIT && <Form Form name={props.interview.student} interviewers={props.interviewers}
          interviewer={props.interview.interviewer.id} onSave={ save } onCancel={() => back()}/>}
    </article>
  );
}