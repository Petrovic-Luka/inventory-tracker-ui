import React from "react";
import style from "./DisplayTable.module.css";
const DisplayTable = ({ list, text }) => {
  if (list.length == 0) {
    return <></>;
  }
  return (
    <table className={style.DisplayTable}>
      <tbody>
        {list
          ? list.map((eq) => (
              <tr>
                <td>{eq[text]}</td>
              </tr>
            ))
          : null}
      </tbody>
    </table>
  );
};

export default DisplayTable;
