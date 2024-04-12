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
  const [equipmentId, setEquipmentId] = useState("");
  const [borrows, SetBorrows] = useState([]);
  const [connectionFailed, setConnectionFailed] = useState(false);
  const [status, setStatus] = useState(2);
  const [equipmentStatus, setEquipmentStatus] = useState(0);

  useEffect(() => {
    test();
  }, [equipmentId]);

  useEffect(() => {
    const fetchData2 = async () => {
      try {
        const postsData = await fetchData(
          "https://localhost:7274/EquipmentType"
        );
        setEquipmentTypes(postsData);
      } catch (err) {
        console.log(err);
        setConnectionFailed(true);
        alert(err);
      }
    };
    fetchData2();
  }, []);

  function test() {
    if (equipmentStatus == 0) {
      document.getElementById("wOff").className = style.invis;
      document.getElementById("exp").className = style.invis;
    }
    const index = equipment.find((x) => x.equipmentId === equipmentId);
    if (index === undefined) {
      console.log("Equipment was undefined");
      return;
    }
    setEquipmentStatus(index.status);
    console.log("Index");
    console.log(index);
    console.log(index.status);
    console.log("logs");
    if (index.status == 2) {
      document.getElementById("exp").className = style.invis;
    }
    if (index.status == 3) {
      document.getElementById("wOff").className = style.invis;
    }
  }

  async function LoadEquipment() {
    try {
      const result = await fetchData(
        "https://localhost:7274/Equipment/type?typeId=" +
          equipmentTypeId +
          "&available=false"
      );
      setEquipment(result);
      console.log(result);
      try {
        if (equipmentId === "") {
          setEquipmentId(result[0].equipmentId);
        } else {
          test();
        }
      } catch {
        alert("Data not found");
        return;
      }
    } catch (err) {
      alert(err.message);
    }
  }

  async function LoadHistory() {
    if (equipmentId === "") {
      alert("Please select equipment");
      return;
    }
    const result = await fetchData(
      "https://localhost:7274/Borrow/Equipment?id=" +
        equipmentId +
        "&active=false"
    );
    SetBorrows(result);
    console.log("History ---------------------");
    console.log(result);
  }

  async function ChangeStatus() {
    if (equipmentId === "") {
      alert("Please select equipment");
      return;
    }
    if (equipmentStatus === 1 || equipmentStatus === 3) {
      console.log(equipmentStatus);
      console.log(status);
      alert("Status change not posible");
      return;
    }
    if (equipmentStatus === 2 && status != 3) {
      alert("Status change not posible");
      return;
    }
    try {
      let temp = {
        equipmentId: equipmentId,
        status: status,
      };
      console.log(JSON.stringify(temp));
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(temp),
      };
      const response = await fetch(
        "https://localhost:7274/Equipment/retire",
        requestOptions
      );
      alert(await response.text());
      if (status) {
        await LoadEquipment();
        if (status == 2) {
          document.getElementById("wOff").className = "";
          document.getElementById("exp").className = `${style.invis}`;
        } else if (status == 3) {
          document.getElementById("wOff").classList.add(style.invis);
          document.getElementById("exp").className = "";
        }
      }
    } catch (err) {
      alert(err.message);
    }
  }

  if (connectionFailed) {
    return <ErrorMessage></ErrorMessage>;
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
        <label
          value="WrittenOff"
          className={`${equipmentStatus === 2 ? "" : style.invis}`}
          id="wOff"
        >
          Written off
        </label>
        <label
          value="Expended"
          className={`${equipmentStatus === 3 ? "" : style.invis}`}
          id="exp"
        >
          Expended
        </label>
        <div className={style.horizontal}>
          <input
            type="button"
            value="Load History"
            onClick={LoadHistory}
          ></input>
          <input
            type="button"
            value="Change status"
            onClick={ChangeStatus}
          ></input>
          <select
            onChange={(e) => {
              setStatus(e.target.value);
              console.log(e.target.value);
            }}
          >
            <option value="2">Writeen Off</option>
            <option value="3">Expended</option>
          </select>
        </div>
      </div>
      <DisplayTable list={borrows} text={"displayString"} />
    </div>
  );
};

export default EquipmentHistoryPage;
