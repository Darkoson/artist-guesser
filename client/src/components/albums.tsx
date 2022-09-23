import React, { FC } from "react";
import styled from "styled-components";

const AlbumList: FC = () => {
  return (
    <Container>
      <h4>Albums of the Artist</h4>
      <div className="albums">
        <div className="album">
          <span>1</span> <div className="album-name"> Lorem, ipsum dolor.</div>
        </div>
        <div className="album">
          <span>1</span> <div className="album-name"> Lorem, ipsum dolor.</div>
        </div>
        <div className="album">
          <span>1</span> <div className="album-name"> Lorem, ipsum dolor.</div>
        </div>
      </div>
    </Container>
  );
};

export default AlbumList;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 0.4px dashed lime;
  gap: 30px;

  .albums {
    display: flex;
    flex-direction: column;
    gap: 20px;

    .album {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 20px;
      border: 0.5px dashed gray;

      span {
        background-color: red;
        border-radius: 50%;

        padding: 15px 20px;
      }
      .album-name {
        border: 1px solid black;
        height: 30px;
        justify-content: center;
        align-items: center;
        flex-grow: 1;
        text-overflow: clip;
      }
    }
  }
`;
