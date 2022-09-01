import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchAllTodos, addTodo, removeTdo, updateTodoById } from "api/todos";
import { useHttp } from "hooks";
import { useSnackbar } from "notistack";
//Types
import { ITodo, ITodos } from "types/Todo";
import { QUERY_KEYS } from "constants";
import { useCallback, useEffect, useRef, useState } from "react";

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
      queryClient.invalidateQueries([QUERY_KEYS.TODOS, limit, skip]);
      queryClient.invalidateQueries([QUERY_KEYS.TODOS_COUNT]);
      enqueueSnackbar("New task added!", {
        variant: "success",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
    },
  });

  const { mutate: removeTodoMutate } = useMutation(removeTdo, {
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.TODOS, limit, skip]);
      queryClient.invalidateQueries([QUERY_KEYS.TODOS_COUNT]);
    },
  });

  const { mutate: updateTodoMutation } = useMutation(updateTodoById, {
    onSuccess: (res) => {
      const {
        data: { completed },
      } = res;
      queryClient.invalidateQueries([QUERY_KEYS.TODOS, QUERY_KEYS.TODOS_COUNT]);
      enqueueSnackbar(`Task updated`, {
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

  const handleTodoDescriptionChange =
    (todo: ITodo) =>
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const value = e.target.value;
      const queryKey = [QUERY_KEYS.TODOS, limit, skip];
      const _todos: ITodos | undefined = queryClient.getQueryData(queryKey);
      const index = _todos?.data.findIndex((item) => item._id === todo._id);

      if (!!_todos && index !== undefined) {
        _todos.data[index].description = value;
        queryClient.setQueryData(queryKey, _todos);
      }
    };
  const handleTodoUpdateBtnClick = (todo: ITodo) => (_e: any) => {
    updateTodoMutation(todo);
  };

  useEffect(() => {
    queryClient.prefetchQuery([QUERY_KEYS.TODOS, limit, skip + 1], () =>
      fetchAllTodos({ limit, skip: skip + 1 })
    );
  }, [skip, limit]);

  //queries
  const { data: todos, isLoading: isLoadingTodos } = useQuery(
    [QUERY_KEYS.TODOS, limit, skip],
    () => fetchAllTodos({ limit, skip }),
    { refetchOnMount: false }
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
    isLoadingTodos,
    state: { description, limit, skip },
    handlers: {
      handleKeyDown,
      handlePageChange,
      handleAddTodoClick,
      handleDescriptionChange,
      handleRemoveTodoBtnClick,
      handleTodoUpdateBtnClick,
      handleToggleTodoCompletion,
      handleTodoDescriptionChange,
    },
  };
};
