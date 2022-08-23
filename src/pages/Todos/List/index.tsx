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
      handleUpdateTodoDescription,
    },
  } = useTodos();
  return (
    <S.ListWrapper>
      {todos.map((todo, index: number) => (
        <TextField
          fullWidth
          key={todo._id}
          variant="outlined"
          defaultValue={todo.description}
          ref={(element) => itemsEls.current.push(element as never)}
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
                <IconButton color="info">
                  <SaveRounded
                    onClick={handleUpdateTodoDescription({
                      ...todo,
                      description: itemsEls.current[index],
                    })}
                  />
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
