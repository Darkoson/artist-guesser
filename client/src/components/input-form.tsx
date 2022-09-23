import React, { FC, useRef, useState } from "react";
import styled from "styled-components";
import { Artist } from "../interfaces";

interface InputFormProps {
  emit: (found: boolean) => void;
  artist: Artist;
  attempt: number;
  artwork: string;
}

const InputForm: FC<InputFormProps> = (props) => {
  const inputEl = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [showHint, setShowHint] = useState(true);
  const points = [5, 3, 1];

  const checkName = () => {
    let userGuess: string = inputEl.current.value.toLowerCase().trim();
    let actualName: string = props.artist.name.toLowerCase().trim();
    inputEl.current.value = "";
    props.emit(userGuess === actualName);
  };

  return (
    <Container>
      <div className="form">
        <div className="question">
          For <span>{points[props.attempt]}</span> Points <br /> Who is the
          artist ?
        </div>

        <div className="user-input">
          <input type="text" placeholder="Enter Full name" ref={inputEl} />
          <button onClick={checkName}> Submit</button>
        </div>

        {props.attempt === 2 && (
          <div className="hint">
            <span onClick={() => setShowHint(!showHint)}>See Hint:</span>
            {showHint && (
              <div className="artwork">
                <img src={props.artwork} alt="the artwork of the artist" />
                <span> Album artwork </span>
              </div>
            )}
          </div>
        )}
      </div>
    </Container>
  );
};

export default InputForm;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  .form {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
  .hint {
    display: flex;
    flex-direction: row;
    gap: 20px;

    span:hover {
      cursor: pointer;
    }

    .artwork {
      width: 100px;
      height: 100px;
      background-color: #4d1212a0;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      position: relative;

      img {
        width: 100%;
      }
      span {
        position: absolute;
        font-size: xx-small;
        padding: 5px 10px;
        background-color: rgba(255, 255, 255, 0.5);
      }
    }
  }
`;
