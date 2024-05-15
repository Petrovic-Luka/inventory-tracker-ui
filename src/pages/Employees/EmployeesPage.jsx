import { useState, useEffect, React } from "react";
import style from "./EmployeesPage.module.css";
import { fetchData } from "../../functions";
import Menu from "../../components/Menu";
import ErrorMessage from "../../components/ErrorMessage";
import ComboBox from "../../components/ComboBox";
import DisplayTable from "../../components/DisplayTable";
import DisplayMessage from "../../components/DisplayMessage";

const EmployeesPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [employees, setEmployees] = useState([]);
  const [displayEmployees, setDisplayEmployees] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [connectionFailed, setConnectionFailed] = useState(false);

  useEffect(() => {
    const fetchData2 = async () => {
      setOpenModal(true);
      setModalMessage("Loading");
      try {
        const postsData = await fetchData("https://localhost:7274/Employee");
        setEmployees(postsData);
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

  function searchEmployees() {
    let result = employees.filter(
      (x) =>
        x.firstName.includes(searchString) || x.lastName.includes(searchString)
    );
    result.forEach(
      (x) =>
        (x["displayString"] =
          x.firstName + " " + x.lastName + " " + x.mailAddress)
    );
    setDisplayEmployees(result);
    console.log(result);
  }

  if (connectionFailed) {
    return <ErrorMessage></ErrorMessage>;
  }

  return (
    <div className={style.HomePage}>
      <Menu></Menu>
      <DisplayMessage
        open={openModal}
        onClose={() => setOpenModal(false)}
        text={modalMessage}
      />
      <div className={style.Container}>
        <label>Employee Name</label>
        <input
          type="text"
          onChange={(e) => {
            setSearchString(e.target.value);
          }}
        ></input>
        <input
          value="Search employees"
          type="button"
          id="Create"
          onClick={(e) => {
            searchEmployees();
          }}
        ></input>
      </div>
      <DisplayTable list={displayEmployees} text={"displayString"} />
    </div>
  );
};

export default EmployeesPage;
