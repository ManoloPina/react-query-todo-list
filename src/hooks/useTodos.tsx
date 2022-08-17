import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchAllTodos, addTodo } from "api/todos";
//Types
import { ITodos } from "types/Todo";
import { QUERY_KEYS } from "constants";
import { useCallback, useState } from "react";

export const useTodos = () => {
  const queryClient = useQueryClient();
  //states
  const [description, setDescription] = useState("");
  //mutations
  const { mutate: _addTodo } = useMutation(addTodo, {
    onSuccess: (_todo) => {
      queryClient.invalidateQueries([QUERY_KEYS.TODOS]);
    },
  });
  //handlers
  const handleDescriptionChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value),
    [description]
  );

  const handleAddTodoClick = (_e: any) => _addTodo({ description });
  //queries
  const { data: todos } = useQuery([QUERY_KEYS.TODOS], fetchAllTodos);
  return {
    todos,
    state: { description },
    handlers: { handleAddTodoClick, handleDescriptionChange },
  };
};
