import { useState, useEffect } from 'react';
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  

  const setDay = day => setState({ ...state, day });

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
  };
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

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}