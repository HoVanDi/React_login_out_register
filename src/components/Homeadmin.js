import React from 'react'
import SideNav from "./SideNav";
// import Add from "./Add";
import Header from './Header';
import Productlist from './Productlist';

// import Productlist from './Productlist';



const Home = () => {
  return (

    <div id="wrapper">
    {/* Sidebar */}
    <SideNav></SideNav>
    
    {/* End of Sidebar */}
    {/* Content Wrapper */}
    <div id="content-wrapper" className="d-flex flex-column">
      {/* Main Content */}
      <div id="content">
        {/* Topbar */}
       <Header></Header>
   
        {/* End of Topbar */}
        {/* Begin Page Content */}
        <div className="container-fluid">
         

          {/* <Productlist></Productlist> */}

          <Productlist></Productlist>
          {/* <Add></Add> */}


        
        </div>
        {/* /.container-fluid */}
      </div>
      {/* End of Main Content */}
      {/* Footer */}
  
      {/* End of Footer */}
    </div>
    {/* End of Content Wrapper */}
  </div>
  )
}

export default Home