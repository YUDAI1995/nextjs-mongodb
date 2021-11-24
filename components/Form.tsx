import axios from "axios";
import React, { useRef } from "react";
import FetchTodoData from "../data/FetchTodoData";
import { getRandomID, Todo } from "../model/todo.model";

const Form: React.FC = () => {
  const { data, loading, error, mutate } = FetchTodoData();
  const inputRef = useRef<HTMLInputElement>(null);

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    const newTodo = new Todo(getRandomID(), inputRef.current!.value);
    axios
      .post("/api/data", newTodo)
      .then((res) => {
        mutate();
        inputRef.current!.value = "";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form
      className="flex justify-between w-full max-w-lg mx-auto"
      onSubmit={submitHandler}
    >
      <input
        type="text"
        className="w-full border border-gray-300 rounded-sm p-2"
        ref={inputRef}
      />
      <button
        type="submit"
        className="rounded-sm bg-blue-600 sm:ml-2 py-3 px-2 sm:px-10 text-sm text-white hover:bg-blue-400 transition-colors outline-none"
      >
        add
      </button>
    </form>
  );
};

export default Form;
