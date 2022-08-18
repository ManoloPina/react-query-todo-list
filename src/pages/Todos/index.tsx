import React from "react";
import { useTodos } from "hooks";
//Styles
import * as S from "./styles";
//Components
import { TextField, IconButton } from "@mui/material";
import { AddCircleRounded } from "@mui/icons-material";
import { List } from "./List";

interface Props {}

const Todos: React.FC<Props> = () => {
  const {
    todos,
    state: { description },
    handlers,
  } = useTodos();
  return (
    <S.TodoContainer>
      <S.Title>Todos</S.Title>
      <TextField
        fullWidth
        label="Add Todo"
        variant="outlined"
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
      {!!todos && todos?.data.length > 0 && <List todos={todos.data} />}
    </S.TodoContainer>
  );
};

export { Todos };
