import React from "react";
import Menu from "./Menu";
import style from "./ErrorMessage.module.css";
const ErrorMessage = () => {
  return (
    <div className={style.LoadFailed}>
      <Menu></Menu>
      <div className={style.LoadFailedContainer}>
        Connection to server failed
      </div>
    </div>
  );
};

export default ErrorMessage;
