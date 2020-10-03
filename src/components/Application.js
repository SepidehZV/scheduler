import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment/index";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors";


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  

  const setDay = day => setState({ ...state, day });
  
  useEffect(() => {
    
    Promise.all([
      axios.get('api/days'),
      axios.get('api/appointments'),
      axios.get('api/interviewers')])
        .then((all) => {
          const [GET_DAYS, GET_APPOINTMENTS,GET_INTERVIEWERS] = all;
          // set your states here with the correct values...
          setState(prev => ({...prev, days: GET_DAYS.data,
            appointments: GET_APPOINTMENTS.data,
            interviewers: GET_INTERVIEWERS.data }));
        })
  },[]);

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  function bookInterview(id, interview) {
    //console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    //setState({...state, appointments});
    return axios.put(`/api/appointments/${id}`, appointment)
            .then((res) => setState(state => ({ ...state, appointments })));
  };
  
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`/api/appointments/${id}`, appointment)
            .then(() => setState(state => ({ ...state, appointments })));
  }
  
  const Schedule = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);
    const interviewers = getInterviewersForDay(state,state.day);
    return(<Appointment key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
      interviewers={interviewers}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview} />)
  });
  
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
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {Schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
