import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchAllTodos, addTodo, removeTdo } from "api/todos";
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

  const { mutate: removeTodoMutate } = useMutation(removeTdo, {
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.TODOS]);
    },
  });
  //handlers
  const handleDescriptionChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value),
    [description]
  );

  const handleAddTodoClick = (_e: any) => _addTodo({ description });

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      _addTodo({ description });
    }
  };

  const handleRemoveTodoBtnClick = (id: string) => (_e: any) =>
    removeTodoMutate(id);

  //queries
  const { data: todos } = useQuery([QUERY_KEYS.TODOS], fetchAllTodos);
  return {
    todos,
    state: { description },
    handlers: {
      handleKeyDown,
      handleAddTodoClick,
      handleDescriptionChange,
      handleRemoveTodoBtnClick,
    },
  };
};
