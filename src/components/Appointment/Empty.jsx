import React from 'react';
// this component is shown when there is no interview booked
export default function Empty(props) {

  return (
    <main className="appointment__add">
      <img
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
        onClick= {props.onAdd}
      />
    </main>
  );
};