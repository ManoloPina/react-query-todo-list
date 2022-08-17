import React from "react";
//Styles
import * as S from "./styles";
//Components
import { TextField, IconButton } from "@mui/material";
import { HighlightOffRounded } from "@mui/icons-material";
//Types
import { ITodo } from "types/Todo";

interface Props {
  todos: ITodo[];
}

const List: React.FC<Props> = React.memo(({ todos }) => {
  return (
    <S.ListWrapper>
      {todos.map((todo) => (
        <TextField
          fullWidth
          key={todo._id}
          value={todo.description}
          InputProps={{
            endAdornment: (
              <IconButton>
                <HighlightOffRounded color="error" />
              </IconButton>
            ),
          }}
        />
      ))}
    </S.ListWrapper>
  );
});

export { List };
