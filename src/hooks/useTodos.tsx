import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchAllTodos, addTodo, removeTdo, updateTodoById } from "api/todos";
import { useHttp } from "hooks";
import { useSnackbar } from "notistack";
//Types
import { ITodo, ITodos } from "types/Todo";
import { QUERY_KEYS } from "constants";
import { useCallback, useState } from "react";

export const useTodos = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const {
    handlers: { handleError },
  } = useHttp();
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

  const { mutate: updateTodoMutation } = useMutation(updateTodoById, {
    onSuccess: (res) => {
      const {
        data: { completed },
      } = res;
      queryClient.invalidateQueries([QUERY_KEYS.TODOS]);
      enqueueSnackbar(`Task ${!!completed ? "completed!" : "uncompleted!"}`, {
        variant: "info",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
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

  const handleToggleTodoCompletion =
    (todo: ITodo) =>
    (_event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
      updateTodoMutation({ ...todo, completed: checked });
    };

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
      handleToggleTodoCompletion,
    },
  };
};
