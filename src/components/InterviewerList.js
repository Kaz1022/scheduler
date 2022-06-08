import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";
import PropTypes from "prop-types";

function InterviewerList ({interviewersData, onChange, value}) {
  const interviewers = interviewersData.map(eachInterviewer => {
    return (
      <InterviewerListItem 
        key={eachInterviewer.id}
        name={eachInterviewer.name}
        avatar={eachInterviewer.avatar}
        selected={eachInterviewer.id === value}
        setInterviewer={() => onChange(eachInterviewer.id)} 
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

InterviewerList.propTypes = {
  interviewersData: PropTypes.array.isRequired
}

export default InterviewerList;