

export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  
  const selectedDay = state.days.find(el => el.name === day);
  if (!selectedDay) {
    return [];
  }
  const AppointmentsID = selectedDay.appointments;
  const appointmentsList = AppointmentsID.map(app => state.appointments[app]);
  return appointmentsList;
};

export function getInterview(state, interview) {

  if (interview) {
    const interviewer = {...state.interviewers[interview.interviewer]};
    
    return {student: interview.student , interviewer};
  }
  return null;
};

export function getInterviewersForDay(state,day) {
  const selectedDay = state.days.find(el => el.name === day);
  if (!selectedDay) {
    return [];
  }
  const interviewersID = selectedDay.interviewers;
  const interviewersList = interviewersID.map(id => state.interviewers[id]);
  return interviewersList;
}