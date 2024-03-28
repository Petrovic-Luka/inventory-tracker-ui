import React, { useState, useEffect } from "react";
import style from "./EquipmentHistory.module.css";
import { fetchData } from "../../functions";
import Menu from "../../components/Menu";
import ErrorMessage from "../../components/ErrorMessage";
import ComboBox from "../../components/ComboBox";
import DisplayTable from "../../components/DisplayTable";

const EquipmentHistoryPage = () => {
  const [equipmentTypes, setEquipmentTypes] = useState([]);
  const [equipmentTypeId, setEquipmentTypeId] = useState(1);
  const [equipment, setEquipment] = useState([]);
  const [equipmentId, setEquipmentId] = useState([]);
  const [borrows, SetBorrows] = useState([]);

  useEffect(() => {
    const fetchData2 = async () => {
      try {
        const postsData = await fetchData(
          "https://localhost:7274/EquipmentType"
        );
        setEquipmentTypes(postsData);
        const postsData2 = await fetchData("https://localhost:7274/Employee");
      } catch (err) {
        console.log(err);
      }
    };
    fetchData2();
  }, []);

  async function LoadEquipment() {
    const result = await fetchData(
      "https://localhost:7274/Equipment/type?typeId=" +
        equipmentTypeId +
        "&available=false"
    );
    setEquipment(result);
    console.log(result);
    try {
      setEquipmentId(result[0].equipmentId);
    } catch {
      alert("Data not found");
    }
  }

  async function LoadHistory() {
    const result = await fetchData(
      "https://localhost:7274/Borrow/Equipment?id=" +
        equipmentId +
        "&active=false"
    );
    SetBorrows(result);
    console.log("History ---------------------");
    console.log(result);
  }
  return (
    <div className={style.EquipmentHistoryPage}>
      <Menu></Menu>

      <div className={style.Container}>
        <label>Equipment type</label>
        <ComboBox
          setValue={setEquipmentTypeId}
          list={equipmentTypes}
          key={"equipmentTypeId"}
          value={"equipmentTypeId"}
          text={"name"}
        />
        <input
          type="button"
          value="Load equipment"
          onClick={LoadEquipment}
        ></input>
      </div>

      <div className={style.Container}>
        <label>Equipment</label>
        <ComboBox
          setValue={setEquipmentId}
          list={equipment}
          key={"equipmentId"}
          value={"equipmentId"}
          text={"displayString"}
        />
        <input type="button" value="Load History" onClick={LoadHistory}></input>
        <DisplayTable list={borrows} text={"displayString"} />
      </div>
    </div>
  );
};

export default EquipmentHistoryPage;