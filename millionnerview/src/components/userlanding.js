import { useState } from 'react';
import InputGroup from 'react-bootstrap/InputGroup'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
function Userlanding() {
    let userid  = {"participantId" : localStorage.getItem("iduser")};
    const [codegroup ,setCodegroup] = useState(null);
    console.log(codegroup);
    const creategroup = () => {
    axios.post('http://localhost:2020/participant/creategroup',userid,{
                headers: {
                'Authorization': `barer ${localStorage.getItem("token")}` 
                    }})
    .then(res => {
    localStorage.setItem("codeGroup", res.data.codegroup);
    })
    }
    const joingroup = () => {
        const participantId = localStorage.getItem("iduser")
          let group = {codegroup,participantId }
          console.log(group);
          axios.put('http://localhost:2020/participant/joingroup',group,{
                headers: {
                'Authorization': `barer ${localStorage.getItem("token")}` 
                    }})
    .then(res => {
        console.log(res.data);
   // localStorage.setItem("codeGroup", res.data.codegroup);
    })
    }

    return (
<Container >
<center style={{ marginTop:"15%" }}> 
  <Row>
    <Col>
<Card style={{ width: '20rem' }}>
  <center><Card.Img variant="top" style={{ width: '62%' }} src="https://visualpharm.com/assets/655/Create-595b40b65ba036ed117d1a59.svg" /></center>
    <Card.Body>
        <Card.Title> Create Group </Card.Title>
        <Button variant="primary" onClick= {creategroup}>Create</Button>
    </Card.Body>
</Card> 
    </Col>
    <Col> 
    
    <Card style={{ width: '20rem' }}>
    <center> <Card.Img variant="top" style={{ width: '50%', inlineItem:'center' }} src="https://visualpharm.com/assets/600/Joining%20Queue-595b40b75ba036ed117d6410.svg" /> </center>
     <Card.Body>
    <Card.Title>join Group</Card.Title>
    <input type="text" placeholder="Group code" onChange={(e)=>setCodegroup(e.target.value)} />
    <Button variant="primary" onClick= {joingroup} style={{ display: 'block', marginTop:'10px'}}>join</Button>
  </Card.Body>
  </Card>

     </Col>
  </Row>
  </center>
</Container>
    )
}

export default Userlanding
