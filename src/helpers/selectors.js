// Find the correct day inside state.days and get appointments array
// Using appointments array find corresponding appointments
// From state.appointments return an array of the appointments

export function getAppointmentsForDay(state, day) {
  const found = state.days.find((eachDay) => eachDay.name === day);

  if (!found) {
    return [];
  }

  const appointmentsArray = found.appointments.map(
    (id) => state.appointments[id]
  );

  return appointmentsArray;
}

// return a new object containing the interview data
// when we pass it an object that contains the interviewer
// Otherwise, the function should return null.

export function getInterview(state, interview) {

  if (interview) {
    const interviewerId = interview.interviewer;

    // just update interviewer value with interveiwerId
    return { ...interview, interviewer: state.interviewers[interviewerId] };
  }

  return null;
}

export function getInterviewersForDay(state, day) {
  const found = state.days.find((eachDay) => eachDay.name === day);

  if (!found) {
    return [];
  }

  const InterviewersArray = found.interviewers.map(
    (id) => state.interviewers[id]
  );

  return InterviewersArray;
}

export function getSpotsForDay(day, appointments) {
  let spots = 0;

  // iterate the day's appointment ids
  for (const id of day.appointments) {
    const appointment = appointments[id];
    if (!appointment.interview) {
      spots++;
    }
  }
  return spots;
}
