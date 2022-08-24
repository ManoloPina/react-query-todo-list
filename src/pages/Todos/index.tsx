import React, { useMemo } from "react";
import { useTodos } from "hooks";
//Styles
import * as S from "./styles";
//Components
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { AddCircleRounded } from "@mui/icons-material";
import Skeleton from "@mui/material/Skeleton";
import Pagination from "@mui/material/Pagination";
import { List } from "./List";

interface Props {}

const Todos: React.FC<Props> = () => {
  const {
    todos,
    count,
    isLoadingTodos,
    state: { description },
    handlers,
  } = useTodos();
  //handlers
  return (
    <S.TodoContainer>
      <S.Title>Todos</S.Title>
      <S.ListContainer elevation={3}>
        <TextField
          fullWidth
          label="Add Todo"
          variant="standard"
          value={description}
          onKeyDown={handlers.handleKeyDown}
          onChange={handlers.handleDescriptionChange}
          InputProps={{
            startAdornment: (
              <IconButton
                size="large"
                color="primary"
                onClick={handlers.handleAddTodoClick}
              >
                <AddCircleRounded />
              </IconButton>
            ),
          }}
        />
        {!!isLoadingTodos &&
          [...new Array(6)].map(() => (
            <Skeleton variant="rounded" height="1.6rem" animation="pulse" />
          ))}
        {!!todos && todos?.data.length > 0 && !isLoadingTodos && (
          <List todos={todos.data} />
        )}
        <Pagination count={count - 1} onChange={handlers.handlePageChange} />
      </S.ListContainer>
    </S.TodoContainer>
  );
};

export { Todos };
