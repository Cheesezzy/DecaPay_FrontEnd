import React, {useState} from "react";
import "./CreateCategory.css";
import { Link } from "react-router-dom";
import axios from "axios";
import ResponseMessage from "../../modals/globalmodals/ResponseMessage";
import Loader from "../../../globalresources/Loader";

function CreateCategory() {
  const [budgetCategoryName, setBudgetCategoryName]= useState("");
  const [responseMessage, setResponseMessage] =useState(null);

  const [loaderStatus, setLoaderStatus]=useState(false);
  const handleBudgetCategorySubmit = (e) =>{

    e.preventDefault();

    setResponseMessage(null);
    setLoaderStatus(true);
    const categoryName = {name :budgetCategoryName };

    createBudgetCategory(categoryName);

  }
  const createBudgetCategory = (data) => {
    const token = localStorage.getItem("token");
    fetch(" http://localhost:8082/api/v1/budgets/category/create",{
      method:"POST",
      headers:{
        "content-type":"application/json",
        Authorization: `Bearer ${token}`
      },
      body:JSON.stringify(data)
    }).then(response=>{
      console.log(response);
      setResponseMessage("Budget Category Added");
      setLoaderStatus(false);

      setBudgetCategoryName("");
    }).catch(error=>{
      console.log(error.message);
      setResponseMessage("error : "+ error.message + "- Budget category not added");
      setLoaderStatus(false);
    });
  };

  return (
    <div className="create-category-decapay-Da9">
      <img className="ellipse-4-XKw" src="/assets/ellipse-4-f3X.png" />
      <div className="frame-8794-Sho">
        <div className="frame-8780-ySq">
          <img className="back-arrow-Gwj" src="/assets/back-arrow-YD7.png" />
          <p className="back-ckh">Back</p>
        </div>
        <div className="frame-8793-h1T">
          <p className="what-do-you-usually-spend-on-qNZ">
            What do you usually spend on?
          </p>

          <div className="frame-8792-wRb">
            <div className="frame-4-uNR">
              <form onSubmit={handleBudgetCategorySubmit}>
                <p className="name-of-category-Tuj" >Name of Category</p>
                <input name="categoryName"
                  className="frame-2-PYV" value={budgetCategoryName}
                  placeholder="Enter name of item"
                       onChange={(e)=>setBudgetCategoryName(e.target.value)}
                /> 
                <br/><br/>
                  <button className="frame-8754-GcH" type="submit">Add
                    <Loader status={loaderStatus}/>
                  </button>

              </form>
            </div>
          </div>
        </div>
      </div>

      {responseMessage && <ResponseMessage message={responseMessage}  />}
    </div>
  );
}

export default CreateCategory;
