import React, { useState, useEffect } from "react";
import style from "./EquipmentHistory.module.css";
import { fetchData } from "../../functions";
import Menu from "../../components/Menu";
import ErrorMessage from "../../components/ErrorMessage";
import ComboBox from "../../components/ComboBox";
import DisplayTable from "../../components/DisplayTable";
import DisplayMessage from "../../components/DisplayMessage";

const EquipmentHistoryPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [equipmentTypes, setEquipmentTypes] = useState([]);
  const [equipmentTypeId, setEquipmentTypeId] = useState(1);
  const [equipment, setEquipment] = useState([]);
  const [equipmentId, setEquipmentId] = useState("");
  const [equipmentInventoryMark, setEquipmentInventoryMark] = useState("");
  const [borrows, SetBorrows] = useState([]);
  const [connectionFailed, setConnectionFailed] = useState(false);
  const [status, setStatus] = useState(2);
  const [equipmentStatus, setEquipmentStatus] = useState(0);
  const [displayString, setDisplayString] = useState("");

  useEffect(() => {
    test();
  }, [equipmentStatus]);

  useEffect(() => {
    const fetchData2 = async () => {
      setOpenModal(true);
      setModalMessage("Loading");
      try {
        const postsData = await fetchData(
          "https://localhost:7274/EquipmentType"
        );
        setEquipmentTypes(postsData);
      } catch (err) {
        console.log(err);
        setConnectionFailed(true);
        setOpenModal(true);
        setModalMessage(err);
      }
      setOpenModal(false);
    };
    fetchData2();
  }, []);

  function test() {
    if (equipmentStatus == 0) {
      document.getElementById("wOff").className = style.invis;
      document.getElementById("exp").className = style.invis;
    }
    if (equipmentStatus == 2) {
      document.getElementById("exp").className = style.invis;
    }
    if (equipmentStatus == 3) {
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
        setOpenModal(true);
        setModalMessage("Data not found");
        return;
      }
    } catch (err) {
      setOpenModal(true);
      setModalMessage(err.message);
    }
  }

  async function LoadHistory() {
    try {
      if (
        equipmentInventoryMark === "" ||
        equipmentInventoryMark.length != 10
      ) {
        throw new Error(
          "Please insert correct inventory mark it must be length of 10"
        );
        return;
      }
      const result = await fetchData(
        "https://localhost:7274/Equipment/InventoryMark?inventoryMark=" +
          equipmentInventoryMark
      );
      const history = await fetchData(
        "https://localhost:7274/Borrow/Equipment?id=" +
          result.equipmentId +
          "&active=false"
      );
      setEquipmentId(result.equipmentId);
      setEquipmentStatus(result.status);
      setDisplayString(result.displayString);
      SetBorrows(history);
      console.log("equipment ---------------------");
      console.log(result);
      console.log("History ---------------------");
      console.log(history);
    } catch (err) {
      setEquipmentId("");
      setEquipmentStatus(-1);
      setDisplayString("");
      setOpenModal(true);
      setModalMessage(err.message);
    }
  }

  async function ChangeStatus() {
    if (equipmentId === "") {
      setOpenModal(true);
      setModalMessage("Please select equipment");
      return;
    }
    if (equipmentStatus === 1 || equipmentStatus === 3) {
      console.log(equipmentStatus);
      console.log(status);
      setOpenModal(true);
      setModalMessage("Status change not possible");
      return;
    }
    if (equipmentStatus === 2 && status != 3) {
      setOpenModal(true);
      setModalMessage("Status change not possible");
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
      setOpenModal(true);
      setModalMessage(await response.text());
      if (status) {
        await LoadEquipment();
        if (status == 2) {
          document.getElementById("wOff").classList.remove(style.invis);
          document.getElementById("exp").classList.add(style.invis);
        } else if (status == 3) {
          document.getElementById("wOff").classList.add(style.invis);
          document.getElementById("exp").classList.remove(style.invis);
        }
      }
    } catch (err) {
      setOpenModal(true);
      setModalMessage(err.message);
    }
  }

  if (connectionFailed) {
    return <ErrorMessage></ErrorMessage>;
  }
  return (
    <div className={style.EquipmentHistoryPage}>
      <Menu></Menu>
      <DisplayMessage
        open={openModal}
        onClose={() => setOpenModal(false)}
        text={modalMessage}
      />
      <div className={style.Container}>
        <label>Equipment inventory mark</label>
        <input
          type="text"
          id="description"
          onChange={(e) => {
            setEquipmentInventoryMark(e.target.value);
          }}
        ></input>
        <label>{displayString}</label>
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
