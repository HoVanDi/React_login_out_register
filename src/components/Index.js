import React, { Component } from "react";


import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
// import Productlist from './components/Productlist';
import Add from "./Add";
import Home from "./Homeadmin";
class Index extends Component {
  render() {
    return (
      <div>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="/Add/:id" element={<Add />}></Route>
          <Route path="/Add" element={<Add />}></Route>
        </Routes>
      </div>
    );
  }
}

export default Index;
