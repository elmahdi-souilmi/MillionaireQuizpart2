import Table from 'react-bootstrap/Table'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'
import {useState, useEffect} from 'react';
import axios from 'axios';

function  Questiontable() {
  const [question ,setQuestion] = useState('');
  const [right_answer,setRight_answer] = useState('');
  //const [question ,setgiftname] = useState('');
  const [false_answer1,setfalse_answer1] = useState('');
  const [false_answer2,setfalse_answer2] = useState('');
  const [false_answer3,setfalse_answer3] = useState('');
  const [questions , setQuestions ] = useState([]);
const pionts = 10;
let false_answer = [false_answer1,false_answer2,false_answer3]
const questiondata = {question,right_answer,false_answer,pionts};
const handleClick = (e) => {
 console.log("clicked")
 console.log(questiondata)
   axios.post('http://localhost:2020/admin/addQuestion', questiondata,{
                headers: {
                'Authorization': `barer ${localStorage.getItem("token")}` 
                    }}).then(res => {
                        console.log("from axios")
                        console.log(res.data);
                        })
}
useEffect(()=>{
                axios.get('http://localhost:2020/admin/questions',{
                headers: {
                'Authorization': `barer ${localStorage.getItem("token")}` 
                    }}).then(res => {
                       let questions = res.data.questions;
                        setQuestions(questions)
                        console.log(questions);
                        })
                    }
            ,[])

  return (     
<center style={{ marginTop:"0%" }}> 
  <Row>
    <Col>
        <div>
            <Table striped bordered hover>
  <thead>
    <tr>
      <th>#</th>
      <th> Question </th>
      <th> right answer</th>
      <th> false question 1</th>
      <th> false question 2</th>
      <th> false question 3</th>

    </tr>
  </thead>
  <tbody>
{
        questions &&
        questions.map((question, index) =>(

          <tr>
            <td>{index + 1}</td>
            <td>{question.question} </td>
            <td>{question.right_answer}</td>
            <td>{question.false_answer[0]}</td>
            <td>{question.false_answer[1]} </td>
            <td>{question.false_answer[2]}</td>
          </tr>
          ))
        }

  <tr>  
  <td>Add</td>
  <td><input style={{"width":"100%"}} value={question} onChange={(e)=>setQuestion(e.target.value)} /> </td>    
  <td><input style={{"width":"100%"}} value={right_answer} onChange={(e)=>setRight_answer(e.target.value)}/> </td>
  <td><input style={{"width":"100%"}} value={false_answer1} onChange={(e)=>setfalse_answer1(e.target.value)} /> </td>    
  <td><input style={{"width":"100%"}} value={false_answer2} onChange={(e)=>setfalse_answer2(e.target.value)}/> </td> 
  <td><input style={{"width":"100%"}} value={false_answer3} onChange={(e)=>setfalse_answer3(e.target.value)}/> </td>          
   </tr>
  </tbody>
</Table>
 </div>
     </Col>
  </Row>
    <Button variant="primary" size="lg" onClick={handleClick}   block>
    Add question
  </Button>
  </center>
    )
}

export default  Questiontable
