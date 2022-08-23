import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchAllTodos, addTodo, removeTdo, updateTodoById } from "api/todos";
import { useHttp } from "hooks";
import { useSnackbar } from "notistack";
//Types
import { ITodo, ITodos } from "types/Todo";
import { QUERY_KEYS } from "constants";
import { useCallback, useRef, useState } from "react";

export const useTodos = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const {
    handlers: { handleError },
  } = useHttp();
  //states
  const [description, setDescription] = useState("");
  const [limit, setLimit] = useState(5);
  const [skip, setSkip] = useState(1);
  const itemsEls = useRef([]);
  //mutations
  const { mutate: _addTodo } = useMutation(addTodo, {
    onSuccess: (_todo) => {
      setDescription("");
      queryClient.invalidateQueries([QUERY_KEYS.TODOS, QUERY_KEYS.TODOS_COUNT]);
      enqueueSnackbar("New task added!", {
        variant: "success",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
    },
  });

  const { mutate: removeTodoMutate } = useMutation(removeTdo, {
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.TODOS, QUERY_KEYS.TODOS_COUNT]);
    },
  });

  const { mutate: updateTodoMutation } = useMutation(updateTodoById, {
    onSuccess: (res) => {
      const {
        data: { completed },
      } = res;
      queryClient.invalidateQueries([QUERY_KEYS.TODOS, QUERY_KEYS.TODOS_COUNT]);
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

  const handlePageChange = useCallback(
    (_e: React.ChangeEvent<unknown>, page: number) => setSkip(page),
    [skip]
  );

  const handleUpdateTodoDescription =
    (todo: ITodo) =>
    (_e: any): void => {
      console.log({ todo });
      // updateTodoMutation(todo);
    };

  //queries
  const { data: todos } = useQuery([QUERY_KEYS.TODOS, limit, skip], () =>
    fetchAllTodos({ limit, skip })
  );

  const {
    data: { count },
  } = useQuery([QUERY_KEYS.TODOS_COUNT], () => fetchAllTodos(), {
    initialData: {
      count: 0,
      data: [],
    } as ITodos,
  });

  return {
    todos,
    count,
    itemsEls,
    state: { description, limit, skip },
    handlers: {
      handleKeyDown,
      handlePageChange,
      handleAddTodoClick,
      handleDescriptionChange,
      handleRemoveTodoBtnClick,
      handleToggleTodoCompletion,
      handleUpdateTodoDescription,
    },
  };
};
