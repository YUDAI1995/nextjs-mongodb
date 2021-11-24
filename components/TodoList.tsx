import axios from "axios";
import FetchTodoData from "../data/FetchTodoData";
import { Todo } from "../model/todo.model";

const TodoList = () => {
  // Data Fetch with SWR
  const { data, loading, error, mutate } = FetchTodoData();
  const onDeleteHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => {
    event.preventDefault();

    axios
      .delete(`/api/data/${id}`, {
        data: { id: id },
      })
      .then((response) => {
        //onsole.log(`deleted: ${response}`);
        mutate();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <>
      {loading ? (
        <div className="w-full h-full rounded-xl transform  transition-transformtext-white relative flex items-center justify-center">
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      ) : error ? (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
        >
          <strong className="font-bold">Sorry, </strong>
          <span className="block sm:inline">Error.</span>
        </div>
      ) : (
        <ul className="list-disc list-inside">
          {(data! as Todo[]).map((item) => (
            <li
              key={item.id}
              className="relative flex items-center min-h-20 my-2 pr-20"
            >
              <span className="text-xs">● </span>
              {item.title}
              <button
                className="absolute top-1/2 right-0 -mt-6 text-4xl font-bold text-white bg-red-400 rounded-sm py-0 px-2 hover:bg-red-600 transition-colors"
                onClick={(event) => onDeleteHandler(event, item.id)}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default TodoList;
