import React from "react";
import style from "./DisplayTable.module.css";
const DisplayTable = ({ list, text }) => {
  return (
    <table className={style.DisplayTable}>
      {list
        ? list.map((eq) => (
            <tr>
              <td>{eq[text]}</td>
            </tr>
          ))
        : null}
    </table>
  );
};

export default DisplayTable;
