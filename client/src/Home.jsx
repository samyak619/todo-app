import React, { useState, useEffect } from "react";
import Create from "./Create";
import axios from "axios";
import { BsCircleFill, BsFillTrash3Fill } from "react-icons/bs";
import "./Home.css";
const Home = () => {
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/get")
      .then((result) => {
        setTodo(result.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleDel = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/delete/${id}`);
      setTodo(todo.filter((todoItem) => todoItem._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div>
      <h2>To Do</h2>
      <Create />
      {todo.length === 0 ? (
        <div>
          <h2>No To Do</h2>
        </div>
      ) : (
        todo.map((todoItem) => (
          <div className="task" key={todoItem._id}>
            <div className="check">
              <div>
                <p>{todoItem.task}</p>
              </div>
              <div
                className="delete-btn"
                onClick={() => handleDel(todoItem._id)}
              >
                <BsFillTrash3Fill />
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
