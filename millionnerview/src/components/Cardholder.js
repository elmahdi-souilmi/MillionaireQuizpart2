import React from 'react';
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Card from './Card'
import { Link } from 'react-router-dom';
const Cardholder = () => {
    return (
<Container >
<center style={{ marginTop:"15%" }}> 
  <Row>
    <Col>
    <Link to='/admin'>
         <Card role="Admin" img = "https://visualpharm.com/assets/314/Admin-595b40b65ba036ed117d36fe.svg"> </Card> 
    </Link>  
    </Col>
    <Col> 
    <Link to = '/user'>
    <Card role="participant" img = "https://visualpharm.com/assets/807/Guest%20Male-595b40b75ba036ed117d9da1.svg"> </Card>
    </Link>
     </Col>
  </Row>
  </center>
</Container>
    );
}

export default Cardholder;
