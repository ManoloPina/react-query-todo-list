import React from "react";
import { useTodos } from "hooks";
//Styles
import * as S from "./styles";
//Components
import { TextField, IconButton } from "@mui/material";
import { HighlightOffRounded, SaveRounded } from "@mui/icons-material";
//Types
import { ITodo } from "types/Todo";

interface Props {
  todos: ITodo[];
}

const List: React.FC<Props> = React.memo(({ todos }) => {
  const {
    handlers: { handleRemoveTodoBtnClick },
  } = useTodos();
  return (
    <S.ListWrapper>
      {todos.map((todo) => (
        <TextField
          fullWidth
          key={todo._id}
          onChange={(e: any) => {
            console.log("value:", e.target.value);
          }}
          defaultValue={todo.description}
          InputProps={{
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
