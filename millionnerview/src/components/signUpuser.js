import React from 'react'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Signupuser = () => {
  
  const [fullName ,setFullname] = useState(null);
  const [age,setAge] = useState(null);
  const [phone ,setPhone] = useState(null);
  const [email,setEmail] = useState(null);
  const [password,setPassword] = useState(null);
  let [problem,setProblem] = useState(null);
  const history = useHistory();

  const handleSubmit = (e) => {
      const participant = {fullName,age,phone,email,password};
      console.log(participant);
    e.preventDefault();
    
    axios.post('http://localhost:2020/participant/signUp',participant)
    .then(res => {
     
      let token = res.data.token;
      let idParticipant = res.data.id;
      let nameParticipant = res.data.name

      localStorage.setItem("token", token);
      localStorage.setItem("iduser", idParticipant);
      localStorage.setItem("nameuser", nameParticipant);
      setProblem(e.target.problem = "")

      history.push("/userlanding");
    })
    .catch( error =>{
      setProblem(e.target.problem ="user not found")
      //console.log(error);
    })
  }
    return (
<Form className="loginform" onSubmit={handleSubmit}  style={{ marginTop:'10%'}}>
  <Row>
    <Col>
    <Form.Label>Full name</Form.Label>
      <Form.Control placeholder="Full name" placeholder="password" value={fullName}  onChange={(e)=>setFullname(e.target.value)} />
    </Col>
    <Col>
    <Form.Label>Age</Form.Label>
      <Form.Control placeholder="Age" placeholder="password" value={age}  onChange={(e)=>setAge(e.target.value)} />
    </Col>
  </Row>
    <Row>
    <Col>
    <Form.Label>Phone</Form.Label>
      <Form.Control placeholder="Phone" placeholder="password" value={phone}  onChange={(e)=>setPhone(e.target.value)} />
    </Col>
    <Col>
    <Form.Label>Email</Form.Label>
      <Form.Control placeholder="Email" placeholder="password" value={email}  onChange={(e)=>setEmail(e.target.value)} />
    </Col>
  </Row>
    <Row>
    <Col>
     <Form.Label>password</Form.Label>
      <Form.Control placeholder="password" value={password}  onChange={(e)=>setPassword(e.target.value)} />
    </Col>
    <Col>
     <Form.Label> Retype your password</Form.Label>
      <Form.Control placeholder="Retype your password" />
    </Col>
  </Row>
  <Row>
  <Col>
    <Button variant="primary" type="submit" size="lg" block> Sign Up</Button>
  </Col>
  </Row>
</Form>
    )
}

export default Signupuser