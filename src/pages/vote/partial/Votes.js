import React, {Fragment} from "react";

import EndedVote from "./EndedVote";

import "./Votes.scss";

export default ({items, onUpdate}) => {

  const count = items.length - 1;
  return (
    <Fragment>
      {items.map((item, index) => (
        <div key={index}>
          <EndedVote data={item}/>
          {index < count && <hr className="my-5"/>}
        </div>
      ))}
    </Fragment>
  )
};
