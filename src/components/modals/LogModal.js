import styles from "./LogModal.module.css";
import { useState } from "react";
import BigCard from "../../UI/BigCard";
import Button from "../../UI/Button";
import cancel from "../../UI/icons/close-cKT.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LogModal = ({ setLogModal, logModal, lineId }) => {
  //   const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    amount: "",
    description: "",
  });

  const handleChange = (event) => {
    const { value, name } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleClick = () => {
    console.log(form);

    const createExpense = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8082/api/v1/expenses/create-expense/" + lineId,
          form,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
      } catch (error) {
        console.log(error.message);
      }
    };
    createExpense();
    setLogModal(null);
    // navigate("/decapay/dashboard");
  };

  const imageClick = () => {
    setLogModal(null);
  };

  return (
    <>
      {logModal && (
        <div>
          <div className={styles.backdrop} onClick={imageClick}></div>
          <BigCard className={styles.logmodal}>
            <img
              src={cancel}
              alt="cancel icon "
              style={{
                width: "30px",
                height: "30px",
                position: "relative",
                left: "452px",
                top: "40px",
              }}
              onClick={imageClick}
            />

            <div>
              <p className={styles.title}>Log Item</p>
            </div>
            <form>
              <label className={styles.label} htmlFor="amountspent">
                {" "}
                Amount Spent
              </label>{" "}
              <br />
              <div className={styles.amount}>
                <input
                  id="amountspent"
                  type="number"
                  name="amount"
                  onChange={handleChange}
                  value={form.amount}
                  placeholder="N0.00"
                />
              </div>
              <label className={styles.label} htmlFor="description">
                {" "}
                Description
              </label>{" "}
              <br />
              <div className={styles.amount}>
                <input
                  id="description"
                  type="text"
                  name="description"
                  onChange={handleChange}
                  value={form.description}
                  placeholder="Type description here"
                />
              </div>
              <br />
              <button className={styles.btntwo} onClick={handleClick}>
                Save
              </button>
              <button className={styles.btns} onClick={imageClick}>
                Cancel
              </button>
            </form>
          </BigCard>
        </div>
      )}
    </>
  );
};

export default LogModal;
