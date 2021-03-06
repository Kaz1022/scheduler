import React from "react";
import "components/Appointment/styles.scss";

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

function Appointment({ id, time, interview, interviewers, bookInterview, cancelInterview }) {

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
    bookInterview(id, interview)
    .then(() => transition(SHOW))
    .catch(error => transition(ERROR_SAVE, true));
  }

  function deleteInterview() {
    transition(DELETING, true);
    
    cancelInterview(id)
    .then(() => transition(EMPTY))
    .catch(error => transition(ERROR_DELETE, true));
  }
  
  return (
    <article className="appointment" data-testid="appointment">
      <Header time={time}/>
      {mode === EMPTY && <Empty 
        onAdd={() => transition(CREATE)} 
      />}
      {mode === SHOW && <Show 
        student={interview.student} 
        interviewer={interview.interviewer}
        onEdit={() => transition(EDIT)}
        onDelete={() => transition(CONFIRM)}
      />}
      {mode === CREATE && <Form 
        interviewersData={interviewers}
        onSave={save}
        onCancel={back}
      />}
      {mode === SAVING && <Status
        message="Saving"
      />}
      {mode === DELETING && <Status
        message="Deleting"
      />}
      {mode === CONFIRM && <Confirm
        message="Are you sure you would like to delete?"
        onConfirm={deleteInterview}
        onCancel={back}
      />}
      {mode === EDIT && <Form
        student={interview.student}
        interviewer={interview.interviewer.id} 
        interviewersData={interviewers}
        onSave={save}
        onCancel={back}
      />}
      {mode === ERROR_SAVE && <Error
        message="Cannot be saved."
        onClose={back}
      />}
      {mode === ERROR_DELETE && <Error
        message="Cannot be canceled."
        onClose={back}
      />}
    </article>
  );
}

export default Appointment;