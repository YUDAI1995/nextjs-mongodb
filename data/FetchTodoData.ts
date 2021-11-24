import useSWR from "swr";
import { todoFetcher } from "../lib/todoFetcher";

const FetchTodoData = () => {
  const { data, mutate, error } = useSWR("/api/data", todoFetcher);

  return {
    data: data,
    loading: !data && !error,
    error: error,
    mutate,
  };
};

export default FetchTodoData;
