import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Create.css";

const Create = () => {
  const [task, setTask] = useState("");
  const [message, setMessage] = useState("");

  const handleAdd = () => {
    axios
      .post("http://localhost:8080/add", { task: task })
      .then((result) => {
        console.log(result);
        setMessage("Task added successfully!");
        setTask("");
        axios
          .get("http://localhost:8080/get")
          .then((result) => {
            setTodo(result.data);
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => {
        console.error(err);
        setMessage("Error adding task. Please try again.");
      });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Task"
        value={task}
        onChange={(e) => {
          setTask(e.target.value);
        }}
      />
      <button type="button" onClick={handleAdd}>
        Add
      </button>
      <p>{message}</p> {}
    </div>
  );
};

export default Create;
