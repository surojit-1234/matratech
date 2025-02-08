import React, { useEffect, useState } from "react";
//import Logo from '../../assets/Images/logo.png';
import Logo from "../../assets/Images/logo-2.png";
import "./sass/Style.css";
import { CgMenuLeftAlt } from "react-icons/cg";
import { RxCross1 } from "react-icons/rx";
import Header from "../Header/Header";
import { Link } from "react-router-dom";

const Topnav = () => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    window.innerWidth <= 767 ? setIsOpen(false) : setIsOpen(true);
  }, []);

  // function handleHamberger(){
  //   setIsOpen(!isOpen);
  // }

  return (
    <div className="top-nav">
      <div className="logo">
        <Link to="/">
          <img src={Logo} alt="" className="img-fluid"/>
        </Link>
      </div>

      <div className="hamberger" onClick={()=> setIsOpen(!isOpen)}>
        <CgMenuLeftAlt
          className="open"
          style={{ display: isOpen ? "none" : "" }}
        />
        <RxCross1
          className="close"
          style={{ display: isOpen ? "block" : "" }}
        />
      </div>

      <div className="contact-info">
        <h5>Contact</h5>
        <a href="mailto:matratech@gmail.com">matratech@gmail.com</a>
      </div>

      <Header onChildData={(childData)=> setIsOpen(childData)} isOpen={isOpen} />
      
    </div>
  );
};

export default Topnav;
