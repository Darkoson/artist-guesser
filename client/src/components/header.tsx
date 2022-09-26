import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectStoreSettings } from "../shared/store/game-slice";

/** This is the component that displays
 *  the scores and Rounds of the game
 *
 */
const Header = () => {
  let { scores, round, endGame } = useSelector(selectStoreSettings);

  return (
    <HeaderContainer>
      <h2 className="app-title"> Guess The Artist </h2>
      {!endGame && (
        <header>
          <h3 className="round">
            Round: <span className="rounds"> {round}</span>
          </h3>
          <h3 className="scores">
            Total Scores: <span className="points">{scores}</span>
          </h3>
        </header>
      )}
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  .app-title {
    text-align: center;
    font-weight: 1000;
    color: red;
    margin-bottom: 20px;
  }
  .points {
    padding: 2px 20px;
    background-color: #0c046c;
    color: white;
    font-size: 18px;
    border-radius: 8px;
  }
  .rounds {
    padding: 2px 20px;
    background-color: #6e0546;
    color: white;
    font-size: 18px;
    border-radius: 8px;
  }
  header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;
