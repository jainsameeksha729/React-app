import React, { Fragment } from "react";
import "./Card.scss";

const Card = (props) => {
  const containerClass = props.containerClass || "";
  return (
    <Fragment>
      <div className={`card ss_card_one hide_scrollbar ${containerClass}`}>
        <div className={`card-body p-0`}>{props.children}</div>
      </div>
    </Fragment>
  );
};
export default Card;
