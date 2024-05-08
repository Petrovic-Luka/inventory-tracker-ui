import { useState, useEffect, React } from "react";
import style from "./HomePage.module.css";
import { fetchData } from "../../functions";
import Menu from "../../components/Menu";
import ErrorMessage from "../../components/ErrorMessage";
import ComboBox from "../../components/ComboBox";
import DisplayTable from "../../components/DisplayTable";
import DisplayMessage from "../../components/DisplayMessage";

const HomePage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [equipmentTypes, setEquipmentTypes] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [equipmentTypeId, setEquipmentTypeId] = useState(1);
  const [connectionFailed, setConnectionFailed] = useState(false);

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

  async function LoadEquipment() {
    try {
      const result = await fetchData(
        "https://localhost:7274/Equipment/type?typeId=" +
          equipmentTypeId +
          "&available=" +
          document.getElementById("available").checked
      );
      setEquipment(result);
      console.log(result);
    } catch (err) {
      setOpenModal(true);
      setModalMessage(err.message);
    }
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
        <label>Equipment type</label>
        <ComboBox
          list={equipmentTypes}
          setValue={setEquipmentTypeId}
          key={"equipmentTypeId"}
          value={"equipmentTypeId"}
          text={"name"}
        />
        <label>Available only</label>
        <input type="checkbox" id="available"></input>
        <input
          value="Load equipment"
          type="button"
          id="Create"
          onClick={(e) => {
            LoadEquipment();
          }}
        ></input>
      </div>
      <DisplayTable list={equipment} text={"displayString"} />
    </div>
  );
};

export default HomePage;
