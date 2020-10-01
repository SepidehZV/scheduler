

export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  
  const selectedDay = state.days.find(el => el.name === day);
  if (!selectedDay) {
    return [];
  }
  const AppointmentsID = selectedDay.appointments;
  const appointmentsList = AppointmentsID.map(app => state.appointments[app.toString()]);
  return appointmentsList;
};

export function getInterview(state, interview) {

  if (interview) {
    const interviewer = {...state.interviewers[interview.interviewer.toString()]};
    //console.log({student: interview.student , interviewer});
    //console.log(interview);
    return {student: interview.student , interviewer};
  }
  return null;
}