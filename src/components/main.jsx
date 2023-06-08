import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import MainNavbar from "./navbar";
import { Dashboard, AddData, EditData } from "../pages";

const Main = () => {
  const navigate = useNavigate();

  return (
    <div className="">
      <>
      
        <MainNavbar></MainNavbar>
        <Routes>
          <Route exact path="/" element={<Dashboard></Dashboard>}></Route>
          <Route path="/adddata" element={<AddData></AddData>} />
          <Route path="/editdata/:dataId" element={<EditData></EditData>} />
        </Routes>
      </>
    </div>
  );
};

export default Main;
