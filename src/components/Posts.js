import React, {Fragment} from "react";

import PostListItem from "./partial/PostListItem";

export default ({items, detailLabel, detailLink, handleAllow, handleDelete}) => {
  const count = items.length - 1;

  return (
    <div className={"text-left mt-3"}>
      {items.map((item, index) => (
        <Fragment key={item.id}>
          <PostListItem data={item} detailLabel={detailLabel} detailLink={detailLink} handleAllow={handleAllow} handleDelete={handleDelete} />
          {index < count && <hr className="my-5"/>}
        </Fragment>
      ))}
    </div>
  );
};

