import React from "react";
import style from "./Menu.module.css";
const Menu = () => {
  return (
    <div className={style.mainMeni}>
      <div className={style.meni_container}>
        <div className={style.meni_item}>
          <a href="/">Home</a>
        </div>
        <div className={style.meni_item}>
          <a href="/#/Equipment">Add equipment</a>
          {/* <HashLink to="/Radionice">Radionice</HashLink> */}
        </div>

        <div className={style.meni_item}>
          <a href="/#/CreateBorrow">Borrow </a>
        </div>
        <div className={style.meni_item}>
          <a href="/#/ReturnBorrow">Return Borrow </a>
        </div>
        <div className={style.meni_item}>
          <a href="/#/EquipmentHistory">History </a>
        </div>
        <div className={style.meni_item}>
          <a href="/#/Employee">Employees </a>
        </div>
      </div>
    </div>
  );
};

export default Menu;
