import {useEffect, useState} from 'react';
import axios from "axios";
import { getSpotsForDay } from "helpers/selectors";

export default function useApplicationData () {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({...state, day});

  const updateSpots = function(state, appointments) {
    // Get the day Object
    const dayObj = state.days.find(day => day.name === state.day);
    const spots = getSpotsForDay(dayObj, appointments);

    const day = {...dayObj, spots};

    const newDays = state.days.map(d => d.name === state.day ? day : d);

    return newDays;
  }

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


  function bookInterview (id, interview) {
    // console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    // Make the request to the app id ednpoints, with the interview data in the body,
    return (
      axios.put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then( () => {
        const days = updateSpots(state, appointments);
        setState({...state, appointments, days})})
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
      .then( () => {
        const days = updateSpots(state, appointments);
        setState({...state, appointments, days})})
      );
  }

  return {state, setDay, bookInterview, cancelInterview}
}
