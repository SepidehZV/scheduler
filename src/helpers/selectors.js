export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  
  const selectedDay = state.days.filter(el => el.name === day)[0];
  if (!selectedDay) {
    return [];
  }
  const AppointmentsID = selectedDay.appointments;
  const appointmentsList = AppointmentsID.map(app => state.appointments[app.toString()]);
  return appointmentsList;
};