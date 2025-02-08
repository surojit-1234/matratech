import React, { useState } from "react";
import telephone from "../../assets/Images/telephone.png";
import pattern from "../../assets/Images/bg-pattern.png";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { FaAngleRight } from "react-icons/fa6";
import "./sass/Style.css";
import useAos from "../../hooks/useAos";
import axios from 'axios';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const ContactSection = () => {

  useAos();

  const[userName, setUserName] = useState('');
  const[userConatct, setUserContact] = useState('');
  const[userEmail, setUserEmail] = useState('');
  const[userMessage, setUserMessage] = useState('');
  const[isLoading, setIsLoading] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    const Message=({name})=> {
      return(
        <>
          <h4 className="m-0">Thanks! {name.split(' ')[0]}</h4>
          <p className="m-0 mt-2">Our team will reach out soon</p>
        </>
      )
    }

    const user_details = {
      name: userName,
      phone: userConatct,
      email: userEmail,
      message: userMessage
    }

    axios.post("https://backend.matratech.in/api/contact-us", user_details)
    .then((response)=> {
      if(response.data) {
        console.log("hi");
        setIsLoading(false);
        setUserName(''); 
        setUserEmail(''); 
        setUserContact(''); 
        setUserMessage('');
        NotificationManager.success(
         <Message name={user_details.name} />
        )
      }
    }).catch((err)=> console.log(err))
  }

  return (
    <section className="contact-wrap">
      <div className="heading">
        <Row className="d-flex align-items-center justify-content-between mb-4" data-aos="fade-up">
          <Col xs={10}>
            <h1>Connect with us</h1>
          </Col>
          <Col xs={2}>
            <FaAngleRight />
          </Col>
        </Row>
      </div>

      <Container fluid className="overflow-hidden position-relative" style={{padding:'2%'}}>
        <img
          src={pattern}
          alt="No images found"
          style={{ borderRadius: "20px" }}
          className="bg-pattern w-100"
        />

        <Row style={{ zIndex: 1, position: "relative" }}>
        
          <Col lg={8} className="d-flex align-items-center justify-content-between">
            <h2 data-aos="fade-right">How can we help you??</h2>
            <img src={telephone} alt="" className="telephone" />
          </Col>

          <Col lg={4}>
            <Form method="" onSubmit={handleSubmit}>
              <Form.Group className="mb-3"controlId="exampleForm.ControlInput1">
                <Form.Control 
                type="text" 
                placeholder="Name" 
                onChange={(e)=> setUserName(e.target.value)} 
                value={userName} 
                required 
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                <Form.Control 
                type="tel" 
                placeholder="Phone" 
                onChange={(e)=> setUserContact(e.target.value)} 
                value={userConatct} 
                required 
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                <Form.Control 
                type="email" 
                placeholder="Email" 
                onChange={(e)=> setUserEmail(e.target.value)}
                value={userEmail} 
                required 
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Control 
                as="textarea" 
                rows={7} 
                placeholder="Message" 
                onChange={(e)=> setUserMessage(e.target.value)} 
                value={userMessage} 
                required 
                />
              </Form.Group>

              <button type="submit"> 
                {isLoading? 'Sending...' : 'Submit'} 
              </button>

              <NotificationContainer/>

            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default ContactSection;
