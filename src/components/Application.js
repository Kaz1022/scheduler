import React, {useState, useEffect} from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const setDay = day => setState({...state, day});

  useEffect(() => {
    const daysURL=`http://localhost:8001/api/days`;
    axios.get(daysURL).then(response => {
      setState(prev => ({ ...prev, days: response.data }));
    })
  }, []);

  const appointmentsArray = Object.values(state.appointments).map((appointment)=> {
    return (
    <Appointment key={appointment.id} {...appointment} />
    );
  })

  return (
    <main className="layout">
      <section className="sidebar">
        <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList
          daysData={state.days}
          value={state.day}
          onChange={setDay}
        />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentsArray}
        <Appointment key="last" time="5pm"/>
      </section>
    </main>
  );
}
