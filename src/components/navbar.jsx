import React from 'react'
import {Link} from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

const MainNavbar = () => {
  
    return (
      <div>
        <Navbar bg="success gradient" expand="md">
          <Link to="/" className="text-white p-3 h3" style={{ textDecoration: "none" }}>
            Data barang
          </Link>
        </Navbar>
      </div>
    );
  };
  
export default MainNavbar;
  