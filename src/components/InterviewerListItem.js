import React from "react";

import "components/InterviewerListItem.scss"
import classNames from "classnames";


function InterviewerListItem ({id, name, avatar, selected, setInterviewer}) {

  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": selected
  });

  return (
    <li className={interviewerClass} onClick={() => setInterviewer(id)}>
      <img
        className="interviewers__item-image"
        src="https://i.imgur.com/LpaY82x.png"
        alt="Sylvia Palmer"
      />
      Sylvia Palmer
    </li>
  );
}

export default InterviewerListItem;
