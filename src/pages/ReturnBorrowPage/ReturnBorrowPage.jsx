import React, { useState, useEffect } from "react";
import style from "./ReturnBorrowPage.module.css";
import { fetchData } from "../../functions";
import Menu from "../../components/Menu";
import ComboBox from "../../components/ComboBox";
import ErrorMessage from "../../components/ErrorMessage";
import DisplayMessage from "../../components/DisplayMessage";
import DisplayTable from "../../components/DisplayTable";

const ReturnBorrowPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [employees, setEmployees] = useState([]);
  const [employeesHistory, setEmployeesHistory] = useState([]);
  const [employeeEmail, setEmployeeEmail] = useState("");
  const [borrows, setBorrows] = useState([]);
  const [equipmentId, setEquipmentId] = useState("");
  const [connectionFailed, setConnectionFailed] = useState(false);

  useEffect(() => {
    const fetchData2 = async () => {
      try {
        setOpenModal(true);
        setModalMessage("Loading");
        const postsData2 = await fetchData("https://localhost:7274/Employee");
        setEmployees(postsData2);
        try {
        } catch {
          setOpenModal(true);
          setModalMessage("No employees found");
          return;
        }
      } catch (err) {
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

  async function LoadBorrows() {
    try {
      const result = await fetchData(
        "https://localhost:7274/Borrow/Employee?email=" +
          employeeEmail +
          "&active=true"
      );
      setBorrows(result);
      setEmployeesHistory([]);
      console.log(result);

      setEquipmentId(result[0].equipmentId);
    } catch (err) {
      setBorrows([]);
      setOpenModal(true);
      setModalMessage("No borrows found");
    }
  }

  async function LoadHistory() {
    try {
      const result = await fetchData(
        "https://localhost:7274/Borrow/Employee?email=" +
          employeeEmail +
          "&active=false"
      );
      setEmployeesHistory(result);
      console.log(result);
    } catch (err) {
      setBorrows([]);
      setOpenModal(true);
      setModalMessage("Search failed");
    }
  }

  async function sendPut() {
    console.log("Equipment " + equipmentId);
    console.log("Employee " + employeeEmail);
    if (equipmentId === "") {
      setOpenModal(true);
      setModalMessage("Please select equipment");
      return;
    }
    let temp = {
      employeeMailAdress: employeeEmail,
      equipmentId: equipmentId,
    };
    console.log(JSON.stringify(temp));
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(temp),
    };
    const response = await fetch(
      "https://localhost:7274/Borrow/Return",
      requestOptions
    );
    setOpenModal(true);
    setModalMessage(await response.text());
    LoadBorrows();
  }

  if (connectionFailed) {
    return <ErrorMessage></ErrorMessage>;
  }
  return (
    <div className={style.ReturnBorrowPage}>
      <Menu> </Menu>
      <DisplayMessage
        open={openModal}
        onClose={() => setOpenModal(false)}
        text={modalMessage}
      />
      <div className={style.Container}>
        <div className={style.Container}>
          <label>Employee email</label>
          <input
            type="text"
            id="description"
            onChange={(e) => {
              setEmployeeEmail(e.target.value);
            }}
          ></input>
        </div>
        <div className={`${style.Container} ${style.Horizontal}`}>
          <input
            type="button"
            value="Load equipment"
            onClick={LoadBorrows}
          ></input>
          <input
            type="button"
            value="Search employees history"
            onClick={LoadHistory}
          ></input>
        </div>
        <div className={style.Container}>
          <label>Borrows</label>
          <ComboBox
            list={borrows}
            key={"startDate"}
            value={"equipmentId"}
            text={"displayString"}
            setValue={setEquipmentId}
          />
        </div>

        <div className={style.Container}>
          <input
            type="button"
            value="Return equipment"
            onClick={sendPut}
          ></input>
        </div>
      </div>
      <DisplayTable list={employeesHistory} text={"displayString"} />
    </div>
  );
};

export default ReturnBorrowPage;
