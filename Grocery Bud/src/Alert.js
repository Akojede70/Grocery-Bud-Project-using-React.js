import React, { useEffect } from "react";
const Alert = ({ type, msg, removeAlert, list }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      // sets up a timer using the setTimeout
      removeAlert();
      // remove alert is equal to show alert i.e. it will show the alert
    }, 5000);
    return () => clearTimeout(timeout);
    //It also returns a function that will clear the timer when the component is unmounted.
  }, [list]);
  // In this case, the effect will only run when the list prop changes.
  return <p className={`alert alert-${type}`}>{msg}</p>;
  // the first alert is in css
  // and the alert type success or danger i.e. the color
  //  and the message
};

export default Alert;
