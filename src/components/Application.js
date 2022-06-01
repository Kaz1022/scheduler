import React, {useState, useEffect} from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";

import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({...state, day});

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);
  
  function bookInterview (id, interview) {
    // console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // Make the request to the app id ednpoints, with the interview data in the body,
    return (
    axios.put(`http://localhost:8001/api/appointments/${id}`, { interview })
    .then( () => setState({...state, appointments}))
    );
  }

  function cancelInterview (id) {
    // console.log("appointment id >>>>", id)
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    return (
      axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => setState({...state, appointments})
      ));
  }
  
  const appointmentsArray = dailyAppointments.map( appointment => {

    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        {...appointment}
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview} 
        interviewers={dailyInterviewers}
        bookInterview={bookInterview} 
        cancelInterview={cancelInterview}
      />
    );
  });


  useEffect(() => {
    const daysURL=`http://localhost:8001/api/days`;
    const appointmentsURL=`http://localhost:8001/api/appointments`;
    const interviewersURL=`http://localhost:8001/api/interviewers`;

    Promise.all([
      axios.get(daysURL),
      axios.get(appointmentsURL),
      axios.get(interviewersURL)
    ]).then( response => {
      // console.log(response[0]); first
      // console.log(response[1]); second
      // console.log(response[2]); third
      setState(prev => ({...prev, days: response[0].data, appointments: response[1].data, interviewers: response[2].data }));
    })
  }, []);

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
