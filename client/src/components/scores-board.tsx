import React, { FC } from "react";
import styled from "styled-components";
import { GameResult } from "../interfaces";

type ScoresBoardProps = {
  list: GameResult[];
};
const ScoresBoard: FC<ScoresBoardProps> = (props) => {
  return (
    <ScoresBoardContainer>
      <h3> Scores of Players | {props.list.length}</h3>
      <div className="list">
        <div className="row">
          <span> Username</span>
          <span> Round</span>
          <span> Scores</span>
        </div>

        {props.list.length > 0 ? (
          props.list.map((result: GameResult, idx: number) => (
            <div className="row" key={idx}>
              <div>{result.username}</div>
              <div> {result.roundsCompleted}</div>
              <div> {result.scores}</div>
            </div>
          ))
        ) : (
          <div className="empty"> No Result ! </div>
        )}
      </div>
    </ScoresBoardContainer>
  );
};

const ScoresBoardContainer = styled.div`
  position: relative;
  button {
    max-width: 200px;
    right: 20px;
    position: absolute;
    padding: 10px;
    border-radius: 10px;
    align-self: flex-end;
    border: none;
    &:hover {
      cursor: pointer;
      background-color: red;
      color: white;
    }
  }
  .list {
    margin-top: 50px;
    width: 100%;

    .row {
      display: grid;
      grid-template-columns: 3fr 3fr 1.5fr;
      margin-top: 10px;
      padding-bottom: 10px;
      border-bottom: 0.5px dashed gray;
    }
  }
  .empty {
    text-align: center;
  }
`;

export default ScoresBoard;
