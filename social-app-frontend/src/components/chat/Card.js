import React from "react";
import "./card.scss";

const Card = (props) => {
  const handleCardClick = (e) => {
    props.setConversation(props.index);
  };
  return (
    <div className={`card ${props.active}`} onClick={handleCardClick}>
      <div className="avatar">
        <img src="/images/Ice_Bear.jpg" alt="" />
      </div>

      <div className="detail">
        <div className="name">
          <h3>{props.info.username}</h3>
          <p>4m</p>
        </div>

        <p className="message">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias
          mollitia modi perferendis tempore error autem adipisci numquam ea
          facilis esse exercitationem laborum, quos nemo at fugiat iste iure
          sequi? Eos.
        </p>
      </div>
    </div>
  );
};

export default Card;
