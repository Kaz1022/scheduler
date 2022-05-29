import React from "react";
import "components/Appointment/styles.scss";

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

function Appointment ({id, time, interview, interviewers}) {

  const { mode, transition, back } = useVisualMode(
      interview ? SHOW : EMPTY
    );  
  
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
        onSave={() => console.log("onSave")}
        onCancel={() => back()}
      />}
    </article>
  );
}

export default Appointment;