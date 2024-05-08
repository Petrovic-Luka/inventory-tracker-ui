import React, { useState, useEffect } from "react";
import style from "./CreateBorrowPage.module.css";
import { fetchData } from "../../functions";
import Menu from "../../components/Menu";
import ComboBox from "../../components/ComboBox";
import ErrorMessage from "../../components/ErrorMessage";
import DisplayMessage from "../../components/DisplayMessage";

const CreateBorrowPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [equipmentTypes, setEquipmentTypes] = useState([]);
  const [equipmentTypeId, setEquipmentTypeId] = useState(1);
  const [equipment, setEquipment] = useState([]);
  const [equipmentInventoryMark, setEquipmentInventoryMark] = useState("");
  const [employees, setEmployees] = useState([]);
  const [employeeEmail, setEmployeeEmail] = useState("");
  const [classRooms, setClassRooms] = useState([]);
  const [classRoomId, setClassRoomId] = useState("");
  const [connectionFailed, setConnectionFailed] = useState(false);

  useEffect(() => {
    const fetchData2 = async () => {
      try {
        setOpenModal(true);
        setModalMessage("Loading");
        const [postsData, postsData2, postsData3] = await Promise.all([
          fetchData("https://localhost:7274/EquipmentType"),
          fetchData("https://localhost:7274/Employee"),
          fetchData("https://localhost:7274/ClassRoom"),
        ]);
        setEquipmentTypes(postsData);
        setEmployees(postsData2);
        setClassRooms(postsData3);
        // setEmployeeId(postsData2[0].employeeId);
        setClassRoomId(postsData3[0].classRoomId);
      } catch (err) {
        setEquipmentTypes([]);
        setEmployees([]);
        setClassRooms([]);
        console.log(err);
        setConnectionFailed(true);
        setOpenModal(true);
        setModalMessage(err.message);
        return;
      }
      setOpenModal(false);
    };
    fetchData2();
  }, []);

  async function sendPost() {
    if (equipmentInventoryMark === "" || equipmentInventoryMark.length != 10) {
      setOpenModal(true);
      setModalMessage("Incorrect inventory mark");
      return;
    }
    try {
      let temp = {
        employeeMailAddress: employeeEmail,
        equipmentInventoryMark: equipmentInventoryMark,
        classRoomId: classRoomId,
      };
      console.log(JSON.stringify(temp));
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(temp),
      };
      const response = await fetch(
        "https://localhost:7274/Borrow",
        requestOptions
      );
      setOpenModal(true);
      setModalMessage(await response.text());
    } catch (err) {
      setOpenModal(true);
      setModalMessage(err.message);
    }
  }

  if (connectionFailed) {
    return <ErrorMessage></ErrorMessage>;
  }
  return (
    <div className={style.CreateBorrowPage}>
      <Menu></Menu>

      <DisplayMessage
        open={openModal}
        onClose={() => setOpenModal(false)}
        text={modalMessage}
      />
      {/* <div className={style.Container}>
        <label>Equipment type</label>
        <ComboBox
          list={equipmentTypes}
          setValue={setEquipmentTypeId}
          key={"equipmentTypeId"}
          value={"equipmentTypeId"}
          text={"name"}
        />
      </div> */}
      <div className={style.Container}>
        {/* <input
          type="button"
          value="Load equipment"
          onClick={LoadEquipment}
        ></input> */}
        <label>Equipment inventory mark</label>
        <input
          type="text"
          id="description"
          onChange={(e) => {
            setEquipmentInventoryMark(e.target.value);
          }}
        ></input>
        {/* <ComboBox
          list={equipment}
          setValue={setEquipmentId}
          key={"equipmentId"}
          value={"equipmentId"}
          text={"displayString"}
        /> */}
      </div>

      <div className={style.Container}>
        <label>Employee email</label>
        <input
          type="text"
          id="description"
          onChange={(e) => {
            setEmployeeEmail(e.target.value);
          }}
        ></input>
        {/* <ComboBox
          list={employees}
          setValue={setEmployeeId}
          key={"employeeId"}
          value={"employeeId"}
          text={"mailAddress"}
        /> */}
      </div>

      <div className={style.Container}>
        <label>ClassRoom</label>
        <ComboBox
          list={classRooms}
          setValue={setClassRoomId}
          key={"classRoomId"}
          value={"classRoomId"}
          text={"name"}
        />
      </div>

      <div className={style.Container}>
        <input type="button" onClick={sendPost} value="Create borrow"></input>
      </div>
    </div>
  );
};

export default CreateBorrowPage;
