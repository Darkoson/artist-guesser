import React, { FC} from "react";
import styled from "styled-components";

import correctImg from "../correct.gif";
import wrongImg from "../wrong.gif";

interface FeedbackProps {
  status: boolean;
  show: boolean;
}
const Feedback: FC<FeedbackProps> = (props) => {
  

  // useEffect(() => {
  //   setShow(true);
  //   setTimeout(() => setShow(false), 1000);
  // }, [props.attempt]);

  return (
    <FeedbackContainer>
      {props.show && (
        <div className="feedback">
          {props.status && <img src={correctImg} alt="Correct feedback" />}
          {!props.status && <img src={wrongImg} alt="Wrong feedback" />}
        </div>
      )}
    </FeedbackContainer>
  );
};

export default Feedback;

const FeedbackContainer = styled.div`
  width: 60px;
  display: flex;
  flex-direction: column;
  .feedback {
    width: 30px;
    img {
      width: 30px;
      height: 22px;
    }
  }
`;
