import React, { FC } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectStoreSettings } from "../shared/store/game-slice";

interface HeaderProps {
  round: number;
  scores: number;
}

const Header: FC<HeaderProps> = (props) => {
  let { scores, round } = useSelector(selectStoreSettings);

  console.log('inside header: round: ', round , "scores: ", scores);
  
  return (
    <HeaderContainer>
      <h2 className="app-title"> Guess The Artist </h2>
      <header>
        <h3 className="round">Round: {round} </h3>
        <h3 className="scores">
          Total Scores: <span>{scores}</span>
        </h3>
      </header>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  .app-title {
    text-align: center;
    font-weight: 1000;
    color: red;
  }
  header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;
