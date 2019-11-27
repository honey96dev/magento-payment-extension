import React, {Fragment} from "react";

import NewsListItem from "./partial/NewsListItem";

export default ({items, detailLabel, detailLink, handleDelete}) => {
  const count = items.length - 1;

  return (
    <div className={"text-left mt-3"}>
      {items.map((item, index) => (
        <Fragment key={item.id}>
          <NewsListItem id={item.id} date={item.date} time={item.time} author={`${item.firstName} ${item.lastName}`} title={item.title} description={item.description} detailLabel={detailLabel} detailLink={detailLink} handleDelete={handleDelete} />
          {index < count && <hr className="my-5"/>}
        </Fragment>
      ))}
    </div>
  );
};

