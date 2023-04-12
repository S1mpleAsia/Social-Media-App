import React from "react";
import "./card.scss";

const Card = (props) => {
  return (
    <div className={`card ${props.active}`}>
      <div className="avatar">
        <img
          src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-6/340102593_1671418876634272_7202750476793864828_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=a6vk0A7zczIAX_lDWnn&_nc_ht=scontent.fhan2-5.fna&oh=00_AfCmQPL2g1z2Mf0wgQEB0SYYB1MqG0I8zlscmWhaD1T5IQ&oe=6439A89F"
          alt=""
        />
      </div>

      <div className="detail">
        <div className="name">
          <h3>Harry Maguire</h3>
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
