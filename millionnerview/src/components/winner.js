import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from "react-bootstrap/Button";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function Winner() {
    const [winner, setwinner] = useState(null)
    const [gift, setgift] = useState(null)
    const  idround = {idround : localStorage.getItem("roundid")}
    useEffect(() => {
        
         axios.post('http://localhost:2020/round/showwinner', idround)
         .then((res)=>{
             setwinner(res.data.fullName)
             console.log(res.data.fullName);
         })
        axios.post('http://localhost:2020/round/showgift', idround)
         .then((res)=>{
             setgift(res.data)
             console.log(res.data);
         })
        
    })
    return (
        <center style={{marginTop: "15%"}} >
       <Card className="text-center" >
  <Card.Header>The winner </Card.Header>
  <Card.Body>
    <Card.Title><strong> {winner} </strong></Card.Title>
    <Card.Text>
      Congratulation {winner} you are the winner and your gift is a <strong> {gift} </strong>.
    </Card.Text>
    <Button variant="primary">Play Again</Button>
  </Card.Body>
  <Card.Footer className="text-muted">Millionner</Card.Footer>
</Card>
</center>
    )
}

export default Winner
