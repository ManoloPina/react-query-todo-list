import React from "react";
//Styles
import * as S from "./styles";

interface Props {}

const Profile: React.FC<Props> = React.memo(({}) => {
  return (
    <S.ProfileContainer>
      <S.Title>Profile</S.Title>
    </S.ProfileContainer>
  );
});

export { Profile };
