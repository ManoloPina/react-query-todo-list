import React from "react";
import { useTodos } from "hooks";
//Styles
import * as S from "./styles";
//Components
import { TextField, IconButton, Checkbox } from "@mui/material";
import { HighlightOffRounded, SaveRounded } from "@mui/icons-material";
//Types
import { ITodo } from "types/Todo";

interface Props {
  todos: ITodo[];
}

const List: React.FC<Props> = React.memo(({ todos }) => {
  const {
    handlers: { handleRemoveTodoBtnClick, handleToggleTodoCompletion },
  } = useTodos();
  return (
    <S.ListWrapper>
      {todos.map((todo) => (
        <TextField
          fullWidth
          key={todo._id}
          variant="outlined"
          onChange={(e: any) => {
            console.log("value:", e.target.value);
          }}
          defaultValue={todo.description}
          InputProps={{
            startAdornment: (
              <Checkbox
                defaultChecked={!!todo.completed}
                onChange={handleToggleTodoCompletion(todo)}
              />
            ),
            endAdornment: (
              <S.ActionWrapper>
                <IconButton color="info">
                  <SaveRounded />
                </IconButton>
                <IconButton onClick={handleRemoveTodoBtnClick(todo._id)}>
                  <HighlightOffRounded color="error" />
                </IconButton>
              </S.ActionWrapper>
            ),
          }}
        />
      ))}
    </S.ListWrapper>
  );
});

export { List };
