import React from "react";

const ComboBox = ({ list, id, value, text, setValue }) => {
  return (
    <select
      onChange={(e) => {
        setValue(e.target.value);
        console.log(e.target.value);
      }}
    >
      {list
        ? list.map((eq) => (
            <option key={eq[id]} value={eq[value]}>
              {eq[text]}
            </option>
          ))
        : null}
    </select>
  );
};

export default ComboBox;
