import React, {useState, useEffect} from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";

import { getAppointmentsForDay } from "helpers/selectors";

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviwers: {}
  });

  const setDay = day => setState({...state, day});

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  useEffect(() => {
    const daysURL=`http://localhost:8001/api/days`;
    const appointmentsURL=`http://localhost:8001/api/appointments`;
    const interviewersURL=`http://localhost:8001/api/interviewers`;

    Promise.all([
      axios.get(daysURL),
      axios.get(appointmentsURL),
      axios.get(interviewersURL)
    ]).then( response => {
      // console.log(all[0]); first
      // console.log(all[1]); second
      // console.log(all[2]); third
      setState(prev => ({...prev, days: response[0].data, appointments: response[1].data, interviwers: response[2].data }));
    })
  }, []);

  const appointmentsArray = dailyAppointments.map((appointment)=> {
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
