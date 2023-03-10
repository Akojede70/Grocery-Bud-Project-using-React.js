import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

// when you refresh to make the content stay within
const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  // getItem in the list
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
    // json is parse to the local storage to get the item in the list
    // the key pair is list
  } else {
    return [];
  }
};
function App() {
  const [name, setName] = useState("");
  // the empty string is a falsy value
  const [list, setList] = useState(getLocalStorage());
  // at the getLocalStorage we have empty array [] before it was change to getLocalStorage
  // incase you reload the page so that your content will still stay in that is why we use getLocalStorage
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      // if the name variable is falsy, meaning it evaluates to false, 0, NAN, or Undefined
      showAlert(true, "danger", "please enter value");
      // if you refuse to enter anything and you click anything
      // it will show Please enter value in danger colour
    } else if (name && isEditing) {
      setList(
        // the setList they were array before it was change to getLocalStorage
        list.map((item) => {
          if (item.id === editID) {
            // the .id is very unique to Identify the empty array
            // if item.id i.e. the array that was empty is equal to editID which is null
            return { ...item, title: name };
            // The spread operator copies all of the properties from item into the new object(name).
            // This sets the title property of the new object(name) to the value of the name variable.
          }
          return item;
        })
      );
      setName("");
      // This is likely used to clear the input field or reset the name value to an empty
      // string after the user has submitted a form.
      setEditID(null);
      // This variable is likely used to keep track of the ID of an item being edited in a
      // list, and setting it to null indicates that there is no item currently being edited.
      setIsEditing(false);
      // This variable is likely used to determine whether the user is currently editing
      // an item in a list, and setting it to false indicates that the user is not
      // currently editing anything.
      showAlert(true, "success", "value changed");
      // the true indicate that the alert should be shown
      // the type of alert "success"
    } else {
      // show alert
      showAlert(true, "success", "item added to the list");
      const newItem = { id: new Date().getTime().toString(), title: name };
      // The value of the "id" property is a unique string generated using the current
      // timestamp, and the value of the "title" property is taken from the "name"
      // state variable. This creates a new item object with a unique ID and the title
      // that the user has entered.
      setList([...list, newItem]);
      // copying the array of the list to the newItem
      setName("");
      // This line of code sets the value of the "name" state variable to an empty
      // string. This is likely used to clear the input field or reset the name value
      // to an empty string after the user has submitted a form.
      // This ensures that the input field is ready for the user to enter a new item.
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };
  // In other words, if you call the function with no arguments, it will use the default values of "false",
  // an empty string, and an empty string for "show", "type", and "msg", respectively.

  const clearList = () => {
    showAlert(true, "danger", "empty list");
    setList([]);
  };

  const removeItem = (id) => {
    // id the specific item you want to remove
    showAlert(true, "danger", "item removed");
    setList(list.filter((item) => item.id !== id));
  };

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    // it ought to be array.find but we use list.find  list is an array t
    // to find the item that you want to edit
    setIsEditing(true);
    // setEditing was false and now is true because you are editing
    setEditID(id);
    setName(specificItem.title);
    // When the user selects an item to edit, the setName function is called with
    // the title of the selected item as its argument. This updates the state of
    // the "name" variable to the title of the selected item, causing the component
    // to re-render with the title displayed in an input field or other UI element
  };
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
    // The localStorage object provides a way to store data in the web browser
    // and retrieve it later. The setItem() method is used to set a key-value pair
    // in the localStorage object.
    // "list" is the key or name of the data that is being stored, and JSON.stringify(list) is the value that is being stored.
    // The JSON.stringify() method is used to convert the JavaScript object list
    // into a string. This is because localStorage can only store data as strings.
  }, [list]);
  // Anytime the key value chang we call th
  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} List={list} />}
        {/* where the alert will show & the alert is pass to thefile */}
        {/* This means that all the key-value pairs in the alert object will be passed in as props to the <Alert> component. */}
        <h3>grocery bud</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="e.g. eggs"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? "edit" : "submit"}
            {/* if editing is true edit but if you are not editing submit */}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} removeItem={removeItem} editItem={editItem} />
          {/* the function is what you are taking to the List file the items, removeItem, e.t.c */}
          <button className="clear-btn" onClick={clearList}>
            clear items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
