import React from "react";
import "components/Appointment/styles.scss";

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";

function Appointment ({id, time, interview}) {
  return (
    <article className="appointment">
      <Header time={time}/>
      {interview ? <Show student={interview.student} interviewer={interview.interviewer}/> : <Empty />}
    </article>
  );
}

export default Appointment;