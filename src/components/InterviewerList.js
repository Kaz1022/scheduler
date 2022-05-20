import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";

function InterviewerList ({interviewersData, setInterviewer, interviewer}) {
  const interviewers = interviewersData.map(eachInterviewer => {
    return (
      <InterviewerListItem 
        key={eachInterviewer.id}
        name={eachInterviewer.name}
        avatar={eachInterviewer.avatar}
        selected={eachInterviewer.id === interviewer}
        setInterviewer={() => setInterviewer(eachInterviewer.id)} 
      />
    );
  })

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  );
}

export default InterviewerList;