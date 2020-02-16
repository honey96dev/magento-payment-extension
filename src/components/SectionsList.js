import React, {Fragment, useEffect, useState} from "react";
import {MDBInput} from "mdbreact";
import {useTranslation} from "react-i18next";

import "./SectionsList.scss";


export default ({sections, initChecked, onUpdate}) => {
  const {t} = useTranslation();

  const [values, setValues] = useState({});

  useEffect(e => {
    if (initChecked instanceof Array) {
      let checked = {};
      for (let item of initChecked) {
        checked = Object.assign({}, checked, {[item]: true});
      }
      setValues(checked);
    }
  }, [initChecked]);

  const handleCheck = e => {
    setValues(e);

    let checkedIds = [];
    Object.keys(e).map(item => {
      if (!!e[item]) {
        checkedIds.push(item);
      }
    });
    !!onUpdate && onUpdate(checkedIds);
  };

  return (
    <Fragment>
      <h4>{t("NAVBAR.VIDEO.SECTIONS")}</h4>
      {sections.map((item, index) => (
        <div key={index} className="my-2">
          <MDBInput onClick={e => handleCheck(Object.assign({}, values, {[item.id]: !values[item.id]}))} checked={values[item.id] || false} label={item.section} type="checkbox" filled id={`checkbox${item.id}`} />
        </div>
      ))}
    </Fragment>
  )
}
