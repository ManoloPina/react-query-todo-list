import React from "react";
import { useTodos } from "hooks";
//Styles
import * as S from "./styles";
//Components
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import { HighlightOffRounded, SaveRounded } from "@mui/icons-material";
//Types
import { ITodo } from "types/Todo";

interface Props {
  todos: ITodo[];
}

const List: React.FC<Props> = React.memo(({ todos }) => {
  const {
    itemsEls,
    handlers: {
      handleRemoveTodoBtnClick,
      handleToggleTodoCompletion,
      handleTodoDescriptionChange,
      handleTodoUpdateBtnClick,
    },
  } = useTodos();
  return (
    <S.ListWrapper>
      {todos.map((todo, index: number) => (
        <TextField
          fullWidth
          key={todo._id}
          variant="outlined"
          onChange={handleTodoDescriptionChange(todo)}
          defaultValue={todo.description}
          ref={(element: any) => itemsEls.current.push(element as never)}
          InputProps={{
            startAdornment: (
              <Checkbox
                color="success"
                defaultChecked={!!todo.completed}
                onChange={handleToggleTodoCompletion(todo)}
              />
            ),
            endAdornment: (
              <S.ActionWrapper>
                <IconButton>
                  <SaveRounded onClick={handleTodoUpdateBtnClick(todo)} />
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
