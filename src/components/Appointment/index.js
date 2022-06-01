import React from "react";
import "components/Appointment/styles.scss";

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "./Form";
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";

function Appointment ({id, time, interview, interviewers, bookInterview}) {

  const { mode, transition, back } = useVisualMode(
      interview ? SHOW : EMPTY
    );
    
    
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    // Transition to SHOW when the "promise returned by props.bookInterview resolves"
    // If there is not .then the value is null 
    bookInterview(id, interview)
    .then( () => transition(SHOW));
  }
  
  return (
    <article className="appointment">
      <Header time={time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && <Show 
        student={interview.student} 
        interviewer={interview.interviewer}
        onEdit={() => console.log("Clicked onEdit")}
        onDelete={()=> console.log("Clicked onDelete")}
        />}
      {mode === CREATE && <Form 
        interviewersData={interviewers}
        onSave={save}
        onCancel={() => back()}
      />}
      {mode === SAVING && <Status
        message="Saving"
      />}
    </article>
  );
}

export default Appointment;