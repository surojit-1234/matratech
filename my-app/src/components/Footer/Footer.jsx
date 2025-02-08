import React, { useState, useCallback } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Datafetching from '../../pages/Datafetching';
import './sass/Style.css';


const Footer = () => {
  const[footerLinks, setFooterLinks] = useState();
 
  return (
    <footer>

      <Datafetching API="https://backend.matratech.in/api/home-content" 
      onChildData={useCallback((contents)=> {
          setFooterLinks(contents);
      },[])} />

        <Container fluid>
            <Row className='footer d-flex justify-content-between align-items-center'>
                <Col lg={4}>
                    <p>&copy; copyright 2024 Matra-Tech</p>
                </Col>
                <Col lg={3}>
                    <div className='icon-container d-flex justify-content-lg-end justify-content-center gap-2'>
                        <a href="#" target="_blank" rel="noopener noreferrer">
                            <FaFacebookF className='icon' />
                        </a>
                        <a href="#" target="_blank" rel="noopener noreferrer">
                            <FaXTwitter className='icon' />
                        </a>
                        <a href="#" target="_blank" rel="noopener noreferrer">
                            <FaLinkedinIn className='icon' />
                        </a>
                        <a href="#" target="_blank" rel="noopener noreferrer">
                            <FaInstagram className='icon' />
                        </a>
                    </div>
                </Col>
            </Row> 
        </Container>
    </footer>
  )
}

export default Footer;