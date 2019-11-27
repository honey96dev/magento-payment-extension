import React, {Fragment} from "react";

import VideoListItem from "./partial/VideoListItem";

export default ({items, detailLabel, detailLink, handleDelete}) => {
  const count = items.length - 1;

  return (
    <div className={"text-left mt-3"}>
      {items.map((item, index) => (
        <Fragment key={item.id}>
          <VideoListItem id={item.id} date={item.date} time={item.time} author={`${item.firstName} ${item.lastName}`} url={item.url} title={item.title} isFile={item.isFile} description={item.description} detailLabel={detailLabel} detailLink={detailLink} handleDelete={handleDelete} />
          {index < count && <hr className="my-5"/>}
        </Fragment>
      ))}
    </div>
  );
};

