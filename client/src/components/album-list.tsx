import React, { FC } from "react";
import styled from "styled-components";
import { Album } from "../interfaces";

interface AlbumListProps {
  albums: Album[];
  attempt: number;
}
const AlbumList: FC<AlbumListProps> = (props) => {
  return (
    <AlbumListContainer>
      <h4>Some Albums of the Artist</h4>
      <div className="albums">
        {props.albums.map(
          (album, idx) =>
            props.attempt >= idx && (
              <div key={album.id} className="album">
                <span>{idx + 1}</span>
                <div className="album-name"> {album.name}</div>
              </div>
            )
        )}
      </div>
    </AlbumListContainer>
  );
};

export default AlbumList;

const AlbumListContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 0.4px dashed lime;
  gap: 20px;

  .albums {
    display: flex;
    padding: 5px 10px;
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
        /* border: 1px solid black; */
        /* height: 30px; */
        justify-content: center;
        align-items: center;
        flex-grow: 1;
        text-overflow: clip;
      }
    }
  }
`;
