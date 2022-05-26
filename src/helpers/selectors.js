  // Find the correct day inside state.days and get appointments array
  // Using appointments array find corresponding appointments
  // From state.appointments return an array of the appointments

export function getAppointmentsForDay(state, day) {


  const found = state.days.find( eachDay => eachDay.name === day);
  
  if(!found) {
    return [];
  }

  const appointmentsArray = found.appointments.map( id => state.appointments[id]);
 
  return appointmentsArray;
}
