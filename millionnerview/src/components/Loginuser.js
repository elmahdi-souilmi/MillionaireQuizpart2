import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Loginuser = () => {
  
  const [email ,setEmail] = useState('');
  const [password,setPassword] = useState('');
  let [problem,setProblem] = useState('');
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    const participant = {email ,password};
    axios.post('http://localhost:2020/participant',participant)
    .then(res => {
      
      history.push("/userlanding");
      let token = res.data.token;
      let idParticipant = res.data.id;
      let nameParticipant = res.data.name

      localStorage.setItem("token", token);
      localStorage.setItem("iduser", idParticipant);
      localStorage.setItem("nameuser", nameParticipant);
      setProblem(e.target.problem="")
    })
    .catch( error =>{
      setProblem(e.target.problem="user not found")
      //console.log(error);
    })
  }
    return (
      
<Form className="loginform" onSubmit={handleSubmit}  style={{ marginTop:'10%'}}>
  <Form.Group controlId="formBasi{}">
    <Form.Label> user email</Form.Label>
    <Form.Control type="email" placeholder='Enter Email' value={email}
     onChange={(e)=>setEmail(e.target.value)} />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>
  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" value={password}
                onChange={(e)=>setPassword(e.target.value)} />
  </Form.Group>
  <Form.Group controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="Check me out" />
  </Form.Group>
  <Button variant="primary" type="submit">
    Login 
  </Button>
   
    <Form.Text className="text-muted" >
    {problem} 
    </Form.Text>
</Form>

    )
}

export default Loginuser