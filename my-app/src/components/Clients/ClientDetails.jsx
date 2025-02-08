import React, { useCallback, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './sass/Style.css';
import useAos from '../../hooks/useAos';
import Datafetching from '../../pages/Datafetching';

// import { LazyLoadImage} from 'react-lazy-load-image-component';
// import 'react-lazy-load-image-component/src/effects/blur.css';

const ClientDetails = (props) => {
  const [baseImage, setBaseImage] = useState("https://backend.matratech.in/uploads");
  const [clientsName, setClientsName] = useState([]);
  const [items, setItems] = useState([]);
  const { startIndex, endIndex } = props;

  useEffect(() => {
    if (clientsName.length > 0) {
      const slicedItems = clientsName.slice(startIndex, endIndex);
      console.log("sliced-items",clientsName)
      setItems(slicedItems);
      props.handleAPI(false)
    }
  }, [clientsName, startIndex, endIndex]);

  useAos();

  return (
    <>
      <Datafetching API="https://backend.matratech.in/api/clients" 
      onChildData={useCallback((clientsLogo)=> {
      console.log(clientsLogo); 
      setClientsName(clientsLogo);
      },[])} />

      <Container fluid>
        <Row className='d-flex justify-content-center'>
          {items?.map((client, index) => (
              <Col lg={2} md={4} key={index} data-aos="zoom-in">
                <img
                  src={`${baseImage}/${client.image}`} alt={`client-${index}`}
                  className="client-image"
                />
              </Col>
            ))
          }
        </Row>
      </Container>
    </>
  );
};

export default ClientDetails;
