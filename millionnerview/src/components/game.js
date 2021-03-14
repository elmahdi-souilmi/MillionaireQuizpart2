import React from 'react'
import { Button } from "react-bootstrap";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {useHistory } from 'react-router-dom';
import axios from "axios";
import {
    useEffect, useState
} from 'react'
let Questions = [];
let questionnumber = 0; 
function Game() {
        const history = useHistory();
        const [question, setquestion] = useState('question');
        const [answert1, setanswert1] = useState('answert1');
        const [answert2, setanswert2] = useState('answert2');
        const [answert4, setanswert4] = useState('answert4');
        const [answert3, setanswert3] = useState('answert3');
        const [showbutton, setshowbutton] = useState("none");
        const [gameshow, setgameshow] = useState("block");
        const [participants, setparticipants] = useState(null)
        
        const idround = {idround: localStorage.getItem("roundid")}  
        const idroundandparticipant = {
         idRound: localStorage.getItem("roundid"),
         idparticipant: localStorage.getItem("iduser"),
         "time": 0
     }
     useEffect(() => {
            console.log(idround);
            
        async  function fetch() {
           let questionsIds = await  axios.post('http://localhost:2020/round', idround)
               .then((res) => {
             // eslint-disable-next-line react-hooks/exhaustive-deps
             return res.data
             })
             Questions = questionsIds         
            axios.post('http://localhost:2020/round/reponse', idroundandparticipant)
             .then((res) => {
                  const ids = {
               "idround": localStorage.getItem("roundid"),
               "idquestion": Questions[questionnumber]
           }
           axios.post('http://localhost:2020/round/question', ids)
               .then((res) => {
                   setquestion(res.data.question)
                   setanswert1(res.data.false_answer[0])
                   setanswert2(res.data.right_answer)
                   setanswert3(res.data.false_answer[1])
                   setanswert4(res.data.false_answer[2])
                   
               })
            })
            }
         fetch ()
      }, [])
      function nextQuestion() {
          questionnumber++
          if (questionnumber !== (Questions.length)){
          const ids = {
               "idround": localStorage.getItem("roundid"),
               "idquestion": Questions[questionnumber]
           }    
           axios.post('http://localhost:2020/round/question', ids)
               .then((res) => {
                   
                   let qquestion = res.data;
                   setquestion(res.data.question)
                   setanswert1(res.data.false_answer[0])
                   setanswert2(res.data.right_answer)
                   setanswert3(res.data.false_answer[1])
                   setanswert4(res.data.false_answer[2])
               })
          }
          else {
            setshowbutton("block");
            setgameshow("none")
          }
      }
          function checkIFrounddone() {
              console.log("hello");
         const idround = {
               "idround": localStorage.getItem("roundid")
           }  
           console.log(idround);
              axios.post('http://localhost:2020/round/checkansers',idround )
              .then((res) =>{
                  console.log(res.data)
                  if(res.data.length == 0){
                      axios.put('http://localhost:2020/round/pionts',idround )
                      history.push("/poduim");
                  } else {
                    setparticipants(res.data)
                  }
              })

          }
        function showquestions(answer) {
        if (questionnumber !== (Questions.length)){
            const reponse = {
                          "idRound": localStorage.getItem("roundid"),
                          "idquestion": Questions[questionnumber],
                          "idparticipant": localStorage.getItem("iduser"),
                          "reponse": answer
                                 }
        axios.put('http://localhost:2020/round/reponse', reponse)
              .then((res) => {
                 console.log(res.data);
                 })
               nextQuestion()
        }
          else console.log("salina")
               }
    return (
    <Container>
      <center style={{ marginTop: "20%" }}>
        <Row>
            <Col></Col> <h1 style={{ display:gameshow,width: "100%", height:"100px" }}> {question} </h1><Col></Col>                
        </Row>
        <Row>
    <Col style = {{display: showbutton}}><Button style={{width: "50%"}} onClick={()=>{checkIFrounddone()}} > show winner  </Button> <br/> <span> participants not done yet : {participants} </span> </Col> 
    <Col style={{ display: gameshow }}><Button style= {{width: "100%", backgroundColor: "#eb213c"}}  onClick={()=>{showquestions(answert1)}}> {answert1} </Button></Col>      
    <Col style={{ display: gameshow }}><Button style= {{width: "100%", backgroundColor: "#1368ce"}}   onClick={()=>{showquestions(answert2)}} > {answert2} </Button> </Col>            
    </Row>       
    <Row>      
    <Col style={{ display: gameshow }}><Button  style= {{width: "100%", backgroundColor: "#ffa602"}}  onClick={()=>{showquestions(answert3)}} > {answert3} </Button></Col> 
    <Col style={{ display: gameshow }}><Button  style= {{width: "100%", backgroundColor: "#26890c"}}  onClick={()=>{showquestions(answert4)}}  > {answert4} </Button></Col>       
    </Row>    
    </center>        
    </Container>    

    )
}

export default Game
