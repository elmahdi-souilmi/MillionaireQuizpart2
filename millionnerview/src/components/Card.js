import React from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
const Cardcom = (props) => {
    return (
<Card style={{ width: '20rem' }}>
  <Card.Img variant="top" style={{ width: '40%' }} src={props.img} />
  <Card.Body>
    <Card.Title>{props.role}</Card.Title>
    <Button variant="primary">Log as {props.role}</Button>
  </Card.Body>
</Card>
    );
}

export default Cardcom;
