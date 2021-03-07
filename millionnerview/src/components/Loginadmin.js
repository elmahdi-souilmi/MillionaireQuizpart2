import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useState } from 'react';
import axios from 'axios';
import { Link,useHistory } from 'react-router-dom';

const Login = ({loginfo}) => {
  
  const [phoneNumber ,setPhone] = useState('');
  const [password,setPassword] = useState('');
  let [problem,setProblem] = useState('');
const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    const admin = {phoneNumber,password};
    axios.post('http://localhost:2020/admin',admin)
    .then(res => {
      
      history.push("/admindash");
      let token = res.data.token;
      let idParticipant = res.data.id;
      let nameParticipant = res.data.name

      localStorage.setItem("token", token);
      localStorage.setItem("idAdmin", idParticipant);
      localStorage.setItem("nameAdmin", nameParticipant);
      setProblem(e.target.problem="")
    })
    .catch( error =>{
      setProblem(e.target.problem="user not found")
      //console.log(error);
    })
  }
    let inputtype, placeholder
      {
            if (loginfo === 'admin'){
                inputtype = 'tel' ;
                placeholder = 'Enter phone number'
            }else {
                inputtype = 'email' ;
                placeholder = 'Enter  Email'
            }
        }
    return (
      
<Form className="loginform" onSubmit={handleSubmit}  style={{ marginTop:'10%'}}>
  <Form.Group controlId="formBasi{}">
    <Form.Label> {loginfo} {inputtype}</Form.Label>
    <Form.Control type={inputtype} placeholder={placeholder} value={phoneNumber}
     onChange={(e)=>setPhone(e.target.value)} />
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
    Submit
  </Button>
    <Form.Text className="text-muted" >
    {problem} 
    </Form.Text>
</Form>

    )
}

export default Login
